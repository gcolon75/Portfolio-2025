// Single source of truth for who Gabriel is. The About section and the VI both read this.
// Only put facts here that Gabriel has confirmed. The VI will not answer beyond it.

export const profile = {
  name: 'Gabriel Colon',
  handle: 'Ghawk75',
  location: 'San Diego, CA',
  email: 'ghawk075@gmail.com',
  phone: '(847) 778-1274',
  github: 'https://github.com/gcolon75',
  linkedin: 'https://www.linkedin.com/in/gabriel-colon-3b4487253/',
  education: 'UCSD, B.S. Cognitive Science: Human Computer Interaction',
  headline: 'AI automation, AI enablement, data migration, full-stack builder',
  roles: ['AI Enablement Specialist', 'AI Automation Builder', 'Data Migration Specialist', 'Full-Stack Developer'],
  bio:
    "I build AI automation and move data that has to be right. I'm an AI Enablement Specialist at Axos Bank, " +
    'helping the Consumer Division turn AI ideas into tools teams actually use. Before that I migrated and audited ' +
    '50,000+ regulated records at PCI Pharma Services and co-founded Joint Theatrical Ventures. My background is ' +
    'Cognitive Science from UCSD, so I design for how people actually think, then build the thing end to end.',
  // Third-person version the VI uses.
  viIntro:
    'Gabriel Colon builds AI automation and moves data that has to be right. He is an AI Enablement ' +
    'Specialist at Axos Bank in the Consumer Division, starting November 2026. Before that he was a QA Data Migration ' +
    'Specialist at PCI Pharma Services and co-founded Joint Theatrical Ventures. He has a B.S. in Cognitive Science ' +
    'from UCSD and is based in San Diego. His focus: AI automation, AI enablement, data migration, and full-stack building.',
  openTo: 'Gabriel just started as an AI Enablement Specialist at Axos Bank, so he is not looking for a new full-time role. He is happy to talk about AI enablement, automation, and data migration work.',
  experience: [
    {
      title: 'AI Enablement Specialist',
      org: 'Axos Bank, Consumer Division',
      dates: 'November 2026 - Present',
      summary:
        'Builds and maintains AI-powered tools for Consumer Banking teams, runs intake for AI initiatives from business partners, ' +
        'reports progress to leadership, and applies governance, risk, and compliance standards so AI work scales safely in a regulated bank.'
    },
    {
      title: 'QA Data Migration Specialist',
      org: 'PCI Pharma Services (CDMO)',
      dates: 'March 2026 - September 2026',
      summary:
        'Migrated and audited 50,000+ regulated records with Quality, IT, and Compliance, and built a 58-function PowerShell suite ' +
        'that reconciled 20,000+ controlled documents, cutting a multi-day manual review to about 3 minutes.'
    },
    {
      title: 'AI Solutions Engineer & Product Manager (Co-Founder)',
      org: 'Joint Theatrical Ventures LLC',
      dates: 'September 2025 - September 2026',
      summary:
        'Co-founded the company and owned delivery end to end. Shipped the product across 2,461 commits with 107 tests gating every deploy, ' +
        'and built a multi-agent Discord orchestrator for deployment, diagnostics, and CI triage.'
    },
    {
      title: 'Event Coordinator, Finance & Social Intern',
      org: 'Tritonthenix (UCSD club)',
      dates: '2023 - 2024',
      summary: 'Ran events, budgets, and social outreach for a UCSD student club.'
    },
    {
      title: 'Store Owner',
      org: 'Etsy',
      dates: 'June 2020',
      summary: 'Ran an e-commerce storefront: sourcing, listings, order processing, and customer service.'
    }
  ],
  certifications: [
    'Google Project Management',
    'Agentic AI',
    'Agent Memory: Building Memory-Aware Agents',
    'A2A: The Agent2Agent Protocol',
    'Spec-Driven Development with Coding Agents'
  ],
  toolbox: [
    'Python', 'JavaScript', 'React', 'SQL', 'PowerShell', 'VBA', 'Java', 'HTML/CSS', 'Git/GitHub', 'AWS',
    'LLMs', 'AI agents', 'Prompt engineering', 'Workflow automation', 'APIs',
    'Excel', 'Airtable', 'Salesforce', 'ERP systems', 'SPSS', 'Statistics',
    'Figma', 'UX research', 'Agile', 'Asana', 'Project budgeting'
  ],
  interests: ['Space and sci-fi', 'RPGs and game design']
};
