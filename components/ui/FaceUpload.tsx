'use client';
import { useRef } from 'react';
import { useSwayStore } from '@/lib/store';

export default function FaceUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setFaceTexture } = useSwayStore();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFaceTexture(url);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleUpload} />
      <button 
        onClick={() => fileInputRef.current?.click()}
        className="w-full border border-dashed border-[#00FFFF]/50 hover:border-[#00FFFF] hover:bg-[#00FFFF]/5 text-[#00FFFF] transition-all p-4 text-xs tracking-[0.2em] uppercase"
      >
        [+] UPLOAD FACE MAP
      </button>
    </div>
  );
}
