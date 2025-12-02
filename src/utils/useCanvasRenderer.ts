import { useEffect } from "react";
import { GameState } from "./types";
import { drawGround, drawBox, drawCup, drawPlayer } from "./renderFunctions";

/**
 * Custom hook to handle canvas rendering
 */
export const useCanvasRenderer = (
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    gameState: GameState,
    images: { [key: string]: HTMLImageElement }
) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !Object.keys(images).length) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Apply screen shake effect
        ctx.save();
        if (gameState.screenShakeX !== 0 || gameState.screenShakeY !== 0) {
            ctx.translate(gameState.screenShakeX, gameState.screenShakeY);
        }

        // Draw game elements
        drawGround(ctx, canvas.width);

        if (images.box) {
            drawBox(ctx, gameState, images.box);
        }

        if (
            (gameState.showCup || gameState.cupAnimationState !== "none") &&
            images.cup
        ) {
            drawCup(ctx, gameState, images.cup);
        }

        drawPlayer(ctx, gameState, images);

        // Restore canvas state (remove screen shake)
        ctx.restore();
    }, [gameState, images, canvasRef]);
};
