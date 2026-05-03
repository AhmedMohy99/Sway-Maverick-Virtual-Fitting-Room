import { create } from 'zustand';

interface SwayState {
  // بيانات الجسم والقياسات
  height: number;
  weight: number;
  fitType: string;
  recommendedSize: string;
  isSizeGuideOpen: boolean;
  
  // خاصية الدوران التلقائي
  isAutoRotate: boolean;

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
  setAutoRotate: (active: boolean) => void; 
  toggleAutoRotate: () => void; // الدالة اللي كان بيدور عليها
  setTop: (url: string, fit: string) => void;
  setBottom: (url: string, fit: string) => void;
  setFace: (url: string) => void;
}

export const useSwayStore = create<SwayState>((set) => ({
  height: 170,
  weight: 70,
  fitType: 'oversized',
  recommendedSize: 'Calculating...',
  isSizeGuideOpen: false,
  isAutoRotate: true,

  topTexture: null,
  bottomTexture: null,
  faceTexture: null,
  topFit: 'oversized',
  bottomFit: 'pants',

  setBodyData: (h, w) => set({ height: h, weight: w }),
  updateRecommendation: (size) => set({ recommendedSize: size }),
  toggleSizeGuide: (isOpen) => set({ isSizeGuideOpen: isOpen }),
  setAutoRotate: (active) => set({ isAutoRotate: active }),
  toggleAutoRotate: () => set((state) => ({ isAutoRotate: !state.isAutoRotate })), // التنفيذ بتاعها
  setTop: (url, fit) => set({ topTexture: url, topFit: fit, fitType: fit }),
  setBottom: (url, fit) => set({ bottomTexture: url, bottomFit: fit }),
  setFace: (url) => set({ faceTexture: url }),
}));
