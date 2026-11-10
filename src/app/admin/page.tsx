'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Activity,
  ArrowLeft,
  CheckCircle2,
  Lock,
  KeyRound,
  AlertCircle,
  RefreshCw,
  Landmark,
  Database,
  Radio,
  FileCheck2,
  Server,
  Users,
  Search,
  Download,
  Phone,
  MessageCircle,
  Calendar,
  MapPin,
  IndianRupee,
  ExternalLink,
  LogOut,
  Loader2,
  AlertTriangle,
  QrCode,
  CreditCard,
  FileText,
  Clock,
  ChevronRight,
  TrendingUp,
  Cpu,
  Layers,
  Check,
  Copy,
  Award,
  Building2,
  GraduationCap,
  Globe,
  HeartPulse,
  Sun,
  Moon,
  ShieldAlert,
  AlertOctagon,
  Link2Off,
  Sparkles,
  Bell,
  Send,
  Smartphone,
} from 'lucide-react';
import { RegisteredCitizen } from '@/app/api/admin/citizens/route';
import { CitizenAadhaarModal } from '@/components/admin/CitizenAadhaarModal';

interface SystemStatusData {
  timestamp: string;
  system: {
    serverTime: string;
    serverTimeIso?: string;
    timezone?: string;
    nodeVersion: string;
    platform: string;
    uptimeSeconds: number;
    memoryUsageMb: number;
  };
  database: {
    status: 'connected' | 'fallback_local';
    type: string;
    latencyMs: number;
  };
  citizens: {
    totalRegistered: number;
    fullyOnboarded: number;
    aadhaarVerified: number;
    activePassSubscribers: number;
    totalRevenueInr: number;
    todayRevenueInr?: number;
  };
  gateways: {
    razorpay: {
      configured: boolean;
      mode: string;
      keyPreview: string;
    };
    sms: {
      configured: boolean;
      provider: string;
    };
    aadhaarKyc: {
      configured: boolean;
      provider: string;
    };
  };
  opportunities: {
    totalTracked: number;
    activeNow: number;
    expiredClosed: number;
    categories: Record<string, number>;
  };
  diagnostics: Array<{
    level: 'ok' | 'warning' | 'error';
    component: string;
    message: string;
    action?: string;
  }>;
}

interface AdminOpportunity {
  id: string;
  title: string;
  titleHi: string;
  lifeStage: string;
  category: string;
  issuingAuthority: string;
  circularNumber: string;
  deadline: string;
  isExpired: boolean;
  applicationStatus: string;
  isNew: boolean;
  is100PercentFree: boolean;
  benefitHeadline: string;
  benefitAmount: number;
  officialPortalUrl: string;
  country: string;
  lastVerifiedAt: string;
  fetchedDate?: string;
  fetchedLabel?: string;
  isToday?: boolean;
  isYesterday?: boolean;
  isRecent2Days?: boolean;
  healthStatus?: 'healthy' | 'link_issue' | 'scam_alert' | 'expired_warning';
  healthIssue?: string | null;
}

interface CrawlerLog {
  timestamp: string;
  message: string;
  count?: number;
  status: 'success' | 'error' | 'info';
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState<number>(0);

  // Executive UI Theme: 'dark' (Default Slate 950) | 'light' (Crisp Executive White)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Real-time ticking Indian Standard Time (IST) clock
  const [liveClock, setLiveClock] = useState<string>('');

  // Active Console View Tab
  const [activeTab, setActiveTab] = useState<'citizens' | 'opportunities' | 'crawler' | 'diagnostics' | 'notifications'>('citizens');

  // Push Notification Hub State
  const [pushStats, setPushStats] = useState<{
    registeredDeviceCount: number;
    isFcmServerConfigured: boolean;
    projectId: string;
  } | null>(null);
  const [pushTitle, setPushTitle] = useState('Citzos — नया अवसर अलर्ट');
  const [pushBody, setPushBody] = useState('नई सरकारी योजना व छात्रवृत्ति पोर्टल पर उपलब्ध है। तुरंत देखें।');
  const [pushUrl, setPushUrl] = useState('/');
  const [isSendingPush, setIsSendingPush] = useState(false);
  const [pushFeedback, setPushFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Real Registered Citizens State
  const [citizens, setCitizens] = useState<RegisteredCitizen[]>([]);
  const [searchCitizen, setSearchCitizen] = useState('');
  const [filterState, setFilterState] = useState<string>('all');
  const [filterPass, setFilterPass] = useState<'all' | 'paid' | 'unpaid'>('all');
  const [isLoadingCitizens, setIsLoadingCitizens] = useState(false);
  const [copiedAadhaarId, setCopiedAadhaarId] = useState<string | null>(null);

  // Selected Citizen for Full Aadhaar Dossier Modal
  const [selectedCitizen, setSelectedCitizen] = useState<RegisteredCitizen | null>(null);

  // Real Tracked Opportunities State
  const [opportunities, setOpportunities] = useState<AdminOpportunity[]>([]);
  const [oppSectionStats, setOppSectionStats] = useState<Record<string, { count: number; active: number; expired: number }>>({});
  const [isLoadingOpps, setIsLoadingOpps] = useState(false);
  const [searchOpp, setSearchOpp] = useState('');
  const [filterOppSection, setFilterOppSection] = useState('all');
  const [filterOppStatus, setFilterOppStatus] = useState<'all' | 'active' | 'expired' | 'issues_only'>('all');

  // Date Range Filter: Default to '2days' (Today & Yesterday only)
  const [filterDateRange, setFilterDateRange] = useState<'2days' | 'today' | 'yesterday' | 'all'>('2days');
  const [filterIssuesOnly, setFilterIssuesOnly] = useState<boolean>(false);
  const [oppMetrics, setOppMetrics] = useState({
    total: 0,
    recent2Days: 0,
    today: 0,
    yesterday: 0,
    issues: 0,
  });

  // Real System Diagnostics & Metrics State
  const [systemStatus, setSystemStatus] = useState<SystemStatusData | null>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);

