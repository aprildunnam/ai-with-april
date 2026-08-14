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

Sourced directly from two references, sampled/extracted rather than guessed:

- **aprildunnam.com** (Astra/WordPress CSS custom properties): blue family
  `#046bd2` / `#045cb4`, slate `#1e293b` / `#334155`.
- **The S.K.I.L.L. framework artwork** (`assets/img/skill-framework.png`), sampled with PIL:
  navy base `#15181e`, card surfaces `#21262f` / `#2b313c`, near-white text `#f2f5f9`, mint accent
  `#2ee6a8`, gold accent `#ffc24b`.

These were blended into the token set at the top of `assets/css/style.css`:

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#10141c` | Page background (navy, not pure black) |
| `--color-surface` / `--color-surface-2` | `#1c2330` / `#242c3b` | Cards, toolbars |
| `--color-text` / `--color-text-muted` / `--color-text-faint` | `#f2f5f9` / `#b7c0cf` / `#7c879b` | Body text hierarchy |
| `--color-blue-strong` / `--color-blue-hover` | `#046bd2` / `#5aa4f2` | Primary actions, links |
| `--color-mint` | `#2ee6a8` | Success/active accent, role 2 |
| `--color-gold` | `#ffc24b` | Role 3 accent, "coming soon" badges |

All contrast pairs were checked against WCAG AA (see QA notes below); everything is 5:1 or better.

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
/                                Homepage — learning map + featured resource + taxonomy
/resources.html                  Full resource library (search + filter, client-side only)
/resources/skill-framework.html  The one full resource page today
/about.html                      About April
/404.html                        Not-found page (absolute /ai-with-april/ paths — see below)
```

Deliberately flat. No `/paths/professional.html` etc. — role-based "paths" are framed as entry
points into the same library (via `resources.html?role=X` query params and anchored callouts on
the S.K.I.L.L. page), not separate content trees to maintain in parallel. Add a real per-role
landing page only once there are enough resources that a shared library page stops being the
fastest way to a "first useful resource."

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

## Learning map pattern (homepage)

The homepage intentionally avoids a generic "hero + 3 feature cards" SaaS layout. The `.map`
component renders role entrances as stops along a dashed connector line (`.map::before`), evoking
a literal path rather than a features grid. Each `.map-stop` is a full-card link (not a "read
more" pattern) so the one-minute-to-first-resource goal in `PRODUCT.md` holds: one click from
homepage to a real resource, always.

When adding a 4th role or a 2nd map row in the future, keep the connector-line treatment — that
visual metaphor is what distinguishes this from a stock template, and losing it re-generic-izes
the page.

## Component conventions

- **Cards that are entirely links** (`.map-stop`, `.topic-card`, `.resource-card` when
  `status: available`) must explicitly reset `text-decoration: none` and `color` at the card
  level — don't rely on resetting anchors globally, since inline text links elsewhere in prose
  should keep their underline for accessibility.
- **Accent placement:** avoid thick single-side "tab" borders on cards (a common AI-generated-UI
  tell). Role/step differentiation uses either a bordered circular index (`.map-stop__index`) or
  a small inline dot (`.role-callout__dot`), never a left-border stripe.
- **Badges** (`.badge`, `.badge--soon`, `.tag`) are pill-shaped with a tinted background + border
  in the accent color, never solid-fill, to stay legible against the dark surfaces.

## Accessibility & motion

- `:focus-visible` gets a visible 3px outline everywhere; never removed, only re-colored.
- A skip link is the first focusable element on every page.
- `prefers-reduced-motion: reduce` collapses all transitions/animations to ~0 and disables smooth
  scrolling, handled once globally in `style.css` — don't add page-specific motion that bypasses
  this query.
- Mobile nav is a real `<button>` with `aria-expanded`/`aria-controls`, toggled via `assets/js/main.js`.
- All images have descriptive `alt` text; decorative icons (search glyph, index numbers) use
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
