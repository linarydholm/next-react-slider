// imports
import { products } from './__mock__/data';
import Image from 'next/image';
import { Slider, SliderComponents, SliderComponent, SliderButtons } from './components';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// component
export default function App() {
  return (
    <Slider>
      <SliderButtons>
        <button className="pointer-events-auto p-2 bg-white text-gray-900 rounded absolute top-1/2 -translate-y-1/2 left-6">
          <ChevronLeft />
        </button>
        <button className="pointer-events-auto p-2 bg-white text-gray-900 rounded absolute top-1/2 -translate-y-1/2 right-6">
          <ChevronRight />
        </button>
      </SliderButtons>

      <SliderComponents>
        {products.map((product, index) => {
          return (
            <SliderComponent key={index}>
              <Image
                src={product.image.src}
                alt={product.image.alt}
                width={2000}
                height={2000}
              />
            </SliderComponent>
          );
        })}
      </SliderComponents>
    </Slider>
  );
}
