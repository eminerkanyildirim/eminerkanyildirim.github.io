/* =============================================================
   main.js — renders shared chrome + data-driven content.
   Depends on data.js (SITE, PROJECTS, SKILLS, WHAT_I_DO, POSTS,
   EXPERIENCE, ACTIVITIES, EDUCATION).
   All content lives in data.js; this file only renders it.
   ============================================================= */

/* ---- Tiny helpers ------------------------------------------ */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
const el = (html) => {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
};

/* Base path: works both at domain root and /<repo>/ on Pages.
   Every page sets <html data-root="..."> pointing at site root. */
const ROOT = document.documentElement.dataset.root || "";
const url = (p) => ROOT + p;

/* ---- Navigation model -------------------------------------- */
const NAV = [
  { label: "home",     href: "index.html" },
  { label: "about",    href: "about.html" },
  { label: "projects", href: "projects.html" },
  { label: "skills",   href: "skills.html" },
  { label: "resume",   href: "resume.html" },
  { label: "contact",  href: "contact.html" },
];

/* ---- Header ------------------------------------------------- */
function renderHeader() {
  const mount = $("[data-header]");
  if (!mount) return;
  const current = document.body.dataset.page || "";
  const links = NAV.map(
    (n) =>
      `<li><a href="${url(n.href)}"${
        n.label === current ? ' aria-current="page"' : ""
      }>${n.label}</a></li>`
  ).join("");

  const theme = currentTheme();
  const nextLabel = theme === "dark" ? "light" : "dark";

  mount.innerHTML = `
    <div class="wrap nav">
      <a class="brand" href="${url("index.html")}">${esc(SITE.name)}<span class="dim"> ~/</span></a>
      <div class="nav-right">
        <ul class="nav-links" id="nav-links">${links}</ul>
        <button class="theme-toggle" type="button" data-theme-toggle
          aria-label="Switch to ${nextLabel} mode" title="Switch to ${nextLabel} mode">${themeIcon(theme)}</button>
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav-links">menu</button>
      </div>
    </div>`;

  const toggle = $(".nav-toggle", mount);
  const list = $(".nav-links", mount);
  toggle.addEventListener("click", () => {
    const open = list.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  $("[data-theme-toggle]", mount).addEventListener("click", (e) => {
    const btn = e.currentTarget;
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (err) { /* ignore */ }
    // Icon + label describe the mode the button will switch TO next.
    const after = next === "dark" ? "light" : "dark";
    btn.innerHTML = themeIcon(next);
    btn.setAttribute("aria-label", "Switch to " + after + " mode");
    btn.setAttribute("title", "Switch to " + after + " mode");
  });
}

/* Reads the theme currently applied to <html> (set pre-paint by the inline
   head script). Falls back to light. */
function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

/* Inline SVG so the icon renders everywhere (no emoji-font dependency) and
   inherits colour via currentColor. Shows the sun while dark (tap for light),
   the moon while light (tap for dark). */
function themeIcon(theme) {
  const attrs =
    'width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  if (theme === "dark") {
    return `<svg ${attrs}><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>`;
  }
  return `<svg ${attrs}><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"></path></svg>`;
}

/* ---- Footer ------------------------------------------------- */
function renderFooter() {
  const mount = $("[data-footer]");
  if (!mount) return;
  const year = new Date().getFullYear();
  mount.innerHTML = `
    <div class="wrap footer-inner">
      <p class="small">© ${year} ${esc(SITE.name)} — ${esc(SITE.role)}</p>
      <ul class="footer-links">
        <li><a href="mailto:${esc(SITE.email)}">email</a></li>
        <li><a href="${esc(SITE.github)}" target="_blank" rel="noopener">github</a></li>
        <li><a href="${esc(SITE.linkedin)}" target="_blank" rel="noopener">linkedin</a></li>
      </ul>
    </div>`;
}

/* ---- Reusable fragments ------------------------------------ */
function projectRow(p, i) {
  const num = String(i + 1).padStart(2, "0");
  const tags = p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("");
  // Thumbnail: project cover image, or a mono placeholder with initials.
  const initials = esc(
    p.title.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()
  );
  // Rows use the static cover — a gif animating in every row is too busy.
  // The gif is saved for the detail page. Falls back to the gif's first frame
  // only if a project has no cover at all.
  const thumbSrc = p.cover || p.gif;
  const thumb = thumbSrc
    ? `<span class="thumb"><img src="${url(esc(thumbSrc))}" alt="${esc(p.title)} preview" loading="lazy"></span>`
    : `<span class="thumb"><span class="thumb-ph">${initials}</span></span>`;
  return `
    <li>
      <a class="work-row" href="${url("project.html")}?p=${encodeURIComponent(p.slug)}"
         aria-label="View details: ${esc(p.title)}">
        <span class="num">${num}</span>
        ${thumb}
        <span class="body">
          <h3>${esc(p.title)}</h3>
          <span class="oneliner">${esc(p.oneLiner)}</span>
        </span>
        <span class="meta">
          <span class="status" data-status="${esc(p.status)}">${esc(p.status)}</span>
          <span class="tags">${tags}</span>
          <span class="view">view details →</span>
        </span>
      </a>
    </li>`;
}

/* Role-style entries (experience / activities). Each row keeps the
   title, firm/location and dates on their own lines so they read as a
   resume rather than one run-on sentence. */
function roleRows(list) {
  return list
    .map((r) => {
      const org = [
        r.org && esc(r.org),
        r.location && `<span class="loc">${esc(r.location)}</span>`,
      ]
        .filter(Boolean)
        .join(' <span class="at">·</span> ');
      const points = (r.points || [])
        .map((p) => `<li>${esc(p)}</li>`)
        .join("");
      return `
      <div class="cv-entry">
        <div class="cv-entry-head">
          <div>
            <h3 class="cv-role">${esc(r.role)}</h3>
            ${org ? `<p class="cv-org">${org}</p>` : ""}
          </div>
          ${r.period ? `<p class="cv-period">${esc(r.period)}</p>` : ""}
        </div>
        ${points ? `<ul class="check-list cv-points">${points}</ul>` : ""}
      </div>`;
    })
    .join("");
}

/* ---- Page renderers (called by data-render attr) ----------- */
const renderers = {
  /* Featured projects on the homepage (first 3) + all on list page */
  projects(node) {
    const limit = parseInt(node.dataset.limit || "0", 10);
    const list = limit ? PROJECTS.slice(0, limit) : PROJECTS;
    node.innerHTML = list.map((p, i) => projectRow(p, i)).join("");
  },

  whatido(node) {
    node.innerHTML = WHAT_I_DO.map(
      (w) => `
      <div class="cell reveal">
        <div class="track">${esc(w.track)}</div>
        <p>${esc(w.plain)}</p>
        <div class="tags" style="justify-content:flex-start">
          ${w.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}
        </div>
      </div>`
    ).join("");
  },

  skills(node) {
    node.innerHTML = SKILLS.map(
      (s) => `
      <div class="dl-row">
        <dt>${esc(s.name)}</dt>
        <dd>${esc(s.detail)}</dd>
      </div>`
    ).join("");
  },

  experience(node) {
    node.innerHTML = roleRows(typeof EXPERIENCE !== "undefined" ? EXPERIENCE : []);
  },

  activities(node) {
    node.innerHTML = roleRows(typeof ACTIVITIES !== "undefined" ? ACTIVITIES : []);
  },

  education(node) {
    const list = typeof EDUCATION !== "undefined" ? EDUCATION : [];
    node.innerHTML = list
      .map((e) => {
        const org = [
          e.org && esc(e.org),
          e.detail && `<span class="loc">${esc(e.detail)}</span>`,
        ]
          .filter(Boolean)
          .join(' <span class="at">·</span> ');
        return `
      <div class="cv-entry">
        <div class="cv-entry-head">
          <div>
            <h3 class="cv-role">${esc(e.degree)}</h3>
            ${org ? `<p class="cv-org">${org}</p>` : ""}
          </div>
          ${e.period ? `<p class="cv-period">${esc(e.period)}</p>` : ""}
        </div>
      </div>`;
      })
      .join("");
  },

  posts(node) {
    if (!POSTS.length) {
      node.innerHTML = `<p class="prose" style="color:var(--dim)">No posts yet — check back soon. <span class="cursor"></span></p>`;
      return;
    }
    node.innerHTML = POSTS.map(
      (post) => `
      <li>
        <a class="work-row work-row--simple" href="${esc(post.href)}">
          <span class="num">${esc(post.date || "")}</span>
          <span class="body">
            <h3>${esc(post.title)}</h3>
            <span class="oneliner">${esc(post.excerpt || "")}</span>
          </span>
        </a>
      </li>`
    ).join("");
  },
};

/* ---- Video embed ------------------------------------------
   Accepts either:
     - a YouTube or Vimeo link/ID  -> responsive iframe
     - a local file ("assets/vid/demo.mp4") -> <video> player
   ------------------------------------------------------------ */
function projectVideo(src, title) {
  const s = String(src).trim();

  // YouTube (youtu.be/ID, watch?v=ID, /embed/ID, /shorts/ID)
  const yt = s.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/
  );
  if (yt) {
    return `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${esc(
      yt[1]
    )}" title="${esc(title)} — video" loading="lazy" allowfullscreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`;
  }

  // Vimeo (vimeo.com/ID)
  const vm = s.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) {
    return `<div class="video"><iframe src="https://player.vimeo.com/video/${esc(
      vm[1]
    )}" title="${esc(title)} — video" loading="lazy" allowfullscreen
      allow="autoplay; fullscreen; picture-in-picture"></iframe></div>`;
  }

  // Local / self-hosted file
  if (/\.(mp4|webm|ogg|mov)$/i.test(s)) {
    return `<div class="video"><video controls preload="metadata"
      src="${url(esc(s))}">Your browser can't play this video.</video></div>`;
  }

  // Bare 11-char YouTube ID
  if (/^[\w-]{11}$/.test(s)) {
    return `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${esc(
      s
    )}" title="${esc(title)} — video" loading="lazy" allowfullscreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`;
  }

  return "";
}

