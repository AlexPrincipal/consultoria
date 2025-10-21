'use client';

import { useRef, useEffect, useState, ReactNode, Children, cloneElement, isValidElement } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function AnimatedSection({ children, className, id }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn('transition-opacity duration-1000 ease-in', isVisible ? 'opacity-100' : 'opacity-0', className)}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // Aserción de tipo para acceder a props
          const childProps = child.props as { className?: string; [key: string]: any };
          return cloneElement(child, {
            ...childProps,
            className: cn(childProps.className, isVisible && 'fade-in-up'),
          });
        }
        return child;
      })}
    </section>
  );
}
