# Prof Harti — concept de site (démonstration non officielle)

> **Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.**
> Ce dépôt n’est ni édité, ni validé, ni commandé par Prof Ayoub Harti. Il ne constitue pas son site officiel.

Live: https://mansour-technologies.github.io/ayoub-harti-website-concept/

## Overview
An unsolicited website concept for a Moroccan physics-chemistry teacher and educational creator: course map by level,
video library organised by chapter, interactive BAC revision, a projectile-motion lab and a local-only student dashboard.

## Stack
- Astro (static output) + TypeScript, vanilla TS islands, CSS custom properties
- Self-hosted fonts via Fontsource: Archivo (variable, width axis), Noto Kufi Arabic, JetBrains Mono
- Canvas 2D for the simulation
- Playwright end-to-end tests
- GitHub Actions → GitHub Pages

## Develop
```bash
npm ci
npm run dev        # http://localhost:4321/ayoub-harti-website-concept/
npm run build      # astro check + static build into dist/
npm run preview
npx playwright test                    # against local preview
BASE_URL=https://mansour-technologies.github.io/ayoub-harti-website-concept/ npx playwright test   # against production
```
If the Playwright browser revision is not installed, set `PW_CHROME` to a local Chromium executable.

## Deploy
Push to `main`: `.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages (`base: /ayoub-harti-website-concept`).

## Features
- **Cours**: 33 chapters (3ème AC → 2ème Bac), filters by level/domain, accent-insensitive search, deep links `?niveau=`, “studied” tracking.
- **Vidéothèque**: one official public video from the teacher’s YouTube channel (click-to-load `youtube-nocookie.com` facade, no autoplay before click); lesson slots with original revision sheets, search, level filter, bookmarks, progress, continue-watching, history, related lessons, `?v=` deep links.
- **Préparation aux examens**: 18 original exam-style questions (5 themes × 3 difficulties), instant explanations, session summary, saved results, revision checklists, a multi-part sample exercise.
- **Laboratoire**: projectile motion with v₀, angle, g (Earth/Moon), live velocity components, T, H, R, play/pause/reset, drag-to-aim, previous-trajectory ghost.
- **Espace étudiant (démo)**: overview, course and revision progress, quiz results, bookmarks, weekly goals, recommended next lesson, reset. localStorage only, validated on read.
- **Contact**: verified official channels + a demo form that sends nothing.
- `noindex, nofollow` on every page, `robots.txt` disallows all, visible demo notice on every page.

## Assets & licensing
- All illustrations, glyphs, the portrait placeholder and the Open Graph image are original work made for this concept.
- Fonts: SIL Open Font License (via Fontsource).
- YouTube: official public video embedded through YouTube’s own player (thumbnail served by `i.ytimg.com`). Nothing is rehosted.
- No photo of the teacher is stored in this repository. The portrait slot is to be replaced with an authorised portrait on approval.
- Educational content (summaries, questions, exercise) is original demonstration material, to be replaced by the teacher’s own.

## Known limitations
- Only one public, playable video exists on the official channel at the time of writing; other lessons are labelled placeholders.
- No backend: progress lives in the visitor’s browser only; the contact form is a non-sending demo.
- Arabic is used for accents and titles; the interface is in French.

## Rights
All rights reserved — Mansour Technologies. No open-source licence is granted.
Concept digital proposé par Mansour Technologies — https://mansourtechnologies.com/
