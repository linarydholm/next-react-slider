// imports
import { cn } from '../utils/cn';

// typescript
export type SliderParentProps = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

// Component
export function SliderParent({ children, className, ...restprops }: SliderParentProps) {
  console.log(children);

  return (
    <div
      {...restprops}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
