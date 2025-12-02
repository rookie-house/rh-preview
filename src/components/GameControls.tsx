import { useState } from "react";

interface GameControlsProps {
    onLeftPress: () => void;
    onLeftRelease: () => void;
    onRightPress: () => void;
    onRightRelease: () => void;
    onJumpPress: () => void;
    onJumpRelease: () => void;
}

export const GameControls = ({
    onLeftPress,
    onLeftRelease,
    onRightPress,
    onRightRelease,
    onJumpPress,
    onJumpRelease,
}: GameControlsProps) => {
    const [activeButtons, setActiveButtons] = useState<Set<string>>(new Set());

    const handleButtonPress = (button: string, action: () => void) => {
        setActiveButtons((prev) => new Set(prev).add(button));
        action();
    };

    const handleButtonRelease = (button: string, action: () => void) => {
        setActiveButtons((prev) => {
            const newSet = new Set(prev);
            newSet.delete(button);
            return newSet;
        });
        action();
    };

    const buttonClass = (button: string) =>
        `select-none touch-none px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-base sm:text-lg transition-all duration-100 shadow-md ${activeButtons.has(button)
            ? "bg-black text-white scale-95 shadow-lg"
            : "bg-white text-black border-2 border-black hover:bg-gray-100 active:scale-95 hover:shadow-lg"
        }`;

    return (
        <div className="w-full mx-auto mt-2 px-2" style={{ maxWidth: "800px" }}>
            {/* Touch Controls - Visible on all screens */}
            <div className="flex justify-between items-center gap-3 mb-2">
                {/* Left Side: LEFT + RIGHT buttons */}
                <div className="flex gap-2">
                    {/* Left Button */}
                    <button
                        onTouchStart={(e) => {
                            e.preventDefault();
                            handleButtonPress("left", onLeftPress);
                        }}
                        onTouchEnd={(e) => {
                            e.preventDefault();
                            handleButtonRelease("left", onLeftRelease);
                        }}
                        onMouseDown={() => handleButtonPress("left", onLeftPress)}
                        onMouseUp={() => handleButtonRelease("left", onLeftRelease)}
                        onMouseLeave={() => {
                            if (activeButtons.has("left")) {
                                handleButtonRelease("left", onLeftRelease);
                            }
                        }}
                        className={buttonClass("left")}
                        aria-label="Move Left"
                    >
                        ◄
                    </button>

                    {/* Right Button */}
                    <button
                        onTouchStart={(e) => {
                            e.preventDefault();
                            handleButtonPress("right", onRightPress);
                        }}
                        onTouchEnd={(e) => {
                            e.preventDefault();
                            handleButtonRelease("right", onRightRelease);
                        }}
                        onMouseDown={() => handleButtonPress("right", onRightPress)}
                        onMouseUp={() => handleButtonRelease("right", onRightRelease)}
                        onMouseLeave={() => {
                            if (activeButtons.has("right")) {
                                handleButtonRelease("right", onRightRelease);
                            }
                        }}
                        className={buttonClass("right")}
                        aria-label="Move Right"
                    >
                        ►
                    </button>
                </div>

                {/* Right Side: JUMP button */}
                <button
                    onTouchStart={(e) => {
                        e.preventDefault();
                        handleButtonPress("jump", onJumpPress);
                    }}
                    onTouchEnd={(e) => {
                        e.preventDefault();
                        handleButtonRelease("jump", onJumpRelease);
                    }}
                    onMouseDown={() => handleButtonPress("jump", onJumpPress)}
                    onMouseUp={() => handleButtonRelease("jump", onJumpRelease)}
                    onMouseLeave={() => {
                        if (activeButtons.has("jump")) {
                            handleButtonRelease("jump", onJumpRelease);
                        }
                    }}
                    className={buttonClass("jump")}
                    aria-label="Jump"
                >
                    ▲
                </button>
            </div>

            {/* Keyboard Instructions - Visible on all screens */}
            <div className="flex justify-center items-center gap-4 text-gray-700 text-xs sm:text-sm">
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded border border-gray-300">
                    <span className="font-semibold">Move:</span>
                    <div className="flex gap-1">
                        <kbd className="px-2 py-0.5 bg-white border border-gray-400 rounded shadow-sm font-mono">
                            ←
                        </kbd>
                        <kbd className="px-2 py-0.5 bg-white border border-gray-400 rounded shadow-sm font-mono">
                            →
                        </kbd>
                    </div>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded border border-gray-300">
                    <span className="font-semibold">Jump:</span>
                    <kbd className="px-2 py-0.5 bg-white border border-gray-400 rounded shadow-sm font-mono">
                        ↑
                    </kbd>
                </div>
            </div>
        </div>
    );
};
