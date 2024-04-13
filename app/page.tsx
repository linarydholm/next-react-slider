import { Slider } from './component/Slider';
import Image from 'next/image';

export default function App() {
  return (
    <div>
      <hgroup>
        <p>Nu börjar vi om</p>
        <p>Först bygger vi en default slider</p>
      </hgroup>

      <br />

      <p>Lägg till scroll snap i Slider-komponenten</p>

      <br />

      <Slider
        // settings
        variant={'default'}
        aspectRatio={'video'}
        componentWidth={'1/3'}
        padAndGap={2}
        scrollSnap={'start'}
        className="bg-black"
      >
        <Image
          alt="alt"
          src={
            'https://images.unsplash.com/photo-1618697371651-b203d4c3bac5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          width={2000}
          height={2000}
        />
        <Image
          alt="alt"
          src={
            'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          width={2000}
          height={2000}
        />
        <Image
          alt="alt"
          src={
            'https://images.unsplash.com/photo-1618697371651-b203d4c3bac5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          width={2000}
          height={2000}
        />
        <Image
          alt="alt"
          src={
            'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          width={2000}
          height={2000}
        />
        <Image
          alt="alt"
          src={
            'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          width={2000}
          height={2000}
        />
        <Image
          alt="alt"
          src={
            'https://images.unsplash.com/photo-1618697371651-b203d4c3bac5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          width={2000}
          height={2000}
        />
        <Image
          alt="alt"
          src={
            'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          width={2000}
          height={2000}
        />
        <Image
          alt="alt"
          src={
            'https://images.unsplash.com/photo-1618697371651-b203d4c3bac5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          width={2000}
          height={2000}
        />
      </Slider>
    </div>
  );
}
