'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Cell } from '@/lib/types';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { QualityPreset } from '@/contexts/GameModeContext';

/**
 * Props for GameBoard3DInteractive component
 */
interface GameBoard3DInteractiveProps {
  board3D: Cell[];
  onCellClick: (index: number) => void;
  disabled?: boolean;
  winningLine?: number[] | null;
  quality?: QualityPreset;
  reducedMotion?: boolean;
  currentPlayer?: 'X' | 'O';
}

/**
 * Calculate 3D position for a cell based on its index
 */
function calculateCellPosition(index: number): [number, number, number] {
  const layer = Math.floor(index / 9);
  const layerIndex = index % 9;
  const row = Math.floor(layerIndex / 3);
  const col = layerIndex % 3;

  return [
    (col - 1) * 1.2,  // x: -1.2, 0, 1.2
    (1 - row) * 1.2,  // y: 1.2, 0, -1.2 (inverted for top-to-bottom)
    (layer - 1) * 1.2 // z: -1.2, 0, 1.2
  ];
}

/**
 * Get 3D coordinates from cell index
 */
function getCellCoordinates(index: number): { layer: number; row: number; col: number } {
  const layer = Math.floor(index / 9);
  const layerIndex = index % 9;
  const row = Math.floor(layerIndex / 3);
  const col = layerIndex % 3;
  return { layer, row, col };
}

/**
 * 3D Symbol component with smooth animations
 * Renders X or O with scale-in and fade-in animation
 */
interface Symbol3DProps {
  type: 'X' | 'O';
  quality: QualityPreset;
  reducedMotion?: boolean;
}

function Symbol3D({ type, quality, reducedMotion = false }: Symbol3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [scale, setScale] = useState(reducedMotion ? 1 : 0);

  // Animate symbol appearance (skip if reduced motion)
  React.useEffect(() => {
    if (reducedMotion) {
      setScale(1);
      return;
    }

    const startTime = Date.now();
    const duration = 400; // 400ms animation

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out back (spring-like effect)
      // Formula: 1 + (2.70158 + 1) * Math.pow(t - 1, 3) + 2.70158 * Math.pow(t - 1, 2)
      const c1 = 1.70158;
      const c3 = c1 + 1;
      const eased = 1 + c3 * Math.pow(progress - 1, 3) + c1 * Math.pow(progress - 1, 2);

      setScale(eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [reducedMotion]);

  // Update group scale
  React.useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.set(scale, scale, scale);
    }
  }, [scale]);

  if (type === 'X') {
    return (
      <group ref={groupRef}>
        {/* X Symbol - Enhanced 3D cross
            Two crossed boxes rotated in 3D space for better depth
        */}
        {/* First diagonal - rotated 45° around Z axis */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.15, 1.4, 0.15]} />
          <meshStandardMaterial
            color={0x2563eb}
            emissive={0x1e40af}
            emissiveIntensity={0.3}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
        {/* Second diagonal - rotated -45° around Z axis */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.15, 1.4, 0.15]} />
          <meshStandardMaterial
            color={0x2563eb}
            emissive={0x1e40af}
            emissiveIntensity={0.3}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
        {/* Third diagonal - rotated 45° around X axis for 3D depth */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, 0, Math.PI / 4]}>
          <boxGeometry args={[0.12, 1.4, 0.12]} />
          <meshStandardMaterial
            color={0x3b82f6}
            emissive={0x2563eb}
            emissiveIntensity={0.2}
            metalness={0.3}
            roughness={0.4}
            opacity={0.7}
            transparent
          />
        </mesh>
      </group>
    );
  }

  // O Symbol - Torus with enhanced materials (or simple ring on low quality)
  if (quality === 'low') {
    // Simple ring geometry for low-end devices
    return (
      <group ref={groupRef}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.45, 0.12, 8, 16]} />
          <meshBasicMaterial color={0xdc2626} />
        </mesh>
      </group>
    );
  }

  // Standard torus for medium/high quality
  const segments = quality === 'high' ? [20, 40] : [12, 24];
  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.45, 0.12, segments[0], segments[1]]} />
        <meshStandardMaterial
          color={0xdc2626}
          emissive={0xb91c1c}
          emissiveIntensity={0.3}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

