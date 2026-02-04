'use client';

import React from 'react';
import { GameBoard } from '@/components/GameBoard';
import { GameStatus } from '@/components/GameStatus';
import { ScoreBoard } from '@/components/ScoreBoard';
import { ModeToggle } from '@/components/ModeToggle';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useGameMode } from '@/hooks/useGameMode';

/**
 * Home Page - Main Tic-Tac-Toe Game
 *
 * Displays the game board with full turn management logic.
 * Players alternate between X and O with proper validation.
 * Includes score tracking across multiple games.
 * Supports 2D and 3D game modes (Issue #10).
 */
export default function Home() {
  // Use custom hook for game logic (Issues #3, #4, #5, and #7)
  const { board, currentPlayer, winner, winningLine, isDraw, score, makeMove, resetGame, resetScore } = useGameLogic();

  // Use custom hook for game mode (Issue #10)
  const { gameMode } = useGameMode();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 max-w-2xl lg:max-w-3xl w-full">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-2">
            Tic-Tac-Toe
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-4">
            Built with Next.js & AI Agents
          </p>

          {/* Mode Toggle - Switch between 2D and 3D (Issue #10) */}
          <ModeToggle />
        </div>

        {/* Score Board - Shows wins for X, O, and draws (Issue #7) */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <ScoreBoard score={score} onResetScore={resetScore} />
        </div>

        {/* Game Board */}
        <GameBoard
          board={board}
          onCellClick={makeMove}
          disabled={winner !== null || isDraw}
          winningLine={winningLine}
        />

        {/* Game Status - Shows current turn, winner, draw, and reset button */}
        <GameStatus
          currentPlayer={currentPlayer}
          winner={winner}
          isDraw={isDraw}
          onReset={resetGame}
        />

        {/* Info Message */}
        <div className="mt-4 sm:mt-6 md:mt-8 text-center">
          <p className="text-gray-600 text-xs sm:text-sm md:text-base">
            ✅ <strong>Currently in {gameMode} mode.</strong> {gameMode === '3D' ? '3D mode coming soon!' : 'Score tracking active!'}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 sm:mt-6 md:mt-8 text-center text-gray-600 text-xs sm:text-sm">
        <p>
          🤖 Developed with{' '}
          <a
            href="https://github.com/macastro90/tic-tac-toe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            AI Agents
          </a>
        </p>
      </div>
    </div>
  );
}
