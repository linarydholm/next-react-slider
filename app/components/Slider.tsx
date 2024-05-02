'use client';
import { useRef, useState, useEffect, Children, createRef } from 'react';
import { cn } from '../utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement | React.ReactElement[];
  hasButtons?: boolean;
  hasScrollbar?: boolean;
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
  scrollWidthInPercentage = 25,
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

  const scrollMax = sliderComponentsRef.current
    ? sliderComponentsRef.current.scrollWidth - sliderComponentsRef.current.clientWidth
    : 0;

  // Observera synligheten av barnkomponenter
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1, // Justera tröskeln efter behov
    };

    const observer = new IntersectionObserver((entries) => {
      console.log('updated entries:', entries);

      entries.forEach((entry, index) => {
        // console.log('entry:', index, entry);

        if (entry.isIntersecting) {
          console.log('visible:', entry.target.getAttribute('data-test'));
          // Gör något när elementet blir synligt
        } else {
          console.log('invisible:', entry.target.getAttribute('data-test'));
          // Gör något när elementet inte är synligt
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
  }, [children]); // Uppdatera observeraren när children ändras

  // Övriga useEffects och komponentrendering här nedan

  const handleScroll = () => {
    if (sliderComponentsRef.current) {
      setCurrentX(sliderComponentsRef.current.scrollLeft);
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
      className={cn('slider-wrapper relative', sliderWrapper)}
    >
      {hasButtons && (
        <div className={cn('buttons-wrapper absolute pointer-events-none inset-0', buttonsWrapper)}>
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
          'components-wrapper flex cursor-grab overscroll-x-contain',
          hasScrollbar ? 'overflow-auto' : 'overflow-hidden',
          mouseIsDown && 'cursor-grabbing',
          componentsWrapper
        )}
      >
        {Children.map(children, (child, index) => {
          return (
            <div
              data-test={`div-${index}`}
              ref={(element) => {
                if (element) {
                  itemEls.current.push(element);
                }
              }}
              className={cn(
                'component-wrapper grow-0 shrink-0 overflow-hidden w-60 aspect-auto',
                componentWrapper
              )}
            >
              {child}
            </div>
          );
        })}
      </div>
    </section>
  );
}
