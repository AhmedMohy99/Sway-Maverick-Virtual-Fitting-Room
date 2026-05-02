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

        // 1. تنظيف الجسم بالكامل وإرجاع اللون الأصلي
        // إحنا بنجبر أي حاجة تبع الجلد أو اللبس التاني إنها ترجع لألوان التكستشر الأصلية
        if (meshName.includes('skin') || meshName.includes('body') || meshName.includes('arm') || meshName.includes('leg') || meshName.includes('pant') || meshName.includes('shoe')) {
          child.material.color.set(0xffffff); // أبيض عشان التكستشر يظهر طبيعي
          child.material.emissive = new THREE.Color(0x000000); // شيل أي إضاءة ذاتية
          child.material.transparent = false;
          child.material.opacity = 1;
        }

        // 2. تطبيق الـ Face Map على الوش بس
        if (faceUrl && (meshName.includes('head') || meshName.includes('face'))) {
          new THREE.TextureLoader().load(faceUrl, (tex) => {
            tex.flipY = false;
            tex.colorSpace = THREE.SRGBColorSpace;
            child.material.map = tex;
            child.material.color.set(0xffffff);
            child.material.needsUpdate = true;
          });
        }

        // 3. تلوين التيشرت "فقط" ومنع تسريب اللون للجسم
        // هنستخدم شرط محدد جداً لاسم التيشرت
        if (meshName === 'tshirt' || meshName.includes('shirt_mesh') || (meshName.includes('shirt') && !meshName.includes('skin'))) {
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
      <PerspectiveCamera makeDefault position={[0, 1.2, 4]} fov={35} />
      
      <Suspense fallback={<Html center><div style={{color: '#00FFFF'}}>RESTING MODEL...</div></Html>}>
        {/* استخدمنا إضاءة محايدة جداً عشان نحافظ على الألوان الأصلية */}
        <Stage environment="warehouse" intensity={0.5} adjustCamera={false}>
          <Model currentSize={currentSize} tshirtColor={tshirtColor} faceUrl={faceUrl} fitType={fitType} />
        </Stage>
      </Suspense>

      <ContactShadows position={[0, -1, 0]} opacity={0.3} scale={10} blur={3} color="#000000" />
      <OrbitControls enablePan={false} minDistance={1.5} maxDistance={5} />

      {/* إضاءة بيضاء صافية عشان ميبقاش فيه "لون أخضر" قدام الموديل */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
    </Canvas>
  );
}

useGLTF.preload('/avatar.glb');
