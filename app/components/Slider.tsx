'use client';
import { useRef, useState, useEffect } from 'react';
import { cn } from '../utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SliderButtons } from './SliderButtons';

interface SliderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
  buttons?: boolean;
}

export function Slider({ children, className, buttons = true, ...restProps }: SliderProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [currentX, setCurrentX] = useState(0);
  const scrollMax = ref.current ? ref.current.scrollWidth - ref.current.clientWidth : 0;

  const handleScroll = () => {
    if (ref.current) {
      setCurrentX(ref.current.scrollLeft);
    }
  };

  const handleMouseDown = () => {
    if (!mouseIsDown) {
      setMouseIsDown(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (mouseIsDown) {
      e.preventDefault();
      e.stopPropagation();
      const { movementX } = e;
      if (movementX > 0 || movementX < 0) {
        setCurrentX((currentX) => (currentX -= movementX));
      }
    }
  };

  const handleMouseUp = () => {
    if (mouseIsDown) {
      setMouseIsDown(false);
    }
  };

  const handleMouseLeave = () => {
    if (mouseIsDown) {
      setMouseIsDown(false);
    }
  };

  const checkAndReturnCurrentX = (currentX: number, scrollMax: number) => {
    if (currentX < 0) {
      setCurrentX(0);
      return 0;
    } else if (currentX > scrollMax) {
      setCurrentX(scrollMax);
      return scrollMax;
    } else {
      return currentX;
    }
  };

  useEffect(() => {
    const updatedCurrentX = checkAndReturnCurrentX(currentX, scrollMax);
    if (ref.current) {
      ref.current.scrollLeft = updatedCurrentX;
      setCurrentX(updatedCurrentX);
    }
  }, [currentX, scrollMax]);

  useEffect(() => {
    console.log('scrollMax:', scrollMax);
  }, [scrollMax]);

  return (
    <section
      ref={ref}
      {...restProps}
      onScroll={handleScroll}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={cn('Slider relative max-w-7xl m-auto', className)}
    >
      <SliderButtons buttons={buttons}>
        <button className="pointer-events-auto p-2 bg-white text-gray-900 rounded absolute top-1/2 -translate-y-1/2 left-6">
          <ChevronLeft />
        </button>

        <button className="pointer-events-auto p-2 bg-white text-gray-900 rounded absolute top-1/2 -translate-y-1/2 right-6">
          <ChevronRight />
        </button>
      </SliderButtons>

      {children}
    </section>
  );
}
