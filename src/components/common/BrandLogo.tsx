'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  textClassName?: string;
  linkToHome?: boolean;
  subtitle?: string;
}

export const BrandIconSvg: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 40,
  className = '',
}) => {
  return (
    <img
      src="/logo-citzos.png"
      alt="CITZOS"
      style={{ height: `${sizePx}px`, width: 'auto' }}
      className={`shrink-0 object-contain transition-transform duration-200 hover:scale-105 ${className}`}
      loading="eager"
    />
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  textClassName = '',
  linkToHome = false,
  subtitle,
}) => {
  const heightMap = {
    xs: 24,
    sm: 28,
    md: 34,
    lg: 42,
    xl: 52,
  };

  const h = heightMap[size];

  const content = (
    <div className={`inline-flex flex-col select-none ${className}`}>
      <img
        src="/logo-citzos.png"
        alt="CITZOS"
        style={{ height: `${h}px` }}
        className="w-auto max-w-full object-contain shrink-0 transition-transform duration-200 hover:scale-102"
        loading="eager"
      />
      {subtitle && (
        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
          {subtitle}
        </span>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="inline-flex cursor-pointer hover:opacity-95 transition-opacity" aria-label="Citzos Home">
        {content}
      </Link>
    );
  }

  return content;
};
