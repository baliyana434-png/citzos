'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  PhoneCall, 
  ShieldCheck, 
  ArrowLeft, 
  Clock, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  LifeBuoy, 
  ShieldAlert, 
  HeartHandshake, 
  Scale, 
  Building2,
  Lock,
  Star,
  Sparkles,
  FileText
} from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { useCountry } from '@/context/CountryContext';
import { VERIFIED_HELPLINES } from '@/data/helplines';
import { HelplineCategory, HelplineFacility } from '@/types';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';

export default function HelplinePage() {
  const { language, setLanguage } = useTranslation();
  const { country, countryMeta } = useCountry();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const categoryBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Auto-scroll the active category into view horizontally
  useEffect(() => {
    const activeBtn = categoryBtnRefs.current[activeCategory];
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeCategory]);

  const categories = [
    { id: 'all', labelEn: 'All Helplines', labelHi: 'सभी हेल्पलाइन' },
    { id: 'emergency', labelEn: 'Emergency', labelHi: 'आपातकाल' },
    { id: 'cyber_legal', labelEn: 'Cyber & Legal', labelHi: 'साइबर ठगी व कानून' },
    { id: 'women_child', labelEn: 'Women & Child', labelHi: 'महिला व बाल सुरक्षा' },
    { id: 'senior', labelEn: 'Senior Citizens', labelHi: 'वरिष्ठ नागरिक' },
    { id: 'farmer', labelEn: 'Agriculture & Support', labelHi: 'किसान व कृषि सहायता' },
    { id: 'health', labelEn: 'Health & Crisis', labelHi: 'स्वास्थ्य व तनाव' },
    { id: 'citizen_services', labelEn: 'Citizen Services', labelHi: 'नागरिक सेवाएं' },
  ];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'emergency': return <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />;
      case 'cyber_legal': return <Scale className="w-3.5 h-3.5 text-blue-500 shrink-0" />;
      case 'women_child': return <HeartHandshake className="w-3.5 h-3.5 text-pink-500 shrink-0" />;
      case 'senior': return <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case 'farmer': return <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />;
      case 'health': return <Building2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />;
      case 'citizen_services': return <FileText className="w-3.5 h-3.5 text-indigo-500 shrink-0" />;
      default: return <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />;
    }
  };

  const filteredHelplines = useMemo(() => {
    return VERIFIED_HELPLINES.filter((h) => {
      // Strict country filter
      if ((h.country || 'IN') !== country) {
        return false;
      }
      if (activeCategory !== 'all' && h.category !== activeCategory) {
        return false;
      }
      return true;
    });
  }, [country, activeCategory]);

  const handleCopyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white flex flex-col antialiased overflow-x-hidden">
      {/* Top Banner Strip - Theme Adaptive */}
      <div className="w-full bg-white dark:bg-[#0c0d12] text-slate-700 dark:text-slate-300 text-[10px] sm:text-[11px] py-1.5 px-3 sm:px-8 border-b border-slate-300 dark:border-zinc-800 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-1.5 sm:gap-2 truncate">
          <span className="text-sm shrink-0">{countryMeta.flag}</span>
          <span className="font-bold text-slate-900 dark:text-white shrink-0">{countryMeta.name}</span>
          <span className="text-slate-400 dark:text-slate-500">•</span>
          <span className="truncate">{language === 'hi' ? 'नागरिक हेल्पलाइन डायरेक्टरी' : '24x7 Helpline Directory'}</span>
        </div>
        <div className="shrink-0 text-emerald-700 dark:text-emerald-400 font-mono font-bold text-[10px] ml-2">
          {language === 'hi' ? '1-क्लिक कॉल' : '1-CLICK CALL'}
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-30 w-full bg-white/98 dark:bg-[#0c0d12]/98 border-b border-slate-200 dark:border-white/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-3">
            {/* Left: Back Link */}
            <Link
              href="/" prefetch={true}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'hi' ? 'मुख्य पृष्ठ' : 'Opportunities'}</span>
              <span className="sm:hidden">{language === 'hi' ? 'वापस' : 'Back'}</span>
            </Link>

            {/* Center: Brand Title */}
            <div className="flex items-center gap-2 min-w-0 flex-1 justify-start sm:justify-start">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-sm shrink-0">
                <LifeBuoy className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xs sm:text-base lg:text-lg font-black text-slate-900 tracking-tight leading-none truncate">
                  {language === 'hi' ? 'नागरिक हेल्पलाइन एवं सहायता' : 'Citizen Helpline & Emergency Hub'}
                </h1>
                <p className="text-[11px] text-slate-500 hidden md:block mt-0.5 truncate">
                  {language === 'hi' ? 'सरकारी आपातकालीन, कानूनी, साइबर व जन-कल्याण सेवाएं' : 'Government emergency, legal, cyber & welfare hotlines'}
                </p>
              </div>
            </div>

            {/* Right: Quick Action Links */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <LanguageSwitcher />
              <Link
                href="/saved"
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs font-bold border border-amber-300 transition-all shadow-2xs shrink-0 cursor-pointer"
                title={language === 'hi' ? 'पसंदीदा फॉर्म व अवसर' : 'Saved Opportunities'}
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-600 shrink-0" />
                <span className="hidden xs:inline sm:inline">{language === 'hi' ? 'पसंदीदा' : 'Saved'}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Emergency Hot Bar (Country-Aware Dynamic Emergency Hotlines) */}
        {(() => {
          const topCards = filteredHelplines.slice(0, 4);
          if (topCards.length === 0) return null;

          const gradients = [
            'from-red-600 to-rose-700 border-red-500',
            'from-indigo-700 to-blue-800 border-indigo-600',
            'from-emerald-700 to-teal-800 border-emerald-600',
            'from-amber-600 to-orange-700 border-amber-500',
          ];

          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {topCards.map((item, idx) => {
                const grad = gradients[idx % gradients.length];
                const displayName = language === 'hi' ? (item.nameHi || item.name) : item.name;
                const badgeText = item.is24x7 ? '24x7 EMERGENCY' : (language === 'hi' ? 'आधिकारिक सेवा' : 'OFFICIAL HELPLINE');

                return (
                  <div
                    key={item.id}
                    className={`bg-gradient-to-br ${grad} rounded-2xl p-3.5 sm:p-4 text-white shadow-md flex flex-col justify-between border`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider">
                          {badgeText}
                        </span>
                        <LifeBuoy className="w-4 h-4 text-white/80 shrink-0" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black font-mono tracking-tight">{item.number}</h3>
                      <p className="text-xs font-bold text-white/90 mt-0.5 line-clamp-1">
                        {displayName}
                      </p>
                    </div>
                    <a
                      href={`tel:${item.number.replace(/[^0-9+]/g, '')}`}
                      className="mt-3 w-full py-2 px-3 bg-white hover:bg-white/90 text-slate-900 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all text-center"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{language === 'hi' ? `कॉल करें (${item.number})` : `Call ${item.number}`}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* Category Filter Section */}
        <div className="bg-white rounded-3xl p-3 sm:p-5 border border-slate-200 shadow-sm">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pr-4 touch-pan-x scroll-smooth">
            {categories.map((cat) => (
              <button
                key={cat.id}
                ref={(el) => {
                  categoryBtnRefs.current[cat.id] = el;
                }}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{language === 'hi' ? cat.labelHi : cat.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Helplines List Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              {filteredHelplines.length} {language === 'hi' ? 'सत्यापित सुविधाएं उपलब्ध' : 'Verified Facilities Available'}
            </span>
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              {language === 'hi' ? 'शत-प्रतिशत टोल-फ्री एवं प्रामाणिक' : '100% Toll-Free Official Directory'}
            </span>
          </div>

          {filteredHelplines.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
              <AlertTriangle className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                {language === 'hi' ? 'कोई हेल्पलाइन नहीं मिली' : 'No helpline found'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'hi' ? 'कृपया अन्य शब्द या श्रेणी चुनकर खोजें।' : 'Please try searching with another keyword or category.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {filteredHelplines.map((h) => {
                const name = language === 'hi' ? h.nameHi : h.name;
                const authority = language === 'hi' ? h.authorityHi : h.authority;
                const purpose = language === 'hi' ? h.purposeHi : h.purpose;
                const hours = language === 'hi' ? h.hoursHi : h.hours;
                const guidanceList = language === 'hi' ? h.guidanceHi : h.guidance;

                return (
                  <div
                    key={h.id}
                    className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200 shadow-card hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-2.5 sm:space-y-3.5"
                  >
                    <div className="space-y-2">
                      {/* Authority & Status Strip */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-[11px] font-bold">
                          <Building2 className="w-3 h-3 text-slate-600 shrink-0" />
                          <span className="truncate max-w-[170px] sm:max-w-xs">{authority}</span>
                        </span>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {h.is24x7 && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-extrabold">
                              24x7
                            </span>
                          )}
                          {h.isTollFree && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-[10px] font-extrabold">
                              {language === 'hi' ? 'टोल-फ्री' : 'Toll-Free'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Helpline Number & Name - Responsive Mobile-Friendly Arrangement */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pt-0.5">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                            {name}
                          </h3>
                          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                            {purpose}
                          </p>
                        </div>
                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-1 bg-emerald-50/80 px-2.5 py-1.5 sm:p-0 rounded-xl sm:bg-transparent shrink-0 border border-emerald-100 sm:border-0">
                          <span className="text-lg sm:text-2xl font-black font-mono text-emerald-800 tracking-tight">
                            {h.number}
                          </span>
                          <span className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{hours}</span>
                          </span>
                        </div>
                      </div>

                      {/* Clean Pre-Call Checklist / Guidance (Directly visible without collapsing) */}
                      {guidanceList && guidanceList.length > 0 && (
                        <div className="rounded-xl bg-slate-50 border border-slate-200/90 text-xs p-2.5">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 mb-1.5">
                            <Lock className="w-3 h-3 text-slate-500 shrink-0" />
                            <span>{language === 'hi' ? 'कॉल पूर्व जरूरी तैयारी एवं मार्गदर्शन' : 'Before you call (Important Guidance)'}</span>
                          </div>
                          <ul className="space-y-1 text-[11px] text-slate-600 pl-4 list-disc marker:text-emerald-600">
                            {guidanceList.map((g, idx) => (
                              <li key={idx} className="leading-snug">{g}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Triggers (Responsive Grid: Zero Colliding/Overlapping, Full Accessibility on Mobile) */}
                    <div className="pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex sm:items-center">
                        {h.portalUrl && (
                          <a
                            href={h.portalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
                          >
                            <span>{language === 'hi' ? 'वेब पोर्टल' : 'Official Portal'}</span>
                            <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleCopyNumber(h.number)}
                          className={`px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all text-center ${!h.portalUrl ? 'col-span-2 sm:col-auto' : ''}`}
                        >
                          {copiedNumber === h.number ? (
                            <span className="text-emerald-700 font-bold">✓ Copied</span>
                          ) : (
                            language === 'hi' ? 'कॉपी करें' : 'Copy'
                          )}
                        </button>
                      </div>

                      <a
                        href={`tel:${h.number.replace(/-/g, '')}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-all active:scale-[0.98]"
                      >
                        <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                        <span>{language === 'hi' ? `तुरंत कॉल करें (${h.number})` : `Call Now (${h.number})`}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
