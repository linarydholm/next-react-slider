'use client';

import { MutableRefObject, useEffect } from 'react';
// imports
import { cn } from '../utils/cn';
// import { useRef } from 'react';

// typescript
interface SliderComponentsProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  ref: MutableRefObject<HTMLDivElement | null>;
}

// Component
export function SliderComponents({
  children,
  className,
  ref,
  ...restProps
}: SliderComponentsProps) {
  return (
    <div
      ref={ref}
      {...restProps}
      className={cn(
        'SliderComponents bg-purple-300 p-12 flex gap-2 cursor-grab overflow-auto overscroll-x-contain',
        className
        // mouseIsDown && 'cursor-grabbing'
      )}
    >
      {children}
    </div>
  );
}
