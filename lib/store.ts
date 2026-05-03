import { create } from 'zustand';

interface SwayState {
  topTexture: string | null;
  bottomTexture: string | null;
  faceTexture: string | null;
  topFit: string;
  bottomFit: string;
  // أضف الدوال لتحديث كل قطعة بشكل منفصل
  setTop: (url: string, fit: string) => void;
  setBottom: (url: string, fit: string) => void;
  setFace: (url: string) => void;
}

export const useSwayStore = create<SwayState>((set) => ({
  topTexture: null,
  bottomTexture: null,
  faceTexture: null,
  topFit: 'oversized',
  bottomFit: 'pants',
  setTop: (url, fit) => set({ topTexture: url, topFit: fit }),
  setBottom: (url, fit) => set({ bottomTexture: url, bottomFit: fit }),
  setFace: (url) => set({ faceTexture: url }),
}));
