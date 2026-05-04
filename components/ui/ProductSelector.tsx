'use client';
import { useState } from 'react';
import { useSwayStore, type Product } from '../../lib/store';
import { motion } from 'framer-motion';

interface ProductSelectorProps {
  products: Product[];
}

export default function ProductSelector({ products }: ProductSelectorProps) {
  const { selectedCategory, setSelectedCategory, selectTop, selectBottom, currentOutfit } = useSwayStore();
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('T-Shirts');

  // Filter products by category
  const topProducts = products.filter(p => p.group === 'tops');
  const bottomProducts = products.filter(p => p.group === 'bottoms');
  
  // Filter by subcategory
  const displayProducts = selectedCategory === 'tops'
    ? topProducts.filter(p => p.category === selectedSubCategory)
    : bottomProducts;

  const handleProductSelect = (product: Product) => {
    const outfitItem = {
      id: product.id,
      name: product.name,
      type: product.type,
      image: product.colors[0].image, // Default to first color
      color: product.colors[0].name,
      size: 'M' as const, // Will be overridden by store
    };

    if (product.group === 'tops') {
      selectTop(outfitItem);
    } else {
      selectBottom(outfitItem);
    }
  };

  const isProductSelected = (productId: string) => {
    if (selectedCategory === 'tops') {
      return currentOutfit.top?.id === productId;
    } else {
      return currentOutfit.bottom?.id === productId;
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setSelectedCategory('tops');
            setSelectedSubCategory('T-Shirts');
          }}
          className={`
            flex-1 py-3 px-4 font-bold tracking-wider uppercase text-sm
            transition-all duration-300
            ${selectedCategory === 'tops'
              ? 'bg-[#00FFFF] text-black'
              : 'bg-[#0a0a0a] border border-[#333] text-gray-400 hover:border-[#00FFFF]/50'
            }
          `}
        >
          Tops
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setSelectedCategory('bottoms');
          }}
          className={`
            flex-1 py-3 px-4 font-bold tracking-wider uppercase text-sm
            transition-all duration-300
            ${selectedCategory === 'bottoms'
              ? 'bg-[#00FFFF] text-black'
              : 'bg-[#0a0a0a] border border-[#333] text-gray-400 hover:border-[#00FFFF]/50'
            }
          `}
        >
          Bottoms
        </motion.button>
      </div>

      {/* Subcategory Tabs (Only for Tops) */}
      {selectedCategory === 'tops' && (
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedSubCategory('T-Shirts')}
            className={`
              flex-1 py-2 px-3 text-xs font-bold tracking-wider uppercase
              transition-all duration-300
              ${selectedSubCategory === 'T-Shirts'
                ? 'border-b-2 border-[#00FFFF] text-[#00FFFF]'
                : 'text-gray-500 hover:text-gray-300'
              }
            `}
          >
            T-Shirts
          </button>
          
          <button
            onClick={() => setSelectedSubCategory('Hoodies')}
            className={`
              flex-1 py-2 px-3 text-xs font-bold tracking-wider uppercase
              transition-all duration-300
              ${selectedSubCategory === 'Hoodies'
                ? 'border-b-2 border-[#00FFFF] text-[#00FFFF]'
                : 'text-gray-500 hover:text-gray-300'
              }
            `}
          >
            Hoodies
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
        {displayProducts.map((product) => (
          <motion.button
            key={product.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleProductSelect(product)}
            className={`
              relative group overflow-hidden
              transition-all duration-300
              ${isProductSelected(product.id)
                ? 'border-2 border-[#00FFFF] shadow-lg shadow-[#00FFFF]/20'
                : 'border-2 border-[#222] hover:border-[#00FFFF]/50'
              }
            `}
          >
            {/* Product Image */}
            <div className="aspect-square bg-[#0a0a0a] p-4 relative">
              <img
                src={product.baseImage}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              
              {/* Selected Indicator */}
              {isProductSelected(product.id) && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-[#00FFFF] rounded-full flex items-center justify-center">
                  <span className="text-black text-xs">✓</span>
                </div>
              )}
              
              {/* New Badge */}
              {product.isNew && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-[#00FFFF] text-black text-[10px] font-bold tracking-wider">
                  NEW
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-3 bg-[#0a0a0a] space-y-1">
              <h4 className="text-xs font-bold text-white truncate">
                {product.name}
              </h4>
              <p className="text-xs text-[#00FFFF] font-bold">
                {product.basePrice} {product.currency}
              </p>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00FFFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
