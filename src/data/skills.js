// Skill tree, shown as an RPG character sheet. Levels are self-rated 1 to 5.
// `abbr` is the ability-score label. `quests` lists project ids (src/data/projects.js) that show the skill in use;
// only list projects whose write-up actually backs the skill.
export const skillTree = [
  {
    id: "ai-builder",
    abbr: "AI",
    class: "AI Builder",
    icon: "🤖",
    color: "#7f5af0", // purple
    skills: [
      { name: "AI Agents", level: 4, description: "Design agents that act, not just chat: tool use, memory, and agent-to-agent protocols. Certified in Agentic AI, Agent Memory, and A2A.", quests: ["amadeus", "job-search-automation"] },
      { name: "LLM APIs", level: 4, description: "Wire LLMs into real products through APIs and serverless backends, like the Claude-powered VI on this site.", quests: ["job-search-automation"] },
      { name: "Prompting", level: 5, description: "Write precise instructions and system prompts that get consistent, grounded outputs from AI systems.", quests: ["job-search-automation"] },
      { name: "Automation", level: 5, description: "Turn repeatable manual work into scripts and workflows that run the same way every time.", quests: ["pci-qa-automation", "job-search-automation", "amadeus"] },
      { name: "Spec-Driven", level: 4, description: "Drive coding agents from clear specs and tests so AI-built code stays reviewable. Certified in Spec-Driven Development.", quests: [] },
    ],
  },
  {
    id: "data-migration",
    abbr: "DATA",
    class: "Data Migration & QA",
    icon: "🗄️",
    color: "#f7c948", // yellow
    skills: [
      { name: "Reconciliation", level: 5, description: "Make a system of record, a file share, and a tracker agree, and explain every count that does not.", quests: ["pci-qa-automation"] },
      { name: "PowerShell", level: 4, description: "Scripted inventories, reconciliation, and bulk rename and move with dry runs and rollback.", quests: ["pci-qa-automation"] },
      { name: "Excel/VBA", level: 4, description: "Automate shared trackers safely: dedupe across tabs, status fixes, and audit-friendly edits.", quests: ["pci-qa-automation"] },
      { name: "Validation", level: 4, description: "Check data before and after every change so migrations are provable, not assumed.", quests: ["pci-qa-automation"] },
      { name: "GMP Integrity", level: 4, description: "Work inside regulated quality systems where every change must be traceable and defensible.", quests: ["pci-qa-automation"] },
    ],
  },
  {
    id: "frontend-dev",
    abbr: "DEV",
    class: "Full-Stack Developer",
    icon: "💻",
    color: "#ff4757", // red
    skills: [
      { name: "React", level: 5, description: "Build real UIs with state, routing, data loading, and component-driven structure.", quests: ["joint-theatrical-ventures"] },
      { name: "HTML/CSS", level: 5, description: "Strong layout fundamentals, responsive design, and clean styling for production UI.", quests: ["joint-theatrical-ventures"] },
      { name: "JS/Python", level: 4, description: "JavaScript for UI and serverless logic, Python for automation, bots, and API integrations.", quests: ["joint-theatrical-ventures", "amadeus"] },
      { name: "GitHub", level: 4, description: "Repo workflows, PRs, release discipline, and coordination across collaborators.", quests: ["amadeus", "joint-theatrical-ventures"] },
      { name: "Cloud", level: 4, description: "Deploy serverless backends: AWS (S3, CloudFront, API Gateway, Lambda) and Cloudflare Workers.", quests: ["joint-theatrical-ventures"] },
    ],
  },
  {
    id: "project-strategist",
    abbr: "PLAN",
    class: "Project Strategist",
    icon: "📋",
    color: "#4a9eff", // blue
    skills: [
      { name: "Roadmaps", level: 5, description: "Turn messy ideas into clear milestones, priorities, and delivery plans. Strong bias toward shipping.", quests: ["joint-theatrical-ventures", "tower-of-greed"] },
      { name: "Stakeholders", level: 5, description: "Align goals with stakeholders, communicate tradeoffs, and keep projects moving without chaos.", quests: ["joint-theatrical-ventures", "goalee"] },
      { name: "Scheduling", level: 4, description: "Build realistic timelines, coordinate dependencies, and maintain momentum across moving parts.", quests: ["tower-of-greed"] },
      { name: "Budgeting", level: 4, description: "Track constraints, scope, and resourcing to deliver within time and budget limits. Google Project Management certified.", quests: ["goalee"] },
      { name: "Execution", level: 5, description: "High-velocity shipping mindset: plan, build, test, iterate, deliver.", quests: ["joint-theatrical-ventures", "job-search-automation"] },
    ],
  },
  {
    id: "ux-designer",
    abbr: "UX",
    class: "UX Designer",
    icon: "🎨",
    color: "#00ff88", // green
    skills: [
      { name: "Research", level: 4, description: "Translate user needs into actionable product decisions through interviews, testing, and synthesis.", quests: ["axle", "volleyball"] },
      { name: "Figma", level: 5, description: "Rapid prototyping, UI layouts, components, and iteration loops that lead to build-ready designs.", quests: ["goalee", "tritongoplus", "axle"] },
      { name: "IA", level: 4, description: "Structure navigation and content flows so the product feels obvious and fast to use.", quests: ["axle", "joint-theatrical-ventures"] },
      { name: "Stats", level: 4, description: "Statistical reasoning and SPSS to validate assumptions and support decisions.", quests: [] },
      { name: "Accessibility", level: 4, description: "Design with inclusive defaults: contrast, hierarchy, clarity, and usable interaction patterns.", quests: [] },
    ],
  },
];
