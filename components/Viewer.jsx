'use client';
import React, { Suspense, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { SIZE_DATA } from '../lib/sizeCharts';

function Model({ currentSize, tshirtColor, faceUrl, fitType }) {
  const { scene } = useGLTF('/avatar.glb');

  const scale = useMemo(() => {
    const base = SIZE_DATA[fitType]["S"];
    const target = SIZE_DATA[fitType][currentSize] || base;
    return [target.width / base.width, target.length / base.length, target.width / base.width];
  }, [currentSize, fitType]);

  useEffect(() => {
    if (faceUrl) {
      new THREE.TextureLoader().load(faceUrl, (tex) => {
        tex.flipY = false;
        tex.colorSpace = THREE.SRGBColorSpace;
        scene.traverse((c) => {
          if (c.isMesh && (c.name.toLowerCase().includes('head') || c.name.toLowerCase().includes('face'))) {
            c.material = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5 });
          }
        });
      });
    }

    scene.traverse((c) => {
      if (c.isMesh && c.name === 'TShirt') {
        c.material.color.set(tshirtColor);
        c.scale.set(scale[0], scale[1], scale[2]);
      }
    });
  }, [faceUrl, tshirtColor, scale, scene]);

  return <primitive object={scene} />;
}

export default function Viewer(props) {
  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[0, 1, 4]} fov={45} />
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.5}>
          <Model {...props} />
        </Stage>
      </Suspense>
      <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} color="#00FFFF" />
      <OrbitControls enablePan={false} minDistance={2} maxDistance={6} />
    </Canvas>
  );
}
