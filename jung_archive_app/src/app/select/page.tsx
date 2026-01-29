import React from "react";
import MandalaClient from "@/components/3d/MandalaClient";

export default function SelectionPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white overflow-hidden font-inter relative" suppressHydrationWarning>

            {/* --- PHASE 1: THE COSMIC SPIRAL (BACKGROUND VIDEO) --- */}
            <div className="fixed inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-75 contrast-110 brightness-90"
                >
                    <source src="/vid2.mp4" type="video/mp4" />
                </video>
            </div>

            {/* --- PHASE 2: THE 3D MANDALA --- */}
            <div className="fixed inset-0 z-10">
                <MandalaClient />
            </div>

            {/* --- GRADIENT OVERLAY FOR READABILITY --- */}
            <div className="fixed inset-0 z-20 bg-gradient-to-b from-black/20 via-transparent to-black pointer-events-none" />

            {/* --- MINIMALIST OVERLAY (Optional branding) --- */}
            <div className="absolute bottom-10 left-0 w-full text-center z-20 pointer-events-none opacity-20">
                <span className="text-[10px] font-mono tracking-[1em] uppercase">Mundus Imaginalis • Alchemical Soul</span>
            </div>

        </main>
    );
}
