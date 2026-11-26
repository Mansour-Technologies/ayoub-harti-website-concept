import type { Page } from '@playwright/test';
export const pages = ['', 'professeur/', 'cours/', 'videotheque/', 'examens/', 'laboratoire/', 'espace-etudiant/', 'contact/'];
export const NOTICE = 'Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.';

/** Collect console errors and failed (>=400) responses for a page. */
export function watch(page: Page) {
  const errors: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  return errors;
}
