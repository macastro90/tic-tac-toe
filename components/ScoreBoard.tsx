'use client';

import React from 'react';
import { Score } from '@/lib/types';

/**
 * Props for ScoreBoard component
 */
interface ScoreBoardProps {
  score: Score;
  onResetScore?: () => void;
}

/**
 * ScoreBoard Component
 *
 * Displays the current score across multiple games:
 * - Player X wins (blue)
 * - Draws (gray)
 * - Player O wins (red)
 *
 * Optional reset button to clear scores
 *
 * @param score - Current score object with x, o, and draws counts
 * @param onResetScore - Optional callback to reset scores
 */
export function ScoreBoard({ score, onResetScore }: ScoreBoardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-3">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Score Tracker
        </h2>
      </div>

      {/* Score Display Grid */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4">
        {/* Player X Score */}
        <div
          className="
            flex flex-col items-center
            p-4 sm:p-6
            bg-blue-50
            border-2 border-blue-200
            rounded-lg
            shadow-sm
            transition-all duration-200
            hover:shadow-md
          "
        >
          <div className="text-blue-600 font-bold text-lg sm:text-xl mb-1">
            Player X
          </div>
          <div className="text-4xl sm:text-5xl font-bold text-blue-700">
            {score.x}
          </div>
          <div className="text-blue-500 text-xs sm:text-sm mt-1">
            {score.x === 1 ? 'win' : 'wins'}
          </div>
        </div>

        {/* Draws */}
        <div
          className="
            flex flex-col items-center
            p-4 sm:p-6
            bg-gray-50
            border-2 border-gray-200
            rounded-lg
            shadow-sm
            transition-all duration-200
            hover:shadow-md
          "
        >
          <div className="text-gray-600 font-bold text-lg sm:text-xl mb-1">
            Draws
          </div>
          <div className="text-4xl sm:text-5xl font-bold text-gray-700">
            {score.draws}
          </div>
          <div className="text-gray-500 text-xs sm:text-sm mt-1">
            {score.draws === 1 ? 'tie' : 'ties'}
          </div>
        </div>

        {/* Player O Score */}
        <div
          className="
            flex flex-col items-center
            p-4 sm:p-6
            bg-red-50
            border-2 border-red-200
            rounded-lg
            shadow-sm
            transition-all duration-200
            hover:shadow-md
          "
        >
          <div className="text-red-600 font-bold text-lg sm:text-xl mb-1">
            Player O
          </div>
          <div className="text-4xl sm:text-5xl font-bold text-red-700">
            {score.o}
          </div>
          <div className="text-red-500 text-xs sm:text-sm mt-1">
            {score.o === 1 ? 'win' : 'wins'}
          </div>
        </div>
      </div>

      {/* Reset Scores Button (Optional) */}
      {onResetScore && (
        <div className="flex justify-center">
          <button
            onClick={onResetScore}
            className="
              px-4 py-2
              text-sm
              bg-gray-200
              text-gray-700
              font-medium
              rounded-lg
              shadow-sm
              hover:bg-gray-300
              active:scale-95
              transition-all duration-200
              focus:outline-none
              focus:ring-2
              focus:ring-gray-400
              focus:ring-offset-2
            "
            aria-label="Reset all scores"
          >
            Reset Scores
          </button>
        </div>
      )}
    </div>
  );
}
