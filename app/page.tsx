// imports
import { Slider } from './components/Slider';
import { products } from './__mock__/data';
import { Test } from './components/Test';
import { SliderComponent } from './components/SliderComponent';
import Image from 'next/image';
import { ProfileCard } from './components/ProfileCard';
import { profileData as profiles } from './__mock__/profileData';

// component
export default function App() {
  // console.log('k', profiles);
  // console.log('TJAAAA', products);

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
        sliderClassNames=""
        sliderComponentClassNames=""
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

      <br />

      <div className="flex justify-center items-center">
        {profiles.map((profile, index) => {
          // console.log('tja', profile);

          return (
            <ProfileCard
              key={index}
              profile={profile}
            />
          );
        })}
      </div>
    </div>
  );
}
