
'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function AnimatedSection({ children, className, ...props }: React.ComponentProps<'section'>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className={cn(
        'transition-opacity duration-1000 ease-in',
        isInView ? 'opacity-100' : 'opacity-0',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