/* ---- Looping silent demo (the `gif` field) -----------------
   Accepts a real .gif, or an .mp4/.webm — a video encoded from the same
   recording is far smaller and keeps full colour (gif is capped at 256),
   so it plays gif-style: autoplay, loop, muted, no controls.
   ------------------------------------------------------------ */
function projectLoop(src, alt) {
  const s = String(src).trim();
  if (/\.(mp4|webm)$/i.test(s)) {
    const type = /\.webm$/i.test(s) ? "video/webm" : "video/mp4";
    return `<div class="cover"><video class="loop" autoplay loop muted playsinline
      preload="metadata" aria-label="${esc(alt)}">
      <source src="${url(esc(s))}" type="${type}">
    </video></div>`;
  }
  return `<div class="cover"><img src="${url(esc(s))}" alt="${esc(alt)}"></div>`;
}

/* ---- Project detail page ----------------------------------- */
function renderProjectDetail() {
  const mount = $("[data-project-detail]");
  if (!mount) return;
  const slug = new URLSearchParams(location.search).get("p");
  const p = PROJECTS.find((x) => x.slug === slug);

  if (!p) {
    mount.innerHTML = `
      <a class="back-link" href="${url("projects.html")}">all projects</a>
      <h1>404 — project not found</h1>
      <p class="prose" style="margin-top:1rem">That project doesn't exist. Head back to the
        <a href="${url("projects.html")}">projects list</a>.</p>`;
    return;
  }

  document.title = `${p.title} — ${SITE.name}`;
  const idx = PROJECTS.indexOf(p);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  // Media: prefer video, then gif, then cover image, else a placeholder.
  const media = p.video
    ? projectVideo(p.video, p.title)
    : p.gif
    ? projectLoop(p.gif, p.gifAlt || `${p.title} in action`)
    : p.cover
    ? `<div class="cover"><img src="${url(esc(p.cover))}" alt="${esc(p.title)}"></div>`
    : `<div class="cover"><span class="placeholder">[ ${esc(p.title)} — image TBD ]</span></div>`;

  // Extended write-up: `body` is an array of paragraphs; falls back to summary.
  const bodyParas = (Array.isArray(p.body) && p.body.length ? p.body : [p.summary])
    .filter(Boolean)
    .map((para) => `<p>${esc(para)}</p>`)
    .join("");

  const links = (p.links || []).length
    ? `<div class="btn-row" style="margin-top:2rem">${p.links
        .map(
          (l) =>
            `<a class="btn" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(
              l.label
            )} <span class="arrow">↗</span></a>`
        )
        .join("")}</div>`
    : "";

  mount.innerHTML = `
    <a class="back-link" href="${url("projects.html")}">all projects</a>
    <p class="eyebrow mono-label">${esc(p.status)} · ${esc(p.year)}</p>
    <h1>${esc(p.title)}</h1>
    <p class="lede" style="color:var(--muted);margin:0.75rem 0 1.25rem">${esc(p.oneLiner)}</p>
    <div class="tags" style="justify-content:flex-start;margin-bottom:1.5rem">
      ${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}
    </div>
    ${media}
    <div class="prose">
      ${bodyParas}
      <h2>Highlights</h2>
      <ul class="check-list">
        ${(p.highlights || []).map((h) => `<li>${esc(h)}</li>`).join("")}
      </ul>
      <h2>Stack</h2>
      <div class="tags" style="justify-content:flex-start">
        ${(p.stack || []).map((s) => `<span class="tag">${esc(s)}</span>`).join("")}
      </div>
      ${links}
    </div>
    <div style="margin-top:2.5rem;border-top:1px solid var(--border);padding-top:1.25rem">
      <a class="mono-label" href="${url("project.html")}?p=${encodeURIComponent(next.slug)}"
         style="color:var(--muted)">next → ${esc(next.title)}</a>
    </div>`;
}

/* ---- Scroll reveal ----------------------------------------- */
function initReveal() {
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach((e) => e.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((e) => io.observe(e));
}

/* ---- Boot -------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  $$("[data-render]").forEach((node) => {
    const fn = renderers[node.dataset.render];
    if (fn) fn(node);
  });
  renderProjectDetail();
  initReveal();
});
