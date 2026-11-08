'use client';

import React from 'react';

interface BrandSplashScreenProps {
  message?: string;
}

export const BrandSplashScreen: React.FC<BrandSplashScreenProps> = ({ message }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0b0e] flex flex-col items-center justify-center p-4 selection:bg-emerald-500 selection:text-white antialiased">
      <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="relative flex items-center justify-center">
          {/* Soft ambient emerald backdrop */}
          <div className="absolute w-56 h-36 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <img
            src="/brand-logo-full.png"
            alt="CITZOS - Global Civic & Opportunities Portal"
            width={280}
            height={96}
            className="relative z-10 w-64 sm:w-72 h-auto object-contain drop-shadow-md"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Minimal high-tech progress bar */}
        <div className="w-28 h-1 bg-slate-200/90 dark:bg-white/10 rounded-full overflow-hidden mt-1 shadow-2xs">
          <div className="w-full h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 rounded-full animate-pulse" />
        </div>

        {message && (
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wide">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
