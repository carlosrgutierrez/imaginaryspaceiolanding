# Imaginary Space — Project Context

Marketing website for **Imaginary Space**, an AI & Automation consulting firm.
Dark-first, minimal, single blue gradient accent, premium scroll animations.

## Repo & paths

| Item | Value |
|------|--------|
| **Local path** | `/Users/droz/Documents/uploads/MorningSpace/` |
| **Canonical GitHub** | `carlosrgutierrez/imaginaryspaceiolanding` (main) |
| **Fork** | `carlosrtierrez/imaginaryspaceiolanding` |
| **Branch** | `main` @ `958d195` (fork + upstream synced via force-push) |
| **Git remotes** | `origin` → fork, `upstream` → canonical |
| **GitHub account** | `carlosrtierrez` |
| **Contact** | `carlos@imaginaryspace.ai` |

Stack: **Next.js 15**, **Tailwind 4**, **Framer Motion**, **TypeScript**.

Static HTML references (design source): `Styleguide.html`, `Homepage.html` in repo root.

## Live deployment (Vercel — as of 2026-05-29)

| Item | Value |
|------|--------|
| **Host** | Vercel (free tier) |
| **Vercel project** | `imaginaryspacelanding` |
| **Vercel URL** | https://imaginaryspaceiolanding.vercel.app |
| **Custom domain** | `imaginaryspace.io` (GoDaddy DNS) |
| **DNS** | A record `@` → `216.198.79.1` (Vercel new IP). GoDaddy authoritative NS correct. Propagation was in progress; global resolvers (8.8.8.8) resolving to Vercel. |
| **Build** | Default Vercel settings — `next build`, no custom output dir |
| **Env vars on Vercel** | `NOTION_API_KEY`, `NOTION_DATABASE_ID`, (+ optional `NOTION_DATA_SOURCE_ID`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`) |

Firebase Spark / App Hosting was considered and rejected (no Blaze budget). `apphosting.yaml` kept as optional reference only.

## Site structure (Next.js app)

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/services` | Identify / Develop / Adopt tabs + case study grid |
| `/team` | Leadership + team grid (photos wired) |
| `/work-with-us` | Contact form |
| `/api/contact` | POST → Notion CRM (serverless on Vercel) |

Key files:
- `lib/constants.ts` — copy, footer links, case studies, team
- `lib/contact.ts` — form validation
- `lib/notion-config.ts`, `lib/notion-leads.ts` — Notion CRM mapping
- `app/api/contact/route.ts` — rate-limited API route
- `components/sections/ContactSplit.tsx` — contact form UI
- `components/sections/ServiceTabs.tsx` — services tabs
- `components/layout/Analytics.tsx` — GA4 + cookie consent (only if `NEXT_PUBLIC_GA_MEASUREMENT_ID` set)
- `components/ui/Logo.tsx` — brand mark in navbar/footer

Local dev: `npm run dev` (or `npm run dev:clean` if stale `.next` causes 500/CSS 404).
QA script: `npm run qa:dev`. Build: `npm run build`.

## Notion CRM (contact form)

- Database: **CRM - IMS**
- `NOTION_DATABASE_ID`: `65887d70575582e4b2b401a44da5a369`
- `NOTION_DATA_SOURCE_ID`: `16087d70-5755-8364-992a-8781dc09e33c` (default in code)
- Mapping: Name, Email, Work Email, Company (size), Org (company name), Title (role), EV (budget), Context (project + website), Stage = **Website**, Platform = **Other**
- Local credentials in `.env.local` (gitignored). API tested OK locally.
- **TODO tomorrow:** Confirm production form on `imaginaryspace.io/work-with-us` creates Notion leads after Vercel env vars were set.

## Brand tokens (authoritative — use these exact values)

- Background: `#0A0A0A` (primary), `#111111` (secondary), `#1A1A1A` (card)
- Text: `#FFFFFF` / `#A1A1AA` / `#71717A`
- Card border: `rgba(255,255,255,0.08)`; hover → `rgba(255,255,255,0.16)`
- **Accent = blue gradient**: `linear-gradient(135deg, #60a5fa 40%, #bfdbfe 100%)`
  - Gradient for fills (buttons, badges, highlights) and clipped text (labels, eyebrows)
  - Flat `#60a5fa` for borders, icon strokes, focus rings, tints
- Fonts: **Poppins** (display) + **Plus Jakarta Sans** (body)
- No emoji in product copy. Lucide icons only. Dark theme always.

## Decisions / completed work

- Nexus AI → **Imaginary Space** everywhere
- Stats: 50+ AI products · 6 Weeks MVP · 10x faster
- Logo marquee: Meta, SIEMENS, SignalFire, Fifty Three Stations, FELT., Dude Wipes
- **Testimonials hidden** (no real ones yet)
- Case studies: Landible, Measure AI, Flor.work — modal detail cards
- Team page photos + copy updated
- Services tabs with full copy; case study grid before CTA
- Footer: logo, Terms/Privacy/LinkedIn/Contact links
- Equal-height case study cards (flex + line-clamp)
- Fork force-pushed to upstream `main` (unrelated histories replaced)

## Domain / URL mismatches — fix tomorrow

Code still references domains that differ from live `.io`:

| Constant / link | Current value | Live domain |
|-----------------|---------------|-------------|
| `SITE_URL` in `lib/constants.ts` | `https://imaginaryspace.co` | `https://imaginaryspace.io` |
| Footer Terms/Privacy | `imaginaryspace.ai` | may be intentional (legal on `.ai`) |
| `metadataBase` in `layout.tsx` | check vs `.io` | update if SEO should match live URL |

Optional: add `www.imaginaryspace.io` in Vercel + GoDaddy CNAME `www` → `cname.vercel-dns.com`.

## Known follow-ups (priority for next session)

1. **Verify live site** at https://imaginaryspace.io — all pages + contact form → Notion
2. **Update `SITE_URL` / metadata** to `imaginaryspace.io` if confirmed canonical
3. **Test GA4** if measurement ID added on Vercel
4. Replace marquee wordmarks with real logo SVG/PNG
5. Restore testimonials section when real quotes exist
6. GoDaddy **Products** tab: remove any leftover “Coming Soon” / Website Builder if still attached

## Conventions for agents

- Minimize scope; match existing patterns in `components/` and `lib/`
- Don't commit `.env.local` or secrets
- Only commit when user asks
- Vercel deploys auto from `carlosrgutierrez/imaginaryspaceiolanding` `main`

See `HANDOFF.md` for fuller status. Plan doc at `/Users/droz/Documents/uploads/CURSOR_PLAN.md`.
