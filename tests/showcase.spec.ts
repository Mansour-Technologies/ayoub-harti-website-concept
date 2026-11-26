import { test, expect, type Page } from '@playwright/test';

const NOTICE = 'Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.';
const ALLOWED_HOSTS = ['www.instagram.com', 'ig.me', 'www.youtube.com', 'www.facebook.com', 'mansourtechnologies.com', 'wa.me'];

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
  // scroll through the page so lazy assets load too
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } });
  await page.waitForLoadState('networkidle');
  expect(errors, errors.join('\n')).toEqual([]);
  await expect(page.locator('h1')).toHaveCount(1);
});

test('demo notice, footer attribution and noindex are present @mobile', async ({ page, request }) => {
  await page.goto('');
  await expect(page.locator('.notice')).toContainText(NOTICE);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  const attr = page.locator('footer a[href="https://mansourtechnologies.com/"]');
  await expect(attr).toHaveText('Concept digital proposé par Mansour Technologies.');
  expect(await (await request.get('robots.txt')).text()).toContain('Disallow: /');
  expect((await request.get('og.png')).status()).toBe(200);
});

test('anchor navigation scrolls to each section', async ({ page }) => {
  await page.goto('');
  const nav = page.getByRole('navigation', { name: 'Navigation principale' });
  for (const id of ['professeur', 'niveaux', 'offre', 'video', 'inscription', 'contact']) {
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
  const dialog = page.getByRole('dialog', { name: 'Menu du site' });
  await expect(dialog).toBeVisible();
  await expect(btn).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('[data-menu-close]')).toBeFocused();
  for (let i = 0; i < 12; i++) await page.keyboard.press('Tab');
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
  // Contact section: Instagram DM primary, YouTube, Facebook; WhatsApp absent while config is null
  const contact = page.locator('#contact');
  await expect(contact.locator('.cbtn').first()).toHaveAttribute('href', 'https://ig.me/m/prof_harti');
  await expect(contact.locator('a[href="https://www.youtube.com/@ProfHarti"]')).toHaveCount(1);
  await expect(contact.locator('a[href="https://www.facebook.com/Prof.harti"]')).toHaveCount(1);
  await expect(page.locator('[data-whatsapp], a[href*="wa.me"]')).toHaveCount(0);
  // no internal dead anchors
  const hashes = await page.$$eval('a[href^="#"]', (as) => as.map((a) => a.getAttribute('href')!));
  for (const h of hashes) {
    expect(h).not.toBe('#');
    await expect(page.locator(h === '#main' ? 'main' : h)).toHaveCount(1);
  }
});

test('YouTube facade loads the nocookie iframe only on click', async ({ page }) => {
  const yt: string[] = [];
  page.on('request', (r) => { if (/youtube(-nocookie)?\.com\/embed/.test(r.url())) yt.push(r.url()); });
  await page.goto('#video');
  const box = page.locator('#video [data-yt]');
  await expect(box.locator('iframe')).toHaveCount(0);
  expect(yt).toEqual([]);
  await box.locator('.yt__btn').click();
  await expect(box.locator('iframe')).toHaveAttribute('src', /^https:\/\/www\.youtube-nocookie\.com\/embed\/bQRpHAGhIXw/);
});

test('no horizontal overflow at the 8 target widths', async ({ page }) => {
  for (const w of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto('');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `@${w}px`).toBeLessThanOrEqual(0);
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
  await page.locator('#video .yt__btn').click();
  await page.locator('[data-menu-open]').isVisible();
  expect(await page.evaluate(() => localStorage.length + sessionStorage.length)).toBe(0);
});
