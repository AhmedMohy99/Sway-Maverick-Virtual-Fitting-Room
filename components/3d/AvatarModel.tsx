'use client';
import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useSwayStore } from '../../lib/store';

export default function AvatarModel() {
  const { topTexture, bottomTexture, faceTexture } = useSwayStore();
  const { scene } = useGLTF('/avatar.glb');

  // بنعمل نسخة من الموديل عشان منبوظش النسخة الأصلية المخبأة (Cached)
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    if (!clonedScene) return;

    const textureLoader = new THREE.TextureLoader();

    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // 🚀 الحل السحري: فصل الخامات عن بعضها عشان الصور متدخلش في بعض
        if (child.material) {
          child.material = child.material.clone();
        }

        const name = child.name.toLowerCase();

        // 1. تطبيق التيشيرت فقط
        if (name.includes('shirt') || name.includes('top') || name.includes('tshirt')) {
          if (topTexture) {
            textureLoader.load(topTexture, (texture) => {
              texture.flipY = false;
              texture.colorSpace = THREE.SRGBColorSpace;
              child.material.map = texture;
              child.material.needsUpdate = true;
            });
          }
        }
        
        // 2. تطبيق البنطلون فقط (استخدمنا else if عشان نمنع التداخل)
        else if (name.includes('pant') || name.includes('leg') || name.includes('bottom') || name.includes('sweat')) {
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
        else if (name.includes('head') || name.includes('face')) {
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
  }, [clonedScene, topTexture, bottomTexture, faceTexture]);

  return <primitive object={clonedScene} />;
}
