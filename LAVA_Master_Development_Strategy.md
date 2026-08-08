# LAVA Cafe — Master Development Strategy

## 0. Purpose of This Document

This document is the primary strategic brief for the current LAVA Cafe website prototype.

It should be read **before making implementation decisions**.

The project is not currently intended to be the final production website for LAVA. It is a high-quality concept landing page created to demonstrate what LAVA's digital presence could become and to support a sales conversation with the owner.

The implementation should therefore optimize for:

1. Visual impact
2. Brand fit
3. Convincing polish
4. Responsive quality
5. Speed of execution

It should **not** optimize for maximum feature completeness.

---

# 1. Project Context

## Business

**LAVA — coffee, matcha & smoothies**  
Santa Teresa, Costa Rica.

LAVA already has a defined physical and visual identity.

The website concept should strengthen that identity rather than invent a new one.

## Current Commercial Context

This is a speculative concept being developed **before the project has been sold**.

The intended presentation to the owner is:

> "I made a concept for LAVA because I thought the brand had a lot of potential online."

The website should therefore feel highly considered and close enough to a real product to make the vision tangible, but it must remain tightly scoped.

## Time Budget

**Target implementation time: 6–8 hours.**

This constraint is part of the strategy.

If a feature threatens this budget, simplify or remove the feature.

---

# 2. Primary Objective

The landing page should make someone want to physically visit LAVA.

The primary target user is a tourist planning a trip to Santa Teresa or already exploring places to visit in the area.

The desired reaction is:

> "I want to go there."

The website should sell the **place, mood and brand**, not a list of products.

---

# 3. Audience

Primary audience:

- international tourists
- digital nomads
- wellness-oriented customers
- premium / design-aware customers
- visitors researching Santa Teresa before arrival

The audience should perceive LAVA as:

- clean
- premium
- healthy
- contemporary
- intentional
- distinctly Santa Teresa

Avoid making the brand feel:

- overly feminine
- bohemian cliché
- generic wellness
- corporate
- overly luxurious
- over-designed
- like a tech demo

---

# 4. Conversion Strategy

## Primary action

**Get Directions → Google Maps**

The entire page should ultimately guide the visitor toward physically visiting LAVA.

## Secondary action

**Instagram**

Instagram should remain available but visually secondary to Maps.

## No other major conversions in this prototype

Do not add:

- booking
- newsletter signup
- ecommerce
- online ordering
- contact forms
- reservations
- account creation

---

# 5. Project Scope

This phase is a **single-page concept landing page**.

It is not a full website.

## Required

- landing page
- strong hero
- responsive desktop/mobile composition
- visual storytelling using existing photography
- Coffee / Matcha / Smoothies product moment
- Visit / Maps CTA
- Instagram link
- restrained high-end motion
- polished mobile experience

## Optional

- small "Made Here" craft section

Only build this if the page needs it after the core experience is already complete.

## Explicitly deferred

- full menu
- pricing
- CMS
- blog
- ecommerce
- backend
- booking
- online ordering
- SEO content strategy
- multilingual system
- complex navigation
- product detail pages
- WebGL effects
- cursor playgrounds
- large interaction systems
- extensive animation experiments

---

# 6. Existing Repository Strategy

The current repository already contains a useful technical and visual foundation.

Do **not** start from scratch automatically.

Before implementing the new direction:

1. Inspect the current project.
2. Identify reusable foundations.
3. Remove or isolate work that conflicts with this strategy.
4. Preserve technical work that still serves the prototype.

## Keep

Where already present and working:

- Astro
- GSAP
- existing optimized image pipeline
- `sharp`
- existing brand color tokens that accurately reflect LAVA
- `prefers-reduced-motion`
- working Google Maps URL
- useful existing asset organization
- responsive foundations
- Lenis only if it materially improves the final experience

## Rework

- current hero
- existing intro / loader
- page hierarchy
- motion density
- product storytelling

## Defer or remove from the production landing

- Rope interaction
- full Smoothies/menu section
- rock cursor field
- WebGL depth-map/parallax experiments
- `/lab` experiments
- interactions whose primary value is technical novelty

These experiments may remain in the repository if useful for reference, but they must not dictate the final landing page.

---

# 7. Creative North Star

## Core tension

> **Quiet space × loud identity**

Internal shorthand:

> **LAVA is quiet, but not soft.**

LAVA's physical environment feels calm, bright, natural and spacious.

Its graphic identity is considerably louder:

