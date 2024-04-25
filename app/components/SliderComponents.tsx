'use client';

// imports
import { cn } from '../utils/cn';

// typescript
interface SliderComponentsProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

// Component
export function SliderComponents({ children, className, ...restProps }: SliderComponentsProps) {
  return (
    <div
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
