'use client';

import React from 'react';
import { useGameMode } from '@/hooks/useGameMode';

/**
 * ModeToggle Component
 *
 * Toggle button to switch between 2D (classic) and 3D (cube) game modes.
 * Displays current mode with visual indication and allows seamless switching.
 *
 * Features:
 * - Clear 2D/3D mode indication
 * - Smooth transition animations
 * - localStorage persistence
 * - Keyboard accessible
 * - Responsive design
 */
export function ModeToggle() {
  const { gameMode, toggleMode } = useGameMode();

  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-sm sm:text-base text-gray-600 font-medium">
        Mode:
      </span>
      <button
        onClick={toggleMode}
        className="
          relative
          flex items-center gap-2
          px-4 py-2 sm:px-5 sm:py-2.5
          bg-white
          border-2 border-gray-300
          rounded-lg
          font-semibold
          text-sm sm:text-base
          transition-all duration-200
          hover:border-indigo-400
          hover:shadow-md
          active:scale-95
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          focus:ring-offset-2
        "
        aria-label={`Switch to ${gameMode === '2D' ? '3D' : '2D'} mode. Currently in ${gameMode} mode.`}
        title={`Switch to ${gameMode === '2D' ? '3D' : '2D'} mode`}
      >
        {/* 2D Mode Button */}
        <span
          className={`
            px-3 py-1
            rounded
            transition-all duration-200
            ${
              gameMode === '2D'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-transparent text-gray-500'
            }
          `}
        >
          2D
        </span>

        {/* Divider */}
        <span className="text-gray-300">|</span>

        {/* 3D Mode Button */}
        <span
          className={`
            px-3 py-1
            rounded
            transition-all duration-200
            ${
              gameMode === '3D'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-transparent text-gray-500'
            }
          `}
        >
          3D
        </span>
      </button>
    </div>
  );
}
