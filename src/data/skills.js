export const skillTree = [
  {
    id: "project-strategist",
    class: "Project Strategist",
    icon: "📋",
    color: "#4a9eff", // blue
    skills: [
      { name: "Roadmaps", level: 5, description: "Turn messy ideas into clear milestones, priorities, and delivery plans. Strong bias toward shipping." },
      { name: "Stakeholders", level: 5, description: "Align goals with stakeholders, communicate tradeoffs, and keep projects moving without chaos." },
      { name: "Scheduling", level: 4, description: "Build realistic timelines, coordinate dependencies, and maintain momentum across moving parts." },
      { name: "Budgeting", level: 4, description: "Track constraints, scope, and resourcing to deliver within time and budget limits." },
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
      { name: "Experiments", level: 4, description: "Design surveys and experiments to validate assumptions and reduce product risk." },
      { name: "Accessibility", level: 4, description: "Design with inclusive defaults: contrast, hierarchy, clarity, and usable interaction patterns." },
    ],
  },
  {
    id: "frontend-dev",
    class: "Frontend Developer",
    icon: "💻",
    color: "#ff4757", // red
    skills: [
      { name: "React", level: 5, description: "Build real UIs with state, routing, data loading, and component-driven structure." },
      { name: "HTML/CSS", level: 5, description: "Strong layout fundamentals, responsive design, and clean styling for production UI." },
      { name: "JS", level: 4, description: "Modern JavaScript for UI logic, async workflows, and integration with APIs." },
      { name: "GitHub", level: 4, description: "Repo workflows, PRs, release discipline, and coordination across collaborators." },
      { name: "AWS", level: 4, description: "Deploy and integrate with serverless stacks: S3, CloudFront, API Gateway, Lambda." },
    ],
  },
  {
    id: "ai-builder",
    class: "AI Builder",
    icon: "🤖",
    color: "#7f5af0", // purple
    skills: [
      { name: "Prompting", level: 5, description: "Write precise instructions to get consistent, high-quality outputs from AI systems." },
      { name: "Copilots", level: 4, description: "Use AI tools to accelerate prototyping, debugging, refactors, and system planning." },
      { name: "Automation", level: 4, description: "Set up repeatable workflows that reduce manual effort and increase iteration speed." },
      { name: "Iteration", level: 5, description: "Fast feedback loops: test → learn → refine → ship." },
      { name: "Product AI", level: 4, description: "Think through how AI fits into products responsibly and usefully, not as a gimmick." },
    ],
  },
  {
    id: "data-research",
    class: "Data & Research",
    icon: "📊",
    color: "#f7c948", // yellow
    skills: [
      { name: "Stats", level: 4, description: "Use statistical reasoning to interpret results, validate claims, and support decisions." },
      { name: "SPSS", level: 4, description: "Comfortable with analysis tooling and structured quantitative workflows." },
      { name: "DataViz", level: 4, description: "Make data readable and persuasive through clean charts and narrative framing." },
      { name: "Measures", level: 4, description: "Design metrics and measurement approaches that match the real question being asked." },
      { name: "Synthesis", level: 5, description: "Turn scattered findings into crisp insights and next-step recommendations." },
    ],
  },
];
