import { GameState } from "./types";
import { GAME_CONFIG } from "./constants";

/**
 * Draw the ground line
 */
export const drawGround = (
    ctx: CanvasRenderingContext2D,
    canvasWidth: number
) => {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GAME_CONFIG.groundY);
    ctx.lineTo(canvasWidth, GAME_CONFIG.groundY);
    ctx.stroke();
};

/**
 * Draw the box (question box or wall)
 */
export const drawBox = (
    ctx: CanvasRenderingContext2D,
    gameState: GameState,
    boxImage: HTMLImageElement
) => {
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const boxSpriteWidth = boxImage.width / 2;
    const boxSpriteHeight = boxImage.height;
    const boxFrame = gameState.boxHits >= 5 ? 1 : 0;
    const boxFrameX = boxFrame * boxSpriteWidth;

    let boxX = GAME_CONFIG.boxX;
    let boxY = GAME_CONFIG.boxY;

    if (gameState.boxHitAnimation > 0) {
        boxX += Math.sin(gameState.boxHitAnimation * 0.8) * 3;
        boxY += Math.sin(gameState.boxHitAnimation * 1.2) * 2;
    }

    ctx.drawImage(
        boxImage,
        boxFrameX,
        0,
        boxSpriteWidth,
        boxSpriteHeight,
        boxX,
        boxY,
        GAME_CONFIG.boxWidth,
        GAME_CONFIG.boxHeight
    );

    // Draw hit counter
    if (gameState.boxHits > 0 && gameState.boxHits < 5) {
        ctx.fillStyle = "#FF0000";
        ctx.font = "bold 18px VT323";
        ctx.textAlign = "center";
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 3;
        ctx.strokeText(`${gameState.boxHits}/5`, boxX + 32, boxY - 8);
        ctx.fillText(`${gameState.boxHits}/5`, boxX + 32, boxY - 8);
    }

    ctx.restore();
};

/**
 * Draw the cup with animation effects
 */
export const drawCup = (
    ctx: CanvasRenderingContext2D,
    gameState: GameState,
    cupImage: HTMLImageElement
) => {
    const cupSize = 44;
    ctx.save();

    ctx.shadowColor = "#FFD700";
    ctx.shadowBlur = 15;

    if (gameState.cupAnimationState === "rising") {
        const boxTop = GAME_CONFIG.boxY;
        const revealHeight = Math.max(0, boxTop - gameState.cupY);

        ctx.beginPath();
        ctx.rect(gameState.cupX, gameState.cupY, cupSize, revealHeight);
        ctx.clip();

        ctx.drawImage(
            cupImage,
            gameState.cupX,
            gameState.cupY,
            cupSize,
            cupSize
        );

        if (revealHeight > 10) {
            ctx.fillStyle = "#FFD700";
            ctx.font = "10px VT323";
            ctx.textAlign = "center";
            ctx.fillText("✨", gameState.cupX + 10, gameState.cupY + revealHeight - 5);
            ctx.fillText("✨", gameState.cupX + 34, gameState.cupY + revealHeight - 8);
        }
    } else if (gameState.cupAnimationState === "falling") {
        const rotation = (gameState.cupAnimationCounter / 180) * Math.PI * 2;
        ctx.translate(gameState.cupX + cupSize / 2, gameState.cupY + cupSize / 2);
        ctx.rotate(rotation);
        ctx.drawImage(cupImage, -cupSize / 2, -cupSize / 2, cupSize, cupSize);

        ctx.restore();
        ctx.save();
        ctx.fillStyle = "rgba(255, 215, 0, 0.4)";
        ctx.font = "8px VT323";
        ctx.textAlign = "center";
        for (let i = 1; i <= 3; i++) {
            ctx.fillText("✨", gameState.cupX + 22, gameState.cupY + i * 15);
        }
    } else {
        ctx.drawImage(cupImage, gameState.cupX, gameState.cupY, cupSize, cupSize);
    }

    ctx.shadowBlur = 0;
    ctx.restore();

    // Enhanced sparkle effect when landed
    if (gameState.cupAnimationState === "landed" || gameState.showCup) {
        ctx.fillStyle = "#FFD700";
        ctx.font = "14px VT323";
        ctx.textAlign = "center";
        ctx.fillText("✨", gameState.cupX + 8, gameState.cupY + 12);
        ctx.fillText("✨", gameState.cupX + 36, gameState.cupY + 18);
        ctx.fillText("☕", gameState.cupX + 22, gameState.cupY - 8);
    }
};

