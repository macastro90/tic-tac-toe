# Game Logic Implementation Workflow

## Purpose
Specialized workflow for implementing game logic features in Tic-Tac-Toe, including turn management, win detection, and game state.

---

## Phase 1: PLAN - Game Logic Design 📋

### Step 1: Understand Game Rules
**Agent Actions:**
1. Review Tic-Tac-Toe rules in `specs/game-rules.md`
2. Identify all game states:
   - Playing
   - Won (X or O)
   - Draw
3. List all game actions:
   - Make move
   - Check winner
   - Check draw
   - Reset game

### Step 2: Data Structure Design
**Agent Actions:**
Design the game state structure:

```typescript
// Board representation
type Cell = 'X' | 'O' | null;
type Board = Cell[]; // Array of 9 cells

// Game state
interface GameState {
  board: Board;
  currentPlayer: 'X' | 'O';
  winner: 'X' | 'O' | null;
  isDraw: boolean;
  isGameOver: boolean;
  moveCount: number;
}
```

### Step 3: Algorithm Planning
**Agent Actions:**
Plan algorithms for:

1. **Win Detection**
   - 3 horizontal wins (rows 0-2, 3-5, 6-8)
   - 3 vertical wins (cols 0, 1, 2)
   - 2 diagonal wins (0-4-8, 2-4-6)
   - Total: 8 winning combinations

2. **Draw Detection**
   - All 9 cells filled
   - No winner exists

3. **Move Validation**
   - Cell is empty (null)
   - Game is not over

---

## Phase 2: BUILD - Implementation 🔨

### Step 1: Create Game Logic Hook
**Agent Actions:**

```typescript
// hooks/useGameLogic.ts
export function useGameLogic() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<'X' | 'O' | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  // Game logic functions
  const makeMove = (index: number) => { /* ... */ };
  const checkWinner = () => { /* ... */ };
  const checkDraw = () => { /* ... */ };
  const resetGame = () => { /* ... */ };

  return { board, currentPlayer, winner, isDraw, makeMove, resetGame };
}
```

### Step 2: Implement Win Detection
**Agent Actions:**

```typescript
function checkWinner(board: Board): 'X' | 'O' | null {
  // Winning combinations (indices)
  const winPatterns = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Col 1
    [1, 4, 7], // Col 2
    [2, 5, 8], // Col 3
    [0, 4, 8], // Diagonal \
    [2, 4, 6], // Diagonal /
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}
```

### Step 3: Implement Move Logic
**Agent Actions:**

```typescript
const makeMove = (index: number) => {
  // Validation
  if (board[index] || winner || isDraw) return;

  // Update board
  const newBoard = [...board];
  newBoard[index] = currentPlayer;
  setBoard(newBoard);

  // Check for winner
  const gameWinner = checkWinner(newBoard);
  if (gameWinner) {
    setWinner(gameWinner);
    return;
  }

  // Check for draw
  if (newBoard.every(cell => cell !== null)) {
    setIsDraw(true);
    return;
  }

  // Switch player
  setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
};
```

### Step 4: Implement Reset Logic
**Agent Actions:**

```typescript
const resetGame = () => {
  setBoard(Array(9).fill(null));
  setCurrentPlayer('X');
  setWinner(null);
  setIsDraw(false);
};
```

---

## Phase 3: TEST - Game Logic Validation ✅

### Test Case 1: Win Detection - Horizontal
**Agent Actions:**
```
Test: Player X wins with top row
Board: X X X
       - - -
       - - -
Expected: winner = 'X'
```

### Test Case 2: Win Detection - Vertical
**Agent Actions:**
```
Test: Player O wins with first column
Board: O X -
       O X -
       O - -
Expected: winner = 'O'
```

### Test Case 3: Win Detection - Diagonal
**Agent Actions:**
```
Test: Player X wins with diagonal
Board: X O O
       - X -
       - - X
Expected: winner = 'X'
```

### Test Case 4: Draw Detection
**Agent Actions:**
```
Test: Game ends in draw
Board: X O X
       X O X
       O X O
Expected: isDraw = true, winner = null
```

### Test Case 5: Turn Alternation
**Agent Actions:**
```
Test: Players alternate correctly
Move 1: X plays → currentPlayer = 'O'
Move 2: O plays → currentPlayer = 'X'
Move 3: X plays → currentPlayer = 'O'
Expected: Players alternate each move
```

### Test Case 6: Invalid Move Prevention
**Agent Actions:**
```
Test: Cannot play on occupied cell
Board: X - -
       - - -
       - - -
Action: Try to place O on cell 0
Expected: Move rejected, board unchanged
```

### Test Case 7: Post-Game Move Prevention
**Agent Actions:**
```
Test: Cannot move after game ends
Board: X X X (winner = 'X')
       - - -
       - - -
Action: Try to place O
Expected: Move rejected
```

### Test Case 8: Reset Functionality
**Agent Actions:**
```
Test: Reset works correctly
Initial: Game in won/draw state
Action: Call resetGame()
Expected:
  - board = [null, null, null, null, null, null, null, null, null]
  - currentPlayer = 'X'
  - winner = null
  - isDraw = false
```

---

## Phase 4: INTEGRATION ⚡

### Step 1: Connect to UI Components
**Agent Actions:**
1. Pass game state to GameBoard component
2. Wire up makeMove to cell click handlers
3. Display winner/draw messages
4. Connect reset button

### Step 2: Verify Integration
**Agent Actions:**
1. Click cells and verify moves work
2. Play complete game to win
3. Play complete game to draw
4. Test reset button
5. Verify UI updates match game state

---

## Success Criteria
- ✅ All 8 winning combinations detected
- ✅ Draw detection works correctly
- ✅ Turn alternation is correct
- ✅ Invalid moves prevented
- ✅ Post-game moves blocked
- ✅ Reset functionality works
- ✅ UI integration complete
- ✅ No console errors
- ✅ Type-safe implementation

## Notes for Autonomous Agents
This workflow ensures robust game logic by:
- Systematic algorithm design
- Comprehensive test coverage
- Clear validation rules
- Proper state management
- Type-safe implementation with TypeScript

The commit history should show clear, logical progression of feature implementation with proper agent attribution.
