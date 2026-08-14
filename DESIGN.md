# DESIGN.md

The durable design world for **AI with April**, established after v1 implementation. Read this
before adding pages, resources, or restyling anything — it documents *why* things are the way
they are, not just what they are.

## Implementation approach

Plain semantic HTML + CSS + vanilla JS. No framework, no bundler, no build step. This is
deliberate: a personal learning hub run by one person needs near-zero maintenance burden more
than it needs component reuse tooling. Every page is a self-contained `.html` file that shares
`assets/css/style.css` and, where needed, `assets/js/*.js`.

## Brand tokens

Sourced directly from three references, sampled/extracted rather than guessed:

- **aprildunnam.com** (Astra/WordPress CSS custom properties): blue family
  `#046bd2` / `#045cb4`, slate `#1e293b` / `#334155`.
- **April's confirmed brand palette** (attached directly, v2): light editorial system — pink
  `#E8327A` / `#993556` (text-safe), blue `#29ABE2` / `#185FA5` (text-safe), dark ink `#111111`,
  white/light-gray surfaces.
- **The Cowork Masterclass's own `cheat-sheet.html`** (folded into this repo, v2): uses the exact
  same `#E8327A` pink as its accent — independent confirmation that the attached palette is
  April's real, already-in-use brand system, not a hypothetical.
- **The S.K.I.L.L. framework artwork** (`assets/img/skill-framework.png`, v1): sampled with PIL for
  the original dark/navy direction — superseded in v2 (see below), but kept here as a record of
  where v1's now-retired tokens came from.

These were blended into the token set at the top of `assets/css/style.css`. **v2 replaced the
entire palette** (light, not dark) — the table below reflects the current, live tokens:

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#ffffff` | Page background |
| `--color-surface` / `--color-surface-2` | light grays | Cards, toolbars |
| `--color-text` / `--color-text-muted` / `--color-text-faint` | dark ink hierarchy (`#111111` down to `#6b6b6b`) | Body text hierarchy |
| `--color-blue-strong` / `--color-blue-hover` | `#185FA5` / `#29ABE2`-derived | Primary actions, links, role 1 accent |
| `--color-pink` / `--color-pink-strong` | `#E8327A` (bg only) / `#993556` (text) | Role 2 accent, Cowork Masterclass identity color, interactive/hover accent |
| `--color-text` (dark ink) | `#111111` | Role 3 accent (3rd differentiator; the palette only supplies 2 saturated accents) |

**Why `--color-pink-strong` exists as a separate token:** raw `--color-pink` (#E8327A) on white is
4.06:1 contrast — passes for large/bold text (glyphs, backgrounds) but fails AA for normal body
text (needs 4.5:1). `--color-pink-strong` (#993556, April's own "pink-text" value) is 7.00:1 and is
used for every pink *text* use (links, eyebrow, hover states); raw `--color-pink` is reserved for
backgrounds and large bold glyphs only. The same logic applies to blue: raw `--color-blue` is
decorative-only, `--color-blue-strong` is the text/link-safe value.

Two other tokens deliberately deviate from a literal reading of the source palette, each with a
brand-sourced justification:

- `--color-text-faint` is `#6b6b6b`, not a straight `#888888` — the latter fails AA (3.54:1). The
  chosen value is 5.33:1 **and** is the exact gray already used by the Cowork Masterclass's own
  `.sub` class in `cheat-sheet.html`, so it's not an arbitrary invention.
- `--color-border-strong` is `#949494` (not a plain mid-gray) for better non-text contrast on
  interactive borders (buttons, inputs, chips) per WCAG 1.4.11, while the plain decorative
  `--color-border` divider color stays exactly `#e5e5e5`.

All contrast pairs were checked against WCAG AA using a standalone luminance/contrast script;
everything used for text passes 4.5:1 (7:1 for `-strong` variants), and decorative/large-text-only
uses are documented inline in `style.css` where they intentionally sit below that bar.

**Do not hardcode hex colors in new markup or CSS.** Reference the `--color-*` custom properties
so a future palette adjustment is a one-file change.


## Typography

- Display/heading font: **Bricolage Grotesque** (`--font-display`)
- Body font: **IBM Plex Sans** (`--font-body`)

These were chosen specifically to avoid the over-used AI-generated-site defaults (Inter, Roboto,
Space Grotesk, Geist, Plus Jakarta Sans, Fraunces). Both load from Google Fonts with a full system
sans-serif fallback stack, so the site is still fully legible offline or if the CDN is blocked.

## Information architecture

```
/                                Homepage — Start Here entrances + 2 featured resources + taxonomy
/resources.html                  Full resource library (search + filter, client-side only)
/resources/skill-framework.html  Flagship resource #1
/resources/cowork-masterclass.html  Flagship resource #2 (folded in from copilot-cowork-masterclass)
/about.html                      About April
/404.html                        Not-found page (absolute /ai-with-april/ paths — see below)
```

Deliberately flat. No `/paths/professional.html` etc. — role-based entrances are framed as entry
points into the same library (via `resources.html?role=X` / `?topic=X` query params and anchored
callouts on each resource page), not separate content trees to maintain in parallel. Add a real
per-role landing page only once there are enough resources that a shared library page stops being
the fastest way to a "first useful resource."

**v2 addition:** `resources/cowork-masterclass.html` was added by folding in the
`copilot-cowork-masterclass` repository's content (overview, glossary/FAQ, prompt bank, 7 labs and
challenges, skills starter kit, cheat sheet, slide deck) rather than keeping it as a second public
repo. Source markdown lives in `content/cowork-masterclass/` for provenance, matching the
`content/skill-framework-source.md` precedent. Both flagship resource pages get a direct nav link
(alongside Home / Resource library / About) — the nav lists actual pages, not a resource-count-scaling
list, so this stays flat as long as there are only a couple of flagship pages.

## Content model: adding a resource

Everything the library page renders comes from one array:
`assets/js/resources-data.js` → `window.AI_WITH_APRIL_RESOURCES`.

To add a resource:

1. Add an object with `id`, `title`, `description`, `roles[]`, `topics[]`, `formats[]`, `status`.
2. If it's real and written, set `status: "available"` and `url` to its page, and it appears in
   search/filter and is clickable immediately.
3. If it's planned but not written, set `status: "coming-soon"` and omit `url`. It renders with a
   gold "Coming soon" badge, is not a link, and cannot be clicked — this is how the non-fabrication
   rule from `PRODUCT.md` is enforced in code, not just by convention.

Role keys (`professional`, `maker`, `builder`) and topic keys must exist in
`window.AI_WITH_APRIL_TAXONOMY` in the same file — that object is the single place labels are
defined, so a label change never requires touching more than one file.

To add a genuinely new topic or role to the taxonomy, add it to `AI_WITH_APRIL_TAXONOMY` **and**
add a matching filter chip button in `resources.html` (`data-role-filter` / `data-topic-filter`)
and, if it should be discoverable from the homepage, a `.topic-card` in `index.html`.

## Start Here pattern (homepage)

**v2 replaced the "learning map" pattern.** v1 rendered role entrances as stops along a dashed
connector line (`.map::before`), evoking a literal sequential path. On reflection this implied an
order that doesn't exist — a visitor picks *one* of the three, they don't progress through all
three — and the connector/numbering read as a gimmick rather than a genuine wayfinding aid.

v2's `.start-grid` keeps everything that made the pattern work (three full-card links, each one
click from a real resource, no "read more" pattern) and drops only the sequence implication:

