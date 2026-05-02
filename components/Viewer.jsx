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
        // 🌟 استنساخ إجباري لكل الماتيريال بلا استثناء لفصلهم عن بعض تماماً
        if (!child.userData.isMaterialSeparated) {
          child.material = child.material.clone();
          child.userData.isMaterialSeparated = true;
        }

        const name = child.name.toLowerCase();
        
        // ده سطر هيطبعلك أسماء القطع في الـ Console عشان لو احتجناها
        console.log("Mesh Name:", child.name);

        // 1. التيشرت فقط لا غير (باسم دقيق جداً)
        if (name === 'tshirt') {
          child.material.color.set(tshirtColor);
          child.scale.set(scale[0], scale[1], scale[2]);
        } 
        // 2. تركيب الوجه (لو فيه صورة مرفوعة)
        else if (faceUrl && (name.includes('head') || name.includes('face'))) {
          new THREE.TextureLoader().load(faceUrl, (tex) => {
            tex.flipY = false;
            tex.colorSpace = THREE.SRGBColorSpace;
            child.material.map = tex;
            child.material.color.setHex(0xffffff); // الوش بس اللي بياخد أبيض عشان الصورة تظهر بألوانها
            child.material.needsUpdate = true;
          });
        }
        // 3. أي حاجة تانية (الجسم، الإيدين، الرجلين، البنطلون، الجزمة)
        // 🔥 مش هنكتب أي كود هنا! هنسيبها بلونها الأصلي اللي في الموديل
      }
    });
  }, [scene, faceUrl, tshirtColor, scale]);

  return <primitive ref={modelRef} object={scene} />;
}

export default function Viewer(props) {
  return (
    <Canvas shadows gl={{ antialias: true }}>
      <PerspectiveCamera makeDefault position={[0, 1.2, 4]} fov={38} />
      
      <Suspense fallback={<Html center><div style={{color: '#00FFFF'}}>LOADING AVATAR...</div></Html>}>
        <Stage environment="city" intensity={0.6} adjustCamera={false}>
          <Model {...props} />
        </Stage>
      </Suspense>

      <ContactShadows position={[0, -1, 0]} opacity={0.6} scale={10} blur={2.5} color="#000000" />
      <OrbitControls enablePan={false} minDistance={1.5} maxDistance={5} />
    </Canvas>
  );
}

useGLTF.preload('/avatar.glb');
