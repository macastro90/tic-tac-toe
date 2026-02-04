# 🎮 Tic-Tac-Toe (Ta-Te-Ti)

A modern Tic-Tac-Toe game built with Next.js, TypeScript, and Tailwind CSS, developed entirely using **AI Developer Workflows** and **autonomous agents**.

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat&logo=vercel)](https://vercel.com)

🚀 **Live Demo:** [https://tic-tac-toe-nu-orcin-86.vercel.app](https://tic-tac-toe-nu-orcin-86.vercel.app)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [AI-Driven Development](#ai-driven-development)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Game Rules](#game-rules)
- [Development Workflow](#development-workflow)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

This project demonstrates **end-to-end development using autonomous AI agents** following the **plan → build → test** workflow. Every feature, from initial setup to deployment, has been implemented through structured AI Developer Workflows (ADWs) and custom agent commands.

The goal is to showcase how AI agents can autonomously handle the complete software development lifecycle while maintaining code quality, best practices, and professional standards.

---

## ✨ Features

### 🎮 Gameplay Modes
- ✅ **2D Mode (Classic)** - Traditional 3x3 game board
- ✅ **3D Mode (Advanced)** - 3x3x3 cube with 27 cells across 3 layers
- ✅ **Mode Toggle** - Seamlessly switch between 2D and 3D gameplay
- ✅ **Two-Player Gameplay** - Alternate turns between X and O in both modes

### 🏆 Game Logic
- ✅ **2D Win Detection** - Detects all 8 winning combinations (rows, columns, diagonals)
- ✅ **3D Win Detection** - Detects all 49 winning combinations in 3D space
  - 9 horizontal rows across 3 layers
  - 9 vertical columns across 3 layers
  - 6 planar diagonals (2 per layer)
  - 12 vertical plane diagonals through layers
  - 9 depth rows (front to back)
  - 4 space diagonals (corner to corner)
- ✅ **Draw Detection** - Identifies when games end in a tie (both modes)
- ✅ **Game Reset** - Start new games without page refresh

### 📊 Score System
- ✅ **Separate Score Tracking** - Independent scores for 2D and 3D modes
- ✅ **Persistent Scores** - Scores saved in localStorage by mode
- ✅ **Score Reset** - Reset scores independently for each mode
- ✅ **Visual Score Display** - Color-coded score cards (X: Blue, O: Red, Draws: Gray)

### 🎨 User Experience
- ✅ **Responsive Design** - Optimized for mobile, tablet, and desktop
- ✅ **Accessible** - Keyboard navigation and screen reader support
- ✅ **Visual Feedback** - Hover effects, winning cell highlights, smooth transitions
- ✅ **Touch-Friendly** - Minimum 44x44px tap targets for mobile
- ✅ **Type-Safe** - Full TypeScript coverage with strict mode

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16+](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5+](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Development Tools
- **[Turbopack](https://turbo.build/)** - Fast bundler (Next.js dev server)
- **[ESLint](https://eslint.org/)** - Code linting
- **[Claude Code](https://claude.ai/)** - AI-powered development agent

### Deployment
- **[Vercel](https://vercel.com/)** - Hosting and deployment platform

---

## 🤖 AI-Driven Development

This project showcases the use of **autonomous agents** throughout the entire development process.

### Agentic Layer Structure

```
.claude/commands/     # Custom Claude command prompts for agents
adws/                 # AI Developer Workflow templates
specs/                # Project specifications and requirements
```

### Agent Workflows

All features are implemented following structured workflows:

1. **📋 PLAN Phase**
   - Analyze requirements from GitHub issues
   - Design technical approach
   - Identify dependencies and edge cases
   - Plan 3D coordinate systems and winning combinations

2. **🔨 BUILD Phase**
   - Implement features following best practices
   - Write type-safe, clean code
   - Apply responsive design patterns
   - Implement complex 3D game logic algorithms

3. **✅ TEST Phase**
   - Validate functionality thoroughly
   - Test responsive behavior (both 2D and 3D layouts)
   - Verify accessibility compliance
   - Test all 49 winning combinations in 3D mode
   - Verify score separation and persistence

4. **📝 DOCUMENT & COMMIT Phase**
   - Update documentation
   - Create descriptive commits with agent attribution
   - Update README and specs

5. **🚀 DEPLOY Phase**
   - Deploy to Vercel production
   - Verify live functionality

### Evidence of Autonomous Development

- **GitHub Issues**: All features tracked as issues with clear acceptance criteria
- **Commit History**: Every commit includes agent attribution
  ```
  Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
  ```
- **Pull Requests**: PRs show agent-driven implementation process
- **Documentation**: Comprehensive workflows in `adws/` directory

---

## 📁 Project Structure

```
tic-tac-toe/
├── .claude/                     # Agent configuration
│   └── commands/               # Custom command prompts
│       ├── implement-feature.md
│       ├── review-code.md
│       ├── test-feature.md
│       └── document-code.md
├── adws/                       # AI Developer Workflows
│   ├── feature-implementation-workflow.md
│   ├── game-logic-workflow.md
│   └── ui-component-workflow.md
├── specs/                      # Project specifications
│   ├── project-overview.md
│   ├── game-rules.md
│   └── technical-requirements.md
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Main game page
│   └── globals.css            # Tailwind imports
├── components/                 # React components
│   ├── GameBoard.tsx          # 2D game grid (3x3)
│   ├── GameBoard3D.tsx        # 3D game board (3x3x3 cube)
│   ├── ModeToggle.tsx         # 2D/3D mode switcher
│   ├── ScoreBoard.tsx         # Score display (both modes)
│   └── GameStatus.tsx         # Game state messages
├── hooks/                      # Custom React hooks
│   ├── useGameLogic.ts        # 2D game state and logic
│   ├── useGameLogic3D.ts      # 3D game state and logic (49 combinations)
│   └── useGameMode.ts         # Mode selection and persistence
├── lib/                        # Utility functions
│   ├── gameLogic.ts           # Win/draw detection
│   └── types.ts               # TypeScript types
└── public/                     # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** 10.x or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/macastro90/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

---

## 🎲 Game Rules

### 2D Mode (Classic)

**Objective:** Get three of your symbols (X or O) in a row - horizontally, vertically, or diagonally.

**How to Play:**
1. Player X goes first
2. Click an empty cell to place your symbol
3. Players alternate turns
4. First to get three in a row wins
5. If all 9 cells are filled with no winner, it's a draw

**Winning Combinations:**
- 3 Horizontal rows
- 3 Vertical columns
- 2 Diagonals
- **Total: 8 winning patterns**

### 3D Mode (Advanced)

**Objective:** Get three of your symbols in a row across a 3x3x3 cube.

**How to Play:**
1. The board consists of 3 layers (Front, Middle, Back)
2. Each layer is a 3x3 grid (27 total cells)
3. Click any cell across the 3 layers to place your symbol
4. Win by getting 3 in a row in ANY direction through 3D space

**Winning Combinations:**
- 9 Horizontal rows (3 per layer)
- 9 Vertical columns (3 per layer)
- 6 Planar diagonals (2 per layer)
- 12 Vertical plane diagonals (through layers)
- 9 Depth rows (front to back)
- 4 Space diagonals (corner to corner through center)
- **Total: 49 winning patterns in 3D space**

For detailed rules, see [specs/game-rules.md](./specs/game-rules.md)

---

## 🔄 Development Workflow

This project demonstrates the **plan → build → test** workflow:

### 1. Issue-Driven Development
Each feature starts as a GitHub issue with:
- Clear description
- Acceptance criteria
- Technical requirements
- Dependencies

### 2. Agent-Powered Implementation
Features are implemented using:
- Custom Claude commands from `.claude/commands/`
- Structured workflows from `adws/`
- Slash commands: `/feature`, `/implement`, `/test`

### 3. Systematic Testing
Every feature undergoes:
- Functional testing (happy path + edge cases)
- Responsive design testing (mobile, tablet, desktop)
- Accessibility testing (keyboard, screen reader)
- Type safety verification (TypeScript build)

### 4. Professional Documentation
All work is documented through:
- Clear commit messages
- Updated README and specs
- Workflow documentation in `adws/`
- Code comments for complex logic

---

## 🧪 Testing

### Manual Testing Checklist

**2D Mode Functional Tests:**
- [x] X and O alternate correctly
- [x] All 8 win conditions detected
- [x] Draw detected when board is full
- [x] Cannot place on occupied cell
- [x] Cannot play after game ends
- [x] Reset button works correctly
- [x] 2D scores tracked separately
- [x] 2D scores persist in localStorage

**3D Mode Functional Tests:**
- [x] X and O alternate correctly in 3D
- [x] All 49 win conditions detected
- [x] Draw detected when all 27 cells filled
- [x] Cannot place on occupied cell
- [x] Cannot play after game ends
- [x] Reset button works correctly
- [x] 3D scores tracked separately
- [x] 3D scores persist in localStorage

**Mode Switching Tests:**
- [x] Toggle switches between 2D and 3D
- [x] 2D scores preserved when switching to 3D
- [x] 3D scores preserved when switching to 2D
- [x] Mode preference persists after page refresh
- [x] No data loss during mode switching

**Responsive Tests:**
- [x] Mobile (320px - 640px) - Both modes
- [x] Tablet (640px - 1024px) - Both modes
- [x] Desktop (1024px+) - Both modes
- [x] 3D layers stack vertically on mobile
- [x] 3D layers display side-by-side on desktop

**Accessibility Tests:**
- [x] Keyboard navigation works (Tab, Enter)
- [x] Focus states visible
- [x] ARIA labels present (including 3D layer info)
- [x] Color contrast sufficient
- [x] Touch targets minimum 44x44px

**Technical Tests:**
- [x] No console errors
- [x] TypeScript build succeeds
- [x] ESLint passes
- [x] Production build works
- [x] localStorage operations correct

---

## 📦 Deployment

This application is deployed on **Vercel** with automatic deployments from the `main` branch.

🌐 **Production URL:** [https://tic-tac-toe-nu-orcin-86.vercel.app](https://tic-tac-toe-nu-orcin-86.vercel.app)

### Deployment Details

- **Platform:** Vercel
- **Framework:** Next.js 16.1.6
- **Region:** Portland, USA (West) - pdx1
- **SSL/HTTPS:** Enabled automatically
- **CDN:** Vercel Edge Network
- **Auto-Deploy:** Enabled for `main` branch
- **Preview Deploys:** Enabled for pull requests

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/macastro90/tic-tac-toe)

Or manually:
1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Import the GitHub repository
3. Configure (Next.js auto-detected)
4. Deploy

Or via CLI:
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 📚 Documentation

### Specifications
- **[Project Overview](./specs/project-overview.md)** - High-level project description
- **[Game Rules](./specs/game-rules.md)** - Complete game rules for 2D and 3D modes
- **[Technical Requirements](./specs/technical-requirements.md)** - Detailed tech specs

### AI Developer Workflows
- **[Feature Workflow](./adws/feature-implementation-workflow.md)** - How features are built
- **[Game Logic Workflow](./adws/game-logic-workflow.md)** - Game algorithm implementation
- **[UI Component Workflow](./adws/ui-component-workflow.md)** - Component development process
- **[Issue Creation Workflow](./adws/issue-creation-workflow.md)** - Automated issue generation

### Key Implementation Details

**3D Game Logic:**
- 3x3x3 cube represented as flat array of 27 cells
- Index mapping: `layer * 9 + row * 3 + col`
- 49 winning combinations verified and tested
- Separate state management from 2D mode

**Score System:**
- Independent localStorage keys for 2D and 3D
- Score persistence across page refreshes
- Mode-specific reset functionality
- Real-time score updates on win/draw

---

## 🤝 Contributing

This project demonstrates AI-driven development. To contribute:

1. Review the workflows in `adws/`
2. Create a GitHub issue describing the feature/fix
3. Use Claude Code with the commands in `.claude/commands/`
4. Follow the **plan → build → test** workflow
5. Include agent attribution in commits
6. Create a pull request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **Developed with:** [Claude Code](https://claude.ai/) - AI-powered autonomous development
- **Framework:** [Next.js](https://nextjs.org/) by Vercel
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 📊 Project Stats

- **Lines of Code:** ~2,500+ (TypeScript, React, CSS)
- **Components:** 6 React components
  - GameBoard (2D), GameBoard3D (3D), ModeToggle, ScoreBoard, GameStatus, Layout
- **Custom Hooks:** 3 game logic hooks
  - useGameLogic (2D - 8 combinations)
  - useGameLogic3D (3D - 49 combinations)
  - useGameMode (mode persistence)
- **Game Modes:** 2 (2D Classic + 3D Advanced)
- **Total Winning Combinations:** 57 (8 in 2D + 49 in 3D)
- **GitHub Issues:** 13 (all features tracked and implemented)
- **Commits:** 10+ with full agent attribution
- **Agent Attribution:** 100% of commits
- **Test Coverage:** Manual testing across all scenarios (both modes)
- **localStorage Keys:** 3 (2D scores, 3D scores, mode preference)

---

## 🔗 Links

- **Repository:** https://github.com/macastro90/tic-tac-toe
- **Live Demo:** https://tic-tac-toe-nu-orcin-86.vercel.app
- **Issues:** https://github.com/macastro90/tic-tac-toe/issues
- **Pull Requests:** https://github.com/macastro90/tic-tac-toe/pulls

---

<div align="center">

**Built with AI Agents | Powered by Claude Code**

Made with ❤️ using autonomous development workflows

[⬆ back to top](#-tic-tac-toe-ta-te-ti)

</div>
