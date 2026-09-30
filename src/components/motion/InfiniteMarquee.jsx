import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * InfiniteMarquee component inspired by Motion Primitives Infinite Slider.
 * Continuous smooth editorial text or logo ribbon.
 * Respects prefers-reduced-motion.
 */
export default function InfiniteMarquee({
  items,
  speed = 30, // seconds for full cycle
  reverse = false,
  className = '',
  itemClassName = '',
}) {
  const shouldReduceMotion = useReducedMotion();

  // Duplicate items 4 times to ensure seamless infinite looping
  const duplicatedItems = [...items, ...items, ...items, ...items];

  if (shouldReduceMotion) {
    return (
      <div className={`overflow-x-auto whitespace-nowrap py-4 ${className}`}>
        <div className="inline-flex gap-8 px-4">
          {items.map((item, idx) => (
            <span key={idx} className={itemClassName}>
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`}>
      {/* Edge Blur / Fade Masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-inherit to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-inherit to-transparent z-10" />

      <motion.div
        className="flex whitespace-nowrap will-change-transform py-4"
        animate={{
          x: reverse ? ['-50%', '0%'] : ['0%', '-50%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className={`inline-flex items-center shrink-0 px-6 ${itemClassName}`}
          >
            <span>{item}</span>
            <span className="mx-6 text-xs text-[#B88E55] opacity-40">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