- electric green
- heavy LAVA wordmark
- bold graphic elements
- strong product color
- direct typography

The website should live inside this contrast.

## Emotional translation

> **Tropical calm with an electric edge.**

This is not website copy.

It is a creative decision filter.

---

# 8. Reference Relationship

Primary reference:

**Canyon Coffee**

Do not recreate Canyon Coffee visually.

Take inspiration from its:

- editorial pacing
- large photography
- generous negative space
- typography hierarchy
- restraint
- image scale variation
- magazine-like composition
- deliberate movement

LAVA should remain more:

- tropical
- graphic
- youthful
- electric
- specific to Santa Teresa

## Direction ratio

**70% editorial restraint / 30% graphic LAVA energy**

If the page becomes too beige, delicate or wellness-coded, introduce more LAVA.

If the page becomes too animated, brutalist or experimental, introduce more silence.

---

# 9. Visual System

## Primary colors

Use the existing repo brand tokens when they accurately represent the supplied visual identity.

Approximate reference only:

- LAVA electric green: `#02B72C`
- warm cream: approximately `#F0F2E8`

Do not blindly replace existing accurate extracted values with these approximations.

## Color behavior

Cream should dominate the site.

Green should appear in **high-impact moments**, not as the background of every section.

Recommended rhythm:

**GREEN → CREAM → CREAM/PHOTO → GREEN → CREAM → PHOTO/CREAM**

Avoid turning the website into a "matcha-green website."

---

# 10. Typography

Typography should feel editorial but should never compete with the LAVA wordmark.

## Primary typeface

**Instrument Sans**

Use for:

- body
- navigation
- labels
- large product names
- general headlines

If the existing repo uses an equally appropriate typeface and replacing it adds unnecessary implementation time, evaluate before changing.

## Editorial accent

**Instrument Serif Italic**

Use extremely sparingly.

Good use:

> A good place to *start.*

Bad use:

- whole paragraphs
- every headline
- decorative serif everywhere

## Wordmark

Always use the actual LAVA brand asset when possible.

Do not recreate the LAVA wordmark using a generic bold font.

## Type hierarchy

Keep the system simple.

Suggested levels:

### Display
For:
- COFFEE
- MATCHA
- SMOOTHIES

Approx:
`clamp(5rem, 11vw, 11rem)`

### Editorial headline
Approx:
`clamp(3rem, 6vw, 6rem)`

### Body
Approx:
`1rem–1.25rem`

### Micro / index
Approx:
`0.7rem–0.8rem`

Use strong contrast between oversized typography and tiny editorial labels.

---

# 11. Copy Principles

The site is English-only.

## Voice

- short
- specific
- restrained
- confident
- understated

## Avoid

Do not write phrases such as:

- Fuel your day
- Nourish your body
- Good vibes only
- Your tropical wellness escape
- Crafted with love
- Where wellness meets paradise
- Experience the magic of LAVA

Do not invent:

- sourcing claims
- "ceremonial grade" claims
- roasting claims
- sustainability claims
- product benefits
- origin stories
- brand philosophy

unless confirmed by the owner.

## Rule

> Never explain a feeling that the photography already communicates.

---

# 12. Provisional Copy Deck

Use this as the current working copy unless layout exploration reveals a clear need to adjust it.

## Hero

**LAVA**

`COFFEE, MATCHA & SMOOTHIES`

`SANTA TERESA, COSTA RICA`

## Statement

**A good place  
to start.**

Supporting line:

`Coffee, matcha & smoothies in Santa Teresa, Costa Rica.`

## Place

`02 / THE PLACE`

`SANTA TERESA`  
`COSTA RICA`

No About Us paragraph is required.

## Product moment

`WHAT WE MAKE`

**COFFEE**  
**MATCHA**  
**SMOOTHIES**

No product descriptions or prices.

## Optional craft section

`03 / MADE HERE`

**Made here.**

This section is optional.

## Final CTA

**See you at LAVA.**

`SANTA TERESA, COSTA RICA`

**GET DIRECTIONS ↗**

`INSTAGRAM ↗`

---

# 13. Page Journey

The landing should feel like a visual sequence rather than a stack of standard website sections.

## 01 — Brand Entrance

### Purpose
Immediate brand recognition.

### Visual
Full-screen LAVA green.

LAVA wordmark in cream.

### Behavior
Short controlled transition.

Target duration:
approximately 700–900ms.

This is **not a technical loading screen**.

Do not add:

- progress bars
- percentages
- unnecessary preload waiting
- complex rock animation
- multiple loading states

