/** Full-screen menu dialog: focus trap, Escape to close, focus return, scroll lock. */
export function initMenu(): void {
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (!menu || !openBtn || !closeBtn) return;

  const focusables = () =>
    Array.from(menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter((el) => el.offsetParent !== null);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    const f = focusables();
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  function open() {
    menu!.hidden = false;
    openBtn!.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    closeBtn!.focus();
  }
  function close(returnFocus = true) {
    menu!.hidden = true;
    openBtn!.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    if (returnFocus) openBtn!.focus();
  }
  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', () => close());
  // Anchor links: close the dialog and let the browser scroll to the section.
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => close(false)));
}

/** Highlights the header link of the section currently in view. */
export function initScrollSpy(): void {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.hdr__nav a[href^="#"]'));
  const map = new Map(links.map((a) => [a.getAttribute('href')!.slice(1), a]));
  const sections = Array.from(map.keys()).map((id) => document.getElementById(id)).filter((x): x is HTMLElement => !!x);
  if (!sections.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((l) => l.classList.remove('is-active'));
      map.get(e.target.id)?.classList.add('is-active');
    }),
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => io.observe(s));
}
