// imports
import { products } from './__mock__/data';
import Image from 'next/image';
import { Slider } from './components';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// component
export default function App() {
  return (
    <Slider
      // settings:
      hasButtons={true}
      buttonLeftNode={<ChevronLeft />}
      buttonRightNode={<ChevronRight />}
      hasAnimation={true}
      scrollAnimation="both"
      scrollWidthInPercentage={75}
      // classes:
      buttonLeftStyle="p-2 bg-white text-gray-900 rounded top-1/2 -translate-y-1/2 left-6 opacity-100 transition-opacity disabled:opacity-0"
      buttonRightStyle="p-2 bg-white text-gray-900 rounded top-1/2 -translate-y-1/2 right-6 opacity-100 transition-opacity disabled:opacity-0"
      componentsWrapperStyle="p-2 gap-2 md:p-4 xl:p-6 md:gap-4 xl:gap-6"
      componentWrapperStyle="w-1/2 md:w-1/3 xl:w-1/4 aspect-[4/5]"
    >
      {products.map((product, index) => {
        // Example components
        return (
          <Image
            className="object-cover w-full h-full transition duration-500 ease-in-out hover:scale-105"
            key={index}
            src={product.image.src}
            alt={product.image.alt}
            width={2000}
            height={2000}
          />
        );
      })}
    </Slider>
  );
}
