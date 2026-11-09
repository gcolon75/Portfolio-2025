# Portfolio-2025

## Gabriel Colon's Space & RPG Themed Portfolio

AI automation, AI enablement, data migration, full-stack builder.
Live: https://gcolon75.github.io/Portfolio-2025

A Mass Effect inspired portfolio built with React and Framer Motion, with a built-in VI
(virtual intelligence) named **G.A.B.E.** that answers visitor questions about Gabriel's work.

### 🤖 G.A.B.E., the portfolio VI

Click **Ask my VI** in the bottom right corner of any page.

- **Online mode:** questions go to a Cloudflare Worker (`vi-worker/`) that calls the Claude API.
  The system prompt is generated from the same data files the site renders, so the VI never drifts
  from the page. The worker is locked to the portfolio origin, rate limited, and caps input size.
- **Local mode:** if no worker is configured or it is unreachable, the VI answers in the browser by
  matching the question against the same knowledge base. The site works on GitHub Pages either way.
- **No made-up facts:** the VI only answers from `src/data/`. Anything else gets
  "I don't have that on file" and a pointer to email.

To change what the VI knows, edit `src/data/profile.js`, `projects.js`, `skills.js`, or `writing.js`.

#### Turning on Claude mode

```powershell
cd vi-worker
npm install
npx wrangler login
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler deploy
```

Then deploy the site with the worker URL:

```powershell
$env:REACT_APP_VI_ENDPOINT = "https://gabriel-vi.<your-subdomain>.workers.dev"; npm run deploy
```

Model and effort are set in `vi-worker/wrangler.toml` (`MODEL`, `EFFORT`). Allowed origins are in `ALLOWED_ORIGINS`.

### 🌌 Features

- **G.A.B.E. VI chat** on every page, answering from the portfolio's own data
- **Animated Hero Section** with typing effect cycling through roles
- **Mission Control Dashboard** themed About section with RPG stats bars
- **Galaxy/Orbital Project Cards** showcasing 8 projects with dedicated detail pages
- **Terminal-Style Writing Display** for articles and blog posts
- **Interactive RPG Skill Tree** with 5 character classes
- **Sci-Fi Contact Form** with social links
- **Project Detail Pages** with full descriptions, images, PDFs, and external links
- **Writing Detail Pages** with embedded PDF viewers and thumbnails
- Smooth scroll navigation
- Particle/star animations
- Fully responsive mobile-first design
- Accessible (ARIA labels, keyboard navigation)

### 🎨 Design System

**Colors:**
- Deep Space Blue: `#0a0e27`
- Dark Background: `#0a0f14`
- Nebula Purple: `#6b5b95`
- Plasma Green: `#00ff88`
- Starlight Gold: `#ffd700`
- Rocket Red: `#ff4757`

**Fonts:**
- Headings: Orbitron
- Body: Inter
- Code: Fira Code

### 🚀 Quick Start

#### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

#### Installation

1. Clone the repository:
```powershell
git clone https://github.com/gcolon75/Portfolio-2025.git
cd Portfolio-2025
```

2. Install dependencies:
```powershell
npm install
```

3. Start the development server:
```powershell
npm start
```

The app will open at `http://localhost:3000/Portfolio-2025`

#### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run deploy` - Deploys to GitHub Pages

### 📁 Project Structure

