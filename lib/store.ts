// lib/store.ts
import { create } from 'zustand';

interface SwayState {
  height: number;
  weight: number;
  fitType: 'oversized' | 'regular';
  activeTextureUrl: string;
  faceTextureUrl: string | null;
  recommendedSize: string;
  setBodyData: (h: number, w: number) => void;
  setProduct: (textureUrl: string, fit: 'oversized' | 'regular') => void;
  setFaceTexture: (url: string) => void;
  updateRecommendation: (size: string) => void;
}

export const useSwayStore = create<SwayState>((set) => ({
  height: 175,
  weight: 70,
  fitType: 'oversized',
  activeTextureUrl: '/textures/maverick_phoenix_white.jpg',
  faceTextureUrl: null,
  recommendedSize: '3 (L)',
  
  setBodyData: (h, w) => set({ height: h, weight: w }),
  setProduct: (textureUrl, fit) => set({ activeTextureUrl: textureUrl, fitType: fit }),
  setFaceTexture: (url) => set({ faceTextureUrl: url }),
  updateRecommendation: (size) => set({ recommendedSize: size }),
}));
