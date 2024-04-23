// imports
import { Children, isValidElement, cloneElement, HTMLAttributes, useRef } from 'react';
import { cn } from '../utils/cn';

// TypeScript
interface SliderComponentProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode | React.ReactNode[];
  widthTest?: string;
}

// Component
export function SliderComponent({ children, ...restProps }: SliderComponentProps) {
  // console.log(children);
  // const ref = useRef(null);

  return (
    <>
      {Children.map(children, (child, index) => {
        return (
          <div
            // ref={ref}
            {...restProps}
            // settings:
            // aspect-ratio
            className={cn(
              // settings:
              // aspect ratio
              // object-fit
              'Component relative aspect-square overflow-hidden *:absolute *:object-cover *:top-1/2 *:-translate-y-1/2 *:h-full *:w-full'
            )}
            key={index}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
