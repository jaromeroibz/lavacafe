# CLAUDE.md — LAVA Cafe

## Read First

This repository contains an earlier LAVA website direction. The current source of truth is:

**`docs/LAVA_Master_Development_Strategy.md`**

Read that document before significant design, architecture, copy, motion, or scope decisions.

Instruction priority:

1. latest explicit user instruction
2. `docs/LAVA_Master_Development_Strategy.md`
3. this `CLAUDE.md`
4. current production code
5. old experiments / lab code

If existing code conflicts with the current strategy, the strategy wins unless the user says otherwise.

---

## Project Goal

This phase is a **6–8 hour speculative concept landing page**, not the complete production website.

Primary objective:

> Make someone want to physically visit LAVA.

LAVA is a coffee, matcha & smoothies café in Santa Teresa, Costa Rica.

Optimize for:

- visual impact
- brand fit
- editorial composition
- responsive quality
- convincing polish
- speed of execution

Do **not** optimize for feature completeness.

---

## Creative North Star

> **LAVA is quiet, but not soft.**

> **Quiet space × loud identity**

Target balance:

**70% editorial restraint / 30% graphic LAVA energy**

Quiet:
- warm cream
- whitespace
- natural photography
- simple copy
- calm composition

Edge:
- electric LAVA green
- heavy LAVA wordmark
- oversized type
- strong product color
- selective motion
- unexpected editorial composition

If it feels too beige, soft, feminine, boho or generic-wellness, add more LAVA.

If it feels too noisy, brutalist, over-animated or experimental, add more silence.

Canyon Coffee is a **principles reference**, not a layout to copy. Borrow editorial pacing, photography scale, whitespace and restraint; keep LAVA more tropical, graphic and specific to Santa Teresa.

---

## First Migration Pass

Before broad changes:

1. inspect `package.json`
2. inspect `src/pages/index.astro`
3. inspect relevant components, layouts and scripts
4. inspect global tokens/styles
5. inspect `public/img`
6. inspect current animation utilities/experiments
7. read the Master Development Strategy completely

Then report:

### KEEP
Existing work that supports the new strategy.

### REWORK
Useful foundations that need a new direction.

### DEFER
Work outside this prototype's scope.

For the **initial migration only**, present this audit before broad rebuilding unless the user explicitly tells you to proceed.

After the plan is approved, proceed normally without repeatedly asking permission for routine implementation.

---

## Technical Foundation

Keep the existing stack:

- Astro
- GSAP
- Sharp / existing image optimization workflow
- Lenis only if it materially improves the experience

Do not migrate frameworks.

Do not add:

- React/Next/Vue/Svelte
- CMS
- backend/API
- UI framework
- state library
- ecommerce infrastructure

Do not upgrade dependencies just because newer versions exist.

Current project commands:

```bash
npm run dev
npm run build
npm run preview
```

There is no dedicated lint/test command in the current package scripts.

Run:

```bash
npm run build
```

after meaningful implementation work and before declaring a phase complete.

---

## Current Landing Scope

Required:

1. Brand Entrance
2. Hero
3. Editorial Statement
4. The Place
5. Coffee / Matcha / Smoothies
6. Visit LAVA

Optional:

7. Made Here

Only add **Made Here** after the required experience is complete, responsive and polished.

Explicitly deferred:

- full menu
- prices
- CMS
- blog
- ecommerce
- online ordering
- booking/reservations
- newsletter/contact form
- multilingual architecture
- product detail pages
- complex navigation
- WebGL
- 3D
- cursor playgrounds
- large interaction systems
- animation labs

Existing Rope/Smoothies/lab/WebGL/rock experiments may provide reusable engineering, but they do not define the final landing.

---

## Copy

English only.

Use the working copy defined in the Master Strategy.

Core copy:

**Hero**
- LAVA
- COFFEE, MATCHA & SMOOTHIES
- SANTA TERESA, COSTA RICA

**Statement**
- A good place to start.
- Coffee, matcha & smoothies in Santa Teresa, Costa Rica.

**Place**
- 02 / THE PLACE
- SANTA TERESA
- COSTA RICA

**Products**
- WHAT WE MAKE
- COFFEE
- MATCHA
- SMOOTHIES

