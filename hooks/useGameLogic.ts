'use client';

import { useState } from 'react';
import { Board, Player } from '@/lib/types';

/**
 * Custom hook for managing Tic-Tac-Toe game logic
 *
 * Handles:
 * - Board state management
 * - Turn alternation between players
 * - Move validation
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

  /**
   * Make a move on the board
   *
   * Validates the move and updates the game state:
   * 1. Checks if cell is empty
   * 2. Places current player's symbol
   * 3. Increments move count
   * 4. Alternates to next player
   *
   * @param index - Cell index (0-8)
   */
  const makeMove = (index: number) => {
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
   */
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setMoveCount(0);
  };

  // Return game state and control functions
  return {
    board,
    currentPlayer,
    moveCount,
    makeMove,
    resetGame,
  };
}
