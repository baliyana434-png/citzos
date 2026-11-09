'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LifeStageTabs } from '@/components/layout/LifeStageTabs';
import { OpportunityCard } from '@/components/cards/OpportunityCard';
import { DetailBottomSheet } from '@/components/drawers/DetailBottomSheet';
import { AuthModal, AuthScreen, AuthPrefillData } from '@/components/auth/AuthModal';
import { UserProfileDrawer } from '@/components/profile/UserProfileDrawer';
import { CitizenOnboardingModal } from '@/components/auth/CitizenOnboardingModal';
import { SubscriptionModal } from '@/components/subscription/SubscriptionModal';
import { PushNotificationBanner } from '@/components/notifications/PushNotificationBanner';
import { GoogleAuthService, getGoogleRedirectResultSafe, isGoogleRedirectPending } from '@/services/googleAuth';
import { INITIAL_OPPORTUNITIES } from '@/data/opportunities';
import { getLocalizedOpportunity } from '@/data/localization/opportunityTranslator';
import { calculateExactAge } from '@/utils/antiFraudValidation';
import { BrandSplashScreen } from '@/components/common/BrandSplashScreen';
import { isOpportunityNewActive, recordOpportunitiesSeen } from '@/lib/newBadgeTracker';
import { isOpportunityDeadlinePassed } from '@/lib/dateUtils';
import { isCitizenSubscribed, verifySubscriptionWithServer } from '@/lib/subscriptionValidator';
import { isComplianceReviewer, sanitizeTextForReviewer, REVIEWER_TAB_LABELS } from '@/lib/complianceFilter';
import { CitizenProfile, FamilyMember, LifeStage, Opportunity, CountryCode, CitizenSubscription } from '@/types';
import { useTranslation } from '@/i18n/useTranslation';
import { useCountry } from '@/context/CountryContext';
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Download,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Clock,
  Star,
  Award,
  Lock,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';

