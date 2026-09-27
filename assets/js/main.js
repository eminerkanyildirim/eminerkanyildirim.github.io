/* Progressive enhancement: the page's content and links are already in HTML. */
(() => {
  const $ = (selector) => document.querySelector(selector);
  const currentTheme = () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

  function themeIcon(theme) {
    const attributes = 'width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
    return theme === 'dark'
      ? `<svg ${attributes}><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>`
      : `<svg ${attributes}><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"></path></svg>`;
  }

  function initNavigation() {
    const button = $('.nav-toggle');
    const links = $('.nav-links');
    if (!button || !links) return;
    const close = () => {
      links.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    };
    button.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && links.classList.contains('open')) {
        close();
        button.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.nav')) close();
    });
    links.addEventListener('click', event => {
      if (event.target.closest('a')) close();
    });
    button.hidden = false;
    document.documentElement.classList.add('nav-ready');
  }

  function initTheme() {
    const button = $('[data-theme-toggle]');
    if (!button) return;
    const updateButton = () => {
      const theme = currentTheme();
      const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
      button.innerHTML = themeIcon(theme);
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
    };
    button.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch { /* Storage can be unavailable. */ }
      updateButton();
    });
    updateButton();
    button.hidden = false;
  }

  function initEmailCopy() {
    const button = $('[data-copy-email]');
    const status = $('[data-copy-status]');
    if (!button || !status || !navigator.clipboard?.writeText || !window.isSecureContext) return;
    button.hidden = false;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copyEmail);
        status.textContent = 'Email address copied.';
      } catch {
        status.textContent = 'Select and copy the email address above, or use the email link.';
      }
    });
  }

  // Old bookmarks keep working; new links use static, shareable project pages.
  function resolveLegacyProject() {
    if (!document.body.hasAttribute('data-legacy-projects')) return;
    const slug = new URLSearchParams(location.search).get('p');
    if (!slug) return;
    const link = [...document.querySelectorAll('[data-project-slug]')]
      .find(a => a.dataset.projectSlug === slug);
    if (link) {
      location.replace(link.href + location.hash);
    } else {
      document.title = 'Project not found — Emin Erkan YILDIRIM';
      const heading = $('h1');
      if (heading) heading.textContent = '404 — project not found';
      const intro = $('[data-project-intro]');
      if (intro) intro.textContent = 'That project does not exist. Choose a project below or return to the projects list.';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTheme();
    initEmailCopy();
    resolveLegacyProject();
    document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });
  });
})();
