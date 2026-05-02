'use client';
import { useEffect } from 'react';
import FittingRoom from '../components/3d/FittingRoom';
import FaceUpload from '../components/ui/FaceUpload';
import CyberButton from '../components/ui/CyberButton';
import SizeGuideModal from '../components/ui/SizeGuideModal';
import AutoRotateToggle from '../components/ui/AutoRotateToggle';
import { useSwayStore } from '../lib/store';
import { getSmartRecommendation } from '../lib/ai-fitting';
import { motion } from 'framer-motion';
import { Ruler, Weight } from 'lucide-react';

export default function ProductPage() {
  const { height, weight, fitType, recommendedSize, setBodyData, updateRecommendation, toggleSizeGuide } = useSwayStore();

  useEffect(() => {
    const rec = getSmartRecommendation(height, weight, fitType);
    updateRecommendation(rec);
  }, [height, weight, fitType, updateRecommendation]);

  return (
    <main className="flex flex-col lg:flex-row w-full h-screen bg-black text-white font-mono overflow-hidden">
      
      {/* LEFT: 3D Viewer */}
      <section className="w-full lg:w-[60%] h-[50vh] lg:h-full relative border-b lg:border-r border-[#111]">
        <FittingRoom />
        
        {/* Auto-Rotate Toggle - Positioned over 3D view */}
        <div className="absolute top-4 left-4 z-10">
          <AutoRotateToggle />
        </div>
      </section>

      {/* RIGHT: Product Controls */}
      <section className="w-full lg:w-[40%] h-[50vh] lg:h-full overflow-y-auto p-6 lg:p-12 flex flex-col gap-8 custom-scrollbar">
        
        {/* Product Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-[#222] pb-6"
        >
          <h1 className="text-2xl lg:text-3xl font-black tracking-widest uppercase bg-gradient-to-r from-white to-[#00FFFF] bg-clip-text text-transparent">
            The Maverick Phoenix
          </h1>
          <div className="flex items-baseline gap-3 mt-2">
            <p className="text-[#00FFFF] tracking-widest text-lg font-bold">730 EGP</p>
            <span className="text-xs text-gray-500 line-through">950 EGP</span>
          </div>
        </motion.div>

        {/* Measurements Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-[#00FFFF]" />
            <h3 className="text-[11px] text-gray-400 tracking-[0.2em] uppercase">Your Measurements</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Height Input */}
            <div className="group bg-[#0a0a0a] border border-[#222] p-4 flex flex-col gap-2 focus-within:border-[#00FFFF] transition-all hover:border-[#00FFFF]/50">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Ruler className="w-3 h-3" />
                <span>HEIGHT (CM)</span>
              </div>
              <input 
                type="number" 
                value={height} 
                onChange={(e) => setBodyData(Number(e.target.value), weight)}
                className="bg-transparent outline-none text-2xl font-bold text-[#00FFFF] w-full"
                min="140"
                max="220"
              />
            </div>
            
            {/* Weight Input */}
            <div className="group bg-[#0a0a0a] border border-[#222] p-4 flex flex-col gap-2 focus-within:border-[#00FFFF] transition-all hover:border-[#00FFFF]/50">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Weight className="w-3 h-3" />
                <span>WEIGHT (KG)</span>
              </div>
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setBodyData(height, Number(e.target.value))}
                className="bg-transparent outline-none text-2xl font-bold text-[#00FFFF] w-full"
                min="40"
                max="150"
              />
            </div>
          </div>
        </motion.div>

        {/* AI Recommendation */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={recommendedSize}
          transition={{ delay: 0.2 }}
          className="relative border border-[#00FFFF] bg-gradient-to-br from-[#00FFFF]/10 to-transparent p-6 overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#00FFFF]" />
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#00FFFF]/20 blur-3xl group-hover:bg-[#00FFFF]/30 transition-all" />
          
          <div className="relative z-10">
            <h3 className="text-[10px] text-[#00FFFF] mb-2 tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00FFFF] rounded-full animate-pulse" />
              AI RECOMMENDATION
            </h3>
            <p className="text-xl font-bold tracking-wide">{recommendedSize}</p>
          </div>
        </motion.div>

        {/* Size Guide Link */}
        <div className="flex justify-between items-center">
          <button 
            onClick={() => toggleSizeGuide(true)} 
            className="text-xs text-gray-400 hover:text-[#00FFFF] uppercase tracking-widest underline decoration-[#222] underline-offset-4 transition-colors"
          >
            📏 View Size Guide
          </button>
        </div>

        {/* Face Upload */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <FaceUpload />
        </motion.div>

        {/* Add to Cart */}
        <motion.div 
          className="mt-auto pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <CyberButton>Add To Cart // 730 EGP</CyberButton>
        </motion.div>
      </section>
      
      {/* Modal */}
      <SizeGuideModal />
    </main>
  );
}
