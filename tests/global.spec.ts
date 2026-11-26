import { test, expect } from '@playwright/test';
import { pages, NOTICE, watch } from './helpers';

test.describe('global checks', () => {
  for (const p of pages) {
    test(`page "${p || 'accueil'}" — notice, noindex, no errors, no 404 assets @mobile`, async ({ page }) => {
      const errors = watch(page);
      const res = await page.goto(p, { waitUntil: 'networkidle' });
      expect(res?.status()).toBe(200);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
      await expect(page.locator('.notice')).toContainText(NOTICE);
      await expect(page.locator('footer')).toContainText('Concept digital proposé par Mansour Technologies.');
      await expect(page.locator('h1')).toHaveCount(1);
      expect(errors, errors.join('\n')).toEqual([]);
    });
  }

  test('no horizontal overflow at target widths', async ({ page }) => {
    for (const w of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width: w, height: 900 });
      for (const p of pages) {
        await page.goto(p);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `${p || 'accueil'} @${w}px`).toBeLessThanOrEqual(0);
      }
    }
  });

  test('all internal links resolve', async ({ page, request, baseURL }) => {
    const seen = new Set<string>();
    for (const p of pages) {
      await page.goto(p);
      const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => (a as HTMLAnchorElement).href));
      for (const h of hrefs) {
        expect(h.endsWith('#')).toBeFalsy();
        if (h.startsWith(new URL(baseURL!).origin)) seen.add(h.split('#')[0]);
      }
    }
    for (const u of seen) {
      const r = await request.get(u);
      expect(r.status(), u).toBe(200);
    }
    expect(seen.size).toBeGreaterThan(8);
  });

  test('robots.txt disallows all, og image exists', async ({ request }) => {
    const r = await request.get('robots.txt');
    expect(await r.text()).toContain('Disallow: /');
    expect((await request.get('og.png')).status()).toBe(200);
  });

  test('survives corrupted localStorage on every page @mobile', async ({ page }) => {
    const errors = watch(page);
    await page.goto('');
    await page.evaluate(() => {
      for (const k of ['bookmarks', 'history', 'progress', 'checklist', 'quiz', 'goals', 'courses']) localStorage.setItem('harti-demo:' + k, '{not json');
      localStorage.setItem('harti-demo:quiz', JSON.stringify([{ score: 'x' }, null, 5]));
      localStorage.setItem('harti-demo:progress', JSON.stringify({ 'v-rc': 'abc', 'v-ondes': 9999 }));
    });
    for (const p of pages) await page.goto(p, { waitUntil: 'networkidle' });
    await page.goto('espace-etudiant/');
    await expect(page.locator('[data-k-courses]')).toHaveText('0/33');
    expect(errors, errors.join('\n')).toEqual([]);
  });
});