**Optional**
- 03 / MADE HERE
- Made here.

**Final CTA**
- See you at LAVA.
- SANTA TERESA, COSTA RICA
- GET DIRECTIONS ↗
- INSTAGRAM ↗

Do not expand copy just to fill space.

Do not invent claims about sourcing, roasting, ceremonial-grade matcha, sustainability, health benefits, founders, ingredients or brand history.

Rule:

> **Never explain a feeling the photography already communicates.**

Avoid generic wellness/hospitality language such as “Fuel your day,” “Good vibes only,” “Crafted with love,” or “Experience the magic.”

---

## Navigation

This is a one-page concept.

Preferred:

- LAVA / wordmark left
- VISIT right

`VISIT` scrolls to the final CTA.

Instagram is secondary and can live in the final section/footer.

No invented multi-link desktop nav.

No mobile hamburger unless the real information architecture later requires one.

---

## Hero

Highest-priority visual section.

Desktop:
- cream canvas
- contained portrait photography
- asymmetric composition
- meaningful negative space
- LAVA identity
- small location/product labels
- editorial, not conventional hospitality

Do not default to a full-screen photo + centered logo + centered marketing CTA.

Mobile:
- create a dedicated composition
- let portrait photography become more dominant
- do not merely stack the desktop layout

The hero should feel strong **before** motion is added.

---

## Photography

Use only supplied/approved project imagery unless the user explicitly requests external assets.

Do not add stock photography.

Curate aggressively.

Primary emotional test:

> **Does this image make someone want to be there?**

Use varied scale and aspect ratios.

Avoid:
- equal image cards
- standard three-column galleries
- identical ratios everywhere
- Instagram-feed grids

If a strategy-required image is missing from the repo, flag it instead of silently substituting unrelated imagery.

---

## Brand + Typography

Use the real LAVA wordmark/logo asset where available.

Do not rebuild the logo with a generic font.

Preserve accurate existing brand tokens after inspecting them.

Strategic color references:
- LAVA green ≈ `#02B72C`
- warm cream ≈ `#F0F2E8`

Existing extracted repo values may be more accurate.

Cream should dominate. Green is a high-impact interruption.

Typography direction:
- Instrument Sans — primary
- Instrument Serif Italic — rare editorial accent
- real LAVA wordmark — logo

Do not overuse serif.

Prefer a small hierarchy with strong scale contrast rather than many font styles.

---

## Coffee / Matcha / Smoothies

This is the **signature body interaction**.

### Desktop

Full LAVA-green section.

Large cream labels:

- COFFEE
- MATCHA
- SMOOTHIES

One active product image.

Default: COFFEE.

Hovering **or keyboard focusing** a label changes the image.

Use one transition:
- mask/clip reveal
- roughly 450–600ms
- smooth easing

Inactive labels may reduce opacity.

### Mobile

Do not reproduce hover.

Use a vertical editorial sequence:

- COFFEE + image
- MATCHA + image
- SMOOTHIES + image

Use the shared image reveal language.

Do not add:
- prices
- descriptions
- cursor-follow imagery
- WebGL
- 3D
- multiple competing transitions

---

## Rock Motif

The rock can be used as a brand accent.

> **One deliberate rock is stronger than a field of interactive rocks.**

Good:
- one isolated graphic artifact
- subtle motion
- section detail

Avoid:
- rock fields
- cursor swarms
- repeated decoration
- making rocks the central interaction

---

## Motion Budget

Primary motion language:

1. short LAVA brand entrance
2. consistent image mask/reveal
3. subtle movement on a few large photographs
4. product image switching

Quiet text reveals are acceptable.

Core rule:

> **Animation is punctuation, not decoration.**

Before adding a new interaction ask:

> **What existing interaction should this replace?**

If the answer is “none,” strongly reconsider it.

Avoid:
- long loaders
- percentage loaders
- scroll hijacking
- excessive SplitText
- cursor gimmicks
- constant parallax
- WebGL
- 3D
- a different reveal style in every section

### Intro

The green opening is a brand transition, not a loader.

Target: roughly **700–900ms**.

Green + cream wordmark + one simple exit.

Do not wait several seconds for assets.

---

## Responsive

Responsive design is not a compression exercise.

