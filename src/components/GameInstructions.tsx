import { GameState } from "../utils/types";

interface GameInstructionsProps {
    gameState: GameState;
}

export const GameInstructions = ({ gameState }: GameInstructionsProps) => {
    if (gameState.showCelebration) {
        return (
            <div className="mt-3 sm:mt-4 text-center px-4" style={{ fontFamily: "VT323, monospace" }}>
                <p className="text-xl sm:text-2xl md:text-3xl text-green-600 font-bold tracking-widest mb-2">
                    🏆 TRANSFORMATION COMPLETE! 🏆
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 tracking-wide">
                    You&apos;ve unlocked the OG Rookie! Keep exploring!
                </p>
            </div>
        );
    }

    if (gameState.hasTransformed) {
        return (
            <div className="mt-3 sm:mt-4 text-center px-4" style={{ fontFamily: "VT323, monospace" }}>
                <p className="text-xl sm:text-2xl md:text-3xl text-green-600 font-bold tracking-widest mb-2">
                    🎉 ROOKIE HOUSE - COMING SOON! 🎉
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 tracking-wide">
                    Continue your adventure as the OG Rookie!
                </p>
            </div>
        );
    }

    return (
        <div className="mt-3 sm:mt-4 text-center px-4 max-w-3xl mx-auto" style={{ fontFamily: "VT323, monospace" }}>
            <p className="text-lg sm:text-xl md:text-2xl text-black font-bold tracking-widest mb-2">
                🎮 HOW TO PLAY 🎮
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 tracking-wide mb-1">
                Hit the box <span className="font-bold text-black">5 times</span> to reveal the coffee cup! ☕
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 tracking-wide">
                Use <span className="font-bold">← →</span> to move, <span className="font-bold">SPACE</span> to jump
            </p>
        </div>
    );
};
