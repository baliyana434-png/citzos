'use client';

import React from 'react';
import { motion } from 'framer-motion';
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

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const buttonRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const [pillPos, setPillPos] = React.useState<{ left: number; width: number; height: number; ready: boolean }>({
    left: 0,
    width: 0,
    height: 0,
    ready: false,
  });

  const updatePill = React.useCallback(() => {
    const activeBtn = buttonRefs.current[activeTab];
    if (activeBtn) {
      setPillPos({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        height: activeBtn.offsetHeight,
        ready: true,
      });
    }
  }, [activeTab]);

  React.useLayoutEffect(() => {
    updatePill();
  }, [updatePill]);

  React.useEffect(() => {
    updatePill();
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(updatePill).catch(() => {});
    }
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [updatePill]);

  const subContainerRef = React.useRef<HTMLDivElement | null>(null);
  const subButtonRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const [subPillPos, setSubPillPos] = React.useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  });

  const updateSubPill = React.useCallback(() => {
    const activeSubBtn = subButtonRefs.current[activeSubFilter];
    if (activeSubBtn) {
      setSubPillPos({
        left: activeSubBtn.offsetLeft,
        width: activeSubBtn.offsetWidth,
        ready: true,
      });
    }
  }, [activeSubFilter]);

  React.useLayoutEffect(() => {
    updateSubPill();
  }, [updateSubPill]);

  React.useEffect(() => {
    updateSubPill();
    window.addEventListener('resize', updateSubPill);
    return () => window.removeEventListener('resize', updateSubPill);
  }, [updateSubPill]);

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

  // Auto-scroll the active sub-filter into view horizontally
  React.useEffect(() => {
    const activeSubBtn = subButtonRefs.current[activeSubFilter];
    if (activeSubBtn) {
      activeSubBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeSubFilter]);

  return (
    <div className="w-full space-y-3">
      {/* 1. Main Life Stage Switch - Apple VisionOS Liquid Glass Capsule */}
      <div 
        ref={containerRef}
        className="relative flex p-1.5 glass-tab-bar rounded-2xl overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 touch-pan-x scroll-smooth shadow-sm transition-all"
      >
        {/* Continuous Single Apple Liquid Glass Capsule (Zero Glitch / Pure Spring Physics) */}
        {pillPos.ready && (
          <motion.div
            className="apple-liquid-glass"
            initial={false}
            animate={{
              x: pillPos.left,
              width: pillPos.width,
            }}
            transition={{
              type: 'spring',
              stiffness: 460,
              damping: 32,
              mass: 0.75,
            }}
            style={{
              position: 'absolute',
              top: '6px',
              bottom: '6px',
              left: 0,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        )}

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
              className={`relative shrink-0 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm cursor-pointer select-none transition-colors duration-200 z-10 active:scale-[0.97] ${
                isActive
                  ? 'text-slate-950 dark:text-white font-black'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white font-bold'
              }`}
            >
              <span
                className={`transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'text-emerald-700 dark:text-emerald-400 scale-110 drop-shadow-2xs'
                    : 'text-slate-500 dark:text-zinc-400'
                }`}
              >
                {tab.icon}
              </span>

              <span className="whitespace-nowrap">{displayLabel}</span>

              {matchCount !== undefined && matchCount > 0 && (
                <span
                  className={`ml-1 px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-md transition-all ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-500/30 font-black'
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

      {/* 2. Sub-Filters Bar (Apple Liquid Glass Segmented Pill) */}
      <div 
        ref={subContainerRef}
        className="relative flex items-center p-1 glass-tab-bar rounded-full overflow-x-auto no-scrollbar gap-1 sm:gap-1.5 shadow-2xs touch-pan-x scroll-smooth"
      >
        {subPillPos.ready && (
          <motion.div
            className="apple-liquid-glass apple-liquid-glass-rounded"
            initial={false}
            animate={{
              x: subPillPos.left,
              width: subPillPos.width,
            }}
            transition={{
              type: 'spring',
              stiffness: 460,
              damping: 32,
              mass: 0.75,
            }}
            style={{
              position: 'absolute',
              top: '4px',
              bottom: '4px',
              left: 0,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        )}

        {subFilters.map((sub) => {
          const isSubActive = activeSubFilter === sub.id;
          return (
            <button
              key={sub.id}
              ref={(el) => {
                subButtonRefs.current[sub.id] = el;
              }}
              onClick={() => onSubFilterChange(sub.id)}
              className={`relative z-10 px-3 py-1 rounded-full text-xs cursor-pointer select-none whitespace-nowrap transition-colors duration-200 active:scale-[0.97] ${
                isSubActive
                  ? 'text-slate-950 dark:text-white font-black'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white font-bold'
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