The entrance should reveal the site quickly.

---

# 14. Section 01 — Hero / The Place

## Purpose

Introduce LAVA as a destination, not merely a café product.

## Desktop

Use an editorial cream canvas.

The hero image should be large but contained rather than automatically full-bleed.

Prefer a portrait / vertical image that shows the LAVA entrance and tropical foreground.

Suggested composition:

- LAVA wordmark / identity top-left
- Santa Teresa / Costa Rica micro-label
- vertical image offset from center
- product descriptor elsewhere in the layout
- significant empty space

The page should resemble a magazine composition more than a conventional hospitality hero.

## Mobile

Do not simply shrink the desktop layout.

Mobile should have its own composition.

Allow the portrait image to become much more dominant — approximately 75–80svh if appropriate.

Keep branding and Visit action simple.

---

# 15. Section 02 — Editorial Statement

## Purpose

Create a pause after the hero.

## Visual

Cream background.

No required image.

Large editorial statement with significant whitespace.

Primary text:

> A good place to start.

Supporting descriptor smaller and offset.

## Motion

Only a restrained text reveal.

No parallax.

No decorative animation.

---

# 16. Section 03 — The Place

## Purpose

Generate physical desire to visit.

The reaction should be:

> "I want to sit there."

## Content

Use approximately 3 images.

Prioritize photography showing:

- patio / tropical exterior
- table by the window
- warm interior / materiality

Avoid building a conventional image gallery.

## Composition

Use an asymmetric editorial sequence:

- different image sizes
- different aspect ratios
- large gaps
- intentional empty space
- occasional micro-labels

Do not place all images in equal cards.

Do not use a standard 3-column gallery.

Whitespace is part of the design.

---

# 17. Section 04 — Coffee / Matcha / Smoothies

This is the primary signature interaction in the body.

## Purpose

Communicate what LAVA makes without turning the site into a menu.

## Desktop concept

Full LAVA green section.

Large cream typography:

**COFFEE**  
**MATCHA**  
**SMOOTHIES**

A product image occupies a dedicated image area.

The active product determines the image.

### Initial state

Coffee active.

### Hover / focus behavior

Hovering or focusing:

- COFFEE
- MATCHA
- SMOOTHIES

changes the active image.

Inactive labels may reduce opacity.

The interaction should remain visually simple.

## Transition

Use one consistent image transition.

Recommended:

- clip / mask reveal
- approximately 450–600ms
- smooth easing

Avoid:

- cursor-follow images
- excessive displacement
- multiple animations per state
- 3D
- WebGL

## Mobile

Do not attempt to reproduce hover behavior.

Convert the experience into a vertical editorial scroll:

**COFFEE**  
[coffee image]

**MATCHA**  
[matcha image]

**SMOOTHIES**  
[smoothie image]

Use the same image reveal language as the rest of the page.

---

# 18. Section 05 — Made Here

## Status

**Optional polish section.**

Do not build until all required sections are functioning and polished.

## Purpose

Introduce one tactile / preparation image after the high-energy green product section.

## Visual

Return to cream.

Use a preparation photograph.

Minimal copy:

`03 / MADE HERE`

**Made here.**

## Removal rule

If the landing already has sufficient rhythm without this section, remove it.

A shorter excellent landing is preferable to a longer weaker landing.

---

# 19. Section 06 — Visit LAVA

## Purpose

Convert brand desire into a physical visit.

## Visual

Use strong Santa Teresa / patio photography.

Keep CTA structure extremely simple.

Copy:

**See you at LAVA.**

`SANTA TERESA, COSTA RICA`

**GET DIRECTIONS ↗**

`INSTAGRAM ↗`

Maps must have stronger visual priority than Instagram.

---

# 20. Navigation

This is a concept landing page.

Do not invent navigation for content that does not exist.

## Desktop

Preferred:

**LAVA** on the left.

**VISIT ↘** or **VISIT ↗** on the right.

Visit scrolls to the final CTA.

Instagram can remain in the footer / final section.

## Mobile

No hamburger is required for one page with one meaningful navigation action.

Use the same simplified structure.

## Sticky behavior

Sticky navigation is optional.

Use it only if it improves orientation without adding visual noise.

---

# 21. Photography Strategy

Photography carries much of the website.

Do not use every available image simply because it exists.

Curate aggressively.

## Suggested roles

### Hero
LAVA entrance / tropical foreground image.

### The Place
- table beside window
- patio
- interior

### Product interaction
- coffee
- matcha
- smoothie

