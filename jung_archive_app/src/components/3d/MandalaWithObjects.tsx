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
// --- VISUALS: ULTRA-DETAILED ARCHETYPES (MASTERPIECE QUALITY) ---

// 1. SPIRIT: The Hypercube Tesseract (Dimensional Transcendence)
const SpiritGlitch = ({ isHovered }: any) => {
    const outerRef = useRef<THREE.Group>(null);
    const midRef = useRef<THREE.Group>(null);
    const innerRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (outerRef.current) {
            outerRef.current.rotation.x = t * 0.1;
            outerRef.current.rotation.y = t * 0.15;
            if (isHovered) outerRef.current.scale.setScalar(1.1);
        }
        if (midRef.current) {
            midRef.current.rotation.x = -t * 0.2;
            midRef.current.rotation.z = t * 0.1;
        }
        if (innerRef.current) {
            innerRef.current.rotation.y = t * 0.5;
            innerRef.current.rotation.x = Math.sin(t) * 0.2;
        }
    });

    return (
        <group scale={1.8}>
            {/* Layer 1: Outer Reality */}
            <group ref={outerRef}>
                <mesh>
                    <boxGeometry args={[14, 14, 14, 2, 2, 2]} />
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} wireframe strokeWidth={1} />
                </mesh>
                <Sparkles count={20} scale={20} size={1.5} color="#ffffff" opacity={0.4} />
            </group>

            {/* Layer 2: Dimensional Shift */}
            <group ref={midRef}>
                <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                    <boxGeometry args={[10, 10, 10, 2, 2, 2]} />
                    <meshStandardMaterial color="#a0aec0" emissive="#ffffff" emissiveIntensity={0.6} wireframe />
                </mesh>
            </group>

            {/* Layer 3: The Singularity */}
            <group ref={innerRef}>
                <mesh>
                    <octahedronGeometry args={[5, 1]} />
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} wireframe />
                </mesh>
                <mesh>
                    <sphereGeometry args={[2, 16, 16]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
            </group>
        </group>
    );
};

// 2. SYMBOLS: The Runic Obelisk (Ancient Language)
const Runestone = ({ isHovered }: any) => {
    const rings = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (rings.current) {
            rings.current.children.forEach((r, i) => {
                r.rotation.z = state.clock.elapsedTime * (0.1 * (i + 1));
                r.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.2;
            });
            if (isHovered) rings.current.scale.setScalar(1.2);
        }
    });

    return (
        <group scale={2.0}>
            {/* The Monolith */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[2, 4, 30, 8, 4]} />
                <meshStandardMaterial color="#ffd700" emissive="#ffaa00" emissiveIntensity={0.5} wireframe />
            </mesh>
            {/* Pyramid Cap */}
            <mesh position={[0, 17, 0]}>
                <coneGeometry args={[2, 4, 8]} />
                <meshStandardMaterial color="#ffd700" emissive="#ffaa00" emissiveIntensity={0.8} wireframe />
            </mesh>
            {/* Vertical Energy Lines */}
            <mesh position={[3, 0, 0]}>
                <boxGeometry args={[0.2, 25, 0.2]} />
                <meshBasicMaterial color="#ffaa00" />
            </mesh>
            <mesh position={[-3, 0, 0]}>
                <boxGeometry args={[0.2, 25, 0.2]} />
                <meshBasicMaterial color="#ffaa00" />
            </mesh>

            {/* Orbiting Runes */}
            <group ref={rings}>
                {[0, 1, 2].map(i => (
                    <group key={i} rotation={[Math.PI / 2, 0, 0]}>
                        <mesh>
                            <torusGeometry args={[8 + i * 3, 0.1, 8, 48]} />
                            <meshStandardMaterial color="#ffd700" emissive="#ffaa00" emissiveIntensity={0.8} wireframe />
                        </mesh>
                        <mesh position={[8 + i * 3, 0, 0]}>
                            <sphereGeometry args={[0.5, 8, 8]} />
                            <meshBasicMaterial color="#ffffff" />
                        </mesh>
                    </group>
                ))}
            </group>
        </group>
    );
};

