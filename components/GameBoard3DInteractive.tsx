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
 * 3D Symbol component with smooth animations
 * Renders X or O with scale-in and fade-in animation
 */
interface Symbol3DProps {
  type: 'X' | 'O';
  quality: QualityPreset;
}

function Symbol3D({ type, quality }: Symbol3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [scale, setScale] = useState(0);

  // Animate symbol appearance
  React.useEffect(() => {
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
  }, []);

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
  quality: QualityPreset;
}

function Cell3D({ position, value, index, onClick, disabled, isWinning, quality }: Cell3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  // Pulsing animation for winning cells
  React.useEffect(() => {
    if (!isWinning || !meshRef.current) return;

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
  }, [isWinning]);

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

    return new THREE.MeshStandardMaterial({
      color: hovered && !value && !disabled ? 0x60a5fa : 0x3b82f6, // Blue
      transparent: true,
      opacity: value ? 0.3 : 0.6,
      roughness: 0.5,
      metalness: 0.2,
    });
  }, [hovered, value, disabled, isWinning]);

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
      {value && <Symbol3D type={value} quality={quality} />}
    </group>
  );
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
}

function Scene3D({ board3D, onCellClick, disabled, winningLine, controlsRef, quality }: Scene3DProps) {
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
          quality={quality}
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
}: GameBoard3DInteractiveProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const [isResetting, setIsResetting] = useState(false);

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

  /**
   * Reset camera to default position with smooth animation
   * Target position: [4, 4, 4] (isometric view)
   * Target look-at: [0, 0, 0] (center of cube)
   * Animation duration: ~1 second (handled by damping)
   */
  const resetCamera = () => {
    if (!controlsRef.current) return;

    setIsResetting(true);

    const controls = controlsRef.current;
    const camera = controls.object as THREE.PerspectiveCamera;

    // Animate camera position
    const targetPosition = new THREE.Vector3(4, 4, 4);
    const targetLookAt = new THREE.Vector3(0, 0, 0);

    // Create smooth animation using requestAnimationFrame
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
   * Handle keyboard shortcuts
   * R key: Reset camera view
   */
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        resetCamera();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      {/* 3D Board Info */}
      <div className="text-center mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">
          Interactive 3D Tic-Tac-Toe
        </h3>
        <p className="text-xs sm:text-sm text-gray-600">
          Drag to rotate • Scroll to zoom • Click cells to play
        </p>
      </div>

      {/* Three.js Canvas */}
      <div className="w-full aspect-square bg-gray-100 rounded-lg shadow-lg overflow-hidden">
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
          />
        </Canvas>
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
          <strong>Desktop:</strong> Drag to rotate, scroll to zoom • <strong>Mobile:</strong> Touch to rotate, pinch to zoom • <strong>Keyboard:</strong> Press R to reset
        </p>
      </div>
    </div>
  );
}
