'use client';

// https://www.npmjs.com/package/tailwind-cn
import { cn } from '../utils/cn';
import { Circle, CircleDot, CornerDownLeft, CornerDownRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { ImageProps } from '../page';

type ImagesProps = {
  images: ImageProps[];
};

export function ImageSlider(props: ImagesProps) {
  const { images } = props;
  const [imageIndex, setImageIndex] = useState(0);

  // buttons
  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  }

  function showNextImage() {
    setImageIndex((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  }

  return (
    <>
      <a
        href="#after-image-slider"
        className="absolute w-[1px] h-[1px] m-[-1px] focus-visible:top-4 focus-visible:left-4 focus-visible:w-auto focus-visible:h-auto focus-visible:p-2 focus-visible:z-50 focus-visible:bg-black focus-visible:text-white"
      >
        Skip image slider controls
      </a>

      <section
        aria-label="Image slider"
        className="w-full h-full relative"
      >
        <div className="w-full h-full flex overflow-hidden">
          {images.map(({ image, alt }: ImageProps, index) => {
            return (
              // image should always be the same size and not shrink or grow: shrink-0 grow-0
              <Image
                aria-hidden={imageIndex !== index}
                alt={alt}
                className="object-cover w-full h-full block shrink-0 grow-0"
                key={image.src}
                src={image.src}
                width={image.width}
                height={image.height}
                // in this style we move all our images 100% to the left when we click
                // how do I do this with tailwind css?
                style={{ translate: `${-100 * imageIndex}%` }}
              />
            );
          })}
        </div>

        <button
          aria-label="show previous image"
          onClick={showPrevImage}
          className="absolute p-2 block top-0 bottom-0 left-0 bg-red-900 bg-opacity-30 hover:bg-opacity-50 focus-visible:bg-opacity-50 transition-colors"
        >
          {/* what is stroke-white and fill-black */}
          <CornerDownLeft
            aria-hidden={true}
            className="stroke-white w-8 h-8"
          />
        </button>

        <button
          aria-label="show next image"
          onClick={showNextImage}
          className="absolute p-2 block top-0 bottom-0 right-0 bg-red-900 bg-opacity-30 hover:bg-opacity-50 focus-visible:bg-opacity-50 transition-colors"
        >
          <CornerDownRight
            aria-hidden={true}
            className="stroke-white w-8 h-8"
          />
        </button>

        <div className="absolute bottom-0 flex gap-6 left-1/2 -translate-x-1/2 mb-4 mx-auto">
          {images.map((_image: ImageProps, index: number) => {
            return (
              <button
                aria-label={`View image ${index + 1}`}
                key={index}
                className={cn(
                  'h-full w-full flex justify-center items-center focus-visible:scale-110 group transition-transform duration-200',
                  index === imageIndex && 'opacity-90'
                )}
                onClick={() => setImageIndex(index)}
              >
                {index === imageIndex ? (
                  // använd aria-hidden="true" för att dölja image"" i accessibility-trädet för varje ikon som renderas
                  <CircleDot
                    aria-hidden="true"
                    className="fill-red-900 stroke-white opacity-95 hover:scale-110 transition-transform duration-200"
                  />
                ) : (
                  <Circle
                    aria-hidden="true"
                    className="fill-red-900 stroke-white opacity-60 hover:opacity-95 hover:scale-110 transition-transform duration-200 group-focus-visible:opacity-95"
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      <div id="after-image-slider" />
    </>
  );
}
