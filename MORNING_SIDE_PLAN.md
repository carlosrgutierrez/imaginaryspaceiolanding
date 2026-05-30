# Plan: Make Our Site Look Like Morningside (Fast + Cheap)

**Goal:** Match [morningside.ai](https://www.morningside.ai/) — same words, same order, same feel.  
**Brand:** Imaginary Space (blue, not green).  
**How we save money:** Fix one chunk at a time. Change copy in one file. Reuse what we already built.

---

## What we have vs what we need

| Part of page | We have it? | Match Morningside? |
|--------------|-------------|-------------------|
| Hero + logos | Yes | Almost — headline must stay **one line** on big screens |
| Scroll story + progress bar | Partly | Missing **progress bar** + 2 story lines + ending block |
| Process (3 steps) | Yes | Wrong layout (we use tall cards; they use simple rows) |
| Testimonials | Built, not on page | Wrong count (they show 2, we have 3) |
| Stats | Yes | Wrong numbers and labels |
| Case studies | Yes | Wrong layout (we use 3 cards; they use big full-width rows) |
| FAQ | Yes | Wrong questions and answers |
| Bottom CTA | Yes | Wrong words + no dashed box |
| Footer | Yes | Too small (they have columns) |

---

## Rules (so we do not waste tokens)

1. **One batch = one section.** Do not jump around the whole site in one go.
2. **All homepage words live in `lib/constants.ts`.** Change copy there, not inside random components.
3. **Reuse files.** Do not delete and rebuild unless we must.
4. **Build once per batch.** Run `npm run build`, then `rm -rf .next && npm run dev`.
5. **You check localhost.** I compare to Morningside before I say “done.”
6. **Logo pictures wait.** Text names are OK until you send PNG/SVG files.
7. **Component + project in the same step.** Never finish a component alone — see **Sync & Review** below.

---

## Sync & Review (no double work)

Every step ships **one bundle**: the UI file, the data file, and the page wiring **together**. We do not come back later to “hook it up.”

### What “component” vs “project” means

| Layer | Files | If we skip it… |
|-------|-------|------------------|
| **Component** | `components/sections/*.tsx`, `components/layout/*.tsx` | Looks right in isolation but broken on the live page |
| **Data** | `lib/constants.ts` | Copy stuck in JSX; we edit twice |
| **Page wiring** | `app/page.tsx` | Section built but never shows (e.g. Testimonials today) |
| **Styles** | `styles/globals.css` | Layout done but colors/spacing wrong |
| **Cleanup** | Remove old section from `page.tsx` when merged | Same words appear twice on the page |

### Per-step sync bundle (change all of these before review)

| Step | Ship together (same session) |
|------|------------------------------|
| 1 Hero | `HeroSection.tsx` + `globals.css` (if gradient/spacing) |
| 2 Scroll | `ScrollRevealText.tsx` + `constants.ts` (story + value copy) + `page.tsx` (drop `ValueProposition` if merged) + delete or empty `ValueProposition.tsx` usage |
| 3 Process | `ProcessSteps.tsx` + `constants.ts` (step text) |
| 4 Testimonials | `TestimonialSection.tsx` + `constants.ts` + `page.tsx` (add to order) |
| 5 Stats | `StatsRow.tsx` + `constants.ts` |
| 6 Case studies | `CaseStudyGrid.tsx` + `constants.ts` (labels/titles only if needed) |
| 7 FAQ | `constants.ts` + `FAQSection.tsx` (subtitle) |
| 8 CTA + footer | `CTAFooter.tsx` + `Footer.tsx` + `constants.ts` |
| 9 Polish | `Navbar.tsx` + `HeroSection.tsx` + `globals.css` + `public/images/` (when assets exist) |

### Review gate (before I say “Step X done”)

Run this **once per step**, after all files in the bundle are saved:

1. **Bundle check** — Did every file in the row above get touched? If not, finish the bundle first.
2. **No orphans** — Grep: old copy / old component not still imported on `page.tsx` or duplicated in two sections.
3. **Reference check** — Compare to [morningside.ai](https://www.morningside.ai/): words, order, spacing, animation behavior.
4. **Viewport pass** — Phone (390), tablet (768), desktop (1280+): nothing clipped, progress bar visible on Step 2.
5. **Dev health** — `npm run build` → `rm -rf .next && npm run dev` → `GET / 200`.
6. **Report to you** (short):

```
Step: N — [name]
Bundle: [files changed]
Match: …
Off: …
Risk: …
Your turn: hard refresh localhost
```

7. **Your sign-off** — You say “good” or “fix X” before we start the next step.

### What we never do

- Build a component today and wire `page.tsx` tomorrow.
- Put new copy only in JSX when it belongs in `constants.ts`.
- Leave `ValueProposition` on the page while also adding the same block inside `ScrollRevealText`.
- Mark a step done without build + dev restart.

Persisted detail: `.cursor/rules/review-before-present.md`

---

## Step 1 — Hero: one line again (small fix)

**Why:** On Morningside the headline stays on one line when the page moves. Ours wraps to two lines on desktop.

**Do:**
- Open `HeroSection.tsx`
- On large screens: `whitespace-nowrap` on the `<h1>`
- Keep 64px size and gradient on the whole sentence
- Maybe widen the headline area a little so it fits

**Sync bundle:** `HeroSection.tsx` (+ `globals.css` only if spacing/gradient tweaks)  
**Time:** ~5 minutes  

---

## Step 2 — Scroll section + progress bar (your #1 ask)

**What Morningside does:** Right after the hero, you scroll. Text lines fade in and out in the middle of the screen. A **thin bar fills up** as you scroll through the story.

**Do:**
- Open `ScrollRevealText.tsx` (already has scroll fade — good start)
- Add a **progress bar** on the left (or bottom on phone) tied to `scrollYProgress`
- Update `STORY_PARAGRAPHS` in `constants.ts` to match Morningside’s **5 lines**:
  1. You bought the AI tools…
  2. But months later… (include ROI line)
  3. Or you're pre-launch…
  4. You're not behind…
  5. That's why we built **Imaginary Space**.
- At the **end** of the scroll zone, show the value block (same sticky area or right after):
  - “AI that actually moves the needle.”
  - Two short paragraphs
  - “Stop paying to experiment…”
  - Button: “get in touch” → `/work-with-us`
- Remove or shrink `ValueProposition.tsx` so we do not repeat the same words twice

**Sync bundle:** `ScrollRevealText.tsx` + `constants.ts` + `page.tsx` (remove `<ValueProposition />`) — all in one go  
**Time:** ~30–45 minutes  

---

## Step 3 — Process section: three simple steps

**What Morningside does:** Title “Our days consist of three things…” then **1 · Identify**, **2 · Develop**, **3 · Adopt** — short text, not big bullet lists.

**Do:**
- Rewrite step copy in `ProcessSteps.tsx` to match their shorter paragraphs
- Change numbers from `01/02/03` to `1/2/3`
- Remove the long bullet lists under each step (or hide on desktop)
- Add “get in touch” button under the steps
- Keep blue accent; drop extra icons if it looks too busy

**Sync bundle:** `ProcessSteps.tsx` + `constants.ts` (move step copy out of the component)  
**Time:** ~20 minutes  

---

## Step 4 — Testimonials (wire it up)

**What Morningside does:** Two quotes (Marita / Asmuss, Josh / Ashcroft Homes). Simple cards.

**Do:**
- Add `<TestimonialSection />` to `page.tsx` **after** Process, **before** Stats
- Change to **2 testimonials** with Morningside-style copy (swap company names to yours if needed)
- Match heading: “Don’t just take our word for it…”

**Sync bundle:** `TestimonialSection.tsx` + `constants.ts` + `page.tsx` (must add import + order same session)  
**Time:** ~15 minutes  

---

## Step 5 — Stats row (their numbers)

**What Morningside shows:**
- 13.4m views on YouTube
- 90k in our online community
- 2,700+ empowered through our programs
- 48+ successful client engagements
- 11+ industries served

**Do:**
- Put these in `constants.ts` (use Imaginary Space numbers if you give me real ones later)
- Change `StatsRow.tsx` to a **horizontal scrolling ticker** or 5-column row like theirs
- Keep count-up animation only if it still looks good

**Sync bundle:** `StatsRow.tsx` + `constants.ts`  
**Time:** ~20 minutes  

---

## Step 6 — Case studies: big rows, not small cards

**What Morningside does:** Full-width rows. Label “Case Study”. Big title. One line about the client. Image on the side.

**Do:**
- Refactor `CaseStudyGrid.tsx` layout only — keep your modal click if you want
- Use your existing case study data (Landible, Measure AI, Flor.work) but **Morningside-style labels** (“Case Study” + long title)
- Stack vertically, one per row

**Sync bundle:** `CaseStudyGrid.tsx` + `constants.ts` (if titles/labels change)  
**Time:** ~30 minutes  

---

## Step 7 — FAQ: their questions, your brand name

**Do:**
- Replace all 8 FAQ items in `constants.ts` with Morningside’s questions/answers
- Swap “Morningside AI” → “Imaginary Space”
- Subtitle: “You’ve got questions. We’ve got answers.”

**Sync bundle:** `constants.ts` + `FAQSection.tsx` (subtitle reads from constants)  
**Time:** ~15 minutes  

---

## Step 8 — Bottom CTA + footer

**CTA — Morningside says:**
- “AI is here. Most will react. The few with a plan will lead.”
- “We build for those few.”
- Button in a **dashed border box**

**Footer — Morningside has:**
- Row 1: ©, Terms, Privacy, LinkedIn, Contact
- Row 2: Explore (Services, Team, Case Studies, Pricing) + Social links
- Logo mark at bottom

**Do:**
- Update `CTAFooter.tsx` copy + dashed wrapper
- Expand `Footer.tsx` to 2–3 columns
- Add Explore links (use routes we already have)

**Sync bundle:** `CTAFooter.tsx` + `Footer.tsx` + `constants.ts` (CTA + footer links + explore columns)  
**Time:** ~25 minutes  

---

## Step 9 — Nav + small polish

**Do:**
- Navbar: “Services”, “Team”, white “get in touch” on the right (mostly done — verify)
- Hero background: closer to their diagonal photo + color wash (CSS only in `globals.css`)
- Client logos: replace text with images when you upload files to `public/images/clients/`

**Sync bundle:** `Navbar.tsx` + `globals.css` + `HeroSection.tsx` + `public/images/clients/` (when ready)  
**Time:** ~20 minutes  

---

## Order to run (fastest path)

```
Step 1  Hero one-liner          ← quick win
Step 2  Scroll + progress bar   ← most important to you
Step 3  Process
Step 4  Testimonials
Step 5  Stats
Step 6  Case studies layout
Step 7  FAQ copy
Step 8  CTA + footer
Step 9  Polish
```

**Total estimate:** about 3–4 focused sessions (not one giant marathon).

---

## What you do vs what I do

| You | Me |
|-----|-----|
| Say “go Step 2” (one step at a time) | Edit the **full sync bundle** for that step |
| Hard refresh localhost | Run build + restart dev + **Review gate** report |
| Say “good” or “fix X” | Only then start the next step |
| Send client logo PNGs when ready | Drop them into hero |
| Tell me if stats should be real Imaginary Space numbers | Use placeholders until then |

---

## Done checklist (whole homepage)

- [x] Hero: one line, gradient, logos below
- [x] Scroll story: 5 lines + **progress bar moves with scroll**
- [x] Value lines + CTA inside scroll flow
- [x] Process: 1–2–3, short copy, CTA
- [ ] Stats match structure (5 items)
- [x] Case studies: heading + category labels on images
- [ ] Case studies: full-width rows (layout — later)
- [ ] FAQ: 8 Morningside-style Q&As
- [x] CTA: Morningside headline + get in touch button
- [ ] Footer: columns + explore links
- [ ] Blue accent only, brand = Imaginary Space

---

*Reference site: [morningside.ai](https://www.morningside.ai/)*
