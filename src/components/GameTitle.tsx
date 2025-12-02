import { GameState } from "../utils/types";

interface GameTitleProps {
    gameState: GameState;
}

export const GameTitle = ({ gameState }: GameTitleProps) => {
    return (
        <div className="text-center mb-2 sm:mb-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black mb-1 font-bold tracking-wider leading-tight">
                {gameState.showCelebration
                    ? "🎉 Rookie House will be unveiled soon... 🎉"
                    : "Something Epic is Brewing..."}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 tracking-wide leading-relaxed">
                {gameState.showCelebration
                    ? "The OG Rookie has been awakened! Stay tuned for the launch!"
                    : "Help the Rookie unlock the secret! ☕"}
            </p>
        </div>
    );
};
