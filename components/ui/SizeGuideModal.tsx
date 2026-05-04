'use client';
import { useSwayStore } from '../../lib/store';
import { motion, AnimatePresence } from 'framer-motion';

export default function SizeGuideModal() {
  const { isSizeGuideOpen, toggleSizeGuide, fitType } = useSwayStore();

  const isRegular = fitType === 'regular';

  return (
    <AnimatePresence>
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#0a0a0a] border border-[#222] rounded-xl max-w-2xl w-full relative shadow-[0_0_40px_rgba(0,255,255,0.08)] p-6 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => toggleSizeGuide(false)}
              className="absolute top-5 right-5 text-gray-500 hover:text-[#00FFFF] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Title */}
            <h2 className="text-[#00FFFF] text-xl md:text-2xl font-bold text-center mb-8 tracking-wide">
              Size Guide - {isRegular ? 'Regular Fit' : 'Over Size Fit'}
            </h2>

            {/* Size Table */}
            <div className="overflow-x-auto rounded-md border border-[#222]">
              <table className="w-full border-collapse text-sm md:text-base">
                <thead>
                  <tr className="bg-[#050505]">
                    <th className="border border-[#222] p-4 text-[#00FFFF] font-bold text-center uppercase">SIZE</th>
                    <th className="border border-[#222] p-4 text-[#00FFFF] font-bold text-center uppercase">WIDTH (عرض) cm</th>
                    <th className="border border-[#222] p-4 text-[#00FFFF] font-bold text-center uppercase">LENGTH (طول) cm</th>
                  </tr>
                </thead>
                <tbody className="bg-[#0a0a0a]">
                  {!isRegular ? (
                    // Oversize Fit Data
                    <>
                      <tr>
                        <td className="border border-[#222] p-4 text-center text-white font-medium">1 (S)</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">54</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">72.5</td>
                      </tr>
                      <tr>
                        <td className="border border-[#222] p-4 text-center text-white font-medium">2 (M)</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">57</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">73.5</td>
                      </tr>
                      <tr>
                        <td className="border border-[#222] p-4 text-center text-white font-medium">3 (L)</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">60</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">74.5</td>
                      </tr>
                      <tr>
                        <td className="border border-[#222] p-4 text-center text-white font-medium">4 (XL)</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">63</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">76.5</td>
                      </tr>
                    </>
                  ) : (
                    // Regular Fit Data
                    <>
                      <tr>
                        <td className="border border-[#222] p-4 text-center text-white font-medium">1 (S)</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">52</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">68</td>
                      </tr>
                      <tr>
                        <td className="border border-[#222] p-4 text-center text-white font-medium">2 (M)</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">54</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">70</td>
                      </tr>
                      <tr>
                        <td className="border border-[#222] p-4 text-center text-white font-medium">3 (L)</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">56</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">72</td>
                      </tr>
                      <tr>
                        <td className="border border-[#222] p-4 text-center text-white font-medium">4 (XL)</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">58</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">74</td>
                      </tr>
                      <tr>
                        <td className="border border-[#222] p-4 text-center text-white font-medium">5 (XXL)</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">60</td>
                        <td className="border border-[#222] p-4 text-center text-gray-300">76</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            {/* Tip Box */}
            <div className="mt-8 p-4 bg-[#111111] border-l-4 border-[#00FFFF] rounded-r-md">
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                <span className="text-[#00FFFF] font-bold">💡 Tip:</span> Our size recommendation is based on your height and weight. For oversize fits, we recommend sizing down if you prefer a less baggy look. For regular fits, choose your recommended size for the best fit.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
