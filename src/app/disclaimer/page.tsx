'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { DISCLAIMER_LOCALES } from '@/data/localization/legalPoliciesData';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

export default function DisclaimerPage() {
  const { language } = useTranslation();
  const d = DISCLAIMER_LOCALES[language] || DISCLAIMER_LOCALES.en;

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
            <span>{d.backHome}</span>
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
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950 via-slate-900 to-emerald-950 text-white shadow-xl border border-amber-500/30">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>{d.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            {d.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            {d.subtitle}
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700">
          
          {/* Bold Core Declaration */}
          <div className="p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-300/80 space-y-2">
            <h2 className="text-sm sm:text-base font-black text-amber-950 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>{d.coreDeclarationTitle}</span>
            </h2>
            <p className="text-xs sm:text-sm text-amber-900 font-medium leading-relaxed">
              {d.coreDeclarationText}
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-2">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                1
              </span>
              <span>{d.sec1Title}</span>
            </h3>
            <p>{d.sec1Intro}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 font-medium text-xs">
              {d.sources.map((s, idx) => (
                <li key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{s.title} ({s.url})</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                2
              </span>
              <span>{d.sec2Title}</span>
            </h3>
            <p>{d.sec2Text}</p>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                3
              </span>
              <span>{d.sec3Title}</span>
            </h3>
            <p>{d.sec3Text}</p>
          </section>

          {/* Official Helplines Link */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-emerald-950">{d.helplineTitle}</p>
              <p className="text-emerald-800 mt-0.5">{d.helplineSub}</p>
            </div>
            <Link
              href="/helpline"
              className="px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shrink-0 transition-colors shadow-2xs"
            >
              {d.helplineBtn}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
