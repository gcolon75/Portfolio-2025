// Skill tree. Levels are self-rated 1 to 5. Keep 5 skills per class: the SkillTree layout is tuned to it.
export const skillTree = [
  {
    id: "ai-builder",
    class: "AI Builder",
    icon: "🤖",
    color: "#7f5af0", // purple
    skills: [
      { name: "AI Agents", level: 4, description: "Design agents that act, not just chat: tool use, memory, and agent-to-agent protocols. Certified in Agentic AI, Agent Memory, and A2A." },
      { name: "LLM APIs", level: 4, description: "Wire LLMs into real products through APIs and serverless backends, like the Claude-powered VI on this site." },
      { name: "Prompting", level: 5, description: "Write precise instructions and system prompts that get consistent, grounded outputs from AI systems." },
      { name: "Automation", level: 5, description: "Turn repeatable manual work into scripts and workflows that run the same way every time." },
      { name: "Spec-Driven", level: 4, description: "Drive coding agents from clear specs and tests so AI-built code stays reviewable. Certified in Spec-Driven Development." },
    ],
  },
  {
    id: "data-migration",
    class: "Data Migration & QA",
    icon: "🗄️",
    color: "#f7c948", // yellow
    skills: [
      { name: "Reconciliation", level: 5, description: "Make a system of record, a file share, and a tracker agree, and explain every count that does not." },
      { name: "PowerShell", level: 4, description: "Scripted inventories, reconciliation, and bulk rename and move with dry runs and rollback." },
      { name: "Excel/VBA", level: 4, description: "Automate shared trackers safely: dedupe across tabs, status fixes, and audit-friendly edits." },
      { name: "Validation", level: 4, description: "Check data before and after every change so migrations are provable, not assumed." },
      { name: "GMP Integrity", level: 4, description: "Work inside regulated quality systems where every change must be traceable and defensible." },
    ],
  },
  {
    id: "frontend-dev",
    class: "Full-Stack Developer",
    icon: "💻",
    color: "#ff4757", // red
    skills: [
      { name: "React", level: 5, description: "Build real UIs with state, routing, data loading, and component-driven structure." },
      { name: "HTML/CSS", level: 5, description: "Strong layout fundamentals, responsive design, and clean styling for production UI." },
      { name: "JS/Python", level: 4, description: "JavaScript for UI and serverless logic, Python for automation, bots, and API integrations." },
      { name: "GitHub", level: 4, description: "Repo workflows, PRs, release discipline, and coordination across collaborators." },
      { name: "Cloud", level: 4, description: "Deploy serverless backends: AWS (S3, CloudFront, API Gateway, Lambda) and Cloudflare Workers." },
    ],
  },
  {
    id: "project-strategist",
    class: "Project Strategist",
    icon: "📋",
    color: "#4a9eff", // blue
    skills: [
      { name: "Roadmaps", level: 5, description: "Turn messy ideas into clear milestones, priorities, and delivery plans. Strong bias toward shipping." },
      { name: "Stakeholders", level: 5, description: "Align goals with stakeholders, communicate tradeoffs, and keep projects moving without chaos." },
      { name: "Scheduling", level: 4, description: "Build realistic timelines, coordinate dependencies, and maintain momentum across moving parts." },
      { name: "Budgeting", level: 4, description: "Track constraints, scope, and resourcing to deliver within time and budget limits. Google Project Management certified." },
      { name: "Execution", level: 5, description: "High-velocity shipping mindset: plan, build, test, iterate, deliver." },
    ],
  },
  {
    id: "ux-designer",
    class: "UX Designer",
    icon: "🎨",
    color: "#00ff88", // green
    skills: [
      { name: "Research", level: 4, description: "Translate user needs into actionable product decisions through interviews, testing, and synthesis." },
      { name: "Figma", level: 5, description: "Rapid prototyping, UI layouts, components, and iteration loops that lead to build-ready designs." },
      { name: "IA", level: 4, description: "Structure navigation and content flows so the product feels obvious and fast to use." },
      { name: "Stats", level: 4, description: "Statistical reasoning and SPSS to validate assumptions and support decisions." },
      { name: "Accessibility", level: 4, description: "Design with inclusive defaults: contrast, hierarchy, clarity, and usable interaction patterns." },
    ],
  },
];
