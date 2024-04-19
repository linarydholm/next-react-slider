// imports
import Image from 'next/image';
import { HTMLAttributes } from 'react';

// TypeScript
export type ImageProps = {
  src: string;
  title: string;
  alt: string;
  width: number;
  height: number;
};
export type ProductProps = {
  title: string;
  price: number;
};
export type ProductsProps = {
  image: ImageProps;
  product: ProductProps;
};
interface TestProps extends HTMLAttributes<HTMLElement> {
  product: ProductsProps;
  index: number;
}

// Component
export function Test({ product, index, ...restProps }: TestProps) {
  return (
    <div
      {...restProps}
      className="component-hej bg-pink-300 p-2 rounded border border-black"
    >
      <div className="overflow-hidden aspect-square relative">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          width={product.image.width}
          height={product.image.height}
          className="rounded absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full h-full object-cover"
        />
      </div>
      <p>{product.product.title}</p>
      <p>{product.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} kr</p>
    </div>
  );
}
