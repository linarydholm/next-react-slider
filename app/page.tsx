// imports
import { animals } from './__mock__/animals';
import { products } from './__mock__/products';
import Image from 'next/image';
import { Slider, ProductCard } from './components';
import { ChevronLeft, ChevronRight, MoveLeft, MoveRight } from 'lucide-react';

// component
export default function App() {
  return (
    <>
      <Slider
        // settings:
        hasButtons={true}
        buttonLeftNode={<ChevronLeft />}
        buttonRightNode={<ChevronRight />}
        hasAnimation={true}
        // hasScrollbar={true}
        scrollAnimation="both"
        scrollWidthInPercentage={75}
        // classes:
        buttonLeftStyle="p-2 bg-white text-gray-900 rounded top-1/2 -translate-y-1/2 left-6 opacity-100 transition-opacity disabled:opacity-0"
        buttonRightStyle="p-2 bg-white text-gray-900 rounded top-1/2 -translate-y-1/2 right-6 opacity-100 transition-opacity disabled:opacity-0"
        componentsWrapperStyle="p-2 gap-2 md:p-4 xl:p-6 md:gap-4 xl:gap-6"
        componentWrapperStyle="w-1/2 md:w-1/3 xl:w-1/4 aspect-[4/5]"
      >
        {animals.map((animal, index) => {
          // Example build component
          return (
            <Image
              className="object-cover w-full h-full transition duration-500 ease-in-out hover:scale-105"
              key={index}
              src={animal.image.src}
              alt={animal.image.alt}
              width={animal.image.width}
              height={animal.image.height}
            />
          );
        })}
      </Slider>

      <Slider
        hasButtons={true}
        buttonLeftNode={<MoveLeft />}
        buttonRightNode={<MoveRight />}
        buttonLeftStyle="bottom-1/4 left-3 bg-black p-3 text-white opacity-80 transition hover:opacity-100 disabled:opacity-30"
        buttonRightStyle="bottom-1/4 right-3 bg-black p-3 text-white opacity-80 transition hover:opacity-100 disabled:opacity-30"
        scrollWidthInPercentage={50}
      >
        {products.map((product, index) => {
          // Example return component
          return (
            <ProductCard
              key={index}
              image={product.image}
              product={product.product}
            />
          );
        })}
      </Slider>
    </>
  );
}
