'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import enDict from './locales/en.json';
import hiDict from './locales/hi.json';
import esDict from './locales/es.json';
import frDict from './locales/fr.json';
import deDict from './locales/de.json';
import arDict from './locales/ar.json';
import { SupportedLanguage } from '@/types';

interface TranslationContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (keyPath: string) => string;
}

const dictionaries: Record<SupportedLanguage, any> = {
  en: enDict,
  hi: hiDict,
  es: esDict,
  fr: frDict,
  de: deDict,
  ar: arDict,
};

export function toMathDigits(str: string): string {
  if (!str || typeof str !== 'string') return str;
  return str.replace(/[०-९]/g, (d) => String('०१२३४५६७८९'.indexOf(d)));
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window === 'undefined') return 'en';
    try {
      const saved = localStorage.getItem('citizen_language') as SupportedLanguage;
      if (saved && dictionaries[saved]) {
        return saved;
      }
    } catch (_) {}
    return 'en';
  });

  useEffect(() => {
    const handleSync = (e?: any) => {
      const saved = (e?.detail || (typeof window !== 'undefined' ? localStorage.getItem('citizen_language') : null)) as SupportedLanguage;
      if (saved && dictionaries[saved]) {
        setLanguageState(saved);
        if (typeof document !== 'undefined') {
          document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
          document.documentElement.lang = saved;
        }
      }
    };
    handleSync();
    window.addEventListener('storage', handleSync);
    window.addEventListener('language_changed', handleSync as EventListener);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('language_changed', handleSync as EventListener);
    };
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    if (dictionaries[lang]) {
      setLanguageState(lang);
      try {
        localStorage.setItem('citizen_language', lang);
      } catch (_) {}
      if (typeof document !== 'undefined') {
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('language_changed', { detail: lang }));
      }
    }
  };

  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    let current = dictionaries[language];
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English dictionary if key missing
        let fallback = dictionaries['en'];
        for (const fKey of keys) {
          if (fallback && typeof fallback === 'object' && fKey in fallback) {
            fallback = fallback[fKey];
          } else {
            return keyPath;
          }
        }
        return typeof fallback === 'string' ? toMathDigits(fallback) : keyPath;
      }
    }
    return typeof current === 'string' ? toMathDigits(current) : keyPath;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
