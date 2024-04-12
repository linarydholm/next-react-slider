// images
import chris from '@/app/img/chris-nguyen-aTX_bRaOZnA-unsplash.jpg';
import dhiva from '@/app/img/dhiva-krishna-YApS6TjKJ9c-unsplash.jpg';
import josh from '@/app/img/josh-berquist-_4sWbzH5fp8-unsplash.jpg';
import marek from '@/app/img/marek-pospisil-oUBjd22gF6w-unsplash.jpg';
import tyler from '@/app/img/tyler-clemmensen-4gSavS9pe1s-unsplash.jpg';

// components
import { ImageSlider } from './components/ImageSlider';
import Image from 'next/image';

import { Slider } from './theComponent/Slider';
import { Test } from './components/Test';
import { Test2 } from './components/Test2';
import { NewSlider } from './newSlider/NewSlider';
import { SliderGroup } from './newSlider/SliderGroup';
import { SliderContent } from './newSlider/SliderContent';
import { MobileSliderGroup } from './newSlider/MobileSliderGroup';

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
      {/* test classnames here */}
      <div className="max-w-7xl m-auto bg-teal-950">
        <Slider
          // send settings via props, ex:
          type="default"
          padX={4}
          padY={4}
          className="bg-transparent"
          aspectRatio="card"
        >
          {/* // type all components in slider or map through an array and create a JSX component */}
          <Test title={'example component 1'} />
          <Test2 title={'example component 2'} />
          {/* <Image
            alt="example component 3"
            src={marek.src}
            layout="fill"
            className="object-cover"
          /> */}
          <Test2 title={'example component 4'} />
          <Test2 title={'example component 5'} />
          <Test title={'example component 6'} />
          <Test title={'example component 7'} />
        </Slider>
      </div>

      {/* new Slider ! */}

      <section className="container m-auto">
        <div className="slider-wrapper relative m-auto">
          <div className="slider flex aspect-video overflow-x-auto snap-x snap-mandatory *:snap-center *:snap-normal scroll-smooth *:flex-[1_0_100%] *:object-cover">
            <img
              id="slide-1"
              src={chris.src}
              alt="alt"
            />

            <img
              id="slide-2"
              src={marek.src}
              alt="alt"
            />

            <img
              id="slide-3"
              src={dhiva.src}
              alt="alt"
            />

            <img
              id="slide-4"
              src={chris.src}
              alt="alt"
            />

            <img
              id="slide-5"
              src={marek.src}
              alt="alt"
            />

            <img
              id="slide-6"
              src={dhiva.src}
              alt="alt"
            />
          </div>

          <div className="slider-nav flex gap-3 absolute bottom-8 left-1/2 -translate-x-1/2 z-10 *:w-3 *:h-3 *:bg-black *:bg-opacity-75 *:rounded-full *:transition-colors">
            <a
              className="hover:bg-opacity-100"
              href="#slide-1"
            ></a>
            <a
              className="hover:bg-opacity-100"
              href="#slide-2"
            ></a>
            <a
              className="hover:bg-opacity-100"
              href="#slide-3"
            ></a>
            <a
              className="hover:bg-opacity-100"
              href="#slide-4"
            ></a>
            <a
              className="hover:bg-opacity-100"
              href="#slide-5"
            ></a>
            <a
              className="hover:bg-opacity-100"
              href="#slide-6"
            ></a>
          </div>
        </div>
      </section>
    </>
  );
}

{
  /* <NewSlider>
          <SliderContent
          as={
            <Image
            alt="alt"
            src={marek.src}
            width={1200}
            height={1200}
            />
          }
          />
            
            <SliderContent
            as={
              <Image
              alt="alt"
              src={chris.src}
              width={1200}
              height={1200}
              className="object-fit"
              />
            }
            />
          </NewSlider> */
}
