import { cn } from '../utils/cn';

interface SliderContentProps {
  as: React.ReactNode;
  className?: string;
}

export function SliderContent({ as, className, ...otherProps }: SliderContentProps) {
  return (
    <div
      {...otherProps}
      className={cn('slider-content object-cover', className)}
    >
      {as}
    </div>
  );
}
