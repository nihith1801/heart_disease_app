// components/WavyBackground.js

"use client";

import React, { useRef, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { useWindowSize } from "@react-hook/window-size";

// Import PlaneGeometry and ShaderMaterial
import { PlaneGeometry, ShaderMaterial } from "three";

// Extend the Three.js namespace for React Three Fiber
extend({ PlaneGeometry, ShaderMaterial });

// Vertex and Fragment Shaders
const vertexShader = `
  varying vec2 vUv;
  void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
      vec2 st = gl_FragCoord.xy / uResolution.xy;
      float color = 0.0;
      color += sin((st.x + uTime) * 10.0) * 0.5 + 0.5;
      color *= sin((st.y + uTime) * 10.0) * 0.5 + 0.5;
      gl_FragColor = vec4(vec3(color), 0.5); // Adjust alpha for translucency
  }
`;

export const ShaderPlane = () => {
    const shaderRef = useRef();
    const [width, height] = useWindowSize();

    useEffect(() => {
        if (shaderRef.current) {
            shaderRef.current.material.uniforms.uResolution.value.set(width, height);
        }
    }, [width, height]);

    useFrame(({ clock }) => {
        if (shaderRef.current) {
            shaderRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={shaderRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                uniforms={{
                    uTime: { value: 0 },
                    uResolution: { value: new THREE.Vector2(width, height) },
                }}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent={true}
            />
        </mesh>
    );
};
