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
  FileText,
  Search,
  X,
  Share2,
  Copy,
  Check,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { useCountry } from '@/context/CountryContext';
import { VERIFIED_HELPLINES } from '@/data/helplines';
import { HelplineCategory, HelplineFacility } from '@/types';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { matchCitizenProblem, ProblemMatchResult } from '@/lib/helplineProblemMatcher';

export default function HelplinePage() {
  const { language, setLanguage } = useTranslation();
  const { country, countryMeta } = useCountry();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [problemQuery, setProblemQuery] = useState<string>('');

  const categoryBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Real-time matched problem resolution
  const matchedProblem = useMemo(() => {
    return matchCitizenProblem(problemQuery);
  }, [problemQuery]);

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

  const QUICK_SITUATION_CHIPS = [
    { labelHi: 'पैसे कट गए / Cyber Fraud (1930)', labelEn: 'Bank / UPI Fraud (1930)', query: 'mere bank se paise cut gaye fraud ho gaya' },
    { labelHi: 'पुलिस / Police Emergency (112)', labelEn: 'Police Emergency (112)', query: 'police emergency crime physical threat' },
    { labelHi: 'महिला सुरक्षा (181)', labelEn: 'Women Safety (181)', query: 'women safety harassment domestic violence' },
    { labelHi: 'तनाव / डिप्रेशन (14416)', labelEn: 'Mental Health (14416)', query: 'depression stress anxiety suicide thoughts' },
    { labelHi: 'ट्रेन समस्या (139)', labelEn: 'Train / RailMadad (139)', query: 'train ticket refund luggage stolen coach ac' },
    { labelHi: 'उपभोक्ता / रिफंड (1915)', labelEn: 'Consumer Dispute (1915)', query: 'shopkeeper fake product refund denied' },
    { labelHi: 'गैस सिलेंडर रिसाव (1906)', labelEn: 'LPG Gas Leak (1906)', query: 'lpg gas cylinder leakage smell' },
    { labelHi: 'कॉलेज रैगिंग (1800-180-5522)', labelEn: 'Anti-Ragging (1800-180-5522)', query: 'college ragging senior bullying' },
    { labelHi: 'आयुष्मान ₹5 लाख इलाज (14555)', labelEn: 'Ayushman Treatment (14555)', query: 'hospital ayushman card admit free treatment' },
    { labelHi: 'मुफ्त सरकारी वकील (15100)', labelEn: 'Free Legal Aid (15100)', query: 'free legal aid lawyer police fir refuse' },
    { labelHi: 'हाइवे दुर्घटना / क्रेन (1033)', labelEn: 'Highway Emergency (1033)', query: 'highway accident vehicle breakdown' },
    { labelHi: 'PF / सैलरी विवाद (14442)', labelEn: 'EPFO / Salary (14442)', query: 'epfo pf withdrawal salary not paid' },
    { labelHi: 'बिजली फॉल्ट (1912)', labelEn: 'Electricity Outage (1912)', query: 'electricity transformer blast power cut' },
    { labelHi: 'किसान फसल नुकसान (1551)', labelEn: 'Kisan Support (1551)', query: 'kisan crop damage fasal bima' },
    { labelHi: 'घायल पशु एम्बुलेंस (1962)', labelEn: 'Animal Ambulance (1962)', query: 'injured stray dog cow accident animal ambulance' },
    { labelHi: 'ब्लड / रक्त आपातकाल (104)', labelEn: 'Blood Emergency (104)', query: 'blood platelets emergency required eraktkosh' }
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

      // If user typed a search query and no high-priority match or alongside it, filter directory
      if (problemQuery.trim()) {
        const q = problemQuery.trim().toLowerCase();
        const numMatch = h.number.replace(/\D/g, '').includes(q.replace(/\D/g, ''));
        const nameMatch = (h.name || '').toLowerCase().includes(q) || (h.nameHi || '').toLowerCase().includes(q);
        const purposeMatch = (h.purpose || '').toLowerCase().includes(q) || (h.purposeHi || '').toLowerCase().includes(q);
        const tagMatch = (h.tags || []).some(t => t.toLowerCase().includes(q));
        return numMatch || nameMatch || purposeMatch || tagMatch;
      }

      return true;
    });
  }, [country, activeCategory, problemQuery]);

  const handleCopyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 3000);
  };

  const handleShareProblem = (prob: ProblemMatchResult) => {
    const isHi = language === 'hi';
    const title = isHi ? prob.problemTitleHi : prob.problemTitleEn;
    const tip = isHi ? prob.goldenHourTipHi : prob.goldenHourTipEn;
    const auth = isHi ? prob.authorityHi : prob.authorityEn;
    const steps = (isHi ? prob.actionStepsHi : prob.actionStepsEn).map((s, idx) => `${idx + 1}. ${s}`).join('\n');
    const text = encodeURIComponent(
      `*सत्यापित सरकारी हेल्पलाइन एवं तत्काल समाधान*\n\n` +
      `*समस्या:* ${title}\n` +
      `*हेल्पलाइन नंबर:* ${prob.helplineNumber} (${prob.operatingHours})\n` +
      `*प्राधिकरण:* ${auth}\n\n` +
      `*गोल्डन आवर निर्देश:*\n${tip}\n\n` +
      `*तत्काल क्या करें:*\n${steps}\n\n` +
      `*आधिकारिक पोर्टल:* ${prob.portalUrl}\n` +
      `*सत्यापित स्रोत:* https://www.citzos.in/helpline`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white flex flex-col antialiased overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* Top Banner Strip - Theme Adaptive */}
      <div className="w-full bg-white dark:bg-[#0c0d12] text-slate-700 dark:text-slate-300 text-[10px] sm:text-[11px] py-1.5 px-3 sm:px-8 border-b border-slate-300 dark:border-zinc-800 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-1.5 sm:gap-2 truncate">
          <span className="text-sm shrink-0">{countryMeta.flag}</span>
          <span className="font-bold text-slate-900 dark:text-white shrink-0">{countryMeta.name}</span>
          <span className="text-slate-400 dark:text-slate-500">•</span>
          <span className="truncate">{language === 'hi' ? '24x7 नागरिक आपातकालीन व सहायता डायरेक्टरी' : '24x7 Citizen Helpline Directory'}</span>
        </div>
        <div className="shrink-0 text-emerald-700 dark:text-emerald-400 font-mono font-bold text-[10px] ml-2">
          {language === 'hi' ? '1-क्लिक कॉल' : '1-CLICK CALL'}
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-[#0c0d12]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 shadow-xs transform translate-z-0">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-3">
            {/* Left: Back Link */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 text-xs font-bold transition-all shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'hi' ? 'मुख्य पृष्ठ' : 'Opportunities'}</span>
              <span className="sm:hidden">{language === 'hi' ? 'वापस' : 'Back'}</span>
            </Link>

            {/* Center: Brand Title */}
            <div className="flex items-center gap-2 min-w-0 flex-1 justify-start">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-sm shrink-0">
                <LifeBuoy className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xs sm:text-base lg:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-none truncate">
                  {language === 'hi' ? 'नागरिक हेल्पलाइन एवं आपातकाल समाधान' : 'Citizen Helpline & Emergency Hub'}
                </h1>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden md:block mt-0.5 truncate">
                  {language === 'hi' ? 'A to Z किसी भी समस्या का तुरंत सत्यापित सरकारी समाधान' : 'Instant statutory helpline & escalation path for any problem'}
                </p>
              </div>
            </div>

            {/* Right: Quick Action Links */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <LanguageSwitcher />
              <Link
                href="/saved"
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-950 dark:text-amber-300 text-xs font-bold border border-amber-300 dark:border-amber-700/60 transition-all shadow-2xs shrink-0 cursor-pointer"
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

        {/* 1. A-TO-Z UNIVERSAL PROBLEM-TO-HELPLINE SEARCH CONSOLE */}
        <div className="relative rounded-3xl p-4 sm:p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 shadow-xl overflow-hidden">
          {/* Subtle Ambient Radial Highlight */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-red-600/15 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-red-400" />
                  <span>{language === 'hi' ? 'तत्काल समाधान इंजन' : 'A-TO-Z PROBLEM MATCHER'}</span>
                </div>
                <h2 className="text-base sm:text-xl lg:text-2xl font-black tracking-tight text-white">
                  {language === 'hi' 
                    ? 'अपनी कोई भी समस्या यहाँ लिखें — तुरंत सही हेल्पलाइन पाएं' 
                    : 'Type Any Problem in Plain Words — Get Instant Statutory Number'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                  {language === 'hi'
                    ? 'बैंक फ्रॉड, पुलिस शिकायत, ट्रेन में विवाद, गैस रिसाव, डिप्रेशन, स्कूल रैगिंग या कोई भी नागरिक समस्या — हिंदी या English में लिखें।'
                    : 'Bank fraud, police help, train issue, gas leak, mental stress, college ragging or any civic dispute — type in your own words.'}
                </p>
              </div>

              <div className="hidden lg:flex items-center gap-2 bg-white/10 px-3 py-2 rounded-2xl border border-white/15 backdrop-blur-sm shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-left text-[11px] leading-tight">
                  <span className="font-extrabold text-white block">100% Pan-India</span>
                  <span className="text-slate-300">Statutory Ministries</span>
                </div>
              </div>
            </div>

            {/* Big Interactive Search Input */}
            <div className="relative flex items-center w-full">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={problemQuery}
                onChange={(e) => setProblemQuery(e.target.value)}
                placeholder={
                  language === 'hi'
                    ? 'उदा. "मेरे खाते से 50000 कट गए फ्रॉड हो गया", "गैस सिलेंडर से स्मेल आ रही है", "ट्रेन में टिकट विवाद"...'
                    : 'e.g. "money debited from bank account fraud", "gas cylinder smell", "senior ragging in college"...'
                }
                className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-800 focus:bg-slate-900 border border-slate-700 focus:border-red-500 text-white placeholder-slate-400 text-xs sm:text-sm font-semibold outline-hidden shadow-inner transition-all"
              />
              {problemQuery && (
                <button
                  type="button"
                  onClick={() => setProblemQuery('')}
                  className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
                  title="Clear"
                  aria-label="Clear Search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick 1-Tap Situation Pills */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-0.5">
                <span>{language === 'hi' ? 'या नीचे दी गई आम समस्याओं पर 1-क्लिक करें:' : 'Or tap a common emergency situation:'}</span>
                {problemQuery && (
                  <button 
                    onClick={() => setProblemQuery('')}
                    className="text-red-400 hover:underline cursor-pointer text-[10px]"
                  >
                    {language === 'hi' ? 'खोज रीसेट करें' : 'Reset search'}
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pr-2 touch-pan-x">
                {QUICK_SITUATION_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setProblemQuery(chip.query)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-slate-200 hover:text-white border border-white/10 text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0"
                  >
                    <span>{language === 'hi' ? chip.labelHi : chip.labelEn}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. DYNAMIC MATCHED PROBLEM CARD (Rendered instantly when problem matches) */}
        {matchedProblem && (
          <div className="rounded-3xl p-5 sm:p-7 bg-gradient-to-br from-red-950 via-slate-900 to-slate-950 text-white border-2 border-red-500/60 shadow-2xl space-y-5 animate-in fade-in slide-in-from-top-3 duration-200">
            {/* Top Match Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-red-500/20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/60 text-red-300 text-xs font-black tracking-wide">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
                <span>{language === 'hi' ? matchedProblem.badgeHi : matchedProblem.badgeEn}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-semibold text-slate-300">{matchedProblem.operatingHours}</span>
              </div>
            </div>

            {/* Problem Title & Issuing Authority */}
            <div className="space-y-1">
              <h3 className="text-lg sm:text-2xl font-black text-white leading-tight">
                {language === 'hi' ? matchedProblem.problemTitleHi : matchedProblem.problemTitleEn}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{language === 'hi' ? matchedProblem.authorityHi : matchedProblem.authorityEn}</span>
              </p>
            </div>

            {/* Big Hero Number & 1-Click Call Section */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
                  {language === 'hi' ? 'सत्यापित आपातकालीन नंबर' : 'OFFICIAL STATUTORY HELPLINE'}
                </span>
                <span className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white block mt-0.5">
                  {matchedProblem.helplineNumber}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={`tel:${matchedProblem.helplineNumber.replace(/\D/g, '')}`}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all text-center cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>{language === 'hi' ? `तुरंत कॉल करें (${matchedProblem.helplineNumber})` : `Call Now (${matchedProblem.helplineNumber})`}</span>
                </a>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleCopyNumber(matchedProblem.helplineNumber)}
                    className="flex-1 sm:flex-none px-3.5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/15 transition-all cursor-pointer"
                    title="Copy Number"
                  >
                    {copiedNumber === matchedProblem.helplineNumber ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{language === 'hi' ? 'कॉपी' : 'Copy'}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleShareProblem(matchedProblem)}
                    className="flex-1 sm:flex-none px-3.5 py-3 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-500/40 transition-all cursor-pointer"
                    title="Share on WhatsApp"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  {matchedProblem.portalUrl && (
                    <a
                      href={matchedProblem.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none px-3.5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/15 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="truncate max-w-[80px] sm:max-w-none">{matchedProblem.portalLabel}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Golden Hour Rule & Immediate Action Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{language === 'hi' ? 'गोल्डन आवर निर्देश' : 'Golden Hour Protocol'}</span>
                </div>
                <p className="text-xs text-amber-100 leading-relaxed font-medium">
                  {language === 'hi' ? matchedProblem.goldenHourTipHi : matchedProblem.goldenHourTipEn}
                </p>
                <div className="text-[11px] text-amber-300/90 pt-1 border-t border-amber-500/20">
                  <strong>{language === 'hi' ? 'सावधानी: ' : 'Caution: '}</strong>
                  <span>{language === 'hi' ? matchedProblem.cautionHi : matchedProblem.cautionEn}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{language === 'hi' ? 'अभी अगले 5 मिनट में क्या करें:' : 'Immediate Action Steps:'}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-200 pl-4 list-decimal marker:text-emerald-400">
                  {(language === 'hi' ? matchedProblem.actionStepsHi : matchedProblem.actionStepsEn).map((step, sIdx) => (
                    <li key={sIdx} className="leading-relaxed">{step}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Secondary Backup Helplines */}
            {matchedProblem.secondaryNumbers && matchedProblem.secondaryNumbers.length > 0 && (
              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold">
                  {language === 'hi' ? 'वैकल्पिक आपातकालीन नंबर:' : 'Alternative Backup Numbers:'}
                </span>
                {matchedProblem.secondaryNumbers.map((sec, secIdx) => (
                  <a
                    key={secIdx}
                    href={`tel:${sec.number.replace(/\D/g, '')}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs border border-white/15 transition-all"
                  >
                    <span>{sec.label}:</span>
                    <strong className="text-emerald-400">{sec.number}</strong>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Top Emergency Hot Bar (Country-Aware Dynamic Emergency Hotlines) */}
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

        {/* 4. Category Filter Section */}
        <div className="bg-white dark:bg-[#101013] rounded-3xl p-3 sm:p-5 border border-slate-200 dark:border-white/10 shadow-sm">
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
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-[#1a1b22] hover:bg-slate-200 dark:hover:bg-[#252630] text-slate-700 dark:text-zinc-300'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{language === 'hi' ? cat.labelHi : cat.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 5. Helplines List Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>
              {filteredHelplines.length} {language === 'hi' ? 'सत्यापित सुविधाएं उपलब्ध' : 'Verified Facilities Available'}
            </span>
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              {language === 'hi' ? 'शत-प्रतिशत टोल-फ्री एवं प्रामाणिक' : '100% Toll-Free Official Directory'}
            </span>
          </div>

          {filteredHelplines.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-[#101013] rounded-3xl border border-slate-200 dark:border-white/10 p-8 space-y-2">
              <AlertTriangle className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                {language === 'hi' ? 'कोई हेल्पलाइन नहीं मिली' : 'No helpline found'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
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
                    className="bg-white dark:bg-[#101013] rounded-2xl p-3.5 sm:p-5 border border-slate-200 dark:border-white/10 shadow-card hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-2.5 sm:space-y-3.5"
                  >
                    <div className="space-y-2">
                      {/* Authority & Status Strip */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 text-[11px] font-bold">
                          <Building2 className="w-3 h-3 text-slate-600 dark:text-zinc-400 shrink-0" />
                          <span className="truncate max-w-[170px] sm:max-w-xs">{authority}</span>
                        </span>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {h.is24x7 && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-[10px] font-extrabold">
                              24x7
                            </span>
                          )}
                          {h.isTollFree && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[10px] font-extrabold">
                              {language === 'hi' ? 'टोल-फ्री' : 'Toll-Free'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Helpline Number & Name */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pt-0.5">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                            {name}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-zinc-300 mt-0.5 leading-relaxed">
                            {purpose}
                          </p>
                        </div>
                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-1 bg-emerald-50/80 dark:bg-emerald-950/30 px-2.5 py-1.5 sm:p-0 rounded-xl sm:bg-transparent shrink-0 border border-emerald-100 dark:border-emerald-900/40 sm:border-0">
                          <span className="text-lg sm:text-2xl font-black font-mono text-emerald-800 dark:text-emerald-400 tracking-tight">
                            {h.number}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{hours}</span>
                          </span>
                        </div>
                      </div>

                      {/* Pre-Call Checklist / Guidance */}
                      {guidanceList && guidanceList.length > 0 && (
                        <div className="rounded-xl bg-slate-50 dark:bg-[#18181f] border border-slate-200/90 dark:border-white/5 text-xs p-2.5">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-zinc-200 mb-1.5">
                            <Lock className="w-3 h-3 text-slate-500 shrink-0" />
                            <span>{language === 'hi' ? 'कॉल पूर्व जरूरी तैयारी एवं मार्गदर्शन' : 'Before you call (Important Guidance)'}</span>
                          </div>
                          <ul className="space-y-1 text-[11px] text-slate-600 dark:text-zinc-400 pl-4 list-disc marker:text-emerald-600">
                            {guidanceList.map((g, idx) => (
                              <li key={idx} className="leading-snug">{g}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Triggers */}
                    <div className="pt-2.5 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex sm:items-center">
                        {h.portalUrl && (
                          <a
                            href={h.portalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 text-xs font-semibold transition-all"
                          >
                            <span>{language === 'hi' ? 'वेब पोर्टल' : 'Official Portal'}</span>
                            <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleCopyNumber(h.number)}
                          className={`px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 text-xs font-semibold transition-all text-center ${!h.portalUrl ? 'col-span-2 sm:col-auto' : ''}`}
                        >
                          {copiedNumber === h.number ? (
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓ Copied</span>
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
