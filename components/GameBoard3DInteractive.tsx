'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Cell } from '@/lib/types';

/**
 * Props for GameBoard3DInteractive component
 */
interface GameBoard3DInteractiveProps {
  board3D: Cell[];
  onCellClick: (index: number) => void;
  disabled?: boolean;
  winningLine?: number[] | null;
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
 * Individual Cell component in 3D space
 */
interface Cell3DProps {
  position: [number, number, number];
  value: Cell;
  index: number;
  onClick: (index: number) => void;
  disabled: boolean;
  isWinning: boolean;
}

function Cell3D({ position, value, index, onClick, disabled, isWinning }: Cell3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);

  // Material for the cell box
  const boxMaterial = useMemo(() => {
    if (isWinning) {
      return new THREE.MeshStandardMaterial({
        color: 0x10b981, // Green for winning
        transparent: true,
        opacity: 0.9,
        roughness: 0.5,
        metalness: 0.2,
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

  const handleClick = () => {
    if (!disabled && !value) {
      onClick(index);
    }
  };

  return (
    <group position={position}>
      {/* Cell Box */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        userData={{ index }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <primitive object={boxMaterial} attach="material" />
      </mesh>

      {/* X Symbol (two crossed boxes) */}
      {value === 'X' && (
        <>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.1, 1.2, 0.1]} />
            <meshStandardMaterial color={0x2563eb} />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.1, 1.2, 0.1]} />
            <meshStandardMaterial color={0x2563eb} />
          </mesh>
        </>
      )}

      {/* O Symbol (torus) */}
      {value === 'O' && (
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.4, 0.1, 16, 32]} />
          <meshStandardMaterial color={0xdc2626} />
        </mesh>
      )}
    </group>
  );
}

/**
 * 3D Scene component containing all cells
 */
interface Scene3DProps {
  board3D: Cell[];
  onCellClick: (index: number) => void;
  disabled: boolean;
  winningLine: number[] | null;
}

function Scene3D({ board3D, onCellClick, disabled, winningLine }: Scene3DProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, -5, -5]} intensity={0.4} />

      {/* Camera */}
      <PerspectiveCamera makeDefault position={[4, 4, 4]} fov={50} />

      {/* Orbit Controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2}
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
 * Features:
 * - 27 cells in 3x3x3 cube formation
 * - Drag to rotate camera
 * - Scroll to zoom
 * - Click cells to place X or O
 * - Winning cells highlighted
 */
export function GameBoard3DInteractive({
  board3D,
  onCellClick,
  disabled = false,
  winningLine = null,
}: GameBoard3DInteractiveProps) {
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
        <Canvas>
          <Scene3D
            board3D={board3D}
            onCellClick={onCellClick}
            disabled={disabled}
            winningLine={winningLine}
          />
        </Canvas>
      </div>

      {/* Controls Info */}
      <div className="mt-4 text-center">
        <p className="text-xs sm:text-sm text-gray-500">
          <strong>Desktop:</strong> Drag to rotate, scroll to zoom • <strong>Mobile:</strong> Touch to rotate, pinch to zoom
        </p>
      </div>
    </div>
  );
}
