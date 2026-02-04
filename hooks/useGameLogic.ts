'use client';

import { useState } from 'react';
import { Board, Player } from '@/lib/types';

/**
 * All possible winning combinations in Tic-Tac-Toe
 * Indices: 0-2 (top row), 3-5 (middle row), 6-8 (bottom row)
 */
const WINNING_COMBINATIONS = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Custom hook for managing Tic-Tac-Toe game logic
 *
 * Handles:
 * - Board state management
 * - Turn alternation between players
 * - Move validation
 * - Win detection
 * - Game reset
 *
 * @returns Game state and control functions
 */
export function useGameLogic() {
  // Board state: array of 9 cells
  const [board, setBoard] = useState<Board>(Array(9).fill(null));

  // Current player: X always starts
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');

  // Move count for tracking game progress
  const [moveCount, setMoveCount] = useState<number>(0);

  // Winner state: null if no winner yet
  const [winner, setWinner] = useState<Player | null>(null);

  // Winning line for highlighting
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  /**
   * Check if there's a winner on the board
   *
   * Checks all 8 possible winning combinations:
   * - 3 rows
   * - 3 columns
   * - 2 diagonals
   *
   * @param boardToCheck - The board to check for a winner
   * @returns Object with winner and winning line, or null if no winner
   */
  const checkWinner = (boardToCheck: Board): { winner: Player; line: number[] } | null => {
    for (const combination of WINNING_COMBINATIONS) {
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
   * Make a move on the board
   *
   * Validates the move and updates the game state:
   * 1. Checks if game is already over
   * 2. Checks if cell is empty
   * 3. Places current player's symbol
   * 4. Checks for winner
   * 5. Increments move count
   * 6. Alternates to next player
   *
   * @param index - Cell index (0-8)
   */
  const makeMove = (index: number) => {
    // Validation: Game is already over
    if (winner !== null) {
      return; // Game over - no more moves allowed
    }

    // Validation: Check if cell is already occupied
    if (board[index] !== null) {
      return; // Invalid move - cell occupied
    }

    // Validation: Check if index is within bounds
    if (index < 0 || index > 8) {
      return; // Invalid move - out of bounds
    }

    // Create new board with the move
    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    // Update board state
    setBoard(newBoard);

    // Check for winner after this move
    const winResult = checkWinner(newBoard);
    if (winResult) {
      setWinner(winResult.winner);
      setWinningLine(winResult.line);
      return; // Game over - winner found
    }

    // Increment move count
    setMoveCount(moveCount + 1);

    // Alternate player turn
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  /**
   * Reset the game to initial state
   *
   * Clears the board and resets all game state:
   * - Board becomes empty
   * - Current player resets to X
   * - Move count resets to 0
   * - Winner resets to null
   * - Winning line resets to null
   */
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setMoveCount(0);
    setWinner(null);
    setWinningLine(null);
  };

  // Return game state and control functions
  return {
    board,
    currentPlayer,
    moveCount,
    winner,
    winningLine,
    makeMove,
    resetGame,
  };
}
