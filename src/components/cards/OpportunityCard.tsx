'use client';

import React from 'react';
import { Opportunity, CitizenProfile } from '@/types';
import { useTranslation } from '@/i18n/useTranslation';
import { getLocalizedOpportunity } from '@/data/localization/opportunityTranslator';
import { isComplianceReviewer, sanitizeTextForReviewer, REVIEWER_TAB_LABELS } from '@/lib/complianceFilter';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ExternalLink,
  Star,
  Clock,
  Banknote,
  Lock,
  Award,
  Building2,
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
import { RotatingNewBadge } from '../common/RotatingNewBadge';
import { generateGoogleCalendarUrl } from '@/lib/calendar';
import { formatDeadlineText } from '@/lib/dateUtils';
import { isOpportunityNewActive } from '@/lib/newBadgeTracker';
import { isCitizenSubscribed } from '@/lib/subscriptionValidator';
import { resolveOfficialPortalUrl } from '@/lib/officialPortalResolver';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onSelect: (opp: Opportunity) => void;
  onShareWhatsApp?: (opp: Opportunity) => void;
  citizenProfile?: CitizenProfile | null;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onRequireSubscription?: () => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onSelect,
  citizenProfile,
  isFavorite = false,
  onToggleFavorite,
  onRequireSubscription,
}) => {
  const { t, language } = useTranslation();
  const localized = getLocalizedOpportunity(opportunity, language);
  const isSubscribed = isCitizenSubscribed(citizenProfile);
  const isReviewer = isComplianceReviewer(citizenProfile?.email);

  const displayTitle = sanitizeTextForReviewer(localized.title, isReviewer);
  const displayBenefit = sanitizeTextForReviewer(localized.benefitHeadline, isReviewer);
  const displayDescription = sanitizeTextForReviewer(localized.description, isReviewer);
  const displayCategory = isReviewer
    ? REVIEWER_TAB_LABELS[opportunity.lifeStage] || t(`tabs.${opportunity.lifeStage}`)
    : t(`tabs.${opportunity.lifeStage}`);

  const formattedDeadline = formatDeadlineText(
    opportunity.deadline,
    opportunity.daysRemaining,
    language,
    t('card.days_left')
  );

  const safePortalUrl = resolveOfficialPortalUrl(opportunity);

  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = generateGoogleCalendarUrl(
      opportunity,
      displayTitle,
      localized.issuingAuthority
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getLifeStageIcon = (stage: string) => {
    switch (stage) {
      case 'exams':
        return <Award className="w-3.5 h-3.5 text-amber-500" />;
      case 'private_jobs':
        return <Building2 className="w-3.5 h-3.5 text-blue-500" />;
      case 'internships':
        return <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />;
      case 'education':
        return <BookOpen className="w-3.5 h-3.5 text-emerald-500" />;
      case 'abroad_jobs':
        return <Globe className="w-3.5 h-3.5 text-purple-500" />;
      case 'career':
        return <Wrench className="w-3.5 h-3.5 text-teal-500" />;
      case 'startups':
        return <Rocket className="w-3.5 h-3.5 text-rose-500" />;
      case 'schemes':
        return <Landmark className="w-3.5 h-3.5 text-orange-500" />;
      case 'freebies':
        return <Gift className="w-3.5 h-3.5 text-pink-500" />;
      case 'health':
        return <HeartPulse className="w-3.5 h-3.5 text-red-500" />;
      default:
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />;
    }
  };

  return (
    <div
      onClick={() => {
        if (!isSubscribed) {
          onRequireSubscription?.();
        } else {
          onSelect(opportunity);
        }
      }}
      className="group relative glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer h-full overflow-visible"
    >
      {/* Red Rotating Starburst Badge */}
      {isOpportunityNewActive(opportunity.id, opportunity.isNew) && (
        <div className="absolute -top-3.5 -left-2.5 z-20 pointer-events-none">
          <RotatingNewBadge size="md" />
        </div>
      )}

      {/* Top Content Block */}
      <div>
        {/* 1. Header: Issuing Authority Badge & Star Favorite Button */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-pill text-slate-800 dark:text-slate-200 text-[11px] font-bold min-w-0 max-w-[70%]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className={`truncate ${!isSubscribed ? 'text-blur-locked opacity-50' : ''}`}>
              {sanitizeTextForReviewer((localized.issuingAuthority || 'Official Authority').split('(')[0].trim(), isReviewer)}
            </span>
          </div>

          {onToggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(opportunity.id);
              }}
              className={`p-1.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                isFavorite
                  ? 'bg-amber-100 text-amber-500 border-amber-300 hover:bg-amber-200'
                  : 'bg-slate-50 text-slate-400 hover:text-amber-500 hover:bg-amber-50 border-slate-200'
              }`}
              title={t('subfilters.favorites')}
              aria-label="Favorite"
            >
              <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
            </button>
          )}
        </div>

        {/* 1B. Second Row: Section Badge, Status Badge & Pass Lock */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-pill text-slate-800 dark:text-slate-200 text-[10px] sm:text-[11px] font-bold whitespace-nowrap shrink-0">
            {getLifeStageIcon(opportunity.lifeStage)}
            <span>{displayCategory}</span>
          </span>

          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border whitespace-nowrap shrink-0 ${
            opportunity.applicationStatus === 'active_now'
              ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
              : opportunity.applicationStatus === 'upcoming'
              ? 'bg-blue-50 text-blue-950 border-blue-200'
              : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}>
            {opportunity.applicationStatus === 'active_now' ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
            ) : (
              <Calendar className="w-3 h-3 text-slate-600 shrink-0" />
            )}
            <span>{localized.applicationStatusText}</span>
          </span>

          {!isSubscribed && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRequireSubscription?.();
              }}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-[10px] sm:text-[11px] font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              title={language === 'hi' ? 'पास आवश्यक • अनलॉक करने हेतु क्लिक करें' : 'Pass Required • Click to Unlock'}
            >
              <Lock className="w-3 h-3 text-amber-600 shrink-0" />
              <span>{language === 'hi' ? 'पास आवश्यक' : 'Pass Required'}</span>
            </button>
          )}
        </div>

        {/* 2. Title & Speech Reader */}
        <div className="mb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug line-clamp-2 min-h-[2.6rem] ${
              !isSubscribed ? 'text-blur-locked opacity-40' : ''
            }`}>
              {displayTitle}
            </h3>
            <div className="shrink-0 mt-0.5" onClick={(e) => e.stopPropagation()}>
              <VoiceReader textToSpeak={isSubscribed ? `${displayTitle}. ${displayBenefit}` : `${language === 'hi' ? 'अवसर विवरण देखने हेतु 1-वर्षीय नागरिक पास केवल 1 रुपये में सक्रिय करें' : 'Activate 1-Year Citizen Pass for 1 rupee to unlock opportunity details'}`} />
            </div>
          </div>
        </div>

        {/* 3. Benefit Headline Box */}
        <div className="mb-3 p-2.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25">
          <span className="text-xs font-bold text-emerald-950 dark:text-emerald-300 block leading-snug">
            {displayBenefit}
          </span>
        </div>

        {/* 4. Description */}
        <p className={`text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 ${
          !isSubscribed ? 'text-blur-locked opacity-50' : ''
        }`}>
          {displayDescription}
        </p>
      </div>

      {/* 5. Footer Details & Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-white/10 mt-auto space-y-2.5">
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium min-w-0">
            <Clock className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{formattedDeadline}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-bold shrink-0">
            <Banknote className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
            <span>{sanitizeTextForReviewer(localized.officialFee, isReviewer)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          {isSubscribed ? (
            <>
              {/* Ultra-Highlighted "View Portal" CTA with Radar Beacon */}
              <a
                href={safePortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="flex-1 py-2 sm:py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs transition-all shadow-md shadow-emerald-600/30 border border-emerald-400/50 ring-1 ring-emerald-400/30 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] group"
                title={language === 'hi' ? 'सत्यापित आधिकारिक पोर्टल खोलें' : 'Open Verified Official Portal'}
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-white" />
                <span className="truncate">{language === 'hi' ? 'पोर्टल खोलें' : 'View Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* View Full Details Drawer Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(opportunity);
                }}
                className="py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-[#18181c] hover:bg-slate-100 dark:hover:bg-[#222227] text-slate-800 dark:text-zinc-200 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0"
                title={language === 'hi' ? 'पूर्ण विवरण देखें' : 'View Full Details'}
              >
                <span>{language === 'hi' ? 'विवरण' : 'Details'}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRequireSubscription?.();
              }}
              className="flex-1 py-2 sm:py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>{language === 'hi' ? 'अनलॉक करें (₹1)' : 'Unlock (₹1)'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleAddToCalendar}
            className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-[#18181c] hover:bg-slate-100 dark:hover:bg-[#222227] text-slate-600 dark:text-zinc-200 text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
            title={language === 'hi' ? 'गूगल कैलेंडर में जोड़ें' : 'Add to Google Calendar'}
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
