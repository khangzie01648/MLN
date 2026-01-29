"use client";

import { useEffect, useRef, useState } from 'react';

export default function SoundEngine({ active }: { active: boolean }) {
    const audioCtx = useRef<AudioContext | null>(null);
    const primaryOsc = useRef<OscillatorNode | null>(null);
    const lfo = useRef<OscillatorNode | null>(null);
    const filter = useRef<BiquadFilterNode | null>(null);
    const gainNode = useRef<GainNode | null>(null);

    useEffect(() => {
        if (active && !audioCtx.current) {
            audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();

            // Gain Node for Volume Control
            gainNode.current = audioCtx.current.createGain();
            gainNode.current.gain.setValueAtTime(0, audioCtx.current.currentTime);
            gainNode.current.connect(audioCtx.current.destination);

            // Low Pass Filter for "The Void" sound
            filter.current = audioCtx.current.createBiquadFilter();
            filter.current.type = 'lowpass';
            filter.current.frequency.setValueAtTime(400, audioCtx.current.currentTime);
            filter.current.connect(gainNode.current);

            // Primary Deep Hum
            primaryOsc.current = audioCtx.current.createOscillator();
            primaryOsc.current.type = 'sine';
            primaryOsc.current.frequency.setValueAtTime(55, audioCtx.current.currentTime); // Low G
            primaryOsc.current.connect(filter.current);

            // LFO for "Breathing" effect
            lfo.current = audioCtx.current.createOscillator();
            lfo.current.type = 'sine';
            lfo.current.frequency.setValueAtTime(0.2, audioCtx.current.currentTime);
            const lfoGain = audioCtx.current.createGain();
            lfoGain.gain.setValueAtTime(200, audioCtx.current.currentTime);
            lfo.current.connect(lfoGain);
            lfoGain.connect(filter.current.frequency);

            primaryOsc.current.start();
            lfo.current.start();
        }

        if (active && gainNode.current && audioCtx.current) {
            gainNode.current.gain.linearRampToValueAtTime(0.05, audioCtx.current.currentTime + 2);
        } else if (!active && gainNode.current && audioCtx.current) {
            gainNode.current.gain.linearRampToValueAtTime(0, audioCtx.current.currentTime + 1);
        }

        return () => {
            // We don't necessarily want to kill the audio on every re-render, 
            // but we might want to shut it down if the component unmounts for real.
        };
    }, [active]);

    return null; // This is a logic-only component
}
