export function getSmartRecommendation(height: number, weight: number, fitType: string): string {
  if (fitType === 'oversized') {
    if (height < 168 && weight < 65) return "1 (S) - Perfect Boxy Drape";
    if (height < 178 && weight < 78) return "2 (M) - Intended Baggy Fit";
    if (height < 188 && weight < 88) return "3 (L) - True Oversized Silhouette";
    return "4 (XL) - Maximum Streetwear Drop";
  } else {
    // Regular Fit Logic
    if (height < 165 && weight < 60) return "1 (S) - Clean Tailored Fit";
    if (height < 175 && weight < 72) return "2 (M) - Natural Shoulder Alignment";
    if (height < 185 && weight < 85) return "3 (L) - Standard Street Fit";
    if (height < 192 && weight < 95) return "4 (XL) - Extended Torso Fit";
    return "5 (XXL) - Relaxed Regular Fit";
  }
}
