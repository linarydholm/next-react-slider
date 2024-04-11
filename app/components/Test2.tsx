import { cn } from '../utils/cn';

interface TestProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export function Test2({ title = 'example title', ...otherProps }: TestProps) {
  return (
    <>
      <div
        className={cn(
          'bg-black text-white w-full h-full',
          otherProps.className,
          title === 'example component 4' && 'text-green-500'
        )}
        {...otherProps}
      >
        {title}
      </div>
    </>
  );
}
