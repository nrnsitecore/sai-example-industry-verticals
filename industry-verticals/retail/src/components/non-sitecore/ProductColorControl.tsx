import { Product } from '@/types/products';

interface ProductColorControlProps {
  colors?: Product['Color'];
  selectedColor?: Product['Color'][number];
  onSelect: (color: Product['Color'][number]) => void;
}

export const ProductColorControl = ({
  colors = [],
  selectedColor,
  onSelect,
}: ProductColorControlProps) => {
  if (!colors.length) return null;

  return (
    <div className="flex gap-3">
      {colors.map((color) => (
        <button
          aria-label="Select Color"
          key={color.id}
          onClick={() => onSelect(color)}
          className={`size-9 rounded-full border-2 transition-all duration-400 ${
            selectedColor?.id === color.id
              ? 'ring-foreground ring-2 ring-offset-2'
              : 'border-border hover:ring-foreground/30 hover:ring-2'
          }`}
          title={color.fields?.Name?.value}
          style={{ backgroundColor: color.fields?.HexCode?.value }}
        />
      ))}
    </div>
  );
};
