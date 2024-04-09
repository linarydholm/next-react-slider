// images
import chris from '@/app/(img)/chris-nguyen-aTX_bRaOZnA-unsplash.jpg';
import dhiva from '@/app/(img)/dhiva-krishna-YApS6TjKJ9c-unsplash.jpg';
import josh from '@/app/(img)/josh-berquist-_4sWbzH5fp8-unsplash.jpg';
import marek from '@/app/(img)/marek-pospisil-oUBjd22gF6w-unsplash.jpg';
import tyler from '@/app/(img)/tyler-clemmensen-4gSavS9pe1s-unsplash.jpg';

// components
import { ImageSlider } from './(components)/ImageSlider';

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
    <div className="max-w-2xl w-1/2 aspect-[4/5] mx-auto my-0">
      <ImageSlider images={images} />
      <a
        href="/"
        className="text-3xl"
      >
        Link
      </a>
    </div>
  );
}
