'use client';
import { useSwayStore, type Product } from '../../lib/store';
import { motion } from 'framer-motion';

interface ColorSelectorProps {
  products: Product[];
}

export default function ColorSelector({ products }: ColorSelectorProps) {
  const { currentOutfit, changeTopColor, changeBottomColor, selectedCategory } = useSwayStore();

  const currentProduct = selectedCategory === 'tops' 
    ? products.find(p => p.id === currentOutfit.top?.id)
    : products.find(p => p.id === currentOutfit.bottom?.id);

  const currentItem = selectedCategory === 'tops' ? currentOutfit.top : currentOutfit.bottom;

  if (!currentProduct || !currentItem) {
    return (
      <div className="p-4 border border-[#222] bg-[#0a0a0a]/50">
        <p className="text-xs text-gray-500 text-center">
          Select a product to change colors
        </p>
      </div>
    );
  }

  const handleColorChange = (colorName: string, colorImage: string) => {
    if (selectedCategory === 'tops') {
      changeTopColor(colorName, colorImage);
    } else {
      changeBottomColor(colorName, colorImage);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-[#00FFFF] rounded-full" />
        <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400">Select Color</h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {currentProduct.colors.map((color) => (
          <motion.button
            key={color.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleColorChange(color.name, color.image)}
            className={`relative group transition-all duration-300 ${
                currentItem.color === color.name
                ? 'ring-2 ring-[#00FFFF] ring-offset-2 ring-offset-black'
                : 'hover:ring-2 hover:ring-[#00FFFF]/50 hover:ring-offset-2 hover:ring-offset-black'
              }`}
          >
            <div className="w-12 h-12 rounded-full border-2 border-[#333]" style={{ backgroundColor: color.hex }} />
            {currentItem.color === color.name && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-[#00FFFF] rounded-full flex items-center justify-center"><span className="text-black text-xs font-bold">✓</span></div>
              </div>
            )}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="text-xs text-gray-400 whitespace-nowrap">{color.name}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
