/**
 * AI with April — resource library data.
 *
 * This is the single source of truth for every resource shown on
 * resources.html and referenced from the homepage. To add a resource,
 * add an object here — no other file needs to change.
 *
 * status: "available" | "coming-soon"
 *   "coming-soon" resources are rendered honestly as not-yet-available and
 *   are not linked anywhere. Never mark something "available" that isn't.
 */
window.AI_WITH_APRIL_RESOURCES = [
  {
    id: "skill-framework",
    title: "The S.K.I.L.L. Framework",
    description:
      "Five rules for writing agent skills that actually fire, plus working examples. The launch resource for this hub — read it as a guide or work through the companion slide deck.",
    url: "resources/skill-framework.html",
    roles: ["professional", "maker", "builder"],
    topics: ["prompting-skills", "agents-copilot"],
    formats: ["guide", "deck"],
    status: "available",
    featured: true
  },
  {
    id: "copilot-studio-quickstart",
    title: "Copilot Studio Quickstart",
    description:
      "A first-agent walkthrough for Copilot Studio: topics, triggers, and when to reach for a skill instead of a giant instruction block.",
    roles: ["maker", "builder"],
    topics: ["copilot-studio"],
    formats: ["guide"],
    status: "coming-soon"
  },
  {
    id: "power-platform-for-makers",
    title: "Power Platform for Makers",
    description:
      "Where Power Automate, Power Apps, and Copilot Studio actually meet — and how to pick the right one for a given problem.",
    roles: ["maker"],
    topics: ["power-platform"],
    formats: ["guide"],
    status: "coming-soon"
  },
  {
    id: "prompting-basics",
    title: "Prompting Basics for Real Work",
    description:
      "The handful of prompting habits that matter for day-to-day tasks, without the theory you don't need yet.",
    roles: ["professional"],
    topics: ["ai-fundamentals", "prompting-skills"],
    formats: ["guide"],
    status: "coming-soon"
  },
  {
    id: "cowork-field-guide",
    title: "Cowork Field Guide",
    description:
      "How Copilot Cowork fits into a real workday: personal skills, delegation, and what to hand off versus keep.",
    roles: ["professional", "maker"],
    topics: ["cowork"],
    formats: ["guide"],
    status: "coming-soon"
  },
  {
    id: "agent-architecture-deep-dive",
    title: "Agents & Copilot Architecture Deep Dive",
    description:
      "Instructions, knowledge, tools, and skills as four distinct boxes — and how to decide which one a given problem belongs in.",
    roles: ["builder"],
    topics: ["agents-copilot"],
    formats: ["guide"],
    status: "coming-soon"
  }
];

/** Human-readable labels kept alongside the data so every page stays in sync. */
window.AI_WITH_APRIL_TAXONOMY = {
  roles: {
    professional: "Curious Professional",
    maker: "Microsoft Maker",
    builder: "Technical Builder"
  },
  topics: {
    "ai-fundamentals": "AI Fundamentals",
    "agents-copilot": "Agents & Copilot",
    "copilot-studio": "Copilot Studio",
    "power-platform": "Power Platform",
    cowork: "Cowork",
    "prompting-skills": "Prompting & Skills"
  },
  formats: {
    guide: "Guide",
    deck: "Slide deck"
  }
};
