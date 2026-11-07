'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  ArrowLeft, 
  Search, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  FileCheck, 
  Download, 
  User, 
  Sparkles,
  PhoneCall,
  Info,
  Star
} from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { useCountry } from '@/context/CountryContext';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { INITIAL_OPPORTUNITIES } from '@/data/opportunities';
import { LiveFeedService } from '@/services/liveFeedService';
import { Opportunity, CitizenProfile } from '@/types';
import { resolveOfficialPortalUrl } from '@/lib/officialPortalResolver';

// Guest Citizen Profile (No dummy/fake data)
const GUEST_PROFILE: CitizenProfile = {
  id: 'cit-guest',
  fullName: '',
  phoneNumber: '',
  aadhaarNumberMasked: '',
  isAadhaarVerified: false,
  isOnboarded: false,
  age: 0,
  dob: '',
  gender: 'male',
  state: '',
  district: '',
  pincode: '',
  lifePhase: 'college_student',
  casteCategory: 'General',
  familyIncomeAnnual: 0,
  educationLevel: '12th_pass',
  activeGoal: '',
  notificationsEnabled: {
    webPush: false,
    whatsApp: false,
    urgentDeadlinesOnly: false,
  },
};

export default function FormsPage() {
  const router = useRouter();
  const { language, setLanguage } = useTranslation();
  const { country, countryMeta } = useCountry();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [profile, setProfile] = useState<CitizenProfile>(GUEST_PROFILE);

  // Combine initial catalog with live-synced crawler circulars (e.g. IBPS RRB CRP-XV active now)
  const ALL_OPPORTUNITIES = useMemo(() => {
    const seen = new Set<string>();
    const list: Opportunity[] = [];
    for (const opp of [...INITIAL_OPPORTUNITIES, ...LiveFeedService.LIVE_INTERNET_CIRCULARS]) {
      if (!seen.has(opp.id)) {
        seen.add(opp.id);
        list.push(opp);
      }
    }
    return list;
  }, []);

  // Safe client mount hydration for citizen_profile and citizen_favorites
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set<string>());

  useEffect(() => {
    try {
      const isLoggedOut = localStorage.getItem('citizen_logged_out');
      const savedProfile = localStorage.getItem('citizen_profile');
      if (isLoggedOut === 'true' || !savedProfile) {
        router.replace('/login');
        return;
      }
      const parsed = JSON.parse(savedProfile);
      if (!parsed || parsed.id === 'cit-guest' || (!parsed.isAadhaarVerified && !parsed.isOnboarded)) {
        router.replace('/login');
        return;
      }
      setProfile(parsed);

      const savedFavorites = localStorage.getItem('citizen_favorites');
      if (savedFavorites) {
        setFavoriteIds(new Set(JSON.parse(savedFavorites)));
      }
    } catch (e) {
      router.replace('/login');
    }
  }, [router]);

  // Listen to storage and custom favorites_updated events
  useEffect(() => {
    const handleStorageUpdate = () => {
      try {
        const savedProfile = localStorage.getItem('citizen_profile');
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        }
        const savedFavorites = localStorage.getItem('citizen_favorites');
        if (savedFavorites) {
          setFavoriteIds(new Set(JSON.parse(savedFavorites)));
        } else {
          setFavoriteIds(new Set());
        }
      } catch (e) {}
    };

    window.addEventListener('storage', handleStorageUpdate);
    window.addEventListener('favorites_updated', handleStorageUpdate);
    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener('favorites_updated', handleStorageUpdate);
    };
  }, []);

  const handleToggleFavorite = (oppId: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      const isAdding = !next.has(oppId);
      if (isAdding) {
        next.add(oppId);
      } else {
        next.delete(oppId);
      }
      try {
        localStorage.setItem('citizen_favorites', JSON.stringify(Array.from(next)));
        window.dispatchEvent(new Event('favorites_updated'));
      } catch (e) {}
      return next;
    });
  };

  // Filter only opportunities with ACTIVE forms right now
  const activeForms = useMemo(() => {
    return ALL_OPPORTUNITIES.filter((opp) => {
      // Must be active registration now
      if (opp.applicationStatus !== 'active_now') return false;

      // Strict country match with Study Abroad exception
      const isStudyAbroad = opp.lifeStage === 'abroad_jobs' || opp.category === 'study_abroad';
      if (!isStudyAbroad && opp.country && opp.country !== country) return false;

      // Filter by category
      if (activeCategory === 'favorites' && !favoriteIds.has(opp.id)) return false;
      if (activeCategory !== 'all' && activeCategory !== 'favorites') {
        if (activeCategory === 'exams' && opp.lifeStage !== 'exams') return false;
        if (activeCategory === 'private_jobs' && opp.lifeStage !== 'private_jobs') return false;
        if (activeCategory === 'internships' && opp.lifeStage !== 'internships') return false;
        if (activeCategory === 'schemes' && opp.lifeStage !== 'schemes') return false;
        if (activeCategory === 'education' && opp.lifeStage !== 'education') return false;
        if (activeCategory === 'abroad' && !isStudyAbroad) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = opp.title.toLowerCase().includes(q) || opp.titleHi.includes(q);
        const matchAuth = opp.gazette?.issuingAuthority?.toLowerCase().includes(q);
        const matchBenefit = (opp.benefitHeadline?.toLowerCase().includes(q) || opp.benefitHeadlineHi?.includes(q));
        const matchTags = opp.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchAuth && !matchTags && !matchBenefit) return false;
      }

      return true;
    });
  }, [ALL_OPPORTUNITIES, activeCategory, searchQuery, favoriteIds, country]);

  const copyToClipboard = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const countryOpportunities = useMemo(() => {
    return ALL_OPPORTUNITIES.filter(o => {
      if (o.applicationStatus !== 'active_now') return false;
      const isStudyAbroad = o.lifeStage === 'abroad_jobs' || o.category === 'study_abroad';
      return isStudyAbroad || !o.country || o.country === country;
    });
  }, [ALL_OPPORTUNITIES, country]);

  const formCategories = [
    { id: 'all', labelEn: 'All Open Forms', labelHi: 'सभी चालू फॉर्म', count: countryOpportunities.length },
    { id: 'favorites', labelEn: 'Saved Forms', labelHi: 'पसंदीदा फॉर्म', count: countryOpportunities.filter(o => favoriteIds.has(o.id)).length },
    { id: 'exams', labelEn: 'Govt Exams', labelHi: 'सरकारी परीक्षा', count: countryOpportunities.filter(o => o.lifeStage === 'exams').length },
    { id: 'private_jobs', labelEn: 'Private Hiring', labelHi: 'प्राइवेट जॉब भर्ती', count: countryOpportunities.filter(o => o.lifeStage === 'private_jobs').length },
    { id: 'internships', labelEn: 'Internships', labelHi: 'इंटर्नशिप', count: countryOpportunities.filter(o => o.lifeStage === 'internships').length },
    { id: 'schemes', labelEn: 'Govt Schemes', labelHi: 'सरकारी योजनाएं', count: countryOpportunities.filter(o => o.lifeStage === 'schemes').length },
    { id: 'abroad', labelEn: 'Study & Work Abroad', labelHi: 'विदेश में पढ़ाई व अवसर', count: countryOpportunities.filter(o => o.lifeStage === 'abroad_jobs' || o.category === 'study_abroad').length },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* Top Banner Strip - Theme Adaptive */}
      <div className="w-full bg-white dark:bg-[#0c0d12] text-slate-700 dark:text-slate-300 text-[11px] py-1.5 px-4 sm:px-8 border-b border-slate-300 dark:border-zinc-800 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            {language === 'hi' ? 'सक्रिय ऑनलाइन फॉर्म फिलिंग डैशबोर्ड' : 'OFFICIAL ACTIVE ONLINE REGISTRATIONS DASHBOARD'}
          </span>
          <span className="text-slate-600 hidden md:inline">•</span>
          <span className="text-slate-400 text-[10px] hidden md:inline">
            {language === 'hi' ? 'सीधे आधिकारिक पोर्टल्स के सत्यापित आवेदन लिंक' : 'Direct Verified Registration Portals'}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="text-emerald-400 font-mono font-bold">100% VERIFIED URLS</span>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'hi' ? 'मुख्य पृष्ठ' : 'Opportunities'}</span>
              </Link>
              <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none">
                    {language === 'hi' ? 'ऑनलाइन फॉर्म फिलिंग डैशबोर्ड' : 'Form Fill & Registration Dashboard'}
                  </h1>
                  <p className="text-[11px] text-slate-500 hidden sm:block mt-0.5">
                    {language === 'hi' ? 'चालू आवेदन, दस्तावेज़ तैयारी व सीधा फॉर्म लिंक' : 'Currently open applications, ready documents & portal links'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="flex items-center gap-2">
              <Link
                href="/saved"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs font-bold border border-amber-300 transition-all shadow-2xs"
                title={language === 'hi' ? 'पसंदीदा फॉर्म व अवसर' : 'Saved Opportunities'}
              >
                <Star className={`w-3.5 h-3.5 ${favoriteIds.size > 0 ? 'fill-amber-400 text-amber-600' : 'text-amber-600'}`} />
                <span>{language === 'hi' ? 'पसंदीदा' : 'Saved'}</span>
                {favoriteIds.size > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-black">
                    {favoriteIds.size}
                  </span>
                )}
              </Link>

              <Link
                href="/helpline"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-800 text-xs font-bold border border-red-200 transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? '24x7 हेल्पलाइन' : '24x7 Helplines'}</span>
              </Link>

              {/* 6-Language Switcher */}
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 1. Applicant Profile Quick-Copy Toolbar (Solves typos in official portals) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>{language === 'hi' ? 'आवेदक त्वरित विवरण (1-क्लिक कॉपी टूल)' : 'Applicant Quick Details (1-Click Copy Tool)'}</span>
                  <span className="text-xs font-semibold text-slate-500">
                    ({countryMeta.flag} {countryMeta.name})
                  </span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  {language === 'hi'
                    ? 'सरकारी पोर्टल पर फॉर्म भरते समय बिना गलती किए सीधे कॉपी और पेस्ट करें'
                    : 'Click any chip to copy exact details without typos while filling official forms'}
                </p>
              </div>
            </div>
            {profile.isAadhaarVerified ? (
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-medium">
                ✓ {language === 'hi' ? 'सत्यापित नागरिक प्रोफाइल' : 'Verified Citizen Profile'}
              </span>
            ) : (
              <span className="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 font-medium">
                {language === 'hi' ? 'अतिथि मोड (लॉगिन आवश्यक)' : 'Guest Mode (Login required)'}
              </span>
            )}
          </div>

          {!profile.isAadhaarVerified ? (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    {language === 'hi' ? '1-क्लिक फॉर्म कॉपी टूल सक्रिय करें' : 'Enable 1-Click Form Autofill'}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {language === 'hi'
                      ? 'अपने पंजीकृत नागरिक खाते में लॉगिन करें ताकि आपके वास्तविक विवरण (नाम, पहचान पत्र, जन्म तिथि) यहाँ कॉपी करने हेतु उपलब्ध हो सकें।'
                      : 'Sign in to access your authentic details (name, national ID, DOB) for 1-click clipboard copying.'}
                  </p>
                </div>
              </div>
              <Link
                href="/"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 transition-all shadow-xs"
              >
                {language === 'hi' ? 'लॉगिन / साइन अप करें' : 'Login / Sign Up'}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {/* Full Name */}
              {profile.fullName && (
                <button
                  onClick={() => copyToClipboard(profile.fullName, 'name')}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all group flex flex-col justify-between cursor-pointer"
                >
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">
                    {language === 'hi' ? 'पूरा नाम' : 'Full Name'}
                  </span>
                  <span className="text-xs font-bold text-slate-900 truncate block mt-0.5">
                    {profile.fullName}
                  </span>
                  <span className="text-[10px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                    {copiedField === 'name' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 opacity-60" />}
                    {copiedField === 'name' ? (language === 'hi' ? 'कॉपी हुआ' : 'Copied') : (language === 'hi' ? 'कॉपी' : 'Copy')}
                  </span>
                </button>
              )}

              {/* National ID */}
              {(profile.nationalIdMasked || profile.aadhaarNumberMasked) && (
                <button
                  onClick={() => copyToClipboard(profile.nationalIdMasked || profile.aadhaarNumberMasked || '', 'natId')}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all group flex flex-col justify-between cursor-pointer"
                >
                  <span className="text-[10px] text-slate-500 block uppercase font-medium truncate">
                    {countryMeta.nationalIdName}
                  </span>
                  <span className="text-xs font-bold text-slate-900 truncate block mt-0.5 font-mono">
                    {profile.nationalIdMasked || profile.aadhaarNumberMasked}
                  </span>
                  <span className="text-[10px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                    {copiedField === 'natId' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 opacity-60" />}
                    {copiedField === 'natId' ? (language === 'hi' ? 'कॉपी हुआ' : 'Copied') : (language === 'hi' ? 'कॉपी' : 'Copy')}
                  </span>
                </button>
              )}

              {/* Date of Birth */}
              {profile.dob && (
                <button
                  onClick={() => copyToClipboard(profile.dob || '', 'dob')}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all group flex flex-col justify-between cursor-pointer"
                >
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">
                    {language === 'hi' ? 'जन्म तिथि' : 'DOB (YYYY-MM-DD)'}
                  </span>
                  <span className="text-xs font-bold text-slate-900 truncate block mt-0.5 font-mono">
                    {profile.dob}
                  </span>
                  <span className="text-[10px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                    {copiedField === 'dob' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 opacity-60" />}
                    {copiedField === 'dob' ? (language === 'hi' ? 'कॉपी हुआ' : 'Copied') : (language === 'hi' ? 'कॉपी' : 'Copy')}
                  </span>
                </button>
              )}

              {/* Email Address */}
              {profile.email && (
                <button
                  onClick={() => copyToClipboard(profile.email || '', 'email')}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all group flex flex-col justify-between cursor-pointer"
                >
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">
                    {language === 'hi' ? 'ईमेल पता' : 'Email Address'}
                  </span>
                  <span className="text-xs font-bold text-slate-900 truncate block mt-0.5 font-mono">
                    {profile.email}
                  </span>
                  <span className="text-[10px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                    {copiedField === 'email' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 opacity-60" />}
                    {copiedField === 'email' ? (language === 'hi' ? 'कॉपी हुआ' : 'Copied') : (language === 'hi' ? 'कॉपी' : 'Copy')}
                  </span>
                </button>
              )}

              {/* State / Province */}
              {(profile.state || profile.administrativeDivision) && (
                <button
                  onClick={() => copyToClipboard(profile.administrativeDivision || profile.state || '', 'address')}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all group flex flex-col justify-between cursor-pointer"
                >
                  <span className="text-[10px] text-slate-500 block uppercase font-medium truncate">
                    {countryMeta.administrativeLabel}
                  </span>
                  <span className="text-xs font-bold text-slate-900 truncate block mt-0.5">
                    {profile.administrativeDivision || profile.state}
                  </span>
                  <span className="text-[10px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                    {copiedField === 'address' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 opacity-60" />}
                    {copiedField === 'address' ? (language === 'hi' ? 'कॉपी हुआ' : 'Copied') : (language === 'hi' ? 'कॉपी' : 'Copy')}
                  </span>
                </button>
              )}

              {/* Postal Code / ZIP */}
              {profile.pincode && (
                <button
                  onClick={() => copyToClipboard(profile.pincode, 'pincode')}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all group flex flex-col justify-between cursor-pointer"
                >
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">
                    {country === 'US' ? 'ZIP Code' : country === 'GB' ? 'Postcode' : (language === 'hi' ? 'पिनकोड' : 'Postal Code')}
                  </span>
                  <span className="text-xs font-bold text-slate-900 truncate block mt-0.5 font-mono">
                    {profile.pincode}
                  </span>
                  <span className="text-[10px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                    {copiedField === 'pincode' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 opacity-60" />}
                    {copiedField === 'pincode' ? (language === 'hi' ? 'कॉपी हुआ' : 'Copied') : (language === 'hi' ? 'कॉपी' : 'Copy')}
                  </span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* 2. Document Readiness Requirements Box (Zero Cartoon Emojis) */}
        <div className="bg-emerald-950 text-white rounded-3xl p-5 border border-emerald-800 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              {language === 'hi' ? 'फॉर्म भरने से पहले आवश्यक सरकारी दस्तावेज़' : 'Mandatory Required Documents'}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="bg-white/10 rounded-xl p-3 border border-white/10">
              <span className="font-bold text-emerald-300 block mb-0.5">1. Passport Photo</span>
              <span className="text-emerald-100/80 text-[11px]">
                {language === 'hi' ? 'सफेद बैकग्राउंड, JPG प्रारूप (< 50 KB)' : 'White background, JPG format (< 50 KB)'}
              </span>
            </div>
            <div className="bg-white/10 rounded-xl p-3 border border-white/10">
              <span className="font-bold text-emerald-300 block mb-0.5">2. Signature Scan</span>
              <span className="text-emerald-100/80 text-[11px]">
                {language === 'hi' ? 'काली स्याही से सादे कागज पर (< 20 KB)' : 'Black ink on white plain paper (< 20 KB)'}
              </span>
            </div>
            <div className="bg-white/10 rounded-xl p-3 border border-white/10">
              <span className="font-bold text-emerald-300 block mb-0.5">3. Academic Certificates</span>
              <span className="text-emerald-100/80 text-[11px]">
                {language === 'hi' ? 'जन्मतिथि प्रमाण व अंकतालिका PDF (< 200 KB)' : 'Proof of Date of Birth & Marks in PDF (< 200 KB)'}
              </span>
            </div>
            <div className="bg-white/10 rounded-xl p-3 border border-white/10">
              <span className="font-bold text-emerald-300 block mb-0.5">4. National Identity Card</span>
              <span className="text-emerald-100/80 text-[11px]">
                {countryMeta.nationalIdName} (&lt; 200 KB)
              </span>
            </div>
          </div>
        </div>

        {/* 3. Search & Categories Toolbar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Bar */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'hi'
                    ? 'सक्रिय फॉर्म का नाम या विभाग खोजें...'
                    : 'Search active registration forms...'
                }
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder-slate-400 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>

            {/* Active Forms Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <span>
                {activeForms.length} {language === 'hi' ? 'फॉर्म वर्तमान में खुले हैं' : 'Active Forms Open Now'}
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {formCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{language === 'hi' ? cat.labelHi : cat.labelEn}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Active Forms Grid */}
        {activeForms.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              {language === 'hi' ? 'कोई सक्रिय फॉर्म नहीं मिला' : 'No active forms found'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'hi' ? 'कृपया अन्य श्रेणी चुनें या सर्च रीसेट करें।' : 'Please choose another category or reset your search.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeForms.map((opp) => {
              const title = language === 'hi' ? opp.titleHi : opp.title;
              const benefit = language === 'hi' ? opp.benefitHeadlineHi : opp.benefitHeadline;
              const description = language === 'hi' ? opp.descriptionHi : opp.description;
              const isGovt = opp.category === 'govt_scheme' || opp.category === 'govt_job' || opp.category === 'competitive_exam';

              return (
                <div
                  key={opp.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card hover:border-emerald-500/50 hover:shadow-card-hover transition-all flex flex-col justify-between space-y-4"
                >
                  <div>
                    {/* Header Strip: Authority & Live Tag */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-[11px] font-bold truncate max-w-[65%]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span className="truncate">{opp.gazette.issuingAuthority}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0" />
                          <span>{language === 'hi' ? 'फॉर्म चालू है' : 'Active Now'}</span>
                        </span>

                        <button
                          onClick={() => handleToggleFavorite(opp.id)}
                          className={`p-1.5 rounded-xl border transition-all ${
                            favoriteIds.has(opp.id)
                              ? 'bg-amber-100 text-amber-500 border-amber-300 hover:bg-amber-200 shadow-2xs'
                              : 'bg-slate-50 text-slate-400 hover:text-amber-500 hover:bg-amber-50 border-slate-200'
                          }`}
                          title={favoriteIds.has(opp.id) ? 'पसंदीदा से हटाएं' : 'पसंदीदा में रखें'}
                          aria-label="Star Favorite"
                        >
                          <Star className={`w-3.5 h-3.5 ${favoriteIds.has(opp.id) ? 'fill-amber-400 text-amber-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {title}
                    </h3>

                    {/* Benefit Pill */}
                    <div className="mt-2 p-2 rounded-xl bg-emerald-50/80 border border-emerald-100">
                      <p className="text-xs font-semibold text-emerald-950 flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </p>
                    </div>

                    {/* Meta info: Fee & Target Ages & Gender */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                      <span>
                        {language === 'hi' ? 'सरकारी शुल्क:' : 'Official Fee:'} <strong className="text-emerald-800">{opp.gazette.officialGovtFee}</strong>
                      </span>
                      {opp.targetAges && (
                        <span>
                          {language === 'hi' ? 'आयु:' : 'Age:'} <strong className="text-slate-800">{opp.targetAges[0]}-{opp.targetAges[1]} yr</strong>
                        </span>
                      )}
                      {opp.genderEligibility === 'female' && (
                        <span className="px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 font-bold border border-rose-200">
                          {language === 'hi' ? 'केवल महिलाएं' : 'Women Only'}
                        </span>
                      )}
                      {opp.deadline && opp.deadline !== 'OPEN_ROUND' && (
                        <span className="text-red-700 font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3 text-red-600" />
                          {language === 'hi' ? `अंतिम तिथि: ${opp.deadline}` : `Deadline: ${opp.deadline}`}
                        </span>
                      )}
                    </div>

                    {/* Mandatory Documents Required */}
                    {opp.documents && opp.documents.length > 0 && (
                      <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-[11px] font-bold text-slate-700 block mb-1">
                          {language === 'hi' ? 'आवेदन हेतु आवश्यक सरकारी दस्तावेज:' : 'Required Application Documents:'}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {opp.documents.map((doc) => (
                            <span
                              key={doc.id}
                              className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] text-slate-700 font-medium"
                            >
                              {language === 'hi' ? doc.nameHi : doc.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Direct Link Action */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-500">
                      <span>{opp.gazette.circularNumber}</span>
                    </div>

                    <a
                      href={resolveOfficialPortalUrl(opp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-md shadow-emerald-600/30 border border-emerald-400/50 ring-1 ring-emerald-400/30 transition-all active:scale-95 shrink-0"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-white shrink-0" />
                      <span>{language === 'hi' ? 'आधिकारिक पोर्टल खोलें' : 'Open Official Portal'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
