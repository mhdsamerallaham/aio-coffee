import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * InView component inspired by Motion Primitives.
 * Triggers purposeful entrance animation when entering viewport.
 * Respects prefers-reduced-motion.
 */
export default function InView({
  children,
  className = '',
  variant = 'fade-up', // 'fade-up' | 'fade-down' | 'fade' | 'scale' | 'blur'
  delay = 0,
  duration = 0.65,
  once = true,
  margin = '-40px',
  as: Component = motion.div,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className} {...props}>{children}</div>;
  }

  const variantsMap = {
    'fade-up': {
      hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
    },
    'fade-down': {
      hidden: { opacity: 0, y: -28, filter: 'blur(4px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
    },
    'fade': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    'scale': {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
    'blur': {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
    },
  };

  const selectedVariant = variantsMap[variant] || variantsMap['fade-up'];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      variants={selectedVariant}
      {...props}
    >
      {children}
    </Component>
  );
}
