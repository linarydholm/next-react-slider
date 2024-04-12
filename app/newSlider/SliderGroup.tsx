import { cn } from '../utils/cn';

interface SliderGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export function SliderGroup({ children, className, ...otherProps }: SliderGroupProps) {
  // console.log('sliderGroup children', children);

  return (
    <div
      {...otherProps}
      className={cn(
        'slider-group media-element bg-zinc-300 grid grid-flow-col auto-cols-fr',
        className
      )}
    >
      {children}
    </div>
  );
}
