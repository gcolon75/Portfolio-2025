export const projects = [
  {
    id: 'tower-of-greed',
    name: 'Tower of Greed',
    title: 'Tower of Greed',
    year: 2025,
    description: 'A dice-driven roguelike RPG with subclass resource systems and strategic turn-based combat',
    tagline: 'A dice-driven roguelike where luck meets strategy',
    fullSummary: 'A roguelike dungeon crawler that emphasizes player agency through smart sequencing rather than random chance.',
    problem: 'Traditional roguelikes often rely too heavily on RNG, creating frustration when player skill cannot overcome bad luck.',
    approach: 'Designed core dice mechanics and progression systems that give players meaningful control through resource management, subclass systems (Blood, Grit, Edge), and turn-based combat balancing.',
    result: 'Created a comprehensive game design concept with detailed documentation covering mechanics, progression, and combat systems that reduce RNG frustration while maintaining strategic depth.',
    role: 'Game Designer, Systems Designer',
    whatISpecificallyDid: [
      'Designed core dice mechanics and progression systems',
      'Created subclass resource systems (Blood, Grit, Edge)',
      'Developed turn-based combat loop balancing setup vs. burst timing',
      'Authored comprehensive concept documentation'
    ],
    impact: {
      statement: 'Enhanced player agency through systematic design patterns that reduce RNG frustration while maintaining strategic depth.',
      how: 'Applied resource-gating mechanics and turn-based sequencing inspired by deck-building roguelikes, ensuring player choices create meaningful decision trees rather than random outcomes.'
    },
    tech: ['Game Design', 'Systems Design', 'Roguelike', 'Dice Systems'],
    skills: ['Game Design', 'Systems Design', 'Resource Management', 'Combat Design', 'Documentation'],
    concepts: ['Player Agency', 'RNG Mitigation', 'Strategic Depth', 'Turn-Based Combat'],
    status: 'Complete',
    date: '2025',
    category: 'Game Design',
    route: '/projects/tower-of-greed',
    assets: {
      images: [`${process.env.PUBLIC_URL}/assets/projects/Tower of Greed/TowerOfGreedThumb.png`],
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
  {
    id: 'project-valine',
    name: 'Project Valine',
    title: 'Project Valine',
    year: 2025,
    description: 'A professional networking platform with innovative discovery features (In Development)',
    tagline: 'A modern platform connecting creative professionals',
    fullSummary: 'A professional networking platform with innovative discovery features. In early development with private testing.',
    problem: 'Traditional networking platforms struggle with authentic connection and meaningful discovery of creative talent.',
    approach: 'Building a platform that combines social-style presentation with search-driven discovery, focusing on profile systems, advanced filtering, and innovative content matching.',
    result: 'Currently developing core features with a limited test group to validate the concept and refine user experience.',
    role: 'Platform Designer, Developer',
    whatISpecificallyDid: [
      'Designed profile system with media showcase capabilities',
      'Developed advanced search and filtering functionality',
      'Created innovative content matching features',
      'Coordinating private testing with early users'
    ],
    impact: {
      statement: 'Improved discovery UX through structured filtering patterns and profile architecture that highlights creative work over traditional résumé formats.',
      how: 'Implemented component-based profile system with reusable search filters, reducing cognitive load through progressive disclosure and prioritizing visual portfolio presentation.'
    },
    tech: ['React', 'Web Development', 'Platform Design', 'UX Design'],
    skills: ['Web Development', 'Platform Architecture', 'UX Design', 'User Research', 'Feature Design'],
    concepts: ['Discovery Systems', 'Profile Architecture', 'Social Features', 'Search & Filtering'],
    status: 'In Progress',
    date: 'Sept 2025 - Present',
    category: 'Web Development',
    route: '/projects/valine',
    coverImage: `${process.env.PUBLIC_URL}/assets/projects/Valine/valine-cover.jpg`,
    assets: {
      images: [],
      pdfs: [],
      videos: [],
      documents: [],
      links: []
    }
  },
  {
    id: 'amadeus',
    name: 'Amadeus',
    title: 'Amadeus — AI Agent for Discord',
    year: 2024,
    description: 'AI-powered Discord bot for automated stock tracking and game deal monitoring',
    tagline: 'Always-on desktop agent for market tracking and deal alerts',
    fullSummary: 'Always-on desktop agent that watches stocks and game deals, configures a schedule, computes indicators, and posts briefs + alerts to Discord.',
    problem: 'Tracking market movements and gaming deals requires constant manual checking across multiple platforms, creating alert fatigue and missed opportunities.',
    approach: 'Developed an always-on Windows desktop agent that polls watchlists, computes technical indicators (SMA20/50, RSI14), tracks options, and monitors game deals with intelligent alert hygiene (cooldowns, quiet hours, deduplication).',
    result: 'Created a reliable automation system that reduces alert noise while capturing important moves, with scheduled briefs at 7:30 AM and 10:00 PM PT delivered to Discord.',
    role: 'Developer, Systems Designer',
    whatISpecificallyDid: [
      'Designed agent architecture and Discord posting flows',
      'Implemented market pipelines, indicators, and paper-trade hooks',
      'Wrote daily brief generator and quiet-hours/cooldown logic',
      'Packaged run-on-logon automation and environment bootstrap'
    ],
    impact: {
      statement: 'Reduced manual monitoring overhead by 90% through intelligent alert aggregation and scheduling.',
      how: 'Built configurable watchlist system with technical indicators and smart alert filtering that delivers actionable insights without overwhelming users.'
    },
    tech: ['Python 3.11', 'Discord API', 'Polygon.io', 'Windows Task Scheduler', 'Automation'],
    skills: ['Python', 'API Integration', 'Automation', 'Data Engineering', 'Alert Systems'],
    concepts: ['Market Data', 'Technical Indicators', 'Alert Hygiene', 'Scheduled Tasks'],
    status: 'Complete',
    date: '2024',
    category: 'AI Project',
    route: '/projects/amadeus',
    assets: {
      images: [],
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
    description: 'Strategy-RPG game design concept focused on diplomacy, world-building, and systems design (design challenge + map testing)',
    tagline: 'A design challenge exploring narrative diplomacy and interconnected RPG systems',
    fullSummary: 'A game design concept with light map-testing focused on narrative diplomacy, class identity, and cosmic progression systems. This was a design challenge — not a fully developed/coded game.',
    problem: 'Modern RPGs often lack meaningful player agency and deep narrative consequences that reshape alliances and outcomes.',
    approach: 'Authored a comprehensive game design concept exploring player agency through diplomacy/deception/escalation, class identity (Warrior/Mage/Rogue), and systems like planetary weapons, alignment, and kingdom buffs.',
    result: 'Produced a complete concept document (lore + mechanics + progression) and exploratory map testing to validate world layout and pacing. No full implementation was shipped.',
    role: 'Game Designer, Narrative Designer',
    whatISpecificallyDid: [
      'Authored complete world-building and narrative arc',
      'Designed class system with planetary influences',
      'Created combat mechanics with tactical depth',
      'Developed alignment and faction systems',
      'Designed progression through towers and sigil doors'
    ],
    impact: {
      statement: 'Demonstrated comprehensive game design thinking through detailed systems integration and narrative structure.',
      how: 'Created interconnected systems where class choice, alignment, and diplomatic decisions create meaningful branching outcomes and replayability.'
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
      pdfs: [
        {
          title: 'Design Concept PDF',
          url: `${process.env.PUBLIC_URL}/assets/projects/3 Kingdoms/Three Kingdoms.pdf`
        }
      ],
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
    description: 'UX/Product design for mobile mechanic platform connecting car owners with certified mechanics',
    tagline: 'Connecting car owners with certified mechanics for on-demand vehicle repair',
    fullSummary: 'A complete redesign concept for a mobile mechanic app with a focus on user experience.',
    problem: 'Car owners face inconvenience with traditional repair shops (waiting rooms, towing), while mechanics need flexible business growth without physical shops.',
    approach: 'Led comprehensive user research and design process, creating mobile-first platform with real-time tracking, AI diagnostics, transparent pricing, and dual interfaces for customers and mechanics.',
    result: 'Delivered complete desktop and mobile interfaces with user flows, high-fidelity mockups, and design system maintaining consistent visual identity across the platform.',
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
      statement: 'Increased UX clarity through systematic user research and design system consistency, reducing friction in mechanic-customer connection flows.',
      how: 'Conducted 15+ user interviews to identify pain points, then created component-based design system with reusable patterns for booking, tracking, and payment flows.'
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
    description: 'Campus-based social app gamifying goal tracking and encouraging in-person interaction',
    tagline: 'Leveling Up Together — One Goal at a Time',
    fullSummary: 'A campus-based social app encouraging in-person interaction and events at UCSD.',
    problem: 'Students face challenges with motivation and isolation in academic settings, lacking tools that promote both individual accountability and community connection.',
    approach: 'Designed a mobile app that gamifies daily goals and encourages in-person interaction through goal tracking, team quests, challenge boards, and social feeds, turning personal growth into a community-driven experience.',
    result: 'Created complete Figma prototype demonstrating onboarding flow, dashboard interface, and team-based interaction system, with pitch deck and budget model presented to stakeholders.',
    role: 'Co-Team Leader, UX Designer, Creative Director',
    whatISpecificallyDid: [
      'Directed creative vision and core interaction flow',
      'Worked as Co-team Leader and flex Figma designer',
      'Helped build final Figma prototype with multiple screens',
      'Presented pitch deck to stakeholders and faculty',
      'Facilitated feedback loops during team critiques'
    ],
    impact: {
      statement: 'Created compelling vision for campus engagement through gamification that resonated with stakeholders and faculty.',
      how: 'Developed comprehensive prototype and pitch materials that clearly communicated the value proposition of combining personal accountability with community building.'
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
    problem: 'Students struggle to find in-person social connections and engaging campus activities in a convenient, gamified way.',
    approach: 'Built a social campus app that gamifies goal tracking with location-based team gameplay, daily missions, event discovery, and battle mechanics for colleges and dungeons, using Figma prototype deployed as Wix website.',
    result: 'Created complete app concept with team-based quests, map interaction, and UCSD-exclusive features, successfully pitched to client with working demo site.',
    role: 'UI Designer, Brand Designer, Lead Designer',
    whatISpecificallyDid: [
      'Led the design and Figma prototyping of the app for the team',
      'Interviewed target users to inform app features',
      'Built the client-facing website on Wix',
      'Developed pitch materials and presented the concept',
      'Collaborated on storyline, structure, and in-app quest mechanics'
    ],
    impact: {
      statement: 'Successfully pitched and demonstrated campus engagement concept through functional prototype and web presence.',
      how: 'Created cohesive brand identity and user experience that translated from Figma prototype to Wix website, demonstrating viability to stakeholders.'
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
    problem: 'New and casual beach volleyball players at La Jolla Shores felt excluded from established groups, lacking tools to connect with players of similar skill levels.',
    approach: 'Designed a mobile-first app with challenge court queue system, skill-based filtering, social flags to signal openness to play, GPS-based court locations, and personalized profiles to break down social barriers.',
    result: 'Created intuitive Figma prototype with low-friction onboarding and strong beach community feel, validated through peer feedback and iteration on layout, visuals, and flow.',
    role: 'UX Designer, User Researcher',
    whatISpecificallyDid: [
      'Conducted field research and user interviews at La Jolla Shores',
      'Designed complete mobile user flows in Figma',
      'Created wireframes, mockups, and interactive prototypes',
      'Developed inclusive design solutions for skill-level matching',
      'Presented design rationale and research findings'
    ],
    impact: {
      statement: 'Created inclusive design solution that addresses social barriers through thoughtful UX patterns for skill matching and community building.',
      how: 'Applied field research insights to design features that lower barriers to entry while maintaining authenticity of beach volleyball culture.'
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
