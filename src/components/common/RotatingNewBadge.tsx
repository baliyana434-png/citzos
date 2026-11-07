'use client';

import React from 'react';
import { useTranslation } from '@/i18n/useTranslation';

interface RotatingNewBadgeProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RotatingNewBadge: React.FC<RotatingNewBadgeProps> = ({
  label,
  size = 'md',
  className = '',
}) => {
  const { language } = useTranslation();
  const text = label || (language === 'hi' ? 'NEW' : 'NEW');

  // Dimension scaling
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }[size];

  const textClasses = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none pointer-events-none ${sizeClasses} ${className}`}
      aria-label="New Opportunity"
    >
      {/* 1. Outer 20-Point Starburst Teeth that Slowly Rotates (ZERO Glow, ZERO Blur, GPU-Isolated) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'none', transform: 'translateZ(0)', willChange: 'transform' }}
      >
        <path
          d="M50.00,2.00 L55.71,13.95 L64.83,4.35 L66.57,17.48 L78.21,11.17 L75.81,24.19 L88.83,21.79 L82.52,33.43 L95.65,35.17 L86.05,44.29 L98.00,50.00 L86.05,55.71 L95.65,64.83 L82.52,66.57 L88.83,78.21 L75.81,75.81 L78.21,88.83 L66.57,82.52 L64.83,95.65 L55.71,86.05 L50.00,98.00 L44.29,86.05 L35.17,95.65 L33.43,82.52 L21.79,88.83 L24.19,75.81 L11.17,78.21 L17.48,66.57 L4.35,64.83 L13.95,55.71 L2.00,50.00 L13.95,44.29 L4.35,35.17 L17.48,33.43 L11.17,21.79 L24.19,24.19 L21.79,11.17 L33.43,17.48 L35.17,4.35 L44.29,13.95 Z"
          fill="#ff3838"
        />
      </svg>

      {/* 2. Bold White Centered Text Tilted at -13 degrees matching the user's reference image */}
      <span
        className={`relative z-10 font-black text-white ${textClasses} tracking-tight uppercase transform -rotate-[13deg] font-sans leading-none`}
        style={{
          textShadow: '0 1px 2px rgba(0,0,0,0.25)',
        }}
      >
        {text}
      </span>
    </div>
  );
};