const DEFAULT_PROFILE: CitizenProfile = {
  id: 'cit-default',
  fullName: '',
  phoneNumber: '',
  aadhaarNumberMasked: '',
  isAadhaarVerified: false,
  isOnboarded: false,
  age: 21,
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

const GUEST_PROFILE: CitizenProfile = {
  id: 'cit-guest',
  fullName: 'Guest Citizen',
  phoneNumber: '',
  aadhaarNumberMasked: '',
  isAadhaarVerified: false,
  isOnboarded: false,
  age: 21,
  dob: '2003-01-01',
  gender: 'male',
  state: '',
  district: '',
  pincode: '',
  lifePhase: 'exam_aspirant',
  casteCategory: 'General',
  familyIncomeAnnual: 0,
  educationLevel: '12th_pass',
  activeGoal: 'Browse Verified Opportunities',
  notificationsEnabled: {
    webPush: false,
    whatsApp: false,
    urgentDeadlinesOnly: false,
  },
};


const GOVT_CATEGORIES = new Set([
  'govt_scheme',
  'govt_job',
  'competitive_exam',
  'scholarship',
  'healthcare_free',
]);

export default function HomePage() {
  const { t, language } = useTranslation();
  const { country, setCountry, countryMeta } = useCountry();

  // Master Citizen Account Profile (Individual citizen) - Synchronous hydration prevents splash flicker on page return
  const [profile, setProfile] = useState<CitizenProfile | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const isLoggedOut = localStorage.getItem('citizen_logged_out');
      if (isLoggedOut === 'true') return null;
      const saved = localStorage.getItem('citizen_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id && parsed.id !== 'cit-guest' && parsed.id !== 'cit-default' && parsed.isOnboarded) {
          return parsed;
        }
      }
    } catch (_) {}
    return null;
  });

  const [isHydratingAuth, setIsHydratingAuth] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const isLoggedOut = localStorage.getItem('citizen_logged_out');
      if (isLoggedOut === 'true') return false;
      const saved = localStorage.getItem('citizen_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id && parsed.id !== 'cit-guest' && parsed.id !== 'cit-default' && parsed.isOnboarded) {
          return false; // Already hydrated! Zero flicker on navigating back to home!
        }
      }
    } catch (_) {}
    return true;
  });

  // Internal dynamic age calculation based on Date of Birth (Auto-increments by 1 on every birthday)
  const activeProfile = useMemo(() => {
    const base = profile || GUEST_PROFILE;
    if (base.dob) {
      const dynamicAge = calculateExactAge(base.dob);
      if (dynamicAge > 0 && dynamicAge !== base.age) {
        return { ...base, age: dynamicAge };
      }
    }
    return base;
  }, [profile]);

  const isAuthenticated = Boolean(
    profile &&
    profile.id &&
    profile.id !== 'cit-guest' &&
    profile.id !== 'cit-default' &&
    (profile.isAadhaarVerified || profile.isOnboarded)
  );

  const isReviewer = isComplianceReviewer(profile?.email);

  // Always default to 1st tab: exams (Competitive Exams / प्रतियोगी परीक्षाएं)
  const [activeTab, setActiveTab] = useState<LifeStage>('exams');
  const [activeSubFilter, setActiveSubFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authModalScreen, setAuthModalScreen] = useState<AuthScreen>('login');
  const [authPrefillData, setAuthPrefillData] = useState<AuthPrefillData | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState<boolean>(false);
  const [pendingGoogleUser, setPendingGoogleUser] = useState<{
    name: string;
    email: string;
    photoURL?: string;
  } | null>(null);

  const [paymentSuccessToast, setPaymentSuccessToast] = useState<string | null>(null);

  // Auto-switch tab based on citizen role (used only when role is explicitly updated)
  const handleRoleAutoSwitch = (role: string) => {
    if (role === 'farmer' || role === 'homemaker') {
      setActiveTab('schemes');
    } else if (role === 'senior_citizen') {
      setActiveTab('health');
    } else if (role === 'school_student') {
      setActiveTab('education');
    } else if (role === 'college_student') {
      setActiveTab('internships');
    } else if (role === 'exam_aspirant') {
      setActiveTab('exams');
    } else if (role === 'job_seeker') {
      setActiveTab('private_jobs');
    } else if (role === 'business_owner') {
      setActiveTab('startups');
    } else if (role === 'employed') {
      setActiveTab('career');
    }
  };

  // User Starred / Favorite Opportunities State
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set<string>());

  // Safe client mount hydration for master profile, Google redirect result & favorite IDs
  useEffect(() => {
    let cancelled = false;

    async function initAuth() {
      // 1. Check if returning from a mobile Google OAuth redirect ONLY if redirect was marked pending
      if (isGoogleRedirectPending()) {
        try {
          const redirectUser = await getGoogleRedirectResultSafe();
          if (cancelled) return;
          if (redirectUser && redirectUser.email) {
            await handleGoogleAuthSuccess({
              name: redirectUser.name,
              email: redirectUser.email,
              photoURL: redirectUser.photoURL,
            });
            setIsHydratingAuth(false);
            return;
          }
        } catch (err) {
          console.warn('Redirect auth check notice:', err);
        }
      }

      // 2. Check local saved profile
      try {
        const isLoggedOut = localStorage.getItem('citizen_logged_out');
        if (isLoggedOut === 'true') {
          setProfile(null);
          setIsHydratingAuth(false);
          window.location.replace('/login?from=logout');
          return;
        }

        const saved = localStorage.getItem('citizen_profile');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (
            parsed &&
            parsed.id &&
            parsed.id !== 'cit-guest' &&
            parsed.id !== 'cit-default' &&
            parsed.isOnboarded &&
            parsed.dob
          ) {
            const dynamicAge = calculateExactAge(parsed.dob);
            if (dynamicAge > 0 && dynamicAge !== parsed.age) {
              parsed.age = dynamicAge;
              try {
                localStorage.setItem('citizen_profile', JSON.stringify(parsed));
              } catch (e) {}
            }
            setProfile(parsed);
            if (parsed.subscription && parsed.subscription.status === 'active') {
              verifySubscriptionWithServer(parsed, () => {
                setProfile((prev) => (prev ? { ...prev, subscription: undefined } : null));
              });
            }

            // Real-base background sync from MongoDB: guarantees 365-day pass and profile persistence forever
            if (parsed.email) {
              fetch(`/api/citizens/profile?email=${encodeURIComponent(parsed.email)}`, { cache: 'no-store' })
                .then((r) => r.json())
                .then((dbData) => {
                  if (cancelled) return;
                  if (dbData.success && dbData.citizen) {
                    const merged: CitizenProfile = {
                      ...parsed,
                      ...dbData.citizen,
                      isOnboarded: true,
                    };
                    setProfile(merged);
                    try {
                      localStorage.setItem('citizen_profile', JSON.stringify(merged));
                    } catch (_) {}
                  }
                })
                .catch(() => {});
            }
            if (parsed.country) {
              setCountry(parsed.country);
            }
            setIsHydratingAuth(false);
            return;
          }
        }

        // 3. Fast fallback: check session with server cookie if local profile is not yet hydrated
        try {
          const meRes = await fetch('/api/auth/me');
          if (cancelled) return;
          const meData = await meRes.json();
          if (meRes.ok && meData.authenticated && meData.citizen) {
            localStorage.setItem('citizen_profile', JSON.stringify(meData.citizen));
            setProfile(meData.citizen);
            if (meData.citizen.country) {
              setCountry(meData.citizen.country);
            }
            setIsHydratingAuth(false);
            return;
          }
        } catch (e) {}
      } catch (e) {
        console.warn('Storage hydration notice:', e);
      }

      // 4. Not authenticated -> redirect to /login
      setProfile(null);
      setIsHydratingAuth(false);
      window.location.replace('/login');
    }

    initAuth();

    try {
      const savedFavs = localStorage.getItem('citizen_favorites');
      if (savedFavs) {
        setFavoriteIds(new Set(JSON.parse(savedFavs)));
      }
    } catch (_) {}

    return () => {
      cancelled = true;
    };
  }, []);

  // Listen to cross-tab & custom storage events
  useEffect(() => {
    const handleFavUpdate = () => {
      try {
        const savedFavs = localStorage.getItem('citizen_favorites');
        if (savedFavs) {
          setFavoriteIds(new Set(JSON.parse(savedFavs)));
        } else {
          setFavoriteIds(new Set());
        }
      } catch (e) {}
    };

    window.addEventListener('storage', handleFavUpdate);
    window.addEventListener('favorites_updated', handleFavUpdate);
    return () => {
      window.removeEventListener('storage', handleFavUpdate);
      window.removeEventListener('favorites_updated', handleFavUpdate);
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

      const opp = opportunities.find((o) => o.id === oppId);
      const title = opp ? (language === 'hi' ? opp.titleHi : opp.title) : '';
      const displayTitle = title.length > 45 ? title.slice(0, 45) + '...' : title;
      if (isAdding) {
        setPaymentSuccessToast(
          language === 'hi'
            ? `"${displayTitle}" सहेजे गए अवसरों में जोड़ दिया गया।`
            : `"${displayTitle}" saved to your list.`
        );
      } else {
        setPaymentSuccessToast(
          language === 'hi'
            ? `सहेजे गए अवसरों से हटाया गया।`
            : `Removed from saved list.`
        );
      }
      setTimeout(() => setPaymentSuccessToast(null), 3500);

      return next;
    });
  };

  // Handle Logout System
  const handleLogout = async () => {
    try {
      await GoogleAuthService.signOut();
    } catch (e) {
      console.warn('Firebase signout notice:', e);
    }
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {}
    try {
      localStorage.setItem('citizen_logged_out', 'true');
      localStorage.removeItem('citizen_profile');
      localStorage.removeItem('citizen_favorites');
      localStorage.removeItem('citizen_session_token');
      window.dispatchEvent(new Event('favorites_updated'));
    } catch (e) {}
    setPendingGoogleUser(null);
    setProfile(null);
    setFavoriteIds(new Set());
    setIsProfileOpen(false);
    setIsOnboardingOpen(false);

    // Immediately navigate to dedicated login page
    window.location.href = '/login?from=logout';
  };

  // Sync profile and favorites from Server Database
  useEffect(() => {
    if (!profile) return;
    const phone = profile.phoneNumber;
    const email = profile.email;
    if (!profile.isAadhaarVerified || (!phone && !email)) return;

    const query = phone ? `phone=${phone}` : `email=${encodeURIComponent(email || '')}`;
    fetch(`/api/citizens/profile?${query}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          if (Array.isArray(d.favorites) && d.favorites.length > 0) {
            setFavoriteIds(new Set(d.favorites));
            try {
              localStorage.setItem('citizen_favorites', JSON.stringify(d.favorites));
            } catch (e) {}
          }
        }
      })
      .catch((err) => console.warn('Server profile sync warning:', err));
  }, [profile?.phoneNumber, profile?.email, profile?.isAadhaarVerified]);

  // Handle Verification & Login Complete
  const handleVerificationComplete = (updated: Partial<CitizenProfile>) => {
    const isDifferentUser = Boolean(
      updated.email &&
      profile?.email &&
      updated.email.toLowerCase() !== profile.email.toLowerCase()
    );
    const baseProfile: Partial<CitizenProfile> = isDifferentUser ? {} : (profile || {});

    let calculatedAge = updated.age || baseProfile.age || 21;
    const dobCandidate = updated.dob || baseProfile.dob;
    if (dobCandidate) {
      const dyn = calculateExactAge(dobCandidate);
      if (dyn > 0) {
        calculatedAge = dyn;
      }
    }

    const newProfile: CitizenProfile = {
      ...DEFAULT_PROFILE,
      ...baseProfile,
      ...updated,
      age: calculatedAge,
      isAadhaarVerified: true,
      isOnboarded: updated.isOnboarded !== undefined ? updated.isOnboarded : true,
    };

    if (updated.country) {
      setCountry(updated.country);
    }
    if (updated.lifePhase) {
      handleRoleAutoSwitch(updated.lifePhase);
    }

    try {
      localStorage.removeItem('citizen_logged_out');
      localStorage.setItem('citizen_profile', JSON.stringify(newProfile));
    } catch (e) {}
    setProfile(newProfile);

    // Prompt 1-Year Subscription if newly registered and not active
    if (!isCitizenSubscribed(newProfile)) {
      setIsSubscriptionOpen(true);
    }

    setPaymentSuccessToast(
      language === 'hi'
        ? `स्वागत है ${updated.fullName || newProfile.fullName}! आपका प्रोफाइल सफलतापूर्वक सत्यापित हो गया है।`
        : `Welcome ${updated.fullName || newProfile.fullName}! Profile verified successfully.`
    );
    setTimeout(() => setPaymentSuccessToast(null), 4000);
  };

  // Direct Google Sign-In Success: Instantly enter website if registered, or push to registration
  // Also handles mobile redirect flow: called after page reloads from Google OAuth redirect
  const handleGoogleAuthSuccess = async (googleUser: { name: string; email: string; photoURL?: string }) => {
    const cleanEmail = googleUser.email.toLowerCase().trim();

    // 1. Strict Check: Is this citizen ALREADY REGISTERED in the database?
    try {
      const res = await fetch(`/api/citizens/profile?email=${encodeURIComponent(cleanEmail)}`, {
        cache: 'no-store',
      });
      const data = await res.json();
      if (res.ok && data.success && data.citizen && (data.citizen.dob || data.citizen.state || data.citizen.registeredAt)) {
        // CASE A: Registered citizen -> Instant direct entry
        handleVerificationComplete(data.citizen as CitizenProfile);
        if (data.citizen.country) {
          setCountry(data.citizen.country);
        }
        if (data.citizen.lifePhase) {
          handleRoleAutoSwitch(data.citizen.lifePhase);
        }
        return;
      }
    } catch (e) {
      console.warn('Profile fetch warning:', e);
    }

    // CASE B: NON-REGISTERED GOOGLE ACCOUNT -> DO NOT AUTO-LOGIN!
    // Push directly to Sign Up Step 2 so user enters their real details!
    setAuthPrefillData({
      name: googleUser.name,
      email: cleanEmail,
      photoURL: googleUser.photoURL,
      isGoogle: true,
    });
    setAuthModalScreen('signup');
    setIsAuthOpen(true);
  };

  // Complete Onboarding: Save Role, Age, Category, State, Country and Unlock Opportunities
  const handleOnboardingComplete = (completed: {
    fullName: string;
    email: string;
    photoURL?: string;
    lifePhase: CitizenProfile['lifePhase'];
    age: number;
    dob?: string;
    casteCategory: CitizenProfile['casteCategory'];
    state: string;
    gender: CitizenProfile['gender'];
    country?: CountryCode;
    nationalIdName?: string;
    nationalIdMasked?: string;
    administrativeDivision?: string;
  }) => {
    setIsOnboardingOpen(false);

    if (completed.country) {
      setCountry(completed.country);
    }

    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const citizenIdGenerated = completed.nationalIdMasked || `${countryMeta.alpha3 || country}-CIT-2026-${randomSeq}`;

    let effectiveAge = completed.age;
    if (completed.dob) {
      const dyn = calculateExactAge(completed.dob);
      if (dyn > 0) {
        effectiveAge = dyn;
      }
    }

    const fullProfile: CitizenProfile = {
      ...DEFAULT_PROFILE,
      ...(profile || {}),
      id: profile?.id && profile.id !== 'cit-guest' ? profile.id : 'cit-' + Date.now(),
      fullName: completed.fullName,
      email: completed.email,
      phoneNumber: profile?.phoneNumber || '',
      photoURL: completed.photoURL,
      lifePhase: completed.lifePhase,
      age: effectiveAge,
      dob: completed.dob,
      casteCategory: completed.casteCategory,
      state: completed.state,
      gender: completed.gender,
      country: completed.country || country,
      nationalIdName: completed.nationalIdName,
      nationalIdMasked: citizenIdGenerated,
      administrativeDivision: completed.administrativeDivision || completed.state,
      isAadhaarVerified: true,
      isOnboarded: true,
    };

    try {
      localStorage.removeItem('citizen_logged_out');
      localStorage.setItem('citizen_profile', JSON.stringify(fullProfile));
    } catch (e) {}

    setProfile(fullProfile);

    // Sync to server persistent database
    fetch('/api/citizens/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullProfile),
    }).catch((e) => console.warn('Server sync error:', e));

    // Automatically switch active opportunity tab to match the citizen's role!
    handleRoleAutoSwitch(completed.lifePhase);

    // Prompt 1-Year Subscription Modal immediately after ID generation if not yet active
    if (!isCitizenSubscribed(fullProfile)) {
      setIsSubscriptionOpen(true);
    } else {
      setPaymentSuccessToast(
        language === 'hi'
          ? `स्वागत है ${completed.fullName}! आपका नागरिक प्रोफाइल सेट हो गया है और अवसर अनलॉक हो गए हैं।`
          : `Welcome ${completed.fullName}! Your citizen profile is ready and opportunities are unlocked!`
      );
      setTimeout(() => setPaymentSuccessToast(null), 5000);
    }
  };

  // Handle ₹1 1-Year Subscription Success
  const handleSubscriptionSuccess = (sub: CitizenSubscription) => {
    setIsSubscriptionOpen(false);
    const baseProfile = profile || DEFAULT_PROFILE;
    const updatedProfile: CitizenProfile = {
      ...baseProfile,
      subscription: sub,
    };

    try {
      localStorage.setItem('citizen_profile', JSON.stringify(updatedProfile));
    } catch (e) {}
    setProfile(updatedProfile);

    fetch('/api/citizens/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProfile),
    }).catch((e) => console.warn('Server sync error:', e));

    setPaymentSuccessToast(
      language === 'hi'
        ? `बधाई हो ${updatedProfile.fullName}! आपका ₹1 का 1-वर्षीय राष्ट्रीय नागरिक पास सक्रिय हो गया है (वैधता: 365 दिन)।`
        : `Congratulations ${updatedProfile.fullName}! Your ₹1 1-Year National Citizen Pass is now active (365 Days).`
    );
    setTimeout(() => setPaymentSuccessToast(null), 6000);
  };

  // Seamless pass activation launcher (prompts guest to register/login first so pass is permanently attached to their real account)
  const handleOpenSubscription = (customNotice?: string) => {
    const isGuest = !profile || !profile.email || profile.id === 'cit-guest' || !profile.isOnboarded;
    if (isGuest) {
      setAuthModalScreen('signup');
      setIsAuthOpen(true);
      setPaymentSuccessToast(
        customNotice || (language === 'hi'
          ? '1-वर्षीय नागरिक पास (केवल ₹1) अपने खाते से जोड़ने हेतु कृपया पहले खाता बनाएं या लॉगिन करें।'
          : 'Please create an account or log in first to activate your 1-Year Citizen Pass (only ₹1).')
      );
      setTimeout(() => setPaymentSuccessToast(null), 6000);
    } else {
      setIsSubscriptionOpen(true);
    }
  };

  // Live Internet Sync State
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncDate, setLastSyncDate] = useState<Date | null>(null);

  // Hydrate client clock and any previously auto-fetched circulars on client mount
  useEffect(() => {
    setLastSyncDate(new Date());
    try {
      const cached = localStorage.getItem('citizen_auto_fetched_opportunities');
      if (cached) {
        const parsed: Opportunity[] = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOpportunities((prev) => {
            const existingIds = new Set(prev.map((o) => o.id));
            const toAdd = parsed.filter((o) => !existingIds.has(o.id));
            if (toAdd.length === 0) return prev;
            return [...toAdd, ...prev];
          });
        }
      }
    } catch (e) {}
  }, []);

  const formattedSyncTime = useMemo(() => {
    if (!lastSyncDate) {
      return language === 'hi' ? 'लाइव सिंक' : 'Live Sync';
    }
    return lastSyncDate.toLocaleTimeString(language === 'hi' ? 'hi-IN' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  }, [lastSyncDate, language]);

  // Live Internet Background Crawler & Automatic Real-Time Opportunity Engine
  const fetchLiveSync = useCallback(async (targetCountry?: string) => {
    try {
      setIsSyncing(true);
      const activeCountryCode = targetCountry || country;
      const res = await fetch(`/api/live-sync?country=${encodeURIComponent(activeCountryCode)}`);
      if (!res.ok) throw new Error('Live sync failed');
      const data = await res.json();
      if (data.newOpportunities && data.newOpportunities.length > 0) {
        setOpportunities((prev) => {
          const existingIds = new Set(prev.map((o) => o.id));
          const toAdd = data.newOpportunities.filter((o: Opportunity) => !existingIds.has(o.id));
          if (toAdd.length === 0) return prev;
          const updated = [...toAdd, ...prev];
          try {
            // Persist newly discovered trusted opportunities for offline and instant startup
            const cachedExisting = JSON.parse(localStorage.getItem('citizen_auto_fetched_opportunities') || '[]');
            const combinedSaved = [...toAdd, ...cachedExisting].slice(0, 50);
            localStorage.setItem('citizen_auto_fetched_opportunities', JSON.stringify(combinedSaved));
          } catch (e) {}
          return updated;
        });
      }
      // Record exact client sync timestamp in user's device timezone
      setLastSyncDate(new Date());
    } catch (err) {
      console.warn('Live Internet Auto-Sync notice:', err);
      // Keep local clock current
      setLastSyncDate(new Date());
    } finally {
      setIsSyncing(false);
    }
  }, [country]);

  useEffect(() => {
    fetchLiveSync(country);
    // Auto-poll live internet feeds every 60 seconds
    const interval = setInterval(() => fetchLiveSync(country), 60000);
    return () => clearInterval(interval);
  }, [country, fetchLiveSync]);

  // Auto-stamp 72-hour timer for any new opportunities as soon as they appear on user's device
  useEffect(() => {
    const newIds = opportunities.filter((o) => o.isNew).map((o) => o.id);
    if (newIds.length > 0) {
      recordOpportunitiesSeen(newIds);
    }
  }, [opportunities]);

  const resultsRef = useRef<HTMLDivElement>(null);
  const lastQueryRef = useRef<string>('');

  // Live Search Matching Counts per LifeStage section
  const tabMatchCounts = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.trim().toLowerCase();
    const counts: Partial<Record<LifeStage, number>> = {};
    const seen = new Set<string>();

    opportunities.forEach((opp) => {
      if (seen.has(opp.id)) return;
      seen.add(opp.id);

      const isStudyAbroad = opp.lifeStage === 'abroad_jobs' || opp.category === 'study_abroad';
      const isGlobalFreebie = opp.lifeStage === 'freebies' && (opp.stateEligibility.includes('ALL') || !opp.country);
      if (!isStudyAbroad && !isGlobalFreebie && opp.country !== country) return;

      if (activeProfile.isOnboarded && opp.targetAges) {
        const [minAge, maxAge] = opp.targetAges;
        if (activeProfile.age < minAge || activeProfile.age > maxAge) return;
      }
      if (activeProfile.isOnboarded && opp.genderEligibility && opp.genderEligibility !== 'all') {
        if (!activeProfile.gender || opp.genderEligibility !== activeProfile.gender) return;
      }
      if (activeProfile.isOnboarded && opp.stateEligibility && !opp.stateEligibility.includes('ALL')) {
        const userDivision = activeProfile.administrativeDivision || activeProfile.state;
        if (userDivision && !opp.stateEligibility.includes(userDivision)) return;
      }

      const matchTitle = opp.title.toLowerCase().includes(query) || opp.titleHi.includes(query);
      const matchDesc = opp.description.toLowerCase().includes(query) || opp.descriptionHi.includes(query);
      const matchTags = opp.tags.some((t) => t.toLowerCase().includes(query));
      const matchAuthority = opp.gazette?.issuingAuthority?.toLowerCase().includes(query);
      const matchBenefit = opp.benefitHeadline?.toLowerCase().includes(query) || opp.benefitHeadlineHi?.includes(query);

      if (matchTitle || matchDesc || matchTags || matchAuthority || matchBenefit) {
        counts[opp.lifeStage] = (counts[opp.lifeStage] || 0) + 1;
      }
    });

    return counts;
  }, [searchQuery, opportunities, country, activeProfile]);

  // Auto-switch activeTab to match the search query's best-matching section (e.g. Health when user searches healthcare)
  useEffect(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) {
      lastQueryRef.current = '';
      return;
    }
    if (trimmed === lastQueryRef.current) return;
    lastQueryRef.current = trimmed;

    if (!tabMatchCounts) return;

    // Check if the current tab has any matches
    const currentTabCount = tabMatchCounts[activeTab] || 0;
    if (currentTabCount === 0) {
      // Find the category with the highest match count
      let bestStage: LifeStage | null = null;
      let maxCount = 0;
      for (const [stg, cnt] of Object.entries(tabMatchCounts)) {
        if (cnt && cnt > maxCount) {
          maxCount = cnt;
          bestStage = stg as LifeStage;
        }
      }
      if (bestStage) {
        setActiveTab(bestStage);
      }
    }
  }, [searchQuery, tabMatchCounts, activeTab]);

  // Smoothly auto-scroll to opportunity results when user types a search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const timer = setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // Filtered and Scored Opportunities (Sector-Agnostic Global Search)
  const filteredOpportunities = useMemo(() => {
    const seen = new Set<string>();

    return opportunities.filter((opp) => {
      // 0. Deduplicate identical opportunities
      const key = opp.id;
      if (seen.has(key)) return false;
      seen.add(key);

      // 0B. Automatic Deadline Expiration (Opportunity disappears once deadline closing date passes)
      if (isOpportunityDeadlinePassed(opp.deadline)) {
        return false;
      }

      // 1. Life Stage Tab Match:
      // Opportunities match activeTab (which auto-switches to the best-matching section).
      // If user wants to browse other matching sections, they tap the tab showing the match badge.
      if (opp.lifeStage !== activeTab) return false;

      // 1B. Strict Country Matching (Show opportunities for the user's registered country, with exception for study abroad & global tools)
      const isStudyAbroad = opp.lifeStage === 'abroad_jobs' || opp.category === 'study_abroad';
      const isGlobalFreebie = opp.lifeStage === 'freebies' && (opp.stateEligibility.includes('ALL') || !opp.country);
      if (!isStudyAbroad && !isGlobalFreebie && opp.country !== country) {
        return false;
      }

      // 2. MANDATORY Strict Age & Eligibility Filter (Only show opportunities matching citizen's age when onboarded)
      if (activeProfile.isOnboarded && opp.targetAges) {
        const [minAge, maxAge] = opp.targetAges;
        if (activeProfile.age < minAge || activeProfile.age > maxAge) return false;
      }

      // 2B. Strict Gender Isolation (Never show gender-restricted opportunities to other genders when onboarded)
      if (activeProfile.isOnboarded && opp.genderEligibility && opp.genderEligibility !== 'all') {
        if (!activeProfile.gender || opp.genderEligibility !== activeProfile.gender) return false;
      }

      // 2C. Strict Area / State / Region Filter
      if (activeProfile.isOnboarded && opp.stateEligibility && !opp.stateEligibility.includes('ALL')) {
        const userDivision = activeProfile.administrativeDivision || activeProfile.state;
        if (userDivision && !opp.stateEligibility.includes(userDivision)) return false;
      }

      // 3. Search Query Match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = opp.title.toLowerCase().includes(q) || opp.titleHi.includes(q);
        const matchDesc = opp.description.toLowerCase().includes(q) || opp.descriptionHi.includes(q);
        const matchTags = opp.tags.some((t) => t.toLowerCase().includes(q));
        const matchAuthority = opp.gazette?.issuingAuthority?.toLowerCase().includes(q);
        const matchBenefit = (opp.benefitHeadline?.toLowerCase().includes(q) || opp.benefitHeadlineHi?.includes(q));
        if (!matchTitle && !matchDesc && !matchTags && !matchAuthority && !matchBenefit) return false;
      }

      // 4. Sub-filter Match
      if (activeSubFilter === 'new' && !isOpportunityNewActive(opp.id, opp.isNew)) return false;
      if (activeSubFilter === 'upcoming' && opp.applicationStatus !== 'upcoming') return false;
      if (activeSubFilter === 'active_now' && opp.applicationStatus !== 'active_now') return false;
      if (activeSubFilter === 'free_only' && !opp.is100PercentFree) return false;
      if (activeSubFilter === 'govt_only' && !GOVT_CATEGORIES.has(opp.category)) return false;
      if (activeSubFilter === 'high_value' && (!opp.benefitAmount || opp.benefitAmount < 15000)) return false;

      return true;
    }).sort((a, b) => {
      // Series-Wise Priority 1: All active "NEW" opportunities strictly positioned at the VERY TOP
      const aIsNew = isOpportunityNewActive(a.id, a.isNew);
      const bIsNew = isOpportunityNewActive(b.id, b.isNew);
      if (aIsNew && !bIsNew) return -1;
      if (!aIsNew && bIsNew) return 1;

      // Priority 2: Active registration forms currently open for citizen application
      const statusWeight = { active_now: 1, ongoing: 2, upcoming: 3 };
      const weightA = statusWeight[a.applicationStatus || 'ongoing'] || 2;
      const weightB = statusWeight[b.applicationStatus || 'ongoing'] || 2;
      if (weightA !== weightB) {
        return weightA - weightB;
      }

      // Priority 3: Higher benefit value first
      return (b.benefitAmount || 0) - (a.benefitAmount || 0);
    });
  }, [activeTab, activeSubFilter, searchQuery, activeProfile.age, activeProfile.gender, activeProfile.state, activeProfile.administrativeDivision, opportunities, country]);

  // Sovereign Portal Opportunities (Strictly count opportunities belonging to the active Country Portal)
  const portalOpportunities = useMemo(() => {
    const seen = new Set<string>();
    return opportunities.filter((opp) => {
      // 0. Deduplicate
      if (seen.has(opp.id)) return false;
      seen.add(opp.id);

      // Strict Country / Portal Matching
      const isStudyAbroad = opp.lifeStage === 'abroad_jobs' || opp.category === 'study_abroad';
      const isGlobalFreebie = opp.lifeStage === 'freebies' && (opp.stateEligibility.includes('ALL') || !opp.country);
      if (!isStudyAbroad && !isGlobalFreebie && opp.country !== country) {
        return false;
      }

      // Mandatory Strict Age Filter (when onboarded)
      if (activeProfile.isOnboarded && opp.targetAges) {
        const [minAge, maxAge] = opp.targetAges;
        if (activeProfile.age < minAge || activeProfile.age > maxAge) return false;
      }

      // Mandatory Strict Gender Filter (when onboarded)
      if (activeProfile.isOnboarded && opp.genderEligibility && opp.genderEligibility !== 'all') {
        if (!activeProfile.gender || opp.genderEligibility !== activeProfile.gender) return false;
      }

      // Mandatory Strict Area / State Filter (when onboarded)
      if (activeProfile.isOnboarded && opp.stateEligibility && !opp.stateEligibility.includes('ALL')) {
        const userDivision = activeProfile.administrativeDivision || activeProfile.state;
        if (userDivision && !opp.stateEligibility.includes(userDivision)) return false;
      }

      return true;
    });
  }, [opportunities, country, activeProfile]);

  // Total Available Benefit Amount across OVERALL matched opportunities in the portal
  const totalBenefitSum = useMemo(() => {
    return portalOpportunities.reduce((acc, curr) => acc + (curr.benefitAmount || 0), 0);
  }, [portalOpportunities]);

  // Other matching sections during active search (for one-tap section switching)
  const otherMatchingTabs = useMemo(() => {
    if (!tabMatchCounts) return [];
    return Object.entries(tabMatchCounts).filter(
      ([stage, count]) => stage !== activeTab && count && count > 0
    ) as [LifeStage, number][];
  }, [tabMatchCounts, activeTab]);

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

  if (isHydratingAuth || !isAuthenticated) {
    return <BrandSplashScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white flex flex-col antialiased selection:bg-emerald-500 selection:text-white relative overflow-x-clip">
      {/* Ambient Aura Background - GPU-Accelerated Zero-Lag Radial Gradient */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.08),rgba(0,0,0,0))]" />

      {/* 1. Header */}
      <Header
        profile={activeProfile}
        onOpenAuth={() => {
          setAuthModalScreen('login');
          setIsAuthOpen(true);
        }}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenOnboarding={() => {
          setPendingGoogleUser(null);
          setIsOnboardingOpen(true);
        }}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favoriteCount={favoriteIds.size}
      />

      {/* 2. Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 relative z-10">
        {/* Dynamic Payment/Success Toast */}
        {paymentSuccessToast && (
          <div className="p-3.5 rounded-2xl bg-emerald-700/90 backdrop-blur-md text-white text-xs sm:text-sm font-bold shadow-lg flex items-center justify-between gap-3 animate-fade-in border border-emerald-500/40">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>{paymentSuccessToast}</span>
            </div>
            <button
              onClick={() => setPaymentSuccessToast(null)}
              className="text-emerald-200 hover:text-white text-xs underline cursor-pointer"
            >
              {t('drawer.close')}
            </button>
          </div>
        )}

        {/* National Citizen Portal Hero Section - Clean Theme Adaptive */}
        <div className={`${searchQuery.trim() ? 'hidden sm:block' : ''} bg-white dark:bg-[#0c0d12] rounded-2xl p-5 sm:p-7 border-2 border-slate-300 dark:border-zinc-700 shadow-sm relative overflow-hidden transition-colors`}>
          <div className="relative z-10 max-w-3xl">
            {/* Sovereign State & Registry Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 text-xs font-medium border border-slate-300 dark:border-white/10">
                <span className="font-semibold text-slate-900 dark:text-zinc-100">{countryMeta.flag} {countryMeta.name}</span>
                <span className="text-slate-400 dark:text-zinc-600">•</span>
                <span className="font-mono text-[11px] text-slate-600 dark:text-zinc-400">{language === 'hi' ? 'राष्ट्रीय नागरिक पोर्टल' : 'National Citizen Portal'}</span>
              </span>
              {activeProfile.isAadhaarVerified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] text-emerald-700 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/40">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t('hero.verified_status')}</span>
                </span>
              )}
            </div>

            {/* Headline */}
            <h1 className="text-lg sm:text-2xl lg:text-[26px] font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
              {t('hero.headline_prefix')}{' '}
              <span className="text-emerald-600 dark:text-emerald-400 font-mono tabular-nums font-extrabold">
                {countryMeta.currencySymbol}{totalBenefitSum.toLocaleString('en-IN')}
              </span>{' '}
              {t('hero.headline_suffix')}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-2 leading-relaxed">
              {isReviewer
                ? 'Direct access to curated career skill learning, practical training modules, and academic guides.'
                : t('hero.subline')}
            </p>
          </div>
        </div>

        {/* 1B. Skills & Video Learning Hub Highlight Banner - Theme Adaptive */}
        <div className="hidden md:flex bg-white dark:bg-[#0c0d12] text-slate-900 dark:text-white rounded-2xl px-4 py-3 border-2 border-slate-300 dark:border-zinc-700 shadow-sm items-center justify-between gap-3 text-xs transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-300 dark:border-emerald-700">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                  {language === 'hi' ? 'कौशल सीख केंद्र: टॉप 3 यूट्यूब वीडियोज से सीखें' : 'Skills Learning Hub: Learn from Top 3 YouTube Masterclasses'}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  New Hub
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                {language === 'hi' 
                  ? 'कोडिंग, सरकारी परीक्षा गणित, वीडियो एडिटिंग, टैली GST, सोलर व EV रिपेयरिंग के 100% फ्री वीडियोज व सर्टिफिकेट'
                  : 'Free curated tutorials & roadmaps for Coding, Govt Maths, Video Editing, Tally, Solar & EV repairs'}
              </p>
            </div>
          </div>
          <Link
            href="/skills"
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>{language === 'hi' ? 'सीखना शुरू करें' : 'Explore Skills'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 2. Official Feed Synchronization Bar - Theme Adaptive */}
        <div className="hidden sm:flex items-center justify-between gap-3 px-4 py-2.5 bg-white dark:bg-[#0c0d12] text-slate-800 dark:text-white rounded-2xl border-2 border-slate-300 dark:border-zinc-700 shadow-sm text-xs transition-colors">
          <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
            <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {language === 'hi' ? 'नवीनतम पोर्टल सिंक:' : 'Last Feed Sync:'}
            </span>
            <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md border border-slate-300 dark:border-zinc-700">
              {formattedSyncTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-600 dark:text-slate-400 hidden md:inline">
              {portalOpportunities.length} {language === 'hi' ? 'सत्यापित अवसर लाइव' : 'Opportunities Live'}
            </span>
            <button
              onClick={() => fetchLiveSync(country)}
              disabled={isSyncing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-sm active:scale-95 text-xs cursor-pointer"
              title="Sync Feed"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>
                {isSyncing
                  ? (language === 'hi' ? 'जांच जारी है...' : 'Syncing...')
                  : (language === 'hi' ? 'अद्यतन करें' : 'Sync Feed')}
              </span>
            </button>
          </div>
        </div>

        {/* 3. Opportunities & Search Viewport Container */}
        <div ref={resultsRef} id="opportunity-results" className="scroll-mt-20 space-y-4">
          {/* Search Results Alert Bar with Section Indicator & Quick Jump Pills */}
          {searchQuery.trim() && (
            <div className="flex flex-col gap-2 p-3.5 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 font-bold shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'hi'
                      ? `खोज: "${searchQuery}" • अनुभाग: ${t(`tabs.${activeTab}`)} (${filteredOpportunities.length} उपलब्ध)`
                      : `Search: "${searchQuery}" • Section: ${t(`tabs.${activeTab}`)} (${filteredOpportunities.length} found)`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-2.5 py-1 rounded-xl bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-[11px] font-extrabold transition-all cursor-pointer shrink-0"
                >
                  {language === 'hi' ? 'खोज हटाएं' : 'Clear search'}
                </button>
              </div>

              {otherMatchingTabs.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-emerald-200/60 mt-0.5 text-[11px]">
                  <span className="font-semibold text-emerald-800">
                    {language === 'hi' ? 'अन्य अनुभागों में भी मिले:' : 'Also in other sections:'}
                  </span>
                  {otherMatchingTabs.map(([stage, count]) => (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => setActiveTab(stage as LifeStage)}
                      className="px-2 py-0.5 rounded-lg bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold transition-all cursor-pointer shadow-2xs"
                    >
                      {t(`tabs.${stage}`)} ({count})
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Life Stage Tabs and Sub-filters */}
          <LifeStageTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            activeSubFilter={activeSubFilter}
            onSubFilterChange={setActiveSubFilter}
            totalCount={filteredOpportunities.length}
            tabMatchCounts={tabMatchCounts}
            isReviewer={isReviewer}
          />

          {/* Opportunity Card Grid */}
          {filteredOpportunities.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
              <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">{t('empty.title')}</h3>
              <p className="text-xs text-slate-500">
                {t('empty.desc')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch pt-3">
              {filteredOpportunities.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  onSelect={(opp) => setSelectedOpp(opp)}
                  citizenProfile={activeProfile}
                  isFavorite={favoriteIds.has(opp.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onRequireSubscription={() => {
                    handleOpenSubscription(
                      language === 'hi'
                        ? 'आधिकारिक पोर्टल पर सीधे आवेदन करने हेतु 1-वर्षीय नागरिक पास (केवल ₹1) सक्रिय करें।'
                        : 'Activate 1-Year Citizen Pass (only ₹1) to apply directly on official portal.'
                    );
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Portal Footer */}
      <Footer />

      {/* 3. Detail Bottom Sheet / Slide-over */}
      <DetailBottomSheet
        opportunity={selectedOpp}
        onClose={() => setSelectedOpp(null)}
        citizenProfile={activeProfile}
        isFavorite={selectedOpp ? favoriteIds.has(selectedOpp.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onRequireSubscription={() => {
          setSelectedOpp(null);
          handleOpenSubscription(
            language === 'hi'
              ? 'आधिकारिक पोर्टल पर सीधे आवेदन करने हेतु 1-वर्षीय नागरिक पास (केवल ₹1) सक्रिय करें।'
              : 'Activate 1-Year Citizen Pass (only ₹1) to apply directly on official portal.'
          );
        }}
      />

      {/* 4. Unified 3-Screen Auth Modal (Login, Signup, Forgot Password with Google OAuth) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setAuthPrefillData(null);
        }}
        initialScreen={authModalScreen}
        prefillData={authPrefillData}
        onLoginSuccess={handleVerificationComplete}
        onGoogleSuccess={handleGoogleAuthSuccess}
      />

      {/* 5. User Profile & Settings Drawer */}
      <UserProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={activeProfile}
        totalBenefitsUnlocked={totalBenefitSum}
        onUpdateProfile={(updated) => {
          setProfile((prev) => {
            const base = prev || GUEST_PROFILE;
            const next = { ...base, ...updated };
            if (next.dob) {
              const dynAge = calculateExactAge(next.dob);
              if (dynAge > 0) {
                next.age = dynAge;
              }
            }
            try {
              localStorage.setItem('citizen_profile', JSON.stringify(next));
            } catch (e) {}
            return next;
          });

          // Auto-adjust active tab if lifePhase changed
          if (updated.lifePhase) {
            handleRoleAutoSwitch(updated.lifePhase);
          }
        }}
        onLogout={handleLogout}
        onOpenAuth={(scr, prefill) => {
          setIsProfileOpen(false);
          setAuthModalScreen(scr || 'login');
          setAuthPrefillData(prefill || null);
          setIsAuthOpen(true);
        }}
        onOpenOnboarding={() => {
          setPendingGoogleUser(null);
          setIsOnboardingOpen(true);
        }}
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
        onLoginSuccess={handleVerificationComplete}
        onGoogleSuccess={handleGoogleAuthSuccess}
      />

      {/* 7. Registration Onboarding & Role Selection Modal */}
      <CitizenOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        googleUser={pendingGoogleUser}
        initialRole={activeProfile.lifePhase}
        onComplete={handleOnboardingComplete}
        onSwitchToSignIn={() => {
          setIsOnboardingOpen(false);
          setIsProfileOpen(true);
        }}
      />

      {/* 8. 1-Year Citizen Access Subscription Modal (₹1 / Year) */}
      <SubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
        citizenName={activeProfile.fullName || 'Citizen'}
        citizenId={activeProfile.id && activeProfile.id !== 'cit-guest' && activeProfile.id !== 'cit-default' ? activeProfile.id : (activeProfile.nationalIdMasked || `${countryMeta.alpha3 || country}-CIT-8921`)}
        citizenEmail={activeProfile.email}
        citizenPhone={activeProfile.phoneNumber}
        onSubscriptionSuccess={handleSubscriptionSuccess}
      />

      {/* 9. Floating Push Notification Permission & Alert Prompt */}
      <PushNotificationBanner
        onNotificationEnabled={() => {
          setPaymentSuccessToast(
            language === 'hi'
              ? 'Lock Screen नोटिफिकेशन सक्रिय हो गया! लाइव अलर्ट भेजा गया है।'
              : 'Lock screen alerts enabled! Live verification alert was sent.'
          );
          setTimeout(() => setPaymentSuccessToast(null), 5000);
        }}
      />
    </div>
  );
}
