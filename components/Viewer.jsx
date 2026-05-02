'use client';
import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, ContactShadows, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';
import { SIZE_DATA } from '../lib/sizeCharts';

function Model({ currentSize, tshirtColor, faceUrl, fitType }) {
  const { scene } = useGLTF('/avatar.glb');
  const modelRef = useRef();

  // حساب أبعاد التيشرت
  const scale = useMemo(() => {
    const baseSize = SIZE_DATA[fitType]["S"];
    const targetSize = SIZE_DATA[fitType][currentSize] || baseSize;
    const widthScale = targetSize.width / baseSize.width;
    const lengthScale = targetSize.length / baseSize.length;
    return [widthScale, lengthScale, widthScale];
  }, [currentSize, fitType]);

  useEffect(() => {
    if (!scene) return;

    // 1. تركيب الوجه وإصلاح الإضاءة والألوان
    if (faceUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(faceUrl, (texture) => {
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;

        scene.traverse((child) => {
          if (child.isMesh) {
            const meshName = child.name.toLowerCase();
            // استهداف الوجه فقط
            if (meshName.includes('head') || meshName.includes('face') || meshName.includes('skin')) {
              const newMat = child.material.clone();
              newMat.map = texture;
              
              // السر هنا: إجبار اللون الأساسي إنه يكون أبيض عشان صورتك تظهر بألوانها الطبيعية
              newMat.color = new THREE.Color(0xffffff);
              // إعطاء توهج خفيف للوجه لقتل أي ضلمة
              newMat.emissive = new THREE.Color(0x111111);
              newMat.roughness = 0.5;
              
              child.material = newMat;
              child.material.needsUpdate = true;
            }
          }
        });
      });
    }

    // 2. تلوين التيشرت (مع حماية إيدين المانيكان من التلوين بالغلط)
    scene.traverse((child) => {
      if (child.isMesh) {
        const meshName = child.name.toLowerCase();
        // شرط دقيق عشان نلون التيشرت بس
        if (meshName === 'tshirt' || meshName.includes('shirt')) {
          const newMat = child.material.clone();
          newMat.color.set(tshirtColor);
          child.material = newMat;
          // تطبيق المقاس على التيشرت فقط
          child.scale.set(scale[0], scale[1], scale[2]);
        }
      }
    });
  }, [scene, faceUrl, tshirtColor, scale]);

  return <primitive ref={modelRef} object={scene} />;
}

// شاشة التحميل اللحظية
function LoadingFallback() {
  return (
    <Html center>
      <div style={{ color: '#00FFFF', fontFamily: 'monospace', background: 'rgba(0,0,0,0.8)', padding: '15px', border: '1px solid #00FFFF', borderRadius: '4px' }}>
        LOADING AVATAR...
      </div>
    </Html>
  );
}

export default function Viewer({ currentSize, tshirtColor, faceUrl, fitType }) {
  return (
    <Canvas shadows gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera makeDefault position={[0, 1.2, 4]} fov={45} />
      
      <Suspense fallback={<LoadingFallback />}>
        <Stage environment="city" intensity={0.8} adjustCamera={false}>
          <Model currentSize={currentSize} tshirtColor={tshirtColor} faceUrl={faceUrl} fitType={fitType} />
        </Stage>
      </Suspense>

      <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={10} blur={2.5} color="#00FFFF" />
      <OrbitControls enablePan={false} enableZoom={true} minDistance={2} maxDistance={6} />

      {/* إضاءات إضافية */}
      <ambientLight intensity={0.6} color="#ffffff" />
      {/* كشاف إضاءة قوي موجه للوجه مخصوص عشان يظهر تفاصيل صورتك */}
      <pointLight position={[0, 1.5, 2]} intensity={2.5} distance={5} color="#ffffff" />
    </Canvas>
  );
}

useGLTF.preload('/avatar.glb');
