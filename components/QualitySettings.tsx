'use client';

import React from 'react';
import { useGameMode } from '@/contexts/GameModeContext';
import type { QualityPreset } from '@/contexts/GameModeContext';
import type { DeviceCapabilities } from '@/hooks/useDeviceCapabilities';
import type { PerformanceMetrics } from '@/hooks/usePerformanceMonitor';

interface QualitySettingsProps {
  deviceCapabilities: DeviceCapabilities | null;
  performanceMetrics?: PerformanceMetrics;
}

/**
 * QualitySettings Component
 *
 * Allows users to manually control 3D rendering quality
 * Shows device recommendations and current FPS
 */
export function QualitySettings({ deviceCapabilities, performanceMetrics }: QualitySettingsProps) {
  const { qualityPreset, setQualityPreset } = useGameMode();

  const qualityOptions: { value: QualityPreset; label: string; description: string }[] = [
    { value: 'low', label: 'Low', description: 'Simple geometry, 1 light, best performance' },
    { value: 'medium', label: 'Medium', description: 'Balanced quality and performance' },
    { value: 'high', label: 'High', description: 'Full quality, 3 lights, best visuals' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-800">3D Quality Settings</h4>
        {performanceMetrics && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-600">FPS:</span>
            <span
              className={`font-mono font-bold ${
                performanceMetrics.isLowPerformance ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {performanceMetrics.fps}
            </span>
          </div>
        )}
      </div>

      {deviceCapabilities && (
        <div className="text-xs text-gray-600 bg-gray-50 rounded p-2">
          <p>
            <strong>Device:</strong> {deviceCapabilities.isMobile ? 'Mobile' : 'Desktop'} •{' '}
            <strong>GPU:</strong> {deviceCapabilities.gpuTier} •{' '}
            <strong>Recommended:</strong> {deviceCapabilities.recommendedQuality}
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {qualityOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setQualityPreset(option.value)}
            className={`
              px-3 py-2
              text-xs font-medium
              rounded-md
              border-2
              transition-all duration-200
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-1
              ${
                qualityPreset === option.value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-blue-400'
              }
            `}
            title={option.description}
          >
            {option.label}
            {deviceCapabilities?.recommendedQuality === option.value && (
              <span className="ml-1">⭐</span>
            )}
          </button>
        ))}
      </div>

      {performanceMetrics?.isLowPerformance && (
        <div className="text-xs text-amber-700 bg-amber-50 rounded p-2 flex items-start gap-2">
          <span>⚠️</span>
          <p>
            Performance below target. Consider lowering quality or disabling other applications.
          </p>
        </div>
      )}
    </div>
  );
}
