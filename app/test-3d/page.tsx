'use client';

import React from 'react';
import { GameBoard3DInteractive } from '@/components/GameBoard3DInteractive';
import { GameStatus } from '@/components/GameStatus';
import { ScoreBoard } from '@/components/ScoreBoard';
import { useGameLogic3D } from '@/hooks/useGameLogic3D';

/**
 * Test Page for GameBoard3DInteractive Component
 *
 * This page is used to test the new Three.js interactive 3D board.
 * Access at: http://localhost:3000/test-3d
 */
export default function Test3DPage() {
  const {
    board3D,
    currentPlayer,
    winner,
    winningLine,
    isDraw,
    score,
    makeMove3D,
    resetGame3D,
    resetScore3D
  } = useGameLogic3D();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex flex-col items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            3D Interactive Board Test
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-2">
            Testing GameBoard3DInteractive with Three.js
          </p>
          <p className="text-xs text-gray-500">
            Issue #15 - Sub-issue 14.1
          </p>
        </div>

        {/* Score Board */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <ScoreBoard
            score={score}
            onResetScore={resetScore3D}
          />
        </div>

        {/* 3D Interactive Board */}
        <GameBoard3DInteractive
          board3D={board3D}
          onCellClick={makeMove3D}
          disabled={winner !== null || isDraw}
          winningLine={winningLine}
        />

        {/* Game Status */}
        <GameStatus
          currentPlayer={currentPlayer}
          winner={winner}
          isDraw={isDraw}
          onReset={resetGame3D}
        />

        {/* Test Info */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-bold text-yellow-800 mb-2">Test Checklist:</h3>
          <ul className="text-xs text-yellow-700 space-y-1">
            <li>✓ 27 cells render in 3x3x3 grid</li>
            <li>✓ Cells are properly positioned in 3D space</li>
            <li>✓ Drag to rotate camera (OrbitControls)</li>
            <li>✓ Scroll to zoom in/out</li>
            <li>✓ Click cells to place X or O</li>
            <li>✓ X appears as crossed blue boxes</li>
            <li>✓ O appears as red torus</li>
            <li>✓ Hover effects on empty cells</li>
            <li>✓ Winning cells highlighted in green</li>
            <li>✓ Proper lighting and transparency</li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="mt-4 text-center">
          <a
            href="/"
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            ← Back to Main Game
          </a>
        </div>
      </div>
    </div>
  );
}
