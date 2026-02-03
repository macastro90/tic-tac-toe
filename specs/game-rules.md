# Tic-Tac-Toe Game Rules

## Game Overview
Tic-Tac-Toe (Ta-Te-Ti) is a two-player game played on a 3x3 grid where players take turns marking cells with their symbol (X or O) with the goal of getting three of their symbols in a row.

---

## Game Setup

### Board
- 3x3 grid (9 cells total)
- All cells start empty
- Cells are numbered 0-8:
  ```
  0 | 1 | 2
  ---------
  3 | 4 | 5
  ---------
  6 | 7 | 8
  ```

### Players
- **Player 1**: Symbol = X (starts first)
- **Player 2**: Symbol = O

---

## Game Rules

### 1. Turn Order
- Player X always goes first
- Players alternate turns
- Once a player places their symbol, the turn passes to the other player
- Players cannot skip their turn

### 2. Making a Move
- On their turn, a player must place their symbol in an empty cell
- A player cannot place their symbol in an occupied cell
- Once placed, a symbol cannot be moved or removed
- Each cell can only contain one symbol

### 3. Valid Moves
A move is valid if:
- The cell is empty (contains no X or O)
- It is the player's turn
- The game is not over (no winner or draw)

### 4. Invalid Moves
A move is invalid if:
- The cell is already occupied
- The game has ended
- It is not the player's turn

---

## Winning Conditions

### A player wins by getting three of their symbols in a row:

**Horizontal Wins (3 possibilities)**
```
X | X | X       Row 0 (cells 0, 1, 2)
---------
  |   |

  |   |         Row 1 (cells 3, 4, 5)
---------
X | X | X

  |   |
---------       Row 2 (cells 6, 7, 8)
X | X | X
```

**Vertical Wins (3 possibilities)**
```
X |   |         Col 0 (cells 0, 3, 6)
---------
X |   |
---------
X |   |

  | X |         Col 1 (cells 1, 4, 7)
---------
  | X |
---------
  | X |

  |   | X       Col 2 (cells 2, 5, 8)
---------
  |   | X
---------
  |   | X
```

**Diagonal Wins (2 possibilities)**
```
X |   |         Main diagonal (cells 0, 4, 8)
---------
  | X |
---------
  |   | X

  |   | X       Anti-diagonal (cells 2, 4, 6)
---------
  | X |
---------
X |   |
```

### Total Winning Combinations: 8

---

## Draw Condition

A draw (tie) occurs when:
- All 9 cells are filled with symbols
- **AND** no player has three in a row
- Neither player wins

### Example Draw Board:
```
X | O | X
---------
X | O | X
---------
O | X | O
```

---

## Game End

The game ends when:
1. **A player wins** - Three in a row achieved
2. **Draw** - Board is full with no winner

### Post-Game State
- No more moves are allowed
- The winner is announced (X or O)
- Or draw is announced
- Players can start a new game (reset)

---

## Game States

### 1. Initial State
- Board: All cells empty
- Current Player: X
- Game Status: Playing
- Winner: None

### 2. Playing State
- At least one move has been made
- Game is not over
- Players alternate turns
- Game Status: Playing

### 3. Won State
- A player has three in a row
- Winner is declared (X or O)
- No more moves allowed
- Game Status: Won

### 4. Draw State
- All cells filled
- No winner exists
- No more moves allowed
- Game Status: Draw

---

## Reset / New Game

At any point, players can start a new game:
- Board returns to empty (all cells null)
- Current player resets to X
- Game status returns to Playing
- Winner and draw state cleared
- Score history persists (if tracking enabled)

---

## Optional: Score Tracking

If score tracking is implemented:
- Track total wins for Player X
- Track total wins for Player O
- Track total draws
- Scores persist across multiple games
- Scores can be reset independently

---

## Implementation Notes

### Data Structures

**Board Representation:**
```typescript
type Cell = 'X' | 'O' | null;
type Board = Cell[]; // Array of 9 cells
```

**Game State:**
```typescript
interface GameState {
  board: Board;                    // Current board state
  currentPlayer: 'X' | 'O';       // Whose turn it is
  winner: 'X' | 'O' | null;       // Winner if game ended
  isDraw: boolean;                 // True if draw
  isGameOver: boolean;             // True if won or draw
  moveCount: number;               // Number of moves made (0-9)
}
```

**Winning Patterns:**
```typescript
const WINNING_PATTERNS = [
  [0, 1, 2], // Row 0
  [3, 4, 5], // Row 1
  [6, 7, 8], // Row 2
  [0, 3, 6], // Col 0
  [1, 4, 7], // Col 1
  [2, 5, 8], // Col 2
  [0, 4, 8], // Diagonal \
  [2, 4, 6], // Diagonal /
];
```

---

## Edge Cases

### 1. First Move
- Must be Player X
- Can be any cell
- Board transitions from empty to playing state

### 2. Last Move
- Cell 9 is filled
- Check for winner first
- If no winner, it's a draw

### 3. Winning Move
- Game ends immediately
- Winner is announced
- No draw check needed
- Prevent further moves

### 4. Multiple Resets
- Each reset creates a fresh game
- Scores persist (if tracking enabled)
- No side effects from previous games

### 5. Rapid Clicking
- Prevent multiple moves per turn
- Disable board during transitions
- Validate each move independently

---

## Testing Scenarios

### Basic Gameplay
1. X makes first move
2. O makes second move
3. Players alternate correctly
4. Game continues until end

### Win Scenarios
Test all 8 winning patterns for both X and O (16 total tests)

### Draw Scenario
Fill all cells with no three in a row

### Invalid Move Prevention
- Try to play on occupied cell
- Try to play after game ends
- Try to play out of turn

### Reset Functionality
- Reset during active game
- Reset after win
- Reset after draw

---

## Success Criteria

A correctly implemented game must:
- ✅ Enforce all game rules
- ✅ Detect all 8 winning patterns
- ✅ Correctly identify draws
- ✅ Prevent invalid moves
- ✅ Alternate turns properly
- ✅ Allow game reset
- ✅ Maintain score (if implemented)
- ✅ End game appropriately
- ✅ Provide clear feedback to players
