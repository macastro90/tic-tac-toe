'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { QualityPreset } from './useDeviceCapabilities';

export interface PerformanceMetrics {
  fps: number;
  avgFrameTime: number;
  minFps: number;
  maxFps: number;
  isLowPerformance: boolean;
}

/**
 * Monitor FPS and performance metrics
 *
 * Tracks frame times and calculates FPS
 * Triggers callback if performance drops below threshold
 *
 * @param enabled - Whether monitoring is active
 * @param targetFps - Target FPS (30 for mobile, 60 for desktop)
 * @param onLowPerformance - Callback when FPS drops below threshold
 */
export function usePerformanceMonitor(
  enabled: boolean,
  targetFps: number = 60,
  onLowPerformance?: (suggestedQuality: QualityPreset) => void
) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    avgFrameTime: 16.67,
    minFps: 60,
    maxFps: 60,
    isLowPerformance: false,
  });

  const frameTimesRef = useRef<number[]>([]);
  const lastTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const lowPerfCountRef = useRef<number>(0);
  const animationIdRef = useRef<number | null>(null);

  const measureFrame = useCallback((currentTime: number) => {
    if (!enabled) return;

    // Calculate frame time (ms since last frame)
    if (lastTimeRef.current > 0) {
      const frameTime = currentTime - lastTimeRef.current;
      frameTimesRef.current.push(frameTime);

      // Keep only last 60 frames (1 second at 60fps)
      if (frameTimesRef.current.length > 60) {
        frameTimesRef.current.shift();
      }

      frameCountRef.current++;

      // Update metrics every 10 frames
      if (frameCountRef.current >= 10) {
        const avgFrameTime =
          frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
        const fps = 1000 / avgFrameTime;
        const minFrameTime = Math.min(...frameTimesRef.current);
        const maxFrameTime = Math.max(...frameTimesRef.current);
        const maxFps = 1000 / minFrameTime;
        const minFps = 1000 / maxFrameTime;

        const isLowPerformance = fps < targetFps * 0.8; // 80% of target

        setMetrics({
          fps: Math.round(fps),
          avgFrameTime: Math.round(avgFrameTime * 100) / 100,
          minFps: Math.round(minFps),
          maxFps: Math.round(maxFps),
          isLowPerformance,
        });

        // Track consecutive low performance frames
        if (isLowPerformance) {
          lowPerfCountRef.current++;

          // If low performance persists for 3 consecutive checks (30 frames)
          // Suggest downgrading quality
          if (lowPerfCountRef.current >= 3 && onLowPerformance) {
            const currentFps = fps;
            let suggestedQuality: QualityPreset = 'low';

            if (currentFps >= targetFps * 0.7) {
              suggestedQuality = 'medium';
            } else if (currentFps < targetFps * 0.5) {
              suggestedQuality = 'low';
            }

            onLowPerformance(suggestedQuality);
            lowPerfCountRef.current = 0; // Reset counter after callback
          }
        } else {
          lowPerfCountRef.current = 0; // Reset if performance recovers
        }

        frameCountRef.current = 0;
      }
    }

    lastTimeRef.current = currentTime;
    animationIdRef.current = requestAnimationFrame(measureFrame);
  }, [enabled, targetFps, onLowPerformance]);

  useEffect(() => {
    if (enabled) {
      animationIdRef.current = requestAnimationFrame(measureFrame);
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [enabled, measureFrame]);

  return metrics;
}
