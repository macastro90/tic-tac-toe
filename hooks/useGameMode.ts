'use client';

import { useState, useEffect } from 'react';

/**
 * Game mode type - either 2D (classic) or 3D (cube)
 */
export type GameMode = '2D' | '3D';

/**
 * 3D view mode type - Simple (side-by-side layers) or Interactive (Three.js)
 */
export type View3DMode = 'simple' | 'interactive';

/**
 * Custom hook for managing game mode (2D vs 3D) and 3D view mode
 *
 * Handles:
 * - Game mode state management (2D/3D)
 * - 3D view mode state management (simple/interactive)
 * - localStorage persistence
 * - Mode switching functionality
 *
 * @returns Game mode state and control functions
 */
export function useGameMode() {
  // Game mode state: '2D' (classic) or '3D' (cube)
  const [gameMode, setGameModeState] = useState<GameMode>('2D');

  // 3D view mode state: 'simple' (side-by-side) or 'interactive' (Three.js)
  const [view3DMode, setView3DModeState] = useState<View3DMode>('simple');

  // Load game mode from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('gameMode');
    if (savedMode === '2D' || savedMode === '3D') {
      setGameModeState(savedMode);
    }

    const savedView3DMode = localStorage.getItem('view3DMode');
    if (savedView3DMode === 'simple' || savedView3DMode === 'interactive') {
      setView3DModeState(savedView3DMode);
    }
  }, []);

  // Save game mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gameMode', gameMode);
  }, [gameMode]);

  // Save 3D view mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('view3DMode', view3DMode);
  }, [view3DMode]);

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

  /**
   * Toggle between Simple and Interactive 3D views
   */
  const toggle3DView = () => {
    setView3DModeState(prevMode => prevMode === 'simple' ? 'interactive' : 'simple');
  };

  /**
   * Set 3D view mode directly
   * @param mode - The view mode to set ('simple' or 'interactive')
   */
  const setView3DMode = (mode: View3DMode) => {
    setView3DModeState(mode);
  };

  return {
    gameMode,
    toggleMode,
    setGameMode,
    view3DMode,
    toggle3DView,
    setView3DMode,
  };
}
