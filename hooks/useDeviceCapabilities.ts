'use client';

import { useState, useEffect } from 'react';

export type QualityPreset = 'low' | 'medium' | 'high';

export interface DeviceCapabilities {
  isMobile: boolean;
  gpuTier: 'low' | 'medium' | 'high';
  memoryGB: number;
  recommendedQuality: QualityPreset;
  supportsWebGL2: boolean;
  maxTextureSize: number;
}

/**
 * Detect device capabilities and recommend quality preset
 *
 * Uses:
 * - User agent for mobile detection
 * - WebGL capabilities for GPU tier
 * - Navigator API for memory info
 *
 * Returns recommended quality preset based on device capabilities
 */
export function useDeviceCapabilities(): DeviceCapabilities | null {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities | null>(null);

  useEffect(() => {
    const detectCapabilities = (): DeviceCapabilities => {
      // Mobile detection
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

      // WebGL detection
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      const supportsWebGL2 = !!canvas.getContext('webgl2');

      let gpuTier: 'low' | 'medium' | 'high' = 'medium';
      let maxTextureSize = 2048;

      if (gl) {
        // Get max texture size (indicator of GPU power)
        maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);

        // Get renderer (GPU name)
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const renderer = debugInfo
          ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          : '';

        // Classify GPU tier based on max texture size and renderer
        if (maxTextureSize >= 16384 || /NVIDIA|RTX|AMD|Radeon RX/i.test(renderer)) {
          gpuTier = 'high';
        } else if (maxTextureSize >= 8192 || /Intel.*Iris|Apple/i.test(renderer)) {
          gpuTier = 'medium';
        } else {
          gpuTier = 'low';
        }

        // Mobile devices get downgraded one tier
        if (isMobile && gpuTier === 'high') gpuTier = 'medium';
        if (isMobile && gpuTier === 'medium') gpuTier = 'low';
      }

      // Memory detection (if available)
      let memoryGB = 4; // Default assumption
      if ('deviceMemory' in navigator) {
        memoryGB = (navigator as any).deviceMemory || 4;
      }

      // Recommend quality preset
      let recommendedQuality: QualityPreset = 'medium';

      if (isMobile) {
        // Mobile defaults to low/medium
        recommendedQuality = gpuTier === 'low' || memoryGB < 4 ? 'low' : 'medium';
      } else {
        // Desktop can handle higher quality
        if (gpuTier === 'high' && memoryGB >= 8) {
          recommendedQuality = 'high';
        } else if (gpuTier === 'low' || memoryGB < 4) {
          recommendedQuality = 'low';
        } else {
          recommendedQuality = 'medium';
        }
      }

      return {
        isMobile,
        gpuTier,
        memoryGB,
        recommendedQuality,
        supportsWebGL2,
        maxTextureSize,
      };
    };

    setCapabilities(detectCapabilities());
  }, []);

  return capabilities;
}
