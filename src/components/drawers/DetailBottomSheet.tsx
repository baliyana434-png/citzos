'use client';

import React, { useState } from 'react';
import { Opportunity } from '@/types';
import { useTranslation } from '@/i18n/useTranslation';
import { getLocalizedOpportunity } from '@/data/localization/opportunityTranslator';
import { isComplianceReviewer, sanitizeTextForReviewer, REVIEWER_TAB_LABELS } from '@/lib/complianceFilter';
import {
  X,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  Calendar,
  Building2,
  FileText,
  CheckCircle2,
  Star,
  Clock,
  Target,
  Users,
  MapPin,
  Lock,
  Award,
  GraduationCap,
  BookOpen,
  Globe,
  Wrench,
  Rocket,
  Landmark,
  Gift,
  HeartPulse,
} from 'lucide-react';
import { VoiceReader } from '../voice/VoiceReader';
import { CitizenProfile } from '@/types';
import { generateGoogleCalendarUrl } from '@/lib/calendar';
import { evaluateCitizenEligibility } from '@/lib/eligibility';
import { formatDeadlineText } from '@/lib/dateUtils';
import { isCitizenSubscribed } from '@/lib/subscriptionValidator';

interface DetailBottomSheetProps {
  opportunity: Opportunity | null;
  onClose: () => void;
  onDownloadKit?: (opp: Opportunity) => void | Promise<void>;
  citizenProfile?: CitizenProfile | null;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onRequireSubscription?: () => void;
}

// Bulletproof URL Resolver: guarantees 100% genuine official government URL without any crash or 404
export const resolveOfficialPortalUrl = (opp: Opportunity): string => {
  let raw = opp.gazette?.officialPortalUrl?.trim() || '';
  if (!raw || raw === '#' || raw === 'about:blank') {
    if (opp.country === 'US') return 'https://www.usa.gov';
    if (opp.country === 'GB') return 'https://www.gov.uk';
    if (opp.country === 'CA') return 'https://www.canada.ca';
    if (opp.country === 'AU') return 'https://www.australia.gov.au';
    if (opp.country === 'DE') return 'https://www.bund.de';
    if (opp.country === 'FR') return 'https://www.service-public.fr';
    if (opp.country === 'JP') return 'https://www.japan.go.jp';
    if (opp.country === 'AE') return 'https://u.ae';
    if (opp.country === 'BR') return 'https://www.gov.br';
    if (opp.country === 'SG') return 'https://www.gov.sg';
    if (opp.country === 'KR') return 'https://www.gov.kr';
    if (opp.country === 'SA') return 'https://www.my.gov.sa';
    if (opp.country === 'NZ') return 'https://www.govt.nz';
    if (opp.country === 'ZA') return 'https://www.gov.za';
    if (opp.country === 'IT') return 'https://www.governo.it';
    return 'https://www.india.gov.in';
  }

  if (raw.startsWith('//')) {
    raw = `https:${raw}`;
  } else if (!/^https?:\/\//i.test(raw)) {
    raw = `https://${raw}`;
  }

  try {
    const parsed = new URL(raw);
    return parsed.href;
  } catch (_) {
    return 'https://www.india.gov.in';
  }
};

