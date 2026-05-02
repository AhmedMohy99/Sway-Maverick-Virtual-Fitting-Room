import { create } from 'zustand';

interface SwayState {
  // Body measurements
  height: number;
  weight: number;
  
  // Product configuration
  fitType: 'oversized' | 'regular' | 'sweatpants';
  activeTextureUrl: string;
  faceTextureUrl: string | null;
  
  // AI recommendations
  recommendedSize: string;
  
  // UI state
  isSizeGuideOpen: boolean;
  isAutoRotate: boolean;
  
  // Actions
  setBodyData: (h: number, w: number) => void;
  setProduct: (textureUrl: string, fit: 'oversized' | 'regular' | 'sweatpants') => void;
  setFaceTexture: (url: string) => void;
  updateRecommendation: (size: string) => void;
  toggleSizeGuide: (isOpen: boolean) => void;
  toggleAutoRotate: () => void;
}

export const useSwayStore = create<SwayState>((set) => ({
  // Initial state
  height: 162,
  weight: 55,
  fitType: 'oversized',
  activeTextureUrl: '', 
  faceTextureUrl: null,
  recommendedSize: 'SIZE S',
  isSizeGuideOpen: false,
  isAutoRotate: false,
  
  // Actions
  setBodyData: (h, w) => set({ height: h, weight: w }),
  setProduct: (url, fit) => set({ activeTextureUrl: url, fitType: fit }),
  setFaceTexture: (url) => set({ faceTextureUrl: url }),
  updateRecommendation: (size) => set({ recommendedSize: size }),
  toggleSizeGuide: (isOpen) => set({ isSizeGuideOpen: isOpen }),
  toggleAutoRotate: () => set((state) => ({ isAutoRotate: !state.isAutoRotate })),
}));
