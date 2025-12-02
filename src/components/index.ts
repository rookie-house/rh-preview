// Main component
export { default } from "./RookieGame";

// Types
export type { GameState, Keys, ConfettiParticle } from "../utils/types";

// Constants
export { ASSETS, GAME_CONFIG, ANIMATION_CONFIG, CONFETTI_COLORS } from "../utils/constants";

// Utilities
export {
    checkBoxCollision,
    checkCupCollision,
    checkBoxTopCollision,
    checkWallCollision,
    getPlayerDimensions,
    getMoveSpeed,
} from "../utils/gameUtils";

// Hooks
export { useImageLoader } from "../utils/useImageLoader";
export { useKeyboardInput } from "../utils/useKeyboardInput";
export { useGameLoop } from "../utils/useGameLoop";
export { useCanvasRenderer } from "../utils/useCanvasRenderer";

// Components
export { GameTitle } from "./GameTitle";
export { GameInstructions } from "./GameInstructions";
export { CelebrationEffects } from "./CelebrationEffects";
export { GameControls } from "./GameControls";

// Handlers
export {
    updateDrinkingAnimation,
    updateTransformationAnimation,
    updateBoxHitAnimation,
    updateCupAnimation,
} from "../utils/animationHandlers";

export {
    updatePlayerMovement,
    updatePlayerJump,
    updateGravity,
    updateBoxCollision,
    updateCupCollisionCheck,
} from "../utils/physicsHandlers";

// Rendering
export {
    drawGround,
    drawBox,
    drawCup,
    drawPlayer,
} from "../utils/renderFunctions";

// Utilities
export { generateConfetti } from "../utils/confetti";
