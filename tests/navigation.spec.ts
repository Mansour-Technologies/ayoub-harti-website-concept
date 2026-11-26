import { test, expect } from '@playwright/test';

test('desktop main navigation reaches every page', async ({ page }) => {
  await page.goto('');
  const nav = page.getByRole('navigation', { name: 'Navigation principale' });
  for (const [label, path] of [['Le professeur', 'professeur/'], ['Cours', 'cours/'], ['Vidéothèque', 'videotheque/'], ['Examens', 'examens/'], ['Laboratoire', 'laboratoire/'], ['Espace', 'espace-etudiant/'], ['Contact', 'contact/']]) {
    await nav.getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(path + '(\\?.*)?$'));
    await expect(nav.getByRole('link', { name: label, exact: true })).toHaveAttribute('aria-current', 'page');
  }
});

test('keyboard: skip link and nav are reachable with Tab', async ({ page }) => {
  await page.goto('');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Aller au contenu' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Prof Harti — accueil' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link').first()).toBeFocused();
});

test('mobile menu opens, traps focus, closes with Escape and returns focus @mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('');
  const btn = page.locator('[data-menu-open]');
  await expect(btn).toBeVisible();
  await btn.click();
  const dialog = page.getByRole('dialog', { name: 'Menu du site' });
  await expect(dialog).toBeVisible();
  await expect(btn).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('[data-menu-close]')).toBeFocused();
  // Shift+Tab from first element wraps to last
  await page.keyboard.press('Shift+Tab');
  const inside = await page.evaluate(() => !!document.activeElement?.closest('[data-menu]'));
  expect(inside).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(btn).toBeFocused();
  // navigate via menu
  await btn.click();
  await dialog.getByRole('link', { name: /Laboratoire/ }).click();
  await expect(page).toHaveURL(/laboratoire\/$/);
  await expect(page.locator('h1')).toContainText('projectile');
});
