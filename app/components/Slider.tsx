'use client';

// imports
import { useRef, useState, useEffect, Children, cloneElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';

// util functions
const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// TypeScript
type SliderProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactElement | React.ReactElement[];
  hasButtons?: boolean;
  buttonLeftNode?: React.ReactNode;
  buttonRightNode?: React.ReactNode;
  hasScrollbar?: boolean;
  hasAnimation?: boolean;
  animationType?: 'opacity';
  scrollAnimation?: 'reveal' | 'both';
  scrollWidthInPercentage?: number;
  sliderWrapperStyle?: string;
  buttonsWrapperStyle?: string;
  buttonLeftStyle?: string;
  buttonRightStyle?: string;
  componentsWrapperStyle?: string;
  componentWrapperStyle?: string;
};

// Component
export function Slider({
  children,
  hasButtons = false,
  buttonLeftNode = '<',
  buttonRightNode = '>',
  hasScrollbar = false,
  hasAnimation = false,
  animationType = 'opacity',
  scrollAnimation = 'reveal',
  scrollWidthInPercentage = 100,
  sliderWrapperStyle,
  buttonsWrapperStyle,
  buttonLeftStyle,
  buttonRightStyle,
  componentsWrapperStyle,
  componentWrapperStyle,
  ...restProps
}: SliderProps) {
  // Refs
  const sliderWrapperRef = useRef<HTMLDivElement | null>(null);
  const componentsWrapperRef = useRef<HTMLDivElement | null>(null);
  const componentWrapperRefs = useRef<HTMLDivElement[]>([]);

  // States
  const [currentX, setCurrentX] = useState(0);
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [startX, setStartX] = useState(0);

  // Variables
  const scrollMax = componentsWrapperRef.current
    ? componentsWrapperRef.current.scrollWidth - componentsWrapperRef.current.clientWidth
    : 0;

  // Intersection observer
  useEffect(() => {
    // Observer options
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // When element is visible
          if (hasAnimation) {
            if (animationType === 'opacity' && scrollAnimation === 'both') {
              entry.target.classList.remove('opacity-0');
              entry.target.classList.add('opacity-100');
            }
            if (animationType === 'opacity' && scrollAnimation === 'reveal') {
              entry.target.classList.add('opacity-100');
            }
          }
        } else {
          // When element is NOT visible
          if (hasAnimation) {
            if (animationType === 'opacity' && scrollAnimation === 'both') {
              entry.target.classList.add('opacity-0');
              entry.target.classList.remove('opacity-100');
            }
            if (animationType === 'opacity' && scrollAnimation === 'reveal') {
              entry.target.classList.add('opacity-0');
            }
          }
        }
      });
    }, options);

    // Observe children
    const currentItems = componentWrapperRefs.current;
    currentItems.forEach((element) => {
      observer.observe(element);
    });

    // Cancel observer when component unmounts
    return () => {
      currentItems.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [children, hasAnimation, animationType, scrollAnimation]);

  // Events
  const handleScroll = () => {
    if (!componentsWrapperRef.current) return;

    console.log('handleScroll');

    setCurrentX(componentsWrapperRef.current.scrollLeft);
  };

  const handleWheel = (e: React.WheelEvent<HTMLElement>) => {
    if (!componentsWrapperRef.current) return;

    const deltaX = e.deltaX;
    const xScroll = componentsWrapperRef.current.scrollLeft + deltaX;

    console.log('handleWheel');

    setCurrentX(xScroll);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (mouseIsDown) return;

    setMouseIsDown(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!mouseIsDown) return;

    e.stopPropagation();
    e.preventDefault();

    const clientX = e.clientX;
    const movementX = clientX - startX;

    if (movementX !== 0) {
      setCurrentX((currentX) => currentX - movementX);
      setStartX(clientX);
    }
  };

  const handleMouseUp = () => {
    if (!mouseIsDown) return;

    setMouseIsDown(false);
  };

  const handleMouseLeave = () => {
    if (!mouseIsDown) return;

    setMouseIsDown(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    if (mouseIsDown) return;

    setMouseIsDown(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (!mouseIsDown) return;

    const clientX = e.touches[0].clientX;
    const movementX = clientX - startX;

    if (movementX !== 0) {
      setCurrentX((currentX) => currentX - movementX);
      setStartX(clientX);
    }
  };

  const handleTouchEnd = () => {
    if (!mouseIsDown) return;

    setMouseIsDown(false);
  };

  // Functions
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

    if (componentsWrapperRef.current) {
      componentsWrapperRef.current.scrollLeft = updatedCurrentX;
      setCurrentX(updatedCurrentX);
    }

    console.log(currentX);
  }, [currentX, scrollMax]);

  return (
    <section
      {...restProps}
      data-description="slider-wrapper"
      ref={sliderWrapperRef}
      onScrollCapture={handleScroll}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={cn('relative z-0', sliderWrapperStyle)}
    >
      {hasButtons && (
        <div
          data-description="buttons-wrapper"
          className={cn('absolute pointer-events-none inset-0 z-50', buttonsWrapperStyle)}
        >
          {
            <button
              data-description="button-left"
              className={cn('absolute pointer-events-auto', buttonLeftStyle)}
              disabled={currentX < 5}
              onClick={() => {
                setCurrentX((currentX) =>
                  componentsWrapperRef.current
                    ? (currentX -=
                        componentsWrapperRef.current.clientWidth * (scrollWidthInPercentage / 100))
                    : (currentX -= 0)
                );
              }}
            >
              {buttonLeftNode}
            </button>
          }

          {
            <button
              data-description="button-right"
              className={cn('absolute pointer-events-auto', buttonRightStyle)}
              disabled={scrollMax > 0 && currentX > scrollMax - 5}
              onClick={() => {
                setCurrentX((currentX) =>
                  componentsWrapperRef.current
                    ? (currentX +=
                        (componentsWrapperRef.current.clientWidth * scrollWidthInPercentage) / 100)
                    : (currentX += 0)
                );
              }}
            >
              {buttonRightNode}
            </button>
          }
        </div>
      )}

      <div
        data-description="components-wrapper"
        ref={componentsWrapperRef}
        className={cn(
          'flex overscroll-x-contain hover:cursor-grab',
          mouseIsDown && 'hover:cursor-grabbing',
          hasScrollbar ? 'overflow-x-auto' : 'overflow-hidden',
          componentsWrapperStyle
        )}
      >
        {Children.map(children, (child) => {
          return (
            <div
              data-description="component-wrapper"
              className={cn(
                'grow-0 shrink-0 overflow-hidden',
                hasAnimation && 'transition duration-300 ease-in-out',
                componentWrapperStyle
              )}
              ref={(element) => {
                if (element) {
                  componentWrapperRefs.current.push(element);
                }
              }}
            >
              {cloneElement(child, { draggable: false })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
