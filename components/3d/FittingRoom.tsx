'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, ContactShadows, PerspectiveCamera, Html } from '@react-three/drei';
import { Suspense } from 'react';
import AvatarModel from './AvatarModel';
import { useSwayStore } from '../../lib/store';

export default function FittingRoom() {
  const { isAutoRotate } = useSwayStore();

  return (
    <div className="w-full h-full bg-[#050505] relative cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 1.2, 4]} fov={35} />
        
        <Suspense fallback={
          <Html center>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-2 border-[#00FFFF] border-t-transparent rounded-full animate-spin" />
              <span className="text-[#00FFFF] font-mono tracking-widest text-xs">
                LOADING SWAY ENGINE...
              </span>
            </div>
          </Html>
        }>
          <Stage environment="studio" intensity={0.5} adjustCamera={false}>
            <AvatarModel />
          </Stage>
        </Suspense>

        {/* Enhanced Lighting */}
        <ambientLight intensity={0.4} color="#ffffff" />
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.2} 
          penumbra={1} 
          intensity={2} 
          color="#00FFFF" 
          castShadow 
        />
        <spotLight 
          position={[-5, 5, 5]} 
          angle={0.2} 
          penumbra={1} 
          intensity={1.5} 
          color="#8A2BE2" 
          castShadow 
        />
        <directionalLight position={[-5, 5, -5]} intensity={1} color="#ffffff" />

        <ContactShadows 
          position={[0, -0.99, 0]} 
          opacity={0.7} 
          scale={10} 
          blur={2.5} 
          color="#000000" 
        />
        
        <OrbitControls 
          enablePan={false} 
          minDistance={1.5} 
          maxDistance={5} 
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={isAutoRotate}
          autoRotateSpeed={2}
        />
      </Canvas>

      {/* Bottom Branding */}
      <div className="absolute bottom-4 left-4 text-[#00FFFF] font-mono text-[10px] tracking-[0.2em] opacity-50 pointer-events-none">
        SWAY // VIRTUAL ENGINE_
      </div>

      {/* Auto-Rotate Indicator */}
      {isAutoRotate && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-[#00FFFF]/30 px-3 py-2 rounded">
          <div className="w-2 h-2 bg-[#00FFFF] rounded-full animate-pulse" />
          <span className="text-[#00FFFF] text-[10px] tracking-widest">AUTO-ROTATE</span>
        </div>
      )}
    </div>
  );
}
