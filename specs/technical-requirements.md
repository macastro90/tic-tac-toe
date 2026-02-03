# Technical Requirements

## Technology Stack

### Frontend Framework
- **Next.js 16+** (App Router)
  - React 19
  - Server Components where appropriate
  - Client Components for interactivity
  - File-based routing

### Language
- **TypeScript 5+**
  - Strict mode enabled
  - Full type coverage
  - No `any` types (unless absolutely necessary)
  - Interfaces for all data structures

### Styling
- **Tailwind CSS**
  - Mobile-first responsive design
  - Utility-first approach
  - No custom CSS files
  - Dark mode support (optional)

### Build Tools
- **Turbopack** (Next.js dev server)
- **npm** for package management
- **ESLint** for code quality
- **TypeScript compiler** for type checking

---

## Project Structure

```
tic-tac-toe/
├── .claude/                 # Claude Code configuration
│   └── commands/           # Custom command prompts
│       ├── implement-feature.md
│       ├── review-code.md
│       ├── test-feature.md
│       └── document-code.md
├── adws/                   # AI Developer Workflows
│   ├── feature-implementation-workflow.md
│   ├── game-logic-workflow.md
│   └── ui-component-workflow.md
├── specs/                  # Project specifications
│   ├── project-overview.md
│   ├── game-rules.md
│   └── technical-requirements.md
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (main game)
│   └── globals.css        # Tailwind imports
├── components/             # React components
│   ├── GameBoard.tsx      # 3x3 game grid
│   ├── Cell.tsx           # Individual cell (optional)
│   ├── ScoreBoard.tsx     # Score display
│   └── GameStatus.tsx     # Winner/draw messages
├── hooks/                  # Custom React hooks
│   ├── useGameLogic.ts    # Game state and logic
│   └── useScore.ts        # Score tracking
├── lib/                    # Utility functions
│   ├── gameLogic.ts       # Win/draw detection
│   └── types.ts           # TypeScript types
├── public/                 # Static assets
│   └── favicon.ico
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

---

## TypeScript Requirements

### Type Definitions

**Core Game Types:**
```typescript
// lib/types.ts

export type Cell = 'X' | 'O' | null;

export type Board = Cell[];

export type Player = 'X' | 'O';

export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  isGameOver: boolean;
  moveCount: number;
}

export interface Score {
  x: number;
  o: number;
  draws: number;
}

export interface GameBoardProps {
  board: Board;
  onCellClick: (index: number) => void;
  disabled?: boolean;
  winningLine?: number[] | null;
}

export interface CellProps {
  value: Cell;
  onClick: () => void;
  disabled?: boolean;
  isWinning?: boolean;
}

export interface ScoreBoardProps {
  score: Score;
  onResetScore?: () => void;
}

export interface GameStatusProps {
  status: GameStatus;
  winner: Player | null;
  currentPlayer: Player;
  onReset: () => void;
}
```

### Configuration
```typescript
// tsconfig.json requirements
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

---

## Component Requirements

### 1. GameBoard Component
**Responsibilities:**
- Render 3x3 grid
- Handle cell clicks
- Display X and O symbols
- Visual feedback (hover, active)
- Highlight winning line (optional)

**Props:**
```typescript
interface GameBoardProps {
  board: Board;
  onCellClick: (index: number) => void;
  disabled?: boolean;
  winningLine?: number[] | null;
}
```

**Requirements:**
- Must be a Client Component ('use client')
- Responsive design (mobile/tablet/desktop)
- Touch-friendly on mobile (min 44x44px targets)
- Keyboard accessible
- ARIA labels for accessibility

### 2. Cell Component (Optional)
**Responsibilities:**
- Display single cell content
- Handle click event
- Show hover/active states
- Indicate if winning cell

**Props:**
```typescript
interface CellProps {
  value: Cell;
  onClick: () => void;
  disabled?: boolean;
  isWinning?: boolean;
}
```

### 3. ScoreBoard Component
**Responsibilities:**
- Display wins for X, O, and draws
- Optional: Reset score button
- Clear, readable layout

**Props:**
```typescript
interface ScoreBoardProps {
  score: Score;
  onResetScore?: () => void;
}
```

### 4. GameStatus Component
**Responsibilities:**
- Display current player's turn
- Announce winner
- Announce draw
- Provide reset button

**Props:**
```typescript
interface GameStatusProps {
  status: GameStatus;
  winner: Player | null;
  currentPlayer: Player;
  onReset: () => void;
}
```

---

## State Management

### Custom Hooks

**useGameLogic Hook:**
```typescript
export function useGameLogic() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const makeMove = (index: number): void => { /* ... */ };
  const resetGame = (): void => { /* ... */ };
  const isGameOver = winner !== null || isDraw;

  return {
    board,
    currentPlayer,
    winner,
    isDraw,
    isGameOver,
    winningLine,
    makeMove,
    resetGame,
  };
}
```

