'use client';
import { useSwayStore } from '@/lib/store';

export default function SizeGuideModal() {
  const { isSizeGuideOpen, toggleSizeGuide } = useSwayStore();
  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0a0a0a] border border-[#00FFFF] p-8 max-w-lg w-full relative">
        <button onClick={() => toggleSizeGuide(false)} className="absolute top-4 right-4 text-[#00FFFF] hover:text-white text-xl">✕</button>
        <h2 className="text-2xl font-bold text-white tracking-widest mb-6">SIZE GUIDE</h2>
        <div className="space-y-6 text-sm text-gray-300 font-mono">
          <div>
            <h3 className="text-[#00FFFF] mb-2 font-bold">OVERSIZED FIT COLLECTION</h3>
            <table className="w-full text-left border-collapse">
              <thead><tr className="border-b border-[#333]"><th className="py-2">SIZE</th><th>WIDTH</th><th>LENGTH</th></tr></thead>
              <tbody>
                <tr className="border-b border-[#222]"><td className="py-2">1 (S)</td><td>54 cm</td><td>72.5 cm</td></tr>
                <tr className="border-b border-[#222]"><td className="py-2">2 (M)</td><td>57 cm</td><td>73.5 cm</td></tr>
                <tr className="border-b border-[#222]"><td className="py-2">3 (L)</td><td>60 cm</td><td>74.5 cm</td></tr>
                <tr><td className="py-2">4 (XL)</td><td>63 cm</td><td>76.5 cm</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
