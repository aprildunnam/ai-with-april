# DESIGN.md

The durable design world for **AI with April**, established after v1 implementation. Read this
before adding pages, resources, or restyling anything — it documents *why* things are the way
they are, not just what they are.

## Current direction: Copilot-first editorial portfolio (November 2026)

This section supersedes earlier layout notes below. Preserve April's recognizable blue/rose
palette and Bricolage Grotesque / IBM Plex Sans pairing while foregrounding her identity,
Microsoft Copilot, Copilot Studio, and AI agents. Power Platform remains a supporting expertise.
Use real portraits, deck covers, demos, the published book, and Agent Academy contribution
as evidence; never decorate the page with fabricated metrics or logos.

Homepage order: identity-led hero and visible portrait (including mobile), compact proof strip,
GET-based talk finder, four selected presentations, practical Resources (copyable prompts,
playable demos, and reusable downloads), speaking calendar/map, Agent Academy, latest videos,
book, and speaking/contact. Keep presentation slides in the talk cards; Resources should
expose usable material directly rather than repeat a directory of guide links. Full guides
and the app chooser retain their existing URLs. The session catalog is the exhaustive
view, with `q`, `topic`, and `event` query state. Shared header: Home / Talks / Resources /
Watch & read / About April, plus a native theme selector.

Light and dark modes use semantic `--color-*` tokens at the top of the shared stylesheet;
dark backgrounds are ink/charcoal with lighter blue/rose text. Primary actions use
`--color-on-accent`, never a fixed white foreground. Source slide images and diagrams retain
their original colors rather than being filtered or inverted. `theme.js` applies the stored
preference before CSS to avoid theme flashing; Auto follows the device.

Read-mode pages use left-aligned prose and copyable prompts, with a centered short hero.
Sticky, horizontally scrollable chapter links sit below the measured header. Mobile tables
remain keyboard-scrollable. Progressive forms use native fieldsets/radios, visible validation,
Back/Start over, and focus management; no modal or fake AI generation.

Use restrained hover/focus feedback, one visible-by-default hero entrance, and reduced-motion
support. Keep `[hidden]` authoritative so layout rules cannot expose inactive controls.

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
entire palette** with light editorial defaults. The table below describes those light defaults;
the portfolio refresh adds a separate dark token set without changing the source brand identity:

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
/                                Homepage — intent shortcuts + guides + sessions + Agent Academy + book + latest feed
/resources/skill-framework.html  Flagship resource #1
/resources/cowork-masterclass.html  Flagship resource #2 (folded in from copilot-cowork-masterclass)
/sessions.html                   Conference sessions and demo-pack index
/resources/vibe-copilot-countdown.html  "I Didn't Know Copilot Could Do That" companion
/resources/vibe-cowork.html      "Delegating Real Work to Copilot Cowork" companion
/resources/ppcc2026-copilot-compass.html  PPCC four-direction framework, PPTX and PDF
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

## Homepage pattern (v6: direct paths)

**v4 removed the three-role "Start Here" pattern entirely** (previously `.start-grid` /
`.start-card`, and before that a v1 "learning map" with a dashed connector line). With only two
flagship resources and a live feed, a role-selection step added a click before a visitor could
reach real content — the opposite of the "land on one useful resource fast" goal.

The homepage remains a direct, linear stack, but v6 adds a compact `.quick-start` strip immediately
after the hero. Its three links are task-based shortcuts, not personas or a new content taxonomy:
build a reliable skill, recreate a live demo, or build an agent. Each goes directly to real content.

The complete order is: hero → quick-start strip → S.K.I.L.L. framework (`.featured`) → Cowork
Masterclass (`.featured--pink`) → conference sessions → Agent Academy callout (`.spotlight`) →
book feature → "Fresh from April" live feed teaser. Free learning and reusable session material
stay ahead of the book promotion.

If a future version reintroduces role- or topic-based framing, do it once there are enough
resources that a flat list stops being the fastest path to a first useful resource (same threshold
noted in "Information architecture" above) — and keep entrances parallel (no implied order, no
connector line/numbering), per the reasoning in `PRODUCT.md`'s v2 framing note.

## Conference sessions (v5)

`sessions.html` is a small index for stage-session companions rather than a return of the old
resource library. Lightweight client-side text search and topic chips are present for future
growth, but JavaScript reveals the toolbar only once the catalog has at least four sessions. Each
session has a real, complete page under `resources/`, and the homepage shows the same session cards.

The session pages use:

- `.session-grid` / `.session-card` for the session index and homepage teaser.
- `[data-session-search]` / `[data-session-filter]` for catalog search and topic filtering.
- `.book-feature` for the homepage book promotion, including a local cover image and retailer links.
- `.demo-grid` / `.demo-card` for the numbered live-demo sequence.
- `.demo-runbook` / `.demo-step` for detailed flows, `.reference-files` for per-demo downloads,
  and `.prompt-block` for copyable prompts.
- A lightweight ZIP under `assets/downloads/` containing only the skills, sample files, synthetic
  demo data, and fallback artifacts referenced by the runbook. Prompts remain copyable on the page.
