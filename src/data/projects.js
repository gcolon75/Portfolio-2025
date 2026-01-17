export const projects = [
  {
    id: 'tower-of-greed',
    name: 'Tower of Greed',
    title: 'Tower of Greed',
    year: 2025,
    description: 'A dice-driven roguelike RPG with subclass resource systems and strategic turn-based combat',
    tagline: 'A dice-driven roguelike where luck meets strategy',

    fullSummary:
      'A roguelike dungeon crawler that emphasizes player agency through smart sequencing rather than random chance.',

    problem:
      'Traditional roguelikes often rely too heavily on RNG, creating frustration when player skill cannot overcome bad luck.',

    approach:
      'Designed deterministic dice systems, subclass resources, and combat rules that translate player intent into readable outcomes while preserving uncertainty.',

    result:
      'A ~60% complete game design in active development. Combat and progression are being finalized. Animation and visual polish are still pending. Current images are AI-generated concept art placeholders.',

    role: 'Lead Game Designer & UX Designer',
    whatISpecificallyDid: [
      'Owned overall game vision, ruleset, and systemic design philosophy',
      'Designed core dice mechanics and deterministic combat flow',
      'Created subclass resource systems (Blood, Grit, Edge) and risk windows (setup vs cash-out)',
      'Defined player expectations, readable UI state, and “no hidden information” combat principles',
      'Wrote implementation-ready ability rules (costs, triggers, effects) to hand off to engineering',
      'Managed Kanban/task breakdowns and coordinated with lead programmer using GitHub workflows'
    ],
    impact: {
      statement:
        'Improves player agency by turning randomness into readable, controllable decision-making rather than pure luck spikes.',
      how:
        'Uses resource-gating and sequencing rules so player choices create predictable risk windows and strategic payoffs.'
    },

    tech: ['Game Design', 'Systems Design', 'UX Design', 'Kanban / PM', 'GitHub'],
    skills: [
      'Game Design',
      'Systems Design',
      'UX Design',
      'Combat Design',
      'Progression Design',
      'Documentation',
      'Team Coordination'
    ],
    concepts: ['Player Agency', 'RNG Mitigation', 'Strategic Depth', 'Turn-Based Combat'],

    status: 'In Progress',
    date: '2025',
    category: 'Game Design',
    route: '/projects/tower-of-greed',

    // This is the “Blood Mage image on the side” — now safely in Assets at the top.
    designProof: {
      image: `${process.env.PUBLIC_URL}/assets/projects/Tower of Greed/BloodMageProof.png`,
      imageAlt: 'Gameplay system proof (Blood Mage)',
      caption: 'In-development combat UI. AI-generated concept art. Animation pending.',
      notes: [
        'Combat UI communicates all critical game state with no hidden information',
        'Blood Mage resource system demonstrates risk–reward via self-inflicted cost',
        'Actions, triggers, and effects are deterministic and implementation-ready',
        'Design preserves tension without relying on pure randomness'
      ],
      breakdown: [
        {
          label: 'Design Goal',
          text: 'Preserve roguelike tension while ensuring player decisions meaningfully influence outcomes.'
        },
        {
          label: 'System Shown',
          text: 'Blood Mage subclass generating Blood Charges via bleed, self-harm, and timing windows.'
        },
        {
          label: 'Player Choice',
          text: 'Player decides when to sacrifice health for power versus when to stabilize or retreat.'
        },
        {
          label: 'Engineering Clarity',
          text: 'Each action has explicit costs, conditions, and effects suitable for direct implementation.'
        }
      ]
    },

    assets: {
      images: [
        `${process.env.PUBLIC_URL}/assets/projects/Tower of Greed/TowerOfGreedThumb.png`
      ],
      pdfs: [
        {
          title: 'Project Design Pitch Slides',
          url: `${process.env.PUBLIC_URL}/assets/projects/Tower of Greed/TowerOfGreedSlides.pdf`
        },
        {
          title: 'Screen Workflow',
          url: `${process.env.PUBLIC_URL}/assets/projects/Tower of Greed/Screen Workflow.pdf`
        }
      ],
      videos: [],
      documents: [],
      links: []
    }
  },

  /* --------------------------------------------------
     JOINT (add/adjust filenames to match your assets)
     -------------------------------------------------- */
  {
    id: 'joint-theatrical-ventures',
    name: 'Joint Theatrical Ventures',
    title: 'Joint Theatrical Ventures',
    year: 2025,
    description: 'LinkedIn-style portfolio + networking platform for entertainment professionals (In Development)',
    tagline: 'A modern creative network for reels, scripts, and collaboration',
    fullSummary:
      'A full-stack web platform that helps actors, writers, and producers share work, connect, and manage discovery.',
    problem:
      'Creative professionals struggle to present work cleanly and connect with collaborators without fragmented tools.',
    approach:
      'Designed and built profile systems, gated sharing, media presentation flows, and social interactions with a strong emphasis on UX clarity and scalability.',
    result:
      'Core product experience is functional and iterating. Remaining work focuses on social interactions, notifications, and polish.',

    role: 'Product/UX Lead (Partner: Lead Engineer)',
    whatISpecificallyDid: [
      'Led UX strategy and end-to-end interaction design',
      'Designed profile architecture, portfolio presentation, and discovery flows',
      'Wrote clear engineering-ready requirements and acceptance criteria',
      'Managed Kanban/task breakdown and GitHub workflow with lead programmer'
    ],

    status: 'In Progress',
    date: '2025',
    category: 'Web Development',
    route: '/projects/joint',

    assets: {
      images: [
        // swap these to your real files if named differently
        `${process.env.PUBLIC_URL}/assets/projects/Joint/JointThumb.png`
      ],
      pdfs: [
        // IMPORTANT: can be strings OR {title,url} now
        // `${process.env.PUBLIC_URL}/assets/projects/Joint/JointCaseStudy.pdf`,
        {
          title: 'Product Overview / Notes',
          url: `${process.env.PUBLIC_URL}/assets/projects/Joint/JointOverview.pdf`
        }
      ],
      videos: [],
      documents: [],
      links: [
        // put repo or live demo links here
        // { title: 'GitHub Repo', url: 'https://github.com/...' }
      ]
    }
  },

  // keep the rest of your projects below exactly as you already have them...

  {
    id: 'amadeus',
    name: 'Amadeus',
    title: 'Amadeus — Discord Bot Agent',
    year: 2024,

    // ✅ Stronger card blurb (Steins;Gate inspiration + real dev value)
    description:
      'Discord bot agent inspired by Steins;Gate’s “Amadeus” concept, built to support Joint development with server status, PR tracking, and lightweight analytics.',

    tagline: 'A dev-sidekick bot for Joint: status, PR flow, and signal over noise',
    fullSummary:
      'Amadeus was my “agent-in-the-loop” Discord bot inspired by Steins;Gate’s Amadeus idea — not as a copy, but as a personal nod to the concept of a persistent digital assistant. I built it to live in our dev Discord during Joint’s build phase: monitoring server health, tracking PR status and merges, and posting simple analytics/rollups so the team always had a single source of truth without constantly checking dashboards.',
    problem:
      'During active development, teams lose time context-switching between GitHub, hosting dashboards, and status checks — and important signals (failed deploys, stuck PRs, unstable endpoints) get missed.',
    approach:
      'Built a Discord bot agent that integrates with GitHub + deployment health checks, posts status summaries, and reports lightweight analytics with guardrails (dedupe, cooldowns, readable formatting) so updates stay useful instead of spammy.',
    result:
      'Created a reliable Discord-native command + alert system that improved visibility into Joint’s development workflow (server health, PR pipeline, basic activity summaries) and reduced context switching.',
    role: 'Developer, Systems Designer',
    whatISpecificallyDid: [
      'Designed Discord bot agent architecture and command structure',
      'Integrated GitHub PR status + merge tracking into Discord updates',
      'Implemented server health monitoring and readable rollup messages',
      'Added basic analytics summaries (counts, trends, quick signals) for dev visibility'
    ],
    impact: {
      statement:
        'Improved dev-team awareness and reduced context switching by turning Discord into a live operations/status surface for Joint.',
      how:
        'Connected GitHub + health checks into consistent summaries and alerts, with noise controls so the bot stays helpful instead of becoming “that one annoying channel.”'
    },

    // ✅ Updated tech stack tags to match what you described
    tech: ['Python 3.11', 'Discord API', 'GitHub API', 'Automation'],
    skills: ['Python', 'API Integration', 'Automation', 'Dev Tooling', 'Systems Thinking'],
    concepts: ['Developer Experience', 'Status Monitoring', 'Workflow Automation', 'Signal vs Noise'],

    status: 'Complete',
    date: '2024',
    category: 'AI Project',
    route: '/projects/amadeus',

    // ✅ Your new thumbnail name
    cardImage: `${process.env.PUBLIC_URL}/assets/projects/Amadeus/amadeus.png`,
    coverImage: `${process.env.PUBLIC_URL}/assets/projects/Amadeus/amadeus.png`,

    assets: {
      images: [`${process.env.PUBLIC_URL}/assets/projects/Amadeus/amadeus.png`],
      pdfs: [],
      videos: [],
      documents: [],
      links: [
        {
          url: 'https://github.com/gcolon75/ghawk75-ai-agent',
          title: 'GitHub Repository',
          type: 'github'
        }
      ]
    }
  },

  {
    id: '3kingdoms',
    name: '3 Kingdoms',
    title: '3 Kingdoms',
    year: 2023,
    description: 'Fantasy strategy-RPG concept exploring player agency and narrative consequences',
    tagline: 'A turn-based strategy RPG exploring narrative, world-building, and systems design',
    fullSummary: 'A fantasy strategy-RPG concept I designed and prototyped using Godot.',
    problem:
      'Modern RPGs often lack meaningful player agency and deep narrative consequences that reshape alliances and outcomes.',
    approach:
      'Authored a comprehensive game design concept exploring player agency through diplomacy/deception/escalation, class identity (Warrior/Mage/Rogue), and systems like planetary weapons, alignment, and kingdom buffs.',
    result:
      'Created detailed design documentation including lore, mechanics, encounter structure, and class fantasies inspired by classics like Pokémon and Zelda with mature themes.',
    role: 'Game Designer, Narrative Designer',
    whatISpecificallyDid: [
      'Authored complete world-building and narrative arc',
      'Designed class system with planetary influences',
      'Created combat mechanics with tactical depth',
      'Developed alignment and faction systems',
      'Designed progression through towers and sigil doors'
    ],
    impact: {
      statement:
        'Demonstrated comprehensive game design thinking through detailed systems integration and narrative structure.',
      how:
        'Created interconnected systems where class choice, alignment, and diplomatic decisions create meaningful branching outcomes and replayability.'
    },
    tech: ['Game Design Concept', 'Narrative Design', 'World-Building', 'Systems Design'],
    skills: ['Game Design', 'Narrative Design', 'World-Building', 'Systems Design', 'Class Design'],
    concepts: ['Player Agency', 'Branching Narrative', 'Class Systems', 'Faction Dynamics'],
    status: 'Complete',
    date: '2023',
    category: 'Game Design',
    route: '/projects/3kingdoms',
    assets: {
      images: [
        `${process.env.PUBLIC_URL}/assets/projects/3 Kingdoms/3KingdomsTitleScreen.png`,
        `${process.env.PUBLIC_URL}/assets/projects/3 Kingdoms/3KingdomsMap.JPG`
      ],
      pdfs: [],
      videos: [],
      documents: [],
      links: []
    }
  },

  {
    id: 'axle',
    name: 'Axle',
    title: 'axle: Mobile Mechanic App/Website Design',
    year: 2023,
    description:
      'UX/Product design for mobile mechanic platform connecting car owners with certified mechanics',
    tagline: 'Connecting car owners with certified mechanics for on-demand vehicle repair',
    fullSummary: 'A complete redesign concept for a mobile mechanic app with a focus on user experience.',
    problem:
      'Car owners face inconvenience with traditional repair shops (waiting rooms, towing), while mechanics need flexible business growth without physical shops.',
    approach:
      'Led comprehensive user research and design process, creating mobile-first platform with real-time tracking, AI diagnostics, transparent pricing, and dual interfaces for customers and mechanics.',
    result:
      'Delivered complete desktop and mobile interfaces with user flows, high-fidelity mockups, and design system maintaining consistent visual identity across the platform.',
    role: 'UX Designer, User Researcher, Project Manager',
    whatISpecificallyDid: [
      'Led and conducted comprehensive user research interviews',
      'Designed primarily for desktop platforms with responsive considerations',
      'Created high-fidelity mockups with detailed annotations',
      'Prepared and delivered polished design presentations for stakeholders',
      'Developed user flows and interactive prototypes',
      'Maintained consistent design system and visual identity across pages'
    ],
    impact: {
      statement:
        'Increased UX clarity through systematic user research and design system consistency, reducing friction in mechanic-customer connection flows.',
      how:
        'Conducted 15+ user interviews to identify pain points, then created component-based design system with reusable patterns for booking, tracking, and payment flows.'
    },
    tech: ['Figma', 'UX Design', 'User Research', 'Project Management'],
    skills: ['UX Design', 'User Research', 'Project Management', 'Design Systems', 'User Flows'],
    concepts: ['Mobile-First Design', 'Service Platforms', 'Real-Time Tracking', 'Dual User Types'],
    status: 'Complete',
    date: '2023',
    category: 'UX/Product Design',
    route: '/projects/axle',
    assets: {
      images: [
        `${process.env.PUBLIC_URL}/assets/projects/Axle/axleImage.JPG`,
        `${process.env.PUBLIC_URL}/assets/projects/Axle/axle-homepage.JPG`,
        `${process.env.PUBLIC_URL}/assets/projects/Axle/axle-about.JPG`,
        `${process.env.PUBLIC_URL}/assets/projects/Axle/axle-becomeMechanic.JPG`
      ],
      pdfs: [`${process.env.PUBLIC_URL}/assets/projects/Axle/axle-slides.pdf`],
      videos: [],
      documents: [],
      links: []
    }
  },

  {
    id: 'goalee',
    name: 'GoaLee',
    title: 'Goalee: Startup Project Pitch',
    year: 2022,
    description:
      'Campus-based social app gamifying goal tracking and encouraging in-person interaction',
    tagline: 'Leveling Up Together — One Goal at a Time',
    fullSummary: 'A campus-based social app encouraging in-person interaction and events at UCSD.',
    problem:
      'Students face challenges with motivation and isolation in academic settings, lacking tools that promote both individual accountability and community connection.',
    approach:
      'Designed a mobile app that gamifies daily goals and encourages in-person interaction through goal tracking, team quests, challenge boards, and social feeds, turning personal growth into a community-driven experience.',
    result:
      'Created complete Figma prototype demonstrating onboarding flow, dashboard interface, and team-based interaction system, with pitch deck and budget model presented to stakeholders.',
    role: 'Co-Team Leader, UX Designer, Creative Director',
    whatISpecificallyDid: [
      'Directed creative vision and core interaction flow',
      'Worked as Co-team Leader and flex Figma designer',
      'Helped build final Figma prototype with multiple screens',
      'Presented pitch deck to stakeholders and faculty',
      'Facilitated feedback loops during team critiques'
    ],
    impact: {
      statement:
        'Created compelling vision for campus engagement through gamification that resonated with stakeholders and faculty.',
      how:
        'Developed comprehensive prototype and pitch materials that clearly communicated the value proposition of combining personal accountability with community building.'
    },
    tech: ['Figma', 'UX Design', 'Human-Centered Design', 'Pitch Presentation'],
    skills: ['UX Design', 'Team Leadership', 'Creative Direction', 'Prototyping', 'Stakeholder Presentation'],
    concepts: ['Gamification', 'Social Apps', 'Community Building', 'Campus Life'],
    status: 'Complete',
    date: '2022',
    category: 'UX/Product Design',
    route: '/projects/goalee',
    assets: {
      images: [
        `${process.env.PUBLIC_URL}/assets/projects/Goalee/GoaleeHomescreen.JPG`,
        `${process.env.PUBLIC_URL}/assets/projects/Goalee/GoaleePoster.jpg`,
        `${process.env.PUBLIC_URL}/assets/projects/Goalee/GoaleeTitle.JPG`
      ],
      pdfs: [`${process.env.PUBLIC_URL}/assets/projects/Goalee/GoaleeFigma.pdf`],
      videos: [],
      documents: [],
      links: [
        {
          url: 'https://docs.google.com/presentation/d/e/2PACX-1vSpL_voyYopV9thl57oDpDqboJKtujCbfX-xHwc6N22XR5Hq-h22LNQcZAjyhI_Ig/pubembed?start=false&loop=true&delayms=3000',
          title: 'Slide Deck',
          type: 'slides'
        },
        {
          url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0oSbEK83wyRDNdhnA1izE_SfPZ7WBdF9VnMTOYrTYtxLF8TB-LT6h-BGTSN1Erw/pubhtml?widget=true&headers=false',
          title: 'Budget & Growth Model',
          type: 'spreadsheet'
        }
      ]
    }
  },

  {
    id: 'tritongoplus',
    name: 'TritonGo+',
    title: 'TritonGo App',
    year: 2022,
    description: 'Gamified campus quest app for UCSD with location-based team gameplay',
    tagline: 'Making Real Life a Campus Quest',
    fullSummary: 'A campus-based social app encouraging in-person interaction and events at UCSD.',
    problem:
      'Students struggle to find in-person social connections and engaging campus activities in a convenient, gamified way.',
    approach:
      'Built a social campus app that gamifies goal tracking with location-based team gameplay, daily missions, event discovery, and battle mechanics for colleges and dungeons, using Figma prototype deployed as Wix website.',
    result:
      'Created complete app concept with team-based quests, map interaction, and UCSD-exclusive features, successfully pitched to client with working demo site.',
    role: 'UI Designer, Brand Designer, Lead Designer',
    whatISpecificallyDid: [
      'Led the design and Figma prototyping of the app for the team',
      'Interviewed target users to inform app features',
      'Built the client-facing website on Wix',
      'Developed pitch materials and presented the concept',
      'Collaborated on storyline, structure, and in-app quest mechanics'
    ],
    impact: {
      statement:
        'Successfully pitched and demonstrated campus engagement concept through functional prototype and web presence.',
      how:
        'Created cohesive brand identity and user experience that translated from Figma prototype to Wix website, demonstrating viability to stakeholders.'
    },
    tech: ['Figma', 'Wix', 'UX Design', 'Brand Design'],
    skills: ['UX Design', 'Brand Design', 'User Research', 'Web Design', 'Prototyping'],
    concepts: ['Gamification', 'Location-Based', 'Campus Life', 'Team Gameplay'],
    status: 'Complete',
    date: '2022',
    category: 'UX/Product Design',
    route: '/projects/tritongoplus',
    assets: {
      images: [`${process.env.PUBLIC_URL}/assets/projects/Triton Go/TritonGoTitle.JPG`],
      pdfs: [],
      videos: [],
      documents: [],
      links: [
        {
          url: 'https://ucsdtritongo.wixsite.com/tritongoplus',
          title: 'TritonGo Wix Website',
          type: 'website'
        }
      ]
    }
  },

  {
    id: 'volleyball',
    name: 'Volleyball Mobile',
    title: 'Volleyball Mobile',
    year: 2022,
    description: 'Beach volleyball app UX design for connecting players at La Jolla Shores',
    tagline: 'A better way to find your next volleyball squad',
    fullSummary: 'A UX/UI design concept for a volleyball app aimed at La Jolla Shores.',
    problem:
      'New and casual beach volleyball players at La Jolla Shores felt excluded from established groups, lacking tools to connect with players of similar skill levels.',
    approach:
      'Designed a mobile-first app with challenge court queue system, skill-based filtering, social flags to signal openness to play, GPS-based court locations, and personalized profiles to break down social barriers.',
    result:
      'Created intuitive Figma prototype with low-friction onboarding and strong beach community feel, validated through peer feedback and iteration on layout, visuals, and flow.',
    role: 'UX Designer, User Researcher',
    whatISpecificallyDid: [
      'Conducted field research and user interviews at La Jolla Shores',
      'Designed complete mobile user flows in Figma',
      'Created wireframes, mockups, and interactive prototypes',
      'Developed inclusive design solutions for skill-level matching',
      'Presented design rationale and research findings'
    ],
    impact: {
      statement:
        'Created inclusive design solution that addresses social barriers through thoughtful UX patterns for skill matching and community building.',
      how:
        'Applied field research insights to design features that lower barriers to entry while maintaining authenticity of beach volleyball culture.'
    },
    tech: ['Figma', 'UX Design', 'Mobile-First Design', 'User Research'],
    skills: ['UX Design', 'User Research', 'Mobile Design', 'Community Design', 'Field Research'],
    concepts: ['Mobile-First', 'Social Apps', 'Community Building', 'Skill Matching'],
    status: 'Complete',
    date: '2022',
    category: 'UX/Product Design',
    route: '/projects/volleyball',
    assets: {
      images: [`${process.env.PUBLIC_URL}/assets/projects/Volleyball Mobile/VolleyballMobileTitle.JPG`],
      pdfs: [`${process.env.PUBLIC_URL}/assets/projects/Volleyball Mobile/Volleyball Mobile.pdf`],
      videos: [],
      documents: [],
      links: []
    }
  }
];
