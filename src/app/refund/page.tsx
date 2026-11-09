'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, Mail, Clock } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { REFUND_LOCALES } from '@/data/localization/legalPoliciesData';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

export default function RefundPage() {
  const { language } = useTranslation();
  const r = REFUND_LOCALES[language] || REFUND_LOCALES.en;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white antialiased flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-[#0c0d12]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 transform translate-z-0">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{r.backHome}</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/" className="flex items-center hover:opacity-90 transition-opacity" aria-label="Citzos Home">
              <img src="/logo-citzos.png" alt="CITZOS" className="h-7 w-auto object-contain" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 sm:py-12 space-y-8">
        {/* Page Hero */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 text-white shadow-xl border border-emerald-500/30">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-3">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{r.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            {r.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            {r.subtitle}
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">1</span>
              <span>{r.sec1Title}</span>
            </h2>
            <p>{r.sec1Text}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">2</span>
              <span>{r.sec2Title}</span>
            </h2>
            <p>{r.sec2Text1}</p>
            <p>{r.sec2Text2}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">3</span>
              <span>{r.sec3Title}</span>
            </h2>
            <p>{r.sec3Text}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">4</span>
              <span>{r.sec4Title}</span>
            </h2>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>{r.emailLabel}: baliyana434@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{r.hoursLabel}</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
