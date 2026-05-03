// جوه ملف lib/products.ts
export const PRODUCT_DATA = {
  "products": [
    {
      "id": "tshirt-maverick-phoenix",
      "name": "The Maverick Phoenix",
      "type": "tshirt",
      // ... باقي البيانات
      "colors": [ // <-- هنا بتضيف الألوان الخاصة بالقطعة دي
        {
          "name": "White",
          "hex": "#FFFFFF",
          "image": "/maverick-phoenix-white.png" // صورة التيشيرت الأبيض بخلفية شفافة
        },
        {
          "name": "Navy",
          "hex": "#001F3F",
          "image": "/maverick-phoenix-navy.png" // صورة التيشيرت الكحلي
        },
        {
          "name": "Black",
          "hex": "#000000",
          "image": "/maverick-phoenix-black.png" // صورة التيشيرت الأسود
        }
      ]
    }
  ]
};
