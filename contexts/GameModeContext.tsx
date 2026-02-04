'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * Game mode type - either 2D (classic) or 3D (cube)
 */
export type GameMode = '2D' | '3D';

/**
 * 3D view mode type - Simple (side-by-side layers) or Interactive (Three.js)
 */
export type View3DMode = 'simple' | 'interactive';

/**
 * Game mode context value
 */
interface GameModeContextValue {
  gameMode: GameMode;
  toggleMode: () => void;
  setGameMode: (mode: GameMode) => void;
  view3DMode: View3DMode;
  toggle3DView: () => void;
  setView3DMode: (mode: View3DMode) => void;
}

/**
 * Game mode context
 */
const GameModeContext = createContext<GameModeContextValue | undefined>(undefined);

/**
 * Game mode provider props
 */
interface GameModeProviderProps {
  children: ReactNode;
}

/**
 * GameModeProvider Component
 *
 * Provides game mode state and controls to all child components.
 * Handles localStorage persistence and state synchronization.
 */
export function GameModeProvider({ children }: GameModeProviderProps) {
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

  const value: GameModeContextValue = {
    gameMode,
    toggleMode,
    setGameMode,
    view3DMode,
    toggle3DView,
    setView3DMode,
  };

  return (
    <GameModeContext.Provider value={value}>
      {children}
    </GameModeContext.Provider>
  );
}

/**
 * Custom hook for accessing game mode context
 *
 * @returns Game mode state and control functions
 * @throws Error if used outside of GameModeProvider
 */
export function useGameMode(): GameModeContextValue {
  const context = useContext(GameModeContext);
  if (context === undefined) {
    throw new Error('useGameMode must be used within a GameModeProvider');
  }
  return context;
}
