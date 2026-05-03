export const SIZES = ['S', 'M', 'L', 'XL', '2XL'];

export const TRY_TEST_PRODUCTS = [
  {
    id: '1',
    name: 'The Maverick Phoenix',
    price: '730.00',
    type: 'top', // علوي
    fit: 'oversized',
    image: 'https://ik.imagekit.io/5yvgym2qm/...',
    variants: [
      { colorName: 'Dark Black', tryOnImage: '/maverick-phoenix-black.png' },
      { colorName: 'White Base', tryOnImage: '/maverick-phoenix-white.png' },
    ],
  },
  {
    id: '2',
    name: 'The Powder Blue Venture Tee',
    price: '440.00',
    type: 'top',
    fit: 'regular',
    tryOnImage: '/powder-blue-venture-tee.png',
  },
  {
    id: '3',
    name: 'Black Flux Sweatpants',
    price: '660.00',
    type: 'bottom', // سفلي
    fit: 'pants',
    tryOnImage: '/black-flux-sweatpants.png',
  },
  // ... أضف باقي المنتجات هنا مع تحديد type: 'top' أو 'bottom'
];
