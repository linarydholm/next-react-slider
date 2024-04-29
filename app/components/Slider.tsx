'use client';
import { useRef, useState, useEffect, Children } from 'react';
import { cn } from '../utils/cn';
import { SliderButtons } from './SliderButtons';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
  buttons?: boolean;
}

export function Slider({ children, className, buttons = true, ...restProps }: SliderProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sliderComponentsRef = useRef<HTMLDivElement | null>(null);

  const [currentX, setCurrentX] = useState(0);
  const [mouseIsDown, setMouseIsDown] = useState(false);

  const scrollMax = sliderComponentsRef.current
    ? sliderComponentsRef.current.scrollWidth - sliderComponentsRef.current.clientWidth
    : 0;

  const handleScroll = () => {
    if (sliderComponentsRef.current) {
      setCurrentX(sliderComponentsRef.current.scrollLeft);
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
    if (sliderComponentsRef.current) {
      sliderComponentsRef.current.scrollLeft = updatedCurrentX;
      setCurrentX(updatedCurrentX);
    }

    // console.log(currentX, scrollMax);
  }, [currentX, scrollMax]);

  return (
    <section
      ref={sliderRef}
      {...restProps}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={cn('Slider relative max-w-7xl m-auto', className)}
    >
      <SliderButtons buttons={buttons}>
        {currentX > 0 && (
          <button
            className="pointer-events-auto p-2 bg-white text-gray-900 rounded absolute top-1/2 -translate-y-1/2 left-6"
            onClick={() => {
              setCurrentX((currentX) =>
                sliderComponentsRef.current
                  ? (currentX -= sliderComponentsRef.current.clientWidth * 0.5)
                  : (currentX -= 0)
              );
            }}
          >
            <ChevronLeft />
          </button>
        )}

        {(currentX < 0 ||
          (currentX >= 0 && currentX !== scrollMax) ||
          (currentX === 0 && scrollMax === 0)) && (
          <button
            className="pointer-events-auto p-2 bg-white text-gray-900 rounded absolute top-1/2 -translate-y-1/2 right-6"
            onClick={() => {
              setCurrentX((currentX) =>
                sliderComponentsRef.current
                  ? (currentX += sliderComponentsRef.current.clientWidth * 0.5)
                  : (currentX += 0)
              );
            }}
          >
            <ChevronRight />
          </button>
        )}
      </SliderButtons>

      <div
        ref={sliderComponentsRef}
        onScroll={handleScroll}
        className={cn(
          'SliderComponents bg-purple-300 p-12 flex gap-2 cursor-grab overflow-auto overscroll-x-contain',
          mouseIsDown && 'cursor-grabbing'
        )}
      >
        {Children.map(children, (child) => {
          return (
            <div className="SliderComponent grow-0 shrink-0 overflow-hidden w-80 h-80 *:object-cover *:h-full *:w-full">
              {child}
            </div>
          );
        })}
      </div>
    </section>
  );
}
