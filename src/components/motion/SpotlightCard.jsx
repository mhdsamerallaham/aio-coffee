import React, { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * SpotlightCard inspired by Watermelon UI & Motion Primitives Spotlight.
 * Dynamically illuminates card borders and surface with cursor-following radial gradient.
 * Respects prefers-reduced-motion.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(180, 50, 80, 0.18)', // subtle burgundy highlight
  radius = 350,
  as: Component = 'div',
  onClick,
  ...props
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (!divRef.current || shouldReduceMotion) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    if (!shouldReduceMotion) setOpacity(1);
  };

  const handleMouseLeave = () => {
    if (!shouldReduceMotion) setOpacity(0);
  };

  return (
    <Component
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border border-stone-200/80 dark:border-white/10 transition-shadow duration-500 ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      {!shouldReduceMotion && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
          style={{
            opacity,
            background: `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </Component>
  );
}