- No connector line between cards.
- Badges are role-initial letters (`P` / `M` / `B`) in a bordered circle, not numbers — a visual
  identity mark per role, not a step count.
- A visible "browse by topic instead" link sits below the grid, pointing to `#topics` on the same
  page, for visitors who'd rather self-select by subject than by role.
- The section has its own `eyebrow` + `h2` ("Start here" / "Three ways in — pick the one that's
  you"), rather than being folded silently into the hero, so it reads as a first-class homepage
  section like the featured-resource and topic-taxonomy sections below it.

When adding a 4th role or a 2nd row in the future, keep the "parallel entrances, no implied order"
principle — reintroducing a connector line or numeric badges would re-introduce the sequencing
problem this change fixed.

## Component conventions

- **Cards that are entirely links** (`.start-card`, `.topic-card`, `.resource-card` when
  `status: available`) must explicitly reset `text-decoration: none` and `color` at the card
  level — don't rely on resetting anchors globally, since inline text links elsewhere in prose
  should keep their underline for accessibility.
- **Accent placement:** avoid thick single-side "tab" borders on cards (a common AI-generated-UI
  tell). Role differentiation uses a bordered circular badge (`.start-card__badge`, a role-initial
  letter) or a small inline dot (`.role-callout__dot`), never a left-border stripe.
- **Badges** (`.badge`, `.badge--soon`, `.badge--pink`, `.tag`) are pill-shaped with a tinted
  background + border in the accent color, never solid-fill, to stay legible.
- **A second "featured" resource block** (`.featured--pink`) exists specifically so a 2nd flagship
  resource (Cowork Masterclass) reads as visually distinct from the 1st (S.K.I.L.L. framework, plain
  `.featured`) via accent color alone — same layout, same actions pattern, different identity color.

## Accessibility & motion

- `:focus-visible` gets a visible 3px outline everywhere; never removed, only re-colored.
- A skip link is the first focusable element on every page.
- `prefers-reduced-motion: reduce` collapses all transitions/animations to ~0 and disables smooth
  scrolling, handled once globally in `style.css` — don't add page-specific motion that bypasses
  this query.
- Mobile nav is a real `<button>` with `aria-expanded`/`aria-controls`, toggled via `assets/js/main.js`.
- All images have descriptive `alt` text; decorative icons (search glyph, role-badge letters) use
  `aria-hidden="true"`.

## 404 page path convention

`404.html` is the only file in the repo that uses **absolute** paths
(`/ai-with-april/assets/...`) instead of relative ones. GitHub Pages serves the same `404.html`
for any unmatched URL at any depth, so a relative path would resolve incorrectly depending on
where the visitor "was" when they 404'd. Every other page uses relative paths deliberately, so the
whole site can be spot-checked locally by serving the repo root directly.

## Non-fabrication enforcement

`PRODUCT.md`'s non-fabrication rules are enforced structurally, not just by discipline:

- There is no testimonials component, usage-stats component, or partner-logo component anywhere
  in `style.css` — none exist to accidentally fill in later.
- "Coming soon" resources are rendered as non-interactive (`<div role="group">`, not `<a>`) so
  they can never be clicked through to a page that doesn't exist.