- Optimized PowerPoint decks under `assets/downloads/` for direct download.
- GitHub Release assets for MP4 recordings that exceed GitHub's normal 100 MB file limit.
  Recordings must be privacy-reviewed and sanitized before
  `scripts/publish-vibe-release-assets.sh` publishes them without putting them in repository
  history.

Session companions use a centered content column with left-aligned body text, runbook steps,
reference files, and prompts. Short hero headings remain centered. Every session identifies its source
event and date near the title. Link event names to confirmed event URLs; omit links rather than
guessing when a URL hasn't been supplied.

**Speaking calendar:** `index.html#events` uses dated HTML cards as its source. Its progressive
enhancement in `assets/js/speaking-calendar.js` supplies upcoming/past/all filters, an inclusive
"Happening now" status, and date-based ordering. Appearances and online/onsite participation come
from April's confirmed list. Organizer pages supply verified links, cities, and official event
dates; Scottish Summit retains the specific workshop day rather than the whole conference.
Without JavaScript, the complete dated list stays visible. New calendar styles use the shared
theme tokens and native buttons, with live result counts and `aria-pressed` filter state.

The companion map uses a local public-domain Natural Earth land outline, not an external map
service. `assets/js/speaking-map.js` groups the visible HTML cards by city after the calendar's
`speaking-calendar:render` event, preserving a single source for dates, ordering, and status.
North America/Europe views only change the map, not the event-list filter. Selecting a city
shows its matching events with links to the list; it doesn't hide unrelated cards.
Every visual pin has an equivalent native city button with status text and a large touch target.
The map is decorative to screen readers; city controls and details provide its information.
City-level coordinates avoid suggesting precise venue directions, unverified travel routes, or
physical attendance at an online appearance. Empty regional views and loading errors have
explicit messages; no JavaScript or a failed map request leaves the dated list usable.

**TechCon365 Dallas update (November 2026):** `resources/vibe-cowork.html` retains its URL while
leading with the Dallas deck and six Q4-launch demos. The provided PDF and cover are local;
owner-reviewed recordings use the separate `techcon365-dallas-cowork-assets` GitHub Release.
`.demo-video` provides responsive native playback with local posters, no autoplay, and no
preloading. Each recording has a direct open/download link and a written prompt and walkthrough.
The earlier Vibe runbook stays in `.session-archive`, with its original anchors and downloads.
Do not conflate its Analog Fest sample pack with the Dallas scenario or present session-era
availability and illustrative costs as current guarantees.

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
- **`.spotlight`** (v4, added for the Agent Academy callout) is a compact blue-gradient callout
  using `--color-blue-light` / `--color-blue-border`. It pairs the CTA with the Agent Academy
  Recruit artwork, but remains visually lighter and smaller than the full `.featured` resources.

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
- Video: the keyless YouTube channel Atom feed, with a fallback parser for April's public `/videos`
  page when the Atom endpoint is unavailable.

### Pipeline

```
.github/workflows/fetch-feeds.yml   Daily cron (+ manual dispatch) →
scripts/fetch-feeds.mjs             fetches both feeds, parses via regex (no deps), writes →
assets/data/blog-posts.json         ← capped at 6 items, decoded entities, boilerplate stripped
assets/data/youtube-videos.json     ← capped at 6 substantial videos, Shorts/promos filtered
                                     Workflow commits changed JSON to main, which triggers the
                                     existing deploy.yml (it runs on every push to main) →
assets/js/feeds.js                  Client runtime: reads [data-feed="videos"/"posts"] containers,
                                     fetches the matching JSON same-origin, renders cards.
```

`scripts/fetch-feeds.mjs` has no npm dependencies and uses global `fetch`, matching the rest of the
site's zero-build-step convention. It parses RSS and Atom XML with regex and can parse YouTube's
public `lockupViewModel` records as a fallback. It decodes entities, normalizes missing excerpt
spaces, strips WordPress boilerplate, truncates excerpts to 180 characters, and filters Shorts and
obvious "coming up" promos. If both sources for a feed fail, its existing JSON remains untouched
instead of being overwritten with empty data, and the script exits non-zero.

`assets/js/feeds.js` is a small reusable renderer, not a page-specific script: any container with
`data-feed="videos"` or `data-feed="posts"` gets populated from the matching JSON file, optionally
capped with `data-feed-limit="N"` (used for the homepage's 3-item teaser vs. `updates.html`'s full
6-item grids), and any element with `data-feed-updated="videos"/"posts"` gets a "Last synced &lt;date&gt;"
note. Loading, empty, error, and stale states are explicit; a feed older than three days is labeled
as potentially delayed rather than silently presented as current.

**`.update-card` CSS** (in `style.css`, alongside the other card components) follows the existing
accent convention: blue for videos, `.update-card--post` (pink) for blog posts — matching
`.featured` / `.featured--pink`'s existing blue=primary/pink=secondary pattern. All colors reference
existing `--color-*` tokens; no new hex values were introduced for this feature.

### Known limitation: automatically filtered channel uploads

No verified curated playlist ID/URL was available at build time, so the feed uses April's channel
uploads and automatically removes Shorts and obvious promotional announcements. That produces a
more useful long-form feed, but it is still heuristic rather than hand-curated. Reconfigure it when
a verified playlist exists:

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
