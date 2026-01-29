"use client";

// FORCE REBUILD - RESTORING DARK COSMIC THEME AND VIDEO TRANSITION

import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Playfair_Display, Montserrat } from "next/font/google";
import CustomCursor from "../components/ui/CustomCursor";
import { motion } from "framer-motion";

import WarpTransition from "../components/ui/WarpTransition";

const CosmicMindScene = dynamic(() => import("../components/3d/CosmicMindScene"), {
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="flex flex-col items-center z-20"
        >
          <span className="font-cinzel text-xs tracking-[0.8em] text-[#ffd700] mb-6 font-bold uppercase drop-shadow-lg">
            Mundus Imaginalis
          </span>
          <h1 className="font-cinzel text-6xl md:text-8xl lg:text-[100px] font-bold text-white tracking-tight leading-none text-center drop-shadow-2xl">
            THE JUNG<br />
            <span className="text-[#ffd700]">ARCHIVE</span>
          </h1>
          <div className="w-24 h-[2px] bg-[#ffd700] mt-8 mb-8 opacity-50" />
          <p className="font-playfair text-lg italic text-white/80 tracking-widest">
            A Digital Grimoire of the Unconscious
          </p>
        </motion.div>

        {/* BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="pointer-events-auto"
        >
          <button
            onClick={enterVoid}
            className="group relative px-12 py-5 overflow-hidden transition-all duration-500 hover:scale-105"
          >
            <div className="absolute inset-0 border border-white/20 opacity-30 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />
            <div className="absolute inset-1 border border-[#ffd700]/30 opacity-10 group-hover:opacity-50 transition-opacity duration-500 rounded-sm scale-95" />

            <span className="font-cinzel text-sm tracking-[0.4em] text-white font-bold uppercase relative z-10 group-hover:text-[#ffd700] transition-colors">
              BƯỚC VÀO VÔ THỨC
            </span>
          </button>
        </motion.div>
      </motion.div>
    </main>
  );
}
