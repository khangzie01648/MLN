"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AdditiveBlending } from "three";

/**
 * --- THE VOLUMETRIC VORTEX SHADER (FINAL STABLE) ---
 * Re-written completely to ensure syntax correctness.
 */

const InstanceFragmentShader = `
    varying vec3 vColor;
    varying float vAlpha;
    varying vec2 vUv;

    void main() {
        // Soft circle shape
        vec2 center = vUv - 0.5;
        float dist = length(center);
        
        // Discard corners (DISABLED FOR DEBUG)
        // if (dist > 0.5) discard;
        
        // Glow falloff
        float glow = 1.0 - (dist * 2.0);
        glow = pow(glow, 1.5);
        
        gl_FragColor = vec4(vColor, vAlpha * glow);
    }
`;

const InstanceVertexShaderAdjusted = `
    uniform float uTime;
    uniform float uWarp; // 0.0 to 1.0
    attribute vec4 aRandom; 
    
    varying vec3 vColor;
    varying float vAlpha;
    varying vec2 vUv;

    void main() {
        vUv = uv; 
        
        float radius = aRandom.x;
        // SAFETY FALLBACK: If data is missing (radius=0), force it to be visible
        if (radius < 1.0) radius = 30.0 + sin(float(gl_InstanceID)) * 20.0;

        float angleInit = aRandom.y;
        float speed = aRandom.z;
        if (speed < 0.1) speed = 0.5; // Safety speed
        float size = aRandom.w;
        if (size < 0.1) size = 1.0; // Safety size

        // WARP LOGIC: Everything speeds up
        float time = uTime * (1.0 + uWarp * 10.0);
        
        // Differential Rotation
        float currentAngle = angleInit + time * speed * (15.0 / (radius + 2.0));
        
        // Turbulence gets flattened during warp
        float turbulenceMult = 1.0 - uWarp; 
        float waveY = sin(currentAngle * 3.0 + time) * (radius * 0.1) * turbulenceMult;
        float waveZ = cos(currentAngle * 2.0 + time * 1.5) * (radius * 0.1) * turbulenceMult;

        // Position
        vec3 offsetPos = vec3(
            cos(currentAngle) * radius,
            sin(currentAngle) * radius + waveY,
            waveZ 
        );

        // Billboarding & Stretching
        // During Warp, we look AT the center, so particles fly AT camera
        vec3 viewDir = normalize(cameraPosition - offsetPos);
        vec3 right = normalize(cross(viewDir, vec3(0.0, 1.0, 0.0)));
        vec3 up = normalize(cross(right, viewDir));
        
        // SUPER STRETCH MODE
        // Base stretch + Warp Stretch
        float stretch = 1.0 + (50.0 / (radius + 1.0)); 
        stretch += uWarp * 100.0 * speed; // Infinite streaks
        
        vec3 localPos = right * position.x * stretch * size 
                      + up * position.y * size * (1.0 - uWarp * 0.8); // Thin out when stretching
        
        vec4 mvPosition = modelViewMatrix * vec4(offsetPos + localPos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // WARP COLORS (RAINBOW DOPPLER)
        vec3 colorCyan = vec3(0.1, 1.0, 1.0);
        vec3 colorDeep = vec3(0.0, 0.2, 0.8);
        vec3 colorWarp = vec3(1.0, 0.8, 0.5); // Gold/White hot
        
        float mixVal = smoothstep(0.0, 60.0, radius);
        vec3 baseColor = mix(colorCyan, colorDeep, mixVal);
        
        // Shift to white/spectrum during warp
        vColor = mix(baseColor, colorWarp + vec3(sin(radius), cos(radius), 0.5), uWarp) * (3.0 + uWarp * 10.0);
        
        // Alpha
        vAlpha = 1.0 - smoothstep(50.0, 80.0, radius); 
        vAlpha *= smoothstep(5.0, 15.0, radius);
        vAlpha += uWarp; // Make everything visible during warp
    }
`;


export default function GalaxyBackground({ isWarping }: { isWarping?: boolean }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const count = 40000;

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uWarp: { value: 0 }
    }), []);

    // ... (Data gen code remains same) ...
    // Re-use current attributeData logic, just need to update useFrame

    // Generate Data (Keep this block if necessary, or just rely on existing code context if tools support patch)
    const attributeData = useMemo(() => {
        const data = new Float32Array(count * 4);
        for (let i = 0; i < count; i++) {
            const i4 = i * 4;
            let r = Math.random();
            let radius = 10 + r * r * 70;
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 0.5;
            const size = 0.5 + Math.random() * 2.0;

            data[i4] = radius;
            data[i4 + 1] = angle;
            data[i4 + 2] = speed;
            data[i4 + 3] = size;
        }
        return data;
    }, [count]);

    useFrame((state) => {
        uniforms.uTime.value = state.clock.elapsedTime;
        // Smoothly interpolate Warp factor
        const targetWarp = isWarping ? 1.0 : 0.0;
        uniforms.uWarp.value = THREE.MathUtils.lerp(uniforms.uWarp.value, targetWarp, 0.02);
    });


    return (
        // Tilt the disk slightly to see the spiral structure
        <group rotation={[Math.PI / 2.5, 0, 0]}>
            <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
                <planeGeometry args={[0.5, 0.5]}>
                    <instancedBufferAttribute
                        attach="attributes-aRandom"
                        args={[attributeData, 4]}
                    />
                </planeGeometry>
                <shaderMaterial
                    vertexShader={InstanceVertexShaderAdjusted}
                    fragmentShader={InstanceFragmentShader}
                    uniforms={uniforms}
                    transparent={true}
                    depthWrite={false}
                    blending={AdditiveBlending}
                />
            </instancedMesh>
        </group>
    );
}