Desktop priorities:
- whitespace
- asymmetry
- varied image scale
- product hover/focus interaction

Mobile priorities:
- strong vertical rhythm
- dominant photography
- deliberate crops
- readable oversized type
- no hover dependency
- simpler interactions

Do not accept “desktop + flex-direction: column” as the complete mobile strategy.

Check desktop, mobile and at least one intermediate/tablet width.

---

## Accessibility + Performance

Baseline requirements:

- semantic HTML
- sensible heading structure
- descriptive alt text
- keyboard-accessible product interaction
- visible focus
- real anchor links
- sufficient contrast
- `prefers-reduced-motion`
- no critical hover-only information

Performance:
- optimized images
- responsive sizing
- intrinsic dimensions
- minimal layout shift
- limited client-side JS
- no unnecessary WebGL
- no blocking loader

If an effect harms mobile smoothness, simplify or remove it.

Lenis is optional. Remove/disable it if it creates scroll friction, anchor issues, GSAP conflicts or needless complexity.

---

## Component / CSS Guidance

Prefer meaningful section components, for example:

- `Intro`
- `Hero`
- `Statement`
- `Place`
- `Products`
- `MadeHere` (optional)
- `Visit`

Adapt names to the existing architecture if cleaner.

Do not create dozens of tiny abstractions for a one-page prototype.

Shared motion utilities are useful when they enforce consistency.

Prefer a small token system for:
- colors
- typography
- gutters
- spacing
- easing
- animation duration

Editorial sections may use section-specific CSS.

Avoid generic card-heavy UI.

---

## Asset Handling

Reuse existing optimized `public/img` assets where appropriate.

Do not duplicate or re-export assets unnecessarily.

For new supplied photos:
- use understandable filenames
- optimize consistently when worthwhile
- retain enough resolution for intended display size
- do not ship huge originals unnecessarily

Do not spend time deleting harmless experimental assets solely for cleanliness. Removing them from the production path is enough for this prototype.

---

## Implementation Order

### Phase 0 — Audit
Understand before changing.

### Phase 1 — Foundation
Typography, tokens, layout skeleton, responsive foundations.

### Phase 2 — Intro + Hero
Highest priority. Make it convincing before moving on.

### Phase 3 — Statement + The Place
Composition first; animation later.

### Phase 4 — Coffee / Matcha / Smoothies
Build the one signature body interaction.

### Phase 5 — Visit CTA
Required landing is now complete.

### Phase 6 — Motion Pass
Only after static responsive layouts work.

### Phase 7 — Responsive + Polish
Spend remaining time improving quality, not adding features.

---

## Timebox

At approximately hour 5–6:
- stop adding major features
- evaluate hero, journey, mobile, products, CTA and motion
- polish

At hour 7:
- do not add another section

At hour 8:
- prioritize presentation readiness

A shorter excellent landing is better than a longer unfinished one.

---

## Validation

Before presenting substantial work as complete:

1. inspect desktop
2. inspect mobile
3. inspect an intermediate width
4. check image crops
5. check navigation/anchors
6. check product keyboard behavior
7. check reduced motion
8. check obvious console/runtime errors
9. run `npm run build`

Fix build failures before declaring completion.

---

## Decision Hierarchy

When uncertain:

1. Will this make someone want to visit LAVA?
2. Does it feel specifically like LAVA?
3. Does it strengthen editorial composition?
4. Does it improve mobile?
5. Does it improve perceived quality?
6. Does it fit the 6–8 hour prototype?
7. Is it technically interesting?

Technical novelty is last.

---

## Anti-Scope-Creep

Do not build something merely because:

- GSAP can do it
- it already exists in `/lab`
- Canyon Coffee does something similar
- an asset exists
- it looks impressive in isolation
- it might be useful in a future paid site

Core rule:

> **Do not build everything that could make the website better. Build only what makes the concept more convincing.**

---

## Definition of Done

This phase is done when the project has:

- one polished English landing page
- immediately recognizable LAVA identity
- editorial/high-end composition
- compelling photography
- restrained motion
- intentional desktop design
- intentional mobile design
- Coffee / Matcha / Smoothies moment
- Google Maps as primary CTA
- Instagram as secondary CTA
- successful Astro production build

Anything beyond that belongs to a future phase after the project is sold.
