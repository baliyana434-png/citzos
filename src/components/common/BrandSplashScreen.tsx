'use client';

import React, { useState } from 'react';

interface BrandSplashScreenProps {
  message?: string;
}

export const BrandSplashScreen: React.FC<BrandSplashScreenProps> = ({ message }) => {
  const [imgSrc, setImgSrc] = useState<string>('/brand-logo-full.png');
  const [imgFailed, setImgFailed] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0b0e] flex flex-col items-center justify-center p-4 selection:bg-emerald-500 selection:text-white antialiased">
      <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-200">
        <div className="relative flex items-center justify-center min-h-[96px]">
          {/* Soft ambient emerald backdrop */}
          <div className="absolute w-56 h-36 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          
          {!imgFailed ? (
            <img
              src={imgSrc}
              alt="CITZOS - Global Civic & Opportunities Portal"
              width={280}
              height={96}
              className="relative z-10 w-64 sm:w-72 h-auto object-contain drop-shadow-md select-none"
              loading="eager"
              decoding="sync"
              onError={() => {
                if (imgSrc === '/brand-logo-full.png') {
                  setImgSrc('/logo-citzos.png');
                } else {
                  setImgFailed(true);
                }
              }}
            />
          ) : (
            <div className="relative z-10 flex items-center gap-2.5 px-4 py-2 select-none">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-lg shadow-md">
                C
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-mono">
                CITZ<span className="text-emerald-600 dark:text-emerald-400">[OS]</span>
              </span>
            </div>
          )}
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
