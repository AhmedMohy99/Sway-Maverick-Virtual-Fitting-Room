'use client';
import React from 'react';
import { TRY_TEST_PRODUCTS } from '../../lib/products';
import { useSwayStore } from '../../lib/store';

export default function ProductSelector() {
  const { setTop, setBottom } = useSwayStore();

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[10px] text-gray-500 tracking-[0.3em] uppercase mb-2">Select Gear_</h3>
      
      <div className="grid grid-cols-2 gap-3 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {TRY_TEST_PRODUCTS.map((product, index) => (
          <div 
            key={index}
            onClick={() => {
              // لو المنتج تيشرت (oversized/regular) بنحدث الـ Top
              if (product.type === 'oversized' || product.type === 'regular') {
                const texture = product.variants ? product.variants[0].tryOnImage : product.tryOnImage;
                setTop(texture || '', product.type);
              } 
              // لو المنتج بنطلون بنحدث الـ Bottom
              else if (product.type === 'pants') {
                setBottom(product.tryOnImage || '', 'pants');
              }
            }}
            className="group cursor-pointer border border-[#111] hover:border-[#00FFFF] transition-all bg-[#080808] p-2 relative"
          >
            <div className="aspect-[2/3] overflow-hidden mb-2">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
              />
            </div>
            <p className="text-[9px] text-white uppercase tracking-tighter truncate">{product.name}</p>
            <p className="text-[9px] text-[#00FFFF] mt-1 font-bold">{product.price} EGP</p>
            
            {/* Indicator for Type */}
            <div className="absolute top-1 right-1 px-1 bg-black/80 border border-[#222] text-[7px] text-gray-500 uppercase">
              {product.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
