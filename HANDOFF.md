# Imaginary Space — Handoff / Status

_Last updated: 2026-05-29_

## What this project is
Designing the marketing site for **Imaginary Space** (AI & automation consulting). We imported the
existing GitHub repo (`carlosrtierrez/imaginaryspaceiolanding`, Next.js + Tailwind + Framer Motion) and
are designing in self-contained HTML so we can iterate fast and visually.

## Files
| File | Purpose |
|---|---|
| `Styleguide.html` | Living design-system reference — tokens, type, buttons, cards, inputs, navbar, FAQ, tabs, stats, marquee, case studies, process, hero, CTA, footer, diffuse background. Sidebar-navigated. |
| `Homepage.html` | Full homepage recreation: navbar, hero, marquee, scroll-reveal story, value prop, process, (testimonials — hidden), stats, case studies, FAQ, CTA, footer. Scroll animations in vanilla JS. |
| `CLAUDE.md` | Auto-loaded brand context for every new chat in this project. Read it first. |
| `assets/logo-dark.png`, `assets/logo-white.png` | Trimmed transparent logo marks. |
| `app/`, `components/`, `lib/`, `styles/` | The imported Next.js source (read-only reference for faithful recreation). |

## Brand system
All authoritative tokens live in `CLAUDE.md`. Headline: dark theme, **blue gradient accent**
`linear-gradient(135deg,#60a5fa 40%,#bfdbfe 100%)` for fills + clipped text, flat `#60a5fa` for borders/icons/focus.
Poppins (display) + Plus Jakarta Sans (body).

## Completed
- Imported repo + built the styleguide from real components.
- Re-themed green → blue, then to the blue gradient accent.
- Added the "diffuse bloom" background pattern.
- Renamed to Imaginary Space + processed/placed the logo.
- Updated marquee to the 6 real client names.
- Built the full homepage with working scroll animations (word-by-word story reveal, count-up stats, fly-in process, FAQ accordion, marquee).
- Stats Row → 50+ / 6 Weeks / 10x.
- Hid testimonials until real ones exist.
- Added the three real case studies (Landible, Measure AI, Flor.work) as cards that expand into a detail modal (Problem/Solution/Results + metrics), with product screenshots and a legibility scrim — in both `Homepage.html` and `Styleguide.html`.
- Propagated the design system into the real Next.js source: blue gradient accent tokens + helpers in `globals.css`, `AccentHighlight`/`SectionLabel`/`Button` on the gradient, `HeroSection` leading fix, plain "FAQs" heading, rebuilt `CaseStudyGrid.tsx` (Framer Motion shared-layout modal), and renamed Nexus AI → Imaginary Space throughout.

## Next steps (suggested order)
1. Decide whether to apply 50+/6 Weeks/10x stats to the homepage too (count-up only works on the numeric "50+").
2. Build **Services**, **Team**, **Work With Us** pages to match (source in `app/services`, `app/team`, `app/work-with-us`, and `components/sections/ServiceTabs.tsx`, `LeadershipCards.tsx`, `TeamGrid.tsx`, `ContactSplit.tsx`).
3. Replace marquee wordmarks with real logo art (need SVG/PNG files from the user).
4. Propagate the brand back into the real repo (see CLAUDE.md "Known follow-ups").

## How to continue in a new conversation
- **Easiest:** start a NEW chat **in this same project**. Token usage is per-conversation, so a new chat
  gets a fresh budget and all files (plus `CLAUDE.md`) are still here. Just say e.g. "Continue Imaginary Space — build the Services page."
- **On another account:** download the whole project (zip), create a new project on the other account,
  upload the files, and reconnect GitHub if you need repo access again. `CLAUDE.md` carries the context over.
