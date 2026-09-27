import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { resolve, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { createRenderer, escapeHtml as esc } from './render.mjs';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const check = args.includes('--check');
const outFlag = args.indexOf('--out-dir');
if (outFlag !== -1 && !args[outFlag + 1]) throw new Error('--out-dir needs a directory');
const output = outFlag === -1 ? repo : resolve(repo, args[outFlag + 1]);
if (check && output !== repo) throw new Error('--check compares the checked-in site only');
const source = await readFile(join(repo, 'assets/js/data.js'), 'utf8');
const data = vm.runInNewContext(`${source}\n({SITE, PROJECTS, WHAT_I_DO, SKILLS, EXPERIENCE, ACTIVITIES, EDUCATION, TOOLS, LANGUAGES})`, {}, { timeout: 1000 });
const site = new URL(data.SITE.url);
if (site.protocol !== 'https:') throw new Error('SITE.url must be an HTTPS URL');
if (!site.pathname.endsWith('/')) throw new Error('SITE.url must end with /');
const slugs = new Set();
for (const project of data.PROJECTS) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) || slugs.has(project.slug)) {
    throw new Error(`Invalid or duplicate project slug: ${project.slug}`);
  }
  slugs.add(project.slug);
}
for (const skill of data.SKILLS) {
  if (skill.project && !slugs.has(skill.project)) throw new Error(`Unknown skill project: ${skill.project}`);
}

const theme = `<script>(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme',matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}})();</script>`;
const pages = ['index','about','projects','skills','resume','contact','404','project'];
const outputs = new Map();

// Template metadata is HTML-encoded already; decode before escaping into new tags.
function decodeMetadata(value) {
  return value?.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (entity, name) => {
    if (name.startsWith('#')) {
      const number = name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : Number(name.slice(1));
      return number > 0 && number <= 0x10ffff ? String.fromCodePoint(number) : entity;
    }
    return {amp:'&', quot:'"', apos:"'", lt:'<', gt:'>', nbsp:'\u00a0'}[name.toLowerCase()];
  });
}

function metadata(title, description, path, image, noindex) {
  const canonical = new URL(path, site).href;
  const imageUrl = new URL(image || 'assets/img/ble-ecg-pcba.jpg', site).href;
  return `<link rel="canonical" href="${esc(canonical)}" />
  ${noindex ? '<meta name="robots" content="noindex, follow" />\n  ' : ''}<meta property="og:type" content="website" />
  <meta property="og:site_name" content="${esc(data.SITE.name)} — Engineering portfolio" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(canonical)}" />
  <meta property="og:image" content="${esc(imageUrl)}" />
  <meta property="og:image:alt" content="${esc(image ? title : 'Smart Sportswear sensor PCB designed in KiCad')}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${esc(imageUrl)}" />`;
}

function render(template, page, root, project) {
  const renderer = createRenderer(data, root);
  const title = project ? `${project.title} — ${data.SITE.name}` : decodeMetadata(template.match(/<title>(.*?)<\/title>/s)?.[1]);
  const description = project ? project.oneLiner : decodeMetadata(template.match(/<meta name="description" content="(.*?)"\s*\/>/s)?.[1]);
  if (!title || !description) throw new Error(`Missing title/description for ${page}`);
  let html = template.replace(/\{\{([\w]+)(?::(\d+))?\}\}/g, (_, token, limit) => {
    if (token === 'root') return root;
    if (token === 'theme') return theme;
    if (token === 'header') return renderer.header(project ? 'projects' : page === 'index' ? 'home' : page === 'project' ? 'projects' : page);
    if (token === 'footer') return renderer.footer();
    if (token === 'projectDetail') return renderer.project(project);
    if (token === 'projectDirectory') return data.PROJECTS.map(p => `<li><a data-project-slug="${esc(p.slug)}" href="${root}projects/${p.slug}.html">${esc(p.title)}</a></li>`).join('\n');
    if (token === 'email') return esc(data.SITE.email);
    if (token === 'resumePdf') return root + esc(data.SITE.resumePdf);
    if (renderer.sections[token]) return renderer.sections[token](Number(limit || 0));
    throw new Error(`Unknown template token ${token}`);
  });
  if (project) {
    html = html.replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
      .replace(/<meta name="description" content=".*?"\s*\/>/s, `<meta name="description" content="${esc(description)}" />`);
  }
  const path = project ? `projects/${project.slug}.html` : page === 'index' ? '' : page === 'project' ? 'projects.html' : `${page}.html`;
  html = html.replace('</head>', `  ${metadata(title, description, path, project?.cover, ['404','project'].includes(page))}\n</head>`);
  if (/\{\{\w+/.test(html)) throw new Error(`Unexpanded template in ${page}`);
  return '<!-- Generated by node scripts/build.mjs; edit templates/ and assets/js/data.js. -->\n' + html;
}

for (const page of pages) {
  const template = await readFile(join(repo, 'templates', `${page}.html`), 'utf8');
  outputs.set(`${page}.html`, render(template, page, page === '404' ? site.pathname : ''));
}
const projectTemplate = await readFile(join(repo, 'templates/project-detail.html'), 'utf8');
for (const project of data.PROJECTS) {
  outputs.set(`projects/${project.slug}.html`, render(projectTemplate, 'project-detail', '../', project));
}
const canonicalPaths = ['', ...pages.filter(p => !['index','404','project'].includes(p)).map(p => p + '.html'), ...data.PROJECTS.map(p => `projects/${p.slug}.html`)];
outputs.set('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${canonicalPaths.map(p => `  <url><loc>${esc(new URL(p, site).href)}</loc></url>`).join('\n')}\n</urlset>\n`);
outputs.set('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', site).href}\n`);

const stale = [];
for (const [path, html] of outputs) {
  const target = join(output, path);
  if (check) {
    const current = await readFile(target, 'utf8').catch(() => '');
    if (current !== html) stale.push(path);
  } else {
    await mkdir(dirname(target), {recursive:true});
    await writeFile(target, html);
  }
}
if (stale.length) throw new Error(`Generated site is stale. Run node scripts/build.mjs. Files: ${stale.join(', ')}`);
if (!check && output !== repo) {
  await cp(join(repo, 'assets'), join(output, 'assets'), {recursive:true});
  await writeFile(join(output, '.nojekyll'), '');
}
console.log(check ? `Verified ${outputs.size} generated files.` : `Built ${outputs.size} files in ${relative(repo, output) || '.'}.`);
