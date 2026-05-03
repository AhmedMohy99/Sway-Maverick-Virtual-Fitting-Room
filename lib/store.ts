import { create } from 'zustand';

interface SwayState {
  // بيانات الجسم والقياسات (للتوافق مع page.tsx)
  height: number;
  weight: number;
  fitType: string; // رجعناه عشان الـ Type Error يختفي
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
  height: 170,
  weight: 70,
  fitType: 'oversized', // القيمة الافتراضية
  recommendedSize: 'Calculating...',
  isSizeGuideOpen: false,
  topTexture: null,
  bottomTexture: null,
  faceTexture: null,
  topFit: 'oversized',
  bottomFit: 'pants',

  setBodyData: (h, w) => set({ height: h, weight: w }),
  updateRecommendation: (size) => set({ recommendedSize: size }),
  toggleSizeGuide: (isOpen) => set({ isSizeGuideOpen: isOpen }),
  setTop: (url, fit) => set({ topTexture: url, topFit: fit, fitType: fit }), // بنحدث الاثنين سوا
  setBottom: (url, fit) => set({ bottomTexture: url, bottomFit: fit }),
  setFace: (url) => set({ faceTexture: url }),
}));
