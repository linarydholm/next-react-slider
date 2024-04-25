// imports
import { cn } from '../utils/cn';
interface SliderComponentProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export function SliderComponent({ children, className, ...restProps }: SliderComponentProps) {
  return (
    <div
      {...restProps}
      className={cn(
        'SliderComponent grow-0 shrink-0 overflow-hidden w-80 h-80 *:object-cover *:h-full *:w-full',
        className
      )}
    >
      {children}
    </div>
  );
}
