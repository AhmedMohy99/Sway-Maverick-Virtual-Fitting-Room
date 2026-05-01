export const SIZE_DATA = {
  oversized: {
    "S": { width: 54, length: 72.5, label: "1(S)" },
    "M": { width: 57, length: 73.5, label: "2(M)" },
    "L": { width: 60, length: 74.5, label: "3(L)" },
    "XL": { width: 63, length: 76.5, label: "4(XL)" }
  },
  regular: {
    "S": { width: 52, length: 68, label: "1(S)" },
    "M": { width: 54, length: 70, label: "2(M)" },
    "L": { width: 56, length: 72, label: "3(L)" },
    "XL": { width: 58, length: 74, label: "4(XL)" },
    "XXL": { width: 60, length: 76, label: "5(XXL)" }
  }
};

export function getRecommendedSize(height, weight, fitType = 'oversized') {
  // منطق بسيط للحساب بناءً على الطول والوزن
  if (height < 165 && weight < 60) return "S";
  if (height < 175 && weight < 75) return "M";
  if (height < 185 && weight < 85) return "L";
  return "XL";
}
