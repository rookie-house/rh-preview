export const ASSETS = {
    shortBoyIdle:
        "https://605d1c1rw3.ufs.sh/f/exk2nUW1nV541bjuXVKB2pyIADmh6lgYZQGVzqWo9w7nX8Hc",
    bigBoy:
        "https://605d1c1rw3.ufs.sh/f/exk2nUW1nV54OTCkX1sECapO8eXbkz94UmAsvDxZHFWt0LgR",
    box: "https://605d1c1rw3.ufs.sh/f/exk2nUW1nV54WnjRLygC7EUuLfxON2G1PA3RM8gbKsoqtwT9",
    boyDrink:
        "https://605d1c1rw3.ufs.sh/f/exk2nUW1nV54hT3hyyIaOyA6ZQ5PSWCNxip3f9IUDJ1tsbvo",
    cup: "https://605d1c1rw3.ufs.sh/f/exk2nUW1nV5425QDgr7jDCg3tUxNIHpV2hK60X9qdMO5fPzZ",
};

export const GAME_CONFIG = {
    gravity: 0.45,
    jumpPower: -13.5,
    moveSpeed: 3,
    groundY: 456,  // Lowered for pixel-perfect ground alignment
    playerWidth: 64,
    playerHeight: 64,  // Actual collision height
    bigPlayerWidth: 80,
    bigPlayerHeight: 96,  // Actual collision height
    boxX: 400,
    boxY: 290,
    boxWidth: 64,
    boxHeight: 64,
    // Sprite rendering offsets - POSITIVE values move sprite DOWN
    // This compensates for transparent padding at TOP of sprite images
    spriteYOffset: 16,  // Move small sprite DOWN
    bigSpriteYOffset: 20,  // Move big sprite DOWN
};

export const ANIMATION_CONFIG = {
    walkFrameInterval: 8,
    landingDuration: 8,
    boxHitAnimationFrames: 25,
    drinkingAnimationFrames: 60,
    transformationCycles: 6,
    framesPerCycle: 12,
    finalGrowthFrames: 20,
    cupRiseSpeed: 0.4,
    cupFallFrames: 180,
};

export const CONFETTI_COLORS = [
    "#FFD700",
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
];
