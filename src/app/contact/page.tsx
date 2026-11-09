'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { CONTACT_LOCALES } from '@/data/localization/legalPoliciesData';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

export default function ContactPage() {
  const { language } = useTranslation();
  const c = CONTACT_LOCALES[language] || CONTACT_LOCALES.en;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white antialiased flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-[#0c0d12]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{c.backHome}</span>
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
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{c.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            {c.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            {c.subtitle}
          </p>
        </div>

        {/* Verified Support Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">{c.emailCardTitle}</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {c.emailCardDesc}
            </p>
          </div>
          <div>
            <a
              href="mailto:baliyana434@gmail.com"
              className="inline-flex items-center gap-2 font-mono font-bold text-sm sm:text-base text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 rounded-xl border border-emerald-200 transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>baliyana434@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Operating Hours & Address */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 text-xs sm:text-sm text-slate-700">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{c.hoursTitle}</h4>
              <p className="text-slate-600 mt-0.5 whitespace-pre-line">
                {c.hoursDesc}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{c.officeTitle}</h4>
              <p className="text-slate-600 mt-0.5 whitespace-pre-line">
                {c.officeDesc}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{c.grievanceTitle}</h4>
              <p className="text-slate-600 mt-0.5">
                {c.grievanceDesc}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
