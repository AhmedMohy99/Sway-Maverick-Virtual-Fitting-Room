// components/3d/AvatarModel.tsx
'use client';
import { useGLTF, useTexture } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSwayStore } from '@/lib/store';

export default function AvatarModel() {
  const { fitType, activeTextureUrl, faceTextureUrl } = useSwayStore();
  
  // Conditionally load the base mesh based on the collection
  const modelPath = fitType === 'oversized' ? '/models/base_oversized.glb' : '/models/base_regular.glb';
  const { scene } = useGLTF(modelPath);
  
  // Load dynamic textures
  const clothingTexture = useTexture(activeTextureUrl);
  clothingTexture.flipY = false;
  clothingTexture.colorSpace = THREE.SRGBColorSpace;

  const faceTexture = faceTextureUrl ? useTexture(faceTextureUrl) : null;
  if (faceTexture) {
    faceTexture.flipY = false;
    faceTexture.colorSpace = THREE.SRGBColorSpace;
  }

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Clone materials to prevent bleeding across meshes
        if (!child.userData.isCloned) {
          child.material = child.material.clone();
          child.userData.isCloned = true;
        }

        const name = child.name.toLowerCase();

        // 1. Inject Clothing Design
        if (name.includes('shirt') || name === 'tshirt') {
          child.material.map = clothingTexture;
          child.material.color.setHex(0xffffff); // Ensure base is white to show actual colors
          child.material.needsUpdate = true;
        }
        
        // 2. Inject Face Mapping (Digital Twin)
        if (faceTexture && (name.includes('head') || name.includes('face'))) {
          child.material.map = faceTexture;
          child.material.color.setHex(0xffffff);
          child.material.roughness = 0.5; // Natural skin reflection
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene, clothingTexture, faceTexture]);

  return <primitive object={scene} />;
}

// Preload base meshes for instant switching
useGLTF.preload('/models/base_oversized.glb');
useGLTF.preload('/models/base_regular.glb');
