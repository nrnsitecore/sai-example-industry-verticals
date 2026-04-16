import { Product } from '@/types/products';

interface ProductSizeControlProps {
  sizes?: Product['Size'];
  selectedSize?: Product['Size'][number];
  onSelect: (size: Product['Size'][number]) => void;
}

export const ProductSizeControl = ({
  sizes = [],
  selectedSize,
  onSelect,
}: ProductSizeControlProps) => {
  if (!sizes.length) return null;

  return (
    <div className="flex gap-3">
      {sizes.map((size) => (
        <button
          key={size.id}
          onClick={() => onSelect(size)}
          className={`size-9 rounded-full text-sm font-medium transition-all duration-400 ${
            selectedSize?.id === size.id
              ? 'bg-foreground text-white'
              : 'bg-background-accent hover:bg-foreground/10'
          }`}
        >
          {size.fields?.ProductSize?.value ?? '-'}
        </button>
      ))}
    </div>
  );
};