/**
 * Individual Cell component in 3D space
 */
interface Cell3DProps {
  position: [number, number, number];
  value: Cell;
  index: number;
  onClick: (index: number) => void;
  disabled: boolean;
  isWinning: boolean;
  isFocused: boolean;
  quality: QualityPreset;
  reducedMotion?: boolean;
}

function Cell3D({ position, value, index, onClick, disabled, isWinning, isFocused, quality, reducedMotion = false }: Cell3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  // Pulsing animation for winning cells (skip if reduced motion)
  React.useEffect(() => {
    if (!isWinning || !meshRef.current || reducedMotion) return;

    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    const startTime = Date.now();

    const animate = () => {
      if (!meshRef.current || !isWinning) return;

      const elapsed = (Date.now() - startTime) / 1000; // seconds
      // Sine wave for smooth pulsing: oscillates between 0.5 and 1.5
      const pulse = 1 + 0.5 * Math.sin(elapsed * 3); // 3 rad/s = ~0.5 Hz

      // Update emissive intensity for glow effect
      material.emissiveIntensity = pulse * 0.8;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isWinning, reducedMotion]);

  // Material for the cell box
  const boxMaterial = useMemo(() => {
    if (isWinning) {
      return new THREE.MeshStandardMaterial({
        color: 0x10b981, // Green for winning
        emissive: 0x10b981, // Green glow
        emissiveIntensity: 0.8, // Will be animated
        transparent: true,
        opacity: 0.9,
        roughness: 0.3,
        metalness: 0.5,
      });
    }

    // Focused cell (keyboard navigation)
    if (isFocused && !value) {
      return new THREE.MeshStandardMaterial({
        color: 0xfbbf24, // Yellow for focus
        emissive: 0xfbbf24, // Yellow glow
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.8,
        roughness: 0.4,
        metalness: 0.3,
      });
    }

    return new THREE.MeshStandardMaterial({
      color: hovered && !value && !disabled ? 0x60a5fa : 0x3b82f6, // Blue
      transparent: true,
      opacity: value ? 0.3 : 0.6,
      roughness: 0.5,
      metalness: 0.2,
    });
  }, [hovered, value, disabled, isWinning, isFocused]);

  /**
   * Handle pointer down - track starting position for drag detection
   */
  const handlePointerDown = (e: any) => {
    dragStartRef.current = { x: e.clientX || e.touches?.[0]?.clientX || 0, y: e.clientY || e.touches?.[0]?.clientY || 0 };
  };

  /**
   * Handle click - only trigger if not dragging
   * Uses raycasting internally via React Three Fiber's event system
   */
  const handleClick = (e: any) => {
    if (!dragStartRef.current) return;

    // Calculate distance moved since pointer down
    const currentX = e.clientX || e.changedTouches?.[0]?.clientX || 0;
    const currentY = e.clientY || e.changedTouches?.[0]?.clientY || 0;
    const deltaX = Math.abs(currentX - dragStartRef.current.x);
    const deltaY = Math.abs(currentY - dragStartRef.current.y);
    const dragDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Only register as click if drag distance is small (< 5 pixels)
    // This prevents accidental clicks while rotating the camera
    if (dragDistance < 5 && !disabled && !value) {
      onClick(index);
    }

    dragStartRef.current = null;
  };

  /**
   * Handle pointer over - show hover effect and change cursor
   */
  const handlePointerOver = () => {
    if (!disabled && !value) {
      setHovered(true);
      document.body.style.cursor = 'pointer';
    }
  };

  /**
   * Handle pointer out - remove hover effect and reset cursor
   */
  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group position={position}>
      {/* Cell Box */}
      {/*
        Raycasting Implementation:
        React Three Fiber uses THREE.Raycaster internally for pointer events.
        When user clicks/touches:
        1. R3F converts pointer position to normalized device coordinates (-1 to 1)
        2. Creates a ray from camera through the pointer position
        3. Tests intersection with this mesh (via raycaster.intersectObjects)
        4. If intersected, triggers onClick with event data

        This is more efficient than manual raycasting and handles:
        - Mouse events (click, move, down, up)
        - Touch events (touchstart, touchend, touchmove)
        - Pointer events (unified API)
      */}
      <mesh
        ref={meshRef}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        userData={{ index }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <primitive object={boxMaterial} attach="material" />
      </mesh>

      {/* X and O Symbols with animations */}
      {value && <Symbol3D type={value} quality={quality} reducedMotion={reducedMotion} />}
    </group>
  );
}

/**
 * Helper function to get ARIA label for a cell
 */
function getCellAriaLabel(index: number, value: Cell): string {
  const { layer, row, col } = getCellCoordinates(index);
  const state = value ? `Occupied by ${value}` : 'Empty';
  return `Cell ${index}, Layer ${layer}, Row ${row}, Column ${col}. ${state}`;
}

/**
 * 3D Scene component containing all cells
 *
 * Raycasting Context:
 * React Three Fiber's Canvas component sets up the raycasting infrastructure:
 * - Creates a THREE.Raycaster instance
 * - Listens for pointer events on the canvas element
 * - Maintains a list of interactive objects (meshes with event handlers)
 * - Performs raycasting on each pointer event
 * - Dispatches events to intersected objects in order of distance
 *
 * This happens automatically - no manual raycaster setup needed.
 * Each Cell3D mesh with onClick/onPointerOver handlers is automatically
 * included in the raycasting system.
 */
interface Scene3DProps {
  board3D: Cell[];
  onCellClick: (index: number) => void;
  disabled: boolean;
  winningLine: number[] | null;
  controlsRef: React.MutableRefObject<OrbitControlsImpl | null>;
  quality: QualityPreset;
  reducedMotion?: boolean;
  focusedCellIndex: number | null;
}

function Scene3D({ board3D, onCellClick, disabled, winningLine, controlsRef, quality, reducedMotion = false, focusedCellIndex }: Scene3DProps) {
  const { camera } = useThree();

  return (
    <>
      {/* Lighting - simplified for low quality */}
      <ambientLight intensity={quality === 'low' ? 0.8 : 0.6} />
      {quality !== 'low' && (
        <>
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <directionalLight position={[-5, -5, -5]} intensity={0.4} />
        </>
      )}
      {quality === 'low' && <directionalLight position={[5, 5, 5]} intensity={0.5} />}

      {/* Camera */}
      <PerspectiveCamera makeDefault position={[4, 4, 4]} fov={50} />

      {/* Orbit Controls */}
      {/*
        OrbitControls Configuration:
        - enableDamping: Smooth, physics-like rotation
        - dampingFactor: Lower = smoother but slower (0.05)
        - minDistance/maxDistance: Zoom limits (5-15 units)
        - maxPolarAngle: Prevent camera flip (max π/2 = 90°)
        - enablePan: Disabled to avoid confusing navigation
        - rotateSpeed: Faster rotation for better UX
        - zoomSpeed: Moderate zoom speed
        - touches: Configured for mobile gestures
          - ONE_TOUCH: Rotate (1 finger drag)
          - TWO_TOUCH: Zoom (pinch)
      */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2}
        enablePan={false}
        rotateSpeed={0.8}
        zoomSpeed={0.8}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN
        }}
      />

      {/* Render all 27 cells */}
      {board3D.map((cell, index) => (
        <Cell3D
          key={index}
          position={calculateCellPosition(index)}
          value={cell}
          index={index}
          onClick={onCellClick}
          disabled={disabled}
          isWinning={winningLine?.includes(index) ?? false}
          isFocused={focusedCellIndex === index}
          quality={quality}
          reducedMotion={reducedMotion}
        />
      ))}

      {/* Grid helper (optional, for visual reference) */}
      <gridHelper args={[10, 10]} position={[0, -2, 0]} />
    </>
  );
}

