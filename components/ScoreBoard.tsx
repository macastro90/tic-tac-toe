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
      <div className="text-center mb-3 md:mb-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Score Tracker
        </h2>
      </div>

      {/* Score Display Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-4">
        {/* Player X Score */}
        <div
          className="
            flex flex-col items-center justify-center
            p-3 sm:p-4 md:p-6 lg:p-8
            bg-blue-50
            border-2 md:border-3 border-blue-200
            rounded-lg md:rounded-xl
            shadow-sm
            transition-all duration-200
            hover:shadow-md
            min-h-[100px] sm:min-h-[120px]
          "
        >
          <div className="text-blue-600 font-bold text-sm sm:text-lg md:text-xl mb-1">
            Player X
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-700">
            {score.x}
          </div>
          <div className="text-blue-500 text-xs sm:text-sm md:text-base mt-1">
            {score.x === 1 ? 'win' : 'wins'}
          </div>
        </div>

        {/* Draws */}
        <div
          className="
            flex flex-col items-center justify-center
            p-3 sm:p-4 md:p-6 lg:p-8
            bg-gray-50
            border-2 md:border-3 border-gray-200
            rounded-lg md:rounded-xl
            shadow-sm
            transition-all duration-200
            hover:shadow-md
            min-h-[100px] sm:min-h-[120px]
          "
        >
          <div className="text-gray-600 font-bold text-sm sm:text-lg md:text-xl mb-1">
            Draws
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700">
            {score.draws}
          </div>
          <div className="text-gray-500 text-xs sm:text-sm md:text-base mt-1">
            {score.draws === 1 ? 'tie' : 'ties'}
          </div>
        </div>

        {/* Player O Score */}
        <div
          className="
            flex flex-col items-center justify-center
            p-3 sm:p-4 md:p-6 lg:p-8
            bg-red-50
            border-2 md:border-3 border-red-200
            rounded-lg md:rounded-xl
            shadow-sm
            transition-all duration-200
            hover:shadow-md
            min-h-[100px] sm:min-h-[120px]
          "
        >
          <div className="text-red-600 font-bold text-sm sm:text-lg md:text-xl mb-1">
            Player O
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-700">
            {score.o}
          </div>
          <div className="text-red-500 text-xs sm:text-sm md:text-base mt-1">
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
              px-4 py-2 md:px-5 md:py-3
              text-sm md:text-base
              bg-gray-200
              text-gray-700
              font-medium
              rounded-lg md:rounded-xl
              shadow-sm
              hover:bg-gray-300
              active:scale-95
              transition-all duration-200
              focus:outline-none
              focus:ring-2
              focus:ring-gray-400
              focus:ring-offset-2
              min-h-[44px]
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
