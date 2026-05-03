'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSwayStore } from '../lib/store';
import { PRODUCT_DATA } from '../lib/products';
import { getSmartRecommendation } from '../lib/ai-fitting';

// استدعاء محرك الـ 3D
const FittingRoom = dynamic(() => import('../components/3d/FittingRoom'), { ssr: false });

export default function ProductPage() {
  const { 
    height, weight, fitType, recommendedSize, 
    setBodyData, updateRecommendation, toggleSizeGuide, 
    currentOutfit, selectTop, selectBottom 
  } = useSwayStore();

  // تحديث الذكاء الاصطناعي للمقاسات
  useEffect(() => {
    const rec = getSmartRecommendation(height, weight, fitType);
    updateRecommendation(rec);
  }, [height, weight, fitType, updateRecommendation]);

  // دالة للتعامل مع تغيير المنتج من القائمة المنسدلة
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const product = PRODUCT_DATA.products.find(p => p.id === selectedId);
    
    if (product) {
      const outfitItem = {
        id: product.id,
        name: product.name,
        type: product.type,
        image: product.colors[0].image, // بياخد أول لون افتراضياً
        color: product.colors[0].name,
        size: 'M'
      };
      
      if (product.group === 'tops') selectTop(outfitItem);
      else selectBottom(outfitItem);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      
      {/* Top Banner */}
      <div className="w-full bg-[#00e5ff] text-black text-xs md:text-sm font-bold py-2 px-4 flex justify-between items-center uppercase tracking-wider">
        <span>Designed for those who CREATE THEIR OWN RULE!</span>
        <span className="hidden md:inline">Crafted For The Maverick</span>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-12 py-5 border-b border-[#1a1a1a] bg-[#0a0a0a]">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black tracking-widest text-[#00e5ff] italic">SWAY</h1>
          <p className="text-[10px] tracking-widest text-gray-400 uppercase">Crafted for the Maverick</p>
        </div>
        <nav className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase text-gray-300">
          <a href="#" className="hover:text-[#00e5ff] transition-colors text-[#00e5ff]">Home</a>
          <a href="#" className="hover:text-[#00e5ff] transition-colors">Shop</a>
          <a href="#" className="hover:text-[#00e5ff] transition-colors">How It Started</a>
          <a href="#" className="hover:text-[#00e5ff] transition-colors">Our Story</a>
          <a href="#" className="hover:text-[#00e5ff] transition-colors">Size Guide</a>
        </nav>
        <div className="flex gap-4 text-gray-300">
          <span className="cursor-pointer hover:text-[#00e5ff]">🔍</span>
          <span className="cursor-pointer hover:text-[#00e5ff]">🛒 <span className="text-[#00e5ff]">0</span></span>
          <span className="cursor-pointer hover:text-[#00e5ff]">En ⌄</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8 lg:gap-12 mt-4">
        
        {/* Left: 3D Model Container */}
        <div className="w-full lg:w-[55%] h-[50vh] lg:h-[700px] bg-[#0f0f0f] rounded-xl overflow-hidden border border-[#222] shadow-2xl relative">
          <FittingRoom />
        </div>

        {/* Right: Product Details & Controls */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          
          {/* Title & Price */}
          <div className="border-b border-[#222] pb-4">
            <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
              {currentOutfit.top?.name || 'The Maverick Phoenix'} <br/>
              <span className="text-gray-400 text-2xl">({currentOutfit.top?.color || 'White'})</span>
            </h1>
            <p className="text-[#00e5ff] text-2xl font-bold">EGP 730</p>
          </div>

          {/* Controls Form */}
          <div className="flex flex-col gap-5">
            
            {/* Gender Select */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gender (المجسم):</label>
              <select className="w-full bg-[#111] border border-[#333] rounded p-3 text-white focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] outline-none transition-all cursor-pointer">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Height & Weight Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Height (cm):</label>
                <input 
                  type="number" 
                  value={height}
                  onChange={(e) => setBodyData(Number(e.target.value), weight)}
                  className="w-full bg-[#111] border border-[#333] rounded p-3 text-white focus:border-[#00e5ff] outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Weight (kg):</label>
                <input 
                  type="number" 
                  value={weight}
                  onChange={(e) => setBodyData(height, Number(e.target.value))}
                  className="w-full bg-[#111] border border-[#333] rounded p-3 text-white focus:border-[#00e5ff] outline-none transition-all"
                />
              </div>
            </div>

            {/* Product Select */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Product:</label>
              <select 
                onChange={handleProductChange}
                className="w-full bg-[#111] border border-[#333] rounded p-3 text-white focus:border-[#00e5ff] outline-none transition-all cursor-pointer"
              >
                <optgroup label="Tops">
                  {PRODUCT_DATA.products.filter(p => p.group === 'tops').map(product => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Bottoms">
                  {PRODUCT_DATA.products.filter(p => p.group === 'bottoms').map(product => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Fit Type (Readonly like screenshot) */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Fit Type:</label>
              <input 
                type="text" 
                value="Over Size Fit" 
                readOnly 
                className="w-full bg-[#0a0a0a] border border-[#00e5ff]/50 rounded p-3 text-[#00e5ff] font-bold outline-none cursor-default"
              />
            </div>

            {/* Size Select (AI Driven) */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Size:</label>
              <select className="w-full bg-[#111] border border-[#333] rounded p-3 text-white focus:border-[#00e5ff] outline-none transition-all cursor-pointer appearance-none">
                <option>{recommendedSize} ✓ Recommended</option>
                <option>1 (S)</option>
                <option>2 (M)</option>
                <option>3 (L)</option>
                <option>4 (XL)</option>
                <option>5 (XXL)</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-2">
              <button 
                onClick={() => toggleSizeGuide(true)}
                className="w-full py-4 bg-transparent border-2 border-[#333] hover:border-[#00e5ff] text-white font-bold tracking-widest uppercase transition-all flex justify-center items-center gap-2 rounded"
              >
                <span>📏</span> VIEW SIZE GUIDE
              </button>
              
              <button className="w-full py-4 bg-[#00e5ff] hover:bg-white text-black font-black tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] rounded">
                ADD TO CART
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
