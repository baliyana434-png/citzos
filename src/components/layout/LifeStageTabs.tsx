'use client';

import React from 'react';
import { LifeStage } from '@/types';
import { useTranslation } from '@/i18n/useTranslation';
import { REVIEWER_TAB_LABELS } from '@/lib/complianceFilter';
import { Award, Building2, GraduationCap, BookOpen, Globe, Wrench, Rocket, Landmark, Gift, HeartPulse } from 'lucide-react';

interface LifeStageTabsProps {
  activeTab: LifeStage;
  onTabChange: (tab: LifeStage) => void;
  activeSubFilter: string;
  onSubFilterChange: (filter: string) => void;
  totalCount: number;
  tabMatchCounts?: Partial<Record<LifeStage, number>> | null;
  isReviewer?: boolean;
}

export const LifeStageTabs: React.FC<LifeStageTabsProps> = ({
  activeTab,
  onTabChange,
  activeSubFilter,
  onSubFilterChange,
  totalCount,
  tabMatchCounts,
  isReviewer = false,
}) => {
  const { t } = useTranslation();

  const tabs: { id: LifeStage; labelKey: string; icon: React.ReactNode }[] = [
    { id: 'exams', labelKey: 'tabs.exams', icon: <Award className="w-4 h-4" /> },
    { id: 'private_jobs', labelKey: 'tabs.private_jobs', icon: <Building2 className="w-4 h-4" /> },
    { id: 'internships', labelKey: 'tabs.internships', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'education', labelKey: 'tabs.education', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'abroad_jobs', labelKey: 'tabs.abroad_jobs', icon: <Globe className="w-4 h-4" /> },
    { id: 'career', labelKey: 'tabs.career', icon: <Wrench className="w-4 h-4" /> },
    { id: 'startups', labelKey: 'tabs.startups', icon: <Rocket className="w-4 h-4" /> },
    { id: 'schemes', labelKey: 'tabs.schemes', icon: <Landmark className="w-4 h-4" /> },
    { id: 'freebies', labelKey: 'tabs.freebies', icon: <Gift className="w-4 h-4" /> },
    { id: 'health', labelKey: 'tabs.health', icon: <HeartPulse className="w-4 h-4" /> },
  ];

  const subFilters = isReviewer
    ? [
        { id: 'all', label: 'All Modules' },
        { id: 'new', label: 'Newly Added' },
        { id: 'upcoming', label: 'Upcoming Curriculum' },
        { id: 'active_now', label: 'Active Guides' },
        { id: 'free_only', label: 'Open Access' },
      ]
    : [
        { id: 'all', label: t('subfilters.all') },
        { id: 'new', label: t('subfilters.new') },
        { id: 'upcoming', label: t('subfilters.upcoming') },
        { id: 'active_now', label: t('subfilters.active_now') },
        { id: 'govt_only', label: t('subfilters.govt_only') },
        { id: 'free_only', label: t('subfilters.free_only') },
        { id: 'high_value', label: t('subfilters.high_value') },
      ];

  const buttonRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});

  // Auto-scroll the active tab into view horizontally so user instantly sees the selected section
  React.useEffect(() => {
    const activeBtn = buttonRefs.current[activeTab];
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeTab]);

  return (
    <div className="w-full space-y-3">
      {/* 1. Main Life Stage Switch - Apple Liquid Glassmorphism Toggle Controls */}
      <div className="flex p-1.5 glass-tab-bar rounded-2xl overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 touch-pan-x scroll-smooth shadow-sm transition-all">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const matchCount = tabMatchCounts ? tabMatchCounts[tab.id] : undefined;
          const displayLabel = isReviewer
            ? REVIEWER_TAB_LABELS[tab.id] || t(tab.labelKey)
            : t(tab.labelKey);

          return (
            <button
              key={tab.id}
              ref={(el) => {
                buttonRefs.current[tab.id] = el;
              }}
              onClick={() => onTabChange(tab.id)}
              className={`shrink-0 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none ${
                isActive
                  ? 'apple-liquid-active font-black active:scale-[0.97]'
                  : 'text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10 font-semibold border border-transparent active:scale-[0.98]'
              }`}
            >
              <span className={`transition-colors shrink-0 ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500 dark:text-zinc-400'}`}>
                {tab.icon}
              </span>
              <span className="whitespace-nowrap">{displayLabel}</span>
              {matchCount !== undefined && matchCount > 0 && (
                <span
                  className={`ml-1 px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-md transition-all ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-200/90 dark:bg-[#202127] text-slate-700 dark:text-zinc-400'
                  }`}
                >
                  {matchCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Sub-Filters Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1">
        {subFilters.map((sub) => {
          const isSubActive = activeSubFilter === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => onSubFilterChange(sub.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer border ${
                isSubActive
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white/80 dark:bg-[#141417] text-slate-700 dark:text-zinc-200 border-slate-300 dark:border-zinc-700 hover:bg-white dark:hover:bg-[#1c1c20]'
              }`}
            >
              {sub.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
