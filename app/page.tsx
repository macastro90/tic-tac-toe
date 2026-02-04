'use client';

import React from 'react';
import { GameBoard } from '@/components/GameBoard';
import { GameStatus } from '@/components/GameStatus';
import { ScoreBoard } from '@/components/ScoreBoard';
import { useGameLogic } from '@/hooks/useGameLogic';

/**
 * Home Page - Main Tic-Tac-Toe Game
 *
 * Displays the game board with full turn management logic.
 * Players alternate between X and O with proper validation.
 * Includes score tracking across multiple games.
 */
export default function Home() {
  // Use custom hook for game logic (Issues #3, #4, #5, and #7)
  const { board, currentPlayer, winner, winningLine, isDraw, score, makeMove, resetGame, resetScore } = useGameLogic();

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

        {/* Score Board - Shows wins for X, O, and draws (Issue #7) */}
        <div className="mb-6">
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
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            ✅ <strong>Score tracking active!</strong> Scores persist during your session.
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
