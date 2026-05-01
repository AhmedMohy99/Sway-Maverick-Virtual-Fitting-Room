import React, { useState, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Environment, ContactShadows } from '@react-three/drei';

// جدول المقاسات من "Regular size size guide.jpeg"
const SIZE_TABLE = {
  "S": { width: 52, length: 68, label: "1(S)" },
  "M": { width: 54, length: 70, label: "2(M)" },
  "L": { width: 56, length: 72, label: "3(L)" },
  "XL": { width: 58, length: 74, label: "4(XL)" },
  "XXL": { width: 60, length: 76, label: "5(XXL)" }
};

const Model = ({ size, color }) => {
  // ملاحظة: استبدل المسار بمسار ملف الـ GLB الذي صدرته من بلندر
  const { nodes, materials } = useGLTF('/Avatar_Sway.glb');
  
  // حساب الـ Scale بناءً على مقاس S كمرجع (Base)
  const baseWidth = SIZE_TABLE["S"].width;
  const baseLength = SIZE_TABLE["S"].length;
  
  const scaleX = SIZE_TABLE[size].width / baseWidth;
  const scaleY = SIZE_TABLE[size].length / baseLength;

  return (
    <group dispose={null}>
      {/* جسم المانيكان - سيبقى ثابتاً */}
      <primitive object={nodes.metarig} />
      <skinnedMesh
        geometry={nodes.Join.geometry}
        material={nodes.Join.material}
        skeleton={nodes.Join.skeleton}
      />

      {/* التيشرت - سيتغير مقاسه ولونه */}
      <skinnedMesh
        name="TShirt"
        geometry={nodes.TShirt.geometry}
        skeleton={nodes.TShirt.skeleton}
        scale={[scaleX, scaleY, scaleX]} // تعديل المقاس برمجياً
      >
        <meshStandardMaterial color={color} roughness={0.3} />
      </skinnedMesh>
    </group>
  );
};

export default function SwayFittingRoom() {
  const [currentSize, setCurrentSize] = useState("L");
  const [activeColor, setActiveColor] = useState("#00FFFF"); // Aqua كبداية

  const colors = [
    { name: 'Aqua', hex: '#00FFFF' },
    { name: 'Black', hex: '#000000' },
    { name: 'Purple', hex: '#A020F0' }
  ];

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column' }}>
      {/* UI Controls */}
      <div style={{ position: 'absolute', zIndex: 10, padding: '20px', color: '#00FFFF', fontFamily: 'sans-serif' }}>
        <h1 style={{ borderBottom: '2px solid #A020F0', paddingBottom: '10px' }}>SWAY MAVERICK STUDIO</h1>
        
        {/* Color Picker */}
        <div style={{ marginTop: '20px' }}>
          <p>SELECT COLOR:</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {colors.map((c) => (
              <button 
                key={c.name}
                onClick={() => setActiveColor(c.hex)}
                style={{ 
                  width: '30px', height: '30px', borderRadius: '50%', border: activeColor === c.hex ? '2px solid white' : 'none',
                  backgroundColor: c.hex, cursor: 'pointer' 
                }}
              />
            ))}
          </div>
        </div>

        {/* Size Picker */}
        <div style={{ marginTop: '20px' }}>
          <p>SELECT SIZE (Based on Size Guide):</p>
          <div style={{ display: 'flex', gap: '5px' }}>
            {Object.keys(SIZE_TABLE).map((s) => (
              <button 
                key={s}
                onClick={() => setCurrentSize(s)}
                style={{ 
                  padding: '10px 15px', background: currentSize === s ? '#00FFFF' : '#1a1a1a',
                  color: currentSize === s ? 'black' : 'white', border: '1px solid #A020F0', cursor: 'pointer'
                }}
              >
                {SIZE_TABLE[s].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Model size={currentSize} color={activeColor} />
          </Stage>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <shadowMaterial transparent opacity={0.4} />
          </mesh>
        </Suspense>
        <OrbitControls makeDefault minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
}
