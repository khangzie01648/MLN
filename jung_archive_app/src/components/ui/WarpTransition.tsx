"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WarpTransitionProps {
    isActive: boolean;
    onComplete: () => void;
    videoSrc?: string; // Optional custom video
}

export default function WarpTransition({ isActive, onComplete, videoSrc }: WarpTransitionProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Default Hyperspace Warp video
    const defaultSrc = "https://static.videezy.com/system/resources/previews/000/004/926/original/Warp_Speed_02_Videvo.mp4";
    // Alternative Black Hole: "https://static.videezy.com/system/resources/previews/000/039/042/original/black_hole_4k.mp4"

    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        if (isActive && videoRef.current) {
            // Reset and play WITH SOUND
            videoRef.current.currentTime = 0;
            videoRef.current.volume = 1.0;

            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.error("Autoplay failed:", e);
                });
            }

            // Fallback timeout strategy
            // If we have duration, use it + buffer. Otherwise default to 60s.
            const timeoutDuration = duration > 0 ? (duration * 1000) + 1000 : 60000;

            const safetyTimer = setTimeout(() => {
                console.warn("Transition safety timer triggered.");
                onComplete();
            }, timeoutDuration);

            return () => clearTimeout(safetyTimer);
        } else if (videoRef.current) {
            // Stop video when inactive
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [isActive, onComplete, duration]);

    const handleVideoEnded = () => {
        onComplete();
    };

    const handleMetadataLoaded = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
            console.log(`Video Metadata Loaded: ${videoRef.current.videoWidth}x${videoRef.current.videoHeight} @ ${videoRef.current.duration}s`);
        }
    };

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-500 ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <video
                ref={videoRef}
                src={videoSrc || defaultSrc}
                className="w-full h-full object-cover"
                playsInline
                preload="auto"
                onEnded={handleVideoEnded}
                onLoadedMetadata={handleMetadataLoaded}
            />

            {/* SKIP BUTTON */}
            {isActive && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    onClick={onComplete}
                    className="absolute bottom-12 right-12 px-6 py-2 border border-white/20 rounded-full text-[10px] tracking-[0.4em] uppercase text-white hover:bg-white/10 transition-all font-light"
                >
                    Skip Transition
                </motion.button>
            )}
        </div>
    );
}
