# 🎮 Tic-Tac-Toe (Ta-Te-Ti)

A modern Tic-Tac-Toe game built with Next.js, TypeScript, and Tailwind CSS, developed entirely using **AI Developer Workflows** and **autonomous agents**.

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat&logo=vercel)](https://vercel.com)

🚀 **Live Demo:** [Coming Soon]

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

- ✅ **Classic 3x3 Game Board** - Clean, responsive grid layout
- ✅ **Two-Player Gameplay** - Alternate turns between X and O
- ✅ **Win Detection** - Detects all 8 winning combinations (rows, columns, diagonals)
- ✅ **Draw Detection** - Identifies when the game ends in a tie
- ✅ **Game Reset** - Start a new game without page refresh
- ✅ **Score Tracking** - Persistent score tracking across multiple games
- ✅ **Responsive Design** - Optimized for mobile, tablet, and desktop
- ✅ **Accessible** - Keyboard navigation and screen reader support
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

2. **🔨 BUILD Phase**
   - Implement features following best practices
   - Write type-safe, clean code
   - Apply responsive design patterns

3. **✅ TEST Phase**
   - Validate functionality thoroughly
   - Test responsive behavior
   - Verify accessibility compliance

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
│   ├── GameBoard.tsx          # 3x3 game grid
│   ├── ScoreBoard.tsx         # Score display
│   └── GameStatus.tsx         # Game state messages
├── hooks/                      # Custom React hooks
│   ├── useGameLogic.ts        # Game state and logic
│   └── useScore.ts            # Score tracking
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

### Objective
Get three of your symbols (X or O) in a row - horizontally, vertically, or diagonally.

### How to Play
1. Player X goes first
2. Click an empty cell to place your symbol
3. Players alternate turns
4. First to get three in a row wins
5. If all cells are filled with no winner, it's a draw

### Winning Combinations
- **3 Horizontal rows**
- **3 Vertical columns**
- **2 Diagonals**
- **Total: 8 winning patterns**

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

**Functional Tests:**
- [ ] X and O alternate correctly
- [ ] All 8 win conditions detected
- [ ] Draw detected when board is full
- [ ] Cannot place on occupied cell
- [ ] Cannot play after game ends
- [ ] Reset button works correctly

**Responsive Tests:**
- [ ] Mobile (320px - 640px) ✓
- [ ] Tablet (640px - 1024px) ✓
- [ ] Desktop (1024px+) ✓

**Accessibility Tests:**
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Focus states visible
- [ ] ARIA labels present
- [ ] Color contrast sufficient

**Technical Tests:**
- [ ] No console errors
- [ ] TypeScript build succeeds
- [ ] ESLint passes
- [ ] Production build works

---

## 📦 Deployment

This application is deployed on **Vercel** with automatic deployments from the `main` branch.

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/macastro90/tic-tac-toe)

Or manually:
1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Import the GitHub repository
3. Configure (Next.js auto-detected)
4. Deploy

---

## 📚 Documentation

- **[Project Overview](./specs/project-overview.md)** - High-level project description
- **[Game Rules](./specs/game-rules.md)** - Complete game rules and logic
- **[Technical Requirements](./specs/technical-requirements.md)** - Detailed tech specs
- **[Feature Workflow](./adws/feature-implementation-workflow.md)** - How features are built
- **[Game Logic Workflow](./adws/game-logic-workflow.md)** - Game algorithm implementation
- **[UI Component Workflow](./adws/ui-component-workflow.md)** - Component development process

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

- **Lines of Code:** ~1,500 (estimated)
- **Components:** 3-5 React components
- **Hooks:** 2 custom hooks
- **GitHub Issues:** 9 (tracking all features)
- **Agent Attribution:** 100% of commits
- **Test Coverage:** Manual testing across all scenarios

---

## 🔗 Links

- **Repository:** https://github.com/macastro90/tic-tac-toe
- **Live Demo:** [Coming Soon]
- **Issues:** https://github.com/macastro90/tic-tac-toe/issues
- **Pull Requests:** https://github.com/macastro90/tic-tac-toe/pulls

---

<div align="center">

**Built with AI Agents | Powered by Claude Code**

Made with ❤️ using autonomous development workflows

[⬆ back to top](#-tic-tac-toe-ta-te-ti)

</div>
