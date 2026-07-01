'use client';

import { motion, useReducedMotion } from 'motion/react';
import { type ReactNode } from 'react';

import clsxm from '@/lib/clsxm';

import { type AnimationType, getAnimationVariant } from './animationVariants';

interface AnimateOnScrollProps {
  children: ReactNode;
  animationType?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  viewportMargin?: string;
}

export function AnimateOnScroll({
  children,
  animationType = 'fadeUp',
  delay = 0.2,
  duration = 0.8,
  className,
  once = true,
  amount = 0.2,
  viewportMargin = '0px 0px -12% 0px',
}: AnimateOnScrollProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion === true;
  const variant = getAnimationVariant(animationType);

  return (
    <motion.div
      initial={shouldReduceMotion ? false : variant.hidden}
      whileInView={shouldReduceMotion ? undefined : variant.visible}
      viewport={{
        once,
        amount,
        margin: viewportMargin,
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration,
              delay,
              ease: [0.16, 1, 0.3, 1],
            }
      }
      className={clsxm('transform-gpu', className)}
    >
      {children}
    </motion.div>
  );
}
