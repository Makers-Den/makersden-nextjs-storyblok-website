export type AnimationType =
  | 'fade'
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'blur'
  | 'scale';

interface AnimationVariant {
  hidden: Record<string, string | number>;
  visible: Record<string, string | number>;
}

const animationVariants: Record<AnimationType, AnimationVariant> = {
  fade: {
    hidden: { opacity: 0, filter: 'blur(8px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 32, scale: 0.985, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -32, scale: 0.985, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: 32, scale: 0.985, filter: 'blur(10px)' },
    visible: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' },
  },
  fadeRight: {
    hidden: { opacity: 0, x: -32, scale: 0.985, filter: 'blur(10px)' },
    visible: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' },
  },
  blur: {
    hidden: { opacity: 0, scale: 0.99, filter: 'blur(16px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  scale: {
    hidden: { opacity: 0, y: 16, scale: 0.94, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  },
};

export function getAnimationVariant(type: AnimationType): AnimationVariant {
  return animationVariants[type];
}
