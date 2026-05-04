'use client';
import { useRef } from 'react';
import { useSwayStore } from '../../lib/store';
import { Upload } from 'lucide-react';

export default function FaceUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setFaceTexture, faceTextureUrl } = useSwayStore();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFaceTexture(url);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-[#00FFFF] rounded-full" />
        <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400">
          Personalize Avatar
        </h3>
      </div>
      
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleUpload} 
      />
      
      <button 
        onClick={() => fileInputRef.current?.click()}
        className="group relative w-full overflow-hidden bg-[#0a0a0a] border-2 border-dashed border-[#00FFFF]/30 hover:border-[#00FFFF] transition-all duration-300 p-8"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#00FFFF]/10 flex items-center justify-center group-hover:bg-[#00FFFF]/20 transition-colors duration-300">
            <Upload className="w-5 h-5 text-[#00FFFF]" />
          </div>
          
          <div className="text-center">
            <p className="text-sm font-bold text-white tracking-wide uppercase">
              Upload Face Map
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {faceTextureUrl ? '✓ Image uploaded' : 'PNG, JPG up to 5MB'}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}
