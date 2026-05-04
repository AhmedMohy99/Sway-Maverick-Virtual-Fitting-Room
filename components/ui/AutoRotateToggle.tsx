'use client';
import { motion } from 'framer-motion';
import { useSwayStore } from '../../lib/store';
import { RotateCw } from 'lucide-react';

export default function AutoRotateToggle() {
  const { isAutoRotate, toggleAutoRotate } = useSwayStore();

  return (
    <motion.button
      onClick={toggleAutoRotate}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative flex items-center gap-3 px-5 py-3 
        border backdrop-blur-md transition-all duration-300
        ${isAutoRotate 
          ? 'border-[#00FFFF] bg-[#00FFFF]/10 text-[#00FFFF] shadow-lg shadow-[#00FFFF]/20' 
          : 'border-[#333] bg-black/50 text-gray-400 hover:border-[#00FFFF]/50 hover:text-[#00FFFF]'
        }
      `}
    >
      <RotateCw 
        className={`w-4 h-4 transition-all duration-300 ${isAutoRotate ? 'animate-spin' : ''}`} 
        style={{ animationDuration: '3s' }}
      />
      <span className="text-xs tracking-widest uppercase font-mono font-bold">
        360° View
      </span>
      
      {isAutoRotate && (
        <motion.div
          className="absolute inset-0 border border-[#00FFFF] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
