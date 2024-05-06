'use client';

import { useRef, useState, useEffect, Children } from 'react';
import { cn } from '../utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement | React.ReactElement[];
  hasButtons?: boolean;
  hasScrollbar?: boolean;
  hasAnimation?: boolean;
  animationType?: 'opacity' | 'scale';
  scrollAnimation?: 'reveal' | 'both';
  scrollWidthInPercentage?: number;
  sliderWrapper?: string;
  buttonsWrapper?: string;
  buttonLeft?: string;
  buttonRight?: string;
  componentsWrapper?: string;
  componentWrapper?: string;
}

export function Slider({
  children,
  hasButtons = true,
  hasScrollbar = true,
  hasAnimation = true,
  animationType = 'opacity',
  scrollAnimation = 'reveal',
  scrollWidthInPercentage = 100,
  sliderWrapper,
  buttonsWrapper,
  buttonLeft,
  buttonRight,
  componentsWrapper,
  componentWrapper,
  ...restProps
}: SliderProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sliderComponentsRef = useRef<HTMLDivElement | null>(null);
  const itemEls = useRef<HTMLDivElement[]>([]);

  const [currentX, setCurrentX] = useState(0);
  const [mouseIsDown, setMouseIsDown] = useState(false);
  // const [snapIsOn, setSnapIsOn] = useState(true);

  const scrollMax = sliderComponentsRef.current
    ? sliderComponentsRef.current.scrollWidth - sliderComponentsRef.current.clientWidth
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
            if (animationType === 'scale' && scrollAnimation === 'both') {
              entry.target.classList.remove('scale-90');
              entry.target.classList.add('scale-100');
            }
            if (animationType === 'scale' && scrollAnimation === 'reveal') {
              // do something
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
            if (animationType === 'scale' && scrollAnimation === 'both') {
              entry.target.classList.add('scale-90');
              entry.target.classList.remove('scale-100');
            }
            if (animationType === 'scale' && scrollAnimation === 'reveal') {
              // do something
            }
          }
        }
      });
    }, options);

    // Observera varje barnkomponent
    itemEls.current.forEach((element) => {
      observer.observe(element);
    });

    // Avsluta observeraren när komponenten avmonteras
    return () => {
      itemEls.current.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [children, hasAnimation, animationType, scrollAnimation]); // Uppdatera observeraren när children ändras}

  const handleScroll = () => {
    if (sliderComponentsRef.current) {
      // setSnapIsOn(false);
      setCurrentX(sliderComponentsRef.current.scrollLeft);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (mouseIsDown) return;
    // setSnapIsOn(false);
    setMouseIsDown(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!mouseIsDown) return;

    // setSnapIsOn(false);

    e.stopPropagation();
    e.preventDefault();

    const { movementX } = e;

    if (movementX > 0 || movementX < 0) {
      setCurrentX((currentX) => (currentX -= movementX));
    }
  };

  const handleMouseUp = () => {
    if (!mouseIsDown) return;

    // setSnapIsOn(true);

    setMouseIsDown(false);
  };

  const handleMouseLeave = () => {
    if (!mouseIsDown) return;

    // setSnapIsOn(true);

    setMouseIsDown(false);
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
    if (sliderComponentsRef.current) {
      sliderComponentsRef.current.scrollLeft = updatedCurrentX;
      setCurrentX(updatedCurrentX);
    }

    // console.log(currentX, scrollMax);
  }, [currentX, scrollMax]);

  return (
    <section
      ref={sliderRef}
      {...restProps}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={cn('slider-wrapper relative z-10', sliderWrapper)}
    >
      {hasButtons && (
        <div
          className={cn(
            'buttons-wrapper absolute pointer-events-none inset-0 z-30',
            buttonsWrapper
          )}
        >
          {
            <button
              className={cn('button-left absolute pointer-events-auto', buttonLeft)}
              disabled={currentX < 5}
              onClick={() => {
                setCurrentX((currentX) =>
                  sliderComponentsRef.current
                    ? (currentX -=
                        sliderComponentsRef.current.clientWidth * (scrollWidthInPercentage / 100))
                    : (currentX -= 0)
                );
              }}
            >
              <ChevronLeft />
            </button>
          }

          {
            <button
              className={cn('button-right absolute pointer-events-auto', buttonRight)}
              disabled={scrollMax > 0 && currentX > scrollMax - 5}
              onClick={() => {
                setCurrentX((currentX) =>
                  sliderComponentsRef.current
                    ? (currentX +=
                        (sliderComponentsRef.current.clientWidth * scrollWidthInPercentage) / 100)
                    : (currentX += 0)
                );
              }}
            >
              <ChevronRight />
            </button>
          }
        </div>
      )}

      <div
        ref={sliderComponentsRef}
        onScroll={handleScroll}
        className={cn(
          'components-wrapper flex cursor-grab overscroll-x-contain transition duration-500 ease-in-out',
          // snapIsOn && 'snap-x snap-mandatory',
          hasScrollbar ? 'overflow-auto' : 'overflow-hidden',
          mouseIsDown && 'cursor-grabbing',
          componentsWrapper
        )}
      >
        {Children.map(children, (child, index) => {
          return (
            <div
              className={cn(
                'component-wrapper grow-0 shrink-0 overflow-hidden transition duration-500 ease-in-out',
                // snapIsOn && 'snap-center snap-normal',
                componentWrapper
              )}
              data-test={`component-wrapper-${index + 1}`}
              // Storing an array of elements using the useRef hook: https://mattclaffey.medium.com/adding-react-refs-to-an-array-of-items-96e9a12ab40c
              ref={(element) => {
                if (element) {
                  itemEls.current.push(element);
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
