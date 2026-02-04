'use client';

import React from 'react';
import { Cell } from '@/lib/types';

/**
 * Props for GameBoard3D component
 */
interface GameBoard3DProps {
  board3D: Cell[];
  onCellClick: (index: number) => void;
  disabled?: boolean;
  winningLine?: number[] | null;
}

/**
 * GameBoard3D Component (Simplified MVP)
 *
 * Renders a 3D Tic-Tac-Toe board (3x3x3 cube) as three separate layers
 * displayed side by side. Each layer is a 3x3 grid.
 *
 * Layout:
 * Layer 0 (Front) | Layer 1 (Middle) | Layer 2 (Back)
 *
 * This is a simplified MVP implementation. Future enhancements can include:
 * - Three.js/WebGL for true 3D rendering
 * - Interactive rotation controls
 * - Isometric projection
 * - Advanced animations
 */
export function GameBoard3D({
  board3D,
  onCellClick,
  disabled = false,
  winningLine = null,
}: GameBoard3DProps) {
  /**
   * Get layer name for display
   */
  const getLayerName = (layer: number): string => {
    const names = ['Front', 'Middle', 'Back'];
    return names[layer];
  };

  /**
   * Get cell styling classes based on cell value and state
   */
  const getCellClassName = (value: Cell, index: number) => {
    const isWinningCell = winningLine?.includes(index);

    const baseClasses = `
      aspect-square
      flex items-center justify-center
      text-2xl sm:text-3xl md:text-4xl
      font-bold
      bg-white
      border-2 border-gray-300
      rounded-lg
      transition-all duration-200
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      focus:ring-offset-1
      min-h-[50px] min-w-[50px]
    `;

    const hoverClasses = !disabled && !value ? `
      hover:bg-gray-50
      hover:border-blue-400
      hover:shadow-md
      cursor-pointer
    ` : '';

    const disabledClasses = disabled || value ? `
      cursor-not-allowed
    ` : '';

    const activeClasses = !disabled && !value ? `
      active:scale-95
    ` : '';

    const winningClasses = isWinningCell ? `
      bg-green-100
      border-green-400
      ring-2
      ring-green-400
      shadow-lg
    ` : '';

    return `${baseClasses} ${hoverClasses} ${disabledClasses} ${activeClasses} ${winningClasses}`.trim();
  };

  /**
   * Get text color based on cell value
   */
  const getTextColor = (value: Cell) => {
    if (value === 'X') return 'text-blue-600';
    if (value === 'O') return 'text-red-600';
    return 'text-gray-300';
  };

  /**
   * Handle cell click
   */
  const handleCellClick = (index: number) => {
    if (disabled || board3D[index]) return;
    onCellClick(index);
  };

  /**
   * Render a single layer (3x3 grid)
   */
  const renderLayer = (layerIndex: number) => {
    const startIndex = layerIndex * 9;
    const layerCells = board3D.slice(startIndex, startIndex + 9);

    return (
      <div key={layerIndex} className="flex flex-col items-center">
        {/* Layer Label */}
        <div className="mb-2 text-center">
          <span className="text-sm sm:text-base font-semibold text-gray-700">
            Layer {layerIndex + 1}
          </span>
          <span className="text-xs sm:text-sm text-gray-500 block">
            ({getLayerName(layerIndex)})
          </span>
        </div>

        {/* 3x3 Grid for this layer */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          {layerCells.map((cell, localIndex) => {
            const globalIndex = startIndex + localIndex;
            return (
              <button
                key={globalIndex}
                onClick={() => handleCellClick(globalIndex)}
                disabled={disabled || cell !== null}
                aria-label={`Layer ${layerIndex + 1}, Cell ${localIndex + 1}${cell ? `, occupied by ${cell}` : ', empty'}`}
                className={getCellClassName(cell, globalIndex)}
              >
                <span className={getTextColor(cell)}>
                  {cell || ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
      {/* 3D Board Info */}
      <div className="text-center mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">
          3D Tic-Tac-Toe (3x3x3 Cube)
        </h3>
        <p className="text-xs sm:text-sm text-gray-600">
          Click any cell across the 3 layers to play. Win by getting 3 in a row in any direction!
        </p>
      </div>

      {/* Three Layers Side by Side */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-start md:items-center">
        {renderLayer(0)}
        {renderLayer(1)}
        {renderLayer(2)}
      </div>

      {/* 3D Info Message */}
      <div className="mt-4 text-center">
        <p className="text-xs sm:text-sm text-gray-500 italic">
          MVP: 3 layers displayed side by side. Future: Interactive 3D rotation with Three.js
        </p>
      </div>
    </div>
  );
}
