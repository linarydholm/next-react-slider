'use client';

// imports
import { useDragScroll } from '../dash/useDragScroll';
import { cn } from '../utils/cn';
import { Children, useRef } from 'react';

// typescript
interface SliderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode | React.ReactNode[];
}

// useref!!!

// component
export function Slider({ children, className, ...restProps }: SliderProps) {
  const ref = useRef<HTMLElement>(null);
  useDragScroll(ref);

  // useDragScroll(ref, {
  //   onGestureStart: (event) => {
  //     console.log(event);
  //   },
  //   onGestureMove: (event) => {
  //     console.log(event);
  //   },
  //   onGestureEnd: (event) => {
  //     console.log(event);
  //   },
  // });

  return (
    <section
      {...restProps}
      ref={ref}
      className={cn(
        // settings:
        // padding X and Y
        // max width
        // scroll snap
        // aspect ratio (try to place it right with Image component from next)
        'Slider bg-purple-400 p-6 overflow-x-auto flex border-4 border-red-500 max-w-screen-2xl m-auto gap-2 snap-x snap-mandatory scroll-p-6',
        // classes based on settings for Slider goes here
        className
      )}
    >
      {Children.map(children, (child, index) => {
        return (
          <div
            className={cn(
              // settings:
              // width (on child component)
              'SliderComponent shrink-0 grow-0 w-60 md:w-80 lg:w-96 snap-start snap-normal'
              // classes based on settings for Slider (but for SliderComponent) goes here
            )}
            key={index}
          >
            {child}
          </div>
        );
      })}
    </section>
  );
}
