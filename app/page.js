// app/page.tsx
'use client';
import { useEffect } from 'react';
import FittingRoom from '@/components/3d/FittingRoom';
import { useSwayStore } from '@/lib/store';
import { getSmartRecommendation } from '@/lib/ai-fitting';
import { motion } from 'framer-motion';

export default function ProductPage() {
  const { height, weight, fitType, recommendedSize, setBodyData, updateRecommendation } = useSwayStore();

  // Re-run AI Recommendation when body data changes
  useEffect(() => {
    const rec = getSmartRecommendation(height, weight, fitType);
    updateRecommendation(rec);
  }, [height, weight, fitType, updateRecommendation]);

  return (
    <main className="flex w-full h-screen bg-black text-white font-mono overflow-hidden">
      
      {/* LEFT: 3D Immersive Viewer */}
      <section className="w-[60%] h-full relative border-r border-[#111]">
        <FittingRoom />
      </section>

      {/* RIGHT: Product Controls */}
      <section className="w-[40%] h-full overflow-y-auto p-12 flex flex-col gap-8 custom-scrollbar">
        
        <div className="border-b border-[#222] pb-6">
          <h1 className="text-3xl font-black tracking-widest uppercase">The Maverick Phoenix</h1>
          <p className="text-[#00FFFF] mt-2 tracking-widest text-sm">730 EGP</p>
        </div>

        {/* Digital Twin Inputs */}
        <div className="space-y-4">
          <h3 className="text-[11px] text-gray-400 tracking-[0.2em]">YOUR MEASUREMENTS</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0a0a0a] border border-[#222] p-3 flex justify-between items-center focus-within:border-[#00FFFF] transition-colors">
              <span className="text-xs text-gray-500">HEIGHT (CM)</span>
              <input 
                type="number" 
                value={height} 
                onChange={(e) => setBodyData(Number(e.target.value), weight)}
                className="bg-transparent text-right outline-none w-16 text-[#00FFFF]"
              />
            </div>
            <div className="bg-[#0a0a0a] border border-[#222] p-3 flex justify-between items-center focus-within:border-[#00FFFF] transition-colors">
              <span className="text-xs text-gray-500">WEIGHT (KG)</span>
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setBodyData(height, Number(e.target.value))}
                className="bg-transparent text-right outline-none w-16 text-[#00FFFF]"
              />
            </div>
          </div>
        </div>

        {/* AI Recommendation Output */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={recommendedSize}
          className="border border-[#00FFFF] bg-[#00FFFF]/5 p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#00FFFF]"></div>
          <h3 className="text-[10px] text-[#00FFFF] mb-2 tracking-widest">AI RECOMMENDATION</h3>
          <p className="text-lg font-bold">{recommendedSize}</p>
        </motion.div>

        {/* Face Mapping Trigger */}
        <button className="w-full border border-dashed border-gray-600 hover:border-[#00FFFF] hover:text-[#00FFFF] transition-all p-4 text-xs tracking-[0.2em] uppercase">
          [+] Upload Face Map
        </button>

        {/* Add to Cart */}
        <button className="mt-auto w-full bg-[#00FFFF] text-black font-bold py-5 tracking-[0.2em] hover:bg-white transition-colors uppercase text-sm shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
          Add To Cart // 730 EGP
        </button>

      </section>
    </main>
  );
}
