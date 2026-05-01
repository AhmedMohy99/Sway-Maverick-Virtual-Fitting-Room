'use client';
import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, ContactShadows, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';
import { SIZE_DATA } from '../lib/sizeCharts';

/**
 * 3D Model Component with dynamic scaling and face mapping
 */
function Model({ currentSize, tshirtColor, faceUrl, fitType }) {
  const { scene, nodes } = useGLTF('/avatar.glb');
  const modelRef = useRef();

  // Calculate scale based on size selection
  const scale = useMemo(() => {
    const baseSize = SIZE_DATA[fitType]["S"];
    const targetSize = SIZE_DATA[fitType][currentSize] || baseSize;
    
    const widthScale = targetSize.width / baseSize.width;
    const lengthScale = targetSize.length / baseSize.length;
    
    return [widthScale, lengthScale, widthScale];
  }, [currentSize, fitType]);

  useEffect(() => {
    if (!scene) return;

    // Apply face texture if provided
    if (faceUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        faceUrl,
        (texture) => {
          texture.flipY = false;
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;

          scene.traverse((child) => {
            if (child.isMesh) {
              const meshName = child.name.toLowerCase();
              // Apply to head/face meshes
              if (meshName.includes('head') || 
                  meshName.includes('face') || 
                  meshName.includes('skin')) {
                child.material = new THREE.MeshStandardMaterial({
                  map: texture,
                  roughness: 0.6,
                  metalness: 0.1,
                });
              }
            }
          });
        },
        undefined,
        (error) => {
          console.error('Error loading face texture:', error);
        }
      );
    }

    // Apply t-shirt color and scale
    scene.traverse((child) => {
      if (child.isMesh) {
        const meshName = child.name.toLowerCase();
        
        // Apply to t-shirt mesh
        if (meshName === 'tshirt' || 
            meshName.includes('shirt') || 
            meshName.includes('top')) {
          
          // Update color
          if (child.material) {
            child.material.color.set(tshirtColor);
            child.material.roughness = 0.5;
            child.material.metalness = 0.1;
          }
          
          // Apply scale to t-shirt only
          child.scale.set(scale[0], scale[1], scale[2]);
        }
      }
    });
  }, [scene, faceUrl, tshirtColor, scale]);

  return <primitive ref={modelRef} object={scene} />;
}

/**
 * Loading fallback component
 */
function LoadingFallback() {
  return (
    <Html center>
      <div style={{
        color: '#00FFFF',
        fontSize: '14px',
        fontFamily: 'Orbitron, monospace',
        textAlign: 'center',
        padding: '20px',
        background: 'rgba(0,0,0,0.8)',
        borderRadius: '8px',
        border: '1px solid #00FFFF'
      }}>
        <div className="animate-pulse">LOADING 3D MODEL...</div>
      </div>
    </Html>
  );
}

/**
 * Main Viewer Component
 */
export default function Viewer({ currentSize, tshirtColor, faceUrl, fitType }) {
  return (
    <Canvas 
      shadows 
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: 'high-performance'
      }}
      dpr={[1, 2]}
    >
      <PerspectiveCamera 
        makeDefault 
        position={[0, 1.2, 4]} 
        fov={45} 
      />
      
      <Suspense fallback={<LoadingFallback />}>
        <Stage 
          environment="city" 
          intensity={0.6}
          shadows={{
            type: 'contact',
            opacity: 0.4,
            blur: 2
          }}
          adjustCamera={false}
        >
          <Model 
            currentSize={currentSize}
            tshirtColor={tshirtColor}
            faceUrl={faceUrl}
            fitType={fitType}
          />
        </Stage>
      </Suspense>

      {/* Contact shadow for realism */}
      <ContactShadows 
        position={[0, -1, 0]} 
        opacity={0.5} 
        scale={10} 
        blur={2.5} 
        far={4}
        color="#00FFFF"
      />

      {/* Camera controls */}
      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        minDistance={2}
        maxDistance={6}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        dampingFactor={0.05}
        rotateSpeed={0.5}
      />

      {/* Additional lighting for better visibility */}
      <ambientLight intensity={0.3} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0.5}
        castShadow
      />
    </Canvas>
  );
}

// Preload the model for better performance
useGLTF.preload('/avatar.glb');
