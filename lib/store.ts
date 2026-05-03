import { create } from 'zustand';

// Product types
export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  type: 'tshirt' | 'hoodie' | 'sweatpants';
  group: 'tops' | 'bottoms';
  subCategory: string;
  baseImage: string;
  colors: ProductColor[];
  availableSizes: ('S' | 'M' | 'L' | 'XL' | '2XL')[];
  sizeSpecs: Record<string, { width: number; length: number }>;
  basePrice: number;
  currency: string;
  stock: Record<string, number>;
  isNew: boolean;
  isFeatured: boolean;
  rating: number;
  reviews: number;
}

export interface OutfitItem {
  id: string;
  name: string;
  type: 'tshirt' | 'hoodie' | 'sweatpants';
  image: string;
  color: string;
  size: 'S' | 'M' | 'L' | 'XL' | '2XL';
}

export interface CurrentOutfit {
  top: OutfitItem | null;
  bottom: OutfitItem | null;
}

interface SwayState {
  // Body measurements
  height: number;
  weight: number;
  
  // Selected size (applies to all items)
  selectedSize: 'S' | 'M' | 'L' | 'XL' | '2XL';
  
  // Current outfit (Mix & Match)
  currentOutfit: CurrentOutfit;
  
  // Face customization
  faceTextureUrl: string | null;
  
  // AI recommendations
  recommendedSize: string;
  
  // UI state
  isSizeGuideOpen: boolean;
  isAutoRotate: boolean;
  selectedCategory: 'tops' | 'bottoms';
  
  // Actions
  setBodyData: (h: number, w: number) => void;
  selectSize: (size: 'S' | 'M' | 'L' | 'XL' | '2XL') => void;
  selectTop: (product: OutfitItem) => void;
  selectBottom: (product: OutfitItem) => void;
  changeTopColor: (colorName: string, newImage: string) => void;
  changeBottomColor: (colorName: string, newImage: string) => void;
  setFaceTexture: (url: string) => void;
  updateRecommendation: (size: string) => void;
  toggleSizeGuide: (isOpen: boolean) => void;
  toggleAutoRotate: () => void;
  setSelectedCategory: (category: 'tops' | 'bottoms') => void;
  resetOutfit: () => void;
}

export const useSwayStore = create<SwayState>((set) => ({
  // Initial state
  height: 162,
  weight: 55,
  selectedSize: 'M',
  currentOutfit: {
    top: null,
    bottom: null,
  },
  faceTextureUrl: null,
  recommendedSize: 'SIZE M',
  isSizeGuideOpen: false,
  isAutoRotate: false,
  selectedCategory: 'tops',
  
  // Actions
  setBodyData: (h, w) => set({ height: h, weight: w }),
  
  selectSize: (size) => set((state) => ({
    selectedSize: size,
    currentOutfit: {
      top: state.currentOutfit.top ? { ...state.currentOutfit.top, size } : null,
      bottom: state.currentOutfit.bottom ? { ...state.currentOutfit.bottom, size } : null,
    }
  })),
  
  selectTop: (product) => set((state) => ({
    currentOutfit: {
      ...state.currentOutfit,
      top: { ...product, size: state.selectedSize }
    }
  })),
  
  selectBottom: (product) => set((state) => ({
    currentOutfit: {
      ...state.currentOutfit,
      bottom: { ...product, size: state.selectedSize }
    }
  })),
  
  changeTopColor: (colorName, newImage) => set((state) => ({
    currentOutfit: {
      ...state.currentOutfit,
      top: state.currentOutfit.top 
        ? { ...state.currentOutfit.top, color: colorName, image: newImage }
        : null
    }
  })),
  
  changeBottomColor: (colorName, newImage) => set((state) => ({
    currentOutfit: {
      ...state.currentOutfit,
      bottom: state.currentOutfit.bottom
        ? { ...state.currentOutfit.bottom, color: colorName, image: newImage }
        : null
    }
  })),
  
  setFaceTexture: (url) => set({ faceTextureUrl: url }),
  updateRecommendation: (size) => set({ recommendedSize: size }),
  toggleSizeGuide: (isOpen) => set({ isSizeGuideOpen: isOpen }),
  toggleAutoRotate: () => set((state) => ({ isAutoRotate: !state.isAutoRotate })),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  resetOutfit: () => set({
    currentOutfit: { top: null, bottom: null }
  }),
}));