/**
 * Draw the player sprite
 */
export const drawPlayer = (
    ctx: CanvasRenderingContext2D,
    gameState: GameState,
    images: { [key: string]: HTMLImageElement }
) => {
    let playerImage: HTMLImageElement | undefined;
    let useSpriteSheet = true;

    // Determine which sprite to use
    if (gameState.transformationState === "transforming") {
        if (gameState.currentPlayerSize > 1.2) {
            playerImage = images.bigBoy;
        } else {
            playerImage = images.shortBoyIdle;
        }
    } else if (
        gameState.isDrinking &&
        gameState.transformationState === "none" &&
        images.boyDrink
    ) {
        playerImage = images.boyDrink;
        useSpriteSheet = false;
    } else if (gameState.hasTransformed && images.bigBoy) {
        playerImage = images.bigBoy;
    } else {
        playerImage = images.shortBoyIdle;
    }

    if (!playerImage) return;

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Calculate player size and sprite offset for pixel-perfect rendering
    let currentWidth: number, currentHeight: number;
    let spriteOffset: number;

    if (gameState.transformationState === "transforming") {
        currentWidth = GAME_CONFIG.playerWidth * gameState.currentPlayerSize;
        currentHeight = GAME_CONFIG.playerHeight * gameState.currentPlayerSize;
        // Interpolate offset during transformation
        spriteOffset = gameState.currentPlayerSize > 1.2
            ? GAME_CONFIG.bigSpriteYOffset
            : GAME_CONFIG.spriteYOffset;
    } else if (gameState.hasTransformed) {
        currentWidth = GAME_CONFIG.bigPlayerWidth;
        currentHeight = GAME_CONFIG.bigPlayerHeight;
        spriteOffset = GAME_CONFIG.bigSpriteYOffset;
    } else {
        currentWidth = GAME_CONFIG.playerWidth;
        currentHeight = GAME_CONFIG.playerHeight;
        spriteOffset = GAME_CONFIG.spriteYOffset;
    }

    if (useSpriteSheet) {
        const spriteWidth = playerImage.width / 4;
        const spriteHeight = playerImage.height;
        const frameX = gameState.animationFrame * spriteWidth;

        if (gameState.isMovingLeft) {
            ctx.scale(-1, 1);
            ctx.drawImage(
                playerImage,
                frameX,
                0,
                spriteWidth,
                spriteHeight,
                -(gameState.playerX + currentWidth),
                gameState.playerY + spriteOffset,  // Apply offset for pixel-perfect alignment
                currentWidth,
                currentHeight
            );
        } else {
            ctx.drawImage(
                playerImage,
                frameX,
                0,
                spriteWidth,
                spriteHeight,
                gameState.playerX,
                gameState.playerY + spriteOffset,  // Apply offset for pixel-perfect alignment
                currentWidth,
                currentHeight
            );
        }
    } else {
        if (gameState.isMovingLeft) {
            ctx.scale(-1, 1);
            ctx.drawImage(
                playerImage,
                -(gameState.playerX + currentWidth),
                gameState.playerY + spriteOffset,  // Apply offset for pixel-perfect alignment
                currentWidth,
                currentHeight
            );
        } else {
            ctx.drawImage(
                playerImage,
                gameState.playerX,
                gameState.playerY + spriteOffset,  // Apply offset for pixel-perfect alignment
                currentWidth,
                currentHeight
            );
        }
    }

    ctx.restore();
};
