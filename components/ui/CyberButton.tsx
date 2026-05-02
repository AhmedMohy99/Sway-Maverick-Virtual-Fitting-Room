'use client';
import { motion } from 'framer-motion';
import React from 'react';

export default function CyberButton({ 
  children, 
  onClick, 
  className = '' 
}: { 
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative w-full overflow-hidden
        bg-[#00FFFF] text-black 
        font-bold py-5 
        uppercase tracking-[0.2em] text-sm
        transition-all duration-300
        hover:bg-white hover:shadow-2xl hover:shadow-[#00FFFF]/50
        active:shadow-none
        ${className}
      `}
    >
      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