### Optional craft
matcha preparation

### CTA
patio / tropical environment

## Important rule

Images should use different aspect ratios and different visual scales.

The page should not look like a CMS gallery.

Recommended mix:

- portrait
- landscape
- square-ish product frame
- small editorial image
- oversized environment image

This variation is a major part of the editorial language.

---

# 22. Rock Motif

The rock is a legitimate element of LAVA's existing graphic identity.

It may be used.

But:

> One deliberate rock is stronger than a field of interactive rocks.

Good uses:

- small graphic interruption
- section index
- static or subtly animated object
- isolated brand artifact

Avoid:

- cursor swarms
- repeated rock decoration
- forcing the motif into every section

---

# 23. Motion Philosophy

Motion should make the site feel expensive because it is controlled.

Not because there is a lot of it.

## Motion budget

The entire landing should primarily rely on four behaviors:

### 1. Brand entrance
Green LAVA reveal.

### 2. Image reveal system
Consistent mask / clip reveals.

### 3. Very light image movement
Subtle scale or parallax on only a few large images.

### 4. Product image switching
Coffee / Matcha / Smoothies.

Text reveals may be used quietly as supporting behavior.

## Core motion rule

> Animation is punctuation, not decoration.

## Addition rule

If a new interaction is proposed, ask:

> **What existing interaction should this replace?**

Do not simply add another effect.

## Avoid

- scroll hijacking
- long loaders
- excessive SplitText
- cursor gimmicks
- WebGL
- 3D scenes
- constant parallax
- different reveal styles in every section
- movement on every element

---

# 24. Responsive Strategy

Responsive design is not a compression exercise.

Desktop and mobile should share the same brand system but may use different compositions.

## Desktop priorities

- whitespace
- asymmetric layouts
- contained portrait photography
- oversized type
- hover product interaction

## Mobile priorities

- photography becomes more dominant
- vertical rhythm
- typography stays bold but remains readable
- product section becomes scroll-based
- eliminate hover dependencies
- avoid tiny images surrounded by excessive desktop-derived whitespace

The mobile version must feel intentionally designed.

---

# 25. Technical Direction

## Framework

Keep Astro unless the existing repository reveals a critical issue.

Do not migrate frameworks.

## Animation

GSAP is allowed and already appropriate.

Use the minimum amount of animation code required.

## Smooth scrolling

Lenis is optional.

If Lenis creates:

- bugs
- poor mobile feel
- scroll conflicts
- unnecessary complexity

remove or disable it.

Native smooth scrolling is acceptable.

## Images

Reuse the existing optimized image pipeline.

Prioritize:

- responsive image sizing
- AVIF/WebP where existing tooling supports it
- correct intrinsic dimensions
- avoiding oversized assets
- avoiding layout shift

## JavaScript

Keep client-side JS focused on:

- intro
- scroll reveals
- product interaction

Do not turn a static marketing page into a client-heavy application.

---

# 26. Accessibility Baseline

This is a concept prototype, but basic quality still matters.

Required:

- semantic structure
- keyboard-accessible product interaction
- visible focus behavior
- real links for Maps / Instagram
- descriptive alt text
- sufficient contrast
- `prefers-reduced-motion`
- no hover-only critical information

Do not spend speculative-development time building an elaborate accessibility abstraction layer.

Implement the fundamentals well.

---

# 27. Performance Baseline

The site should feel immediate.

Avoid trading performance for animation novelty.

Prioritize:

- fast first meaningful visual
- optimized images
- limited JavaScript
- no unnecessary WebGL
- no blocking loader
- no excessive font weights
- no large third-party dependencies unless already required

The intro should not wait several seconds for the site to load.

If content is not ready instantly, progressively reveal rather than hiding everything behind a loader.

---

# 28. Development Workflow

Claude should not immediately rebuild the page.

Follow this order.

## Phase 0 — Audit

Before editing:

1. inspect current project structure
2. inspect `package.json`
3. inspect current landing components
4. inspect global styles / tokens
5. inspect existing animations
6. inspect assets
7. identify reusable utilities

Produce a short internal assessment:

### KEEP
Existing work that supports this strategy.

### REWORK
Useful work requiring visual or behavioral changes.

### DEFER
Experimental or out-of-scope work.

Do not remove reusable work before understanding it.

---

# 29. Implementation Priority

## Phase 1 — Foundation

Target: ~45–60 min

- preserve / clean global tokens
- establish typography
- establish spacing behavior
- establish cream / green color logic
- simplify page structure
- establish responsive container behavior

