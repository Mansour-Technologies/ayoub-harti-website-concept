import { test, expect, type Page } from '@playwright/test';

const NOTICE = 'Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.';
const ALLOWED_HOSTS = ['www.instagram.com', 'm.me', 'www.youtube.com', 'www.facebook.com', 'mansourtechnologies.com', 'wa.me'];
const VIDEO = 'bQRpHAGhIXw';
const SECTIONS = ['prof', 'sbora', 'lives', 'offre', 'inscription', 'contact'];

function watch(page: Page) {
  const errors: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  return errors;
}

test('home loads with no console errors and no 404 assets @mobile', async ({ page }) => {
  const errors = watch(page);
  const res = await page.goto('', { waitUntil: 'networkidle' });
  expect(res?.status()).toBe(200);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } });
  await page.waitForLoadState('networkidle');
  expect(errors, errors.join('\n')).toEqual([]);
  await expect(page.locator('h1')).toHaveCount(1);
});

test('Arabic-first document: lang ar, dir rtl, French passages marked @mobile', async ({ page }) => {
  await page.goto('');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('.notice')).toHaveAttribute('lang', 'fr');
  expect(await page.locator('[lang="fr"]').count()).toBeGreaterThan(10);
});

test('demo notice, footer attribution and noindex are present @mobile', async ({ page, request }) => {
  await page.goto('');
  await expect(page.locator('.notice')).toContainText(NOTICE);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  const attr = page.locator('footer a[href="https://mansourtechnologies.com/"]');
  await expect(attr).toHaveText('Concept digital proposé par Mansour Technologies.');
  expect(await (await request.get('robots.txt')).text()).toContain('Disallow: /');
  expect((await request.get('og.png')).status()).toBe(200);
  // 404 page carries the notice and noindex too
  const nf = await request.get('page-qui-nexiste-pas/');
  expect(nf.status()).toBe(404);
  const html = await nf.text();
  expect(html).toContain(NOTICE);
  expect(html).toContain('noindex, nofollow');
});

test('anchor navigation scrolls to each section', async ({ page }) => {
  await page.goto('');
  const nav = page.getByRole('navigation', { name: 'القائمة الرئيسية' });
  for (const id of SECTIONS) {
    await nav.locator(`a[href="#${id}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});

test('mobile menu: keyboard open, focus trap, Escape, focus return, anchor link @mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('');
  const btn = page.locator('[data-menu-open]');
  await btn.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'قائمة الموقع' });
  await expect(dialog).toBeVisible();
  await expect(btn).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('[data-menu-close]')).toBeFocused();
  for (let i = 0; i < 14; i++) await page.keyboard.press('Tab');
  expect(await page.evaluate(() => !!document.activeElement?.closest('[data-menu]'))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(btn).toBeFocused();
  await btn.click();
  await dialog.locator('a[href="#contact"]').click();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator('#contact')).toBeInViewport();
});

test('every external link is https, verified domain, new tab, rel noopener @mobile', async ({ page }) => {
  await page.goto('');
  const links = await page.$$eval('a[href^="http"]', (as) => as.map((a) => ({ href: (a as HTMLAnchorElement).href, target: a.getAttribute('target'), rel: a.getAttribute('rel') ?? '' })));
  expect(links.length).toBeGreaterThan(8);
  for (const l of links) {
    const u = new URL(l.href);
    expect(u.protocol, l.href).toBe('https:');
    expect(ALLOWED_HOSTS, l.href).toContain(u.hostname);
    expect(l.target, l.href).toBe('_blank');
    expect(l.rel, l.href).toContain('noopener');
  }
  const contact = page.locator('#contact');
  // Facebook (Messenger) is the primary contact, YouTube next; Instagram is only a secondary link
  await expect(contact.locator('.cbtn').first()).toHaveAttribute('href', 'https://m.me/Prof.harti');
  await expect(contact.locator('.cbtn').nth(1)).toHaveAttribute('href', 'https://www.youtube.com/@ProfHarti');
  await expect(contact.locator('.cbtn[href*="instagram"], .cbtn[href*="ig.me"]')).toHaveCount(0);
  await expect(contact.locator('.also a[href="https://www.instagram.com/prof_harti/"]')).toHaveCount(1);
  await expect(page.locator('.hero .btn').first()).toHaveAttribute('href', 'https://m.me/Prof.harti');
  expect(await page.locator('a[href*="ig.me"]').count()).toBe(0);
  await expect(contact.locator('a[href="https://www.youtube.com/@ProfHarti"]')).toHaveCount(1);
  await expect(contact.locator('a[href="https://www.facebook.com/Prof.harti"]')).toHaveCount(1);
  // WhatsApp is absent while src/data/site.ts contact.whatsapp is null; no phone number anywhere in the page
  await expect(page.locator('[data-whatsapp], a[href*="wa.me"]')).toHaveCount(0);
  expect(await page.content()).not.toMatch(/0772|212772|89\s?55\s?99/);
  const hashes = await page.$$eval('a[href^="#"]', (as) => as.map((a) => a.getAttribute('href')!));
  for (const h of hashes) {
    expect(h).not.toBe('#');
    await expect(page.locator(h === '#main' ? 'main' : h)).toHaveCount(1);
  }
});

test('hero poster is the play button of the same official video and loads youtube-nocookie only on click @mobile', async ({ page }) => {
  const embeds: string[] = [];
  page.on('request', (r) => { if (/youtube(-nocookie)?\.com\/embed/.test(r.url())) embeds.push(r.url()); });
  await page.goto('', { waitUntil: 'networkidle' });
  const hero = page.locator('.hero [data-embed="yt"]');
  const btn = hero.getByRole('button', { name: /^Lire la vidéo officielle : للتسجيل في عرض التفوق/ });
  await expect(btn).toBeVisible();
  // the poster image is YouTube's own frame of that same video
  await expect(hero.locator('img')).toHaveAttribute('src', new RegExp(`^https://i\\.ytimg\\.com/vi(_webp)?/${VIDEO}/`));
  expect(await hero.locator('img').evaluate((i: HTMLImageElement) => i.complete && i.naturalWidth > 0)).toBe(true);
  await expect(page.locator('.hero .credit')).toHaveText('Image : vidéo officielle YouTube — Prof Harti');
  await expect(hero.locator('iframe')).toHaveCount(0);
  expect(embeds).toEqual([]);
  await btn.click();
  await expect(hero.locator('iframe')).toHaveAttribute('src', new RegExp(`^https://www\\.youtube-nocookie\\.com/embed/${VIDEO}\\?`));
});

test('hero poster falls back to a typographic panel when YouTube images fail, and still plays @mobile', async ({ page }) => {
  await page.route(/i\.ytimg\.com/, (r) => r.abort());
  await page.goto('');
  const hero = page.locator('.hero [data-embed="yt"]');
  await expect(hero).toHaveClass(/is-fallback/);
  await expect(hero.locator('.poster__fallback')).toBeVisible();
  await hero.locator('button[data-embed-play]').click();
  await expect(hero.locator('iframe')).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/bQRpHAGhIXw/);
});

test('hero photo keeps its natural colour (no duotone) and the hero is fully visible with reduced motion @mobile', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('', { waitUntil: 'networkidle' });
  const img = page.locator('.hero [data-embed="yt"] img');
  const look = await img.evaluate((i) => { const cs = getComputedStyle(i); return { blend: cs.mixBlendMode, filter: cs.filter, opacity: cs.opacity }; });
  // the old yellow duotone used mix-blend-mode: luminosity; colour-replacing blends and hue/greyscale filters are not allowed
  expect(['luminosity', 'color', 'hue', 'saturation']).not.toContain(look.blend);
  expect(look.filter).not.toMatch(/grayscale|hue-rotate|invert/);
  expect(look.opacity).toBe('1');
  for (const sel of ['.hero__word', '.hero__tag', '.hero__ctas .btn']) {
    await expect(page.locator(sel)).toBeVisible();
    expect(await page.locator(sel).evaluate((e) => getComputedStyle(e.closest('.hero__text > *') ?? e).opacity), sel).toBe('1');
  }
});

