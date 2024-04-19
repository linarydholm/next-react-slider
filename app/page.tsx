// imports
import { Slider } from './component/Slider';
import { products } from './__mock__/data';
import { Test } from './component/Test';
import { SliderComponent } from './component/SliderComponent';
import { TutorialSlider } from './component/TutorialSlider';
import Image from 'next/image';

// component
export default function App() {
  console.log('TJAAAA', products);

  return (
    <div>
      <div>
        <hgroup>
          <p>Nu börjar vi om</p>

          <p>Först bygger vi en default slider</p>
        </hgroup>

        <br />

        <p>Man ska kunna mappa igenom ett objekt och returnera en komponent</p>

        <p>Gör så att man kan dra i slidern med muspekaren</p>
      </div>

      <br />

      <Slider
      // settings for Slider here
      >
        {products.map((product, index) => {
          return (
            <SliderComponent key={index}>
              {/* <Test
                product={product}
                index={index}
              /> */}
              <Image
                src={product.image.src}
                alt={product.image.alt}
                width={2000}
                height={2000}
                // className="*:absolute *:object-cover *:top-1/2 *:-translate-y-1/2 *:min-h-full *:min-w-full"
              />
            </SliderComponent>
          );
        })}
      </Slider>
    </div>
  );
}
