'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { PRIVACY_LOCALES } from '@/data/localization/legalPoliciesData';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

export default function PrivacyPolicyPage() {
  const { language } = useTranslation();
  const p = PRIVACY_LOCALES[language] || PRIVACY_LOCALES.en;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white antialiased flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 w-full bg-white/98 dark:bg-[#0c0d12]/98 border-b border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{p.backHome}</span>
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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{p.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            {p.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            {p.subtitle}
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700">
          {/* Section 1 */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                1
              </span>
              <span>{p.sec1Title}</span>
            </h2>
            <p>{p.sec1Text}</p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                2
              </span>
              <span>{p.sec2Title}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{p.oauthTitle}</span>
                </h3>
                <p className="text-xs text-slate-600">{p.oauthText}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{p.eligibilityTitle}</span>
                </h3>
                <p className="text-xs text-slate-600">{p.eligibilityText}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs">
              <strong>{p.neverCollectTitle}</strong> {p.neverCollectText}
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                3
              </span>
              <span>{p.sec3Title}</span>
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              {p.sec3Points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                4
              </span>
              <span>{p.sec4Title}</span>
            </h2>
            <p>{p.sec4Text}</p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                5
              </span>
              <span>{p.sec5Title}</span>
            </h2>
            <p>{p.sec5Text}</p>
          </section>

          {/* Section 6 */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                6
              </span>
              <span>{p.sec6Title}</span>
            </h2>
            <p>{p.sec6Text}</p>
          </section>
        </div>
      </main>
    </div>
  );
}
