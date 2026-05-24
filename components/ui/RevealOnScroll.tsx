'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function RevealOnScroll({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 16, filter: 'blur(4px)' }
      }
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
