'use client';

import React from 'react';
import { useGameMode } from '@/hooks/useGameMode';

/**
 * View3DToggle Component
 *
 * Toggle button to switch between Simple and Interactive 3D visualizations.
 * Only visible when in 3D mode.
 *
 * Features:
 * - Clear Simple/Interactive indication
 * - Smooth transition animations
 * - localStorage persistence
 * - Keyboard accessible
 * - Responsive design
 */
export function View3DToggle() {
  const { view3DMode, toggle3DView } = useGameMode();

  return (
    <div className="flex items-center justify-center gap-2 mt-3">
      <span className="text-xs sm:text-sm text-gray-600 font-medium">
        3D View:
      </span>
      <button
        onClick={toggle3DView}
        className="
          relative
          flex items-center gap-2
          px-3 py-1.5 sm:px-4 sm:py-2
          bg-white
          border-2 border-gray-300
          rounded-lg
          font-semibold
          text-xs sm:text-sm
          transition-all duration-200
          hover:border-indigo-400
          hover:shadow-md
          active:scale-95
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          focus:ring-offset-2
        "
        aria-label={`Switch to ${view3DMode === 'simple' ? 'Interactive' : 'Simple'} 3D view. Currently in ${view3DMode} view.`}
        title={`Switch to ${view3DMode === 'simple' ? 'Interactive' : 'Simple'} 3D view`}
      >
        {/* Simple Mode Button */}
        <span
          className={`
            px-2 py-0.5 sm:px-3 sm:py-1
            rounded
            transition-all duration-200
            ${
              view3DMode === 'simple'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-transparent text-gray-500'
            }
          `}
        >
          Simple
        </span>

        {/* Divider */}
        <span className="text-gray-300">|</span>

        {/* Interactive Mode Button */}
        <span
          className={`
            px-2 py-0.5 sm:px-3 sm:py-1
            rounded
            transition-all duration-200
            ${
              view3DMode === 'interactive'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-transparent text-gray-500'
            }
          `}
        >
          Interactive
        </span>
      </button>
    </div>
  );
}
