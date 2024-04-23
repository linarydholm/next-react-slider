'use client';

// imports
// import { useDragScroll } from '../dash/useDragScroll';
import { cn } from '../utils/cn';
import React, { Children, useEffect, useRef, useState } from 'react';

// typescript
interface SliderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode | React.ReactNode[];
  sliderClassNames?: string;
  sliderComponentClassNames?: string;
}

// Component
export function Slider({
  // component props
  children,
  sliderClassNames,
  sliderComponentClassNames,
  ...restProps
}: // props type
SliderProps) {
  // variables to my functions
  const ref = useRef<HTMLElement>(null);
  const [mouseIsDownAndInSlider, setMouseIsDownAndInSlider] = useState(false);
  const [currentX, setCurrentX] = useState(0);
  const [preventClick, setPreventClick] = useState(false);

  //functions
  const returnXPosition = (e: React.MouseEvent<HTMLElement>) => {
    if (ref.current) {
      const { movementX } = e;
      const scrollMax = ref.current.scrollWidth - ref.current.clientWidth;

      if (currentX > scrollMax) {
        setCurrentX(scrollMax);
        return (ref.current.scrollLeft = currentX);
      }
      if (currentX < 0) {
        setCurrentX(0);
        return (ref.current.scrollLeft = currentX);
      }
      if (currentX >= 0 && currentX <= scrollMax) {
        setCurrentX((currentX) => (currentX -= movementX));
        return (ref.current.scrollLeft = currentX);
      }
    }
  };

  const handleScroll = () => {
    if (ref.current) {
      setCurrentX(ref.current.scrollLeft);
    }
  };

  const handleOnMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (ref.current?.classList.contains('Slider') && !mouseIsDownAndInSlider) {
      setMouseIsDownAndInSlider(true);
      setPreventClick(true);
    }
  };

  const handleOnMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    if (mouseIsDownAndInSlider) {
      setMouseIsDownAndInSlider((mouseIsDownAndInSlider) => !mouseIsDownAndInSlider);
      setPreventClick(false);
    }
  };

  const handleOnMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (mouseIsDownAndInSlider) {
      e.preventDefault();
      e.stopPropagation();

      returnXPosition(e);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    // stänger av drag scroll när man lämnar slider
    if (mouseIsDownAndInSlider) {
      setMouseIsDownAndInSlider((mouseIsDownAndInSlider) => !mouseIsDownAndInSlider);
      setPreventClick(false);
    }
  };

  // console.logs
  useEffect(() => {
    // console.log('currentX:', currentX);
  }, [mouseIsDownAndInSlider, ref, currentX, preventClick]);

  // return
  return (
    <section
      {...restProps}
      ref={ref}
      onScroll={handleScroll}
      onMouseDown={(e) => {
        handleOnMouseDown(e);
      }}
      onMouseUp={(e) => {
        handleOnMouseUp(e);
      }}
      onMouseMove={(e) => {
        handleOnMouseMove(e);
      }}
      onMouseLeave={(e) => {
        handleMouseLeave(e);
      }}
      className={cn(
        'Slider bg-purple-400 overflow-x-scroll overscroll-x-contain m-auto flex p-12 w-full max-w-screen-2xl gap-6 cursor-grab',
        sliderClassNames,
        mouseIsDownAndInSlider && 'cursor-grabbing'
        // 'snap-x snap-mandatory scroll-p-12'
      )}
    >
      {Children.map(children, (child, index) => {
        return (
          <div
            className={cn(
              'SliderComponent shrink-0 grow-0 w-60 md:w-80 lg:w-96',
              sliderComponentClassNames
              // 'snap-start snap-normal'
            )}
            key={index}
          >
            {child}
          </div>
        );
      })}

      {/* <div>hej</div> */}
    </section>
  );
}
