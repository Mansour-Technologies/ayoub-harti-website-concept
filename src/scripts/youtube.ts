export function loadFacade(box: HTMLElement): void {
  const id = box.dataset.yt;
  if (!id || box.querySelector('iframe')) return;
  const f = document.createElement('iframe');
  // autoplay=1 only after an explicit click on the facade.
  f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  f.title = box.dataset.ytTitle || 'Vidéo YouTube';
  f.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
  f.referrerPolicy = 'strict-origin-when-cross-origin';
  f.allowFullscreen = true;
  box.innerHTML = '';
  box.appendChild(f);
  box.dispatchEvent(new CustomEvent('yt:loaded', { bubbles: true, detail: { id } }));
}
export function initFacades(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-yt]').forEach((box) => {
    if (box.dataset.ytBound) return;
    box.dataset.ytBound = '1';
    box.querySelector('button')?.addEventListener('click', () => loadFacade(box));
  });
}
