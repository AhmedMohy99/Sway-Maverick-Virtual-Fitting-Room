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
    return [targetSize.width / baseSize.width, targetSize.length / baseSize.length, targetSize.width / baseSize.width];
  }, [currentSize, fitType]);

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();

        // 🌟 السر هنا: فك الارتباط (Cloning the Material)
        // ده بيمنع اللون إنه "يسيح" على بقية الجسم اللي بيشارك نفس الماتيريال
        if (!child.userData.isMaterialCloned) {
          child.material = child.material.clone();
          child.userData.isMaterialCloned = true;
        }

        // 1. عزل التيشرت وتلوينه وتغيير مقاسه
        if (name === 'tshirt' || name.includes('shirt')) {
          child.material.color.set(tshirtColor);
          child.material.emissive.setHex(0x000000); // إغلاق أي توهج
          child.scale.set(scale[0], scale[1], scale[2]);
        } 
        
        // 2. حماية بقية الجسم والبنطلون (استعادة الـ Original Look)
        else {
          child.material.color.setHex(0xffffff); // الأبيض هنا بيظهر صورة الجلد والبنطلون الأصلية
          child.material.emissive.setHex(0x000000);
          
          // 3. تطبيق الوش (Face Mapping)
          if (faceUrl && (name.includes('head') || name.includes('face'))) {
            new THREE.TextureLoader().load(faceUrl, (tex) => {
              tex.flipY = false;
              tex.colorSpace = THREE.SRGBColorSpace;
              child.material.map = tex;
              child.material.needsUpdate = true;
            });
          }
        }
      }
    });
  }, [scene, faceUrl, tshirtColor, scale]);

  return <primitive ref={modelRef} object={scene} />;
}

export default function Viewer(props) {
  return (
    <Canvas shadows gl={{ antialias: true }}>
      <PerspectiveCamera makeDefault position={[0, 1.2, 4]} fov={35} />
      
      <Suspense fallback={<Html center><div style={{color: '#00FFFF'}}>ISOLATING MESHES...</div></Html>}>
        <Stage environment="studio" intensity={0.5} adjustCamera={false}>
          <Model {...props} />
        </Stage>
      </Suspense>

      <ContactShadows position={[0, -1, 0]} opacity={0.6} scale={10} blur={2} color="#000000" />
      <OrbitControls enablePan={false} minDistance={1.5} maxDistance={5} />

      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
    </Canvas>
  );
}

useGLTF.preload('/avatar.glb');
