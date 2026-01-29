'use client';

import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Float, Sparkles, Torus, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

interface PillarPageProps {
    pillar: {
        id: string;
        name: string;
        color: string;
        description: string;
        Object: any;
        baseScale?: number;
    };
    articles: Array<{
        slug: string;
        title: string;
        description: string;
        order?: number;
    }>;
}

export default function PillarPageTemplate({ pillar, articles }: PillarPageProps) {
    const ObjectComponent = pillar.Object;

    return (
        <div className="min-h-screen bg-[#000508] text-white selection:bg-[#ffd700] selection:text-black overflow-x-hidden">
            {/* Cinematic Background - Subtle Alchemical Glow */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ffd700] opacity-[0.03] blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ffaa00] opacity-[0.03] blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                {/* Navigation */}
                <Link
                    href="/mandala-final"
                    className="inline-flex items-center gap-3 mb-16 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ffd700]/50 transition-all group"
                >
                    <span className="text-[#ffd700] group-hover:-translate-x-1 transition-transform">←</span>
                    <span className="text-sm tracking-[0.3em] font-light uppercase text-white/70 group-hover:text-white">Quay lại Mandala</span>
                </Link>

                {/* HERO SECTION - Horizontal Layout */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-24">
                    {/* Hero 3D Artifact */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-b from-[#ffd700]/20 to-transparent rounded-2xl blur opacity-20 pointer-events-none" />
                            <div className="h-[400px] lg:h-[500px] w-full bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 relative">
                                <Canvas gl={{
                                    antialias: true,
                                    toneMappingExposure: 2.8,
                                    powerPreference: "high-performance"
                                }} dpr={[1, 2]}>
                                    <PerspectiveCamera makeDefault position={[0, 0, 130]} fov={45} />
                                    <ambientLight intensity={0.6} />
                                    <pointLight position={[60, 60, 60]} intensity={2.5} color="#ffffff" />
                                    <pointLight position={[-60, -60, 60]} intensity={1.5} color={pillar.color} />
                                    <spotLight position={[0, 120, 0]} intensity={1.2} angle={0.4} penumbra={1} castShadow />

                                    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
                                        <group scale={(pillar.baseScale || 1.0) * 2.2}>
                                            {ObjectComponent && <ObjectComponent isHovered={true} />}
                                            <mesh>
                                                <sphereGeometry args={[7, 64, 64]} />
                                                <MeshDistortMaterial
                                                    color="#ffffff"
                                                    emissive={pillar.color}
                                                    emissiveIntensity={12}
                                                    distort={0.45}
                                                    speed={2.5}
                                                    toneMapped={false}
                                                />
                                            </mesh>
                                        </group>
                                        <group rotation={[Math.PI / 4, 0, 0]}>
                                            <Torus args={[50, 0.25, 32, 200]}>
                                                <meshStandardMaterial
                                                    color={pillar.color}
                                                    emissive={pillar.color}
                                                    emissiveIntensity={8}
                                                    transparent
                                                    opacity={0.25}
                                                    toneMapped={false}
                                                />
                                            </Torus>
                                        </group>
                                        <Sparkles count={150} scale={110} size={1.2} speed={0.5} color="#ffd700" opacity={0.3} />
                                    </Float>

                                    <EffectComposer multisampling={8}>
                                        <Bloom luminanceThreshold={0.9} intensity={0.6} mipmapBlur radius={0.4} />
                                        <ChromaticAberration offset={new THREE.Vector2(0.0004, 0.0004)} />
                                        <Vignette eskil={false} offset={0.05} darkness={1.2} />
                                    </EffectComposer>
                                </Canvas>
                            </div>
                        </div>
                    </div>

                    {/* Hero Text Context */}
                    <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                        <div className="inline-block px-4 py-1 border border-[#ffd700]/30 rounded-full mb-4">
                            <span className="text-[10px] tracking-[0.5em] uppercase text-[#ffd700]">Lưu trữ Nguyên mẫu</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-serif italic tracking-[0.1em] text-[#ffd700] drop-shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                            {pillar.name}
                        </h1>
                        <p className="max-w-xl text-white/50 text-xl font-light leading-relaxed italic mx-auto lg:ml-0">
                            {pillar.description}
                        </p>
                        <div className="pt-8 flex justify-center lg:justify-start gap-12 text-[10px] tracking-[0.4em] uppercase text-white/20">
                            <div className="flex flex-col gap-2">
                                <span>Trạng thái</span>
                                <span className="text-[#ffd700]/60">Đã kích hoạt</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span>Bản ghi</span>
                                <span className="text-[#ffd700]/60">{articles.length} Hồ sơ</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT SECTION - Grid Layout */}
                <div className="space-y-12">
                    <header className="flex items-center gap-8">
                        <h2 className="text-xs tracking-[0.8em] font-light uppercase text-white/30 whitespace-nowrap">Danh mục Hồ sơ</h2>
                        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent" />
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {articles.map((article, index) => (
                            <Link
                                key={article.slug}
                                href={`/pillar/${pillar.id}/reading/${article.slug}`}
                                className="group block relative"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ffd700]/0 via-[#ffd700]/10 to-[#ffd700]/0 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative bg-white/[0.03] backdrop-blur-xl p-8 rounded-xl border border-white/10 group-hover:border-[#ffd700]/30 transition-all duration-500 min-h-[160px] flex flex-col justify-center">
                                    <div className="flex items-start gap-8">
                                        <div className="text-4xl font-serif italic text-white/10 transition-colors group-hover:text-[#ffd700]/20">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-serif tracking-widest text-white/90 group-hover:text-white transition-colors duration-300">
                                                {article.title || article.slug.replace(/_/g, ' ').toUpperCase()}
                                            </h3>
                                            <p className="mt-3 text-white/30 group-hover:text-white/50 text-sm leading-relaxed transition-colors font-light italic line-clamp-2">
                                                {article.description}
                                            </p>
                                        </div>
                                        <div className="text-[#ffd700]/20 group-hover:text-[#ffd700] opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {/* Creative mystery slots */}
                        {[1, 2].map(i => (
                            <div key={`locked-${i}`} className="relative p-8 rounded-xl border border-white/5 bg-transparent opacity-20 grayscale min-h-[160px] flex items-center">
                                <div className="flex items-start gap-8 w-full">
                                    <div className="text-4xl font-serif italic text-white/5">??</div>
                                    <div className="flex-1">
                                        <div className="h-4 w-32 bg-white/10 rounded mb-3 animate-pulse" />
                                        <div className="h-3 w-48 bg-white/5 rounded" />
                                    </div>
                                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Clean Footer Decor */}
                    <div className="pt-24 pb-12 text-center">
                        <div className="inline-flex items-center gap-6 opacity-20">
                            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-white/50" />
                            <span className="text-[10px] tracking-[1em] uppercase font-light text-white/50">End of Archives</span>
                            <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-white/50" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
