import { ConfettiParticle } from "./types";
import { CONFETTI_COLORS } from "./constants";

/**
 * Generate confetti particles for celebration
 */
export const generateConfetti = (): ConfettiParticle[] => {
    const particles: ConfettiParticle[] = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 800),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 600),
            color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
            size: Math.random() * 10 + 5,
            shape: Math.random() > 0.5 ? "circle" : "square",
            opacity: Math.random() * 0.8 + 0.2,
            rotation: Math.random() * 360,
        });
    }
    return particles;
};
