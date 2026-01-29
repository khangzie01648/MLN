'use client';
import { useRef, useState, useMemo, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Text, Sparkles, Billboard, Float, Torus, MeshDistortMaterial, Trail } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

// Import all objects
import Hourglass from './objects/Hourglass';
import NestedSpheres from './objects/NestedSpheres';
import FloatingBook from './objects/FloatingBook';
import AlchemyFlask from './objects/AlchemyFlask';
import LotusFlower from './objects/LotusFlower';
import EyeOfHorus from './objects/EyeOfHorus';
import SacredFlame from './objects/SacredFlame';
import ProceduralTree from './objects/ProceduralTree';
import QuantumParticles from './objects/QuantumParticles';
import ConstellationNetwork from './objects/ConstellationNetwork';

const PILLARS = [
    { id: 'biography', name: 'BIOGRAPHY', Object: Hourglass, baseScale: 1.2 },
    { id: 'concepts', name: 'CONCEPTS', Object: NestedSpheres, baseScale: 1.4 },
    { id: 'red_book', name: 'RED BOOK', Object: FloatingBook, baseScale: 1.7 },
    { id: 'alchemy', name: 'ALCHEMY', Object: AlchemyFlask, baseScale: 1.4 },
    { id: 'practice', name: 'PRACTICE', Object: LotusFlower, baseScale: 1.8 },
    { id: 'symbols', name: 'SYMBOLS', Object: EyeOfHorus, baseScale: 1.5 },
    { id: 'spirit', name: 'SPIRIT', Object: SacredFlame, baseScale: 1.6 },
    { id: 'legacy', name: 'LEGACY', Object: ProceduralTree, baseScale: 1.0 },
    { id: 'cosmos', name: 'COSMOS', Object: QuantumParticles, baseScale: 1.1 },
    { id: 'encounters', name: 'ENCOUNTERS', Object: ConstellationNetwork, baseScale: 1.3 },
];

function OrbitalNucleus({ pillar, index, onHover, onLeave, onClick, isHovered, sharedAngleRef }: any) {
    const groupRef = useRef<THREE.Group>(null);
    const labelRef = useRef<THREE.Group>(null);
    // ELEGANT RADIUS: Balanced and spacious
    const orbitRadius = 850;

    useFrame((state, delta) => {
        if (groupRef.current) {
            const angleOffset = (index * Math.PI * 2) / 10;
            const angle = sharedAngleRef.current + angleOffset;

            // CINEMATIC X-Z PLANE (ALCHEMICAL DISK)
            const targetX = Math.cos(angle) * orbitRadius;
            const targetZ = Math.sin(angle) * orbitRadius;
            groupRef.current.position.set(targetX, 0, targetZ);

            // High-End Perspective Compensation
            const worldPos = new THREE.Vector3();
            groupRef.current.getWorldPosition(worldPos);
            const dist = state.camera.position.distanceTo(worldPos);
            const scaleFactor = dist / 2800;

            // ARTIFACT SCALING: High-End Perspective Compensation
            const targetScale = (isHovered ? 2.6 : 1.5) * (pillar.baseScale || 1.0) * scaleFactor;
            groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 6, delta));

            // PERFECT UNIFORM LABEL SCALING: 
            // We cancel out the parent's scale and distance to make text exactly equal on screen
            // PERFECT UNIFORM LABEL ALIGNMENT:
            // We ensure both the size AND the gap from the artifact are mathematically identical on screen.
            if (labelRef.current) {
                const currentParentScale = groupRef.current.scale.x;

                // Fixed Visual Gap: Divider by parent scale cancels out artifact-specific size
                // (dist/2800) keeps the gap feeling constant in 3D perspective
                // Fixed Visual Gap: Adjusted for 20% larger font
                const visualGapFactor = 145;
                const adaptivePush = (visualGapFactor * (dist / 2800)) / currentParentScale;
                labelRef.current.position.set(Math.cos(angle) * adaptivePush, 0, Math.sin(angle) * adaptivePush);

                // UNIFORM LABEL SCALING: Increased by 20% (dist / 2800)
                const baseOnScreenScale = (dist / 2800);
                const hoverFactor = isHovered ? 1.25 : 1.0;
                labelRef.current.scale.setScalar((baseOnScreenScale / currentParentScale) * hoverFactor);
            }
        }
    });


    return (
        <group
            ref={groupRef}
            onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
                onHover();
            }}
            onPointerOut={() => {
                document.body.style.cursor = 'default';
                onLeave();
            }}
            onClick={() => onClick(pillar)}
        >
            <mesh visible={false}>
                <sphereGeometry args={[60, 16, 16]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {/* Sacred Rotating Halos */}
            <group rotation={[Math.PI / 4, index, 0]}>
                <Torus args={[35, 0.2, 16, 100]}>
                    <meshStandardMaterial color="#ffd700" emissive="#ffaa00" emissiveIntensity={isHovered ? 12 : 2} transparent opacity={0.3} />
                </Torus>
            </group>

            {/* Archetpyal Artifact */}
            <pillar.Object isHovered={isHovered} />

            {/* Alchemical Glow Core */}
            <mesh>
                <sphereGeometry args={[10, 16, 16]} />
                <MeshDistortMaterial
                    color="#ffffff"
                    emissive="#ffd700"
                    emissiveIntensity={isHovered ? 15 : 5}
                    distort={0.3}
                    speed={1.5}
                    toneMapped={false}
                />
            </mesh>

            {/* Dynamic Radial Label */}
            <group ref={labelRef}>
                <Billboard>
                    <Text
                        fontSize={22}
                        color="#ffffff"
                        fillOpacity={isHovered ? 1.0 : 0.65}
                        anchorX="center"
                        anchorY="middle"
                        letterSpacing={0.4}
                        fontWeight="normal"
                        outlineWidth={0.4}
                        outlineColor="#000000"
                    >
                        {pillar.name}
                    </Text>
                </Billboard>
            </group>
        </group>
    );
}

