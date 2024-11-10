// components/ThreeModelScroll.js

"use client"; // Ensure this component is rendered on the client side

import { useRef, useEffect } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AxesHelper } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

// Extend Three.js objects to make them available as JSX elements
extend({ AxesHelper });

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Helper component to load and render the GLB model
function Model({ glbPath, finalPosition }) {
    const groupRef = useRef();

    useEffect(() => {
        const loader = new GLTFLoader();
        loader.load(
            glbPath,
            (gltf) => {
                const model = gltf.scene;

                // Convert to non-indexed geometry for flat shading
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.geometry = child.geometry.toNonIndexed();
                        child.material = child.material.clone();
                        child.material.flatShading = true;
                        child.material.needsUpdate = true;
                    }
                });

                // Center the model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center); // Center the model

                groupRef.current.add(model);

                // Set initial rotation and position
                model.rotation.y = -0.25 * Math.PI;
                model.position.set(0, 0, 0);

                // GSAP ScrollTrigger Animations

                // Rotation Animation
                gsap.to(model.rotation, {
                    y: () => -0.25 * Math.PI - 2 * Math.PI, // 360 degrees rotation
                    scrollTrigger: {
                        trigger: ".section-b",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                        // markers: true, // Uncomment for debugging
                    },
                });

                // Position Animation
                gsap.to(model.position, {
                    x: finalPosition.x,
                    y: finalPosition.y,
                    z: finalPosition.z,
                    scrollTrigger: {
                        trigger: ".section-a",
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                        // markers: true, // Uncomment for debugging
                    },
                });
            },
            undefined,
            (error) => {
                console.error("An error occurred while loading the GLB model:", error);
            }
        );
    }, [glbPath, finalPosition]);

    return <group ref={groupRef} />;
}

export default function ThreeModelScroll({ glbPath, finalPosition }) {
    return (
        <Canvas
            camera={{ position: [0, 1.6, 3], fov: 75 }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none", // Allows interaction with underlying content
                zIndex: -1, // Places the canvas behind other elements
            }}
        >
            {/* Axes Helper */}
            <axesHelper args={[5]} />

            {/* Ambient Light */}
            <ambientLight intensity={0.8} />

            {/* Directional Light */}
            <directionalLight position={[10, 10, 10]} intensity={0.5} />

            {/* Render the Model */}
            <Model glbPath={glbPath} finalPosition={finalPosition} />
        </Canvas>
    );
}
