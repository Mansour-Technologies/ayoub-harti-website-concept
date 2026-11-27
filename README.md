# Prof Harti — site vitrine (concept, démonstration non officielle)

> **Concept de site internet proposé par Mansour Technologies — Démonstration non officielle.**
> Ce dépôt n’est ni édité, ni validé, ni commandé par Prof Ayoub Harti (أيوب حارتي). Ce n’est pas son site officiel.

Live: https://mansour-technologies.github.io/ayoub-harti-website-concept/

## Overview
This is a personal-brand single-page showcase for a Moroccan physics-chemistry teacher and creator. The page is **Arabic-first** (`lang="ar" dir="rtl"`) and written in his Darija. French appears as a secondary layer for scientific terms and translations, the same way his whiteboards are written: French formulas, Arabic notes.

It is built from his real identity:
- **Hero:** his face, through the official YouTube video « للتسجيل في عرض التفوق ».
  - The video's own YouTube-hosted frame is the poster *and* the click-to-play control (youtube-nocookie).
  - It is shown in natural colour (a light warm grade only). The frame's light studio backdrop is multiplied onto a champagne-to-oxblood light, so it becomes a glow behind his head and dissolves into the page: no frame, no split.
- **Wordmark:** the « PROF / HARTI » heavy italic, with a script signature and a lightbulb, as on his channel banner.
- **His published lines, quoted and sourced:** « ما تخافش من الفيزياء », « أنا هنا باش نساعدك ونبسط ليك الفيزياء », « دقة دقة », « سول و انا غادي نجاوبك », and his sign-off « أستاذكم الحارتي ».
- **Board section:** an original whiteboard « fiche » in the style of his public summary sheets: highlighter boxes, bilingual labels, « عرض التفوق » written top-right, and a red LED frame. Two of his public Instagram reels are official embeds, loaded on click.
- **« 22:00 », his night-live culture:** formats observed on his accounts (2023 → November 2026, including his current 22:00 Facebook lives), with the schedule to be confirmed by him.
- **A band of his own recurring lines** (« دقة دقة », « واخة تكون زليجة غادي تفهم »…), each quoted with its source elsewhere on the page.
- **« عرض التفوق »** as he announced it (no prices); levels 1AC → 2BAC; in-person classes as announced on Instagram.
- **Inscription:** three steps. **Contact:** big buttons to his verified channels.

There are no app features, no forms, no accounts and no browser storage.

## Visual direction: "Oxblood night" (redesign of 27 Nov 2026)
Taken from his own wardrobe and banner, then desaturated:

| Token | Hex | Source in his identity | Use |
|---|---|---|---|
| `--ink` | `#160a0d` | burgundy tuxedo, pushed to night | page field |
| `--ink-2` / `--wine` | `#1e0d12` / `#3b141c` | same suit, mid-tones | alternating sections, the « Le prof » panel |
| `--gold` (champagne) | `#d9bf92` | gold glow behind him on the banner | HARTI, numbers, primary button |
| `--chalk` / `--ivory` | `#f4ece1` | his white shirt | text on dark; the light « عرض التفوق » page |
| `--oxblood` | `#5a1a27` | the suit, as ink | headlines on ivory |
| `--signal` | `#e9b949` | his avatar's yellow, softened | rare: play disc, focus ring, one underline, the notice dot |
| `--claret` | `#a3354a` | banner/LED red | thin editorial rules only |

Three typographic voices: the heavy italic PROF HARTI of his banner (Archivo), a fine script signature (Mrs Saint Delafield), and Cairo for his Arabic at calmer weights (700 instead of 900–1000) with taller line-heights. Buttons are square-shouldered (2 px radius); pills and the saturated yellow band are gone.

## Stack
- Astro (static output) + TypeScript; small vanilla scripts for:
  - the menu dialog
  - scroll-spy
  - reveal on scroll
  - the click-to-load embed facades