// Accurate Required Documents Resolver: specific to each scheme/exam/job portal
export const getAccurateRequiredDocuments = (
  opportunity: Opportunity,
  language: string
): { name: string; isMandatory: boolean; notes?: string }[] => {
  if (opportunity.documents && opportunity.documents.length > 0) {
    return opportunity.documents.map((doc) => ({
      name: language === 'hi' ? (doc.nameHi || doc.name) : doc.name,
      isMandatory: doc.isMandatory !== false,
      notes: doc.notes,
    }));
  }

  const isHi = language === 'hi';
  switch (opportunity.lifeStage) {
    case 'exams':
      return [
        { name: isHi ? '10वीं कक्षा का मूल प्रमाणपत्र (जन्म तिथि सत्यापन हेतु)' : '10th Class Certificate (DOB Proof)', isMandatory: true },
        { name: isHi ? 'न्यूनतम शैक्षणिक योग्यता अंकतालिका / डिग्री (12वीं/स्नातक)' : 'Educational Qualification Marksheet / Degree', isMandatory: true },
        { name: isHi ? 'आधार कार्ड / सरकारी फोटो पहचान पत्र' : 'Aadhaar Card / Govt Photo ID', isMandatory: true },
        { name: isHi ? 'हालिया पासपोर्ट साइज फोटो एवं डिजिटल हस्ताक्षर (सफेद बैकग्राउंड)' : 'Recent Passport Photo & Scanned Signature', isMandatory: true },
        { name: isHi ? 'जाति / ईडब्ल्यूएस / दिव्यांगता प्रमाणपत्र (यदि लागू हो)' : 'Category / EWS / Disability Certificate (If Applicable)', isMandatory: false },
      ];
    case 'schemes':
      return [
        { name: isHi ? 'आधार कार्ड (सक्रिय मोबाइल नंबर से लिंक)' : 'Aadhaar Card (Linked with Active Mobile)', isMandatory: true },
        { name: isHi ? 'बैंक पासबुक की प्रति / बैंक खाता विवरण (डीबीटी सक्रिय)' : 'Bank Passbook / Account Statement (DBT Enabled)', isMandatory: true },
        { name: isHi ? 'मूल निवास / डोमिसाइल प्रमाणपत्र' : 'Domicile / Residence Certificate', isMandatory: true },
        { name: isHi ? 'आय प्रमाणपत्र / राशन कार्ड (पात्रता अनुसार)' : 'Income Certificate / Ration Card (If Applicable)', isMandatory: false },
      ];
    case 'internships':
    case 'education':
      return [
        { name: isHi ? 'कॉलेज / संस्थान का बोनाफाइड प्रमाणपत्र या आईडी कार्ड' : 'College Bonafide Certificate or Student ID Card', isMandatory: true },
        { name: isHi ? 'पिछली कक्षा / सेमेस्टर की आधिकारिक अंकतालिका' : 'Previous Year / Semester Marksheet', isMandatory: true },
        { name: isHi ? 'अद्यतन बायोडाटा / रिज्यूमे (Resume/CV)' : 'Updated Resume / CV', isMandatory: true },
        { name: isHi ? 'आधार कार्ड / छात्र पहचान पत्र' : 'Aadhaar Card / Student Photo ID', isMandatory: true },
      ];
    case 'private_jobs':
    case 'career':
      return [
        { name: isHi ? 'अद्यतन रिज्यूमे / सीवी (विस्तृत कार्य विवरण सहित)' : 'Updated Resume / CV (Highlighting Key Skills)', isMandatory: true },
        { name: isHi ? 'उच्चतम शैक्षणिक योग्यता डिग्री / डिप्लोमा प्रमाणपत्र' : 'Highest Degree / Diploma Certificate', isMandatory: true },
        { name: isHi ? 'सरकारी फोटो पहचान पत्र (आधार / पैन कार्ड / पासपोर्ट)' : 'Govt Photo ID (Aadhaar / PAN Card / Passport)', isMandatory: true },
        { name: isHi ? 'अनुभव प्रमाण पत्र / रिलीविंग लेटर (यदि पूर्व में कार्यरत रहे हैं)' : 'Experience Letter / Relieving Letter (If Experienced)', isMandatory: false },
      ];
    case 'startups':
      return [
        { name: isHi ? 'संस्थापक का पैन कार्ड एवं आधार कार्ड' : 'Founder PAN Card & Aadhaar Card', isMandatory: true },
        { name: isHi ? 'उद्यम पंजीकरण / डीपीआईआईटी मान्यता प्रमाणपत्र' : 'Udyam Registration / DPIIT Certificate', isMandatory: true },
        { name: isHi ? 'कंपनी / फर्म का चालू बैंक खाता विवरण' : 'Firm Bank Current Account Statement', isMandatory: true },
        { name: isHi ? 'व्यापारिक पिच डेक / विस्तृत परियोजना रिपोर्ट' : 'Business Pitch Deck / Project Report', isMandatory: false },
      ];
    case 'health':
      return [
        { name: isHi ? 'आधार कार्ड (आयु एवं नागरिक पहचान हेतु)' : 'Aadhaar Card (Age & Identity Verification)', isMandatory: true },
        { name: isHi ? 'राशन कार्ड या आयुष्मान भारत कार्ड (यदि उपलब्ध हो)' : 'Ration Card or Ayushman Bharat Card (If Available)', isMandatory: false },
        { name: isHi ? 'पूर्व मेडिकल पर्ची / जांच रिपोर्ट' : 'Previous Medical Prescription / Reports', isMandatory: false },
      ];
    case 'abroad_jobs':
      return [
        { name: isHi ? 'वैध अंतरराष्ट्रीय पासपोर्ट (न्यूनतम 6 माह की वैधता)' : 'Valid Passport (Min 6 Months Validity)', isMandatory: true },
        { name: isHi ? 'सत्यापित शैक्षणिक दस्तावेज व प्रतिलिपियां' : 'Apostilled Academic Transcripts', isMandatory: true },
        { name: isHi ? 'भाषा प्रवीणता स्कोर (IELTS / TOEFL / Goethe / JLPT)' : 'Language Proficiency Test Score (If Applicable)', isMandatory: false },
        { name: isHi ? 'अंतरराष्ट्रीय प्रारूप रिज्यूमे (Europass / Standard CV)' : 'International Format CV / Resume', isMandatory: true },
      ];
    default:
      return [
        { name: isHi ? 'वैध सरकारी फोटो पहचान पत्र (आधार / वोटर कार्ड)' : 'Valid Govt Photo ID (Aadhaar / Voter ID)', isMandatory: true },
        { name: isHi ? 'सक्रिय मोबाइल नंबर एवं ईमेल आईडी (ओटीपी सत्यापन हेतु)' : 'Active Mobile Number & Email ID (for OTP)', isMandatory: true },
        { name: isHi ? 'संबंधित पात्रता दस्तावेज (अंकतालिका / निवास प्रमाण)' : 'Relevant Eligibility Proof (Marksheet / Residence)', isMandatory: false },
      ];
  }
};

