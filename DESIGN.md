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
/                                Homepage — 2 featured resources + Agent Academy callout + latest feed
/resources/skill-framework.html  Flagship resource #1
/resources/cowork-masterclass.html  Flagship resource #2 (folded in from copilot-cowork-masterclass)
/updates.html                    "Watch & read" — auto-synced YouTube videos + blog posts (v3)
/about.html                      About April
/404.html                        Not-found page (absolute /ai-with-april/ paths — see below)
```

Deliberately flat. No `/paths/professional.html` etc. Add a real per-role landing page or a
resource library page only once there are enough resources that a simple flat list of them stops
being the fastest way to a "first useful resource" (see "v4: removed resource library" below).

**v2 addition:** `resources/cowork-masterclass.html` was added by folding in the
`copilot-cowork-masterclass` repository's content (overview, glossary/FAQ, prompt bank, 7 labs and
challenges, skills starter kit, cheat sheet, slide deck) rather than keeping it as a second public
repo. Source markdown lives in `content/cowork-masterclass/` for provenance, matching the
`content/skill-framework-source.md` precedent. Both flagship resource pages get a direct nav link
(alongside Home / Watch & read / About) — the nav lists actual pages, not a resource-count-scaling
list, so this stays flat as long as there are only a couple of flagship pages.

**v4: removed the resource library.** `resources.html` (client-side search/filter over
`assets/js/resources-data.js`) and its role/topic taxonomy are gone. With only two real flagship
resources plus the live feed, a filterable library added scaffolding without enough content to
browse or filter — and its data file carried four fabricated "coming soon" placeholders that no
longer matched the reduced scope. If a future contributor re-introduces a resource library, bring
back `resources-data.js`'s shape (`id`/`title`/`description`/`status`) rather than reinventing it,
and only do so once there are enough real resources that a shared list/filter page is faster than
scanning the homepage directly.

## Content model: adding a resource

There's no data file or taxonomy anymore — each resource is its own page under `resources/`,
linked directly from `index.html`'s two `.featured` sections and the site nav. To add a new
flagship resource:

1. Build its page under `resources/` following the existing `skill-framework.html` /
   `cowork-masterclass.html` structure (hero, guide body, downloads &amp; credits, footer).
2. Add a new `.featured` (or `.featured--pink`, alternating identity color) section for it on
   `index.html`.
3. Add it to the nav and footer nav on every page.

Only add a page when it's real and written. Per `PRODUCT.md`'s non-fabrication rules, don't add
placeholder entries for resources that don't exist yet — mention them in prose as "coming soon"
only if truly necessary, and never as a clickable link.

## Homepage pattern (v4: simplified)

**v4 removed the three-role "Start Here" pattern entirely** (previously `.start-grid` /
`.start-card`, and before that a v1 "learning map" with a dashed connector line). With only two
flagship resources and a live feed, a role-selection step added a click before a visitor could
reach real content — the opposite of the "land on one useful resource fast" goal.

The homepage is now a direct, linear stack: hero → S.K.I.L.L. framework (`.featured`) → Cowork
Masterclass (`.featured--pink`) → Agent Academy callout (`.spotlight`) → "Fresh from April" live
feed teaser. No role self-selection, no topic browsing — every visitor sees the same two
resources first, because there are only two.

If a future version reintroduces role- or topic-based framing, do it once there are enough
resources that a flat list stops being the fastest path to a first useful resource (same threshold
noted in "Information architecture" above) — and keep entrances parallel (no implied order, no
connector line/numbering), per the reasoning in `PRODUCT.md`'s v2 framing note.

## Component conventions

- **Cards that are entirely links** (`.featured`, `.update-card`) must explicitly reset
  `text-decoration: none` and `color` at the card level — don't rely on resetting anchors
  globally, since inline text links elsewhere in prose should keep their underline for
  accessibility.
- **Accent placement:** avoid thick single-side "tab" borders on cards (a common AI-generated-UI
  tell). Role differentiation (where it appears, inside guide pages) uses a small inline dot
  (`.role-callout__dot`), never a left-border stripe.
- **Badges** (`.badge`, `.badge--pink`, `.tag`) are pill-shaped with a tinted background + border
  in the accent color, never solid-fill, to stay legible.
- **A second "featured" resource block** (`.featured--pink`) exists specifically so a 2nd flagship
  resource (Cowork Masterclass) reads as visually distinct from the 1st (S.K.I.L.L. framework, plain
  `.featured`) via accent color alone — same layout, same actions pattern, different identity color.
- **`.spotlight`** (v4, added for the Agent Academy callout) is a single-column blue-gradient
  banner using `--color-blue-light` / `--color-blue-border`, deliberately distinct from `.featured`
  (which is two-column with media) — it reads as an external pointer, not a "third resource," since
  there's no accompanying image for it.

## Accessibility & motion

- `:focus-visible` gets a visible 3px outline everywhere; never removed, only re-colored.
- A skip link is the first focusable element on every page.
- `prefers-reduced-motion: reduce` collapses all transitions/animations to ~0 and disables smooth
  scrolling, handled once globally in `style.css` — don't add page-specific motion that bypasses
  this query.
- Mobile nav is a real `<button>` with `aria-expanded`/`aria-controls`, toggled via `assets/js/main.js`.
- All images have descriptive `alt` text; decorative icons (the `.role-callout__dot` marker) use
  `aria-hidden="true"`.

## 404 page path convention

`404.html` is the only file in the repo that uses **absolute** paths
(`/ai-with-april/assets/...`) instead of relative ones. GitHub Pages serves the same `404.html`
for any unmatched URL at any depth, so a relative path would resolve incorrectly depending on
where the visitor "was" when they 404'd. Every other page uses relative paths deliberately, so the
whole site can be spot-checked locally by serving the repo root directly.

## Live feed sync (v3): YouTube + blog

`updates.html` and the homepage's "Fresh from April" teaser show April's real, recent YouTube
uploads and blog posts. It's a live, auto-refreshed feed — distinct in tone from the two hand-built
flagship guides, since it updates daily without review. (v4 dropped the earlier "not part of the
curated resource library" framing along with the library page itself; there's no separate curated
library to distinguish it from anymore.)

**Why this shape (no API keys, no backend, no build step):** the two obvious alternatives were
rejected for concrete reasons, not just preference:

- Client-side calls to the YouTube Data API need an API key. Any key usable from a static site's
  JS is public by definition — locking it to an HTTP referrer reduces but doesn't eliminate misuse,
  and it adds a quota to manage. Not worth it for a "show my last few videos" feature.
- Client-side `fetch()` of the WordPress RSS feed fails outright — `aprildunnam.com/feed/` doesn't
  send CORS headers, so a browser blocks the cross-origin request. There's no key to add; it simply
  doesn't work from client JS.

Instead, both sources are fetched **server-side, on a schedule**, using endpoints that require no
key at all:

- Blog: `https://aprildunnam.com/feed/` — WordPress's built-in RSS feed.
- Video: `https://www.youtube.com/feeds/videos.xml?channel_id=UCz_x76EBX5UXsV27drGNh6w` — YouTube's
  built-in, public, keyless Atom feed for a channel (or, with `playlist_id=` instead of
  `channel_id=`, for a specific playlist — see limitation below).

