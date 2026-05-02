'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, ContactShadows, PerspectiveCamera, Html } from '@react-three/drei';
import { Suspense } from 'react';
import AvatarModel from './AvatarModel';

export default function FittingRoom() {
  return (
    <div className="w-full h-full bg-[#050505] relative cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 1.2, 4]} fov={35} />
        
        <Suspense fallback={<Html center><span className="text-[#00FFFF] font-mono tracking-widest text-xs">LOADING SWAY ENGINE...</span></Html>}>
          <Stage environment="studio" intensity={0.5} adjustCamera={false}>
            <AvatarModel />
          </Stage>
        </Suspense>

        <ambientLight intensity={0.4} color="#ffffff" />
        <spotLight position={[5, 5, 5]} angle={0.2} penumbra={1} intensity={2} color="#00FFFF" castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={1} color="#ffffff" />

        <ContactShadows position={[0, -0.99, 0]} opacity={0.7} scale={10} blur={2.5} color="#000000" />
        <OrbitControls enablePan={false} minDistance={1.5} maxDistance={5} maxPolarAngle={Math.PI / 1.5} />
      </Canvas>

      <div className="absolute bottom-4 left-4 text-[#00FFFF] font-mono text-[10px] tracking-[0.2em] opacity-50">
        SWAY // VIRTUAL ENGINE_
      </div>
    </div>
  );
}
