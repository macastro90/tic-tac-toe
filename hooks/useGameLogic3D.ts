'use client';

import { useState, useEffect } from 'react';
import { Board, Player, Cell, Score } from '@/lib/types';

/**
 * All possible winning combinations in 3D Tic-Tac-Toe (3x3x3 cube)
 *
 * Total: 49 winning combinations
 * - 9 horizontal rows per layer (3 layers) = 27
 * - 9 vertical columns per layer (3 layers) = 27 (9 are pillars, counted once)
 * - 12 planar diagonals (4 per layer × 3 layers)
 * - 9 depth rows (front to back)
 * - 4 space diagonals (corner to corner through center)
 *
 * Board indices (0-26):
 * Layer 0 (front):  0  1  2
 *                   3  4  5
 *                   6  7  8
 *
 * Layer 1 (middle): 9  10 11
 *                   12 13 14
 *                   15 16 17
 *
 * Layer 2 (back):   18 19 20
 *                   21 22 23
 *                   24 25 26
 */
const WINNING_COMBINATIONS_3D: number[][] = [
  // === HORIZONTAL ROWS (9 per layer × 3 layers = 27) ===
  // But we only count unique ones = 9 horizontal per layer

  // Layer 0 - Horizontal rows
  [0, 1, 2],    // Top row
  [3, 4, 5],    // Middle row
  [6, 7, 8],    // Bottom row

  // Layer 1 - Horizontal rows
  [9, 10, 11],   // Top row
  [12, 13, 14],  // Middle row
  [15, 16, 17],  // Bottom row

  // Layer 2 - Horizontal rows
  [18, 19, 20],  // Top row
  [21, 22, 23],  // Middle row
  [24, 25, 26],  // Bottom row

  // === VERTICAL COLUMNS (9 per layer × 3 layers, but 9 are through all layers) ===
  // Layer 0 - Vertical columns
  [0, 3, 6],     // Left column
  [1, 4, 7],     // Middle column
  [2, 5, 8],     // Right column

  // Layer 1 - Vertical columns
  [9, 12, 15],   // Left column
  [10, 13, 16],  // Middle column
  [11, 14, 17],  // Right column

  // Layer 2 - Vertical columns
  [18, 21, 24],  // Left column
  [19, 22, 25],  // Middle column
  [20, 23, 26],  // Right column

  // === PLANAR DIAGONALS (2 per layer × 3 layers = 6) ===
  // Layer 0 - Diagonals
  [0, 4, 8],     // Top-left to bottom-right
  [2, 4, 6],     // Top-right to bottom-left

  // Layer 1 - Diagonals
  [9, 13, 17],   // Top-left to bottom-right
  [11, 13, 15],  // Top-right to bottom-left

  // Layer 2 - Diagonals
  [18, 22, 26],  // Top-left to bottom-right
  [20, 22, 24],  // Top-right to bottom-left

  // === VERTICAL PLANE DIAGONALS (Through layers, 12 combinations) ===
  // Front plane (layer 0) diagonals through depth
  [0, 12, 24],   // Top-left through middle to back-bottom-left
  [2, 12, 22],   // Top-right through middle to back-bottom-right
  [6, 12, 18],   // Bottom-left through middle to back-top-left
  [8, 12, 20],   // Bottom-right through middle to back-top-right

  // Middle plane diagonals (front to back)
  [1, 13, 25],   // Top-middle
  [7, 13, 19],   // Bottom-middle
  [3, 13, 23],   // Middle-left
  [5, 13, 21],   // Middle-right

  // Side plane diagonals (4 more)
  [0, 10, 20],   // Left side: front-top to back-top
  [6, 16, 26],   // Left side: front-bottom to back-bottom
  [2, 10, 18],   // Right side: front-top to back-top
  [8, 16, 24],   // Right side: front-bottom to back-bottom

  // === DEPTH ROWS (Front to back, 9 combinations) ===
  // Top 3
  [0, 9, 18],    // Top-left
  [1, 10, 19],   // Top-middle
  [2, 11, 20],   // Top-right

  // Middle 3
  [3, 12, 21],   // Middle-left
  [4, 13, 22],   // Center
  [5, 14, 23],   // Middle-right

  // Bottom 3
  [6, 15, 24],   // Bottom-left
  [7, 16, 25],   // Bottom-middle
  [8, 17, 26],   // Bottom-right

  // === SPACE DIAGONALS (Corner to corner, 4 combinations) ===
  [0, 13, 26],   // Front-top-left to back-bottom-right
  [2, 13, 24],   // Front-top-right to back-bottom-left
  [6, 13, 20],   // Front-bottom-left to back-top-right
  [8, 13, 18],   // Front-bottom-right to back-top-left
];

/**
 * Custom hook for managing 3D Tic-Tac-Toe game logic
 *
 * Handles:
 * - 3D board state management (3x3x3 = 27 cells)
 * - Turn alternation between players
 * - Move validation in 3D space
 * - Win detection (49 possible combinations)
 * - Draw detection
 * - Game reset
 *
 * @returns Game state and control functions for 3D gameplay
 */
