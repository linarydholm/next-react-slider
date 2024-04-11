'use client';
// import { useState } from 'react';
import { cn } from '../utils/cn';

// interface
export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element[] | JSX.Element | null | undefined;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gaps?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  paddingY?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  paddingX?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

// component
export function Slider({
  children,
  cols = 1,
  gaps = 1,
  paddingY = 0,
  paddingX = 0,
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
      className={cn('w-full h-full relative overflow-hidden', otherProps.className)}
    >
      <div
        className={cn(
          'w-full h-full overflow-x-auto flex p-10',
          // paddingY
          paddingY === 0 && 'py-0',
          paddingY === 1 && 'py-1',
          paddingY === 2 && 'py-2',
          paddingY === 3 && 'py-3',
          paddingY === 4 && 'py-4',
          paddingY === 5 && 'py-5',
          paddingY === 6 && 'py-6',
          paddingY === 7 && 'py-7',
          paddingY === 8 && 'py-8',
          paddingY === 9 && 'py-9',
          paddingY === 10 && 'py-10',
          // paddingX
          paddingX === 0 && 'px-0',
          paddingX === 1 && 'px-1',
          paddingX === 2 && 'px-2',
          paddingX === 3 && 'px-3',
          paddingX === 4 && 'px-4',
          paddingX === 5 && 'px-5',
          paddingX === 6 && 'px-6',
          paddingX === 7 && 'px-7',
          paddingX === 8 && 'px-8',
          paddingX === 9 && 'px-9',
          paddingX === 10 && 'px-10',
          // gap
          gaps === 0 && 'gap-0',
          gaps === 1 && 'gap-1',
          gaps === 2 && 'gap-2',
          gaps === 3 && 'gap-3',
          gaps === 4 && 'gap-4',
          gaps === 5 && 'gap-5',
          gaps === 6 && 'gap-6',
          gaps === 7 && 'gap-7',
          gaps === 8 && 'gap-8',
          gaps === 9 && 'gap-9',
          gaps === 10 && 'gap-10'
        )}
      >
        {children &&
          (Array.isArray(children) && children.length > 0 ? (
            children.map((child, index) => (
              <div
                key={index}
                className={cn(
                  'object-cover h-full block shrink-0 grow-0',
                  cols === 1 && 'w-full',
                  cols === 2 && 'w-1/2',
                  cols === 3 && 'w-1/3',
                  cols === 4 && 'w-1/4',
                  cols === 5 && 'w-1/5',
                  cols === 6 && 'w-1/6'
                )}
              >
                {child}
              </div>
            ))
          ) : (
            <div className={cn('object-cover w-full h-full block shrink-0 grow-0')}>{children}</div>
          ))}
      </div>
    </section>
  );
}
