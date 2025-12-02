import { GameState } from "./types";
import { ANIMATION_CONFIG, GAME_CONFIG } from "./constants";

/**
 * Handle drinking animation logic
 */
export const updateDrinkingAnimation = (state: GameState): GameState => {
    const newState = { ...state };
    newState.drinkingAnimationCounter += 1;

    if (newState.drinkingAnimationCounter >= ANIMATION_CONFIG.drinkingAnimationFrames) {
        newState.isDrinking = false;
        newState.transformationState = "transforming";
        newState.transformationCounter = 0;
    }

    return newState;
};

/**
 * Handle transformation animation logic
 */
export const updateTransformationAnimation = (state: GameState): GameState => {
    const newState = { ...state };
    newState.transformationCounter += 1;

    const totalCycles = ANIMATION_CONFIG.transformationCycles;
    const framesPerCycle = ANIMATION_CONFIG.framesPerCycle;
    const totalFrames = totalCycles * framesPerCycle;

    if (newState.transformationCounter <= totalFrames) {
        const currentCycle = Math.floor(
            (newState.transformationCounter - 1) / framesPerCycle
        );
        const cycleProgress =
            ((newState.transformationCounter - 1) % framesPerCycle) / framesPerCycle;

        const isGrowingCycle = currentCycle % 2 === 0;

        if (isGrowingCycle) {
            newState.currentPlayerSize = 1.0 + cycleProgress * 0.4;
        } else {
            newState.currentPlayerSize = 1.4 - cycleProgress * 0.4;
        }
    } else {
        const finalGrowthFrames = ANIMATION_CONFIG.finalGrowthFrames;
        const finalProgress = Math.min(
            1,
            (newState.transformationCounter - totalFrames) / finalGrowthFrames
        );

        if (finalProgress < 1) {
            const easeOut = 1 - Math.pow(1 - finalProgress, 3);
            newState.currentPlayerSize = 1.0 + easeOut * 0.3;
        } else {
            newState.transformationState = "complete";
            newState.hasTransformed = true;
            newState.currentPlayerSize = 1.0;
            newState.playerY = GAME_CONFIG.groundY - GAME_CONFIG.bigPlayerHeight;
            newState.showCelebration = true;
            newState.velocityY = -8;
            newState.isGrounded = false;
        }
    }

    return newState;
};

/**
 * Handle box hit animation and screen shake
 */
export const updateBoxHitAnimation = (state: GameState): GameState => {
    const newState = { ...state };

    if (newState.boxHitAnimation > 0) {
        newState.boxHitAnimation -= 1;

        const shakeIntensity = newState.boxHitAnimation / 25;
        if (newState.boxHitAnimation > 20) {
            newState.screenShakeX = (Math.random() - 0.5) * 10 * shakeIntensity;
            newState.screenShakeY = (Math.random() - 0.5) * 8 * shakeIntensity;
        } else if (newState.boxHitAnimation > 15) {
            newState.screenShakeX = (Math.random() - 0.5) * 6 * shakeIntensity;
            newState.screenShakeY = (Math.random() - 0.5) * 5 * shakeIntensity;
        } else if (newState.boxHitAnimation > 8) {
            newState.screenShakeX = (Math.random() - 0.5) * 4 * shakeIntensity;
            newState.screenShakeY = (Math.random() - 0.5) * 3 * shakeIntensity;
        } else if (newState.boxHitAnimation > 3) {
            newState.screenShakeX = (Math.random() - 0.5) * 2 * shakeIntensity;
            newState.screenShakeY = (Math.random() - 0.5) * 1.5 * shakeIntensity;
        } else {
            newState.screenShakeX = 0;
            newState.screenShakeY = 0;
        }
    } else {
        newState.screenShakeX = 0;
        newState.screenShakeY = 0;
    }

    return newState;
};

/**
 * Handle cup animation (rising and falling)
 */
export const updateCupAnimation = (state: GameState): GameState => {
    const newState = { ...state };

    if (newState.cupAnimationState === "none") {
        return newState;
    }

    newState.cupAnimationCounter += 1;

    if (newState.cupAnimationState === "rising") {
        const riseSpeed = ANIMATION_CONFIG.cupRiseSpeed;
        newState.cupY -= riseSpeed;

        if (newState.cupY <= GAME_CONFIG.boxY - 60) {
            newState.cupAnimationState = "falling";
            newState.cupAnimationCounter = 0;
        }
    } else if (newState.cupAnimationState === "falling") {
        const fallProgress = newState.cupAnimationCounter / ANIMATION_CONFIG.cupFallFrames;
        const startX = GAME_CONFIG.boxX + 12;
        const endX = GAME_CONFIG.boxX + 150;
        const startY = GAME_CONFIG.boxY - 60;
        const endY = GAME_CONFIG.groundY - 44;

        newState.cupX = startX + (endX - startX) * fallProgress;
        newState.cupY = startY + (endY - startY) * fallProgress * fallProgress;

        if (newState.cupAnimationCounter >= ANIMATION_CONFIG.cupFallFrames) {
            newState.cupAnimationState = "landed";
            newState.cupX = endX;
            newState.cupY = endY;
            newState.showCup = true;
        }
    }

    return newState;
};
