'use client';
import React, { Children, cloneElement, isValidElement, useEffect } from 'react';
import { useRef, useState } from 'react';
import { cn } from '../utils/cn';

interface SliderChildProps {
  currentX: number;
  setCurrentX: React.Dispatch<React.SetStateAction<number>>;
}

interface SliderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement<SliderChildProps> | React.ReactElement<SliderChildProps>[];
  className?: string;
}

export function Slider({ children, className, ...restProps }: SliderProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [currentX, setCurrentX] = useState(0);
  const [mouseIsDown, setMouseIsDown] = useState(false);

  const scrollMax = ref.current ? ref.current.scrollWidth - ref.current.clientWidth : 0;

  const handleScroll = () => {
    if (ref.current) {
      setCurrentX(ref.current.scrollLeft);
    }
  };
  const handleMouseDown = () => {
    if (!mouseIsDown) {
      setMouseIsDown(true);
    }
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (mouseIsDown) {
      e.preventDefault();
      e.stopPropagation();

      const { movementX } = e;

      if (movementX > 0 || movementX < 0) {
        setCurrentX((currentX) => (currentX -= movementX));
      }
    }
  };
  const handleMouseUp = () => {
    if (mouseIsDown) {
      setMouseIsDown(false);
    }
  };
  const handleMouseLeave = () => {
    if (mouseIsDown) {
      setMouseIsDown(false);
    }
  };
  const checkAndReturnCurrentX = (currentX: number, scrollMax: number) => {
    if (currentX < 0) {
      setCurrentX(0);
      return 0;
    } else if (currentX > scrollMax) {
      setCurrentX(scrollMax);
      return scrollMax;
    } else {
      return currentX;
    }
  };

  useEffect(() => {
    const updatedCurrentX = checkAndReturnCurrentX(currentX, scrollMax);
    if (ref.current) {
      ref.current.scrollLeft = updatedCurrentX;
      setCurrentX(updatedCurrentX);
    }
    console.log('updatedCurrentX:', updatedCurrentX);
  }, [currentX, scrollMax]);

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement<SliderChildProps>(child)) {
      return cloneElement(child, { currentX, setCurrentX });
    }
    return child;
  });

  return (
    <section
      ref={ref}
      {...restProps}
      className={cn('Slider relative max-w-7xl m-auto', className)}
    >
      {childrenWithProps}
    </section>
  );
}
