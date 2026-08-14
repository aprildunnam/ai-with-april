# Build it to S.K.I.L.L.

Five rules for writing agent skills that actually fire, plus working examples.

![The S.K.I.L.L. framework](assets/skill-framework.png)

Most skills that "don't work" never actually ran. The agent reads only your `name` and
`description` before deciding whether to open the file, so a perfect 4,000 word body is invisible
if the description never matches.

These five rules are what I use to avoid that.

---

## The framework

### S — Scope it to one job

One skill, one procedure. If it does two things, it is two skills.

If you cannot describe what your skill does in one sentence without using "and", split it.

### K — Keywords in the description

The description is the only part read before the skill opens. Load it with the words a real person
would type, not the tidy internal name for the process.

```yaml
# Never fires
description: QBR helper

# Fires reliably
description: Use when the user asks for a QBR, quarterly business review, client review deck,
  or quarterly account summary. Also use when preparing materials for a scheduled client review.
```

Third person. Start with "Use when". One to three sentences, under about 500 characters. If your
team says QBR, the client says business review, and the CRM says quarterly touchpoint, all three go
in.

### I — Instructions, not explanations

Write a runbook, not an essay. The agent is not being persuaded, it is being told.

Count the hedges in your draft. Every "generally", "usually", "depending on context", and "use your
judgment" is a decision you pushed back onto the model.

### L — Lean body

Under about 500 lines, roughly 5,000 tokens. The whole body loads when the skill activates.

Anything longer goes in a subfolder:

| Folder | The question | What goes there |
|---|---|---|
| `references/` | Is this background it might look up? | Policies, playbooks, style guides, thresholds |
| `assets/` | Is this something it builds the output FROM? | Templates, boilerplate, layouts |
| `scripts/` | Does this need the same answer every time? | Math, validation, parsing |

**Cheap to have, expensive to load.** Bias toward the subfolders.

### L — Live test and iterate

Skills are rarely one and done. Install it, use it on real work, and fix what comes back.

**Test the trigger before you test the output.** Ask for the thing five different ways and confirm
the skill actually activates each time. Half of all skill debugging is discovering it never fired
at all, and you can burn an hour rewriting a body that nothing ever opened.

Once it fires reliably, the loop is: run it on something real, notice where the output drifts from
what you wanted, and add the rule that closes that gap. Most good skills get their sharpest lines
from a run that went slightly wrong.

Expect to iterate whenever the process itself changes, when someone phrases the request a way you
did not anticipate, or when a new edge case shows up. A skill is a living document, not a
deliverable you finish.

---

## The one that isn't a letter

**The folder name must exactly match the `name` in your frontmatter.** Kebab-case, lowercase,
hyphens, max 64 characters.

If they differ, some runtimes skip the skill silently. No error, no warning, nothing in the logs.

---

## What's actually in a skill

![Skill anatomy](assets/skill-anatomy.png)

Only `SKILL.md` is required. The other three folders are optional and they are where the leverage
is.

The thing worth knowing about `scripts/`: when the agent runs a bundled script, the script's code
never enters the context window. Only its output does. A 200 line validator costs you the eight
lines it prints.

---

## How much do you actually need?

![The four levels](assets/skill-ladder.png)

Start at level 1. Climb only when the job forces you to. Most skills never leave level 1, and that
is not a failure, that is the point.

Every rung you add is something else to maintain. A 500 line reference doc that nobody updates is
worse than no reference doc, because now the agent is confidently following a stale policy.

You can also skip rungs. A level 1 skill with a single script bolted on is completely fine.

---

## Examples

Working skills you can copy. Start with **[before-and-after](examples/before-and-after/)**, which
is the same job written twice with a rule-by-rule breakdown of what changed.

| Example | Level | Demonstrates |
|---|---|---|
| [weekly-status-email](examples/before-and-after/weekly-status-email/) | 1 | A complete skill in 43 lines |
| [meeting-notes-to-actions](examples/meeting-notes-to-actions/) | 1 | Tight scope, and what it refuses to do |
| [contract-review](examples/contract-review/) | 2 | `references/` doing real work |
| [bad-weekly-report](examples/before-and-after/bad-weekly-report/) | — | Breaks all five rules on purpose |

---

## Where skills run

Skills are an open standard. The format came out of Anthropic and is published at
[agentskills.io](https://agentskills.io).

The same folder runs unchanged in Microsoft 365 Copilot, Copilot Studio, Copilot Cowork, Copilot in
the Office apps, SharePoint, GitHub Copilot, VS Code, Claude, Cursor, and 20-odd other agents.

What differs between them is **scope**, and that is the part worth knowing:

| Surface | Scope |
|---|---|
| Copilot Cowork, Copilot in Excel | Personal |
| Copilot in SharePoint | Site |
| Copilot Studio | Agent |
| Dataverse business skills | Organization |
| GitHub Copilot, VS Code | Repo or personal |

Exact paths and limits move. Check current docs.

---

## A note on security

A skill is a dependency. Treat it like one.

Skill instructions go straight into the agent's context, and skills can carry executable code. So
before you install someone else's: read the `SKILL.md`, read the scripts, confirm the script does
what its name claims, and watch for typosquatted names.

---

## Using these graphics

Everything in `assets/` is available as SVG and PNG. Free to use with attribution.

| File | Use |
|---|---|
| `skill-framework.svg` / `.png` | The five rules |
| `skill-anatomy.svg` / `.png` | What is in a skill folder |
| `skill-ladder.svg` / `.png` | The four levels |

---

## License

MIT. Take it, change it, ship it.