test('Instagram reels are official embeds loaded only on click', async ({ page }) => {
  const ig: string[] = [];
  page.on('request', (r) => { if (/instagram\.com\/p\/[^/]+\/embed/.test(r.url())) ig.push(r.url()); });
  await page.goto('#sbora', { waitUntil: 'networkidle' });
  const reels = page.locator('[data-embed="ig"]');
  await expect(reels).toHaveCount(2);
  await expect(page.locator('#sbora iframe')).toHaveCount(0);
  expect(ig).toEqual([]);
  await reels.first().locator('button[data-embed-play]').click();
  await expect(reels.first().locator('iframe')).toHaveAttribute('src', /^https:\/\/www\.instagram\.com\/p\/DfsoLePN-qy\/embed\/$/);
  await expect(reels.nth(1).locator('iframe')).toHaveCount(0);
});

test('no horizontal overflow and no clipped content at the 8 target widths', async ({ page }) => {
  for (const w of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto('');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `@${w}px`).toBeLessThanOrEqual(0);
    // body uses overflow-x: clip, so also check that no visible content box crosses the viewport edges
    const clipped = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      return Array.from(document.querySelectorAll('main *, header *, footer *'))
        .filter((el) => !el.closest('[aria-hidden="true"], .poster, .band, .sr-only, [data-menu]'))
        .filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.right > vw + 1 || r.left < -1); })
        .map((el) => `${el.tagName}.${(el as HTMLElement).className}`).slice(0, 5);
    });
    expect(clipped, `@${w}px`).toEqual([]);
  }
});

test('removed app routes are gone (404)', async ({ request }) => {
  for (const r of ['professeur/', 'cours/', 'videotheque/', 'examens/', 'laboratoire/', 'espace-etudiant/', 'contact/']) {
    const res = await request.get(r);
    expect(res.status(), r).toBe(404);
  }
});

test('the showcase stores nothing in the browser', async ({ page }) => {
  await page.goto('');
  await page.locator('.hero button[data-embed-play]').click();
  expect(await page.evaluate(() => localStorage.length + sessionStorage.length)).toBe(0);
});
