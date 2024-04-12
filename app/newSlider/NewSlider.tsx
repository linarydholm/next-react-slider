import { cn } from '../utils/cn';

interface NewSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[];
}

export function NewSlider({ children, ...otherProps }: NewSliderProps) {
  // only render if data is correct:
  if (children == null || (Array.isArray(children) && children.length === 0)) {
    return null;
  }

  return (
    <div
      {...otherProps}
      className="overflow-hidden max-h-screen bg-slate-400"
    >
      <div
        className={cn(
          'new-slider media-scroller grid grid-flow-col auto-cols-[100%] overflow-x-auto overscroll-x-contain snap-x snap-mandatory *:snap-center *:snap-normal'
        )}
      >
        {children}
      </div>
    </div>
  );
}
