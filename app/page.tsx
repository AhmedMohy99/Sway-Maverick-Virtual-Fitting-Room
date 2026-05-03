'use client';
import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import FaceUpload from '../components/ui/FaceUpload';
import CyberButton from '../components/ui/CyberButton';
import SizeGuideModal from '../components/ui/SizeGuideModal';
import AutoRotateToggle from '../components/ui/AutoRotateToggle';
import ProductSelector from '../components/ui/ProductSelector';
import ColorSelector from '../components/ui/ColorSelector';
import { useSwayStore } from '../lib/store';
import { PRODUCT_DATA } from '../lib/products';
import { getSmartRecommendation } from '../lib/ai-fitting';
import { motion } from 'framer-motion';
import { Ruler, Weight } from 'lucide-react';

const FittingRoom = dynamic(() => import('../components/3d/FittingRoom'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#050505] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-2 border-[#00FFFF] border-t-transparent rounded-full animate-spin" />
        <span className="text-[#00FFFF] font-mono tracking-widest text-xs">
          LOADING SWAY ENGINE...
        </span>
      </div>
    </div>
  ),
});

export default function ProductPage() {
  const { 
    height, 
    weight, 
    fitType, 
    recommendedSize, 
    setBodyData, 
    updateRecommendation, 
    toggleSizeGuide, 
    currentOutfit 
  } = useSwayStore();

  useEffect(() => {
    const rec = getSmartRecommendation(height, weight, fitType);
    updateRecommendation(rec);
  }, [height, weight, fitType, updateRecommendation]);

  // Calculate total price from current outfit
  const totalPrice = useMemo(() => {
    let total = 0;
    
    if (currentOutfit.top) {
      const topProduct = PRODUCT_DATA.products.find(p => p.id === currentOutfit.top?.id);
      total += topProduct?.basePrice || 0;
    }
    
    if (currentOutfit.bottom) {
      const bottomProduct = PRODUCT_DATA.products.find(p => p.id === currentOutfit.bottom?.id);
      total += bottomProduct?.basePrice || 0;
    }
    
    return total || 730; // Default to base price if nothing selected
  }, [currentOutfit]);

  return (
    <main className="w-screen h-screen bg-black text-white overflow-hidden flex flex-col lg:flex-row">
      
      {/* LEFT: 3D Viewer */}
      <div className="relative w-full lg:w-3/5 h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-[#1a1a1a]">
        <FittingRoom />
        <div className="absolute top-6 left-6 z-20">
          <AutoRotateToggle />
        </div>
      </div>

      {/* RIGHT: Product Controls */}
      <div className="relative w-full lg:w-2/5 h-1/2 lg:h-full bg-black overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="w-full h-full p-6 lg:p-8 space-y-6">
          
          {/* Product Selection & Color */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-6"
          >
            <ProductSelector products={PRODUCT_DATA.products} />
            <div className="h-px bg-gradient-to-r from-transparent via-[#00FFFF]/30 to-transparent" />
            <ColorSelector products={PRODUCT_DATA.products} />
          </motion.div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#00FFFF]/30 to-transparent" />

          {/* Measurements */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.1 }} 
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-[#00FFFF] rounded-full" />
              <h3 className="text-xs font-bold tracking-widest uppercase text-gray-400">
                Your Measurements
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative bg-[#0a0a0a] border border-[#222] p-4 transition-all duration-300 group-hover:border-[#00FFFF]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="w-3 h-3 text-[#00FFFF]" />
                    <span className="text-[10px] tracking-wider text-gray-500 uppercase">Height</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <input 
                      type="number" 
                      value={height} 
                      onChange={(e) => setBodyData(Number(e.target.value), weight)} 
                      className="bg-transparent outline-none text-2xl font-bold text-white w-full" 
                      min="140" 
                      max="220" 
                    />
                    <span className="text-xs text-gray-500">cm</span>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative bg-[#0a0a0a] border border-[#222] p-4 transition-all duration-300 group-hover:border-[#00FFFF]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Weight className="w-3 h-3 text-[#00FFFF]" />
                    <span className="text-[10px] tracking-wider text-gray-500 uppercase">Weight</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <input 
                      type="number" 
                      value={weight} 
                      onChange={(e) => setBodyData(height, Number(e.target.value))} 
                      className="bg-transparent outline-none text-2xl font-bold text-white w-full" 
                      min="40" 
                      max="150" 
                    />
                    <span className="text-xs text-gray-500">kg</span>
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
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00FFFF]/20 rounded-full blur-3xl" />
            <div className="relative border border-[#00FFFF]/30 bg-gradient-to-br from-[#00FFFF]/5 via-transparent to-transparent p-5">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00FFFF] to-transparent" />
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00FFFF] rounded-full animate-pulse" />
                  <h3 className="text-[10px] tracking-widest uppercase text-[#00FFFF] font-bold">
                    AI Recommendation
                  </h3>
                </div>
                <div className="px-2 py-1 bg-[#00FFFF]/10 rounded text-[9px] text-[#00FFFF] tracking-wider">
                  LIVE
                </div>
              </div>
              <p className="text-xl font-black tracking-tight text-white">
                {recommendedSize}
              </p>
            </div>
          </motion.div>

          {/* Size Guide Button */}
          <button 
            onClick={() => toggleSizeGuide(true)} 
            className="group flex items-center gap-2 text-xs text-gray-400 hover:text-[#00FFFF] transition-colors duration-300"
          >
            <span className="tracking-wider">📏</span>
            <span className="tracking-wider uppercase">View Size Guide</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </button>

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
            className="pt-2" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4 }}
          >
            <CyberButton>
              Add To Cart • {totalPrice} EGP
            </CyberButton>
          </motion.div>
        </div>
      </div>
      
      <SizeGuideModal />
    </main>
  );
}
