import { useEffect, useState } from "react";
import { ASSETS } from "./constants";

/**
 * Custom hook to load game images with optimization
 */
export const useImageLoader = () => {
    const [images, setImages] = useState<{ [key: string]: HTMLImageElement }>({});
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);

    useEffect(() => {
        const loadImages = async () => {
            const totalImages = Object.keys(ASSETS).length;
            let loadedCount = 0;

            const imagePromises = Object.entries(ASSETS).map(([key, src]) => {
                return new Promise<[string, HTMLImageElement]>((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = "anonymous";

                    // Add timeout for slow loading
                    const timeout = setTimeout(() => {
                        reject(new Error(`Timeout loading ${key}`));
                    }, 10000); // 10 second timeout

                    img.onload = () => {
                        clearTimeout(timeout);
                        loadedCount++;
                        setLoadProgress(Math.round((loadedCount / totalImages) * 100));
                        resolve([key, img]);
                    };

                    img.onerror = () => {
                        clearTimeout(timeout);
                        console.error(`Failed to load image: ${key}`);
                        reject(new Error(`Failed to load ${key}`));
                    };

                    img.src = src;
                });
            });

            try {
                const loadedImages = await Promise.all(imagePromises);
                const imageMap = Object.fromEntries(loadedImages);
                setImages(imageMap);
            } catch (error) {
                console.error("Error loading images:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadImages();
    }, []);

    return { images, isLoading, loadProgress };
};
