'use client';
import { TRY_TEST_PRODUCTS } from '../../lib/products';
import { useSwayStore } from '../../lib/store';

export default function ProductSelector() {
  const { setTop, setBottom } = useSwayStore();

  return (
    <div className="grid grid-cols-2 gap-4 h-[300px] overflow-y-auto p-2">
      {TRY_TEST_PRODUCTS.map((product) => (
        <div 
          key={product.id}
          onClick={() => {
            if (product.type === 'top') setTop(product.tryOnImage || '', product.fit);
            else setBottom(product.tryOnImage || '', product.fit);
          }}
          className="cursor-pointer border border-[#222] hover:border-[#00FFFF] p-2 bg-black/50"
        >
          <img src={product.image} alt={product.name} className="w-full h-20 object-cover mb-2" />
          <p className="text-[10px] uppercase truncate">{product.name}</p>
        </div>
      ))}
    </div>
  );
}
