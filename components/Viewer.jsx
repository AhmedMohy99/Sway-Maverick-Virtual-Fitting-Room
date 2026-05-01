'use client';
import React, { Suspense, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const SIZE_GUIDE = {
  "S": { width: 54, length: 72.5, label: "1(S)" },
  "M": { width: 57, length: 73.5, label: "2(M)" },
  "L": { width: 60, length: 74.5, label: "3(L)" },
  "XL": { width: 63, length: 76.5, label: "4(XL)" }
};

function SwayModel({ currentSize, tshirtColor, faceUrl }) {
  const { scene } = useGLTF('/avatar.glb');

  const scale = useMemo(() => {
    const base = SIZE_GUIDE["S"];
    const target = SIZE_GUIDE[currentSize] || SIZE_GUIDE["S"];
    return [target.width / base.width, target.length / base.length, target.width / base.width];
  }, [currentSize]);

  useEffect(() => {
    if (faceUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(faceUrl, (texture) => {
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        scene.traverse((child) => {
          if (child.isMesh && (child.name.toLowerCase().includes('head') || child.name.toLowerCase().includes('face'))) {
            child.material = new THREE.MeshStandardMaterial({
              map: texture,
              roughness: 0.5,
            });
            child.material.needsUpdate = true;
          }
        });
      });
    }

    scene.traverse((child) => {
      if (child.isMesh && child.name === 'TShirt') {
        child.material = new THREE.MeshStandardMaterial({
          color: tshirtColor,
          roughness: 0.4,
          metalness: 0.1
        });
        child.material.needsUpdate = true;
        child.scale.set(scale[0], scale[1], scale[2]);
      }
    });
  }, [faceUrl, tshirtColor, scale, scene]);

  return <primitive object={scene} />;
}

export default function Viewer({ currentSize, tshirtColor, faceUrl }) {
  return (
    <Canvas shadows camera={{ position: [0, 1, 4], fov: 45 }}>
      <Suspense fallback={null}>
        <Stage environment="night" intensity={0.5}>
          <SwayModel currentSize={currentSize} tshirtColor={tshirtColor} faceUrl={faceUrl} />
        </Stage>
      </Suspense>
      <ContactShadows position={[0, -1, 0]} opacity={0.6} scale={10} blur={2} color="#00FFFF" />
      <OrbitControls enablePan={false} minDistance={2} maxDistance={6} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  );
}
