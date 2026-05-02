'use client';
import { motion } from 'framer-motion';
import React from 'react';

export default function CyberButton({ children, onClick, className = '' }: { children: React.ReactNode, onClick?: () => void, className?: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(0,255,255,0.4)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full bg-[#00FFFF] text-black font-bold py-4 uppercase tracking-[0.2em] transition-colors hover:bg-white ${className}`}
    >
      {children}
    </motion.button>
  );
}
