'use client';

import React from 'react';
import { GameBoardProps, Cell } from '@/lib/types';

/**
 * GameBoard Component
 *
 * Renders the 3x3 Tic-Tac-Toe game board with clickable cells.
 * Handles cell clicks and displays X/O symbols with visual feedback.
 *
 * @param board - Current state of the game board (array of 9 cells)
 * @param onCellClick - Callback when a cell is clicked
 * @param disabled - Whether the board is disabled (game over)
 * @param winningLine - Array of indices representing winning cells (optional)
 */
export function GameBoard({
  board,
  onCellClick,
  disabled = false,
  winningLine = null,
}: GameBoardProps) {
  /**
   * Get cell styling classes based on cell value and state
   */
  const getCellClassName = (value: Cell, index: number) => {
    const isWinningCell = winningLine?.includes(index);

    const baseClasses = `
      aspect-square
      flex items-center justify-center
      text-4xl sm:text-5xl md:text-6xl lg:text-7xl
      font-bold
      bg-white
      border-2 border-gray-300
      rounded-lg
      transition-all duration-200
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      focus:ring-offset-2
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
    if (disabled || board[index]) return;
    onCellClick(index);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            disabled={disabled || cell !== null}
            aria-label={`Cell ${index + 1}${cell ? `, occupied by ${cell}` : ', empty'}`}
            className={getCellClassName(cell, index)}
          >
            <span className={getTextColor(cell)}>
              {cell || ''}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
