'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSwayStore } from '../lib/store';
import { PRODUCT_DATA } from '../lib/products';
import { getSmartRecommendation } from '../lib/ai-fitting';

const FittingRoom = dynamic(() => import('../components/3d/FittingRoom'), { ssr: false });

export default function ProductPage() {
  const { 
    height, weight, fitType, recommendedSize, 
    setBodyData, updateRecommendation, toggleSizeGuide, 
    currentOutfit, selectTop, selectBottom 
  } = useSwayStore();

  useEffect(() => {
    const rec = getSmartRecommendation(height, weight, fitType);
    updateRecommendation(rec);
  }, [height, weight, fitType, updateRecommendation]);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>, category: 'tops' | 'bottoms') => {
    const selectedId = e.target.value;
    const product = PRODUCT_DATA.products.find(p => p.id === selectedId);
    
    if (product) {
      const outfitItem = {
        id: product.id,
        name: product.name,
        type: product.type,
        image: product.colors[0].image,
        color: product.colors[0].name,
        size: 'M'
      };
      
      if (category === 'tops') selectTop(outfitItem);
      else selectBottom(outfitItem);
    }
  };

  const topPrice = currentOutfit.top ? PRODUCT_DATA.products.find(p => p.id === currentOutfit.top?.id)?.basePrice || 0 : 0;
  const bottomPrice = currentOutfit.bottom ? PRODUCT_DATA.products.find(p => p.id === currentOutfit.bottom?.id)?.basePrice || 0 : 0;
  const totalPrice = topPrice + bottomPrice || 730;

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans">
      
      {/* Aqua Banner */}
      <div className="w-full bg-[#00FFFF] text-black text-xs md:text-sm font-bold py-2 px-4 flex justify-between items-center uppercase tracking-wider">
        <span>Designed for those who CREATE THEIR OWN RULE!</span>
        <span className="hidden md:inline">Crafted For The Maverick</span>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-12 py-5 border-b border-[#222] bg-[#0a0a0a]">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black tracking-widest text-[#00FFFF] italic">SWAY</h1>
          <p className="text-[10px] tracking-widest text-gray-400 uppercase">Crafted for the Maverick</p>
        </div>
        <nav className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase text-gray-300">
          <a href="#" className="text-[#00FFFF]">Home</a>
          <a href="#" className="hover:text-[#00FFFF] transition-colors">Shop</a>
          <a href="#" className="hover:text-[#00FFFF] transition-colors">How It Started</a>
          <a href="#" className="hover:text-[#00FFFF] transition-colors">Our Story</a>
          <a href="#" className="hover:text-[#00FFFF] transition-colors">Size Guide</a>
        </nav>
      </header>

      <main className="max-w-[1400px] mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8 lg:gap-12 mt-4">
        
        {/* Left: 3D Model Area */}
        <div className="w-full lg:w-[55%] h-[60vh] lg:h-[700px] bg-[#111111] rounded-xl overflow-hidden border border-[#333] shadow-lg relative">
          <FittingRoom />
        </div>

        {/* Right: Product Controls */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          
          <div className="border-b border-[#222] pb-4">
            <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
              {currentOutfit.top?.name || 'The Maverick Phoenix'} <br/>
              <span className="text-gray-400 text-2xl">
                ({currentOutfit.top?.color || 'White Base'})
              </span>
            </h1>
          </div>

          <div className="flex flex-col gap-5">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#00FFFF] uppercase tracking-wider">Height (cm):</label>
                <input 
                  type="number" 
                  value={height}
                  onChange={(e) => setBodyData(Number(e.target.value), weight)}
                  className="w-full bg-[#050505] border border-[#222] rounded p-3 text-white focus:border-[#00FFFF] outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#00FFFF] uppercase tracking-wider">Weight (kg):</label>
                <input 
                  type="number" 
                  value={weight}
                  onChange={(e) => setBodyData(height, Number(e.target.value))}
                  className="w-full bg-[#050505] border border-[#222] rounded p-3 text-white focus:border-[#00FFFF] outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Top:</label>
              <select 
                onChange={(e) => handleProductChange(e, 'tops')}
                className="w-full bg-[#050505] border border-[#222] rounded p-3 text-white focus:border-[#00FFFF] outline-none transition-all cursor-pointer"
              >
                <option value="">-- Choose a Top --</option>
                {PRODUCT_DATA.products.filter(p => p.group === 'tops').map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Bottom:</label>
              <select 
                onChange={(e) => handleProductChange(e, 'bottoms')}
                className="w-full bg-[#050505] border border-[#222] rounded p-3 text-white focus:border-[#00FFFF] outline-none transition-all cursor-pointer"
              >
                <option value="">-- Choose a Bottom --</option>
                {PRODUCT_DATA.products.filter(p => p.group === 'bottoms').map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Fit Type:</label>
              <input 
                type="text" 
                value="Over Size Fit" 
                readOnly 
                className="w-full bg-[#0a0a0a] border border-[#00FFFF]/50 rounded p-3 text-[#00FFFF] font-bold outline-none cursor-default"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Size:</label>
              <select className="w-full bg-[#050505] border border-[#222] rounded p-3 text-[#00FFFF] font-bold outline-none cursor-pointer appearance-none">
                <option>{recommendedSize} ✓ Recommended</option>
                <option>1 (S)</option>
                <option>2 (M)</option>
                <option>3 (L)</option>
                <option>4 (XL)</option>
                <option>5 (XXL)</option>
              </select>
            </div>

            {/* الأزرار الجديدة (Cart, Socials, WhatsApp) */}
            <div className="flex flex-col gap-4 mt-6">
              <button className="w-full py-4 bg-[#00FFFF] text-black font-black tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] rounded">
                ADD TO CART • {totalPrice} EGP
              </button>

              <div className="h-px bg-[#222] my-2 w-full" />

              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="#" 
                  className="w-full py-4 bg-[#050505] border border-[#222] text-gray-500 hover:text-white hover:border-[#444] text-[10px] tracking-widest uppercase flex justify-center items-center transition-all rounded"
                >
                  Instagram
                </a>
                <a 
                  href="#" 
                  className="w-full py-4 bg-[#050505] border border-[#222] text-gray-500 hover:text-white hover:border-[#444] text-[10px] tracking-widest uppercase flex justify-center items-center transition-all rounded"
                >
                  TikTok
                </a>
              </div>

              <a 
                href="https://api.whatsapp.com/send?phone=201033866838" 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-4 bg-[#050f05] border border-[#00ff00]/30 text-[#00ff00] hover:bg-[#0a1a0a] hover:border-[#00ff00]/60 text-xs font-bold tracking-widest uppercase flex justify-center items-center transition-all rounded"
              >
                CONTACT ON WHATSAPP
              </a>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
