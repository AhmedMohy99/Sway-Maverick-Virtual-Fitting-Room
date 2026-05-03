'use client';
import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';
import { useSwayStore } from '../../lib/store';

export default function AvatarModel() {
  const { topTexture, bottomTexture, faceTexture } = useSwayStore();
  const { scene } = useGLTF('/avatar.glb');

  useEffect(() => {
    if (!scene) return;

    const textureLoader = new THREE.TextureLoader();

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();

        // 1. تطبيق التيشيرت
        if (name.includes('shirt') || name.includes('top')) {
          if (topTexture) {
            textureLoader.load(topTexture, (texture) => {
              texture.flipY = false;
              texture.colorSpace = THREE.SRGBColorSpace;
              child.material.map = texture;
              child.material.needsUpdate = true;
            });
          }
        }

        // 2. تطبيق البنطلون
        if (name.includes('pants') || name.includes('leg')) {
          if (bottomTexture) {
            textureLoader.load(bottomTexture, (texture) => {
              texture.flipY = false;
              texture.colorSpace = THREE.SRGBColorSpace;
              child.material.map = texture;
              child.material.needsUpdate = true;
            });
          }
        }

        // 3. تطبيق الوجه
        if (name.includes('head') || name.includes('face')) {
          if (faceTexture) {
            textureLoader.load(faceTexture, (texture) => {
              texture.flipY = false;
              texture.colorSpace = THREE.SRGBColorSpace;
              child.material.map = texture;
              child.material.needsUpdate = true;
            });
          }
        }
      }
    });
  }, [scene, topTexture, bottomTexture, faceTexture]);

  return <primitive object={scene} />;
}
