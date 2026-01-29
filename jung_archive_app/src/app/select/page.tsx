import React from "react";
import MandalaClient from "@/components/3d/MandalaClient";

export default function SelectionPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white overflow-hidden font-inter relative">

            {/* --- PHASE 1: THE COSMIC SPIRAL (BACKGROUND) --- */}
            <div className="fixed inset-0 z-0">
                <MandalaClient />
            </div>

            {/* --- GRADIENT OVERLAY FOR READABILITY --- */}
            <div className="fixed inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />

            {/* --- MINIMALIST OVERLAY (Optional branding) --- */}
            <div className="absolute bottom-10 left-0 w-full text-center z-20 pointer-events-none opacity-20">
                <span className="text-[10px] font-mono tracking-[1em] uppercase">Mundus Imaginalis • Alchemical Soul</span>
            </div>

        </main>
    );
}
