'use client';

import React from 'react';

interface BrandSplashScreenProps {
  message?: string;
}

export const BrandSplashScreen: React.FC<BrandSplashScreenProps> = ({ message }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 selection:bg-emerald-500 selection:text-white antialiased">
      <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="relative flex items-center justify-center">
          {/* Soft ambient emerald backdrop */}
          <div className="absolute w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <img
            src="/logo-shield-transparent.png"
            alt="Citzos"
            width={100}
            height={100}
            className="relative z-10 w-24 sm:w-28 h-auto object-contain drop-shadow-md"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <span className="font-black text-2xl sm:text-3xl tracking-tight text-slate-900 font-sans">
            CIT<span className="text-emerald-600">ZOS</span>
          </span>
          <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase mt-0.5">
            Global Civic & Opportunities Portal
          </span>
        </div>

        {/* Minimal high-tech progress bar */}
        <div className="w-28 h-1 bg-slate-200/90 rounded-full overflow-hidden mt-1 shadow-2xs">
          <div className="w-full h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 rounded-full" />
        </div>

        {message && (
          <p className="text-[11px] font-medium text-slate-500 tracking-wide">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