// 3. LEGACY: The Ancestral Tree (Fractal Growth)
const CrystalArbor = ({ isHovered }: any) => {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
            if (isHovered) group.current.rotation.y += 0.01;
        }
    });

    return (
        <group ref={group} scale={2.5} position={[0, -10, 0]}>
            {/* Main Trunk */}
            <mesh position={[0, 5, 0]}>
                <cylinderGeometry args={[1, 4, 20, 8, 4]} />
                <meshStandardMaterial color="#aaff00" emissive="#55ff00" emissiveIntensity={0.6} wireframe />
            </mesh>
            {/* Roots */}
            {[0, 1, 2, 3].map(i => (
                <mesh key={`root-${i}`} position={[0, -5, 0]} rotation={[0, 0, (i * Math.PI / 2) + 0.5]}>
                    <coneGeometry args={[0.8, 10, 4]} />
                    <meshStandardMaterial color="#aaff00" emissive="#55ff00" emissiveIntensity={0.4} wireframe />
                </mesh>
            ))}
            {/* Branches - Layer 1 */}
            {[0, 1, 2, 3, 4].map(i => (
                <group key={`b1-${i}`} position={[0, 10, 0]} rotation={[0.5, i * (Math.PI * 2 / 5), 0]}>
                    <mesh position={[0, 6, 0]}>
                        <cylinderGeometry args={[0.5, 1, 12]} />
                        <meshStandardMaterial color="#aaff00" emissive="#55ff00" emissiveIntensity={0.8} wireframe />
                    </mesh>
                    {/* Glowing Fruits */}
                    <mesh position={[0, 12, 0]}>
                        <icosahedronGeometry args={[0.8, 0]} />
                        <meshBasicMaterial color="#ffffff" />
                    </mesh>
                </group>
            ))}
            {/* Branches - Layer 2 (Crown) */}
            {[0, 1, 2].map(i => (
                <mesh key={`b2-${i}`} position={[0, 18, 0]} rotation={[0.3, i * (Math.PI * 2 / 3), 0.5]}>
                    <coneGeometry args={[0.5, 10, 4]} />
                    <meshStandardMaterial color="#ccff00" emissive="#aaff00" emissiveIntensity={0.8} wireframe />
                </mesh>
            ))}
            <Sparkles count={30} scale={20} size={2} color="#ccff00" position={[0, 15, 0]} />
        </group>
    );
};

// 4. COSMOS: The Armillary Sphere (Universal Mechanism)
const CosmosSingularity = ({ isHovered }: any) => {
    const rings = useRef<THREE.Group>(null);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (rings.current) {
            rings.current.children[0].rotation.x = t * 0.2;
            rings.current.children[1].rotation.y = t * 0.3;
            rings.current.children[2].rotation.z = t * 0.1;
            rings.current.children[3].rotation.x = t * 0.4;
            rings.current.children[3].rotation.y = t * 0.4;
        }
    });

    return (
        <group scale={2.2}>
            {/* Central Sun */}
            <mesh>
                <sphereGeometry args={[3, 32, 32]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
            </mesh>
            {/* Gyroscope Rings */}
            <group ref={rings}>
                <mesh>
                    <torusGeometry args={[8, 0.2, 16, 64]} />
                    <meshStandardMaterial color="#88ccff" emissive="#ffffff" emissiveIntensity={0.8} wireframe />
                </mesh>
                <mesh>
                    <torusGeometry args={[10, 0.2, 16, 64]} />
                    <meshStandardMaterial color="#88ccff" emissive="#ffffff" emissiveIntensity={0.8} wireframe />
                </mesh>
                <mesh>
                    <torusGeometry args={[12, 0.2, 16, 64]} />
                    <meshStandardMaterial color="#88ccff" emissive="#ffffff" emissiveIntensity={0.8} wireframe />
                </mesh>
                <mesh>
                    <torusGeometry args={[6, 0.4, 16, 64]} />
                    <meshStandardMaterial color="#4488ff" emissive="#4488ff" emissiveIntensity={1.2} />
                </mesh>
            </group>
            <Sparkles count={50} scale={25} size={1} color="#ffffff" />
        </group>
    );
};

// 5. ENCOUNTERS: The Neural Connector (Web of Relations)
const SynapticGrid = ({ isHovered }: any) => {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.elapsedTime * 0.1;
            if (isHovered) group.current.rotation.x += 0.01;
        }
    });

    return (
        <group ref={group} scale={2.4}>
            {/* Central Hub */}
            <mesh>
                <dodecahedronGeometry args={[6, 0]} />
                <meshStandardMaterial color="#0044ff" emissive="#0022ff" emissiveIntensity={1.5} wireframe />
            </mesh>
            {/* Satellites */}
            {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                return (
                    <group key={i} rotation={[Math.PI / 4, angle, 0]}>
                        <mesh position={[10, 0, 0]}>
                            <icosahedronGeometry args={[1.5, 0]} />
                            <meshStandardMaterial color="#0088ff" emissive="#0088ff" emissiveIntensity={1} wireframe />
                        </mesh>
                        <mesh rotation={[0, 0, Math.PI / 2]} position={[5, 0, 0]}>
                            <cylinderGeometry args={[0.1, 0.1, 10]} />
                            <meshBasicMaterial color="#0044ff" transparent opacity={0.5} />
                        </mesh>
                    </group>
                )
            })}
            <Sparkles count={40} scale={22} size={2} color="#00aaff" />
        </group>
    );
};

