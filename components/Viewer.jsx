'use client';
import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, ContactShadows, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';
import { SIZE_DATA } from '../lib/sizeCharts';

function Model({ currentSize, tshirtColor, faceUrl, fitType }) {
  const { scene } = useGLTF('/avatar.glb');
  const modelRef = useRef();

  const scale = useMemo(() => {
    const baseSize = SIZE_DATA[fitType]["S"];
    const targetSize = SIZE_DATA[fitType][currentSize] || baseSize;
    const widthScale = targetSize.width / baseSize.width;
    const lengthScale = targetSize.length / baseSize.length;
    return [widthScale, lengthScale, widthScale];
  }, [currentSize, fitType]);

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh) {
        const meshName = child.name.toLowerCase();

        // 1. معالجة الجلد (الجسم كله + الوش)
        if (meshName.includes('skin') || meshName.includes('body') || meshName.includes('head') || meshName.includes('face')) {
          // نرجع اللون الأصلي (أبيض عشان يظهر التكستشر) ونشيل الضلمة
          child.material.color.set(0xffffff); 
          child.material.emissive = new THREE.Color(0x000000); // شيل التوهج القديم
          child.material.roughness = 0.4;
          
          // لو فيه صورة وش مرفوعة، نركبها على الجزء الخاص بالوش بس
          if (faceUrl && (meshName.includes('head') || meshName.includes('face'))) {
            new THREE.TextureLoader().load(faceUrl, (tex) => {
              tex.flipY = false;
              tex.colorSpace = THREE.SRGBColorSpace;
              child.material.map = tex;
              child.material.needsUpdate = true;
            });
          }
        }

        // 2. معالجة التيشرت
        if (meshName.includes('tshirt') || meshName.includes('shirt')) {
          child.material.color.set(tshirtColor);
          child.scale.set(scale[0], scale[1], scale[2]);
        }
      }
    });
  }, [scene, faceUrl, tshirtColor, scale]);

  return <primitive ref={modelRef} object={scene} />;
}

export default function Viewer({ currentSize, tshirtColor, faceUrl, fitType }) {
  return (
    <Canvas shadows gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera makeDefault position={[0, 1.2, 4]} fov={40} />
      
      <Suspense fallback={<Html center><div style={{color: '#00FFFF'}}>SYNCING SWAY ENGINE...</div></Html>}>
        {/* زودنا الـ Intensity هنا عشان الموديل كله ينور مش الوش بس */}
        <Stage environment="city" intensity={0.6} adjustCamera={false}>
          <Model currentSize={currentSize} tshirtColor={tshirtColor} faceUrl={faceUrl} fitType={fitType} />
        </Stage>
      </Suspense>

      <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2.5} color="#00FFFF" />
      <OrbitControls enablePan={false} minDistance={2} maxDistance={6} />

      {/* إضاءة عامة قوية للـ Original Look */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
    </Canvas>
  );
}

useGLTF.preload('/avatar.glb');
