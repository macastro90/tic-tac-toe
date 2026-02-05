'use client';

import React from 'react';
import { useGameMode } from '@/contexts/GameModeContext';

/**
 * ReducedMotionToggle Component
 *
 * Allows users to enable/disable reduced motion mode for accessibility.
 * Respects system preference (prefers-reduced-motion) by default.
 */
export function ReducedMotionToggle() {
  const { reducedMotion, toggleReducedMotion } = useGameMode();

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={toggleReducedMotion}
        className={`
          relative inline-flex items-center
          h-6 w-11
          rounded-full
          transition-colors duration-200
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:ring-offset-2
          ${reducedMotion ? 'bg-blue-600' : 'bg-gray-300'}
        `}
        role="switch"
        aria-checked={reducedMotion}
        aria-label="Toggle reduced motion"
      >
        <span
          className={`
            inline-block
            h-4 w-4
            transform
            rounded-full
            bg-white
            transition-transform duration-200
            ${reducedMotion ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
      <label htmlFor="reduced-motion" className="text-sm text-gray-700 select-none">
        Reduced Motion {reducedMotion ? 'On' : 'Off'}
      </label>
    </div>
  );
}
