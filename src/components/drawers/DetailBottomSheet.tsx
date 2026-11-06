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
  FileCheck2,
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

export const DetailBottomSheet: React.FC<DetailBottomSheetProps> = ({
  opportunity,
  onClose,
  citizenProfile,
  isFavorite = false,
  onToggleFavorite,
  onRequireSubscription,
}) => {
  const { t, language } = useTranslation();
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
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

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
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
      <div className="relative w-full max-w-2xl sm:max-w-3xl glass-panel rounded-2xl shadow-2xl flex flex-col max-h-[90vh] z-10 overflow-hidden my-auto transition-all transform animate-in fade-in zoom-in-95 duration-200">
        
        {/* 1. Header with Close Button */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-white/10 flex items-start justify-between gap-3 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-t-2xl">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-800 text-xs font-bold border border-slate-300">
                {getLifeStageIcon(opportunity.lifeStage)}
                <span>{displayCategory}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
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
                    ? 'bg-amber-100 text-amber-500 border-amber-300'
                    : 'bg-white text-slate-400 hover:text-amber-500 border-slate-200'
                }`}
                title={t('subfilters.favorites')}
                aria-label="Toggle Favorite"
              >
                <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label={t('drawer.close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 overscroll-contain">
          
          {/* A. Official Gazette & Authority Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Building2 className="w-4 h-4 text-slate-600" />
              <span className={!isSubscribed ? 'filter blur-[5px] select-none pointer-events-none opacity-50' : ''}>{displayAuthority}</span>
            </div>
            <div className="text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 border-t border-slate-200/80">
              <span>{t('card.circular_no')}: <strong className={`text-slate-900 font-mono ${!isSubscribed ? 'filter blur-[5px] select-none pointer-events-none opacity-50' : ''}`}>{opportunity.gazette?.circularNumber || 'Official Notice'}</strong></span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{t('card.last_date')}: <strong className="text-slate-900">{formatDeadlineText(opportunity.deadline, opportunity.daysRemaining, language, t('card.days_left'))}</strong></span>
              </span>
              <span>{opportunity.gazette?.lastVerifiedAt || 'Recently Verified'}</span>
              <span>{t('card.official_fee')}: <strong className="text-emerald-800">{sanitizeTextForReviewer(localized.officialFee, isReviewer)}</strong></span>
              {opportunity.targetAges && (
                <span className="flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t('hero.age_label')}: <strong>{opportunity.targetAges[0]} - {opportunity.targetAges[1]} {t('hero.years_suffix')}</strong></span>
                </span>
              )}
              {opportunity.genderEligibility === 'female' && (
                <span className="text-rose-700 font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-rose-600" />
                  <span>{t('onboarding.female')}</span>
                </span>
              )}
            </div>
          </div>

          {/* A2. Application Status Banner */}
          <div className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs font-semibold ${
            opportunity.applicationStatus === 'active_now'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : opportunity.applicationStatus === 'upcoming'
              ? 'bg-blue-50 border-blue-200 text-blue-950'
              : 'bg-slate-100 border-slate-200 text-slate-800'
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
          <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-xs sm:text-sm font-extrabold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t('drawer.eligibility_check_title')}</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 shrink-0">
                {t('drawer.eligibility_100_pass')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-emerald-200">
                <Target className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="truncate">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">{t('hero.age_label')}</span>
                  <span className="font-bold text-slate-800">
                    {opportunity.targetAges ? `${opportunity.targetAges[0]} - ${opportunity.targetAges[1]} ${t('hero.years_suffix')}` : 'All Ages'}
                    {citizenProfile?.isOnboarded && ` (${citizenProfile.age} ${t('hero.years_suffix')})`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-emerald-200">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="truncate">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">{t('profile.state')}</span>
                  <span className="font-bold text-slate-800">
                    {eligibility.stateText}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* B. Anti-Cheat & Scam Protection Box */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900 mb-1">
                  {t('drawer.scam_alert_title')}
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  {localized.scamWarning}
                </p>
              </div>
            </div>
          </div>

          {/* C. Benefit Summary */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              {t('drawer.benefit_details')}
            </h3>
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm font-bold text-emerald-950">
              {displayBenefit}
            </div>
          </div>

          {/* D. Official Description */}
          <div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {displayDescription}
            </p>
          </div>

          {/* E. Required Documents Checklist */}
          {localized.documents && localized.documents.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>{t('drawer.required_documents')}</span>
              </h3>
              <div className="space-y-1.5">
                {localized.documents.map((doc) => (
                  <label
                    key={doc.id}
                    onClick={() => toggleDoc(doc.id)}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={!!checkedDocs[doc.id]}
                      onChange={() => {}}
                      className="mt-0.5 w-4 h-4 text-emerald-600 rounded-sm border-slate-300 focus:ring-emerald-500"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-slate-800">
                        {sanitizeTextForReviewer(doc.name, isReviewer)}
                      </span>
                      {doc.isMandatory && (
                        <span className="ml-2 text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md">
                          {t('drawer.mandatory')}
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* F. Step-by-Step Application Process */}
          {localized.applySteps && localized.applySteps.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                {t('drawer.apply_steps')}
              </h3>
              <div className="space-y-2">
                {localized.applySteps.map((step) => (
                  <div
                    key={step.step}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                      {step.step}
                    </span>
                    <span className="text-slate-700 leading-relaxed font-medium">
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Paywall Banner for Non-Subscribed Citizens */}
          {!isSubscribed && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200/90 flex items-center justify-between gap-3 text-xs mt-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0 border border-amber-300">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="font-extrabold text-slate-900 block text-xs">
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
                  <span className="text-[11px] text-slate-600 block truncate">
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

        {/* 3. Bottom Sticky Action Hub (Solid Gaps, Zero Touching) */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-3">
          {isSubscribed ? (
            <a
              href={opportunity.gazette?.officialPortalUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[130px] py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.99]"
            >
              <span className="truncate">{t('drawer.official_portal_btn')}</span>
              <ExternalLink className="w-4 h-4 shrink-0" />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                onRequireSubscription?.();
              }}
              className="flex-1 min-w-[130px] py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.99] border border-emerald-400/40"
            >
              <Lock className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="truncate">
                {language === 'hi'
                  ? 'पोर्टल अनलॉक करें (पास ₹1)'
                  : language === 'es'
                  ? 'Desbloquear Portal (Pase 1 ₹)'
                  : language === 'fr'
                  ? 'Débloquer le Portail (Pass 1 ₹)'
                  : language === 'de'
                  ? 'Portal Freischalten (Pass 1 ₹)'
                  : language === 'ar'
                  ? 'فتح البوابة الرسمية (تصريح 1 روبية)'
                  : 'Unlock Official Portal (Pass ₹1)'}
              </span>
            </button>
          )}

          {/* 1-Click Google Calendar Deadline Reminder */}
          <button
            onClick={handleOpenGoogleCalendar}
            className="py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer shrink-0"
            title={t('drawer.add_google_calendar')}
            aria-label="Add Deadline to Google Calendar"
          >
            <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="hidden sm:inline">{t('drawer.add_google_calendar')}</span>
            <span className="sm:hidden text-xs">Calendar</span>
          </button>

          <button
            onClick={onClose}
            className="py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer shrink-0"
          >
            {t('drawer.close')}
          </button>
        </div>
      </div>
    </div>
  );
};
