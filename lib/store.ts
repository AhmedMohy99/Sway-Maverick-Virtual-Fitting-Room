import { create } from 'zustand';

interface SwayState {
  height: number;
  weight: number;
  fitType: 'oversized' | 'regular' | 'sweatpants';
  activeTextureUrl: string;
  faceTextureUrl: string | null;
  recommendedSize: string;
  isSizeGuideOpen: boolean;
  setBodyData: (h: number, w: number) => void;
  setProduct: (textureUrl: string, fit: 'oversized' | 'regular' | 'sweatpants') => void;
  setFaceTexture: (url: string) => void;
  updateRecommendation: (size: string) => void;
  toggleSizeGuide: (isOpen: boolean) => void;
}

export const useSwayStore = create<SwayState>((set) => ({
  height: 162,
  weight: 55,
  fitType: 'oversized',
  activeTextureUrl: '', // هيتم تبديله برابط الصورة الحقيقية للتيشرت
  faceTextureUrl: null,
  recommendedSize: 'SIZE S',
  isSizeGuideOpen: false,
  setBodyData: (h, w) => set({ height: h, weight: w }),
  setProduct: (url, fit) => set({ activeTextureUrl: url, fitType: fit }),
  setFaceTexture: (url) => set({ faceTextureUrl: url }),
  updateRecommendation: (size) => set({ recommendedSize: size }),
  toggleSizeGuide: (isOpen) => set({ isSizeGuideOpen: isOpen }),
}));
