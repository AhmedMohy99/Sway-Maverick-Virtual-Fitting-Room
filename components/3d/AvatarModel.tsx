'use client';
import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useSwayStore } from '../../lib/store';

export default function AvatarModel() {
  // سحبنا الطول والوزن من الـ Store عشان نتحكم فيهم
  const { topTexture, bottomTexture, faceTexture, height, weight } = useSwayStore();
  const { scene } = useGLTF('/avatar.glb');
  const modelRef = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // 1. محرك الذكاء لتغيير حجم الموديل بناءً على الـ CM والـ KG
  useEffect(() => {
    if (!modelRef.current) return;

    // المقاسات الأساسية للموديل الافتراضي (تقدر تعدلها لو موديلك مختلف)
    const baseHeight = 175; 
    const baseWeight = 70;

    // حساب نسبة التكبير/التصغير
    const heightScale = height / baseHeight;
    const weightScale = weight / baseWeight; // الوزن بيأثر على العرض والعمق

    // تطبيق المقاسات الجديدة على الموديل (X, Y, Z)
    modelRef.current.scale.set(weightScale, heightScale, weightScale);
  }, [height, weight]);

  // 2. محرك الألوان وضبط اللوجو
  useEffect(() => {
    if (!clonedScene) return;

    const textureLoader = new THREE.TextureLoader();

    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material) {
          child.material = child.material.clone();
        }

        const name = child.name.toLowerCase();

        // تطبيق التيشيرت وضبط مكان اللوجو
        if (name.includes('shirt') || name.includes('top') || name.includes('tshirt')) {
          if (topTexture) {
            textureLoader.load(topTexture, (texture) => {
              texture.flipY = false;
              texture.colorSpace = THREE.SRGBColorSpace;

              // 🎯 معامل ضبط ارتفاع اللوجو ليظهر كطباعة احترافية على الصدر
              const SHIRT_HEIGHT_FIX = 0.15; 
              
              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;
              texture.repeat.set(1, 1);
              texture.offset.set(0, SHIRT_HEIGHT_FIX);

              child.material.map = texture;
              child.material.needsUpdate = true;
            });
          }
        }
        
        // تطبيق البنطلون
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
        
        // تطبيق الوجه
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

  return <primitive ref={modelRef} object={clonedScene} />;
}
