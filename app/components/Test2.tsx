import { cn } from '../utils/cn';

interface TestProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  className?: string;
}

export function Test2({ title = 'example title', ...otherProps }: TestProps) {
  return (
    <>
      <div
        className={cn('bg-white text-black w-full h-full p-2', otherProps.className)}
        {...otherProps}
      >
        {title}
        <p className="">{'<Test2 />'}</p>
        <p className="">{'<Test2 />'}</p>
      </div>
    </>
  );
}
