// images
import chris from '@/app/(img)/chris-nguyen-aTX_bRaOZnA-unsplash.jpg';
import dhiva from '@/app/(img)/dhiva-krishna-YApS6TjKJ9c-unsplash.jpg';
import josh from '@/app/(img)/josh-berquist-_4sWbzH5fp8-unsplash.jpg';
import marek from '@/app/(img)/marek-pospisil-oUBjd22gF6w-unsplash.jpg';
import tyler from '@/app/(img)/tyler-clemmensen-4gSavS9pe1s-unsplash.jpg';

// components
import { ImageSlider } from './(components)/ImageSlider';

export type ImageProps = {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
};

// variables
const images: ImageProps[] = [chris, dhiva, josh, marek, tyler];

export default function App() {
  return (
    <div className="max-w-2xl w-1/2 aspect-[4/5] mx-auto my-0">
      <ImageSlider images={images} />
    </div>
  );
}
