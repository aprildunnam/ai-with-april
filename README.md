# AI with April

Approachable, practical AI learning paths and resources from April Dunnam — live at
**[aprildunnam.github.io/ai-with-april](https://aprildunnam.github.io/ai-with-april/)**.

A public learning hub for three kinds of visitors: curious professionals new to AI, Microsoft
makers/low-code developers, and technical builders. The homepage is a role-based learning map,
not a generic hero-plus-card-grid — pick your path and land on one useful resource in under a
minute.

## What's here

- **Homepage** (`index.html`) — the learning map: three role-based entrances plus the featured
  launch resource and topic taxonomy.
- **Resource library** (`resources.html`) — every resource, with client-side search and
  role/topic filtering. No backend; data lives in `assets/js/resources-data.js`.
- **The S.K.I.L.L. framework** (`resources/skill-framework.html`) — the first full resource: five
  rules for writing agent skills that actually fire, with a downloadable companion deck.
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

## Adding a resource

Add an entry to the `window.AI_WITH_APRIL_RESOURCES` array in
`assets/js/resources-data.js` — no other file needs to change for it to show up in the library
with working search/filter. Mark anything not yet written as `status: "coming-soon"`; those
entries render as honestly labeled and are not linked anywhere.

## Structure

```
index.html                       Homepage / learning map
resources.html                   Filterable resource library
resources/skill-framework.html   Full S.K.I.L.L. framework resource page
about.html                       About April
404.html                         Custom not-found page
assets/css/style.css             All site styles (design tokens at the top)
assets/js/                       main.js (nav/behavior), resources-data.js, resources.js (filter/search)
assets/img/                      Site imagery, favicon, OG cover
assets/downloads/                Downloadable companion deck
content/                         Source content kept for reference/attribution
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
