'use client';

import { useState, useEffect } from 'react';

/**
 * Game mode type - either 2D (classic) or 3D (cube)
 */
export type GameMode = '2D' | '3D';

/**
 * Custom hook for managing game mode (2D vs 3D)
 *
 * Handles:
 * - Game mode state management
 * - localStorage persistence
 * - Mode switching functionality
 *
 * @returns Game mode state and control functions
 */
export function useGameMode() {
  // Game mode state: '2D' (classic) or '3D' (cube)
  const [gameMode, setGameModeState] = useState<GameMode>('2D');

  // Load game mode from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('gameMode');
    if (savedMode === '2D' || savedMode === '3D') {
      setGameModeState(savedMode);
    }
  }, []);

  // Save game mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gameMode', gameMode);
  }, [gameMode]);

  /**
   * Toggle between 2D and 3D modes
   */
  const toggleMode = () => {
    setGameModeState(prevMode => prevMode === '2D' ? '3D' : '2D');
  };

  /**
   * Set game mode directly
   * @param mode - The mode to set ('2D' or '3D')
   */
  const setGameMode = (mode: GameMode) => {
    setGameModeState(mode);
  };

  return {
    gameMode,
    toggleMode,
    setGameMode,
  };
}
