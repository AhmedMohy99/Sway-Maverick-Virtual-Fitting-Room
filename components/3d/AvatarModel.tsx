'use client';
import { useGLTF, useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';
import { useSwayStore } from '../../lib/store';

export default function AvatarModel() {
  const { topTexture, bottomTexture, faceTexture } = useSwayStore();
  const { scene } = useGLTF('/avatar.glb');

  // تحميل الـ Textures
  const tTop = topTexture ? useTexture(topTexture) : null;
  const tBottom = bottomTexture ? useTexture(bottomTexture) : null;
  const tFace = faceTexture ? useTexture(faceTexture) : null;

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();
        
        // تطبيق تيشيرت
        if (tTop && (name.includes('shirt') || name.includes('top'))) {
          child.material.map = tTop;
          child.material.needsUpdate = true;
        }
        // تطبيق بنطلون
        if (tBottom && (name.includes('pants') || name.includes('leg'))) {
          child.material.map = tBottom;
          child.material.needsUpdate = true;
        }
        // تطبيق وجه
        if (tFace && (name.includes('head') || name.includes('face'))) {
          child.material.map = tFace;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene, tTop, tBottom, tFace]);

  return <primitive object={scene} />;
}
