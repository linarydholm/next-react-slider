'use client';
// imports
import { cn } from '../utils/cn';

// typescript
interface SliderButtonsProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  buttons: boolean;
}

// Component
export const SliderButtons = ({
  children,
  className,
  buttons,
  ...restProps
}: SliderButtonsProps) => {
  if (buttons) {
    return (
      <div
        {...restProps}
        className={cn(
          'SliderButtons absolute pointer-events-none inset-0 border border-red-500',
          className
        )}
        onClick={() => {
          console.log('hej');
        }}
      >
        {children}
      </div>
    );
  }
};
