'use client';

import React, { useState } from 'react';
import { GameBoard } from '@/components/GameBoard';
import { Board } from '@/lib/types';

/**
 * Home Page - Main Tic-Tac-Toe Game
 *
 * Currently displays the game board with basic interaction.
 * Game logic (turn management, win detection) will be added in subsequent issues.
 */
export default function Home() {
  // Temporary state for demo - will be moved to custom hook in Issue #3
  const [board, setBoard] = useState<Board>(Array(9).fill(null));

  /**
   * Temporary click handler for demo purposes
   * Real game logic will be implemented in Issue #3
   */
  const handleCellClick = (index: number) => {
    if (board[index]) return; // Cell already occupied

    const newBoard = [...board];
    // Temporary: Just alternate X and O for visual testing
    const moveCount = board.filter(cell => cell !== null).length;
    newBoard[index] = moveCount % 2 === 0 ? 'X' : 'O';
    setBoard(newBoard);
  };

  /**
   * Reset board for testing
   */
  const handleReset = () => {
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
            Tic-Tac-Toe
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Built with Next.js & AI Agents
          </p>
        </div>

        {/* Game Board */}
        <GameBoard
          board={board}
          onCellClick={handleCellClick}
          disabled={false}
        />

        {/* Controls */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleReset}
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
          >
            Reset Game
          </button>
        </div>

        {/* Status Message */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            ⚠️ <strong>Demo Mode:</strong> Game logic (turns, win detection) coming in Issues #3-5
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-600 text-sm">
        <p>
          🤖 Developed with{' '}
          <a
            href="https://github.com/macastro90/tic-tac-toe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            AI Agents
          </a>
        </p>
      </div>
    </div>
  );
}
