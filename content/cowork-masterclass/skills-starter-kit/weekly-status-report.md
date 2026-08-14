---
name: weekly-status-report
description: Use when I say "run my weekly status" or "Friday wrap-up". Compiles a project status from the status data and recent emails into our standard one-page format.
---

# Weekly Status Report

## When to use
Trigger on: "run my weekly status", "weekly status", "Friday wrap-up".

## Steps
1. Read the latest project status data (CSV or the project list).
2. Pull project emails from the last 7 days for new risks or blockers.
3. Produce the one-page status below.

## Output format
**[Project] — Weekly Status (week of <date>)**
- **Overall:** On Track / At Risk / Blocked
- **Done this week:** 3 bullets
- **Up next:** 3 bullets
- **Risks / blockers:** owner + mitigation
- **Decisions needed:** who + by when

## Rules
- Use only these labels: On Track, At Risk, Blocked, Complete, Not Started.
- If any milestone is Blocked, put ⚠ at the top and list the blocker first.
- Never invent numbers — if data is missing, say "data not available."