- Self-hosted fonts via Fontsource (SIL OFL): Cairo (Arabic and Latin, variable), Archivo (italic, width axis, for the wordmark), Mrs Saint Delafield (signature), Caveat (marker handwriting on the board), Aref Ruqaa (Arabic handwriting)
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
node scripts/og.mjs  # re-render public/og.png from scripts/og.html
```
If the Playwright browser revision is not installed, set `PW_CHROME` to a local Chromium executable.

## Configuration
Everything lives in `src/data/site.ts`:
- identity
- quotes with sources
- levels, programme, in-person announcement, observed formats
- video ID and poster URLs
- reels
- links

**WhatsApp number to be inserted on the teacher's approval.** Set `contact.whatsapp` in `src/data/site.ts` (international digits). While it is `null`, no WhatsApp button is rendered. The primary contact is then his verified Facebook page via Messenger (`https://m.me/Prof.harti`), followed by YouTube; Instagram is only a secondary link. Once a number is set, the WhatsApp button becomes primary and pre-fills his registration keyword « عرض ».

## Tests (Playwright)
The suite checks:
- No console errors and no failed assets.
- Arabic-first document (`lang="ar"`, `dir="rtl"`).
- Notice, attribution, noindex, robots.txt and OG image present; the 404 page also carries the notice.
- Anchor navigation.
- Mobile menu: keyboard, focus trap, Escape, focus return.
- External links: https, verified domains, new tab, `rel=noopener`. No phone number in the page.
- Contact order: Facebook Messenger is primary, YouTube second, Instagram secondary.
- **The hero poster is a button named "Lire la vidéo officielle : …".** Its image is that same video's frame on `i.ytimg.com`, and the youtube-nocookie iframe loads only on click.
- **Fallback:** with `i.ytimg.com` blocked, the typographic panel shows and the button still plays.
- **Natural colour:** the hero photo uses no colour-replacing blend or hue/greyscale filter, and the hero is fully visible with reduced motion.
- Instagram reels load their official `/embed/` iframe only on click.
- No horizontal overflow and no content crossing the viewport at 320, 375, 390, 430, 768, 1024, 1440 and 1920 px.
- The removed routes return 404.
- No browser storage is used.

## Deploy
Push to `main`. `.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages (`base: /ayoub-harti-website-concept`).

## Sources (consulted 2026-11-26, re-checked 2026-11-27)
- YouTube @ProfHarti (UCblvxsFoS21ZOJjCAID68UA): channel description and levels, banner wording, programme video `bQRpHAGhIXw`, community posts (live announcements, summary sheets).
- Instagram @prof_harti (verified): bio, public posts and reels (programme registration, in-person classes in Bernoussi, Q&A format, sign-off).
- Facebook Prof.harti (verified badge; links to @prof_harti and youtube.com/ProfHarti): page bio and November 2026 live announcements at 22:00.

## Assets & licensing — and assets to replace on approval
No photograph, frame, thumbnail or post of the teacher is stored in this repository.

| Placement | What is shown now | Recommended replacement on approval |
|---|---|---|
| Hero portrait / play control | YouTube-hosted frame `i.ytimg.com/vi/bQRpHAGhIXw/oar1.jpg` (fallback `maxresdefault.jpg`, then a typographic panel), hotlinked as the poster of that same official video. Natural colour with a light warm grade, blended into the page by a CSS multiply light and a soft mask; credited « Image : vidéo officielle YouTube — Prof Harti ». | The original of his YouTube avatar (burgundy tuxedo and bow tie on yellow), or the channel-banner portrait (seated, burgundy suit) |
| « Au tableau » board | Original drawing for this concept, in the style of his summary sheets | Scans of his real « ملخصات » sheets |
| Two reel cards | Official Instagram embeds of public reels `DfsoLePN-qy` and `DfxRHKFBlsc`, loaded only after a click; typographic covers | A still or clean video of him at the whiteboard (from reel `DfsoLePN-qy`) |
| Open Graph image | Original typographic composition (`scripts/og.html`) | Same layout with an authorised portrait |
| WhatsApp button | Not rendered (`contact.whatsapp = null`) | His registration number |

Icons, the board illustration, the favicon and the OG image are original work.

## Known limitations
- The official YouTube channel exposes **one** playable public video. The hero poster is that video's own frame (1920×1080, 2021, light-blue studio background). It is soft when magnified on phones; an authorised studio portrait would be sharper.
- Instagram embeds depend on those posts staying public.
- Prices and dates are intentionally absent.
- The in-person schedule is shown as « annoncé le 20/11/2026 — à confirmer ».

## Rights
All rights reserved — Mansour Technologies. No open-source licence is granted.
Concept digital proposé par Mansour Technologies — https://mansourtechnologies.com/
