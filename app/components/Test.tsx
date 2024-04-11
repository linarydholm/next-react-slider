import { cn } from '../utils/cn';

interface TestProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  className?: string;
}

export function Test({ title = 'example title', ...otherProps }: TestProps) {
  return (
    <>
      <div
        className={cn(
          'bg-white text-black w-full h-full',
          otherProps.className,
          title === 'example component 4' && 'text-green-500'
        )}
        {...otherProps}
      >
        {title}
        <p>Hej</p>
      </div>
    </>
  );
}
