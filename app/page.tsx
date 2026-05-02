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
    <main className="flex flex-col lg:flex-row w-full h-screen bg-black text-white overflow-hidden">
      
      {/* LEFT: 3D Viewer */}
      <section className="w-full lg:w-[60%] h-[50vh] lg:h-full relative border-b lg:border-r border-[#1a1a1a]">
        <FittingRoom />
        
        {/* Auto-Rotate Toggle */}
        <div className="absolute top-6 left-6 z-10">
          <AutoRotateToggle />
        </div>
      </section>

      {/* RIGHT: Product Controls */}
      <section className="w-full lg:w-[40%] h-[50vh] lg:h-full overflow-y-auto custom-scrollbar">
        <div className="p-6 lg:p-10 flex flex-col gap-8 max-w-xl mx-auto">
          
          {/* Product Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight uppercase leading-tight">
              The Maverick <span className="text-[#00FFFF]">Phoenix</span>
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-[#00FFFF]">730 EGP</span>
              <span className="text-sm text-gray-500 line-through">950 EGP</span>
              <span className="px-3 py-1 bg-[#00FFFF]/10 border border-[#00FFFF]/30 text-[#00FFFF] text-xs font-bold tracking-wider">
                -23%
              </span>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#00FFFF]/30 to-transparent" />

          {/* Measurements Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-[#00FFFF] rounded-full" />
              <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400">
                Your Measurements
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Height Input */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative bg-[#0a0a0a] border border-[#222] p-5 transition-all duration-300 group-hover:border-[#00FFFF]/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Ruler className="w-4 h-4 text-[#00FFFF]" />
                    <span className="text-xs tracking-wider text-gray-500 uppercase">Height</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <input 
                      type="number" 
                      value={height} 
                      onChange={(e) => setBodyData(Number(e.target.value), weight)}
                      className="bg-transparent outline-none text-3xl font-bold text-white w-full appearance-none"
                      min="140"
                      max="220"
                    />
                    <span className="text-sm text-gray-500">cm</span>
                  </div>
                </div>
              </div>
              
              {/* Weight Input */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative bg-[#0a0a0a] border border-[#222] p-5 transition-all duration-300 group-hover:border-[#00FFFF]/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Weight className="w-4 h-4 text-[#00FFFF]" />
                    <span className="text-xs tracking-wider text-gray-500 uppercase">Weight</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <input 
                      type="number" 
                      value={weight} 
                      onChange={(e) => setBodyData(height, Number(e.target.value))}
                      className="bg-transparent outline-none text-3xl font-bold text-white w-full appearance-none"
                      min="40"
                      max="150"
                    />
                    <span className="text-sm text-gray-500">kg</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Recommendation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={recommendedSize}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden"
          >
            {/* Glow Effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00FFFF]/20 rounded-full blur-3xl" />
            
            <div className="relative border border-[#00FFFF]/30 bg-gradient-to-br from-[#00FFFF]/5 via-transparent to-transparent p-6">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00FFFF] to-transparent" />
              
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00FFFF] rounded-full animate-pulse" />
                  <h3 className="text-xs tracking-widest uppercase text-[#00FFFF] font-bold">
                    AI Recommendation
                  </h3>
                </div>
                <div className="px-2 py-1 bg-[#00FFFF]/10 rounded text-[10px] text-[#00FFFF] tracking-wider">
                  LIVE
                </div>
              </div>
              
              <p className="text-2xl font-black tracking-tight text-white">
                {recommendedSize}
              </p>
            </div>
          </motion.div>

          {/* Size Guide Link */}
          <button 
            onClick={() => toggleSizeGuide(true)} 
            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-[#00FFFF] transition-colors duration-300"
          >
            <span className="tracking-wider">📏</span>
            <span className="tracking-wider uppercase">View Size Guide</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </button>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#00FFFF]/30 to-transparent" />

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
            className="pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <CyberButton>Add To Cart • 730 EGP</CyberButton>
          </motion.div>
        </div>
      </section>
      
      {/* Modal */}
      <SizeGuideModal />
    </main>
  );
}
