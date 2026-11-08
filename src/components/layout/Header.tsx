'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Landmark, Search, PhoneCall, Star, User, Globe, LogIn, UserPlus, LogOut, GraduationCap, X, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { useCountry } from '@/context/CountryContext';
import { CitizenProfile, SupportedLanguage } from '@/types';

interface HeaderProps {
  profile: CitizenProfile;
  onOpenAuth?: () => void;
  onOpenProfile: () => void;
  onOpenOnboarding?: () => void;
  onLogout?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  favoriteCount?: number;
  onOpenFavorites?: () => void;
  isFavoritesActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenAuth,
  onOpenProfile,
  onOpenOnboarding,
  onLogout,
  searchQuery = '',
  onSearchChange,
  favoriteCount = 0,
}) => {
  const { t, language, setLanguage } = useTranslation();
  const { country, countryMeta } = useCountry();
  const [liveFavCount, setLiveFavCount] = useState<number>(favoriteCount);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      try {
        const saved = localStorage.getItem('citizen_favorites');
        if (saved) {
          setLiveFavCount(JSON.parse(saved).length);
        } else {
          setLiveFavCount(0);
        }
      } catch (e) {
        setLiveFavCount(0);
      }
    };
    updateCount();
    window.addEventListener('storage', updateCount);
    window.addEventListener('favorites_updated', updateCount);
    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('favorites_updated', updateCount);
    };
  }, [favoriteCount]);

  const languages: { code: SupportedLanguage; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ar', label: 'العربية' },
  ];

  const handleCloseMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setTimeout(() => {
      const el = document.getElementById('opportunity-results');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  return (
    <header className="sticky top-0 z-30 w-full glass-header transition-all relative">
      {/* Mobile Full-Width Search Bar Overlay (Covers Header completely for effortless typing) */}
      {isMobileSearchOpen && (
        <div className="absolute inset-0 bg-white dark:bg-black px-3 flex items-center gap-2 z-50 sm:hidden animate-in fade-in duration-100">
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(false)}
            className="p-1.5 rounded-xl text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-[#18181c] shrink-0"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-zinc-200" />
          </button>
          <div className="flex-1 relative flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.currentTarget.blur();
                  handleCloseMobileSearch();
                }
              }}
              placeholder={t('search_placeholder')}
              className="w-full pl-9 pr-8 py-2 text-sm bg-slate-100 dark:bg-[#141417] focus:bg-white dark:focus:bg-[#18181c] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 rounded-xl border border-slate-300 dark:border-white/10 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange?.('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={handleCloseMobileSearch}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-xl shrink-0 transition-all cursor-pointer"
          >
            {language === 'hi' ? 'ठीक है' : 'Done'}
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-3">
          
          {/* 1. App Identity - Official CITZ [OS] Brand Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/" className="flex items-center group cursor-pointer block hover:opacity-95 transition-opacity" aria-label="Citzos Home">
              <img
                src="/logo-citzos.png"
                alt="CITZOS"
                width={130}
                height={34}
                className="h-7 sm:h-8 md:h-8.5 w-auto object-contain transition-transform group-hover:scale-102"
                loading="eager"
              />
            </Link>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden xl:block whitespace-nowrap border-l border-slate-200 dark:border-white/10 pl-2 ml-0.5">
              {t('app_tagline')}
            </p>
          </div>

          {/* 2. Instant Search Bar (Desktop: inline full search) */}
          <div className="hidden sm:block flex-1 sm:max-w-xs md:max-w-md mx-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur();
                  }
                }}
                placeholder={t('search_placeholder')}
                className="w-full pl-9 pr-8 py-2 text-sm bg-slate-100 dark:bg-[#141417] hover:bg-slate-100/90 dark:hover:bg-[#18181c] focus:bg-white dark:focus:bg-[#18181c] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 rounded-full border border-slate-200 dark:border-white/10 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange?.('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 3. Action Hub (Compact targets on mobile, 0 overflow, clean ordered pills) */}
          <div className="flex items-center gap-1 sm:gap-2 flex-1 sm:flex-initial justify-end">
            {/* Mobile Search Button (Stretched Pill) */}
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(true)}
              className="sm:hidden flex-1 min-w-[58px] max-w-[88px] h-8 px-2 rounded-xl bg-slate-100 dark:bg-[#141417] hover:bg-slate-200 dark:hover:bg-[#1c1c20] border border-slate-200 dark:border-white/10 flex items-center justify-center gap-1 text-slate-700 dark:text-zinc-200 transition-all cursor-pointer shrink shadow-2xs"
              title={t('search_placeholder')}
              aria-label={t('search_placeholder')}
            >
              <Search className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400 shrink-0" />
              <span className="text-[11px] font-black text-slate-800 dark:text-white whitespace-nowrap tracking-tight">
                {language === 'hi' ? 'खोजें' : 'Search'}
              </span>
            </button>

            {/* Skills & Video Learning Navigation Link (Stretched Pill on Mobile, Pill on Desktop) */}
            <Link
              href="/skills"
              className="flex-1 sm:flex-initial min-w-[70px] sm:min-w-0 max-w-[98px] sm:max-w-none h-8 sm:h-9 px-1.5 sm:px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 font-extrabold text-[11px] sm:text-xs transition-all shrink-0 inline-flex items-center justify-center gap-1 sm:gap-1.5 shadow-2xs"
              title={language === 'hi' ? 'कौशल सीखें (शीर्ष 3 यूट्यूब वीडियोज)' : 'Skills Hub (Top 3 YouTube Masterclasses)'}
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span className="whitespace-nowrap tracking-tight font-black">
                {language === 'hi' ? 'कौशल' : 'Skill Hub'}
              </span>
            </Link>

            {/* Language Switcher Dropdown - Desktop only */}
            <div className="relative hidden md:inline-flex shrink-0">
              <button
                onClick={() => {
                  setIsLangMenuOpen(!isLangMenuOpen);
                }}
                className="h-9 inline-flex items-center gap-1.5 px-2.5 rounded-xl bg-slate-100 dark:bg-[#141417] hover:bg-slate-200/80 dark:hover:bg-[#1c1c20] border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-zinc-200 transition-all cursor-pointer shrink-0"
                title={t('settings.language_label')}
              >
                <Globe className="w-3.5 h-3.5 text-slate-600 dark:text-zinc-400 shrink-0" />
                <span className="text-[11px] uppercase font-mono">{language}</span>
              </button>

              {isLangMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-1.5 w-40 bg-white dark:bg-[#121215] rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-1 border-b border-slate-100 dark:border-white/5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-400">
                      {t('settings.language_label')}
                    </div>
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                          language === l.code
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-300 font-bold'
                            : 'text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-[#18181c]'
                        }`}
                      >
                        <span>{l.label}</span>
                        <span className="text-[10px] uppercase text-slate-400 font-mono">{l.code}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Helpline Navigation Link */}
            <Link
              href="/helpline"
              className="h-8 w-8 sm:h-9 sm:w-auto inline-flex items-center justify-center sm:px-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-900 text-xs font-bold border border-red-200 transition-all shrink-0 shadow-2xs"
              title={language === 'hi' ? '24x7 हेल्पलाइन' : '24x7 Helplines'}
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-700 shrink-0" />
              <span className="hidden md:inline ml-1.5 whitespace-nowrap">{language === 'hi' ? 'हेल्पलाइन' : 'Helpline'}</span>
            </Link>

            {/* Favourites / Saved Navigation Button */}
            <Link
              href="/saved"
              className="h-8 w-8 sm:h-9 sm:w-auto inline-flex items-center justify-center sm:px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-bold text-xs transition-all shrink-0 relative shadow-2xs"
              title={language === 'hi' ? 'सहेजे गए अवसर' : 'Saved Opportunities'}
            >
              <Star className={`w-3.5 h-3.5 ${liveFavCount > 0 ? 'fill-amber-400 text-amber-600' : 'text-amber-600'} shrink-0`} />
              <span className="hidden md:inline ml-1.5 whitespace-nowrap">{t('subfilters.favorites').split(' ')[0]}</span>
              {liveFavCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:static sm:ml-1.5 px-1 sm:px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[9px] sm:text-[10px] font-black">
                  {liveFavCount}
                </span>
              )}
            </Link>

            {/* Single Profile Button (Zero Overflow on Mobile) */}
            <button
              type="button"
              onClick={onOpenProfile}
              className="h-8 w-8 sm:h-9 sm:w-auto p-0 sm:pl-1 sm:pr-3 rounded-full border border-slate-300 dark:border-zinc-700 bg-white dark:bg-[#121318] hover:bg-slate-100 dark:hover:bg-[#1c1d24] text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center sm:gap-2 transition-all focus:ring-2 focus:ring-emerald-500/30 relative overflow-hidden cursor-pointer shrink-0 shadow-2xs active:scale-[0.98]"
              aria-label={t('profile_btn')}
            >
              <div className="w-full h-full sm:w-7 sm:h-7 rounded-full bg-slate-900 dark:bg-zinc-800 text-white flex items-center justify-center text-xs font-bold overflow-hidden shrink-0">
                {profile.photoURL ? (
                  <img
                    src={profile.photoURL}
                    alt={profile.fullName || 'User'}
                    referrerPolicy="no-referrer"
                    decoding="async"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : profile.fullName ? (
                  profile.fullName.charAt(0).toUpperCase()
                ) : (
                  <User className="w-4 h-4 text-slate-300" />
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold max-w-[80px] truncate">
                {profile.fullName ? profile.fullName.split(' ')[0] : t('profile_btn')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