**useScore Hook:**
```typescript
export function useScore() {
  const [score, setScore] = useState<Score>({
    x: 0,
    o: 0,
    draws: 0,
  });

  const updateScore = (result: 'X' | 'O' | 'draw'): void => { /* ... */ };
  const resetScore = (): void => { /* ... */ };

  // Optional: Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tic-tac-toe-score');
    if (saved) setScore(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('tic-tac-toe-score', JSON.stringify(score));
  }, [score]);

  return { score, updateScore, resetScore };
}
```

---

## Styling Requirements

### Tailwind Configuration
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom colors if needed
    },
  },
  plugins: [],
};

export default config;
```

### Responsive Breakpoints
- **Mobile**: < 640px (base styles)
- **Tablet**: 640px - 1024px (sm: and md:)
- **Desktop**: 1024px+ (lg: and xl:)

### Design Guidelines
- **Colors**:
  - X: Blue (text-blue-600)
  - O: Red (text-red-600)
  - Board: White/Gray (bg-white, border-gray-300)
  - Background: Light gray (bg-gray-100)
- **Spacing**: Consistent gap and padding (gap-2, p-4, etc.)
- **Typography**: Clear, readable font sizes
- **Touch Targets**: Minimum 44x44px on mobile
- **Focus States**: Visible focus rings for keyboard navigation

---

## Performance Requirements

### Bundle Size
- Keep bundle size reasonable (< 200KB gzipped)
- Next.js automatic code splitting
- No unnecessary dependencies

### Runtime Performance
- Smooth interactions (60fps)
- No unnecessary re-renders
- Fast initial load (< 2 seconds)

### Build Requirements
- `npm run build` must succeed without errors
- No TypeScript errors
- No ESLint errors (warnings acceptable)
- Production build optimized

---

## Browser Support

### Target Browsers
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### Progressive Enhancement
- Core functionality works without JavaScript (minimal)
- Enhanced with JavaScript for full experience

---

## Accessibility Requirements (WCAG 2.1 AA)

### Keyboard Navigation
- All interactive elements focusable with Tab
- Enter/Space activates buttons
- Visible focus indicators

### Screen Readers
- Semantic HTML (button, main, etc.)
- ARIA labels where needed
- Announce game state changes

### Visual
- Color contrast ratio ≥ 4.5:1 for text
- Don't rely on color alone
- Clear visual feedback

### Touch Targets
- Minimum 44x44px touch areas
- Adequate spacing between targets

---

## Testing Requirements

### Manual Testing
- All features tested on:
  - Mobile device (real or DevTools)
  - Tablet (DevTools)
  - Desktop browser
- All game scenarios tested:
  - Win (all 8 patterns)
  - Draw
  - Reset
  - Score tracking

### Browser Testing
- Test in Chrome/Edge
- Test in Firefox
- Test in Safari (if on Mac)

### Accessibility Testing
- Keyboard navigation test
- Screen reader test (basic)
- Color contrast check

### Build Testing
- `npm run dev` works
- `npm run build` succeeds
- Production build works locally

---

## Deployment Requirements

### Vercel Configuration
- Framework: Next.js (auto-detected)
- Build Command: `npm run build`
- Output Directory: `.next` (default)
- Install Command: `npm install`
- Node Version: 20.x

### Environment
- No environment variables needed for MVP
- All configuration static

### Domain
- Default: `*.vercel.app`
- Optional: Custom domain

### SSL
- HTTPS enabled by default (Vercel)

---

## Git & GitHub Requirements

### Commits
- Clear, descriptive commit messages
- Conventional Commits format preferred:
  - `feat:` for features
  - `fix:` for bug fixes
  - `docs:` for documentation
  - `chore:` for maintenance
- Include agent attribution:
  ```
  Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
  ```

### Branches
- `main` branch for production
- Feature branches optional: `feature/issue-X-description`
- Pull requests for feature implementation (optional)

### Issues
- All features tracked as GitHub issues
- Clear acceptance criteria
- Reference issues in commits

---

## Code Quality Standards

### ESLint
- Next.js recommended config
- No errors in production build
- Warnings minimized

### TypeScript
- Strict mode enabled
- No `any` types without justification
- All props and state typed
- Export interfaces for reusability

### Code Style
- Consistent formatting
- Meaningful variable names
- Small, focused functions/components
- Comments only for complex logic

### Best Practices
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple, Stupid)
- YAGNI (You Aren't Gonna Need It)
- Single Responsibility Principle
- Composition over inheritance

---

## Success Criteria

A successful implementation must:
- ✅ Build without errors (`npm run build`)
- ✅ Run locally (`npm run dev`)
- ✅ Be fully typed with TypeScript
- ✅ Be fully responsive (mobile/tablet/desktop)
- ✅ Be accessible (keyboard, screen reader)
- ✅ Follow all game rules correctly
- ✅ Have clear, professional UI
- ✅ Deploy successfully to Vercel
- ✅ Load quickly (< 2 seconds)
- ✅ Work in all major browsers
- ✅ Demonstrate agent-driven development

---

## Future Enhancements (Out of Scope)

These are NOT required for MVP:
- Online multiplayer
- AI opponent
- Animations/transitions
- Sound effects
- Game history/undo
- Custom board sizes
- Themes/skins
- Leaderboards
- User accounts
