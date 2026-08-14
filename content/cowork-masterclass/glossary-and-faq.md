# Glossary & FAQ

## Glossary
- **Copilot Cowork** — Your AI *coworker* in Microsoft 365. You delegate a multi-step outcome in plain language; it plans and takes action across your apps.
- **M365 Copilot** — In-the-flow AI help inside Word, Excel, Outlook, Teams. Great for a single step, right now.
- **Microsoft Scout** — An always-on personal agent that works proactively in the background — no prompt each time.
- **Skill** — A saved, reusable playbook (plain-language instructions) Cowork loads on demand so you stop re-prompting.
- **Plugin** — An installable package (one `.zip`) that adds domain skills plus live data connectors, deployed and governed by your admin.
- **MCP (Model Context Protocol)** — The open "USB-C for AI" standard that lets plugins connect Cowork to live data and APIs.
- **Auto** — The default setting that picks the best model per task, balancing quality, speed, and cost.
- **Credits** — Usage-based Copilot Credits (~$0.01 each) that Cowork consumes per task, on top of your Copilot license. Heavier models cost more.
- **Scheduled task** — A recurring automation ("every Friday at 4pm…") Cowork runs on your behalf.
- **Browser Use** — Cowork driving Microsoft Edge to complete web tasks, handing you the tab for logins, MFA, or CAPTCHAs.
- **Work IQ** — Cowork's grounding in your Microsoft Graph (people, files, meetings, org) for more accurate, context-aware results.

## FAQ

**Do I need to be technical?**
No. It's natural language — if you can describe what you need to a colleague, you can use Cowork.

**Is my data safe? What about my permissions?**
Cowork works within your existing Microsoft 365 boundary and honors the permissions you already have — nothing more. It runs under your organization's identity, DLP, and compliance policies. See the [admin & governance docs](https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-admin-governance) and the [FAQ](https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-faq).

**What does it cost?**
Cowork adds pay-as-you-go **Copilot Credits** (~$0.01 each) on top of your Copilot license. The same task can cost very differently by model — start on **Auto**, use a lighter model to save, and type `/cost` to see spend. Turn repeat work into a **Skill** to cut credits.

**Which model should I use?**
Start on **Auto**. Use a lighter model (e.g. Claude Sonnet) for everyday, high-volume work; reach for a heavier model only when the stakes justify the extra credits.

**Where do the files it creates go?**
**OneDrive ▸ Documents ▸ Cowork.** You can always ask "where did you save that?"

**Does it take actions without asking?**
It previews actions and asks you to approve before it sends, posts, or schedules. You stay in control.

**When should I use Cowork vs. M365 Copilot vs. Scout?**
- **M365 Copilot** — a quick answer or edit, in the flow.
- **Cowork** — a whole multi-step job you delegate.
- **Scout** — ongoing, proactive help that comes to you.
(Team-scale automation for many people is **Copilot Studio** / **Power Automate** — a different layer.)

**How do I get Browser Use?**
It's admin-enabled in Microsoft Edge. If you don't see it, ask your IT admin (point them to the governance docs).
