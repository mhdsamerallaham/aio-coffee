import React from 'react';

/**
 * HaikeiDecor component inspired by Haikei (https://haikei.app/)
 * Provides bespoke organic SVG contour curves, coffee terroir topography lines,
 * and ambient luxury mesh gradient glows.
 */

export function HaikeiTopography({
  className = '',
  strokeColor = '#C59B63',
  opacity = 0.12,
}) {
  return (
    <svg
      viewBox="0 0 1000 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M -100,200 C 150,150 250,350 500,280 C 750,210 850,400 1100,320"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeOpacity={opacity}
        strokeDasharray="4 6"
      />
      <path
        d="M -100,240 C 160,190 260,390 510,320 C 760,250 860,440 1100,360"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeOpacity={opacity * 1.3}
      />
      <path
        d="M -100,280 C 170,230 270,430 520,360 C 770,290 870,480 1100,400"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeOpacity={opacity}
      />
      <path
        d="M -100,320 C 180,270 280,470 530,400 C 780,330 880,520 1100,440"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeOpacity={opacity * 0.8}
        strokeDasharray="6 8"
      />
      <path
        d="M -100,360 C 190,310 290,510 540,440 C 790,370 890,560 1100,480"
        stroke={strokeColor}
        strokeWidth="1"
        strokeOpacity={opacity * 0.6}
      />
    </svg>
  );
}

export function HaikeiOrganicBlob({
  className = '',
  color1 = '#5E172E',
  color2 = '#B88E55',
  opacity = 0.2,
}) {
  return (
    <div
      className={`pointer-events-none absolute select-none filter blur-3xl rounded-full ${className}`}
      style={{
        background: `radial-gradient(circle, ${color1} 0%, ${color2} 60%, transparent 80%)`,
        opacity,
      }}
      aria-hidden="true"
    />
  );
}

export function HaikeiWaveDivider({
  className = '',
  fill = '#0C0A09',
  flip = false,
}) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-12 md:h-20"
      >
        <path
          d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
