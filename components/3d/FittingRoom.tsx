'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import AvatarModel from './AvatarModel';
import { useSwayStore } from '../../lib/store';

export default function FittingRoom() {
  const { isAutoRotate } = useSwayStore();

  return (
    <div className="w-full h-full bg-[#050505] relative overflow-hidden">
      <Canvas 
        shadows 
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: false,
          preserveDrawingBuffer: true
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <PerspectiveCamera 
          makeDefault 
          position={[0, 1.5, 3.5]} 
          fov={45} 
        />
        
        <Suspense fallback={null}>
          {/* Lighting Setup */}
          <ambientLight intensity={0.5} />
          <spotLight 
            position={[5, 5, 5]} 
            angle={0.3} 
            penumbra={1} 
            intensity={1.5} 
            castShadow 
          />
          <spotLight 
            position={[-5, 5, 5]} 
            angle={0.3} 
            penumbra={1} 
            intensity={1.2} 
            castShadow 
          />
          <directionalLight 
            position={[0, 5, -5]} 
            intensity={0.8} 
          />
          
          {/* Environment for better lighting */}
          <Environment preset="studio" />
          
          {/* Avatar Model */}
          <AvatarModel />
          
          {/* Ground Shadow */}
          <ContactShadows 
            position={[0, -1, 0]} 
            opacity={0.6} 
            scale={10} 
            blur={2} 
            far={4}
          />
        </Suspense>
        
        {/* Camera Controls */}
        <OrbitControls 
          enablePan={false} 
          minDistance={2} 
          maxDistance={6} 
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
          autoRotate={isAutoRotate}
          autoRotateSpeed={1.5}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>

      {/* Loading Overlay - Only shows during initial load */}
      <div className="absolute inset-0 bg-[#050505] flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-500" id="loading-overlay">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-2 border-[#00FFFF] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#00FFFF] font-mono tracking-widest text-xs">
            LOADING SWAY ENGINE...
          </span>
        </div>
      </div>

      {/* Bottom Branding */}
      <div className="absolute bottom-4 left-4 text-[#00FFFF] font-mono text-[10px] tracking-[0.2em] opacity-50 pointer-events-none z-10">
        SWAY // VIRTUAL ENGINE_
      </div>

      {/* Auto-Rotate Indicator */}
      {isAutoRotate && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-[#00FFFF]/30 px-3 py-2 rounded z-10">
          <div className="w-2 h-2 bg-[#00FFFF] rounded-full animate-pulse" />
          <span className="text-[#00FFFF] text-[10px] tracking-widest">AUTO-ROTATE</span>
        </div>
      )}
    </div>
  );
}
