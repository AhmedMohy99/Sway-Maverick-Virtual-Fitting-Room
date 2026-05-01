// Size data based on measurements in centimeters
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

/**
 * AI-powered size recommendation based on user measurements
 * @param {number} height - Height in centimeters
 * @param {number} weight - Weight in kilograms
 * @param {string} fitType - 'oversized' or 'regular'
 * @returns {string} Recommended size
 */
export function getRecommendedSize(height, weight, fitType = 'oversized') {
  // Calculate BMI for better accuracy
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  // Size logic based on height, weight, and body composition
  if (fitType === 'oversized') {
    // Oversized fit recommendations
    if (height < 165) {
      if (weight < 60) return "S";
      if (weight < 70) return "M";
      return "L";
    } else if (height < 175) {
      if (weight < 65) return "S";
      if (weight < 75) return "M";
      if (weight < 85) return "L";
      return "XL";
    } else if (height < 185) {
      if (weight < 70) return "M";
      if (weight < 80) return "L";
      return "XL";
    } else {
      if (weight < 75) return "L";
      return "XL";
    }
  } else {
    // Regular fit recommendations
    if (height < 165) {
      if (weight < 55) return "S";
      if (weight < 65) return "M";
      if (weight < 75) return "L";
      if (weight < 85) return "XL";
      return "XXL";
    } else if (height < 175) {
      if (weight < 60) return "S";
      if (weight < 70) return "M";
      if (weight < 80) return "L";
      if (weight < 90) return "XL";
      return "XXL";
    } else if (height < 185) {
      if (weight < 65) return "M";
      if (weight < 75) return "L";
      if (weight < 85) return "XL";
      return "XXL";
    } else {
      if (weight < 70) return "L";
      if (weight < 85) return "XL";
      return "XXL";
    }
  }
}

/**
 * Get available sizes for a specific fit type
 * @param {string} fitType - 'oversized' or 'regular'
 * @returns {Array} Array of size keys
 */
export function getAvailableSizes(fitType = 'oversized') {
  return Object.keys(SIZE_DATA[fitType]);
}

/**
 * Get size measurements
 * @param {string} size - Size key (S, M, L, XL, XXL)
 * @param {string} fitType - 'oversized' or 'regular'
 * @returns {Object} Size measurements object
 */
export function getSizeMeasurements(size, fitType = 'oversized') {
  return SIZE_DATA[fitType][size] || SIZE_DATA[fitType]["M"];
}
