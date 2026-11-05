# AI with April

Approachable, practical AI learning paths and resources from April Dunnam — live at
**[aprildunnam.github.io/ai-with-april](https://aprildunnam.github.io/ai-with-april/)**.

A Copilot-first expert portfolio and talk-materials hub showcasing April's practical AI resources: the S.K.I.L.L. framework, the
Copilot Cowork Masterclass, downloadable conference session demo packs, and an auto-synced feed of
her latest videos and blog posts — plus a pointer to Agent Academy for anyone ready to build in
Copilot Studio.

## What's here

- **Homepage** (`index.html`) — April's identity and expertise, a talk finder, selected sessions,
  copyable prompts, playable demos, reusable downloads, speaking dates, Agent Academy,
  latest videos, her book, and speaking contact.
- **The S.K.I.L.L. framework** (`resources/skill-framework.html`) — five rules for writing agent
  skills that actually fire, with a downloadable companion deck.
- **Copilot Cowork Masterclass** (`resources/cowork-masterclass.html`) — the full lab manual for
  Copilot Cowork: a copy-paste prompt bank, 7 hands-on labs and challenges, a skills starter kit,
  and a printable cheat sheet, plus the original slide deck. Folded in from April's
  `copilot-cowork-masterclass` repository so it has one public home.
- **Conference sessions** (`sessions.html`) — detailed companion pages and lightweight demo packs
  for “I Didn't Know Copilot Could Do That,” “Delegating Real Work to Copilot Cowork,” and
  “To MCP or Not to MCP.” The MCP companion (`resources/techcon365-dallas-mcp.html`)
  includes the original 46-slide Dallas PDF and a fundamentals-first guide: the kitchen analogy,
  hosts/clients/servers, a tool-call walkthrough, tools/resources/prompts, local vs remote
  connections, and where MCP fits across Copilot experiences.
  **The Power Apps Builder's Guide for Choosing the Right Path**
  (`resources/techcon365-dallas-power-apps.html`) adds the 53-slide PDF supplied as
  “The Power Apps Spellbook,” plus a framework for choosing app types and AI-assisted authoring paths.
  The Cowork page leads with the TechCon365 Dallas edition: a downloadable PDF, six
  recorded demos, and copyable prompts. The earlier Vibe runbook and files remain in an
  expandable archive on the same page, preserving existing links.
  **The Copilot Compass** (`resources/ppcc2026-copilot-compass.html`) adds April Dunnam and
  Bryan Wofford's Power Platform Community Conference 2026 session: the original 42-slide
  PowerPoint with presenter notes, a PDF export, and the four-direction framework.
- **Watch & read** (`updates.html`) — April's latest YouTube videos and blog posts, synced
  automatically once a day (see below).
- **About** (`about.html`) — who this is from and why it exists.
- **Training** (`training.html`) — a focused team-training inquiry form, linked from the
  homepage and About page, with Formspree submission handling and email notifications.

## Training inquiries

The form posts to April's configured public Formspree endpoint, `https://formspree.io/f/mnpproje`.
The recipient inbox and email notifications are managed in the Formspree dashboard, not in Git.
The endpoint is public by design; no API key or email-service credentials belong in the site.

`assets/js/training-form.js` enhances the native HTML POST with an on-page confirmation,
pending/duplicate-submit protection, a 20-second timeout, and visible errors that retain the
visitor's entries. Without JavaScript, the browser submits directly to Formspree.
Only a successful service response shows the confirmation; it does not prove inbox delivery.
The form includes Formspree's `_gotcha` honeypot and explains which service receives the details.

Before publishing, verify the recipient address and notifications in Formspree, submit a test
inquiry, and confirm its arrival (including checking spam). Configure domain restrictions and
spam protection in Formspree as appropriate. Use an email address you control for delivery
tests; reserved example addresses can be filtered as spam. Keep spam protection enabled.
For non-training inquiries, the existing
`aprildunnam.com/contact/` route remains available.

## Portfolio interactions

- Every page loads `assets/js/theme.js` in the head before styles. The header's Auto/Light/Dark
  selector follows the device by default and stores an explicit preference in
  `ai-with-april-theme`. Blocked storage is reported, not required for changing this page.
- `sessions.html?q=Dallas&topic=copilot&event=techcon365-dallas-2026` is a shareable filtered
  catalog. `assets/js/sessions.js` owns filtering, live counts, resets, and URL restoration;
  without JavaScript all sessions remain visible.
- The homepage talk finder submits to this catalog without requiring JavaScript.
- The homepage **Resources** section follows Presentations. It exposes three actual Cowork
  prompts with the shared copy controls, two native demo players (the second in a disclosure),
  a downloadable meeting-prep `SKILL.md` worked example, and the existing Cowork cheat sheet.
  Prompts and the skill match the masterclass examples. Videos reuse the reviewed Dallas
  Release assets and local posters, with no autoplay or media preloading. Written alternatives
  link to the original walkthroughs. Without JavaScript, prompts remain selectable, download
  links work, and the native players and disclosure remain usable; copy buttons stay hidden.
  Full guides and the Power Apps chooser remain on their existing pages, not duplicated as
  another homepage guide directory.
- The homepage's **Where I'll be** section (`index.html#events`) lists the confirmed 2026
  speaking dates. Edit the HTML cards and their inclusive `data-start` / `data-end` dates
  together; use ISO `YYYY-MM-DD` dates. `assets/js/speaking-calendar.js` derives upcoming,
  happening-now, and past status from the visitor's local date, including multi-day events.
  It refreshes at midnight and when the page becomes visible again. Filters keep upcoming
  dates first and past events newest first. Without JavaScript, all dated cards remain visible.
  Cards link to verified organizer pages or announcements and retain the session-material links.
  Dates follow official event schedules, not personal travel dates; Scottish Summit uses its
  October 2 workshop day. For recurring conferences, verify the year before updating a link:
  Summit NA's 2026 FAQ identifies Nashville even when its homepage promotes the next year.
  Update the static event count when adding or removing cards so the no-JavaScript view stays accurate.
- **Speaking map:** `assets/js/speaking-map.js` reads the same cards, not a second event database.
  Confirmed in-person cards include `data-city`, `data-country`, `data-region` (`north-america`
  or `europe`), and approximate city-center `data-lat` / `data-lon` coordinates. Give each card
  a stable `id` for map-to-list links. Repeated cities must use the same coordinates and region.
  Online participation stays unpinned, including Copilot Collective OC: its organizer lists an
  Irvine venue, but April supplied her own appearance as online.
  The calendar emits `speaking-calendar:render` after each filter/date refresh; the map consumes
  visible cards and their status without duplicating date calculations. City buttons provide
  the same selection as pins, and regional views help separate nearby stops. Empty views and
  map-load failures explain what happened; all event cards remain independent of the map.
  The map makes no requests to external map, tile, tracking, or geocoding services.
  Its local `assets/img/speaking-map-land.svg` is an equirectangular conversion of
  [Natural Earth's 1:110m land data](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson)
  ([public domain](https://www.naturalearthdata.com/about/terms-of-use/)).
  City-level dots are not venue directions or claimed travel routes. Keep the existing shared
  theme tokens; adjust the regional SVG view boxes if adding locations outside the current coverage.
- The Power Apps companion has a three-question progressive guide in
  `assets/js/app-path-guide.js`. Recommendations are a starting point based on the source
  deck, not availability guarantees or production approval. The written framework and PDF
  always remain available.
- `assets/js/main.js` provides responsive navigation, copy controls, keyboard-scrollable
  tables/code, and sticky chapter links on long resource pages.

## Local preview

This is plain HTML/CSS/JS with no build step. Serve the repo root with any static file server and
open it in a browser, for example:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/
```

Because the site is deployed under `/ai-with-april/` on GitHub Pages, internal links use
relative paths (no leading slash) so they work both locally at the root and once deployed to a
subpath. `404.html` is the one exception — GitHub Pages serves it for any unmatched path at any
depth, so its links are rooted at `/ai-with-april/` intentionally.

## Publishing the Vibe recordings

The optimized session decks and lightweight demo ZIPs live in `assets/downloads/`. The larger MP4
demo recordings are published as GitHub Release assets. Publish only reviewed, sanitized copies,
never the original screen recordings:

```bash
scripts/publish-vibe-release-assets.sh /path/to/reviewed-recordings
```

The script creates or updates the `vibe-session-assets` release and uploads every MP4 in the
reviewed directory. The removed Connectors demo is intentionally excluded from the public set.

## TechCon365 Dallas Cowork materials

`resources/vibe-cowork.html` keeps its existing URL but now features the November 2026 Dallas
session. The supplied PDF and its cover image live in `assets/downloads/` and `assets/img/`.
Six owner-reviewed, publicly approved recordings live in the separate
[`techcon365-dallas-cowork-assets` release](https://github.com/aprildunnam/ai-with-april/releases/tag/techcon365-dallas-cowork-assets),
named `Cowork_Demo1.mp4` through `Cowork_Demo6.mp4`. The page uses native video controls,
local posters, `preload="none"`, and direct recording links; MP4s stay out of Git history.
To replace a recording after another privacy review, use `gh release upload
techcon365-dallas-cowork-assets /path/to/reviewed/Cowork_Demo1.mp4 --clobber`.
Do not use the Vibe publishing script to create this release: its title and notes are Vibe-specific.

The Dallas demos use a Q4 launch scenario; its underlying mailbox, workbook, Project files,
and form were not supplied. The retained Vibe/Analog Fest sample pack is explicitly separate,
not advertised as input data for the Dallas recordings. The old `#cowork-demo-1` through
`#cowork-demo-6` anchors remain available in the archive.

## Power Platform Community Conference 2026 materials

`resources/ppcc2026-copilot-compass.html` holds **The Copilot Compass**, presented by
April Dunnam and Bryan Wofford at PPCC, October 26–30, 2026. The supplied 42-slide
`PPCC2026_Compass_v2.pptx` is preserved byte-for-byte as
`assets/downloads/ppcc2026-copilot-compass.pptx`, including its presenter notes.
`assets/downloads/ppcc2026-copilot-compass.pdf` is a slide-only PDF export, and the cover
image is rendered from that export. No demo recordings or sample datasets were supplied.

The guide follows the deck's four directions: sharpen, monitor, delegate, and scale.
It distinguishes the conference session from the book of the same name and flags
the source-era product names, previews, licensing, and billing. The homepage, About
page, speaking calendar, and catalog link to the companion. Use
`sessions.html?event=ppcc-2026` to share the filtered catalog.

## Watch & read: auto-synced videos and blog posts

`updates.html` and the homepage's "Fresh from April" teaser show April's real YouTube uploads and
blog posts, refreshed once a day with no API keys and no backend:

- `.github/workflows/fetch-feeds.yml` runs daily (and on manual dispatch), executing
  `scripts/fetch-feeds.mjs`, which reads April's public WordPress RSS feed and YouTube's public,
  keyless Atom feed, and writes the result to `assets/data/*.json`. Changes are committed straight
  to `main`, which triggers the existing deploy workflow.
- `assets/js/feeds.js` renders that JSON into cards on any page via `data-feed="videos"` /
  `data-feed="posts"` containers.
- **This currently shows April's full channel uploads, not a specific curated playlist** — no
  playlist ID was available at build time. To point it at a real curated playlist instead, change
  `YOUTUBE_FEED_URL` in `scripts/fetch-feeds.mjs` from `channel_id=...` to `playlist_id=...`; no
  other file needs to change. See `DESIGN.md` for the full pipeline diagram.

## Structure

```
index.html                       Homepage — featured resources + Agent Academy callout
resources/skill-framework.html   Full S.K.I.L.L. framework resource page
resources/cowork-masterclass.html Full Copilot Cowork Masterclass resource page
resources/vibe-copilot-countdown.html Copilot countdown session companion
resources/vibe-cowork.html       Copilot Cowork session companion
resources/techcon365-dallas-mcp.html MCP fundamentals, kitchen analogy, usage guide and PDF
resources/techcon365-dallas-power-apps.html Power Apps builder's guide companion and PDF
resources/ppcc2026-copilot-compass.html PPCC Copilot Compass framework, original PPTX and PDF export
sessions.html                    Conference sessions and downloadable demo packs
updates.html                     Watch & read — auto-synced YouTube videos + blog posts
training.html                    Team-training inquiry form (Formspree)
about.html                       About April
404.html                         Custom not-found page
assets/css/style.css             All site styles (design tokens at the top)
assets/js/                       main.js (nav/behavior), feeds.js (Watch & read renderer)
assets/img/                      Site imagery, favicon, OG cover
assets/downloads/                Downloadable companion decks and cheat sheets
assets/data/                     Auto-synced JSON (blog-posts.json, youtube-videos.json) — do not hand-edit, regenerated daily
content/                         Source content kept for reference/attribution
scripts/fetch-feeds.mjs          Feed-sync script (see "Watch & read" above)
scripts/publish-vibe-release-assets.sh Publishes oversized session recordings to a GitHub Release
PRODUCT.md                       Confirmed product scope and non-fabrication rules
DESIGN.md                        Brand tokens, IA, and content conventions
```

## Deployment

Pushes to `main` deploy automatically via `.github/workflows/deploy.yml` using
`actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`. In the
repo's **Settings → Pages**, set the source to **GitHub Actions**.

## License

MIT — see [LICENSE](LICENSE). Skills are an open standard published at
[agentskills.io](https://agentskills.io); the S.K.I.L.L. framework and companion deck are
original material from April Dunnam.
