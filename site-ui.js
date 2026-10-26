/* Shared, accessible navigation for the homepage and song pages. */
(() => {
  document.documentElement.classList.add('js');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;
  toggle.hidden = false;
  function close() {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { close(); toggle.focus(); }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) close(); });
  window.matchMedia('(min-width: 960px)').addEventListener('change', close);
  document.querySelectorAll('[data-year]').forEach(element => { element.textContent = new Date().getFullYear(); });
  const links = [...nav.querySelectorAll("a")];

const sections = [...document.querySelectorAll("main > section[id]")]
  .filter(section =>
    links.some(link => link.hash === `#${section.id}`)
  );

if (sections.length) {
  const header = document.querySelector(".site-header");
  let updateQueued = false;

  function updateActiveSection() {
    updateQueued = false;

    const headerBottom = Math.max(
      0,
      header?.getBoundingClientRect().bottom || 0
    );

    let activeId = null;

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= headerBottom + 1) {
        activeId = section.id;
      }
    }

    for (const link of links) {
      if (activeId && link.hash === `#${activeId}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  }

  function scheduleUpdate() {
    if (updateQueued) return;

    updateQueued = true;
    requestAnimationFrame(updateActiveSection);
  }

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);

  updateActiveSection();
}
})();
