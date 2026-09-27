# Portfolio — Electronic Engineer

Emin Erkan Yıldırım's static engineering portfolio, hosted on GitHub Pages.
It keeps the existing Warm Bench palette, Space Grotesk / JetBrains Mono typography,
and light/dark themes. Plain HTML/CSS/JavaScript; no framework or npm dependencies.

Pages are generated ahead of time with a small Node script. Project descriptions,
resume entries, navigation and contact details are readable without JavaScript.
JavaScript enhances the mobile menu, theme toggle and copy-email button.

## Edit content

- **`assets/js/data.js`**: owner details, project records, skills, tools, languages,
  work history and education. This remains the shared source of structured content.
- **`templates/*.html`**: page introductions, layouts and calls to action.
- **`scripts/render.mjs`**: shared navigation, footer and data-driven markup.
- **`assets/css/style.css`**: theme tokens and responsive styles.
- **`assets/js/main.js`**: browser interactions only.

After editing content or templates, regenerate the checked-in HTML:

```bash
node scripts/build.mjs
```

Do not edit the generated root HTML files or `projects/*.html` directly: regeneration
will replace them. Add a project by adding one record to `PROJECTS`, plus its media,
and running the command. A separate project HTML page, metadata, links and sitemap
entry are generated automatically. No card markup needs to be copied.

`SITE.url` is the public HTTPS base URL, including any project subpath and a trailing
slash. It controls canonical/share URLs and the custom 404's root-relative paths.
Set it before moving the site to another domain or GitHub Pages subpath.

## CV

The downloadable PDF is `assets/Emin-Erkan-Yildirim-CV.pdf`. Replace that file to
update the CV; regeneration does not edit its contents. Change `SITE.resumePdf`
if the filename changes. The owner maintains the PDF separately.

## Project media

| Field | Use |
| --- | --- |
| `cover` | Static thumbnail, video poster and project share image |
| `video` | Local MP4/WebM, or a YouTube/Vimeo URL |
| `gif` | Legacy field; video files get controls, GIFs use the static cover |

Videos have controls and do not autoplay, so a static poster is shown until the
visitor chooses to play. Solaris uses a compressed MP4 derived from the original
GIF; the original is retained as a source asset but is no longer loaded by the pages.

## Run and verify

Node 22 or later is recommended for generation; there are no packages to install.

```bash
node scripts/build.mjs
node scripts/build.mjs --check
python3 -m http.server 8000
```

Open `http://localhost:8000`. Verify mobile navigation, light/dark mode, project
links, media controls and the CV download after changes. `--check` compares the
checked-in HTML and metadata against the current templates/data and exits with an
error if regeneration is needed.

## Pages and links

`index.html` · `about.html` · `projects.html` · `skills.html` · `resume.html` ·
`contact.html` · `404.html` · `projects/<slug>.html`.

Share the static `projects/<slug>.html` URLs. Each includes its own description,
canonical URL and social preview metadata without relying on a crawler executing
JavaScript. Old `project.html?p=<slug>` bookmarks redirect to the corresponding
static page; without JavaScript, the legacy page offers links to every project.
Invalid slugs show a useful error and project choices.

`404.html` uses the configured site-root path for assets and recovery links, so it
also works for missing URLs several directories deep. A plain Python server uses
its own error document; test the generated custom 404 with a Pages-compatible
server or by serving that document at a nested missing URL.

## Deploy

The GitHub Actions workflow generates the site on pushes to `main` or manual runs.
Only generated HTML, the sitemap/robots files, `.nojekyll` and `assets/` are included
in the Pages artifact; templates, scripts and local project documentation are not
published.

Build the same deployable directory locally with:

```bash
node scripts/build.mjs --out-dir _site
```

The standard pages use relative links; the public base URL handles metadata and
404 recovery. In repository settings, select **Pages → GitHub Actions** as the
publishing source.
