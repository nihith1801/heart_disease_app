"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

// Separate model loading component for better organization
const StethoscopeObject = ({ onLoad, onError }) => {
    const { scene } = useThree();
    const modelRef = useRef();

    useEffect(() => {
        const mtlLoader = new MTLLoader();
        mtlLoader.setPath("/models/");

        const loadModel = async () => {
            try {
                const materials = await new Promise((resolve, reject) => {
                    mtlLoader.load(
                        "Stethoscope.mtl",
                        resolve,
                        undefined,
                        reject
                    );
                });

                materials.preload();

                const objLoader = new OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath("/models/");

                const object = await new Promise((resolve, reject) => {
                    objLoader.load(
                        "Stethoscope.obj",
                        resolve,
                        undefined,
                        reject
                    );
                });

                // Configure model properties
                object.traverse((child) => {
                    if (child.isMesh) {
                        child.material.side = THREE.DoubleSide;
                        child.material.transparent = false;
                        child.material.opacity = 1;
                        // Add shadows
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                // Position and scale
                object.position.set(0, 0, 0);
                object.scale.set(0.7, 0.7, 0.7);
                object.rotation.x = Math.PI / 8; // Slight tilt

                modelRef.current = object;
                scene.add(object);
                onLoad?.();

                // Add ambient light
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
                scene.add(ambientLight);

                // Add directional light
                const dirLight = new THREE.DirectionalLight(0xffffff, 1);
                dirLight.position.set(5, 5, 5);
                dirLight.castShadow = true;
                scene.add(dirLight);

            } catch (error) {
                console.error("Error loading model:", error);
                onError?.(error);
            }
        };

        loadModel();

        return () => {
            if (modelRef.current) {
                scene.remove(modelRef.current);
            }
        };
    }, [scene, onLoad, onError]);

    return null;
};

// Main component with loading state handling
export const StethoscopeModel = ({ className }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = (error) => {
        setError(error);
        setIsLoading(false);
    };

    return (
        <div className={`relative w-full h-[400px] ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 rounded-lg">
                    <div className="text-white">Loading model...</div>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-900 bg-opacity-50 rounded-lg">
                    <div className="text-white">Error loading model</div>
                </div>
            )}

            <Canvas shadows className="rounded-lg">
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    minDistance={2}
                    maxDistance={10}
                />
                <StethoscopeObject onLoad={handleLoad} onError={handleError} />
            </Canvas>
        </div>
    );
};