/**
 * GameBoard3DInteractive Component
 *
 * Renders a true 3D Tic-Tac-Toe board using Three.js with interactive controls.
 *
 * Features:
 * - 27 cells in 3x3x3 cube formation
 * - Drag to rotate camera (OrbitControls)
 * - Scroll to zoom in/out
 * - Click/tap cells to place X or O
 * - Hover effects on empty cells
 * - Winning cells highlighted in green
 * - Touch-friendly for mobile devices
 *
 * Raycasting & Click Detection:
 * React Three Fiber handles raycasting automatically through its event system.
 * When a user clicks/touches:
 * 1. Pointer position is converted to normalized device coordinates (-1 to 1)
 * 2. A ray is cast from the camera through that position
 * 3. THREE.Raycaster.intersectObjects() tests which meshes the ray hits
 * 4. The closest intersected mesh triggers its onClick handler
 *
 * Drag vs Click Detection:
 * To prevent accidental clicks while rotating the camera:
 * - onPointerDown tracks the starting position
 * - onClick calculates the distance moved
 * - Only triggers if movement < 5 pixels (true click, not drag)
 *
 * Touch Events:
 * All pointer events work with touch:
 * - Touch = click
 * - Touch + drag = rotate camera
 * - Pinch = zoom
 */
export function GameBoard3DInteractive({
  board3D,
  onCellClick,
  disabled = false,
  winningLine = null,
  quality = 'medium',
  reducedMotion = false,
  currentPlayer = 'X',
}: GameBoard3DInteractiveProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [focusedCellIndex, setFocusedCellIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Screen reader announcements
  const [announcement, setAnnouncement] = useState<string>('');

  // Cleanup geometries and materials on unmount (memory management)
  useEffect(() => {
    return () => {
      // Three.js cleanup will be handled by React Three Fiber's automatic disposal
      // But we explicitly clear references
      if (controlsRef.current) {
        controlsRef.current = null;
      }
    };
  }, []);

  // Announce current player for screen readers
  useEffect(() => {
    setAnnouncement(`Current player: ${currentPlayer}`);
  }, [currentPlayer]);

  /**
   * Reset camera to default position with smooth animation
   * Target position: [4, 4, 4] (isometric view)
   * Target look-at: [0, 0, 0] (center of cube)
   * Animation duration: ~1 second (handled by damping) or instant if reduced motion
   */
  const resetCamera = () => {
    if (!controlsRef.current) return;

    setIsResetting(true);

    const controls = controlsRef.current;
    const camera = controls.object as THREE.PerspectiveCamera;

    // Target position
    const targetPosition = new THREE.Vector3(4, 4, 4);
    const targetLookAt = new THREE.Vector3(0, 0, 0);

    if (reducedMotion) {
      // Instant reset for reduced motion
      camera.position.copy(targetPosition);
      controls.target.copy(targetLookAt);
      controls.update();
      setIsResetting(false);
      return;
    }

    // Animate camera position
    const startPosition = camera.position.clone();
    const startTarget = controls.target.clone();
    const duration = 1000; // 1 second
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);

      // Interpolate position
      camera.position.lerpVectors(startPosition, targetPosition, eased);
      controls.target.lerpVectors(startTarget, targetLookAt, eased);
      controls.update();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsResetting(false);
      }
    };

    animate();
  };

  /**
   * Rotate camera with keyboard arrow keys
   */
  const rotateCamera = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (!controlsRef.current) return;

    const controls = controlsRef.current;
    const rotationAmount = 0.2; // radians

    // Get current azimuth and polar angles
    const spherical = new THREE.Spherical();
    const offset = new THREE.Vector3().subVectors(
      controls.object.position,
      controls.target
    );
    spherical.setFromVector3(offset);

    // Adjust angles based on direction
    if (direction === 'left') {
      spherical.theta -= rotationAmount;
    } else if (direction === 'right') {
      spherical.theta += rotationAmount;
    } else if (direction === 'up') {
      spherical.phi -= rotationAmount;
      // Clamp to prevent flipping
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));
    } else if (direction === 'down') {
      spherical.phi += rotationAmount;
      // Clamp to prevent flipping
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));
    }

    // Update camera position
    offset.setFromSpherical(spherical);
    controls.object.position.copy(controls.target).add(offset);
    controls.update();
  };

  /**
   * Zoom camera with keyboard +/- keys
   */
  const zoomCamera = (direction: 'in' | 'out') => {
    if (!controlsRef.current) return;

    const controls = controlsRef.current;
    const camera = controls.object as THREE.PerspectiveCamera;
    const zoomAmount = 0.5;

    // Calculate new distance
    const offset = new THREE.Vector3().subVectors(camera.position, controls.target);
    const distance = offset.length();
    const newDistance =
      direction === 'in'
        ? Math.max(5, distance - zoomAmount) // Min distance 5
        : Math.min(15, distance + zoomAmount); // Max distance 15

    // Update camera position
    offset.normalize().multiplyScalar(newDistance);
    camera.position.copy(controls.target).add(offset);
    controls.update();
  };

  /**
   * Handle cell selection via keyboard
   */
  const selectFocusedCell = () => {
    if (focusedCellIndex === null || disabled) return;

    const cell = board3D[focusedCellIndex];
    if (!cell) {
      onCellClick(focusedCellIndex);
      const { layer, row, col } = getCellCoordinates(focusedCellIndex);
      setAnnouncement(
        `Placed ${currentPlayer} in Cell ${focusedCellIndex}, Layer ${layer}, Row ${row}, Column ${col}`
      );
    }
  };

  /**
   * Handle keyboard shortcuts and navigation
   */
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Reset camera (R key)
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        resetCamera();
        return;
      }

      // Camera rotation (Arrow keys)
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        rotateCamera('up');
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        rotateCamera('down');
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        rotateCamera('left');
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        rotateCamera('right');
        return;
      }

      // Zoom (+ and - keys)
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        zoomCamera('in');
        return;
      }
      if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        zoomCamera('out');
        return;
      }

      // Tab navigation handled by browser default behavior
      // Enter/Space to select cell
      if ((e.key === 'Enter' || e.key === ' ') && focusedCellIndex !== null) {
        e.preventDefault();
        selectFocusedCell();
        return;
      }

      // Escape to unfocus
      if (e.key === 'Escape') {
        e.preventDefault();
        setFocusedCellIndex(null);
        setAnnouncement('Unfocused cell');
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedCellIndex, disabled, board3D, currentPlayer, reducedMotion]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      {/* Screen reader announcements (visually hidden) */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      {/* 3D Board Info */}
      <div className="text-center mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">
          Interactive 3D Tic-Tac-Toe
        </h3>
        <p className="text-xs sm:text-sm text-gray-600">
          Drag to rotate • Scroll to zoom • Click cells to play • Tab to navigate • Arrow keys to rotate
        </p>
      </div>

      {/* Keyboard navigation help */}
      <div className="mb-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <h4 className="text-sm font-semibold text-blue-900 mb-1">Keyboard Controls</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-blue-800">
          <div><kbd className="px-1 py-0.5 bg-white rounded border border-blue-300">Tab</kbd> Navigate cells</div>
          <div><kbd className="px-1 py-0.5 bg-white rounded border border-blue-300">Enter</kbd> Select cell</div>
          <div><kbd className="px-1 py-0.5 bg-white rounded border border-blue-300">Arrows</kbd> Rotate camera</div>
          <div><kbd className="px-1 py-0.5 bg-white rounded border border-blue-300">+/-</kbd> Zoom</div>
          <div><kbd className="px-1 py-0.5 bg-white rounded border border-blue-300">R</kbd> Reset view</div>
          <div><kbd className="px-1 py-0.5 bg-white rounded border border-blue-300">Esc</kbd> Unfocus</div>
        </div>
      </div>

      {/* Three.js Canvas */}
      <div
        className="w-full aspect-square bg-gray-100 rounded-lg shadow-lg overflow-hidden"
        role="application"
        aria-label="3D Tic-Tac-Toe game board"
      >
        <Canvas
          gl={{
            antialias: quality !== 'low', // Disable anti-aliasing on low quality
            powerPreference: quality === 'high' ? 'high-performance' : 'default',
          }}
          dpr={quality === 'low' ? 1 : quality === 'medium' ? 1.5 : 2} // Device pixel ratio
        >
          <Scene3D
            board3D={board3D}
            onCellClick={onCellClick}
            disabled={disabled}
            winningLine={winningLine}
            controlsRef={controlsRef}
            quality={quality}
            reducedMotion={reducedMotion}
            focusedCellIndex={focusedCellIndex}
          />
        </Canvas>
      </div>

      {/* Keyboard-accessible cell buttons (hidden visually, used for keyboard navigation) */}
      <div className="sr-only" role="group" aria-label="Game cells for keyboard navigation">
        {board3D.map((cell, index) => (
          <button
            key={index}
            onClick={() => onCellClick(index)}
            onFocus={() => {
              setFocusedCellIndex(index);
              const { layer, row, col } = getCellCoordinates(index);
              setAnnouncement(
                `Focused on Cell ${index}, Layer ${layer}, Row ${row}, Column ${col}. ${
                  cell ? `Occupied by ${cell}` : 'Empty'
                }`
              );
            }}
            onBlur={() => {
              if (focusedCellIndex === index) {
                setFocusedCellIndex(null);
              }
            }}
            disabled={disabled || cell !== null}
            aria-label={getCellAriaLabel(index, cell)}
            tabIndex={0}
          >
            {cell || 'Empty'}
          </button>
        ))}
      </div>

      {/* Camera Controls */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* Reset Camera Button */}
        <button
          onClick={resetCamera}
          disabled={isResetting}
          className={`
            px-4 py-2
            text-sm font-medium
            bg-indigo-600 text-white
            rounded-lg
            shadow-sm
            transition-all duration-200
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:ring-offset-2
            ${isResetting
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-indigo-700 active:scale-95'
            }
          `}
          aria-label="Reset camera to default view"
        >
          {isResetting ? '↻ Resetting...' : '↻ Reset View'}
        </button>

        {/* Controls Info */}
        <p className="text-xs sm:text-sm text-gray-500 text-center">
          <strong>Desktop:</strong> Drag to rotate, scroll to zoom • <strong>Mobile:</strong> Touch to rotate, pinch to zoom • <strong>Keyboard:</strong> Arrow keys rotate, +/- zoom, R reset
        </p>
      </div>

      {/* Focused cell indicator */}
      {focusedCellIndex !== null && (
        <div className="mt-3 text-center bg-yellow-50 border border-yellow-300 rounded-lg p-2">
          <p className="text-sm text-yellow-900">
            <strong>Focused:</strong> Cell {focusedCellIndex} •{' '}
            {(() => {
              const { layer, row, col } = getCellCoordinates(focusedCellIndex);
              return `Layer ${layer}, Row ${row}, Column ${col}`;
            })()} •{' '}
            {board3D[focusedCellIndex] ? `Occupied by ${board3D[focusedCellIndex]}` : 'Empty'} •{' '}
            Press <kbd className="px-1 py-0.5 bg-white rounded border border-yellow-400">Enter</kbd> to select
          </p>
        </div>
      )}
    </div>
  );
}