// 6. BIOGRAPHY: The Double Helix (Life Script)
const BioFragment = ({ isHovered }: any) => {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.5;
    });

    return (
        <group ref={group} scale={1.8}>
            {/* DNA Strands */}
            {[...Array(12)].map((_, i) => (
                <group key={i} position={[0, i * 2 - 11, 0]} rotation={[0, i * 0.5, 0]}>
                    <mesh position={[4, 0, 0]}>
                        <sphereGeometry args={[0.8, 16, 16]} />
                        <meshStandardMaterial color="#bb00ff" emissive="#aa00ff" emissiveIntensity={1.2} />
                    </mesh>
                    <mesh position={[-4, 0, 0]}>
                        <sphereGeometry args={[0.8, 16, 16]} />
                        <meshStandardMaterial color="#bb00ff" emissive="#aa00ff" emissiveIntensity={1.2} />
                    </mesh>
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.2, 0.2, 8]} />
                        <meshStandardMaterial color="#bb00ff" emissive="#aa00ff" emissiveIntensity={0.6} />
                    </mesh>
                </group>
            ))}
            {/* Central Axis */}
            <mesh>
                <cylinderGeometry args={[0.1, 0.1, 26]} />
                <meshBasicMaterial color="#bb00ff" transparent opacity={0.3} />
            </mesh>
        </group>
    );
};

// 7. CONCEPTS: The Platonic Crystals (Structural Truth)
const LogicCore = ({ isHovered }: any) => {
    const outer = useRef<THREE.Mesh>(null);
    const mid = useRef<THREE.Mesh>(null);
    const inner = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (outer.current) { outer.current.rotation.x = t * 0.1; outer.current.rotation.y = t * 0.1; }
        if (mid.current) { mid.current.rotation.x = -t * 0.2; mid.current.rotation.z = t * 0.2; }
        if (inner.current) { inner.current.rotation.y = t * 0.5; }
    });

    return (
        <group scale={2.2}>
            {/* Outer Cube */}
            <mesh ref={outer}>
                <boxGeometry args={[14, 14, 14]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} wireframe strokeWidth={2} />
            </mesh>
            {/* Star Tetrahedron (Merkaba-ish) */}
            <group ref={mid}>
                <mesh>
                    <tetrahedronGeometry args={[10, 0]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.8} wireframe />
                </mesh>
                <mesh rotation={[Math.PI, 0, 0]}>
                    <tetrahedronGeometry args={[10, 0]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.8} wireframe />
                </mesh>
            </group>
            {/* Inner Core */}
            <mesh ref={inner}>
                <octahedronGeometry args={[4, 0]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} wireframe />
            </mesh>
        </group>
    );
};

// 8. RED BOOK: The Unfolding Manuscript (Inner Vision)
const RedBookLegacy = ({ isHovered }: any) => {
    const pages = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (pages.current) {
            pages.current.children.forEach((p, i) => {
                p.rotation.y = (Math.PI / 12 * i) + Math.sin(state.clock.elapsedTime * 2 + i) * 0.05;
            });
        }
    });

    return (
        <group scale={1.8}>
            {/* Cover Back */}
            <mesh position={[-7, 0, 0]}>
                <boxGeometry args={[1, 32, 22]} />
                <meshStandardMaterial color="#ff0000" emissive="#770000" emissiveIntensity={0.5} />
            </mesh>
            {/* Spine */}
            <mesh position={[-6.5, 0, 11]}>
                <cylinderGeometry args={[1.5, 1.5, 32, 16, 1, false, 0, Math.PI]} rotation={[0, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#ff0000" emissive="#770000" emissiveIntensity={0.6} />
            </mesh>
            {/* Pages */}
            <group ref={pages} position={[-6, 0, -10]}>
                {[...Array(10)].map((_, i) => (
                    <mesh key={i} position={[0, 0, 0]} rotation={[0, 0, 0]}> {/* Pivot point correction needed in real layout, simplified here */}
                        <boxGeometry args={[12, 28, 0.1]} /> {/* Page size */}
                        <meshStandardMaterial color="#ffcccc" emissive="#ff0000" emissiveIntensity={i / 20} wireframe />
                        {/* Centering the pivot visually */}
                        <group position={[6, 0, 0]}>
                            {/* Content of page */}
                        </group>
                    </mesh>
                ))}
            </group>
        </group>
    );
};

// 9. ALCHEMY: The Transmutation Seal (Sacred Union)
const AlchemicalCrucible = ({ isHovered }: any) => {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.z = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <group scale={2.0}>
            {/* Ring 1 - Circle */}
            <mesh>
                <torusGeometry args={[12, 0.3, 16, 100]} />
                <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={1} />
            </mesh>
            <group ref={group}>
                {/* Item 2 - Triangle */}
                <mesh>
                    <circleGeometry args={[10, 3]} />
                    <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={0.5} wireframe />
                </mesh>
                {/* Item 3 - Square */}
                <mesh>
                    <circleGeometry args={[8, 4]} />
                    <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={0.8} wireframe />
                </mesh>
            </group>
            {/* Philosopher's Stone */}
            <mesh position={[0, 0, 0]}>
                <dodecahedronGeometry args={[3, 0]} />
                <meshStandardMaterial color="#ffffff" emissive="#00ff44" emissiveIntensity={2} wireframe />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <coneGeometry args={[4, 8, 4]} />
                <meshStandardMaterial color="#00ff44" wireframe transparent opacity={0.2} />
            </mesh>
        </group>
    );
};

