// imports
import { products } from './__mock__/data';
import Image from 'next/image';
import { Slider } from './components';

// component
export default function App() {
  return (
    <Slider
      // settings:
      scrollWidthInPercentage={35}
      // classes:
      // hasAnimation={false}
      animation={'opacity'}
      animationDir={'right'}
      buttonLeft="p-2 bg-white text-gray-900 rounded top-1/2 -translate-y-1/2 left-6 opacity-100 transition-opacity disabled:opacity-0"
      buttonRight="p-2 bg-white text-gray-900 rounded top-1/2 -translate-y-1/2 right-6 opacity-100 transition-opacity disabled:opacity-0"
      componentsWrapper="p-6 gap-6"
    >
      {products.map((product, index) => {
        return (
          <Image
            className="object-cover w-full h-full"
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
