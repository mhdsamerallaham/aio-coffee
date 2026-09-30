import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * ImageReveal component inspired by Motion Primitives.
 * Purposefully reveals imagery with smooth scale-down and soft unmasking.
 * Respects prefers-reduced-motion.
 */
export default function ImageReveal({
  src,
  alt = '',
  className = '',
  aspectRatio = 'aspect-[4/5]',
  hoverScale = true,
  overlay = null,
  priority = false,
}) {
  const [loaded, setLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-900 group ${aspectRatio} ${className}`}>
      {/* Skeleton Pulse */}
      {!loaded && (
        <div className="absolute inset-0 bg-stone-200/60 dark:bg-stone-800/60 animate-pulse z-0" />
      )}

      {/* Main Image */}
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.06 }}
        animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.06 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform ${
          hoverScale ? 'group-hover:scale-105' : ''
        }`}
      />

      {/* Optional Overlay / Gradient Vignette */}
      {overlay && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {overlay}
        </div>
      )}
    </div>
  );
}
