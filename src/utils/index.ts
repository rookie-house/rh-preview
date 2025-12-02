// Types
export type { GameState, Keys, ConfettiParticle } from "./types";

// Constants
export { ASSETS, GAME_CONFIG, ANIMATION_CONFIG, CONFETTI_COLORS } from "./constants";

// Game Utilities
export {
    checkBoxCollision,
    checkCupCollision,
    checkBoxTopCollision,
    checkWallCollision,
    getPlayerDimensions,
    getMoveSpeed,
} from "./gameUtils";

// Hooks
export { useImageLoader } from "./useImageLoader";
export { useKeyboardInput } from "./useKeyboardInput";
export { useGameLoop } from "./useGameLoop";
export { useCanvasRenderer } from "./useCanvasRenderer";

// Animation Handlers
export {
    updateDrinkingAnimation,
    updateTransformationAnimation,
    updateBoxHitAnimation,
    updateCupAnimation,
} from "./animationHandlers";

// Physics Handlers
export {
    updatePlayerMovement,
    updatePlayerJump,
    updateGravity,
    updateBoxCollision,
    updateCupCollisionCheck,
} from "./physicsHandlers";

// Rendering Functions
export {
    drawGround,
    drawBox,
    drawCup,
    drawPlayer,
} from "./renderFunctions";

// Confetti Utilities
export { generateConfetti } from "./confetti";
