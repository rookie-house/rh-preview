import { useEffect, useRef } from "react";
import { GameState, Keys } from "./types";
import {
    updateDrinkingAnimation,
    updateTransformationAnimation,
    updateBoxHitAnimation,
    updateCupAnimation,
} from "./animationHandlers";
import {
    updatePlayerMovement,
    updatePlayerJump,
    updateGravity,
    updateBoxCollision,
    updateCupCollisionCheck,
} from "./physicsHandlers";

/**
 * Custom hook to manage the game loop
 */
export const useGameLoop = (
    keys: Keys,
    images: { [key: string]: HTMLImageElement },
    gameState: GameState,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>
) => {
    const animationRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (!Object.keys(images).length) return;

        const gameLoop = () => {
            setGameState((prevState) => {
                // Handle drinking and transformation states
                if (
                    prevState.isDrinking ||
                    prevState.transformationState === "transforming"
                ) {
                    let newState = { ...prevState };

                    if (newState.isDrinking && newState.transformationState === "none") {
                        newState = updateDrinkingAnimation(newState);
                    }

                    if (newState.transformationState === "transforming") {
                        newState = updateTransformationAnimation(newState);
                    }

                    return newState;
                }

                // Normal game state updates
                let newState = { ...prevState };
                newState.frameCounter += 1;

                // Update animations
                newState = updateBoxHitAnimation(newState);
                newState = updateCupAnimation(newState);

                // Update player physics
                newState = updatePlayerMovement(newState, keys);
                newState = updatePlayerJump(newState, keys);
                newState = updateGravity(newState);

                // Update collisions
                newState = updateBoxCollision(newState);
                newState = updateCupCollisionCheck(newState);

                return newState;
            });

            animationRef.current = requestAnimationFrame(gameLoop);
        };

        animationRef.current = requestAnimationFrame(gameLoop);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [keys, images, setGameState]);

    return animationRef;
};
