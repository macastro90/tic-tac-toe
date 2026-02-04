'use client';

import React from 'react';
import { Player } from '@/lib/types';

/**
 * Props for GameStatus component
 */
interface GameStatusProps {
  currentPlayer: Player;
  winner: Player | null;
  onReset: () => void;
}

/**
 * GameStatus Component
 *
 * Displays the current game status including:
 * - Whose turn it is (Player X or Player O)
 * - Winner announcement when game is won
 * - Reset button to start a new game
 *
 * @param currentPlayer - The player whose turn it is ('X' or 'O')
 * @param winner - The winning player ('X' or 'O'), or null if no winner yet
 * @param onReset - Callback function to reset the game
 */
export function GameStatus({ currentPlayer, winner, onReset }: GameStatusProps) {
  /**
   * Get color class based on current player
   * X = blue, O = red
   */
  const getPlayerColor = (player: Player) => {
    return player === 'X' ? 'text-blue-600' : 'text-red-600';
  };

  /**
   * Get background color for player badge
   * X = blue background, O = red background
   */
  const getBadgeColor = (player: Player) => {
    return player === 'X'
      ? 'bg-blue-100 border-blue-300'
      : 'bg-red-100 border-red-300';
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      {/* Winner Announcement or Turn Indicator */}
      {winner ? (
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl sm:text-3xl font-bold text-gray-800 animate-bounce">
            🎉 Winner! 🎉
          </div>
          <div
            className={`
              px-6 py-3
              rounded-lg
              border-3
              font-bold
              text-2xl sm:text-3xl
              ${getBadgeColor(winner)}
              ${getPlayerColor(winner)}
              transition-all duration-200
              shadow-lg
              ring-4
              ${winner === 'X' ? 'ring-blue-300' : 'ring-red-300'}
            `}
          >
            Player {winner} Wins!
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <span className="text-lg sm:text-xl text-gray-700 font-medium">
            Current Turn:
          </span>
          <div
            className={`
              px-4 py-2
              rounded-lg
              border-2
              font-bold
              text-xl sm:text-2xl
              ${getBadgeColor(currentPlayer)}
              ${getPlayerColor(currentPlayer)}
              transition-all duration-200
              shadow-sm
            `}
          >
            Player {currentPlayer}
          </div>
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="
          px-6 py-3
          bg-indigo-600
          text-white
          font-semibold
          rounded-lg
          shadow-md
          hover:bg-indigo-700
          active:scale-95
          transition-all duration-200
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          focus:ring-offset-2
        "
        aria-label="Reset game"
      >
        {winner ? 'Play Again' : 'New Game'}
      </button>
    </div>
  );
}
