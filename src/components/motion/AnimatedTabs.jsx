import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * AnimatedTabs inspired by Watermelon UI & Motion Primitives AnimatedBackground.
 * Renders tabs with a sliding spring-animated active indicator pill.
 * Respects prefers-reduced-motion.
 */
export default function AnimatedTabs({
  tabs,
  activeTab,
  onChange,
  layoutId = 'animated-tab-pill',
  className = '',
  pillClassName = 'bg-[#4A1525] text-white',
  inactiveClassName = 'text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-white',
  activeTextClassName = 'text-white',
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`inline-flex items-center p-1.5 rounded-full bg-stone-100/90 dark:bg-stone-900/90 border border-stone-200/70 dark:border-white/10 backdrop-blur-md ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative px-5 py-2 text-xs md:text-sm font-medium tracking-wide transition-colors duration-200 rounded-full focus:outline-none select-none z-10 ${
              isActive ? activeTextClassName : inactiveClassName
            }`}
          >
            {isActive && (
              <motion.div
                layoutId={shouldReduceMotion ? undefined : layoutId}
                className={`absolute inset-0 rounded-full -z-10 shadow-sm ${pillClassName}`}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 32,
                }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-stone-200 dark:bg-stone-800 text-stone-500'}`}>
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
