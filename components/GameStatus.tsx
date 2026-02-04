'use client';

import React from 'react';
import { Player } from '@/lib/types';

/**
 * Props for GameStatus component
 */
interface GameStatusProps {
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  onReset: () => void;
}

/**
 * GameStatus Component
 *
 * Displays the current game status including:
 * - Whose turn it is (Player X or Player O)
 * - Winner announcement when game is won
 * - Draw announcement when game ends in a tie
 * - Reset button to start a new game
 *
 * @param currentPlayer - The player whose turn it is ('X' or 'O')
 * @param winner - The winning player ('X' or 'O'), or null if no winner yet
 * @param isDraw - Whether the game ended in a draw
 * @param onReset - Callback function to reset the game
 */
export function GameStatus({ currentPlayer, winner, isDraw, onReset }: GameStatusProps) {
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
    <div className="flex flex-col items-center gap-4 md:gap-5 mt-6 md:mt-8">
      {/* Winner Announcement, Draw Announcement, or Turn Indicator */}
      {winner ? (
        <div className="flex flex-col items-center gap-2 md:gap-3">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 animate-bounce">
            🎉 Winner! 🎉
          </div>
          <div
            className={`
              px-6 py-3 md:px-8 md:py-4
              rounded-lg md:rounded-xl
              border-3
              font-bold
              text-2xl sm:text-3xl md:text-4xl
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
      ) : isDraw ? (
        <div className="flex flex-col items-center gap-2 md:gap-3">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 animate-pulse">
            🤝 Draw! 🤝
          </div>
          <div
            className="
              px-6 py-3 md:px-8 md:py-4
              rounded-lg md:rounded-xl
              border-3
              font-bold
              text-2xl sm:text-3xl md:text-4xl
              bg-gray-100
              border-gray-300
              text-gray-700
              transition-all duration-200
              shadow-lg
              ring-4
              ring-gray-300
            "
          >
            It&apos;s a Tie!
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <span className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium">
            Current Turn:
          </span>
          <div
            className={`
              px-4 py-2 md:px-5 md:py-3
              rounded-lg md:rounded-xl
              border-2
              font-bold
              text-xl sm:text-2xl md:text-3xl
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
          px-6 py-3 md:px-8 md:py-4
          text-base md:text-lg
          bg-indigo-600
          text-white
          font-semibold
          rounded-lg md:rounded-xl
          shadow-md
          hover:bg-indigo-700
          active:scale-95
          transition-all duration-200
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          focus:ring-offset-2
          min-h-[48px]
        "
        aria-label="Reset game"
      >
        {winner || isDraw ? 'Play Again' : 'New Game'}
      </button>
    </div>
  );
}
