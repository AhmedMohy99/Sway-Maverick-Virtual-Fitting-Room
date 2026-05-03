import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  type: string;
  group: string;
  category?: string;
  baseImage: string;
  basePrice?: number;
  currency?: string;
  isNew?: boolean;
  colors: { name: string; hex: string; image: string }[];
}

interface OutfitItem {
  id: string;
  name: string;
  type: string;
  image: string;
  color: string;
  size: string;
}

interface SwayState {
  // Body & AI
  height: number;
  weight: number;
  fitType: string;
  recommendedSize: string;
  setBodyData: (h: number, w: number) => void;
  updateRecommendation: (size: string) => void;

  // UI
  isSizeGuideOpen: boolean;
  toggleSizeGuide: (isOpen: boolean) => void;
  isAutoRotate: boolean;
  toggleAutoRotate: () => void;
  selectedCategory: 'tops' | 'bottoms';
  setSelectedCategory: (cat: 'tops' | 'bottoms') => void;

  // Outfits
  currentOutfit: {
    top: OutfitItem | null;
    bottom: OutfitItem | null;
  };
  selectTop: (item: OutfitItem) => void;
  selectBottom: (item: OutfitItem) => void;
  changeTopColor: (colorName: string, image: string) => void;
  changeBottomColor: (colorName: string, image: string) => void;

  // 3D Textures
  topTexture: string | null;
  bottomTexture: string | null;
  faceTexture: string | null;
  faceTextureUrl: string | null;
  setFaceTexture: (url: string) => void;
}

export const useSwayStore = create<SwayState>((set) => ({
  height: 175,
  weight: 70,
  fitType: 'oversize',
  recommendedSize: 'Calculating...',
  setBodyData: (h, w) => set({ height: h, weight: w }),
  updateRecommendation: (size) => set({ recommendedSize: size }),

  isSizeGuideOpen: false,
  toggleSizeGuide: (isOpen) => set({ isSizeGuideOpen: isOpen }),
  isAutoRotate: true,
  toggleAutoRotate: () => set((state) => ({ isAutoRotate: !state.isAutoRotate })),
  selectedCategory: 'tops',
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),

  currentOutfit: {
    top: null,
    bottom: null,
  },
  selectTop: (item) => set((state) => ({
    currentOutfit: { ...state.currentOutfit, top: item },
    topTexture: item.image
  })),
  selectBottom: (item) => set((state) => ({
    currentOutfit: { ...state.currentOutfit, bottom: item },
    bottomTexture: item.image
  })),
  changeTopColor: (colorName, image) => set((state) => {
    if (!state.currentOutfit.top) return state;
    return {
      currentOutfit: {
        ...state.currentOutfit,
        top: { ...state.currentOutfit.top, color: colorName, image: image }
      },
      topTexture: image
    };
  }),
  changeBottomColor: (colorName, image) => set((state) => {
    if (!state.currentOutfit.bottom) return state;
    return {
      currentOutfit: {
        ...state.currentOutfit,
        bottom: { ...state.currentOutfit.bottom, color: colorName, image: image }
      },
      bottomTexture: image
    };
  }),

  topTexture: null,
  bottomTexture: null,
  faceTexture: null,
  faceTextureUrl: null,
  setFaceTexture: (url) => set({ faceTexture: url, faceTextureUrl: url }),
}));