Do not animate yet beyond what is necessary to inspect the layout.

---

## Phase 2 — Hero + Intro

Target: ~60–90 min

Build:

- short green brand entrance
- editorial hero composition
- desktop layout
- mobile composition

The hero is the highest-priority section.

Do not continue until it already feels convincing without additional sections.

---

## Phase 3 — Statement + The Place

Target: ~60–90 min

Build:

- editorial statement
- asymmetric photography sequence
- correct image scale rhythm
- whitespace

Focus on composition before motion.

---

## Phase 4 — Coffee / Matcha / Smoothies

Target: ~60–90 min

Build the one signature body interaction.

Desktop:
hover/focus image switch.

Mobile:
vertical scroll sequence.

Keep implementation robust and simple.

---

## Phase 5 — Visit CTA

Target: ~30–45 min

Build:

- closing photography
- final copy
- Maps CTA
- Instagram
- minimal footer

At this point the landing should be functionally complete.

---

## Phase 6 — Motion Pass

Target: ~45–60 min

Only after all sections work responsively:

- intro timing
- image reveal system
- subtle hero movement
- product transition
- restrained text reveals

Use shared motion language.

Do not create isolated animation experiments.

---

## Phase 7 — Responsive + Polish

Target: remaining time

Priority order:

1. mobile composition
2. tablet
3. image cropping
4. spacing
5. animation timing
6. hover/focus
7. performance
8. small visual refinements

If the optional Made Here section does not yet exist, **do not build it until this pass is already strong**.

---

# 30. Timebox Rules

This project has a hard strategic timebox.

At approximately hour 5–6:

Stop adding major features.

Evaluate only:

- Is the visual story convincing?
- Does mobile work?
- Does the hero feel premium?
- Does the product interaction work?
- Does the final CTA work?
- Are animations restrained and smooth?

If yes:

**polish instead of expand.**

At hour 7:

Do not add a new section.

At hour 8:

The project should be presentation-ready, not feature-rich.

---

# 31. Decision Hierarchy

When a decision is ambiguous, prioritize in this order:

1. Does this make someone want to visit LAVA?
2. Does this feel like LAVA?
3. Does this strengthen the editorial composition?
4. Does this improve mobile?
5. Does this improve perceived quality?
6. Does this fit the 6–8 hour scope?
7. Is it technically interesting?

Technical novelty is intentionally last.

---

# 32. Anti-Scope-Creep Rules

Do not build something because:

- GSAP can do it
- an interaction exists in the current lab
- Canyon Coffee has something similar
- the asset exists
- it would look impressive in isolation
- it would be useful in the future production site

Build it only if it improves this prototype now.

## Key rule

> **Do not build everything that could make the website better. Build only what makes the concept more convincing.**

---

# 33. What Success Looks Like

The prototype succeeds if:

- LAVA is recognizable immediately
- the page feels custom rather than templated
- the site feels premium without being luxurious
- the site feels healthy without wellness clichés
- Santa Teresa is communicated visually
- photography creates desire to visit
- motion feels deliberate
- green is memorable without dominating everything
- the product section feels distinctive
- Maps is easy to reach
- mobile looks intentionally composed
- the owner can imagine LAVA having a high-end website

---

# 34. Visual QA Questions

Before declaring a section finished, ask:

### Brand
Does this look like LAVA or could it belong to any premium café?

### Editorial
Is the composition strong without animation?

### Whitespace
Is empty space being used intentionally?

### Photography
Is the image doing useful emotional work?

### Motion
Would the section still feel good if the animation were removed?

### Restraint
Can one element be removed?

### Mobile
Was mobile designed or merely stacked?

### Sales prototype
Will the owner notice this detail, or are we polishing something irrelevant?

---

# 35. Final Creative Filter

Whenever the design becomes uncertain, return to:

> **LAVA is quiet, but not soft.**

Quiet comes from:

- cream
- whitespace
- natural photography
- simple copy
- calm composition

The edge comes from:

- electric green
- heavy LAVA wordmark
- oversized typography
- strong product color
- selective motion
- unexpected editorial layout

The final page should balance both.

Do not let one side consume the other.

---

# 36. End State for This Phase

This phase ends with:

- one polished landing page
- English only
- no CMS
- no backend
- no full menu
- Maps + Instagram
- strong desktop
- strong mobile
- restrained high-end motion
- existing repo cleaned and aligned with the new direction

Anything beyond this belongs to a future phase after the project is sold.