function SacredMandala() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const router = useRouter();
    const selfCoreRef = useRef<THREE.Mesh>(null);
    const ringsRef = useRef<THREE.Group>(null);
    const sharedAngleRef = useRef(0);

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime;
        const speedFactor = hoveredIndex !== null ? 0.04 : 0.8;
        sharedAngleRef.current += delta * 0.08 * speedFactor;

        state.camera.lookAt(0, 0, 0);

        if (selfCoreRef.current) {
            const pulse = 1.0 + Math.sin(time * 0.4) * 0.05;
            selfCoreRef.current.scale.setScalar(pulse);
            selfCoreRef.current.rotation.y += delta * 0.2;
        }
        if (ringsRef.current) {
            ringsRef.current.rotation.y += delta * 0.1;
            ringsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
        }
    });

    return (
        <group>
            {/* Majestic Eagle-Eye Perspective - Absolute Clarity */}
            <PerspectiveCamera makeDefault position={[0, 1600, 2600]} fov={35} far={12000} />

            <Float speed={0.4} rotationIntensity={0.02} floatIntensity={0.1}>
                <Sparkles count={800} scale={2500} size={2} speed={0.2} opacity={0.3} color="#ffd700" />

                {/* THE SELF - VOLUMETRIC SUPERNOVA */}
                <group>
                    <mesh ref={selfCoreRef}>
                        <icosahedronGeometry args={[125, 4]} />
                        <meshStandardMaterial
                            color="#ffd700"
                            emissive="#ffaa00"
                            emissiveIntensity={8}
                            wireframe
                            transparent
                            opacity={0.1}
                            toneMapped={false}
                        />
                    </mesh>
                    <mesh>
                        <sphereGeometry args={[85, 32, 32]} />
                        <meshBasicMaterial color="#ffffff" toneMapped={false} />
                    </mesh>
                    <pointLight intensity={22} color="#ffffff" distance={2500} />
                </group>

                {/* Expanded Alchemical Guide Ring */}
                <group ref={ringsRef}>
                    <Torus args={[880, 0.4, 16, 120]} rotation={[Math.PI / 2, 0, 0]}>
                        <meshBasicMaterial color="#ffd700" transparent opacity={0.1} />
                    </Torus>
                </group>

                {/* 10 Archetypal Pillars */}
                <group>
                    {PILLARS.map((pillar, index) => (
                        <OrbitalNucleus
                            key={pillar.id}
                            pillar={pillar}
                            index={index}
                            sharedAngleRef={sharedAngleRef}
                            onHover={() => setHoveredIndex(index)}
                            onLeave={() => setHoveredIndex(null)}
                            onClick={(p: any) => router.push(`/pillar/${p.id}`)}
                            isHovered={hoveredIndex === index}
                        />
                    ))}
                </group>
            </Float>
        </group>
    );
}

export default function MandalaWithObjects() {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#000508]">
            <Canvas shadows={false} gl={{ toneMappingExposure: 2.0 }}>
                <color attach="background" args={['#000508']} />

                <ambientLight intensity={1.5} />
                <pointLight position={[0, 1000, 1000]} intensity={2.0} color="#ffffff" />

                <Suspense fallback={null}>
                    <SacredMandala />
                </Suspense>

                <EffectComposer>
                    <Bloom luminanceThreshold={0.85} intensity={0.45} mipmapBlur />
                    <ChromaticAberration offset={new THREE.Vector2(0.0002, 0.0002)} />
                    <Vignette eskil={false} offset={0.3} darkness={1.2} />
                </EffectComposer>
            </Canvas>

            {/* UI Layer */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center py-12 z-20">
                <div className="text-center">
                    <h1 className="text-4xl md:text-7xl font-serif italic tracking-[0.25em] text-[#ffd700] drop-shadow-[0_0_50px_rgba(255,215,0,0.6)]">
                        THE JUNG ARCHIVE
                    </h1>
                    <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-60 mt-4 mx-auto" />
                    <p className="mt-6 text-sm tracking-[0.8em] text-[#ffaa00] opacity-80 uppercase font-light">
                        Mundus Imaginalis ΓÇó Alchemical Soul
                    </p>
                </div>
            </div>
        </div>
    );
}
