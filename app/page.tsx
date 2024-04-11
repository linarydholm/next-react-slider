// images
import chris from '@/app/img/chris-nguyen-aTX_bRaOZnA-unsplash.jpg';
import dhiva from '@/app/img/dhiva-krishna-YApS6TjKJ9c-unsplash.jpg';
import josh from '@/app/img/josh-berquist-_4sWbzH5fp8-unsplash.jpg';
import marek from '@/app/img/marek-pospisil-oUBjd22gF6w-unsplash.jpg';
import tyler from '@/app/img/tyler-clemmensen-4gSavS9pe1s-unsplash.jpg';

// components
import { ImageSlider } from './components/ImageSlider';

import { Slider } from './theComponent/Slider';
import { Test } from './components/Test';
import { Test2 } from './components/Test2';

export type DataFromImage = {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
};

export type ImageProps = {
  image: DataFromImage;
  alt: string;
};

// variables
const images: ImageProps[] = [
  { image: chris, alt: 'Bil 1' },
  { image: dhiva, alt: 'Bil 2' },
  { image: josh, alt: 'Bil 3' },
  { image: marek, alt: 'Bil 4' },
  { image: tyler, alt: 'Bil 5' },
];

export default function App() {
  return (
    <>
      <div className="max-w-2xl w-1/2 aspect-[4/5] mx-auto my-0 mb-40">
        <ImageSlider images={images} />

        <div className="pt-4">
          <a
            href="/"
            className="text-2xl mt-4"
          >
            If you skip slider controls you end up here!
          </a>
          <p>Press enter on &#34;skip image slider controls&#34; then tab.</p>
        </div>
      </div>

      {/* // Slider must return one or more JSX.Element´s */}
      <Slider
        // settings
        // className="bg-blue-900"
        cols={4}
        gaps={4}
        paddingX={5}
        paddingY={10}
      >
        {/* // type all components in slider or map through an array and create a JSX component */}
        <Test title={'example component 1'} />
        <Test2 title={'example component 2'} />
        <Test
          className="bg-pink-500"
          title={'example component 2'}
        />
        <Test
          className="bg-red-500 text-white"
          title={'example component 3'}
        />
        <Test
          className="bg-blue-500"
          title={'example component 4'}
        />
        <Test
          className="bg-orange-500"
          title={'example component 5'}
        />
        <Test
          className="bg-purple-500"
          title={'example component 6'}
        />
        <Test
          className="bg-yellow-500"
          title={'example component 7'}
        />
      </Slider>
    </>
  );
}
