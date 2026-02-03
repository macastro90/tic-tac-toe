/**
 * Type definitions for Tic-Tac-Toe game
 */

/**
 * Represents a cell value - can be 'X', 'O', or null (empty)
 */
export type Cell = 'X' | 'O' | null;

/**
 * Game board represented as an array of 9 cells
 */
export type Board = Cell[];

/**
 * Player symbol
 */
export type Player = 'X' | 'O';

/**
 * Game status
 */
export type GameStatus = 'playing' | 'won' | 'draw';

/**
 * Complete game state
 */
export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  isGameOver: boolean;
  moveCount: number;
}

/**
 * Score tracking
 */
export interface Score {
  x: number;
  o: number;
  draws: number;
}

/**
 * Props for GameBoard component
 */
export interface GameBoardProps {
  board: Board;
  onCellClick: (index: number) => void;
  disabled?: boolean;
  winningLine?: number[] | null;
}

/**
 * Props for Cell component (if needed)
 */
export interface CellProps {
  value: Cell;
  onClick: () => void;
  disabled?: boolean;
  isWinning?: boolean;
}

/**
 * Props for ScoreBoard component
 */
export interface ScoreBoardProps {
  score: Score;
  onResetScore?: () => void;
}

/**
 * Props for GameStatus component
 */
export interface GameStatusProps {
  status: GameStatus;
  winner: Player | null;
  currentPlayer: Player;
  onReset: () => void;
}
