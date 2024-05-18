'use client';

// imports
import { useRef, useState, useEffect, Children } from 'react';
import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';

// util functions
const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// TypeScript
interface SliderProps extends React.HTMLAttributes<HTMLElement> {
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
}

// Component
export function Slider({
  children,
  hasButtons = true,
  buttonLeftNode = '<',
  buttonRightNode = '>',
  hasScrollbar = true,
  hasAnimation = true,
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

  // Intersection Observer using React: https://dev.to/producthackers/intersection-observer-using-react-49ko
  useEffect(() => {
    // Intersection observer options: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#creating_an_intersection_observer
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    // Observe visibility of children components
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Do something when element is visible
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
          // Do something when element is not visible
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

    // Observera varje barnkomponent
    componentWrapperRefs.current.forEach((element) => {
      observer.observe(element);
    });

    // Avsluta observeraren när komponenten avmonteras
    return () => {
      componentWrapperRefs.current.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [children, hasAnimation, animationType, scrollAnimation]); // Uppdatera observeraren när children ändras}

  const handleScroll = () => {
    if (componentsWrapperRef.current) {
      setCurrentX(componentsWrapperRef.current.scrollLeft);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLElement>) => {
    if (componentsWrapperRef.current) {
      const xScroll = (componentsWrapperRef.current.scrollLeft += e.deltaX);
      setCurrentX(xScroll);
    }
  };

  const handleMouseDown = () => {
    if (mouseIsDown) return;

    setMouseIsDown(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!mouseIsDown) return;

    e.stopPropagation();
    e.preventDefault();

    const { movementX } = e;

    if (movementX > 0 || movementX < 0) {
      setCurrentX((currentX) => (currentX -= e.movementX));
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

  // a function that checks and corrects currentX every time currentX updates
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
  }, [currentX, scrollMax]);

  return (
    <section
      {...restProps}
      data-description="slider-wrapper"
      ref={sliderWrapperRef}
      onScroll={handleScroll}
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
              // Storing an array of elements using the useRef hook: https://mattclaffey.medium.com/adding-react-refs-to-an-array-of-items-96e9a12ab40c
              ref={(element) => {
                if (element) {
                  componentWrapperRefs.current.push(element);
                }
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </section>
  );
}
