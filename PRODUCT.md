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

1. Recognize which of the three roles fits them.
2. Pick that role-based path.
3. Land on and start one genuinely useful resource — not another menu.

This is the primary usability bar for the homepage. If a visitor is still deciding where to click
after a minute, the homepage has failed.

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
- **Preserve:** April's direct, practical, human teaching voice; confident sans-serif typography;
  dark/navy hero energy; blue brand family (`#046bd2` / `#045cb4` primary blues, `#1e293b` /
  `#334155` slate); a recognizable personal presence (not an anonymous brand).
- **Do not copy:** the WordPress/Astra site structure, layout, or theme. This is a new build with
  its own information architecture, purpose-built for a learning hub rather than a personal blog.

## Launch proof point

The **S.K.I.L.L. framework** (five rules for writing agent skills that actually fire, plus working
examples) is the first real resource and the proof that this hub delivers substance. It must be
integrated as a **rich, first-class resource page** — not a bare file download. Supporting assets:
a working slide deck (`Skills-Explained-Deck.pptx`) and a diagram (`skill-framework.png`), both
sourced from April's existing material.

## Non-fabrication rules (hard constraints)

- No testimonials that were not provided.
- No usage numbers, subscriber counts, or traffic stats.
- No partner or customer claims.
- No publication/founding dates that were not confirmed.
- Future resources may be listed as placeholders **only when honestly labeled** (e.g. "Coming
  soon") — never presented as available when they are not.

## Scope for v1 launch

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