```
src/
  components/
    # Main Sections
    Header.jsx                    # Navigation header
    Hero.jsx                      # Hero section with animated typing
    About.jsx                     # Mission control dashboard
    Projects.jsx                  # Galaxy project cards (links to detail pages)
    Writing.jsx                   # Terminal-style articles (links to detail pages)
    SkillTree.jsx                 # RPG skill tree
    Contact.jsx                   # Contact form
    
    # Reusable Templates
    ProjectDetailTemplate.jsx     # Reusable template for project pages
    WritingDetailTemplate.jsx     # Reusable template for writing pages
    PDFViewer.jsx                 # PDF viewer component with controls
    
    # Writing Detail Pages
    AIGenZPage.jsx               # AI & Gen Z article detail
    ChatGPTPromptPage.jsx        # ChatGPT prompt engineering article
    HumanityInMediaPage.jsx      # Humanity in Media article
    WhovaAnalysisPage.jsx        # Whova competitive analysis
    
    # Project Detail Pages
    TowerOfGreedPage.jsx         # Tower of Greed game design
    JointTheatricalPage.jsx      # Joint Theatrical Ventures platform
    AmadeusPage.jsx              # Amadeus AI Discord agent
    ThreeKingdomsPage.jsx        # 3 Kingdoms strategy RPG
    AxlePage.jsx                 # Axle mobile mechanic app
    GoaleePage.jsx               # GoaLee campus goal tracking
    TritonGoPlusPage.jsx         # TritonGo+ campus quest app
    VolleyballPage.jsx           # Volleyball Mobile app
    
    VIChat.jsx                   # G.A.B.E. chat widget

  vi/
    knowledge.js                  # VI knowledge base + Claude system prompt (built from data/)
    localEngine.js                # Offline answer engine
    viClient.js                   # Calls vi-worker, falls back to local

  data/
    profile.js                    # Single source of truth: bio, roles, experience, contact
    projects.js                   # Project data (8 projects with full details)
    skills.js                     # Skill tree data
    writing.js                    # Articles data (4 articles with full details)
    
  assets/
    projects/                     # Project images, PDFs, and assets
      Tower of Greed/
      3 Kingdoms/
      Axle/
      Goalee/
      Triton Go/
      Volleyball Mobile/
    writing/                      # Writing thumbnails and PDFs
      ai-gen-z/
      chatgpt research/
      Humanity in Media/
      Whova Competitive Analysis/
      
  App.jsx                         # Main app with routing
  index.js                        # React entry point
  index.css                       # Global styles

vi-worker/                         # Cloudflare Worker that proxies VI chats to Claude
.claude/                           # Overhaul agents and /overhaul command
.overhaul/                         # Stack notes, changelog, handoff
```

### 🛠️ Tech Stack

- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **React PDF** - PDF viewing capabilities
- **React Icons** - Icon library
- **React Scripts** - Build tooling
- **Cloudflare Workers + Anthropic SDK** - VI backend
- **CSS3** - Component styling with CSS variables

### 📄 Content Structure

#### Projects (8 Total)
1. **Tower of Greed** - Dice-driven roguelike RPG game design
2. **Joint Theatrical Ventures** - Professional networking platform (In Progress)
3. **Amadeus** - AI Discord agent for market tracking
4. **3 Kingdoms** - Fantasy strategy-RPG concept
5. **Axle** - Mobile mechanic app UX design
6. **GoaLee** - Campus goal tracking startup pitch
7. **TritonGo+** - Gamified campus quest app
8. **Volleyball Mobile** - Beach volleyball community app

#### Writing (4 Articles)
1. **AI & Gen Z** - Analysis of Gen Z's relationship with AI
2. **ChatGPT Prompt Engineering** - Case study on effective prompting
3. **Humanity in Media** - Digital connection in virtual spaces
4. **Whova Competitive Analysis** - UX research on event platforms

### 🎯 Key Features by Page Type

#### Project Detail Pages Include:
- Hero section with project image
- Problem → Approach → Result structure
- "What I Specifically Did" contributions
- Impact statements
- Tech stack, skills, and concepts
- Image galleries
- Embedded PDF viewers for design docs
- External links (GitHub, live demos, slide decks)
- Google Sheets/Slides embeds (for GoaLee)

#### Writing Detail Pages Include:
- Thumbnail images (replacing emoji placeholders)
- Full article summaries
- Skills demonstrated
- Key themes
- Embedded PDF viewers
- Download buttons
- Responsive design

### 🌐 Deployment

Deploy to GitHub Pages:

```powershell
npm run deploy
```

The site will be available at `https://gcolon75.github.io/Portfolio-2025`

### 🔗 Routes

**Writing Pages:**
- `/writing/ai-and-gen-z`
- `/writing/chatgpt-prompt-case-study`
- `/writing/humanity-in-media`
- `/writing/whova-competitive-analysis`

**Project Pages:**
- `/projects/tower-of-greed`
- `/projects/joint-theatrical-ventures`
- `/projects/amadeus`
- `/projects/3kingdoms`
- `/projects/axle`
- `/projects/goalee`
- `/projects/tritongoplus`
- `/projects/volleyball`

### 📧 Contact

- **Email:** ghawk075@gmail.com
- **Phone:** (847) 778-1274
- **Location:** San Diego, CA
- **GitHub:** [@gcolon75](https://github.com/gcolon75)

### 📄 License

MIT License - feel free to use this project as a template for your own portfolio!

### 🙏 Acknowledgments

Built with modern web technologies and a passion for creative design. Portfolio structure inspired by space exploration themes and RPG game mechanics.

---

⭐ Star this repo if you find it useful!