### Pipeline

```
.github/workflows/fetch-feeds.yml   Daily cron (+ manual dispatch) →
scripts/fetch-feeds.mjs             fetches both feeds, parses via regex (no deps), writes →
assets/data/blog-posts.json         ← capped at 6 items, decoded entities, boilerplate stripped
assets/data/youtube-videos.json     ← capped at 6 items
                                     Workflow commits changed JSON to main, which triggers the
                                     existing deploy.yml (it runs on every push to main) →
assets/js/feeds.js                  Client runtime: reads [data-feed="videos"/"posts"] containers,
                                     fetches the matching JSON same-origin, renders cards.
```

`scripts/fetch-feeds.mjs` has no npm dependencies (uses global `fetch`, matching the rest of the
site's zero-build-step convention) and parses both feed formats with regex, since both are simple,
predictable XML shapes (RSS `<item>` blocks; Atom `<entry>` blocks with a nested `<media:group>`).
It decodes the small set of numeric entities WordPress emits, strips the "The post X appeared first
on Y." boilerplate WordPress appends to `<description>`, and truncates excerpts to 180 characters.
If a fetch fails, that feed's existing JSON file is left untouched (last-known-good) rather than
overwritten with empty data, and the script exits non-zero so the workflow run shows as failed.

`assets/js/feeds.js` is a small reusable renderer, not a page-specific script: any container with
`data-feed="videos"` or `data-feed="posts"` gets populated from the matching JSON file, optionally
capped with `data-feed-limit="N"` (used for the homepage's 3-item teaser vs. `updates.html`'s full
6-item grids), and any element with `data-feed-updated="videos"/"posts"` gets a "Last synced &lt;date&gt;"
note. Empty and error states render honest placeholder copy ("New videos will appear here once the
daily sync runs") rather than hiding silently or showing a stale/fake state.

**`.update-card` CSS** (in `style.css`, alongside the other card components) follows the existing
accent convention: blue for videos, `.update-card--post` (pink) for blog posts — matching
`.featured` / `.featured--pink`'s existing blue=primary/pink=secondary pattern. All colors reference
existing `--color-*` tokens; no new hex values were introduced for this feature.

### Known limitation: channel uploads, not a curated playlist

The request was for "a playlist I curate" — a specific, hand-picked YouTube playlist. No playlist
ID/URL was available at build time, so this ships against April's **full channel uploads feed**
instead: real, verifiable, unfabricated content, but broader than a curated playlist (it includes
shorts, promos, and "coming up" announcements alongside long-form videos). This is a genuine
placeholder, not a design choice — reconfigure it the moment a playlist ID exists:

1. Open `scripts/fetch-feeds.mjs`.
2. Change `YOUTUBE_FEED_URL` from `...?channel_id=UCz_x76EBX5UXsV27drGNh6w` to
   `...?playlist_id=PLxxxxxxxxxxxxxxxx` (the target playlist's ID).
3. Commit — the next scheduled run (or a manual `workflow_dispatch`) picks it up automatically. No
   other file needs to change.

## Non-fabrication enforcement

`PRODUCT.md`'s non-fabrication rules are enforced structurally, not just by discipline:

- There is no testimonials component, usage-stats component, or partner-logo component anywhere
  in `style.css` — none exist to accidentally fill in later.
- "Coming soon" resources are rendered as non-interactive (`<div role="group">`, not `<a>`) so
  they can never be clicked through to a page that doesn't exist.
