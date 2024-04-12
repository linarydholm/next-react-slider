'use client';
// import { useState } from 'react';
import { cn } from '../utils/cn';

// interface
export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element[] | JSX.Element | null | undefined;
  type?: 'default' | 'fullscreen';
  padX: number;
  padY: number;
  aspectRatio?: 'default' | 'square' | 'video' | 'card';
}

// component
export function Slider({
  // props for <Slider />
  children,
  type = 'default',
  padX,
  padY,
  aspectRatio = 'default',
  className,
  ...otherProps
}: SliderProps) {
  // const [imageIndex, setImageIndex] = useState(0);

  // only render if data is correct:
  if (children == null || (Array.isArray(children) && children.length === 0)) {
    return null;
  }

  return (
    <section
      {...otherProps}
      className={cn('overflow-hidden', className)}
    >
      <div
        className={cn(
          'grid grid-flow-col overflow-x-auto overscroll-x-contain snap-x snap-mandatory *:snap-center *:snap-normal',
          type === 'default' && 'auto-cols-[90%] md:auto-cols-[47%] lg:auto-cols-[30%]',
          type === 'fullscreen' && 'auto-cols-[100%] h-screen',
          padX === 4 && 'px-4',
          padY === 4 && 'py-4'
        )}
      >
        {/* if many children */}
        {children &&
          (Array.isArray(children) && children.length > 0 ? (
            children.map((child, index) => {
              // console.log(child);
              return (
                <div
                  key={index}
                  className={cn(
                    'relative w-full h-full',
                    aspectRatio === 'default' && 'aspect-auto',
                    aspectRatio === 'square' && 'aspect-square',
                    aspectRatio === 'card' && 'aspect-[4/5]',
                    aspectRatio === 'video' && 'aspect-video'
                  )}
                >
                  {child}
                </div>
              );
            })
          ) : (
            // if one child
            <div className={cn('object-cover')}>{children}</div>
          ))}
      </div>
    </section>
  );
}
