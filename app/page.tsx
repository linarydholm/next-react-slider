// imports
import { products } from './__mock__/data';
import Image from 'next/image';
import { Slider, SliderComponents, SliderComponent } from './components';

// component
export default function App() {
  return (
    <Slider
    // available settings:
    // buttons={false} (defaults to true)
    >
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
    </Slider>
  );
}
