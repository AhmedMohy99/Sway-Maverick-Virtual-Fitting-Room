import { create } from 'zustand';

interface SwayState {
  // بيانات الجسم (التي يطلبها page.tsx)
  height: number;
  weight: number;
  recommendedSize: string;
  isSizeGuideOpen: boolean;
  
  // بيانات الملابس (الـ Mix & Match)
  topTexture: string | null;
  bottomTexture: string | null;
  faceTexture: string | null;
  topFit: string;
  bottomFit: string;

  // الدوال (Actions)
  setBodyData: (h: number, w: number) => void;
  updateRecommendation: (size: string) => void;
  toggleSizeGuide: (isOpen: boolean) => void;
  setTop: (url: string, fit: string) => void;
  setBottom: (url: string, fit: string) => void;
  setFace: (url: string) => void;
}

export const useSwayStore = create<SwayState>((set) => ({
  // القيم الابتدائية
  height: 170,
  weight: 70,
  recommendedSize: 'Calculating...',
  isSizeGuideOpen: false,
  topTexture: null,
  bottomTexture: null,
  faceTexture: null,
  topFit: 'oversized',
  bottomFit: 'pants',

  // تنفيذ الدوال
  setBodyData: (h, w) => set({ height: h, weight: w }),
  updateRecommendation: (size) => set({ recommendedSize: size }),
  toggleSizeGuide: (isOpen) => set({ isSizeGuideOpen: isOpen }),
  setTop: (url, fit) => set({ topTexture: url, topFit: fit }),
  setBottom: (url, fit) => set({ bottomTexture: url, bottomFit: fit }),
  setFace: (url) => set({ faceTexture: url }),
}));
