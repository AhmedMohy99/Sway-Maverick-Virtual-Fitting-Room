'use client';
import { useGLTF, useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';
import { useSwayStore } from '../../lib/store';

export default function AvatarModel() {
  const { fitType, activeTextureUrl, faceTextureUrl } = useSwayStore();
  
  // غير اسم avatar.glb لو انت مسميه حاجة تانية في فولدر public
  const modelPath = '/avatar.glb'; 
  const { scene } = useGLTF(modelPath);
  
  const clothingTexture = activeTextureUrl ? useTexture(activeTextureUrl) : null;
  if (clothingTexture) {
    clothingTexture.flipY = false;
    clothingTexture.colorSpace = THREE.SRGBColorSpace;
  }

  const faceTexture = faceTextureUrl ? useTexture(faceTextureUrl) : null;
  if (faceTexture) {
    faceTexture.flipY = false;
    faceTexture.colorSpace = THREE.SRGBColorSpace;
  }

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
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
      }
    });
  }, [scene, clothingTexture, faceTexture]);

  return <primitive object={scene} />;
}
