import { GameState, Keys } from "./types";
import { GAME_CONFIG, ANIMATION_CONFIG } from "./constants";
import {
    checkBoxCollision,
    checkCupCollision,
    checkBoxTopCollision,
    checkWallCollision,
    getMoveSpeed,
    getPlayerDimensions,
} from "./gameUtils";

/**
 * Handle horizontal player movement
 */
export const updatePlayerMovement = (
    state: GameState,
    keys: Keys
): GameState => {
    // eslint-disable-next-line prefer-const
    let newState = { ...state };
    const dimensions = getPlayerDimensions(newState);
    const currentWidth = dimensions.width;
    const currentHeight = dimensions.height;
    const moveSpeed = getMoveSpeed(newState.hasTransformed);

    if (keys.ArrowLeft && newState.playerX > 0) {
        const newX = newState.playerX - moveSpeed;

        if (newX < 0) {
            newState.isMovingLeft = false;
            newState.isMovingRight = false;
        } else {
            const nearWall =
                newState.boxHits >= 5 &&
                newX + currentWidth > GAME_CONFIG.boxX - 10 &&
                newX < GAME_CONFIG.boxX + GAME_CONFIG.boxWidth + 10;

            if (
                nearWall &&
                checkWallCollision(newX, newState.playerY, currentWidth, currentHeight)
            ) {
                newState.isMovingLeft = false;
                newState.isMovingRight = false;
            } else {
                newState.playerX = newX;
                newState.isMovingLeft = true;
                newState.isMovingRight = false;

                if (newState.isGrounded && !newState.isJumping) {
                    newState.animationFrame =
                        (Math.floor(newState.frameCounter / ANIMATION_CONFIG.walkFrameInterval) % 2) + 1;
                }
            }
        }
    } else if (keys.ArrowRight) {
        const newX = newState.playerX + moveSpeed;

        if (newX + currentWidth > 800) {
            newState.isMovingLeft = false;
            newState.isMovingRight = false;
        } else {
            const nearWall =
                newState.boxHits >= 5 &&
                newX + currentWidth > GAME_CONFIG.boxX - 10 &&
                newX < GAME_CONFIG.boxX + GAME_CONFIG.boxWidth + 10;

            if (
                nearWall &&
                checkWallCollision(newX, newState.playerY, currentWidth, currentHeight)
            ) {
                newState.isMovingLeft = false;
                newState.isMovingRight = false;
            } else {
                newState.playerX = newX;
                newState.isMovingRight = true;
                newState.isMovingLeft = false;

                if (newState.isGrounded && !newState.isJumping) {
                    newState.animationFrame =
                        (Math.floor(newState.frameCounter / ANIMATION_CONFIG.walkFrameInterval) % 2) + 1;
                }
            }
        }
    } else {
        newState.isMovingLeft = false;
        newState.isMovingRight = false;
        if (newState.isGrounded) {
            newState.animationFrame = 0;
        }
    }

    return newState;
};

/**
 * Handle player jumping
 */
export const updatePlayerJump = (state: GameState, keys: Keys): GameState => {
    const newState = { ...state };

    if (keys.Space && newState.isGrounded) {
        // OG Rookie needs more jump power to reach the wall
        const jumpPower = newState.hasTransformed
            ? GAME_CONFIG.jumpPower * 1.15  // 15% more jump power for OG Rookie
            : GAME_CONFIG.jumpPower;

        newState.velocityY = jumpPower;
        newState.isGrounded = false;
        newState.isJumping = true;
        newState.animationFrame = 3;
        newState.jumpStartFrame = newState.frameCounter;
    }

    if (!newState.isGrounded && newState.isJumping) {
        newState.animationFrame = 3;
    }

    return newState;
};

/**
 * Handle gravity and vertical movement
 */
