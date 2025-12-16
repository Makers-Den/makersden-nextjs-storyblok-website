'use client';

import { motion } from 'motion/react';
import { type ReactNode } from 'react';

import clsxm from '@/lib/clsxm';

import { type AnimationType, getAnimationVariant } from './animationVariants';

interface AnimateOnScrollProps {
  children: ReactNode;
  animationType?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
}

export function AnimateOnScroll({
  children,
  animationType = 'fadeUp',
  delay = 0.2,
  duration = 0.8,
  className,
}: AnimateOnScrollProps) {
  // Respect reduced motion preference
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) {
      return <>{children}</>;
    }
  }

  const variant = getAnimationVariant(animationType);

  return (
    <motion.div
      initial={variant.hidden}
      whileInView={variant.visible}
      viewport={{
        once: true,
        margin: '-150px',
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={clsxm(className)}
    >
      {children}
    </motion.div>
  );
}
