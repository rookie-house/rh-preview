export interface GameState {
    playerX: number;
    playerY: number;
    velocityY: number;
    isGrounded: boolean;
    isMovingLeft: boolean;
    isMovingRight: boolean;
    isJumping: boolean;
    boxHits: number;
    showCup: boolean;
    hasTransformed: boolean;
    isDrinking: boolean;
    showCelebration: boolean;
    animationFrame: number;
    frameCounter: number;
    jumpStartFrame: number;
    boxHitAnimation: number;
    screenShakeX: number;
    screenShakeY: number;
    cupAnimationState: "none" | "rising" | "falling" | "landed";
    cupY: number;
    cupX: number;
    cupAnimationCounter: number;
    transformationState: "none" | "transforming" | "complete";
    transformationCounter: number;
    currentPlayerSize: number;
    drinkingAnimationCounter: number;
}

export interface Keys {
    ArrowLeft: boolean;
    ArrowRight: boolean;
    Space: boolean;
}

export interface ConfettiParticle {
    x: number;
    y: number;
    color: string;
    size: number;
    shape: "circle" | "square";
    opacity: number;
    rotation: number;
}