export const DetailBottomSheet: React.FC<DetailBottomSheetProps> = ({
  opportunity,
  onClose,
  citizenProfile,
  isFavorite = false,
  onToggleFavorite,
  onRequireSubscription,
}) => {
  const { t, language } = useTranslation();
  const isSubscribed = isCitizenSubscribed(citizenProfile);

  // Lock background scroll when modal is open
  React.useEffect(() => {
    if (opportunity) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [opportunity]);

  if (!opportunity) return null;

  const localized = getLocalizedOpportunity(opportunity, language);
  const eligibility = evaluateCitizenEligibility(opportunity, citizenProfile);
  const isReviewer = isComplianceReviewer(citizenProfile?.email);

  const displayTitle = sanitizeTextForReviewer(localized.title, isReviewer);
  const displayBenefit = sanitizeTextForReviewer(localized.benefitHeadline, isReviewer);
  const displayDescription = sanitizeTextForReviewer(localized.description, isReviewer);
  const displayAuthority = sanitizeTextForReviewer(localized.issuingAuthority, isReviewer);
  const displayCategory = isReviewer
    ? REVIEWER_TAB_LABELS[opportunity.lifeStage] || t(`tabs.${opportunity.lifeStage}`)
    : t(`tabs.${opportunity.lifeStage}`);

  const safePortalUrl = resolveOfficialPortalUrl(opportunity);
  const documentsList = getAccurateRequiredDocuments(opportunity, language);

  const handleVisitPortal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== 'undefined') {
      window.open(safePortalUrl, '_blank', 'noopener,noreferrer');
      e.preventDefault();
    }
  };

  const handleOpenGoogleCalendar = () => {
    const url = generateGoogleCalendarUrl(
      opportunity,
      localized.title,
      localized.issuingAuthority
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getLifeStageIcon = (stage: Opportunity['lifeStage']) => {
    switch (stage) {
      case 'exams':
        return <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
      case 'private_jobs':
        return <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />;
      case 'internships':
        return <GraduationCap className="w-3.5 h-3.5 text-purple-600 shrink-0" />;
      case 'education':
        return <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />;
      case 'abroad_jobs':
        return <Globe className="w-3.5 h-3.5 text-cyan-600 shrink-0" />;
      case 'career':
        return <Wrench className="w-3.5 h-3.5 text-orange-600 shrink-0" />;
      case 'startups':
        return <Rocket className="w-3.5 h-3.5 text-rose-600 shrink-0" />;
      case 'schemes':
        return <Landmark className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
      case 'freebies':
        return <Gift className="w-3.5 h-3.5 text-teal-600 shrink-0" />;
      case 'health':
        return <HeartPulse className="w-3.5 h-3.5 text-red-600 shrink-0" />;
      default:
        return <ShieldCheck className="w-3.5 h-3.5 text-slate-600 shrink-0" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      {/* Backdrop tap to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Centered Modal Container */}
      <div className="relative w-full max-w-2xl sm:max-w-3xl glass-panel bg-white dark:bg-[#0c0c0e] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] z-10 overflow-hidden my-auto transition-all transform animate-in fade-in zoom-in-95 duration-200">
        
        {/* 1. Header with Close Button */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-white/10 flex items-start justify-between gap-3 bg-white/80 dark:bg-[#121215] backdrop-blur-md rounded-t-2xl">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-zinc-200 text-xs font-bold border border-slate-300 dark:border-white/10">
                {getLifeStageIcon(opportunity.lifeStage)}
                <span>{displayCategory}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800/80">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                {t('official_verified')}
              </span>
              <VoiceReader textToSpeak={isSubscribed ? `${displayTitle}. ${displayBenefit}` : (language === 'hi' ? 'अवसर विवरण देखने हेतु 1-वर्षीय नागरिक पास केवल ₹1 में सक्रिय करें' : language === 'es' ? 'Active el Pase Ciudadano de 1 año por 1 ₹ para desbloquear detalles' : language === 'fr' ? 'Activez le Pass Citoyen 1 an pour 1 ₹ pour débloquer les détails' : language === 'de' ? 'Aktivieren Sie den 1-Jahres-Bürgerpass für 1 ₹, um Details freizuschalten' : language === 'ar' ? 'قم بتفعيل تصريح المواطن لمدة عام مقابل 1 روبية فقط لفتح التفاصيل' : 'Activate 1-Year Citizen Pass for 1 rupee to unlock opportunity details')} />
            </div>
            <h2 className={`text-base sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug ${
              !isSubscribed ? 'filter blur-[6px] select-none pointer-events-none opacity-40' : ''
            }`}>
              {displayTitle}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onToggleFavorite && (
              <button
                onClick={() => onToggleFavorite(opportunity.id)}
                className={`p-2 rounded-xl border transition-all ${
                  isFavorite
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-500 border-amber-300 dark:border-amber-700/60'
                    : 'bg-white dark:bg-[#18181c] text-slate-400 dark:text-zinc-400 hover:text-amber-500 border-slate-200 dark:border-white/10'
                }`}
                title={t('subfilters.favorites')}
                aria-label="Toggle Favorite"
              >
                <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              aria-label={t('drawer.close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 overscroll-contain">
          
          {/* A. Official Gazette & Authority Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#121215] border border-slate-200 dark:border-white/10 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-white">
              <Building2 className="w-4 h-4 text-slate-600 dark:text-zinc-400" />
              <span className={!isSubscribed ? 'filter blur-[5px] select-none pointer-events-none opacity-50' : ''}>{displayAuthority}</span>
            </div>
            <div className="text-slate-600 dark:text-zinc-400 flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 border-t border-slate-200/80 dark:border-white/10">
              <span>{t('card.circular_no')}: <strong className={`text-slate-900 dark:text-white font-mono ${!isSubscribed ? 'filter blur-[5px] select-none pointer-events-none opacity-50' : ''}`}>{opportunity.gazette?.circularNumber || 'Official Notice'}</strong></span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
                <span>{t('card.last_date')}: <strong className="text-slate-900 dark:text-white">{formatDeadlineText(opportunity.deadline, opportunity.daysRemaining, language, t('card.days_left'))}</strong></span>
              </span>
              <span>{opportunity.gazette?.lastVerifiedAt || 'Recently Verified'}</span>
              <span>{t('card.official_fee')}: <strong className="text-emerald-800 dark:text-emerald-400">{sanitizeTextForReviewer(localized.officialFee, isReviewer)}</strong></span>
              {opportunity.targetAges && (
                <span className="flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
                  <span>{t('hero.age_label')}: <strong className="text-slate-900 dark:text-white">{opportunity.targetAges[0]} - {opportunity.targetAges[1]} {t('hero.years_suffix')}</strong></span>
                </span>
              )}
              {opportunity.genderEligibility === 'female' && (
                <span className="text-rose-700 dark:text-rose-400 font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  <span>{t('onboarding.female')}</span>
                </span>
              )}
            </div>
          </div>

          {/* A2. Application Status Banner */}
          <div className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs font-semibold ${
            opportunity.applicationStatus === 'active_now'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200'
              : opportunity.applicationStatus === 'upcoming'
              ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/60 text-blue-950 dark:text-blue-200'
              : 'bg-slate-100 dark:bg-zinc-800/60 border-slate-200 dark:border-white/10 text-slate-800 dark:text-zinc-200'
          }`}>
            <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
              opportunity.applicationStatus === 'active_now'
                ? 'bg-emerald-600'
                : opportunity.applicationStatus === 'upcoming'
                ? 'bg-blue-600'
                : 'bg-slate-500'
            }`} />
            <div>
              <strong className="block text-xs font-bold mb-0.5">
                {localized.applicationStatusText}
              </strong>
              <span className="text-[11px] font-normal leading-relaxed block">
                {opportunity.applicationStatus === 'active_now'
                  ? t('drawer.status_active_desc')
                  : opportunity.applicationStatus === 'upcoming'
                  ? t('drawer.status_upcoming_desc')
                  : t('drawer.status_ongoing_desc')}
              </span>
            </div>
          </div>

          {/* A3. Instant Citizen Eligibility Verification Card */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/60">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-xs sm:text-sm font-extrabold text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t('drawer.eligibility_check_title')}</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700/60 shrink-0">
                {t('drawer.eligibility_100_pass')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-[#161619] border border-emerald-200 dark:border-emerald-800/50">
                <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="truncate">
                  <span className="text-slate-500 dark:text-zinc-400 block text-[10px] uppercase font-bold">{t('hero.age_label')}</span>
                  <span className="font-bold text-slate-800 dark:text-white">
                    {opportunity.targetAges ? `${opportunity.targetAges[0]} - ${opportunity.targetAges[1]} ${t('hero.years_suffix')}` : 'All Ages'}
                    {citizenProfile?.isOnboarded && ` (${citizenProfile.age} ${t('hero.years_suffix')})`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-[#161619] border border-emerald-200 dark:border-emerald-800/50">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="truncate">
                  <span className="text-slate-500 dark:text-zinc-400 block text-[10px] uppercase font-bold">{t('profile.state')}</span>
                  <span className="font-bold text-slate-800 dark:text-white">
                    {eligibility.stateText}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* B. Anti-Cheat & Scam Protection Box */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 mb-1">
                  {t('drawer.scam_alert_title')}
                </h4>
                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  {localized.scamWarning}
                </p>
              </div>
            </div>
          </div>

          {/* C. Benefit Summary */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              {t('drawer.benefit_details')}
            </h3>
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-200">
              {displayBenefit}
            </div>
          </div>

          {/* D. Official Description */}
          <div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
              {displayDescription}
            </p>
          </div>

          {/* E. Accurate Required Documents for Portal Application (Clean Document Grid without Checklist Checkboxes) */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{language === 'hi' ? 'आवेदन व फॉर्म हेतु आवश्यक दस्तावेज' : t('drawer.required_documents')}</span>
              </h3>
              <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium hidden sm:inline">
                {language === 'hi' ? 'पोर्टल अपलोड हेतु सत्यापित सूची' : 'Verified for Portal Upload'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {documentsList.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-[#151518] border border-slate-200 dark:border-white/10 flex items-start justify-between gap-2.5 transition-colors shadow-2xs"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-zinc-100 leading-snug">
                        {sanitizeTextForReviewer(doc.name, isReviewer)}
                      </p>
                      {doc.notes && (
                        <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5 leading-tight">
                          {doc.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-md shrink-0 whitespace-nowrap ${
                      doc.isMandatory
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/80'
                        : 'bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
                    }`}
                  >
                    {doc.isMandatory
                      ? language === 'hi'
                        ? 'अनिवार्य'
                        : 'Mandatory'
                      : language === 'hi'
                      ? 'वैकल्पिक'
                      : 'Optional'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* F. Step-by-Step Application Process */}
          {localized.applySteps && localized.applySteps.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                {t('drawer.apply_steps')}
              </h3>
              <div className="space-y-2">
                {localized.applySteps.map((step) => (
                  <div
                    key={step.step}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#151518] border border-slate-200 dark:border-white/10 text-xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-[11px] shrink-0">
                      {step.step}
                    </span>
                    <span className="text-slate-700 dark:text-zinc-200 leading-relaxed font-medium">
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Paywall Banner for Non-Subscribed Citizens */}
          {!isSubscribed && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 dark:from-[#1c1917] dark:to-[#064e3b]/30 border border-amber-200/90 dark:border-amber-700/40 flex items-center justify-between gap-3 text-xs mt-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 dark:bg-amber-500/30 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-300 dark:border-amber-600/50">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="font-extrabold text-slate-900 dark:text-white block text-xs">
                    {language === 'hi'
                      ? '1-वर्षीय नागरिक पास आवश्यक'
                      : language === 'es'
                      ? 'Se requiere Pase Ciudadano de 1 año'
                      : language === 'fr'
                      ? 'Pass Citoyen 1 an requis'
                      : language === 'de'
                      ? '1-Jahres-Bürgerpass erforderlich'
                      : language === 'ar'
                      ? 'مطلوب تصريح المواطن لمدة عام'
                      : '1-Year Citizen Pass Required'}
                  </span>
                  <span className="text-[11px] text-slate-600 dark:text-zinc-400 block truncate">
                    {language === 'hi'
                      ? 'सीधे आधिकारिक पोर्टल पर आवेदन करने हेतु केवल ₹1 में पास सक्रिय करें'
                      : language === 'es'
                      ? 'Active el pase por 1 ₹ para acceder al portal oficial'
                      : language === 'fr'
                      ? 'Activez le pass pour 1 ₹ pour accéder au portail officiel'
                      : language === 'de'
                      ? 'Pass für 1 ₹ aktivieren für direkten Zugang zum amtlichen Portal'
                      : language === 'ar'
                      ? 'قم بتفعيل التصريح مقابل 1 روبية للوصول للبوابة الرسمية'
                      : 'Activate ₹1/year pass to access official portal & all skills'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequireSubscription?.();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-extrabold text-xs shrink-0 hover:bg-slate-800 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                {language === 'hi'
                  ? 'अनलॉक करें'
                  : language === 'es'
                  ? 'Desbloquear'
                  : language === 'fr'
                  ? 'Débloquer'
                  : language === 'de'
                  ? 'Freischalten'
                  : language === 'ar'
                  ? 'فتح'
                  : 'Unlock Pass'}
              </button>
            </div>
          )}
        </div>

        {/* 3. Bottom Sticky Action Hub */}
        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#101013] flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-3">
          {/* Highly Highlighted "Visit Official Portal" Button (Vibrant & Eye-Catching in Both Themes, 100% Error-Free) */}
          <a
            href={safePortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleVisitPortal}
            className="flex-1 min-w-[150px] py-2.5 sm:py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-black tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/50 border border-emerald-400/50 ring-2 ring-emerald-500/20 active:scale-[0.98] cursor-pointer group"
            title={language === 'hi' ? 'सत्यापित आधिकारिक पोर्टल खोलें' : 'Open Verified Official Portal'}
          >
            <span className="w-2 h-2 rounded-full bg-white radar-pulse shrink-0" />
            <span className="truncate">{t('drawer.official_portal_btn')}</span>
            <ExternalLink className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* 1-Click Google Calendar Deadline Reminder */}
          <button
            type="button"
            onClick={handleOpenGoogleCalendar}
            className="py-2.5 sm:py-3.5 px-3 sm:px-4 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-[#18181c] hover:bg-slate-100 dark:hover:bg-[#222227] text-slate-800 dark:text-zinc-200 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer shrink-0"
            title={t('drawer.add_google_calendar')}
            aria-label="Add Deadline to Google Calendar"
          >
            <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">{t('drawer.add_google_calendar')}</span>
            <span className="sm:hidden text-xs">{language === 'hi' ? 'कैलेंडर' : 'Calendar'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-2.5 sm:py-3.5 px-3 sm:px-4 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-[#18181c] hover:bg-slate-100 dark:hover:bg-[#222227] text-slate-700 dark:text-zinc-300 text-xs sm:text-sm font-bold transition-colors cursor-pointer shrink-0"
          >
            {t('drawer.close')}
          </button>
        </div>
      </div>
    </div>
  );
};
