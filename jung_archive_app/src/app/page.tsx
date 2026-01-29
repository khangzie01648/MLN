"use client";

import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Playfair_Display, Montserrat } from "next/font/google";
import CustomCursor from "../components/ui/CustomCursor";
import { motion } from "framer-motion";

import WarpTransition from "../components/ui/WarpTransition";

const VoidScene = dynamic(() => import("../components/3d/CosmicMindScene"), {
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
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <CustomCursor />

      {/* VIDEO TRANSITION OVERLAY */}
      <WarpTransition
        isActive={isDiving}
        onComplete={handleTransitionComplete}
        videoSrc="/vid1.mp4"
      />

      {/* 3D SCENE LAYER */}
      <div className="absolute inset-0 z-0">
        <VoidScene isDiving={isDiving} paused={isVideoPlaying} />
      </div>

      {/* UI LAYER */}
      <motion.div
        animate={{ opacity: isDiving ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center h-full w-full pointer-events-none"
      >
        {/* HERO TITLE */}
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.1em" }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className={`${playfair.className} text-6xl md:text-8xl lg:text-[100px] font-bold text-white drop-shadow-[0_0_30px_rgba(0,255,255,0.3)] text-center leading-tight mix-blend-screen`}
        >
          THE JUNG ARCHIVE
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2, delay: 1 }}
          className={`${montserrat.className} text-[10px] md:text-[12px] tracking-[1.2em] text-white uppercase mt-6 mb-24 font-light`}
        >
          The Collective Unconscious & Soul Map
        </motion.p>

        {/* BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="pointer-events-auto"
        >
          <button
            onClick={enterVoid}
            className="group relative px-12 py-4 overflow-hidden rounded-sm transition-all duration-500"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(12px) saturate(180%)',
              border: '1px solid rgba(100, 255, 255, 0.1)',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.05)'
            }}
          >
            <span className={`${montserrat.className} text-[11px] tracking-[0.4em] text-cyan-50 group-hover:text-white transition-colors uppercase font-light relative z-10`}>
              Enter the Void
            </span>
            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </motion.div>
      </motion.div>
    </main>
  );
}
