"use client";

// FORCE REBUILD - RESTORING DARK COSMIC THEME AND VIDEO TRANSITION

import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Playfair_Display, Montserrat } from "next/font/google";
import CustomCursor from "../components/ui/CustomCursor";
import { motion } from "framer-motion";

import WarpTransition from "../components/ui/effects/WarpTransition";

const CosmicMindScene = dynamic(() => import("../components/3d/scenes/CosmicMindScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />,
});

const playfair = Playfair_Display({ subsets: ["latin", "vietnamese"], weight: ["700", "900"] });
const montserrat = Montserrat({ subsets: ["latin", "vietnamese"], weight: ["200", "300", "400"] });

export default function Home() {
  const router = useRouter();
  const [isDiving, setIsDiving] = React.useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  // useCallback prevents function recreation on re-renders, avoiding video resets
  const handleTransitionComplete = useCallback(() => {
    router.push("/select");
  }, [router]);

  const enterVoid = () => {
    setIsDiving(true);
    // Wait for warp animation to start (500ms), then PAUSE 3D scene to free GPU for video
    setTimeout(() => {
      setIsVideoPlaying(true);
    }, 500);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black" suppressHydrationWarning>
      <CustomCursor />

      {/* VIDEO TRANSITION OVERLAY */}
      <WarpTransition
        isActive={isDiving}
        onComplete={handleTransitionComplete}
        videoSrc="/vid1.mp4"
      />

      {/* 3D SCENE LAYER */}
      <div className="absolute inset-0 z-0">
        <CosmicMindScene isDiving={isDiving} paused={isVideoPlaying} />
      </div>

      {/* UI LAYER */}
      <motion.div
        animate={{ opacity: isDiving ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center h-full w-full pointer-events-none"
      >
        {/* HERO TITLE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.19, 1.0, 0.22, 1.0] }} // Cinematic ease
          className="flex flex-col items-center z-20"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "1em" }}
            animate={{ opacity: 1, letterSpacing: "0.8em" }}
            transition={{ duration: 2, delay: 0.5 }}
            className="font-cinzel text-xs md:text-sm text-[#ffd700] mb-6 font-medium uppercase drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
          >
            Mundus Imaginalis
          </motion.span>

          <h1 className="font-cinzel text-6xl md:text-8xl lg:text-[120px] font-bold text-white tracking-tighter leading-none text-center drop-shadow-2xl relative z-10"
            style={{ textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-[#a8a8a8]">THE JUNG</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#ffd700] via-[#fdb931] to-[#9e7f0e] filter drop-shadow-[0_0_20px_rgba(255,215,0,0.4)] pb-4">
              ARCHIVE
            </span>
          </h1>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100px", opacity: 0.7 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent mt-4 mb-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="font-playfair text-lg md:text-xl italic text-[#ececec] tracking-widest mix-blend-screen"
          >
            A Digital Grimoire of the Unconscious
          </motion.p>
        </motion.div>

        {/* BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
          className="pointer-events-auto mt-20"
        >
          <button
            onClick={enterVoid}
            className="group relative px-16 py-6 overflow-hidden transition-all duration-500"
          >
            {/* Animated Border */}
            <div className="absolute inset-0 border border-[#ffd700]/30 group-hover:border-[#ffd700] transition-colors duration-500 rounded-sm" />

            {/* Inner Glow Fill */}
            <div className="absolute inset-0 bg-[#ffd700] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

            {/* Dynamic Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ffd700] opacity-50 group-hover:w-4 group-hover:h-4 transition-all duration-300" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ffd700] opacity-50 group-hover:w-4 group-hover:h-4 transition-all duration-300" />

            {/* Text Content */}
            <span className="font-cinzel text-sm tracking-[0.4em] text-white group-hover:text-[#ffd700] font-bold uppercase relative z-10 transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]">
              Bước vào Vô thức
            </span>
          </button>
        </motion.div>
      </motion.div>
    </main>
  );
}
