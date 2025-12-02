"use client";

import { useRef, useState, useEffect } from "react";
import { GameState } from "../utils/types";
import { GAME_CONFIG } from "../utils/constants";
import { useImageLoader } from "../utils/useImageLoader";
import { useKeyboardInput } from "../utils/useKeyboardInput";
import { useGameLoop } from "../utils/useGameLoop";
import { useCanvasRenderer } from "../utils/useCanvasRenderer";
import { GameTitle } from "./GameTitle";
import { GameInstructions } from "./GameInstructions";
import { CelebrationEffects } from "./CelebrationEffects";
import { GameControls } from "./GameControls";

/**
 * Main RookieGame Component
 * A retro-style platformer game featuring the Rookie House mascot
 * Fully responsive with touch controls for mobile devices
 */
export default function RookieGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 500 });

  // Initialize game state
  const [gameState, setGameState] = useState<GameState>({
    playerX: 100,
    playerY: GAME_CONFIG.groundY - GAME_CONFIG.playerHeight,
    velocityY: 0,
    isGrounded: true,
    isMovingLeft: false,
    isMovingRight: false,
    isJumping: false,
    boxHits: 0,
    showCup: false,
    hasTransformed: false,
    isDrinking: false,
    showCelebration: false,
    animationFrame: 0,
    frameCounter: 0,
    jumpStartFrame: 0,
    boxHitAnimation: 0,
    screenShakeX: 0,
    screenShakeY: 0,
    cupAnimationState: "none",
    cupY: GAME_CONFIG.boxY,
    cupX: GAME_CONFIG.boxX + 12,
    cupAnimationCounter: 0,
    transformationState: "none",
    transformationCounter: 0,
    currentPlayerSize: 1.0,
    drinkingAnimationCounter: 0,
  });

  // Load game assets
  const { images, isLoading, loadProgress } = useImageLoader();

  // Handle keyboard input
  const keys = useKeyboardInput();

  // Touch control handlers
  const [touchKeys, setTouchKeys] = useState({
    ArrowLeft: false,
    ArrowRight: false,
    Space: false,
  });

  // Merge keyboard and touch inputs
  const mergedKeys = {
    ArrowLeft: keys.ArrowLeft || touchKeys.ArrowLeft,
    ArrowRight: keys.ArrowRight || touchKeys.ArrowRight,
    Space: keys.Space || touchKeys.Space,
  };

  // Run game loop with merged keys
  useGameLoop(mergedKeys, images, gameState, setGameState);

  // Render to canvas
  useCanvasRenderer(canvasRef, gameState, images);

  // Responsive canvas sizing
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const maxWidth = 800;
        const maxHeight = 500;
        const aspectRatio = maxWidth / maxHeight;

        const width = Math.min(containerWidth - 32, maxWidth);
        const height = width / aspectRatio;

        setCanvasSize({ width, height });
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  // Show loading screen while images are loading
  if (isLoading) {
    // Calculate number of filled blocks (out of 20)
    const totalBlocks = 20;
    const filledBlocks = Math.floor((loadProgress / 100) * totalBlocks);

    return (
      <div
        className="h-screen bg-white flex flex-col items-center justify-center p-4"
        style={{ fontFamily: "VT323, monospace" }}
      >
        <div className="text-center max-w-2xl w-full flex flex-col items-center">
          {/* Title */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl text-black mb-12 font-bold tracking-widest">
            PLAYGROUND
          </h1>

          {/* Loading text */}
          <p className="text-3xl sm:text-4xl text-black font-bold tracking-widest mb-8">
            LOADING...
          </p>

          {/* Retro ASCII Loading Bar */}
          <div className="mb-8 flex flex-col items-center">
            {/* Top border */}
            <div className="text-2xl sm:text-3xl text-black font-bold mb-1 whitespace-nowrap">
              ┌{'─'.repeat(totalBlocks * 2)}┐
            </div>

            {/* Loading bar with blocks */}
            <div className="text-2xl sm:text-3xl text-black font-bold mb-1 whitespace-nowrap">
              │{
                Array.from({ length: totalBlocks }).map((_, i) => (
                  <span key={i}>
                    {i < filledBlocks ? '██' : '░░'}
                  </span>
                ))
              }│
            </div>

            {/* Bottom border */}
            <div className="text-2xl sm:text-3xl text-black font-bold whitespace-nowrap">
              └{'─'.repeat(totalBlocks * 2)}┘
            </div>
          </div>

          {/* Percentage */}
          <div className="text-4xl sm:text-5xl text-black font-bold tracking-wider">
            {loadProgress}%
          </div>

          {/* Status message */}
          <p className="text-xl sm:text-2xl text-gray-600 mt-6 tracking-wide">
            PREPARING ROOKIE ASSETS...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-screen bg-white flex flex-col items-center justify-center py-1 px-2 overflow-hidden"
      style={{ fontFamily: "VT323, monospace" }}
    >
      <GameTitle gameState={gameState} />

      <div className="relative w-full max-w-4xl">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className="border-4 border-black bg-white shadow-2xl rounded-lg mx-auto block"
          style={{
            width: `${canvasSize.width}px`,
            height: `${canvasSize.height}px`,
            imageRendering: "pixelated",
          }}
        />

        <CelebrationEffects show={gameState.showCelebration} />
      </div>

      {/* Touch Controls for Mobile */}
      <GameControls
        onLeftPress={() => setTouchKeys((prev) => ({ ...prev, ArrowLeft: true }))}
        onLeftRelease={() => setTouchKeys((prev) => ({ ...prev, ArrowLeft: false }))}
        onRightPress={() => setTouchKeys((prev) => ({ ...prev, ArrowRight: true }))}
        onRightRelease={() => setTouchKeys((prev) => ({ ...prev, ArrowRight: false }))}
        onJumpPress={() => setTouchKeys((prev) => ({ ...prev, Space: true }))}
        onJumpRelease={() => setTouchKeys((prev) => ({ ...prev, Space: false }))}
      />

      <GameInstructions gameState={gameState} />
    </div>
  );
}
