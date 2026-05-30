# Services Page Plan — Morningside Match

Reference: [morningside.ai/services](https://www.morningside.ai/services)

## Review: Ours vs Morningside

| Area | Ours now | Morningside |
|------|----------|-------------|
| Hero label | "Services" SectionLabel | **None** |
| Hero title | 2 lines + **color box** on "Trusting" | **1 line**, gradient text only |
| Hero subtitle | Long 2-line paragraph | **1 line** |
| Phase nav | Pill buttons, switches content | **Sticky text tabs** + caret on active |
| Phase layout | **Horizontal** 2-column grid | **Vertical** stacked sections |
| Phase card | No border card | **Bordered card**, icon left |
| Step label | "Step 01" uppercase | **Superscript number** + gradient title |
| What we do | Numbered list, uppercase label | **"What we do"** mixed accent, bullet list |

## Implementation order

### Step A — Hero (all phases)
- Remove SectionLabel
- One-line title, gradient on "Trusting It." (no box)
- One-line subtitle (Morningside copy, blue brand)

### Step B — Identify section (approve before polish B/C)
- **One phase at a time** (hash tab switch — NOT all stacked on one scroll)
- Vertical card layout inside centered column (`max-w-5xl`)
- Sticky phase nav with scroll-spy → **nav only, switches panel**
- Icon + title + subtitle + description
- "What we do" list with bullets

### Step C — Develop + Adopt
- Same `ServicePhaseSection` component, data-driven
- Reuses layout from Step B

### Step D — Page tail (later)
- Case study carousel inside phases (Morningside)
- Bottom CTA already matches homepage

## Sync bundle per step
- `lib/constants.ts` (SERVICES_*)
- `ServicesHero.tsx`
- `ServiceTabs.tsx` → vertical phases
- `app/services/page.tsx`

## Review gate
Compare to screenshots at 1280px before sign-off.
