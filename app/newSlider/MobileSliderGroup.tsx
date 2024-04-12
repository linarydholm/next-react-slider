import { cn } from '../utils/cn';

interface MobileSliderGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[];
}

export function MobileSliderGroup({ children, ...otherProps }: MobileSliderGroupProps) {
  // console.log('MobileSliderGroup children', children);

  return (
    <div
      {...otherProps}
      className={cn('mobile-slider-group grid grid-flow-col')}
    >
      {children}
    </div>
  );
}