  // Real Crawler Execution State & Logs
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlerLogs, setCrawlerLogs] = useState<CrawlerLog[]>([]);

  // Toggle Theme between Dark and Light
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('admin_portal_theme', next);
    } catch {}
  };

  // Initialize theme from storage and start live ticking IST clock
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('admin_portal_theme') as 'dark' | 'light' | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
    } catch {}

    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setLiveClock(`${formatted} IST`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check saved session token on mount
  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Cooldown countdown timer for brute-force lockouts
  useEffect(() => {
    if (lockoutTimer <= 0) return;
    const interval = setInterval(() => {
      setLockoutTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setErrorMessage(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  // Fetch real registered citizens from backend using signed token
  const fetchCitizens = async (tokenOverride?: string) => {
    try {
      setIsLoadingCitizens(true);
      const token = tokenOverride || sessionStorage.getItem('admin_token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      const res = await fetch('/api/admin/citizens', {
        headers: {
          'x-admin-token': token,
        },
      });
      if (res.status === 401) {
        sessionStorage.removeItem('admin_token');
        setIsAuthenticated(false);
        setErrorMessage('सुरक्षा सत्र समाप्त हो गया है। कृपया मास्टर पिन (242022) से पुनः लॉगिन करें।');
        return;
      }
      const data = await res.json();
      if (data.citizens) {
        setCitizens(data.citizens);
      }
    } catch (e) {
      console.error('Failed to fetch citizens:', e);
    } finally {
      setIsLoadingCitizens(false);
    }
  };

  // Fetch real system status & diagnostic telemetry from backend
  const fetchSystemStatus = async (tokenOverride?: string) => {
    try {
      setIsLoadingStatus(true);
      const token = tokenOverride || sessionStorage.getItem('admin_token');
      if (!token) return;

      const res = await fetch('/api/admin/system-status', {
        headers: {
          'x-admin-token': token,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setSystemStatus(data);
      }
    } catch (e) {
      console.error('Failed to fetch system status:', e);
    } finally {
      setIsLoadingStatus(false);
    }
  };

  // Fetch real opportunities and circulars from backend registry
  const fetchOpportunities = async (tokenOverride?: string) => {
    try {
      setIsLoadingOpps(true);
      const token = tokenOverride || sessionStorage.getItem('admin_token');
      if (!token) return;

      const res = await fetch('/api/admin/opportunities?dateRange=all', {
        headers: {
          'x-admin-token': token,
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.opportunities) {
          setOpportunities(data.opportunities);
        }
        if (data.sectionStats) {
          setOppSectionStats(data.sectionStats);
        }
        setOppMetrics({
          total: data.totalCount || 0,
          recent2Days: data.recent2DaysCount || 0,
          today: data.todayCount || 0,
          yesterday: data.yesterdayCount || 0,
          issues: data.issuesCount || 0,
        });
      }
    } catch (e) {
      console.error('Failed to fetch opportunities:', e);
    } finally {
      setIsLoadingOpps(false);
    }
  };

  // Fetch real registered push devices and status
  const fetchPushStats = async (tokenOverride?: string | React.MouseEvent) => {
    try {
      const token = typeof tokenOverride === 'string' ? tokenOverride : sessionStorage.getItem('admin_token') || '';
      const res = await fetch('/api/notifications/send-push', {
        headers: { 'x-admin-token': token },
      });
      if (res.ok) {
        const data = await res.json();
        setPushStats(data);
      }
    } catch (e) {
      console.warn('Failed to fetch push stats:', e);
    }
  };

  // Broadcast push notification to all devices
  const handleBroadcastPush = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pushTitle.trim() || !pushBody.trim()) {
      setPushFeedback({ type: 'error', message: 'कृपया शीर्षक और संदेश दोनों दर्ज करें।' });
      return;
    }
    try {
      setIsSendingPush(true);
      setPushFeedback(null);
      const token = sessionStorage.getItem('admin_token') || '';
      const res = await fetch('/api/notifications/send-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify({
          title: pushTitle.trim(),
          body: pushBody.trim(),
          url: pushUrl.trim() || '/',
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPushFeedback({
          type: 'success',
          message: data.message || `पुश नोटिफिकेशन ${data.recipientsCount || 0} डिवाइस(ज) पर सफलतापूर्वक भेजा गया।`,
        });
        fetchPushStats();
      } else {
        setPushFeedback({
          type: 'error',
          message: data.message || 'पुश नोटिफिकेशन भेजने में त्रुटि हुई।',
        });
      }
    } catch (err: any) {
      setPushFeedback({
        type: 'error',
        message: err?.message || 'नेटवर्क समस्या के कारण नोटिफिकेशन नहीं भेजा जा सका।',
      });
    } finally {
      setIsSendingPush(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCitizens();
      fetchOpportunities();
      fetchSystemStatus();
      fetchPushStats();
    }
  }, [isAuthenticated]);

  // Handle Master PIN Authentication
  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput || pinInput.length < 4 || isVerifying || lockoutTimer > 0) return;

    try {
      setIsVerifying(true);
      setErrorMessage(null);
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput }),
      });
      const data = await res.json();

      if (res.status === 429) {
        setLockoutTimer(data.retryAfter || 900);
        setErrorMessage(data.message || 'अत्यधिक प्रयास: सुरक्षा लॉक सक्रिय।');
        return;
      }

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || 'अमान्य मास्टर सुरक्षा पिन। कृपया सही 6-अंकीय पिन दर्ज करें।');
        return;
      }

      sessionStorage.setItem('admin_token', data.token);
      setIsAuthenticated(true);
      setPinInput('');
      fetchCitizens(data.token);
      fetchOpportunities(data.token);
      fetchSystemStatus(data.token);
      fetchPushStats(data.token);
    } catch (err: any) {
      setErrorMessage('सर्वर से संपर्क करने में असमर्थ। कृपया नेटवर्क की जांच करें।');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setPinInput('');
    setErrorMessage(null);
    setSelectedCitizen(null);
  };

  // Trigger real crawler sync
  const handleTriggerCrawl = async () => {
    try {
      setIsCrawling(true);
      const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const res = await fetch('/api/live-sync');
      const data = await res.json();

      setCrawlerLogs((prev) => [
        {
          timestamp: now,
          status: res.ok ? 'success' : 'error',
          count: data.count || 0,
          message: res.ok
            ? `National portals scanned successfully. ${data.count || 0} real verified opportunities refreshed across Agniveer, Navy, NEET/JEE, AICTE & NCS feeds.`
            : `Sync notice: ${data.message || 'Gateway sync delay'}`,
        },
        ...prev,
      ]);

      // Refresh system status after crawl
      fetchSystemStatus();
    } catch (e: any) {
      const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setCrawlerLogs((prev) => [
        {
          timestamp: now,
          status: 'error',
          message: `Network error during live crawl: ${e.message}`,
        },
        ...prev,
      ]);
    } finally {
      setIsCrawling(false);
    }
  };

  // Extract unique states for filtering
  const availableStates = useMemo(() => {
    const set = new Set<string>();
    citizens.forEach((c) => {
      if (c.state) set.add(c.state);
    });
    return Array.from(set).sort();
  }, [citizens]);

  // Filtered citizens list based on search, state, and pass status
  const filteredCitizens = useMemo(() => {
    return citizens.filter((c) => {
      // 1. Text Search Match
      if (searchCitizen.trim()) {
        const q = searchCitizen.toLowerCase();
        const matchName = (c.fullName || '').toLowerCase().includes(q);
        const matchPhone = (c.phoneNumber || '').includes(q);
        const matchEmail = (c.email || '').toLowerCase().includes(q);
        const matchAadhaar = (c.aadhaarNumber || c.aadhaarNumberMasked || c.nationalIdMasked || '').toLowerCase().includes(q);
        const matchState = (c.state || '').toLowerCase().includes(q);
        const matchDist = (c.district || '').toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchEmail && !matchAadhaar && !matchState && !matchDist) {
          return false;
        }
      }

      // 2. State Filter
      if (filterState !== 'all' && c.state !== filterState) {
        return false;
      }

      // 3. Subscription Pass Filter
      if (filterPass === 'paid') {
        const isPaid = c.subscription?.status === 'active';
        if (!isPaid) return false;
      } else if (filterPass === 'unpaid') {
        const isPaid = c.subscription?.status === 'active';
        if (isPaid) return false;
      }

      return true;
    });
  }, [citizens, searchCitizen, filterState, filterPass]);

  // Section Metadata dictionary for display
  const sectionMetaMap: Record<string, { label: string; labelHi: string; badgeColor: string }> = {
    exams: { label: 'Competitive Exams', labelHi: 'प्रतियोगी परीक्षाएं', badgeColor: 'bg-amber-950 text-amber-300 border-amber-800' },
    private_jobs: { label: 'Private Jobs', labelHi: 'प्राइवेट नौकरियां', badgeColor: 'bg-blue-950 text-blue-300 border-blue-800' },
    internships: { label: 'Internships', labelHi: 'सशुल्क इंटर्नशिप', badgeColor: 'bg-purple-950 text-purple-300 border-purple-800' },
    education: { label: 'Education & Grants', labelHi: 'शिक्षा व छात्रवृत्ति', badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800' },
    abroad_jobs: { label: 'Abroad Opportunities', labelHi: 'विदेश में अवसर', badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800' },
    career: { label: 'Govt Jobs & Career', labelHi: 'सरकारी नौकरी व करियर', badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800' },
    startups: { label: 'Startups & Grants', labelHi: 'स्टार्टअप व अनुदान', badgeColor: 'bg-rose-950 text-rose-300 border-rose-800' },
    schemes: { label: 'Welfare Schemes', labelHi: 'जनकल्याण योजनाएं', badgeColor: 'bg-teal-950 text-teal-300 border-teal-800' },
    freebies: { label: 'Free Tools & Perks', labelHi: 'फ्री टूल्स व सुविधाएं', badgeColor: 'bg-pink-950 text-pink-300 border-pink-800' },
    health: { label: 'Healthcare & Aid', labelHi: 'स्वास्थ्य व चिकित्सा', badgeColor: 'bg-red-950 text-red-300 border-red-800' },
  };

  // Filtered opportunities list based on search, section, status, 2-day date range, and issue alerts
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      // 1. Date Range Filter (Default: '2days' -> Only Today & Yesterday!)
      if (filterDateRange === '2days' && !opp.isRecent2Days) {
        return false;
      }
      if (filterDateRange === 'today' && !opp.isToday) {
        return false;
      }
      if (filterDateRange === 'yesterday' && !opp.isYesterday) {
        return false;
      }

      // 2. Health & Fraud Alerts Filter
      if (filterIssuesOnly && opp.healthStatus === 'healthy') {
        return false;
      }

      // 3. Section Filter
      if (filterOppSection !== 'all' && opp.lifeStage !== filterOppSection) {
        return false;
      }

      // 4. Status Filter
      if (filterOppStatus === 'active' && opp.isExpired) {
        return false;
      }
      if (filterOppStatus === 'expired' && !opp.isExpired) {
        return false;
      }
      if (filterOppStatus === 'issues_only' && opp.healthStatus === 'healthy') {
        return false;
      }

      // 5. Search Query
      if (searchOpp.trim()) {
        const q = searchOpp.toLowerCase().trim();
        const matchTitle = (opp.title || '').toLowerCase().includes(q) || (opp.titleHi || '').toLowerCase().includes(q);
        const matchAuthority = (opp.issuingAuthority || '').toLowerCase().includes(q);
        const matchSection = (opp.lifeStage || '').toLowerCase().includes(q);
        const matchCat = (opp.category || '').toLowerCase().includes(q);
        const matchIssue = (opp.healthIssue || '').toLowerCase().includes(q);
        if (!matchTitle && !matchAuthority && !matchSection && !matchCat && !matchIssue) {
          return false;
        }
      }

      return true;
    });
  }, [opportunities, filterDateRange, filterIssuesOnly, filterOppSection, filterOppStatus, searchOpp]);

  // Copy Citizen Aadhaar Handler with UI Feedback
  const handleCopyCitizenAadhaar = (e: React.MouseEvent, citizen: RegisteredCitizen) => {
    e.stopPropagation();
    const raw = citizen.aadhaarNumber || citizen.aadhaarNumberMasked || citizen.nationalIdMasked || '';
    const clean = raw.replace(/\D/g, '');
    const toCopy = clean.length === 12 ? clean : raw;
    if (toCopy) {
      navigator.clipboard.writeText(toCopy);
      setCopiedAadhaarId(citizen.id);
      setTimeout(() => setCopiedAadhaarId(null), 2000);
    }
  };

  // Export Registered Citizens to CSV
  const handleExportCSV = () => {
    if (citizens.length === 0) return;

    const headers = [
      'Citizen ID',
      'Full Name',
      'Phone Number',
      'Email',
      'Aadhaar / National ID',
      'Age',
      'DOB',
      'Gender',
      'State',
      'District',
      'Pincode',
      'Life Stage',
      'Social Category',
      'Annual Income (INR)',
      '1-Year Pass Status',
      'Pass Valid Until',
      'Transaction ID',
      'Registered Timestamp',
    ];

    const rows = filteredCitizens.map((c) => [
      `"${c.id}"`,
      `"${c.fullName || ''}"`,
      `"${c.phoneNumber || ''}"`,
      `"${c.email || ''}"`,
      `"${c.aadhaarNumber || c.aadhaarNumberMasked || c.nationalIdMasked || 'N/A'}"`,
      c.age || 0,
      `"${c.dob || ''}"`,
      `"${c.gender || ''}"`,
      `"${c.state || ''}"`,
      `"${c.district || ''}"`,
      `"${c.pincode || ''}"`,
      `"${c.lifePhase || ''}"`,
      `"${c.casteCategory || ''}"`,
      c.familyIncomeAnnual || 0,
      `"${c.subscription?.status || 'inactive'}"`,
      `"${c.subscription?.validUntil || 'N/A'}"`,
      `"${c.subscription?.transactionId || 'N/A'}"`,
      `"${c.registeredAt || ''}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `registered_citizens_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // -------------------------------------------------------------
  // SCREEN 1: PROFESSIONAL EXECUTIVE AUTHENTICATION GATEWAY
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-200 ${
        theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}>
        <div className={`w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 border transition-all ${
          theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className={`flex items-center justify-between border-b pb-4 ${
            theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
          }`}>
            <div className="flex items-center gap-3">
              <img src="/logo-citzos.png" alt="CITZOS" className="h-8 w-auto object-contain shrink-0" />
              <div>
                <h1 className={`text-base font-black tracking-tight leading-none ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Citzos Master Administration
                </h1>
                <span className={`text-[11px] block mt-1 font-medium ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Console Oversight
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-amber-400 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                }`}
                title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>

              <Link
                href="/"
                className={`text-xs transition-colors flex items-center gap-1 ${
                  theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Portal</span>
              </Link>
            </div>
          </div>

          <div>
            <h2 className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Security Clearance Verification
            </h2>
            <p className={`text-xs mt-1 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Restricted management area. Enter the 6-digit Master Security PIN to authenticate this session.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs flex items-start gap-2.5 text-left">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1 text-[11px] font-medium leading-relaxed">
                <span>{errorMessage}</span>
                {lockoutTimer > 0 && (
                  <span className="block mt-1 font-mono font-bold text-rose-300">
                    Lockout cooldown: {lockoutTimer}s remaining
                  </span>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Master Security PIN
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  disabled={isVerifying || lockoutTimer > 0}
                  onChange={(e) => {
                    setPinInput(e.target.value.replace(/\D/g, ''));
                    setErrorMessage(null);
                  }}
                  placeholder="Enter 6-digit PIN"
                  autoComplete="off"
                  inputMode="numeric"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-center font-mono text-lg tracking-[0.3em] placeholder:tracking-normal placeholder:text-xs outline-none transition-all disabled:opacity-50 ${
                    theme === 'dark'
                      ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white'
                  }`}
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={pinInput.length < 4 || isVerifying || lockoutTimer > 0}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold transition-all shadow-sm active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying PIN...</span>
                </>
              ) : (
                <span>Authenticate & Access Console</span>
              )}
            </button>
          </form>

          <div className={`pt-3 border-t flex items-center justify-between text-[11px] font-mono ${
            theme === 'dark' ? 'border-slate-800/80 text-slate-500' : 'border-slate-100 text-slate-400'
          }`}>
            <span>Server: localhost:3000</span>
            <span>Master PIN Protection</span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SCREEN 2: AUTHENTICATED EXECUTIVE DASHBOARD
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // SCREEN 2: AUTHENTICATED EXECUTIVE DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className={`min-h-screen font-sans pb-12 transition-colors duration-200 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Header Bar */}
      <header className={`sticky top-0 z-30 border-b px-4 sm:px-6 lg:px-8 py-3 transition-colors ${
        theme === 'dark' ? 'bg-slate-950/98 border-slate-800' : 'bg-white/98 border-slate-200 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/logo-citzos.png" alt="CITZOS" className="h-7 w-auto object-contain shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-extrabold text-sm tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Citzos
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-700/60">
                  ADMIN
                </span>
              </div>
              <span className={`text-[11px] block ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Sovereign Registry & Operations Oversight
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Live Ticking Indian Standard Time Clock */}
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs shadow-2xs ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
              <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{liveClock || systemStatus?.system.serverTime || 'Synchronizing IST...'}</span>
            </div>

            {/* Light / Dark Theme Switcher Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900 hover:bg-slate-850 text-amber-400 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 shadow-xs'
              }`}
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Refresh Button */}
            <button
              onClick={() => {
                fetchCitizens();
                fetchOpportunities();
                fetchSystemStatus();
              }}
              disabled={isLoadingCitizens || isLoadingStatus || isLoadingOpps}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
              }`}
              title="Refresh all metrics"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingCitizens || isLoadingStatus || isLoadingOpps ? 'animate-spin' : ''}`} />
            </button>

            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 border ${
                theme === 'dark'
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Public Portal</span>
            </Link>

            <button
              onClick={handleAdminLogout}
              className="px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-800/80 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              title="Terminate Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Real KPI Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Total Citizens */}
          <div className={`p-4 rounded-xl border shadow-sm space-y-1 ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium">Total Registered Citizens</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className={`text-2xl font-extrabold font-mono ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              {citizens.length}
            </div>
            <div className={`text-[11px] flex items-center gap-1 pt-1 border-t ${
              theme === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
            }`}>
              <span className="text-emerald-500 font-semibold font-mono">
                {citizens.filter((c) => c.isOnboarded).length}
              </span>
              <span>Fully Onboarded</span>
            </div>
          </div>

          {/* Card 2: Verified Aadhaar Records */}
          <div className={`p-4 rounded-xl border shadow-sm space-y-1 ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium">Aadhaar Verified</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-500 font-mono">
              {citizens.filter((c) => c.isAadhaarVerified || c.isCardVerified).length}
            </div>
            <div className={`text-[11px] flex items-center gap-1 pt-1 border-t ${
              theme === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
            }`}>
              <span className="font-semibold">Verhoeff UIDAI Checksum</span>
            </div>
          </div>

          {/* Card 3: Total Revenue & Today's Collection */}
          <div className={`p-4 rounded-xl border shadow-sm space-y-1 ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium">Citizen Pass Revenue</span>
              <IndianRupee className="w-4 h-4 text-amber-500" />
            </div>
            <div className={`text-2xl font-extrabold font-mono flex items-baseline gap-2 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              <span>Rs {systemStatus?.citizens.totalRevenueInr ?? citizens.filter((c) => c.subscription?.status === 'active').reduce((acc, c) => acc + (c.subscription?.amount || 1), 0)}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                +Rs {systemStatus?.citizens.todayRevenueInr ?? 0} Today
              </span>
            </div>
            <div className={`text-[11px] flex items-center justify-between pt-1 border-t font-mono ${
              theme === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
            }`}>
              <span>Today's Collection:</span>
              <span className="text-emerald-500 font-bold">Rs {systemStatus?.citizens.todayRevenueInr ?? 0}</span>
            </div>
          </div>

          {/* Card 4: Database & System Health */}
          <div className={`p-4 rounded-xl border shadow-sm space-y-1 ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium">System Health</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-emerald-500 flex items-center gap-2">
              <span>Operational</span>
            </div>
            <div className={`text-[11px] flex items-center gap-1 pt-1 border-t font-mono ${
              theme === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
            }`}>
              <span>Latency:</span>
              <span className="text-emerald-500 font-bold">{systemStatus?.database.latencyMs || 0}ms</span>
              <span className="text-slate-400">• {systemStatus?.database.type || 'Storage Ready'}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className={`flex items-center justify-between border-b gap-2 overflow-x-auto pb-px ${
          theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('citizens')}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'citizens'
                  ? 'border-emerald-500 ' + (theme === 'dark' ? 'text-white bg-slate-900' : 'text-slate-900 bg-white shadow-xs')
                  : (theme === 'dark' ? 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100')
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Citizens Directory ({filteredCitizens.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('opportunities')}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'opportunities'
                  ? 'border-emerald-500 ' + (theme === 'dark' ? 'text-white bg-slate-900' : 'text-slate-900 bg-white shadow-xs')
                  : (theme === 'dark' ? 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100')
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Opportunities Registry ({filteredOpportunities.length})</span>
              {oppMetrics.issues > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-black">
                  {oppMetrics.issues} Issues
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('crawler')}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'crawler'
                  ? 'border-emerald-500 ' + (theme === 'dark' ? 'text-white bg-slate-900' : 'text-slate-900 bg-white shadow-xs')
                  : (theme === 'dark' ? 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100')
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>Live Feed Crawler</span>
            </button>

            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'diagnostics'
                  ? 'border-emerald-500 ' + (theme === 'dark' ? 'text-white bg-slate-900' : 'text-slate-900 bg-white shadow-xs')
                  : (theme === 'dark' ? 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100')
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>System Health & Diagnostics</span>
              {systemStatus && systemStatus.diagnostics.filter((d) => d.level === 'warning' || d.level === 'error').length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                  {systemStatus.diagnostics.filter((d) => d.level === 'warning' || d.level === 'error').length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab('notifications');
                fetchPushStats();
              }}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'notifications'
                  ? 'border-emerald-500 ' + (theme === 'dark' ? 'text-white bg-slate-900' : 'text-slate-900 bg-white shadow-xs')
                  : (theme === 'dark' ? 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100')
              }`}
            >
              <Bell className="w-4 h-4 text-emerald-400" />
              <span>Push Broadcast Hub</span>
              {pushStats && pushStats.registeredDeviceCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black">
                  {pushStats.registeredDeviceCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: CITIZENS DIRECTORY & AADHAAR DOSSIER MANAGEMENT */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'citizens' && (
          <div className="space-y-4">
            {/* Filter & Search Bar */}
            <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 text-xs ${
              theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[260px]">
                {/* Search Input */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchCitizen}
                    onChange={(e) => setSearchCitizen(e.target.value)}
                    placeholder="Search by Name, Phone, Aadhaar, State..."
                    className={`w-full pl-9 pr-3 py-2 rounded-lg border text-xs outline-none transition-colors ${
                      theme === 'dark'
                        ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-emerald-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
                    }`}
                  />
                  {searchCitizen && (
                    <button
                      onClick={() => setSearchCitizen('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* State Filter */}
                <select
                  value={filterState}
                  onChange={(e) => setFilterState(e.target.value)}
                  className={`px-3 py-2 rounded-lg border text-xs outline-none cursor-pointer transition-colors ${
                    theme === 'dark'
                      ? 'bg-slate-950 border-slate-700 text-slate-200 focus:border-emerald-500'
                      : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-emerald-600'
                  }`}
                >
                  <option value="all">All States</option>
                  {availableStates.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>

                {/* Pass Filter */}
                <select
                  value={filterPass}
                  onChange={(e) => setFilterPass(e.target.value as any)}
                  className={`px-3 py-2 rounded-lg border text-xs outline-none cursor-pointer transition-colors ${
                    theme === 'dark'
                      ? 'bg-slate-950 border-slate-700 text-slate-200 focus:border-emerald-500'
                      : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-emerald-600'
                  }`}
                >
                  <option value="all">All Pass Status</option>
                  <option value="paid">Paid Rs 1 Pass Only</option>
                  <option value="unpaid">Unpaid / Inactive</option>
                </select>
              </div>

              {/* Export CSV Button */}
              <button
                onClick={handleExportCSV}
                disabled={citizens.length === 0}
                className={`px-3 py-2 rounded-lg disabled:opacity-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 shadow-xs'
                }`}
              >
                <Download className="w-4 h-4 text-emerald-500" />
                <span>Export CSV ({filteredCitizens.length})</span>
              </button>
            </div>

            {/* Citizens Data Table */}
            <div className={`rounded-xl border overflow-hidden shadow-sm ${
              theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                      theme === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-400' : 'bg-slate-100/90 border-slate-200 text-slate-600'
                    }`}>
                      <th className="py-3 px-4">Citizen Identity</th>
                      <th className="py-3 px-4">Aadhaar Card / Dossier</th>
                      <th className="py-3 px-4">Contact Info</th>
                      <th className="py-3 px-4">State & District</th>
                      <th className="py-3 px-4">Age / Category</th>
                      <th className="py-3 px-4">1-Yr Pass Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === 'dark' ? 'divide-slate-800/80' : 'divide-slate-150'}`}>
                    {filteredCitizens.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500">
                          {isLoadingCitizens ? (
                            <div className="flex items-center justify-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                              <span>Loading citizen directory from database...</span>
                            </div>
                          ) : (
                            <span>No citizens match your current search query or filter.</span>
                          )}
                        </td>
                      </tr>
                    ) : (
                      filteredCitizens.map((c) => {
                        const isPaid = c.subscription?.status === 'active';
                        const rawAadhaar = c.aadhaarNumber || c.aadhaarNumberMasked || c.nationalIdMasked || '';
                        const cleanDigits = rawAadhaar.replace(/\D/g, '');
                        const isFullAadhaar = cleanDigits.length === 12;
                        const aadhaarDisplay = isFullAadhaar
                          ? cleanDigits.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')
                          : rawAadhaar || 'XXXX-XXXX-XXXX';

                        return (
                          <tr
                            key={c.id}
                            className={`transition-colors group cursor-pointer ${
                              theme === 'dark' ? 'hover:bg-slate-850/60' : 'hover:bg-slate-50'
                            }`}
                            onClick={() => setSelectedCitizen(c)}
                          >
                            {/* Citizen Identity */}
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 overflow-hidden border ${
                                  theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-700'
                                }`}>
                                  {c.photoURL ? (
                                    <img src={c.photoURL} alt={c.fullName} className="w-full h-full object-cover" />
                                  ) : (
                                    c.fullName ? c.fullName.charAt(0).toUpperCase() : 'C'
                                  )}
                                </div>
                                <div>
                                  <span className={`font-bold block transition-colors group-hover:text-emerald-500 ${
                                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                                  }`}>
                                    {c.fullName || 'Citizen'}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    {c.email || 'No email registered'}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Aadhaar Card / Dossier Badge */}
                            <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-1.5">
                                <div
                                  onClick={() => setSelectedCitizen(c)}
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono text-[11px] font-bold transition-all shadow-2xs cursor-pointer ${
                                    theme === 'dark'
                                      ? 'bg-slate-950 hover:bg-slate-850 border-slate-700 text-emerald-300'
                                      : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800'
                                  }`}
                                  title="Click to open official UIDAI Dossier"
                                >
                                  <QrCode className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                  <span className="tracking-wide select-all">{aadhaarDisplay}</span>
                                  {isFullAadhaar ? (
                                    <span className="text-[9px] text-emerald-300 bg-emerald-950 px-1 py-0.2 rounded border border-emerald-700/80 font-sans font-extrabold">
                                      REAL
                                    </span>
                                  ) : (
                                    <span className={`text-[9px] px-1 py-0.2 rounded border font-sans ${
                                      theme === 'dark' ? 'text-slate-400 bg-slate-800 border-slate-700' : 'text-slate-600 bg-slate-200 border-slate-300'
                                    }`}>
                                      UIDAI
                                    </span>
                                  )}
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => handleCopyCitizenAadhaar(e, c)}
                                  className={`p-1 rounded-md border transition-colors cursor-pointer ${
                                    theme === 'dark'
                                      ? 'bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                                      : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-600 hover:text-slate-900'
                                  }`}
                                  title="Copy Aadhaar Number"
                                >
                                  {copiedAadhaarId === c.id ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </td>

                            {/* Contact Info */}
                            <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                              <div className="space-y-1">
                                <span className={`font-mono text-[11px] block ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                                  {c.phoneNumber ? `+91 ${c.phoneNumber.slice(-10)}` : 'No phone'}
                                </span>
                                {c.phoneNumber && (
                                  <div className="flex items-center gap-1.5">
                                    <a
                                      href={`tel:${c.phoneNumber}`}
                                      className="text-[10px] text-blue-500 hover:underline flex items-center gap-0.5 font-medium"
                                    >
                                      <Phone className="w-3 h-3" /> Call
                                    </a>
                                    <span className="text-slate-400">•</span>
                                    <a
                                      href={`https://wa.me/91${c.phoneNumber.replace(/\D/g, '').slice(-10)}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[10px] text-emerald-500 hover:underline flex items-center gap-0.5 font-medium"
                                    >
                                      <MessageCircle className="w-3 h-3" /> WhatsApp
                                    </a>
                                  </div>
                                )}
                              </div>
                            </td>

                            {/* State & District */}
                            <td className="py-3 px-4">
                              <span className={`font-medium block ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                                {c.state || 'General'}
                              </span>
                              <span className="text-[10px] text-slate-400 block">
                                {c.district || c.state || ''} {c.pincode ? `(${c.pincode})` : ''}
                              </span>
                            </td>

                            {/* Age & Category */}
                            <td className="py-3 px-4">
                              <span className={`font-semibold block ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                                {c.age || 0} Yrs ({c.gender || 'M'})
                              </span>
                              <span className="text-[10px] text-slate-400 block">
                                {c.casteCategory || 'General'} • {(c.lifePhase || 'Student').replace('_', ' ')}
                              </span>
                            </td>

                            {/* 1-Yr Pass Status */}
                            <td className="py-3 px-4">
                              {isPaid ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600/50 text-[10px] font-bold font-mono">
                                  <Check className="w-3 h-3" /> Active (365D)
                                </span>
                              ) : (
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-medium ${
                                  theme === 'dark' ? 'bg-slate-950 text-slate-400 border-slate-800' : 'bg-slate-100 text-slate-600 border-slate-200'
                                }`}>
                                  Unpaid Pass
                                </span>
                              )}
                            </td>

                            {/* Actions Button */}
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCitizen(c);
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer border ${
                                  theme === 'dark'
                                    ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-xs'
                                }`}
                              >
                                View Dossier
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: OPPORTUNITIES & CIRCULARS REGISTRY */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'opportunities' && (
          <div className="space-y-4">
            {/* 1. Date Window Scope Strip: Default to Today & Yesterday (48 Hours) */}
            <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 ${
              theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    Circular Fetch Window (Default: 2-Day Realtime Window)
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                    {filterDateRange === '2days' ? 'ACTIVE: 48H WINDOW' : filterDateRange.toUpperCase()}
                  </span>
                </div>
                <p className={`text-[11px] mt-0.5 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Displaying circulars fetched Today and Yesterday by default. Switch filter to view specific day or all historical records.
                </p>
              </div>

              {/* Date Range Selector Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => { setFilterDateRange('2days'); setFilterIssuesOnly(false); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                    filterDateRange === '2days' && !filterIssuesOnly
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                      : theme === 'dark'
                      ? 'bg-slate-950 hover:bg-slate-850 text-slate-300 border-slate-800'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Today & Yesterday (Last 48h)</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/25 font-mono">
                    {oppMetrics.recent2Days}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => { setFilterDateRange('today'); setFilterIssuesOnly(false); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                    filterDateRange === 'today' && !filterIssuesOnly
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                      : theme === 'dark'
                      ? 'bg-slate-950 hover:bg-slate-850 text-slate-300 border-slate-800'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>Today's Fetched</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/25 font-mono">
                    {oppMetrics.today}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => { setFilterDateRange('yesterday'); setFilterIssuesOnly(false); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                    filterDateRange === 'yesterday' && !filterIssuesOnly
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                      : theme === 'dark'
                      ? 'bg-slate-950 hover:bg-slate-850 text-slate-300 border-slate-800'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>Yesterday</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/25 font-mono">
                    {oppMetrics.yesterday}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => { setFilterDateRange('all'); setFilterIssuesOnly(false); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                    filterDateRange === 'all' && !filterIssuesOnly
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                      : theme === 'dark'
                      ? 'bg-slate-950 hover:bg-slate-850 text-slate-300 border-slate-800'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>All Database</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/25 font-mono">
                    {oppMetrics.total}
                  </span>
                </button>
              </div>
            </div>

            {/* 2. Integrity & Broken Links / Fraud Monitoring Alert Banner */}
            {oppMetrics.issues > 0 ? (
              <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                theme === 'dark' ? 'bg-amber-950/40 border-amber-800/80' : 'bg-amber-50 border-amber-300 shadow-xs'
              }`}>
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-500 shrink-0">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${
                        theme === 'dark' ? 'text-amber-200' : 'text-amber-900'
                      }`}>
                        Opportunity Health Advisory: {oppMetrics.issues} Circulars Require Verification
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-black">
                        INTEGRITY ALERT
                      </span>
                    </div>
                    <p className={`text-[11px] mt-0.5 ${
                      theme === 'dark' ? 'text-amber-300/80' : 'text-amber-800'
                    }`}>
                      Broken official links or advisory notices detected. You can filter and inspect flagged circulars directly.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFilterIssuesOnly((prev) => !prev)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border ${
                    filterIssuesOnly
                      ? 'bg-amber-500 text-black border-amber-400 font-extrabold shadow-xs'
                      : 'bg-amber-900/60 hover:bg-amber-900 text-amber-200 border-amber-700'
                  }`}
                >
                  <AlertOctagon className="w-3.5 h-3.5" />
                  <span>{filterIssuesOnly ? 'Show All Filtered' : `Inspect ${oppMetrics.issues} Flagged Issues`}</span>
                </button>
              </div>
            ) : (
              <div className={`px-4 py-2.5 rounded-xl border flex items-center justify-between text-xs font-mono ${
                theme === 'dark' ? 'bg-emerald-950/20 border-emerald-900/60 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Automated Portal Link Health: All verified official circular links are valid and active.</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 font-bold">100% HEALTHY</span>
              </div>
            )}

            {/* 3. Opportunities Section Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {Object.entries(sectionMetaMap).map(([stageKey, meta]) => {
                const stat = oppSectionStats[stageKey] || { count: 0, active: 0, expired: 0 };
                const isSelected = filterOppSection === stageKey;

                return (
                  <button
                    key={stageKey}
                    onClick={() => setFilterOppSection(isSelected ? 'all' : stageKey)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? (theme === 'dark' ? 'bg-slate-900 border-emerald-500 shadow-sm ring-1 ring-emerald-500/50' : 'bg-emerald-50 border-emerald-500 shadow-xs ring-1 ring-emerald-500')
                        : (theme === 'dark' ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850' : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-xs')
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                        {meta.label}
                      </span>
                      <span className="text-[9px] text-slate-500 truncate">
                        {meta.labelHi}
                      </span>
                    </div>
                    <div className={`text-xl font-extrabold font-mono mt-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {stat.count}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] mt-0.5 font-mono">
                      <span className="text-emerald-500 font-semibold">{stat.active} Active</span>
                      {stat.expired > 0 && (
                        <span className="text-rose-500 font-semibold">• {stat.expired} Closed</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 4. Filter & Search Bar */}
            <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 text-xs ${
              theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[260px]">
                {/* Search Input */}
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchOpp}
                    onChange={(e) => setSearchOpp(e.target.value)}
                    placeholder="Search by Opportunity Name, Authority, Category, Issue..."
                    className={`w-full pl-9 pr-3 py-2 rounded-lg border text-xs outline-none transition-colors ${
                      theme === 'dark'
                        ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-emerald-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
                    }`}
                  />
                  {searchOpp && (
                    <button
                      onClick={() => setSearchOpp('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Section Filter Dropdown */}
                <select
                  value={filterOppSection}
                  onChange={(e) => setFilterOppSection(e.target.value)}
                  className={`px-3 py-2 rounded-lg border text-xs outline-none cursor-pointer transition-colors ${
                    theme === 'dark'
                      ? 'bg-slate-950 border-slate-700 text-slate-200 focus:border-emerald-500'
                      : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-emerald-600'
                  }`}
                >
                  <option value="all">All Sections ({opportunities.length})</option>
                  {Object.entries(sectionMetaMap).map(([stageKey, meta]) => (
                    <option key={stageKey} value={stageKey}>
                      {meta.label} ({oppSectionStats[stageKey]?.count || 0})
                    </option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={filterOppStatus}
                  onChange={(e) => setFilterOppStatus(e.target.value as any)}
                  className={`px-3 py-2 rounded-lg border text-xs outline-none cursor-pointer transition-colors ${
                    theme === 'dark'
                      ? 'bg-slate-950 border-slate-700 text-slate-200 focus:border-emerald-500'
                      : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-emerald-600'
                  }`}
                >
                  <option value="all">All Application Status</option>
                  <option value="active">Active Applications Ongoing</option>
                  <option value="expired">Closed / Expired</option>
                  <option value="issues_only">Flagged Link Issues / Warnings Only</option>
                </select>
              </div>

              {/* Counter Pill */}
              <div className="text-slate-400 font-mono text-[11px] flex items-center gap-2">
                <span>Showing:</span>
                <span className={`font-bold px-2.5 py-1 rounded-md border ${
                  theme === 'dark' ? 'text-white bg-slate-950 border-slate-800' : 'text-slate-900 bg-slate-100 border-slate-200'
                }`}>
                  {filteredOpportunities.length} of {opportunities.length} Total
                </span>
              </div>
            </div>

            {/* 5. Opportunities Data Table */}
            <div className={`rounded-xl border overflow-hidden shadow-sm ${
              theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                      theme === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-400' : 'bg-slate-100/90 border-slate-200 text-slate-600'
                    }`}>
                      <th className="py-3 px-4">Opportunity Name (Title)</th>
                      <th className="py-3 px-4">Section / Stage</th>
                      <th className="py-3 px-4">Category & Benefit</th>
                      <th className="py-3 px-4">Issuing Authority / Ministry</th>
                      <th className="py-3 px-4">Integrity & Link Health</th>
                      <th className="py-3 px-4">Deadline & Status</th>
                      <th className="py-3 px-4 text-right">Official Link</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === 'dark' ? 'divide-slate-800/80' : 'divide-slate-150'}`}>
                    {filteredOpportunities.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500">
                          {isLoadingOpps ? (
                            <div className="flex items-center justify-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                              <span>Loading opportunities registry...</span>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <p>No opportunities match your current search query or filter.</p>
                              {filterDateRange !== 'all' && (
                                <button
                                  type="button"
                                  onClick={() => setFilterDateRange('all')}
                                  className="text-xs text-emerald-500 hover:underline font-semibold"
                                >
                                  View all historical opportunities ({opportunities.length} available)
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ) : (
                      filteredOpportunities.map((opp) => {
                        const meta = sectionMetaMap[opp.lifeStage] || {
                          label: opp.lifeStage.replace('_', ' '),
                          labelHi: '',
                          badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
                        };

                        return (
                          <tr
                            key={opp.id}
                            className={`transition-colors group ${
                              theme === 'dark' ? 'hover:bg-slate-850/60' : 'hover:bg-slate-50'
                            }`}
                          >
                            {/* Opportunity Name & Title */}
                            <td className="py-3 px-4 max-w-sm">
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className={`font-bold transition-colors group-hover:text-emerald-500 block ${
                                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                                  }`}>
                                    {opp.title}
                                  </span>
                                  {opp.isToday && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/80 tracking-wide uppercase">
                                      TODAY
                                    </span>
                                  )}
                                  {opp.isYesterday && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-950 text-blue-300 border border-blue-700/80 tracking-wide uppercase">
                                      YESTERDAY
                                    </span>
                                  )}
                                  {opp.isNew && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-950 text-amber-300 border border-amber-700/80 tracking-wide uppercase">
                                      NEW
                                    </span>
                                  )}
                                  {opp.is100PercentFree && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/80 tracking-wide uppercase">
                                      100% FREE
                                    </span>
                                  )}
                                </div>
                                {opp.titleHi && (
                                  <span className="text-[11px] text-slate-400 font-medium block">
                                    {opp.titleHi}
                                  </span>
                                )}
                                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                                  <span>ID: {opp.id}</span>
                                  <span>•</span>
                                  <span className="text-emerald-500">Fetched: {opp.fetchedLabel || 'Active'}</span>
                                </div>
                              </div>
                            </td>

                            {/* Section / Life Stage Badge */}
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border ${meta.badgeColor}`}>
                                <span>{meta.label}</span>
                              </span>
                              {meta.labelHi && (
                                <span className="text-[9px] text-slate-500 block mt-0.5">
                                  {meta.labelHi}
                                </span>
                              )}
                            </td>

                            {/* Category & Benefit */}
                            <td className="py-3 px-4">
                              <span className={`font-semibold block capitalize ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                                {opp.category.replace(/_/g, ' ')}
                              </span>
                              <span className="text-[11px] text-emerald-500 font-medium block truncate max-w-xs">
                                {opp.benefitHeadline || `Benefit: Rs ${(opp.benefitAmount || 0).toLocaleString('en-IN')}`}
                              </span>
                            </td>

                            {/* Issuing Authority / Ministry */}
                            <td className="py-3 px-4">
                              <span className={`font-medium block ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                                {opp.issuingAuthority}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono block">
                                {opp.circularNumber}
                              </span>
                            </td>

                            {/* Integrity & Link Health Status */}
                            <td className="py-3 px-4">
                              {opp.healthStatus === 'link_issue' ? (
                                <div className="space-y-1">
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold">
                                    <Link2Off className="w-3 h-3 text-rose-400" />
                                    <span>Broken Link Error</span>
                                  </span>
                                  {opp.healthIssue && (
                                    <span className="text-[10px] text-rose-400 block font-mono">
                                      {opp.healthIssue}
                                    </span>
                                  )}
                                </div>
                              ) : opp.healthStatus === 'scam_alert' ? (
                                <div className="space-y-1">
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold">
                                    <ShieldAlert className="w-3 h-3 text-amber-400" />
                                    <span>Scam Advisory</span>
                                  </span>
                                  {opp.healthIssue && (
                                    <span className="text-[10px] text-amber-400 block font-mono">
                                      {opp.healthIssue}
                                    </span>
                                  )}
                                </div>
                              ) : opp.healthStatus === 'expired_warning' ? (
                                <div className="space-y-1">
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-bold">
                                    <AlertCircle className="w-3 h-3 text-slate-400" />
                                    <span>Expired Portal</span>
                                  </span>
                                </div>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 text-[10px] font-bold font-mono">
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span>Verified Active Link</span>
                                </span>
                              )}
                            </td>

                            {/* Deadline & Live Status */}
                            <td className="py-3 px-4">
                              <div className="space-y-1">
                                <span className={`font-mono text-[11px] block ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                                  {opp.deadline ? opp.deadline : 'Open / Rolling'}
                                </span>
                                {opp.isExpired ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold">
                                    Closed / Expired
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold font-mono">
                                    <Check className="w-3 h-3" /> Active Now
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Official Verification URL */}
                            <td className="py-3 px-4 text-right">
                              {opp.officialPortalUrl && opp.officialPortalUrl !== '#' ? (
                                <a
                                  href={opp.officialPortalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-all shadow-xs cursor-pointer ${
                                    theme === 'dark'
                                      ? 'bg-slate-950 hover:bg-slate-850 text-emerald-400 hover:text-emerald-300 border-slate-700'
                                      : 'bg-slate-100 hover:bg-slate-200 text-emerald-700 hover:text-emerald-800 border-slate-300'
                                  }`}
                                >
                                  <span>Official Portal</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ) : (
                                <span className="text-slate-500 text-[11px]">Official Notice</span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: LIVE FEED CRAWLER & SECTOR REGISTRY */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'crawler' && (
          <div className="space-y-6">
            {/* Header Control Strip */}
            <div className={`p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div>
                <h3 className={`text-sm font-bold flex items-center gap-2 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  <Radio className="w-4 h-4 text-emerald-500" />
                  <span>Real-Time National Feeds Synchronization</span>
                </h3>
                <p className={`text-xs mt-1 max-w-xl leading-relaxed ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Automated ingest engine scanning verified portals (Join Indian Army, Navy, NTA NEET/JEE, AICTE Internship Portal, NCS National Career Service, AIIMS/NHM Healthcare).
                </p>
              </div>

              <button
                onClick={handleTriggerCrawl}
                disabled={isCrawling}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
              >
                {isCrawling ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Crawling Portals...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Trigger Live Synchronize</span>
                  </>
                )}
              </button>
            </div>

            {/* Opportunities Breakdown Grid */}
            {systemStatus && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {Object.entries(systemStatus.opportunities.categories).map(([stage, count]) => (
                  <div key={stage} className={`p-3.5 rounded-xl border text-xs ${
                    theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                      {stage.replace('_', ' ')}
                    </span>
                    <span className={`text-xl font-extrabold font-mono mt-1 block ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      {count}
                    </span>
                    <span className="text-[10px] text-emerald-500 block mt-0.5 font-medium">Verified Circulars</span>
                  </div>
                ))}
              </div>
            )}

            {/* Live Crawler Audit Trail */}
            <div className={`p-5 rounded-xl border space-y-3 ${
              theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className={`flex items-center justify-between border-b pb-3 ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <span className={`text-xs font-bold flex items-center gap-2 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  <Activity className="w-4 h-4 text-emerald-500" />
                  <span>Crawler Execution Logs</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {crawlerLogs.length} Events Logged
                </span>
              </div>

              {crawlerLogs.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  No manual crawls triggered during this session yet. Click "Trigger Live Synchronize" above to scan live feeds.
                </div>
              ) : (
                <div className="space-y-2">
                  {crawlerLogs.map((log, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg border flex items-start justify-between gap-3 text-xs ${
                        theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className={`block ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>{log.message}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{log.timestamp}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                        log.status === 'success'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/60'
                          : 'bg-rose-950 text-rose-300 border border-rose-800/60'
                      }`}>
                        {log.status === 'success' ? 'SYNCED' : 'ERROR'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: SYSTEM HEALTH & MAIN WEBSITE DIAGNOSTICS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'diagnostics' && systemStatus && (
          <div className="space-y-6">
            {/* System Diagnostic Alerts */}
            <div className={`p-5 rounded-xl border space-y-4 ${
              theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className={`border-b pb-3 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                <h3 className={`text-sm font-bold flex items-center gap-2 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span>Main Website Telemetry & Configuration Status</span>
                </h3>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Real-time status of critical backend microservices, database clusters, and third-party APIs.
                </p>
              </div>

              <div className="space-y-3">
                {systemStatus.diagnostics.map((diag, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
                      diag.level === 'warning'
                        ? (theme === 'dark' ? 'bg-amber-950/20 border-amber-800/60 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-900')
                        : diag.level === 'error'
                        ? (theme === 'dark' ? 'bg-rose-950/30 border-rose-800/60 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-900')
                        : (theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700')
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{diag.component}</span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${
                          diag.level === 'warning'
                            ? 'bg-amber-500 text-slate-950'
                            : diag.level === 'error'
                            ? 'bg-rose-500 text-white'
                            : 'bg-emerald-500 text-slate-950'
                        }`}>
                          {diag.level}
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed opacity-90">{diag.message}</p>
                    </div>

                    {diag.action && (
                      <span className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border shrink-0 ${
                        theme === 'dark' ? 'text-slate-400 bg-black/30 border-white/10' : 'text-slate-600 bg-slate-200 border-slate-300'
                      }`}>
                        {diag.action}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Gateway Configuration Audit Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card A: Database Storage */}
              <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`font-bold flex items-center gap-1.5 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    <Database className="w-4 h-4 text-emerald-500" />
                    <span>Database Engine</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-700/60">
                    ACTIVE
                  </span>
                </div>
                <div className="text-slate-400 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span>Engine Type:</span>
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{systemStatus.database.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Query Latency:</span>
                    <span className="text-emerald-500 font-mono font-bold">{systemStatus.database.latencyMs} ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className={`capitalize ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>{systemStatus.database.status}</span>
                  </div>
                </div>
              </div>

              {/* Card B: Payment Gateway */}
              <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`font-bold flex items-center gap-1.5 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    <CreditCard className="w-4 h-4 text-amber-500" />
                    <span>Razorpay Payments</span>
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    systemStatus.gateways.razorpay.configured
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/60'
                      : 'bg-amber-950 text-amber-300 border border-amber-700/60'
                  }`}>
                    {systemStatus.gateways.razorpay.configured ? 'PRODUCTION' : 'SANDBOX'}
                  </span>
                </div>
                <div className="text-slate-400 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span>Operating Mode:</span>
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{systemStatus.gateways.razorpay.mode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Key Prefix:</span>
                    <span className={`font-mono ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>{systemStatus.gateways.razorpay.keyPreview}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pass Fee:</span>
                    <span className="text-emerald-500 font-bold">Rs 1.00 INR (Server-Locked)</span>
                  </div>
                </div>
              </div>

              {/* Card C: SMS OTP Gateway */}
              <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`font-bold flex items-center gap-1.5 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    <Phone className="w-4 h-4 text-blue-500" />
                    <span>SMS OTP Gateway</span>
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    systemStatus.gateways.sms.configured
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/60'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {systemStatus.gateways.sms.configured ? 'LIVE' : 'SIMULATION'}
                  </span>
                </div>
                <div className="text-slate-400 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span>Active Provider:</span>
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{systemStatus.gateways.sms.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Anti-Flood Limiter:</span>
                    <span className="text-emerald-500 font-bold">5 Attempts / 5 Min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fallback:</span>
                    <span className={`${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>Terminal Log Relay</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Server Process Environment */}
            <div className={`p-4 rounded-xl border text-xs font-mono flex flex-wrap items-center justify-between gap-4 ${
              theme === 'dark' ? 'bg-slate-900/90 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600 shadow-xs'
            }`}>
              <div>Node.js Runtime: <strong className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>{systemStatus.system.nodeVersion}</strong></div>
              <div>Platform: <strong className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>{systemStatus.system.platform}</strong></div>
              <div>Memory Heap: <strong className="text-emerald-500">{systemStatus.system.memoryUsageMb} MB</strong></div>
              <div>Process Uptime: <strong className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>{Math.floor(systemStatus.system.uptimeSeconds / 60)} minutes</strong></div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: LIVE PUSH NOTIFICATION BROADCAST HUB */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Registered Devices</span>
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                </div>
                <div className={`text-2xl font-black mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {pushStats?.registeredDeviceCount ?? '...'}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  Active FCM & Web Push Token Registry
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Push Delivery Engine</span>
                  <Radio className="w-4 h-4 text-emerald-400" />
                </div>
                <div className={`text-sm font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {pushStats?.isFcmServerConfigured ? 'FCM HTTP v1 Cloud Push' : 'Browser Service Worker Dispatch'}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Project: {pushStats?.projectId || 'lifeos-7a6f1'}
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Delivery Channels</span>
                  <Bell className="w-4 h-4 text-emerald-400" />
                </div>
                <div className={`text-sm font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Mobile Drawer & Desktop
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Lock-screen notifications with click redirection
                </div>
              </div>
            </div>

            {/* Broadcast Form & Live Mockup */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Column */}
              <div className={`lg:col-span-2 p-5 rounded-xl border ${
                theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      Compose Push Alert Broadcast
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Send verified opportunities directly to all enrolled citizens&apos; devices.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => fetchPushStats()}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                    title="Refresh Push Status"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Templates */}
                <div className="mb-4">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Quick Templates
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPushTitle('Citzos — नई छात्रवृत्ति अधिसूचना');
                        setPushBody('राष्ट्रीय छात्रवृत्ति पोर्टल पर नए आवेदन शुरू हो गए हैं। अपनी पात्रता तुरंत जांचें।');
                        setPushUrl('/?tab=education');
                      }}
                      className="px-2.5 py-1 text-xs rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300 transition-colors"
                    >
                      छात्रवृत्ति अलर्ट
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPushTitle('Citzos — सरकारी भर्ती परीक्षा अलर्ट');
                        setPushBody('नवीनतम सरकारी रिक्तियां और परीक्षा तिथियां घोषित की गई हैं। आधिकारिक विवरण देखें।');
                        setPushUrl('/?tab=career');
                      }}
                      className="px-2.5 py-1 text-xs rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300 transition-colors"
                    >
                      सरकारी भर्ती अलर्ट
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPushTitle('Citzos — कौशल विकास योजना');
                        setPushBody('युवाओं के लिए निशुल्क तकनीकी प्रशिक्षण व सरकारी प्रमाणन कार्यक्रम शुरू।');
                        setPushUrl('/skills');
                      }}
                      className="px-2.5 py-1 text-xs rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300 transition-colors"
                    >
                      कौशल विकास
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPushTitle('Citzos — नया नागरिक अवसर अलर्ट');
                        setPushBody('आपके राज्य के लिए नई कल्याणकारी योजनाओं की सूची अपडेट की गई है।');
                        setPushUrl('/');
                      }}
                      className="px-2.5 py-1 text-xs rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300 transition-colors"
                    >
                      सामान्य अवसर
                    </button>
                  </div>
                </div>

                {/* Feedback Banner */}
                {pushFeedback && (
                  <div className={`p-3.5 rounded-lg mb-4 text-xs flex items-center justify-between border ${
                    pushFeedback.type === 'success'
                      ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                      : 'bg-rose-950/60 border-rose-700 text-rose-300'
                  }`}>
                    <div className="flex items-center gap-2">
                      {pushFeedback.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                      <span>{pushFeedback.message}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPushFeedback(null)}
                      className="text-xs underline hover:opacity-80 ml-3"
                    >
                      Dismiss
                    </button>
                  </div>
                )}

                {/* Broadcast Form */}
                <form onSubmit={handleBroadcastPush} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">
                      Notification Title
                    </label>
                    <input
                      type="text"
                      value={pushTitle}
                      onChange={(e) => setPushTitle(e.target.value)}
                      placeholder="e.g. Citzos — नया अवसर अलर्ट"
                      className={`w-full px-3.5 py-2.5 rounded-lg text-xs border outline-hidden transition-all ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-emerald-500'
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">
                      Notification Message Body
                    </label>
                    <textarea
                      value={pushBody}
                      onChange={(e) => setPushBody(e.target.value)}
                      rows={3}
                      placeholder="Write message to be shown on lock-screen and notification drawer..."
                      className={`w-full px-3.5 py-2.5 rounded-lg text-xs border outline-hidden transition-all ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-emerald-500'
                      }`}
                      required
                    />
                    <div className="text-right text-[10px] text-slate-500 mt-1">
                      {pushBody.length} characters
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">
                      Action Destination URL (Opens when notification is clicked)
                    </label>
                    <input
                      type="text"
                      value={pushUrl}
                      onChange={(e) => setPushUrl(e.target.value)}
                      placeholder="e.g. /?tab=education or /forms"
                      className={`w-full px-3.5 py-2.5 rounded-lg text-xs border outline-hidden transition-all ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-500'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-emerald-500'
                      }`}
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setPushTitle('');
                        setPushBody('');
                        setPushUrl('/');
                        setPushFeedback(null);
                      }}
                      className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg transition-colors"
                    >
                      Clear
                    </button>

                    <button
                      type="submit"
                      disabled={isSendingPush || !pushTitle.trim() || !pushBody.trim()}
                      className="px-5 py-2.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-slate-950 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-emerald-500/20"
                    >
                      {isSendingPush ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Dispatching Broadcast...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Broadcast to All Devices</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Notification Device Preview Column */}
              <div className={`p-5 rounded-xl border flex flex-col justify-between ${
                theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Lock Screen / System Preview
                  </h4>
                  <div className="p-4 rounded-xl border border-slate-700 bg-slate-950 shadow-xl space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded bg-emerald-500 flex items-center justify-center text-[8px] font-black text-black">
                          C
                        </span>
                        <span className="font-semibold text-slate-200">Citzos</span>
                      </div>
                      <span>Just now</span>
                    </div>
                    <div className="text-xs font-bold text-white leading-snug">
                      {pushTitle || 'Title preview'}
                    </div>
                    <div className="text-[11px] text-slate-300 leading-relaxed">
                      {pushBody || 'Message preview will appear here on user screen.'}
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-emerald-400 font-medium">
                      <span>Destination: {pushUrl || '/'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-slate-800/40 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="font-semibold text-slate-300">Privacy & Protocol:</div>
                  <div>• Sent strictly to opt-in registered device tokens.</div>
                  <div>• Zero third-party ad tracking or personal data leaks.</div>
                  <div>• Automatic pruning of expired and uninstalled tokens.</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Citizen Aadhaar Inspection Dossier Modal */}
      {selectedCitizen && (
        <CitizenAadhaarModal
          citizen={selectedCitizen}
          onClose={() => setSelectedCitizen(null)}
        />
      )}
    </div>
  );
}
