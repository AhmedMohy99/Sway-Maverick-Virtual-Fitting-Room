'use client';
import { useGLTF, useTexture } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useSwayStore } from '../../lib/store';

export default function AvatarModel() {
  const { fitType, activeTextureUrl, faceTextureUrl } = useSwayStore();
  
  const modelPath = '/avatar.glb'; 
  const { scene } = useGLTF(modelPath);
  
  // Memoize texture loading for performance
  const clothingTexture = useMemo(() => {
    if (!activeTextureUrl) return null;
    const texture = new THREE.TextureLoader().load(activeTextureUrl);
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [activeTextureUrl]);

  const faceTexture = useMemo(() => {
    if (!faceTextureUrl) return null;
    const texture = new THREE.TextureLoader().load(faceTextureUrl);
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [faceTextureUrl]);

  useEffect(() => {
    if (!scene) return;
    
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Clone material only once per mesh
        if (!child.userData.isMaterialSeparated) {
          child.material = child.material.clone();
          child.userData.isMaterialSeparated = true;
        }

        const name = child.name.toLowerCase();
        const isTshirt = (name.includes('shirt') || name.includes('tshirt') || name.includes('top')) 
                      && !name.includes('skin') && !name.includes('body') && !name.includes('arm');

        if (isTshirt && clothingTexture) {
          child.material.map = clothingTexture;
          child.material.color.setHex(0xffffff);
          child.material.needsUpdate = true;
        } else if (faceTexture && (name.includes('head') || name.includes('face'))) {
          child.material.map = faceTexture;
          child.material.color.setHex(0xffffff);
          child.material.roughness = 0.5;
          child.material.needsUpdate = true;
        }

        // Enable shadows
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene, clothingTexture, faceTexture]);

  return <primitive object={scene} />;
}

// Preload the model
useGLTF.preload('/avatar.glb');
