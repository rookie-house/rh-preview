import { GAME_CONFIG } from "./constants";
import { GameState } from "./types";

/**
 * Check collision between player and box from below
 */
export const checkBoxCollision = (
    playerX: number,
    playerY: number,
    playerSize: number,
    hasTransformed: boolean
): boolean => {
    const currentWidth = hasTransformed
        ? GAME_CONFIG.bigPlayerWidth * playerSize
        : GAME_CONFIG.playerWidth * playerSize;

    const currentHeight = hasTransformed
        ? GAME_CONFIG.bigPlayerHeight * playerSize
        : GAME_CONFIG.playerHeight * playerSize;

    // Account for sprite offset - the visual sprite is rendered lower
    const spriteOffset = hasTransformed
        ? GAME_CONFIG.bigSpriteYOffset
        : GAME_CONFIG.spriteYOffset;

    const playerLeft = playerX;
    const playerRight = playerX + currentWidth;
    const playerTop = playerY + spriteOffset; // Add offset to get visual top
    const playerBottom = playerY + currentHeight + spriteOffset;

    const boxBottom = GAME_CONFIG.boxY + GAME_CONFIG.boxHeight;
    const boxTop = GAME_CONFIG.boxY;
    const boxLeft = GAME_CONFIG.boxX;
    const boxRight = GAME_CONFIG.boxX + GAME_CONFIG.boxWidth;

    // Horizontal overlap check - good tolerance for gameplay
    const horizontalOverlap = playerRight > boxLeft + 5 && playerLeft < boxRight - 5;

    // Head hitting bottom - check if visual character's head hits box bottom
    const headHittingBottom = playerTop <= boxBottom && playerTop >= boxBottom - 30;

    // Player must be below the box (visual position)
    const playerBelowBox = playerBottom > boxTop + 10;

    return horizontalOverlap && headHittingBottom && playerBelowBox;
};

/**
 * Check collision between player and cup
 */
export const checkCupCollision = (
    playerX: number,
    playerY: number,
    cupX: number,
    cupY: number
): boolean => {
    const cupSize = 44;
    return (
        playerX < cupX + cupSize &&
        playerX + GAME_CONFIG.playerWidth > cupX &&
        playerY < cupY + cupSize &&
        playerY + GAME_CONFIG.playerHeight > cupY
    );
};

/**
 * Check if player is standing on top of the box
 */
export const checkBoxTopCollision = (
    playerX: number,
    playerY: number,
    playerWidth: number,
    playerHeight: number
): boolean => {
    const playerBottom = playerY + playerHeight;
    const playerRight = playerX + playerWidth;
    const boxTop = GAME_CONFIG.boxY;
    const boxLeft = GAME_CONFIG.boxX;
    const boxRight = GAME_CONFIG.boxX + GAME_CONFIG.boxWidth;

    // Precise collision - no gaps allowed
    return (
        playerRight > boxLeft + 1 &&  // Minimal horizontal overlap
        playerX < boxRight - 1 &&
        Math.abs(playerBottom - boxTop) <= 1 &&  // Tight vertical tolerance
        playerY < boxTop  // Player top above box
    );
};

/**
 * Check horizontal collision with the wall (after box transformation)
 */
export const checkWallCollision = (
    playerX: number,
    playerY: number,
    playerWidth: number,
    playerHeight: number
): boolean => {
    const playerRight = playerX + playerWidth;
    const playerBottom = playerY + playerHeight;
    const boxLeft = GAME_CONFIG.boxX;
    const boxRight = GAME_CONFIG.boxX + GAME_CONFIG.boxWidth;
    const boxTop = GAME_CONFIG.boxY;
    const boxBottom = GAME_CONFIG.boxY + GAME_CONFIG.boxHeight;

    return (
        playerX < boxRight &&
        playerRight > boxLeft &&
        playerY < boxBottom &&
        playerBottom > boxTop
    );
};

/**
 * Get current player dimensions based on transformation state
 */
export const getPlayerDimensions = (gameState: GameState) => {
    if (gameState.transformationState === "transforming") {
        return {
            width: GAME_CONFIG.playerWidth * gameState.currentPlayerSize,
            height: GAME_CONFIG.playerHeight * gameState.currentPlayerSize,
        };
    } else if (gameState.hasTransformed) {
        return {
            width: GAME_CONFIG.bigPlayerWidth,
            height: GAME_CONFIG.bigPlayerHeight,
        };
    } else {
        return {
            width: GAME_CONFIG.playerWidth,
            height: GAME_CONFIG.playerHeight,
        };
    }
};

/**
 * Get move speed based on transformation state
 */
export const getMoveSpeed = (hasTransformed: boolean): number => {
    return hasTransformed ? 4.5 : 3;
};
