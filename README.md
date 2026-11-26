# Prof Harti — site vitrine (concept, démonstration non officielle)

> **Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.**
> Ce dépôt n’est ni édité, ni validé, ni commandé par Prof Ayoub Harti. Ce n’est pas son site officiel.

Live: https://mansour-technologies.github.io/ayoub-harti-website-concept/

## Overview
A premium single-page showcase ("site vitrine") for a Moroccan physics-chemistry teacher and educational creator:
- personal hero
- art-directed portrait slot
- teaching approach, built on his own published phrases
- subjects and levels (1ère année collège → 2ème Bac)
- the « عرض التفوق » programme as publicly announced, with no prices
- the official video in a click-to-load player
- curated official channels
- « Comment s’inscrire »
- large contact buttons

There are no app features, no accounts and no browser storage.

## Stack
- Astro (static output) + TypeScript; small vanilla scripts for the menu dialog, scroll-spy, reveal and video facade
- Self-hosted fonts via Fontsource (SIL OFL): Archivo (variable, width axis), Noto Kufi Arabic, JetBrains Mono
- Playwright end-to-end tests
- GitHub Actions → GitHub Pages

## Develop
```bash
npm ci
npm run dev        # http://localhost:4321/ayoub-harti-website-concept/
npm run build      # astro check + static build into dist/
npm run preview
npx playwright test                                                                                # local preview
BASE_URL=https://mansour-technologies.github.io/ayoub-harti-website-concept/ npx playwright test  # production
```
If the Playwright browser revision is not installed, set `PW_CHROME` to a local Chromium executable.

## Configuration
All identity data, links, levels, the programme and the video ID live in `src/data/site.ts`.

**WhatsApp number to be inserted on the teacher's approval.** Set `contact.whatsapp` in `src/data/site.ts` (international digits, for example `'2126XXXXXXXX'`). While it is `null`, no WhatsApp button is rendered and the Instagram DM button (`https://ig.me/m/prof_harti`) is the primary contact.

## Deploy
Push to `main`. `.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages (`base: /ayoub-harti-website-concept`).

## Sources (consulted 2026-11-26)
- YouTube @ProfHarti (UCblvxsFoS21ZOJjCAID68UA): description, levels, links, programme video `bQRpHAGhIXw`
- Instagram @prof_harti (verified account): name, bio
- Facebook Prof.harti, linked from the YouTube channel

## Assets & licensing
- Illustrations, glyphs, the portrait placeholder and the Open Graph image are original work made for this concept.
- The official video is embedded through YouTube’s own player via `youtube-nocookie.com`, only after a click. The thumbnail is served by `i.ytimg.com`. Nothing is rehosted.
- No photograph of the teacher is stored in this repository. The portrait slot (« Photo officielle — à fournir · sur validation ») is to be replaced with an authorised photo.

## Known limitations
- Prices, dates and the WhatsApp number are intentionally absent.
- The official YouTube channel currently exposes one playable public video.
- The interface is in French, with Arabic accents.

## Rights
All rights reserved — Mansour Technologies. No open-source licence is granted.
Concept digital proposé par Mansour Technologies — https://mansourtechnologies.com/
