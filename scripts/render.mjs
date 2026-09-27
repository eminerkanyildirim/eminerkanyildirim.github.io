// Shared static markup. Content stays in assets/js/data.js.
export const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g,
  c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));

export function createRenderer(data, root = '') {
  const { SITE, PROJECTS, WHAT_I_DO, SKILLS, EXPERIENCE, ACTIVITIES, EDUCATION } = data;
  const esc = escapeHtml;
  const url = path => root + path;
  const projectUrl = p => url(`projects/${p.slug}.html`);
  const tags = items => items.map(t => `<span class="tag">${esc(t)}</span>`).join('');
  const external = (href, label, classes = '') => `<a${classes ? ` class="${classes}"` : ''} href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`;

  function header(page) {
    const links = ['home','about','projects','skills','resume','contact'].map(label =>
      `<li><a href="${url(label === 'home' ? 'index.html' : label + '.html')}"${page === label ? ' aria-current="page"' : ''}>${label}</a></li>`).join('');
    return `<nav class="wrap nav" aria-label="Main navigation">
      <a class="brand" href="${url('index.html')}">${esc(SITE.name)}<span class="dim"> ~/</span></a>
      <div class="nav-right">
        <ul class="nav-links" id="nav-links">${links}</ul>
        <button class="theme-toggle" type="button" data-theme-toggle hidden aria-label="Switch to dark mode" title="Switch to dark mode"></button>
        <button class="nav-toggle" type="button" hidden aria-expanded="false" aria-controls="nav-links">menu</button>
      </div>
    </nav>`;
  }

  function footer() {
    return `<div class="wrap footer-inner">
      <p class="small">© <span data-year>${new Date().getFullYear()}</span> ${esc(SITE.name)} — ${esc(SITE.role)}</p>
      <ul class="footer-links">
        <li><a href="mailto:${esc(SITE.email)}">email</a></li>
        <li>${external(SITE.github, 'github')}</li>
        <li>${external(SITE.linkedin, 'linkedin')}</li>
      </ul>
    </div>`;
  }

  function projects(limit = 0) {
    return (limit ? PROJECTS.slice(0, limit) : PROJECTS).map((p, i) => `<li>
      <a class="work-row" href="${projectUrl(p)}" aria-label="View details: ${esc(p.title)}">
        <span class="num">${String(i + 1).padStart(2, '0')}</span>
        <span class="thumb">${p.cover ? `<img src="${url(esc(p.cover))}" alt="${esc(p.title)} preview" loading="lazy">` : `<span class="thumb-ph">${esc(p.title.slice(0,2))}</span>`}</span>
        <span class="body"><h3>${esc(p.title)}</h3><span class="oneliner">${esc(p.oneLiner)}</span></span>
        <span class="meta"><span class="status" data-status="${esc(p.status)}">${esc(p.status)}</span><span class="tags">${tags(p.tags)}</span><span class="view">view details →</span></span>
      </a>
    </li>`).join('\n');
  }

  function definitions(items) {
    return items.map(s => `<div class="dl-row"><dt>${esc(s.name)}</dt><dd>${esc(s.detail)}${s.project ? ` <a href="${url(`projects/${s.project}.html`)}">View project →</a>` : ''}</dd></div>`).join('\n');
  }

  function roles(items) {
    return items.map(r => `<div class="cv-entry">
      <div class="cv-entry-head"><div>
        <h3 class="cv-role">${esc(r.role)}</h3>
        <p class="cv-org">${esc(r.org)}${r.location ? ` <span class="at">·</span> <span class="loc">${esc(r.location)}</span>` : ''}</p>
      </div><p class="cv-period">${esc(r.period)}</p></div>
      <ul class="check-list cv-points">${r.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
    </div>`).join('\n');
  }

  function education() {
    return EDUCATION.map(e => `<div class="cv-entry"><div class="cv-entry-head"><div>
      <h3 class="cv-role">${esc(e.degree)}</h3>
      <p class="cv-org">${esc(e.org)}${e.detail ? ` <span class="at">·</span> <span class="loc">${esc(e.detail)}</span>` : ''}</p>
    </div><p class="cv-period">${esc(e.period)}</p></div></div>`).join('\n');
  }

  function contact() {
    const rows = [
      {label:'email', value:SITE.email, href:'mailto:' + SITE.email},
      {label:'github', value:SITE.github.replace(/^https?:\/\//,''), href:SITE.github},
      {label:'linkedin', value:SITE.linkedin.replace(/^https?:\/\//,''), href:SITE.linkedin},
      {label:'location', value:SITE.location}
    ];
    return rows.map(r => `<li><span class="k">${r.label}</span>${r.href ? `<a class="v" href="${esc(r.href)}"${r.href.startsWith('https:') ? ' target="_blank" rel="noopener"' : ''}>${esc(r.value)}</a>` : `<span class="v">${esc(r.value)}</span>`}</li>`).join('\n');
  }

  function media(p) {
    const src = p.video || p.gif;
    if (src && /\.(mp4|webm|ogg|mov)$/i.test(src)) {
      const type = {mp4:'video/mp4', webm:'video/webm', ogg:'video/ogg', mov:'video/quicktime'}[src.split('.').pop().toLowerCase()];
      return `<div class="video"><video controls playsinline preload="none"${p.cover ? ` poster="${url(esc(p.cover))}"` : ''} aria-label="${esc(p.title)} demonstration">
        <source src="${url(esc(src))}" type="${type}">
        <a href="${url(esc(src))}">Download the demonstration video</a>
      </video></div>`;
    }
    const yt = src && src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
    const vm = src && src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (yt || vm) {
      const embed = yt ? `https://www.youtube-nocookie.com/embed/${yt[1]}` : `https://player.vimeo.com/video/${vm[1]}`;
      return `<div class="video"><iframe src="${esc(embed)}" title="${esc(p.title)} demonstration" loading="lazy" allowfullscreen></iframe></div>`;
    }
    // A static cover is the fallback; never introduce unpausable GIF playback.
    return p.cover ? `<div class="cover"><img src="${url(esc(p.cover))}" alt="${esc(p.title)}" fetchpriority="high"></div>` : '';
  }

  function project(p) {
    const next = PROJECTS[(PROJECTS.indexOf(p) + 1) % PROJECTS.length];
    return `<a class="back-link" href="${url('projects.html')}">all projects</a>
      <p class="eyebrow mono-label">${esc(p.status)} · ${esc(p.year)}</p>
      <h1>${esc(p.title)}</h1>
      <p class="lede" style="margin:0.75rem 0 1.25rem">${esc(p.oneLiner)}</p>
      <div class="tags" style="justify-content:flex-start;margin-bottom:1.5rem">${tags(p.tags)}</div>
      ${media(p)}
      <div class="prose">
        ${(p.body?.length ? p.body : [p.summary]).map(t => `<p>${esc(t)}</p>`).join('\n')}
        <h2>Highlights</h2>
        <ul class="check-list">${p.highlights.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
        <h2>Tools and technologies</h2>
        <div class="tags" style="justify-content:flex-start">${tags(p.stack)}</div>
        ${(p.links || []).length ? `<div class="btn-row" style="margin-top:2rem">${p.links.map(l => external(l.href, l.label === 'repo' ? 'View source on GitHub ↗' : l.label, 'btn')).join('')}</div>` : ''}
      </div>
      <div class="cta" style="margin-top:3rem"><div><h2>Want to discuss this work?</h2><p>Get in touch, or read more about my engineering experience.</p></div><div class="btn-row"><a class="btn" href="${url('resume.html')}">Resume</a><a class="btn btn--solid" href="${url('contact.html')}">Contact me <span class="arrow">↗</span></a></div></div>
      <div style="margin-top:2.5rem;border-top:1px solid var(--border);padding-top:1.25rem"><a class="back-link next-link" href="${projectUrl(next)}">Next project: ${esc(next.title)}</a></div>`;
  }

  const sections = {
    projects,
    whatido: () => WHAT_I_DO.map(w => `<div class="cell"><div class="track">${esc(w.track)}</div><p>${esc(w.plain)}</p><div class="tags" style="justify-content:flex-start">${tags(w.tags)}</div></div>`).join('\n'),
    skills: () => definitions(SKILLS),
    tools: () => definitions(data.TOOLS || []),
    languages: () => definitions(data.LANGUAGES || []),
    experience: () => roles(EXPERIENCE),
    activities: () => roles(ACTIVITIES),
    education,
    contact
  };
  return { header, footer, sections, project };
}