export function useGameLogic3D() {
  // 3D Board state: flat array of 27 cells (easier than 3D array)
  // Index = layer * 9 + row * 3 + col
  const [board3D, setBoard3D] = useState<Cell[]>(Array(27).fill(null));

  // Current player: X always starts
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');

  // Move count for tracking game progress
  const [moveCount, setMoveCount] = useState<number>(0);

  // Winner state: null if no winner yet
  const [winner, setWinner] = useState<Player | null>(null);

  // Winning line for highlighting in 3D space
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  // Draw state: true if game ends in a draw
  const [isDraw, setIsDraw] = useState<boolean>(false);

  // Score tracking: persists across games during session (separate from 2D scores)
  const [score, setScore] = useState<Score>({ x: 0, o: 0, draws: 0 });

  // Load scores from localStorage on mount (separate key for 3D)
  useEffect(() => {
    const savedScore = localStorage.getItem('tic-tac-toe-score-3d');
    if (savedScore) {
      try {
        setScore(JSON.parse(savedScore));
      } catch (error) {
        console.error('Failed to load 3D score from localStorage:', error);
      }
    }
  }, []);

  // Save scores to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tic-tac-toe-score-3d', JSON.stringify(score));
  }, [score]);

  /**
   * Check if there's a winner on the 3D board
   *
   * Checks all 49 possible winning combinations in 3D space
   *
   * @param boardToCheck - The 3D board to check for a winner
   * @returns Object with winner and winning line, or null if no winner
   */
  const checkWinner3D = (boardToCheck: Cell[]): { winner: Player; line: number[] } | null => {
    for (const combination of WINNING_COMBINATIONS_3D) {
      const [a, b, c] = combination;

      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return {
          winner: boardToCheck[a] as Player,
          line: combination,
        };
      }
    }

    return null;
  };

  /**
   * Make a move on the 3D board
   *
   * Validates the move and updates the game state:
   * 1. Checks if game is already over (win or draw)
   * 2. Checks if cell is empty
   * 3. Places current player's symbol
   * 4. Checks for winner (all 49 combinations)
   * 5. Checks for draw (all 27 cells filled)
   * 6. Increments move count
   * 7. Alternates to next player
   *
   * @param index - Cell index (0-26)
   */
  const makeMove3D = (index: number) => {
    // Validation: Game is already over (win or draw)
    if (winner !== null || isDraw) {
      return; // Game over - no more moves allowed
    }

    // Validation: Check if cell is already occupied
    if (board3D[index] !== null) {
      return; // Invalid move - cell occupied
    }

    // Validation: Check if index is within bounds (0-26)
    if (index < 0 || index > 26) {
      return; // Invalid move - out of bounds
    }

    // Create new board with the move
    const newBoard = [...board3D];
    newBoard[index] = currentPlayer;

    // Update board state
    setBoard3D(newBoard);

    // Check for winner after this move (all 49 combinations)
    const winResult = checkWinner3D(newBoard);
    if (winResult) {
      setWinner(winResult.winner);
      setWinningLine(winResult.line);
      // Update score for the winner
      setScore(prevScore => ({
        ...prevScore,
        [winResult.winner.toLowerCase()]: prevScore[winResult.winner.toLowerCase() as keyof Score] + 1,
      }));
      return; // Game over - winner found
    }

    // Check for draw: all 27 cells filled and no winner
    if (newBoard.every(cell => cell !== null)) {
      setIsDraw(true);
      // Update draw count
      setScore(prevScore => ({
        ...prevScore,
        draws: prevScore.draws + 1,
      }));
      return; // Game over - draw
    }

    // Increment move count
    setMoveCount(moveCount + 1);

    // Alternate player turn
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  /**
   * Reset the 3D game to initial state
   *
   * Clears the board and resets all game state:
   * - Board becomes empty (27 null values)
   * - Current player resets to X
   * - Move count resets to 0
   * - Winner resets to null
   * - Winning line resets to null
   * - Draw state resets to false
   *
   * Note: Score is NOT reset (persists across games)
   */
  const resetGame3D = () => {
    setBoard3D(Array(27).fill(null));
    setCurrentPlayer('X');
    setMoveCount(0);
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
  };

  /**
   * Reset the 3D score to initial state
   *
   * Clears all 3D scores:
   * - Player X wins reset to 0
   * - Player O wins reset to 0
   * - Draws reset to 0
   * - Also clears localStorage
   */
  const resetScore3D = () => {
    const initialScore = { x: 0, o: 0, draws: 0 };
    setScore(initialScore);
    localStorage.setItem('tic-tac-toe-score-3d', JSON.stringify(initialScore));
  };

  // Return game state and control functions
  return {
    board3D,
    currentPlayer,
    moveCount,
    winner,
    winningLine,
    isDraw,
    score,
    makeMove3D,
    resetGame3D,
    resetScore3D,
    checkWinner3D,
  };
}

/**
 * Export winning combinations for testing
 */
export { WINNING_COMBINATIONS_3D };
