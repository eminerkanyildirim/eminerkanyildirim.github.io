# Portfolio — Electronic Engineer

A static, data-driven portfolio site. Dark terminal / "Mono Minimal" aesthetic,
strictly monochrome, subtle motion. No build step, no framework — plain HTML/CSS/JS.

## Edit content in ONE place

Everything you'll want to change lives in **[`assets/js/data.js`](assets/js/data.js)**:

- `SITE` — name, role, tagline, location, email, GitHub, LinkedIn, CV path.
- `PROJECTS` — the project list. **Add a project = add one object** (see the
  field notes in the file). Cards, the projects list, and each detail page all
  render from this array automatically.
- `SKILLS`, `WHAT_I_DO` — skills and the hardware/firmware/software breakdown.
- `EXPERIENCE`, `ACTIVITIES`, `EDUCATION` — work history, extracurriculars and
  education, rendered on the résumé page.
- `POSTS` — optional blog posts (empty state handled).

You should not need to touch the HTML to update content.

### Updating details
1. Edit `SITE` in `assets/js/data.js` (name, contact, links).
2. The CV PDF lives at `assets/Emin-Erkan-Yildirim-CV.pdf` — replace that file to
   swap the download (or change `SITE.resumePdf` and the link in `resume.html`).
3. Add project images under `assets/img/` and set each project's `cover`.

### Project media
Each project can show a static image, an animated gif, or a video. Drop the file
in `assets/img/` (or `assets/vid/`) and set the matching field:

| field | use |
|---|---|
| `cover` | static image — shown in the project **row** (homepage / projects list) |
| `gif` | screen recording of the thing running — shown on the **detail page** |
| `video` | YouTube/Vimeo link, or a local `.mp4` in `assets/vid/` |

Rows always use `cover`, so the lists stay calm — a page of looping gifs is
noisy. The gif is the payoff on the detail page, where precedence is
**`video` → `gif` → `cover`** → placeholder. Set `gifAlt` for the gif's alt text
(defaults to "&lt;title&gt; in action").

Gifs of a full UI get large quickly — if one lands above a few MB, prefer an
`.mp4` via `video` instead, since the homepage loads it.

## Pages
`index` · `about` · `projects` (list) · `project.html?p=<slug>` (detail) ·
`skills` · `resume` · `blog` · `contact` · `404`.

Shared nav/footer are injected by [`assets/js/main.js`](assets/js/main.js), so
they only exist in one place.

## Run locally
Any static server works, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(Open via a server, not `file://` — the pages load `data.js` as a script,
which is fine, but a server matches how Pages serves it.)

## Deploy to GitHub Pages
1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. The included workflow (`.github/workflows/deploy.yml`) publishes the repo
   root on every push to `main`.

The site uses **relative paths** throughout, so it works both at a user/org
Pages root (`https://<user>.github.io/`) and a project Pages sub-path
(`https://<user>.github.io/<repo>/`) with no config change. A `.nojekyll` file
is included so nothing gets stripped.
