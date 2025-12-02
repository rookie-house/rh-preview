import { generateConfetti } from "../utils/confetti";

interface CelebrationEffectsProps {
    show: boolean;
}

export const CelebrationEffects = ({ show }: CelebrationEffectsProps) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {generateConfetti().map((particle, index) => (
                <div
                    key={index}
                    className="absolute confetti-particle-enhanced"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        backgroundColor: particle.color,
                        width: particle.size,
                        height: particle.size,
                        opacity: particle.opacity,
                        borderRadius:
                            particle.shape === "circle" ? "50%" : "0%",
                        transform: `rotate(${particle.rotation}deg)`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${3 + Math.random() * 2}s`,
                        animationIterationCount: "infinite",
                    }}
                />
            ))}

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-100 to-transparent opacity-20 animate-pulse"></div>

            {generateConfetti().map((particle, index) => (
                <div
                    key={`simple-${index}`}
                    className="absolute confetti-particle"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        backgroundColor: particle.color,
                        width: particle.size,
                        height: particle.size,
                        borderRadius: particle.shape === "circle" ? "50%" : "0%",
                    }}
                />
            ))}
        </div>
    );
};
