import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * TextReveal component inspired by Motion Primitives.
 * Purposefully reveals text word-by-word with subtle blur, opacity, and vertical translation.
 * Respects prefers-reduced-motion.
 */
export default function TextReveal({
  children,
  className = '',
  as: Component = 'h1',
  delay = 0,
  stagger = 0.04,
  blur = true,
  once = true,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  const text = typeof children === 'string' ? children : '';

  if (!text || shouldReduceMotion) {
    return <Component className={className} {...props}>{children}</Component>;
  }

  // Split text into words, preserving spaces
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: blur ? 'blur(6px)' : 'none',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Smooth custom cubic-bezier
      },
    },
  };

  return (
    <Component className={className} {...props}>
      <motion.span
        className="inline-block"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-20px' }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className="inline-block mr-[0.28em] will-change-transform"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
