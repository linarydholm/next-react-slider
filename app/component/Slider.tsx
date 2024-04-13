import { cn } from '../utils/cn';

interface SliderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode | React.ReactNode[];
  variant?: 'default' | 'fullscreen';
  aspectRatio?: 'default' | 'square' | 'video' | 'card';
  componentWidth?: '1/4' | '1/3' | '1/2' | '1/1';
  scrollSnap?: 'start' | 'center' | 'end';
  padAndGap?: 0 | 1 | 2 | 3;
}

export function Slider({
  children,
  variant = 'default',
  aspectRatio = 'default',
  componentWidth = '1/1',
  padAndGap = 0,
  scrollSnap = 'start',
  ...props
}: SliderProps) {
  // receive props:
  // variant: 'default' | 'fullscreen'
  // aspectRatio: 'default' | 'square' | 'video' | 'card'
  // componentWidth: '1/4' | '1/3' | '1/2' | '1/1'
  // padAndGap: 1 | 2 | 3

  return (
    <div
      {...props}
      className={cn(
        // kanske: max-h-screen?
        'flex overflow-hidden overflow-x-auto overscroll-x-contain *:object-cover snap-x snap-mandatory *:snap-normal max-w-7xl m-auto',
        props.className,
        // aspect ratio on children
        aspectRatio === 'default' && '*:aspect-auto',
        aspectRatio === 'square' && '*:aspect-square',
        aspectRatio === 'video' && '*:aspect-video',
        aspectRatio === 'card' && '*:aspect-[4/5]',
        // component width on children
        componentWidth === '1/1' && '*:w-full',
        componentWidth === '1/2' && '*:w-1/2',
        componentWidth === '1/3' && '*:w-1/3',
        componentWidth === '1/4' && '*:w-1/4',
        // padding & gap (scroll padding also? (scroll-p))
        padAndGap === 0 && 'gap-0 p-0 scroll-p-0',
        padAndGap === 2 && 'gap-2 p-2 scroll-pl-2',
        // scroll snap on children
        scrollSnap === 'start' && '*:snap-start',
        scrollSnap === 'center' && '*:snap-center',
        scrollSnap === 'end' && '*:snap-end'
      )}
    >
      {children}
    </div>
  );
}
