'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Star, 
  ArrowLeft, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  PhoneCall, 
  ExternalLink,
  ShieldCheck,
  Calendar,
  AlertCircle,
  GraduationCap,
  Play,
  X,
  BookmarkCheck,
  Award
} from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { getLocalizedOpportunity } from '@/data/localization/opportunityTranslator';
import { INITIAL_OPPORTUNITIES } from '@/data/opportunities';
import { LiveFeedService } from '@/services/liveFeedService';
import { Opportunity } from '@/types';
import { OpportunityCard } from '@/components/cards/OpportunityCard';
import { DetailBottomSheet } from '@/components/drawers/DetailBottomSheet';
import { SKILL_TOPICS, SkillTopic, SkillVideo } from '@/data/skillsData';

export default function SavedPage() {
  const router = useRouter();
  const { language, setLanguage, t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'opportunities' | 'skills'>('opportunities');
  const [savedSkillIds, setSavedSkillIds] = useState<Set<string>>(new Set<string>());
  const [savedVideosList, setSavedVideosList] = useState<any[]>([]);
  const [playingSkillVideo, setPlayingSkillVideo] = useState<SkillVideo | null>(null);

  // Combine initial catalog with live-synced crawler circulars
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

  // Read saved IDs & profile from localStorage with safe client mount hydration & auth gate
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set<string>());
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    try {
      const isLoggedOut = localStorage.getItem('citizen_logged_out');
      const savedProf = localStorage.getItem('citizen_profile');
      if (isLoggedOut === 'true' || !savedProf) {
        router.replace('/login');
        return;
      }
      const parsed = JSON.parse(savedProf);
      if (!parsed || parsed.id === 'cit-guest' || (!parsed.isAadhaarVerified && !parsed.isOnboarded)) {
        router.replace('/login');
        return;
      }
      setProfile(parsed);

      const saved = localStorage.getItem('citizen_favorites');
      if (saved) {
        setFavoriteIds(new Set(JSON.parse(saved)));
      }
      const savedSkillsStore = localStorage.getItem('citizen_saved_skills');
      if (savedSkillsStore) {
        setSavedSkillIds(new Set(JSON.parse(savedSkillsStore)));
      }
      const savedVideosStore = localStorage.getItem('citizen_saved_videos');
      if (savedVideosStore) {
        try { setSavedVideosList(JSON.parse(savedVideosStore)); } catch (e) { setSavedVideosList([]); }
      }
    } catch (e) {
      router.replace('/login');
    }
  }, [router]);

  // Listen to storage and custom favorites_updated / skills_updated / videos_updated events
  useEffect(() => {
    const handleStorageUpdate = () => {
      try {
        const saved = localStorage.getItem('citizen_favorites');
        if (saved) {
          setFavoriteIds(new Set(JSON.parse(saved)));
        } else {
          setFavoriteIds(new Set());
        }

        const savedSkillsStore = localStorage.getItem('citizen_saved_skills');
        if (savedSkillsStore) {
          setSavedSkillIds(new Set(JSON.parse(savedSkillsStore)));
        } else {
          setSavedSkillIds(new Set());
        }

        const savedVideosStore = localStorage.getItem('citizen_saved_videos');
        if (savedVideosStore) {
          try { setSavedVideosList(JSON.parse(savedVideosStore)); } catch (e) { setSavedVideosList([]); }
        } else {
          setSavedVideosList([]);
        }
      } catch (e) {
        setFavoriteIds(new Set());
        setSavedSkillIds(new Set());
        setSavedVideosList([]);
      }
    };

    window.addEventListener('storage', handleStorageUpdate);
    window.addEventListener('favorites_updated', handleStorageUpdate);
    window.addEventListener('skills_updated', handleStorageUpdate);
    window.addEventListener('videos_updated', handleStorageUpdate);
    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener('favorites_updated', handleStorageUpdate);
      window.removeEventListener('skills_updated', handleStorageUpdate);
      window.removeEventListener('videos_updated', handleStorageUpdate);
    };
  }, []);

  // Filter ONLY opportunities that have been saved by the citizen
  const savedOpportunities = useMemo(() => {
    return ALL_OPPORTUNITIES.filter((opp) => {
      if (!favoriteIds.has(opp.id)) return false;

      // Search query within saved items
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = opp.title.toLowerCase().includes(q) || opp.titleHi.includes(q);
        const matchDesc = opp.description.toLowerCase().includes(q) || opp.descriptionHi.includes(q);
        const matchAuthority = opp.gazette?.issuingAuthority?.toLowerCase().includes(q);
        const matchBenefit = (opp.benefitHeadline?.toLowerCase().includes(q) || opp.benefitHeadlineHi?.includes(q));
        const matchTags = opp.tags.some((tag) => tag.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchAuthority && !matchTags && !matchBenefit) return false;
      }

      return true;
    });
  }, [ALL_OPPORTUNITIES, favoriteIds, searchQuery]);

  // Filter ONLY skills that have been saved by the citizen
  const savedSkills = useMemo(() => {
    return SKILL_TOPICS.filter((topic) => {
      if (!savedSkillIds.has(topic.id)) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = topic.name.toLowerCase().includes(q) || topic.nameHi.includes(q);
        const matchDesc = topic.shortDesc.toLowerCase().includes(q) || topic.shortDescHi.includes(q);
        if (!matchName && !matchDesc) return false;
      }

      return true;
    });
  }, [savedSkillIds, searchQuery]);

  const handleRemoveSkill = (topicId: string, topicName: string) => {
    setSavedSkillIds((prev) => {
      const next = new Set(prev);
      next.delete(topicId);
      try {
        localStorage.setItem('citizen_saved_skills', JSON.stringify(Array.from(next)));
        window.dispatchEvent(new Event('skills_updated'));
      } catch (e) {}
      return next;
    });
    setToastMessage(language === 'hi' ? `"${topicName}" हटाया गया` : `"${topicName}" removed from saved skills`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRemoveSavedVideo = (videoId: string, videoTitle: string) => {
    setSavedVideosList((prev) => {
      const next = prev.filter((v) => v.id !== videoId);
      try {
        localStorage.setItem('citizen_saved_videos', JSON.stringify(next));
        window.dispatchEvent(new Event('videos_updated'));
      } catch (e) {}
      return next;
    });
    setToastMessage(language === 'hi' ? `"${videoTitle}" वॉचलिस्ट से हटाया गया` : `"${videoTitle}" removed from watchlist`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle Unstar / Toggle Favorite
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

      const opp = ALL_OPPORTUNITIES.find((o) => o.id === oppId);
      const title = opp ? (language === 'hi' ? opp.titleHi : opp.title) : '';

      if (isAdding) {
        setToastMessage(
          language === 'hi'
            ? `"${title.slice(0, 40)}..." पसंदीदा में पुनः जोड़ा गया!`
            : `"${title.slice(0, 40)}..." restored to Saved!`
        );
      } else {
        setToastMessage(
          language === 'hi'
            ? `पसंदीदा सूची से हटाया गया।`
            : `Removed from Saved items.`
        );
      }
      setTimeout(() => setToastMessage(null), 3000);

      return next;
    });
  };

  // Clear all saved items with confirmation
  const handleClearAll = () => {
    const confirmMsg = language === 'hi' 
      ? 'क्या आप सभी सुरक्षित किए गए अवसरों को हटाना चाहते हैं?' 
      : 'Are you sure you want to remove all saved opportunities?';
    if (window.confirm(confirmMsg)) {
      try {
        localStorage.setItem('citizen_favorites', JSON.stringify([]));
        window.dispatchEvent(new Event('favorites_updated'));
      } catch (e) {}
      setFavoriteIds(new Set());
      setToastMessage(
        language === 'hi'
          ? 'सभी पसंदीदा अवसर हटा दिए गए।'
          : 'All saved opportunities cleared.'
      );
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  // WhatsApp Share (100% localized, zero-leakage, zero fake emojis)
  const handleShareWhatsApp = (opp: Opportunity) => {
    const localized = getLocalizedOpportunity(opp, language);
    const isGovt = opp.category === 'govt_scheme' || opp.category === 'govt_job' || opp.category === 'competitive_exam';
    const tagHeader = isGovt ? `*${t('official_verified')}*` : `*${t('card.verified_source')}*`;
    const text = encodeURIComponent(
      `${tagHeader}\n\n*${localized.title}*\n*${t('card.benefit')}:* ${localized.benefitHeadline}\n*${t('card.verified_source')}:* ${localized.issuingAuthority}\n\n${window.location.origin}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white flex flex-col antialiased">
      {/* 0. Top Strip */}
      <div className="w-full bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 sm:px-8 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wider text-slate-100 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
            {language === 'hi' ? 'सत्यापित सुरक्षित अवसर • सिटिजन लाइफ' : 'Citzos • SAVED & STARRED OPPORTUNITIES'}
          </span>
          <span className="text-slate-600 hidden md:inline">•</span>
          <span className="text-slate-400 text-[10px] hidden md:inline">
            {language === 'hi' ? 'आपके चुने हुए सभी फॉर्म व योजनाएं' : 'Your Personal Priority Watchlist'}
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 text-[10px]">
          <span className="text-amber-400 font-mono font-bold flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
            SAVED WATCHLIST
          </span>
        </div>
      </div>

      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Back Button & Title */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'hi' ? 'मुख्य पृष्ठ' : 'All Opportunities'}</span>
              </Link>
              <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-slate-950 shadow-sm">
                  <Star className="w-5 h-5 fill-slate-950 text-slate-950" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none">
                    {language === 'hi' ? 'पसंदीदा एवं सुरक्षित अवसर' : 'Saved & Starred Opportunities'}
                  </h1>
                  <p className="text-[11px] text-slate-500 hidden sm:block mt-0.5">
                    {language === 'hi' ? 'आपके द्वारा सुरक्षित किए गए सभी आवेदन, नौकरियां व योजनाएं' : 'Your bookmarked registrations, jobs & schemes'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links & Language */}
            <div className="flex items-center gap-2">
              <Link
                href="/helpline"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-800 text-xs font-bold border border-red-200 transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'हेल्पलाइन' : 'Helplines'}</span>
              </Link>

              {/* 6-Language Switcher */}
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        {/* Dynamic Notification Toast */}
        {toastMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-lg flex items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Saved Items Type Switch Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'opportunities'
                ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${activeTab === 'opportunities' ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{language === 'hi' ? 'अवसर व योजनाएं' : 'Opportunities & Schemes'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black">
              {savedOpportunities.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'skills'
                ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className={`w-3.5 h-3.5 ${activeTab === 'skills' ? 'text-emerald-600' : ''}`} />
            <span>{language === 'hi' ? 'कौशल व वीडियो' : 'Saved Videos & Skills'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
              {savedVideosList.length + savedSkills.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Saved Opportunities */}
        {activeTab === 'opportunities' && (
          <>
            {/* Saved Items Control Bar (Search & Stats & Clear) */}
            {favoriteIds.size > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-extrabold flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>
                      {language === 'hi' 
                        ? `${savedOpportunities.length} अवसर सुरक्षित हैं` 
                        : `${savedOpportunities.length} Saved Opportunities`}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 hidden md:inline">
                    {language === 'hi'
                      ? '• कार्ड पर स्टार दबाकर कभी भी सूची से हटा सकते हैं'
                      : '• Click star icon on any card to remove from saved'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Search Inside Saved Items */}
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={language === 'hi' ? 'सुरक्षित अवसरों में खोजें...' : 'Search in saved...'}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-slate-900 placeholder-slate-400 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all"
                    />
                  </div>

                  {/* Clear All Button */}
                  <button
                    onClick={handleClearAll}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 text-xs font-bold border border-slate-200 hover:border-red-300 transition-all shrink-0"
                    title={language === 'hi' ? 'सभी सुरक्षित अवसर हटाएं' : 'Clear all saved'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{language === 'hi' ? 'सूची साफ करें' : 'Clear All'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Pure Saved Opportunities Grid */}
            {savedOpportunities.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-amber-200/80 p-8 space-y-4 shadow-sm max-w-2xl mx-auto my-6">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-100 to-amber-50 text-amber-500 border border-amber-200 flex items-center justify-center mx-auto shadow-inner">
                  <Star className="w-8 h-8 fill-amber-400 text-amber-500" />
                </div>
                
                <div className="space-y-1.5">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">
                    {language === 'hi' ? 'कोई पसंदीदा फॉर्म या अवसर सुरक्षित नहीं है' : 'No Saved Opportunities Yet'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    {language === 'hi'
                      ? 'आपने अभी तक कोई अवसर सेव नहीं किया है। मुख्य पृष्ठ पर किसी भी भर्ती, परीक्षा, इंटर्नशिप या सरकारी योजना के कार्ड पर स्टार आइकन दबाएं ताकि वह सीधे यहाँ सुरक्षित हो सके।'
                      : 'You have not saved any opportunities yet. Click the star icon on any opportunity card on the homepage to save it here for fast access.'}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black shadow-md shadow-emerald-700/20 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{language === 'hi' ? 'सभी अवसर देखें' : 'Browse All Opportunities'}</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {savedOpportunities.map((opp) => (
                  <OpportunityCard
                    key={opp.id}
                    opportunity={opp}
                    onSelect={(opp) => setSelectedOpp(opp)}
                    onShareWhatsApp={handleShareWhatsApp}
                    citizenProfile={profile}
                    isFavorite={true}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Tab 2: Saved Skills & Video Courses */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            {savedVideosList.length === 0 && savedSkills.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-emerald-200/80 p-8 space-y-4 shadow-sm max-w-2xl mx-auto my-6">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-100 to-teal-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-inner">
                  <GraduationCap className="w-8 h-8" />
                </div>
                
                <div className="space-y-1.5">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">
                    {language === 'hi' ? 'कोई वीडियो या कोर्स सेव नहीं किया गया है' : 'No Saved Videos or Courses Yet'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    {language === 'hi'
                      ? 'कौशल सीख केंद्र (Skills Hub) पर जाकर किसी भी विदेशी भाषा, वीडियो एडिटिंग, फोटोग्राफी, या सरकारी परीक्षा के किसी भी वीडियो पर स्टार आइकन दबाकर यहाँ सेव करें।'
                      : 'Visit the Skills Hub and bookmark any specific video or topic in German, Japanese, Video Editing, Photography or Coding to watch here later.'}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/skills"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{language === 'hi' ? 'कौशल सीख केंद्र पर जाएं (Skills Hub)' : 'Explore Skills Hub'}</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* 1. Saved Individual Videos Section */}
                {savedVideosList.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                          {language === 'hi' ? `सुरक्षित किए गए वीडियोज (${savedVideosList.length})` : `Saved Videos (${savedVideosList.length})`}
                        </h3>
                      </div>
                      <span className="text-[11px] text-slate-500 font-bold">
                        {language === 'hi' ? 'बाद में देखने हेतु' : 'Watch Later'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {savedVideosList.map((video) => (
                        <div
                          key={video.id}
                          className="bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl p-4 shadow-xs transition-all flex flex-col justify-between gap-3 group"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className={`px-2 py-0.2 rounded-md text-[10px] font-black uppercase ${
                                video.level === 'Beginner'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : video.level === 'Intermediate'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                    : 'bg-rose-100 text-rose-800 border border-rose-200'
                              }`}>
                                {video.level || 'Tutorial'}
                              </span>

                              <button
                                onClick={() => handleRemoveSavedVideo(video.id, language === 'hi' ? video.titleHi || video.title : video.title)}
                                className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                                title="Remove from Watchlist"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div>
                              <span className="text-[10px] uppercase font-bold text-emerald-700 block truncate">
                                {language === 'hi' ? video.topicNameHi || video.topicName : video.topicName}
                              </span>
                              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug line-clamp-2 mt-0.5 group-hover:text-emerald-700 transition-colors">
                                {language === 'hi' ? video.titleHi || video.title : video.title}
                              </h4>
                            </div>

                            <div className="flex items-center gap-2 text-[11px] text-slate-500">
                              <span className="font-semibold text-slate-700 truncate">{video.channelName}</span>
                              <span>•</span>
                              <span className="font-mono">{video.duration}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() => setPlayingSkillVideo(video)}
                              className="flex-1 py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5 fill-white" />
                              <span>{language === 'hi' ? 'यहीं देखें' : 'Watch Video'}</span>
                            </button>
                            <a
                              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shrink-0"
                              title="Open on YouTube"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Saved Topics Section if any */}
                {savedSkills.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                        {language === 'hi' ? `सुरक्षित किए गए पूरे कोर्स (${savedSkills.length})` : `Saved Complete Courses (${savedSkills.length})`}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedSkills.map((skill) => (
                        <div
                          key={skill.id}
                          className="bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl p-4 shadow-xs transition-all space-y-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                                  {skill.difficulty}
                                </span>
                                <span className="text-[10px] font-mono text-slate-500">
                                  {skill.estTimeToLearn}
                                </span>
                              </div>
                              <h3 className="text-sm font-extrabold text-slate-900">
                                {language === 'hi' ? skill.nameHi : skill.name}
                              </h3>
                            </div>

                            <button
                              onClick={() => handleRemoveSkill(skill.id, language === 'hi' ? skill.nameHi : skill.name)}
                              className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                              title="Remove topic"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                            <span className="text-[11px] font-extrabold text-emerald-700">
                              {skill.averageEarningMonthly}
                            </span>
                            <Link
                              href="/skills"
                              className="text-[11px] font-bold text-slate-700 hover:text-emerald-700 flex items-center gap-1"
                            >
                              <span>{language === 'hi' ? 'कौशल हब में खोलें' : 'Open in Skills Hub'}</span>
                              <ArrowLeft className="w-3 h-3 rotate-180" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Video Player Modal for Saved Page */}
      {playingSkillVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3 text-white">
              <div className="flex items-center gap-2 min-w-0">
                <Play className="w-4 h-4 fill-emerald-400 text-emerald-400 shrink-0" />
                <h4 className="text-xs sm:text-sm font-extrabold truncate">
                  {language === 'hi' ? playingSkillVideo.titleHi : playingSkillVideo.title}
                </h4>
              </div>
              <button
                onClick={() => setPlayingSkillVideo(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${playingSkillVideo.youtubeId}?autoplay=1&rel=0`}
                title={playingSkillVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Detail Bottom Sheet / Slide-over */}
      <DetailBottomSheet
        opportunity={selectedOpp}
        onClose={() => setSelectedOpp(null)}
        citizenProfile={profile}
        isFavorite={selectedOpp ? favoriteIds.has(selectedOpp.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}
