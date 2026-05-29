# Imaginary Space — Project Context

Marketing website for **Imaginary Space**, an AI & Automation consulting firm.
Dark-first, minimal, single blue gradient accent, premium scroll animations.
Source repo: `carlosrtierrez/imaginaryspaceiolanding` (Next.js 15 + Tailwind 4 + Framer Motion). The `.tsx` source is imported under the project root (`app/`, `components/`, `lib/`, `styles/`).

## Deliverables (the files we actively design in)
- **`Styleguide.html`** — living component/token reference (sidebar nav). Edit this when refining the design system.
- **`Homepage.html`** — full static recreation of the homepage with all sections + scroll animations.
- **`assets/logo-dark.png`** / **`assets/logo-white.png`** — the logo mark, trimmed & transparent (dark = for the light-blue accent badge; white = standalone on dark).

## Brand tokens (authoritative — use these exact values)
- Background: `#0A0A0A` (primary), `#111111` (secondary), `#1A1A1A` (card)
- Text: `#FFFFFF` / `#A1A1AA` / `#71717A`
- Card border: `rgba(255,255,255,0.08)` (hairline); hover → `rgba(255,255,255,0.16)`
- **Accent = a blue gradient**: `linear-gradient(135deg, #60a5fa 40%, #bfdbfe 100%)`
  - Use the GRADIENT for fills (buttons, badges, highlight blocks, active pills) and clipped text (section labels, eyebrows).
  - Use the FLAT fallback `#60a5fa` for anything needing a color value: borders, icon strokes, dots, focus ring, tints (`rgba(96,165,250,…)`).
  - `--accent-light: #bfdbfe`, `--accent-dark: #385bc7` (hover), `--accent-bg: rgba(96,165,250,0.15)`
  - CTA gradient: `linear-gradient(180deg,#0A0A0A 0%,#0A1E3C 50%,#0D2E5C 100%)`
- Fonts: **Poppins** (display/headings, 600, -0.02em tracking) + **Plus Jakarta Sans** (body). Google Fonts CDN.
- Radii: 8px input, 12px card, 16px card-lg, pill. Section padding 120px desktop.
- Texture: subtle SVG film-grain overlay (opacity ~0.035). Soft blue "diffuse bloom" behind hero.

## Conventions
- No emoji in product copy. Sentence case for UI; UPPERCASE TRACKED for micro-labels.
- Icons: Lucide (CDN). Don't substitute other icon sets.
- Accent-highlight a word at most once per section.
- Keep the dark theme. Don't invent new accent colors.

## Decisions / state
- Renamed Nexus AI → **Imaginary Space** everywhere.
- Stats Row = **50+ AI products shipped · 6 Weeks average MVP delivery · 10x faster than traditional agencies** (3 stats, hairline dividers).
- Logo marquee = Meta · SIEMENS · SignalFire · Fifty Three Stations · FELT. · Dude Wipes (text wordmarks; swap for real art when available).
- **Testimonials are HIDDEN** (no real ones yet) — `style="display:none"` on the section in both files; remove to restore.
- Hero headline line-height opened to 1.5 so the highlight box doesn't collide with the line above.
- Case studies are the three real products — **Landible** (Land Use, Automated), **Measure AI** (Your Drawings, Measured in Minutes), **Flor.work** (Ship Faster. Manage Less.) — as data-driven cards that expand into a detail modal (Problem / Solution / Results + metric chips). Card images live in `public/images/` and a dark scrim keeps the category tag legible.
- FAQ heading is plain "FAQs" (no boxed letter).

## Known follow-ups
- Build Services / Team / Work With Us pages to match.
- Replace marquee wordmarks with real logo SVG/PNG.
- Brand propagated into the real repo ✅ — blue gradient accent (`globals.css` tokens + `--accent-grad` + `.bg-accent-grad`/`.text-accent-grad` helpers), `AccentHighlight.tsx`, `SectionLabel.tsx`, `Button.tsx`, `HeroSection.tsx` leading, Nexus AI → Imaginary Space everywhere, and `CaseStudyGrid.tsx`/`FAQSection.tsx` updated. STILL TODO: swap the real logo art into `Navbar.tsx`/`Footer.tsx`, and update the domain/email placeholders (`layout.tsx` `metadataBase` + `ContactSplit.tsx` `hello@nexus-ai.co`) once the real domain is known.

See `HANDOFF.md` for a fuller status report.