export const updateGravity = (state: GameState): GameState => {
    // eslint-disable-next-line prefer-const
    let newState = { ...state };

    if (!newState.isGrounded) {
        newState.velocityY += GAME_CONFIG.gravity;
        const newY = newState.playerY + newState.velocityY;
        const currentWidth = newState.hasTransformed
            ? GAME_CONFIG.bigPlayerWidth
            : GAME_CONFIG.playerWidth;
        const currentHeight = newState.hasTransformed
            ? GAME_CONFIG.bigPlayerHeight
            : GAME_CONFIG.playerHeight;

        // Check wall collision (both falling down AND jumping up)
        if (
            newState.boxHits >= 5 &&
            checkWallCollision(newState.playerX, newY, currentWidth, currentHeight)
        ) {
            // Player is colliding with wall
            if (newState.velocityY > 0) {
                // Falling down - land on top of wall
                newState.playerY = GAME_CONFIG.boxY - currentHeight;
                newState.velocityY = 0;
                newState.isGrounded = true;
                newState.isJumping = false;
                if (!newState.isMovingLeft && !newState.isMovingRight) {
                    newState.animationFrame = 0;
                }
            } else if (newState.velocityY < 0) {
                // Jumping up - hit head on bottom of wall
                // Keep collision box below wall to prevent going through
                newState.playerY = GAME_CONFIG.boxY + GAME_CONFIG.boxHeight;
                newState.velocityY = 3; // Start falling immediately
                newState.isGrounded = false;
                newState.isJumping = false;
            }
        } else {
            newState.playerY = newY;
        }

        // Check box top collision
        if (
            checkBoxTopCollision(
                newState.playerX,
                newState.playerY,
                currentWidth,
                currentHeight
            ) &&
            newState.velocityY >= 0
        ) {
            newState.playerY = GAME_CONFIG.boxY - currentHeight;
            newState.velocityY = 0;
            newState.isGrounded = true;
            newState.isJumping = false;
            if (!newState.isMovingLeft && !newState.isMovingRight) {
                newState.animationFrame = 0;
            } else if (newState.isMovingLeft || newState.isMovingRight) {
                if (newState.frameCounter % 16 < 8) {
                    newState.animationFrame = 1;
                } else {
                    newState.animationFrame = 2;
                }
            }
        }
        // Check ground collision - precise positioning
        else if (newState.playerY >= GAME_CONFIG.groundY - currentHeight) {
            newState.playerY = GAME_CONFIG.groundY - currentHeight;
            newState.velocityY = 0;
            newState.isGrounded = true;
            newState.isJumping = false;

            const landingDuration = ANIMATION_CONFIG.landingDuration;
            const framesSinceLanding =
                newState.frameCounter - (newState.jumpStartFrame || 0);

            if (framesSinceLanding < landingDuration) {
                newState.animationFrame = 0;
            } else {
                if (!newState.isMovingLeft && !newState.isMovingRight) {
                    newState.animationFrame = 0;
                } else {
                    newState.animationFrame =
                        (Math.floor(newState.frameCounter / ANIMATION_CONFIG.walkFrameInterval) % 2) + 1;
                }
            }
        }
    } else {
        // Check if player walked off the box
        const currentWidth = newState.hasTransformed
            ? GAME_CONFIG.bigPlayerWidth
            : GAME_CONFIG.playerWidth;
        const currentHeight = newState.hasTransformed
            ? GAME_CONFIG.bigPlayerHeight
            : GAME_CONFIG.playerHeight;

        if (newState.playerY === GAME_CONFIG.boxY - currentHeight) {
            if (
                !checkBoxTopCollision(
                    newState.playerX,
                    newState.playerY,
                    currentWidth,
                    currentHeight
                )
            ) {
                newState.isGrounded = false;
                newState.velocityY = 0;
            }
        }
    }

    return newState;
};

/**
 * Handle box collision detection and hit counter
 */
export const updateBoxCollision = (state: GameState): GameState => {
    const newState = { ...state };

    if (
        checkBoxCollision(
            newState.playerX,
            newState.playerY,
            newState.currentPlayerSize,
            newState.hasTransformed
        ) &&
        newState.isJumping &&
        newState.velocityY < 0
    ) {
        if (newState.boxHits < 5) {
            newState.boxHits += 1;
            newState.boxHitAnimation = ANIMATION_CONFIG.boxHitAnimationFrames;
            if (newState.boxHits === 5) {
                newState.cupAnimationState = "rising";
                newState.cupAnimationCounter = 0;
                newState.cupY = GAME_CONFIG.boxY;
                newState.showCup = false;
            }
            newState.velocityY = 2;
        }
    }

    return newState;
};

/**
 * Handle cup collision and drinking
 */
export const updateCupCollisionCheck = (state: GameState): GameState => {
    const newState = { ...state };

    if (
        newState.showCup &&
        !newState.hasTransformed &&
        newState.transformationState === "none" &&
        checkCupCollision(
            newState.playerX,
            newState.playerY,
            newState.cupX,
            newState.cupY
        )
    ) {
        newState.isDrinking = true;
        newState.showCup = false;
        newState.cupAnimationState = "none";
        newState.drinkingAnimationCounter = 0;
    }

    return newState;
};
