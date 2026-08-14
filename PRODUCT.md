# PRODUCT.md

Confirmed product truth for **AI with April**. This document is written before any visual
implementation and is the source of truth for scope decisions. Nothing below is aspirational or
invented — every claim here was confirmed before build.

## What this is

- **Product name:** AI with April
- **Repository slug:** `ai-with-april`
- **What it is:** a public, GitHub Pages–hosted web learning hub under April Dunnam's GitHub
  account.
- **Owner/voice:** April Dunnam — Principal Cloud Advocate at Microsoft. The site speaks in her
  direct, practical, human teaching voice. It is not a faceless product marketing site.

## Who it's for

Primary audience is a broad mix, addressed with distinct entrances rather than one generic
funnel:

1. **Curious professionals** — new to AI, want it to make sense for their actual job.
2. **Microsoft makers / low-code developers** — building with Copilot Studio, Power Platform,
   Cowork.
3. **Technical builders** — want the mechanics: agents, skills, prompting, architecture.

## First-time success criteria

Within **one minute** of landing on the site, a visitor should be able to:

1. Recognize which of the three roles fits them (or opt straight into browsing by topic instead).
2. Pick that entry point.
3. Land on and start one genuinely useful resource — not another menu.

This is the primary usability bar for the homepage. If a visitor is still deciding where to click
after a minute, the homepage has failed.

**v2 note on framing:** v1 rendered the three role entrances as literal "stops" on a dashed
connector line (a "learning map/journey" metaphor implying sequence). On review, that implied an
order that doesn't exist — a visitor is exactly one of the three, not progressing through all
three. v2 keeps the same three entrances and the same one-click-to-a-real-resource guarantee, but
presents them as parallel "Start here" options with no implied order, alongside an equally visible
"browse by topic instead" alternative for visitors who don't want to self-identify by role.

## Purpose

Approachable, practical AI education that makes the following make sense for real work:

- AI generally (concepts, not hype)
- Microsoft Copilot (M365 Copilot)
- Copilot Studio
- Copilot Cowork
- Power Platform
- Related tools in that ecosystem (agents, skills, prompting)

The tone is practical over theoretical: "here's what to actually do," not "here's what's possible
someday."

## Brand reference

- **Reference site:** [aprildunnam.com](https://aprildunnam.com) — "Making Microsoft AI make
  sense." Principal Cloud Advocate, Microsoft. 10+ years on SharePoint, M365, and Power Platform.
- **Preserve:** April's direct, practical, human teaching voice; confident sans-serif typography; a
  recognizable personal presence (not an anonymous brand).
- **Palette (confirmed v2):** a light, editorial pink/blue system — white/light-gray surfaces, dark
  ink body text, blue (`#29ABE2` family, text-safe `#185FA5`) as the primary/structural accent, and
  pink (`#E8327A` family, text-safe `#993556`) as the secondary/interactive accent. Sourced from
  April's own attached brand palette and confirmed against the Cowork Masterclass's existing
  `cheat-sheet.html`, which already uses this exact pink as its accent color — this is April's real,
  already-in-use brand system, not a hypothetical. Superseded an earlier dark/navy hero direction
  from v1, which had been inferred from one slide deck's styling rather than confirmed brand truth.
- **Do not copy:** the WordPress/Astra site structure, layout, or theme. This is a new build with
  its own information architecture, purpose-built for a learning hub rather than a personal blog.

## Launch proof points

Two rich, first-class resource pages anchor the launch — proof that this hub delivers substance,
not a bare file download:

- **The S.K.I.L.L. framework** — five rules for writing agent skills that actually fire, plus
  working examples. Supporting assets: a working slide deck (`Skills-Explained-Deck.pptx`) and a
  diagram (`skill-framework.png`), sourced from April's existing material.
- **Copilot Cowork Masterclass** — the full lab manual for Copilot Cowork: a copy-paste prompt
  bank, 7 hands-on labs and challenges, a skills starter kit, and a printable cheat sheet, plus the
  original slide deck. Folded in from April's `copilot-cowork-masterclass` repository so the
  content has one public home instead of living in a second repo.


## Non-fabrication rules (hard constraints)

- No testimonials that were not provided.
- No usage numbers, subscriber counts, or traffic stats.
- No partner or customer claims.
- No publication/founding dates that were not confirmed.
- Future resources may be listed as placeholders **only when honestly labeled** (e.g. "Coming
  soon") — never presented as available when they are not.

## Scope for v3

In scope (this update):

- A new **"Watch & read"** page (`updates.html`) plus a "Fresh from April" teaser on the homepage,
  showing April's real, live YouTube uploads and blog posts — refreshed automatically once a day by
  a scheduled GitHub Action, with zero API keys and zero backend (a Node script reads April's public
  WordPress RSS feed and YouTube's public Atom feed, both keyless, and commits the result as static
  JSON that the deployed site fetches same-origin).
- This is explicitly **not** the curated resource library. It is labeled "a live feed, not part of
  the curated resource library" everywhere it appears, so visitors don't mistake unreviewed,
  shorter-lived content for the hub's reviewed role/topic taxonomy.

**Known limitation, flagged rather than hidden:** the user asked for "a playlist I curate," implying
a specific hand-picked YouTube playlist. No playlist ID/URL was available at build time, so this
ships against April's full channel-uploads feed instead — real, verifiable content, not fabricated,
but broader than a curated playlist would be (it includes shorts, promos, and announcements
alongside long-form videos). `scripts/fetch-feeds.mjs` documents, at the top of the file, the
one-line change (swap `YOUTUBE_FEED_URL` to a `playlist_id=` URL) needed to point this at a specific
playlist once one is supplied.

Non-fabrication rule applied here: every video/post title, date, and thumbnail shown is pulled
verbatim from April's real feeds — none of it is invented, curated-sounding copy, or backfilled.

## Scope for v2

In scope (this update):

- Fold the `copilot-cowork-masterclass` repository's content into this hub as a second flagship
  resource page, so April maintains one public repo instead of two.
- Reframe the homepage's role entrances away from the "learning map/journey" sequential metaphor
  toward parallel "Start here" options, plus a topic-browse alternative (see First-time success
  criteria above).
- Re-theme the site to April's confirmed light pink/blue brand palette (see Brand reference above),
  replacing v1's inferred dark/navy direction.

Out of scope for v2 (explicitly deferred, not silently dropped):

- Copying the Cowork Masterclass's fictional "Northwind Traders" sample exercise data files onto
  the public site — they're private-tenant hands-on lab fixtures with no standalone public value;
  the labs that reference them explain what each file is for instead.
- A dedicated per-role landing page tree — still deferred per the flat information architecture in
  `DESIGN.md`.

## Scope for v1 launch (original)

In scope:

- Homepage as a distinctive learning map (not a generic SaaS hero + card grid).
- Three role-based entrances, immediately visible, each leading to a real, useful resource within
  one click.
- A resource library with working client-side filter/search (no backend).
- A full S.K.I.L.L. framework resource page/section.
- Clear topic taxonomy.
- Responsive layouts, keyboard accessibility, `prefers-reduced-motion` support.
- Metadata/Open Graph tags, custom 404 page.
- GitHub Pages deployment via GitHub Actions at `/ai-with-april/`.

Out of scope for v1 (explicitly deferred, not silently dropped):

- Backend services, newsletter capture, comments, analytics dashboards.
- A build pipeline / static site generator — plain HTML/CSS/JS is the deliberate choice for
  minimal maintenance burden.
- Additional resources beyond the S.K.I.L.L. framework — represented honestly as "Coming soon"
  placeholders in the taxonomy, not invented content.
