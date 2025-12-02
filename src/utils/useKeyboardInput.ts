import { useEffect, useState } from "react";
import { Keys } from "./types";

/**
 * Custom hook to handle keyboard input
 */
export const useKeyboardInput = () => {
    const [keys, setKeys] = useState<Keys>({
        ArrowLeft: false,
        ArrowRight: false,
        Space: false,
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "ArrowLeft" || e.code === "KeyA") {
                setKeys((prev) => ({ ...prev, ArrowLeft: true }));
            }
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                setKeys((prev) => ({ ...prev, ArrowRight: true }));
            }
            if (e.code === "Space") {
                e.preventDefault();
                setKeys((prev) => ({ ...prev, Space: true }));
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === "ArrowLeft" || e.code === "KeyA") {
                setKeys((prev) => ({ ...prev, ArrowLeft: false }));
            }
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                setKeys((prev) => ({ ...prev, ArrowRight: false }));
            }
            if (e.code === "Space") {
                setKeys((prev) => ({ ...prev, Space: false }));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return keys;
};
