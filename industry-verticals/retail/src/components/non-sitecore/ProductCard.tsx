import { NextImage as ContentSdkImage, Text } from '@sitecore-content-sdk/nextjs';
import StarRating from './StarRating';
import Link from 'next/link';
import { Product } from '@/types/products';
import { useLocale } from '@/hooks/useLocaleOptions';

interface ProductCardProps {
  product: Partial<Product> & {
    Rating: number;
  };
  url: string;
  className?: string;
}

export const ProductCard = ({ product, url, className }: ProductCardProps) => {
  const { currencySymbol } = useLocale();
  const formattedPrice =
    product.Price?.value && !isNaN(product.Price?.value)
      ? product.Price.value.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
      : product.Price?.value;

  return (
    <Link href={url} passHref>
      <div
        className={`group hover:shadow-hover flex min-h-123 w-full flex-col overflow-hidden rounded-2xl transition-all duration-400 ${className}`}
      >
        <div className="bg-background-accent flex h-72 w-full items-center justify-center p-8">
          <ContentSdkImage
            field={product.Image1}
            className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            priority
          />
        </div>

        <div className="flex grow-1 flex-col items-start px-5 pt-4 pb-6 text-left">
          <p className="text-foreground-muted text-xs font-medium tracking-[0.15em] uppercase">
            <Text field={product.Category?.fields?.CategoryName} />
          </p>

          <h6 className="font-heading text-foreground mt-2 line-clamp-2 text-lg font-semibold">
            <Text field={product.Title} />
          </h6>

          <StarRating rating={product.Rating || 0} showOnlyFilled className="mt-2 mb-4" />

          <h6 className="text-foreground mt-auto text-lg font-semibold">
            <span className="mr-0.5 align-super text-xs">{currencySymbol}</span>
            {formattedPrice}
          </h6>
        </div>
      </div>
    </Link>
  );
};
