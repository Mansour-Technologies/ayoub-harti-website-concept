/**
 * Click-to-load facades for official embeds.
 * - YouTube: player from youtube-nocookie.com, requested only after the visitor clicks the poster.
 * - Instagram: official /embed page of a public post, requested only after a click.
 * Nothing third-party (besides the YouTube-hosted poster image) loads before interaction.
 */
function iframeFor(box: HTMLElement): HTMLIFrameElement | null {
  const f = document.createElement('iframe');
  const kind = box.dataset.embed;
  const id = box.dataset.id ?? '';
  if (kind === 'yt') {
    // autoplay=1 only after an explicit click on the facade.
    f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    f.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
  } else if (kind === 'ig') {
    f.src = `https://www.instagram.com/p/${encodeURIComponent(id)}/embed/`;
    f.setAttribute('scrolling', 'no');
  } else return null;
  f.title = box.dataset.title || 'Contenu officiel';
  f.referrerPolicy = 'strict-origin-when-cross-origin';
  f.loading = 'eager';
  return f;
}

export function loadFacade(box: HTMLElement): void {
  if (box.querySelector('iframe')) return;
  const f = iframeFor(box);
  if (!f) return;
  const slot = box.querySelector<HTMLElement>('[data-embed-slot]') ?? box;
  slot.innerHTML = '';
  slot.appendChild(f);
  box.classList.add('is-loaded');
  f.focus({ preventScroll: true });
}

export function initFacades(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-embed]').forEach((box) => {
    if (box.dataset.bound) return;
    box.dataset.bound = '1';
    box.querySelector('button[data-embed-play]')?.addEventListener('click', () => loadFacade(box));
  });
}
