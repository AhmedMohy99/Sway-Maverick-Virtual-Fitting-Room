import React, { useState, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, PerspectiveCamera } from '@react-three/drei';

// جدول المقاسات بناءً على Regular size size guide.jpeg
const SIZE_GUIDE = {
  "S": { width: 52, length: 68, label: "1(S)" },
  "M": { width: 54, length: 70, label: "2(M)" },
  "L": { width: 56, length: 72, label: "3(L)" },
  "XL": { width: 58, length: 74, label: "4(XL)" },
  "XXL": { width: 60, length: 76, label: "5(XXL)" }
};

const SwayModel = ({ currentSize, tshirtColor }) => {
  // تحميل الموديل - تأكد من وضع ملف الـ .glb في فولدر public
  const { nodes, materials } = useGLTF('/sway_model.glb');

  // حساب الـ Scale برمجياً للتيشرت فقط
  const scale = useMemo(() => {
    const base = SIZE_GUIDE["S"];
    const target = SIZE_GUIDE[currentSize];
    return [target.width / base.width, target.length / base.length, target.width / base.width];
  }, [currentSize]);

  return (
    <group dispose={null}>
      {/* عرض العظام (Skeleton) */}
      <primitive object={nodes.metarig} />
      
      {/* جسم المانيكان الرئيسي (Mesh) */}
      <skinnedMesh
        geometry={nodes.Join.geometry}
        material={nodes.Join.material}
        skeleton={nodes.Join.skeleton}
      />

      {/* التيشرت مع إمكانية تغيير اللون والمقاس */}
      <skinnedMesh
        name="TShirt"
        geometry={nodes.TShirt.geometry}
        skeleton={nodes.TShirt.skeleton}
        scale={scale}
      >
        <meshStandardMaterial 
          color={tshirtColor} 
          roughness={0.4} 
          metalness={0.1} 
        />
      </skinnedMesh>
    </group>
  );
};

export default function App() {
  const [size, setSize] = useState("L");
  const [color, setColor] = useState("#00FFFF"); // Aqua كبداية

  const themeColors = [
    { name: 'Aqua', hex: '#00FFFF' },
    { name: 'Black', hex: '#111111' },
    { name: 'Purple', hex: '#8A2BE2' }
  ];

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#050505', 
      color: '#00FFFF', 
      fontFamily: 'Orbitron, sans-serif',
      display: 'flex' 
    }}>
      
      {/* Sidebar UI */}
      <div style={{ 
        width: '300px', 
        padding: '40px', 
        borderRight: '1px solid #8A2BE2', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '30px',
        background: 'rgba(0,0,0,0.8)'
      }}>
        <h2 style={{ letterSpacing: '2px', color: '#8A2BE2' }}>SWAY MAVERICK</h2>
        
        <div>
          <p style={{ fontSize: '12px', marginBottom: '10px' }}>SELECT COLOR</p>
          <div style={{ display: 'flex', gap: '15px' }}>
            {themeColors.map((c) => (
              <button
                key={c.hex}
                onClick={() => setColor(c.hex)}
                style={{
                  width: '35px', height: '35px', borderRadius: '50%',
                  backgroundColor: c.hex, border: color === c.hex ? '3px solid white' : '1px solid #444',
                  cursor: 'pointer', transition: '0.3s'
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontSize: '12px', marginBottom: '10px' }}>SIZE SELECTOR</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {Object.keys(SIZE_GUIDE).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  padding: '12px',
                  backgroundColor: size === s ? '#00FFFF' : 'transparent',
                  color: size === s ? '#000' : '#00FFFF',
                  border: '1px solid #00FFFF',
                  cursor: 'pointer', fontWeight: 'bold', transition: '0.2s'
                }}
              >
                {SIZE_GUIDE[s].label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 'auto', fontSize: '10px', color: '#444' }}>
          WE-WAVE-AGENCY © 2026
        </div>
      </div>

      {/* 3D Viewer */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 1, 4]} />
          <Suspense fallback={null}>
            <Stage environment="night" intensity={0.5} contactShadow={{ opacity: 0.5, blur: 2 }}>
              <SwayModel currentSize={size} tshirtColor={color} />
            </Stage>
          </Suspense>
          <OrbitControls 
            enablePan={false} 
            minDistance={2} 
            maxDistance={6} 
            maxPolarAngle={Math.PI / 2} 
          />
        </Canvas>
      </div>
    </div>
  );
}

// تحميل الموديل مسبقاً لتحسين الأداء
useGLTF.preload('/sway_model.glb');