// 10. PRACTICE: The Blooming Mandala (Self-Realization)
const MandalaLotus = ({ isHovered }: any) => {
    const layer1 = useRef<THREE.Group>(null);
    const layer2 = useRef<THREE.Group>(null);
    const layer3 = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (layer1.current) layer1.current.rotation.z = t * 0.05;
        if (layer2.current) layer2.current.rotation.z = -t * 0.08;
        if (layer3.current) layer3.current.rotation.z = t * 0.1;

        if (isHovered) {
            if (layer1.current) layer1.current.rotation.x = -0.5;
            if (layer2.current) layer2.current.rotation.x = -0.3;
        } else {
            if (layer1.current) layer1.current.rotation.x = 0;
            if (layer2.current) layer2.current.rotation.x = 0;
        }
    });

    return (
        <group scale={2.5} rotation={[Math.PI / 4, 0, 0]}>
            {/* Layer 1 - Outer */}
            <group ref={layer1}>
                {[...Array(12)].map((_, i) => (
                    <mesh key={i} rotation={[0, 0, (i / 12) * Math.PI * 2]} position={[0, 6, 0]}>
                        <coneGeometry args={[1.5, 8, 4]} />
                        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} wireframe />
                    </mesh>
                ))}
            </group>
            {/* Layer 2 - Mid */}
            <group ref={layer2}>
                {[...Array(8)].map((_, i) => (
                    <mesh key={i} rotation={[0, 0, (i / 8) * Math.PI * 2]} position={[0, 4, 0]}>
                        <coneGeometry args={[1.2, 6, 4]} />
                        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.8} wireframe />
                    </mesh>
                ))}
            </group>
            {/* Center */}
            <group ref={layer3}>
                <mesh>
                    <dodecahedronGeometry args={[2.5, 0]} />
                    <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={1.5} wireframe />
                </mesh>
            </group>
        </group>
    );
};

const PILLARS = [
    { id: 'spirit', name: 'SPIRIT', Object: SpiritGlitch, baseScale: 1.6 },
    { id: 'symbols', name: 'SYMBOLS', Object: Runestone, baseScale: 1.5 },
    { id: 'legacy', name: 'LEGACY', Object: CrystalArbor, baseScale: 1.4 },
    { id: 'cosmos', name: 'COSMOS', Object: CosmosSingularity, baseScale: 1.1 },
    { id: 'encounters', name: 'ENCOUNTERS', Object: SynapticGrid, baseScale: 1.3 },
    { id: 'biography', name: 'BIOGRAPHY', Object: BioFragment, baseScale: 1.2 },
    { id: 'concepts', name: 'CONCEPTS', Object: LogicCore, baseScale: 1.4 },
    { id: 'red_book', name: 'RED BOOK', Object: RedBookLegacy, baseScale: 1.7 },
    { id: 'alchemy', name: 'ALCHEMY', Object: AlchemicalCrucible, baseScale: 1.4 },
    { id: 'practice', name: 'PRACTICE', Object: MandalaLotus, baseScale: 2.0 },
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
                        Mundus Imaginalis • Alchemical Soul
                    </p>
                </div>
            </div>
        </div>
    );
}
