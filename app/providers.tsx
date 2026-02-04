'use client';

import { GameModeProvider } from '@/contexts/GameModeContext';
import { ReactNode } from 'react';

/**
 * Providers Component
 *
 * Wraps the app with all necessary context providers.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <GameModeProvider>
      {children}
    </GameModeProvider>
  );
}
