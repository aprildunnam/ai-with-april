# AI with April

Approachable, practical AI learning paths and resources from April Dunnam — live at
**[aprildunnam.github.io/ai-with-april](https://aprildunnam.github.io/ai-with-april/)**.

A public learning hub showcasing April's practical AI resources: the S.K.I.L.L. framework, the
Copilot Cowork Masterclass, and an auto-synced feed of her latest videos and blog posts — plus a
pointer to Agent Academy for anyone ready to build in Copilot Studio.

## What's here

- **Homepage** (`index.html`) — the two flagship guides front and center, a callout to Agent
  Academy, and a live teaser of the latest videos/posts.
- **The S.K.I.L.L. framework** (`resources/skill-framework.html`) — five rules for writing agent
  skills that actually fire, with a downloadable companion deck.
- **Copilot Cowork Masterclass** (`resources/cowork-masterclass.html`) — the full lab manual for
  Copilot Cowork: a copy-paste prompt bank, 7 hands-on labs and challenges, a skills starter kit,
  and a printable cheat sheet, plus the original slide deck. Folded in from April's
  `copilot-cowork-masterclass` repository so it has one public home.
- **Watch & read** (`updates.html`) — April's latest YouTube videos and blog posts, synced
  automatically once a day (see below).
- **About** (`about.html`) — who this is from and why it exists.

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
updates.html                     Watch & read — auto-synced YouTube videos + blog posts
about.html                       About April
404.html                         Custom not-found page
assets/css/style.css             All site styles (design tokens at the top)
assets/js/                       main.js (nav/behavior), feeds.js (Watch & read renderer)
assets/img/                      Site imagery, favicon, OG cover
assets/downloads/                Downloadable companion decks and cheat sheets
assets/data/                     Auto-synced JSON (blog-posts.json, youtube-videos.json) — do not hand-edit, regenerated daily
content/                         Source content kept for reference/attribution
scripts/fetch-feeds.mjs          Feed-sync script (see "Watch & read" above)
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
