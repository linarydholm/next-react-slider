'use client';
// https://www.npmjs.com/package/tailwind-cn
import { cn } from 'tailwind-cn';
import { CornerDownLeft, CornerDownRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { ImageProps } from '../page';

type ImagesProps = {
  images: ImageProps[];
};

export function ImageSlider(props: ImagesProps) {
  const { images } = props;

  const [imageIndex, setImageIndex] = useState(0);

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
    <div className="w-full h-full relative">
      <div className="w-full h-full flex overflow-hidden">
        {images.map((image: ImageProps) => {
          return (
            // image should always be the same size and not shrink or grow: shrink-0 grow-0
            <Image
              alt=""
              className="object-cover w-full h-full block shrink-0 grow-0"
              key={image.src}
              src={image.src}
              width={image.width}
              height={image.height}
              // in this style we move all our images 100% to the left when we click
              style={{ translate: `${-100 * imageIndex}%` }}
            />
          );
        })}
      </div>

      <button
        aria-label="show previous image"
        onClick={showPrevImage}
        className="absolute p-2 block top-0 bottom-0 left-0 bg-red-900 bg-opacity-30 hover:bg-opacity-50 transition-colors"
      >
        {/* what is stroke-white and fill-black */}
        <CornerDownLeft className="stroke-white w-8 h-8" />
      </button>

      <button
        aria-label="show next image"
        onClick={showNextImage}
        className="absolute p-2 block top-0 bottom-0 right-0 bg-red-900 bg-opacity-30 hover:bg-opacity-50 transition-colors"
      >
        <CornerDownRight className="stroke-white w-8 h-8" />
      </button>

      <div className="absolute bottom-0 flex gap-6 left-1/2 -translate-x-1/2 mb-4 mx-auto">
        {images.map((_image: ImageProps, index: number) => {
          const cnClass = cn(
            'text-gray-400 bg-white bg-opacity-75 hover:bg-opacity-85 h-9 w-9 rounded hover:text-red-500 transition-colors',
            index + 1 === imageIndex + 1 && 'text-red-500 bg-opacity-85'
          );

          return (
            <button
              key={index}
              className={cnClass}
              onClick={() => setImageIndex(index)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
