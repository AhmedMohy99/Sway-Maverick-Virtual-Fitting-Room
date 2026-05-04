export function getSmartRecommendation(height: number, weight: number, fitType: string): string {
  // AI Logic for Sway Maverick
  if (height < 165 && weight < 65) return 'Size: S';
  if (height >= 165 && height < 175 && weight < 75) return 'Size: M';
  if (height >= 175 && height < 185 && weight < 85) return 'Size: L';
  if (height >= 185 && weight < 95) return 'Size: XL';
  return 'Size: 2XL';
}
