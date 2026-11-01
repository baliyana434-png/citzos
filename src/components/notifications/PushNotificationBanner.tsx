'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellRing,
  X,
  CheckCircle2,
  Share2,
  PlusSquare,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { pushNotificationService } from '@/services/pushNotification';
import { useTranslation } from '@/i18n/useTranslation';

interface PushNotificationBannerProps {
  onNotificationEnabled?: () => void;
}

export const PushNotificationBanner: React.FC<PushNotificationBannerProps> = ({
  onNotificationEnabled,
}) => {
  const { language } = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [showIOSGuide, setShowIOSGuide] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect iPhone / iPad (iOS)
    const iosDetected =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // Detect if app is already running from Home Screen (PWA Standalone Mode)
    const standaloneDetected =
      window.matchMedia('(display-mode: standalone)').matches ||
      Boolean((navigator as any).standalone);

    setIsIOS(iosDetected);
    setIsStandalone(standaloneDetected);

    // If notifications are already granted on desktop/Android or standalone iOS, don't auto-show
    if (
      'Notification' in window &&
      Notification.permission === 'granted'
    ) {
      return;
    }

    // Check if dismissed in last 48 hours
    const dismissedAt = localStorage.getItem('push_banner_dismissed_at');
    if (dismissedAt) {
      const hoursPassed = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60);
      if (hoursPassed < 48) {
        return;
      }
    }

    // Auto-show banner smoothly
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Listen for manual trigger from Header Bell or Profile
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleManualOpen = () => {
      setIsVisible(true);
      setShowIOSGuide(false);
    };

    window.addEventListener('open_notification_prompt', handleManualOpen);
    return () => window.removeEventListener('open_notification_prompt', handleManualOpen);
  }, []);

  const handleEnablePush = async () => {
    // If user is on iPhone and NOT in standalone mode, Apple requires Home Screen installation to push alerts
    if (isIOS && !isStandalone && !('Notification' in window)) {
      setShowIOSGuide(true);
      return;
    }

    setIsLoading(true);
    try {
      const result = await pushNotificationService.requestPermission();
      if (result.success) {
        setIsSuccess(true);
        // Dispatch test alert non-blocking
        pushNotificationService.sendLocalTestNotification(language === 'hi' ? 'hi' : 'en').catch(() => {});
        if (onNotificationEnabled) {
          onNotificationEnabled();
        }
        setTimeout(() => {
          setIsVisible(false);
        }, 1000);
      } else {
        // If on iOS and standard request failed, show iOS home screen guide
        if (isIOS) {
          setShowIOSGuide(true);
        } else {
          setIsVisible(false);
        }
      }
    } catch (e) {
      console.warn('Push registration note:', e);
      if (isIOS) {
        setShowIOSGuide(true);
      } else {
        setIsVisible(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('push_banner_dismissed_at', Date.now().toString());
    setIsVisible(false);
    setShowIOSGuide(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Main Floating Push Notification Alert Card */}
      <aside
        aria-label="Push Notification Alert"
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-in fade-in slide-in-from-bottom-5 duration-300"
      >
        <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-emerald-500/40 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start gap-3.5 relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-bold shrink-0 shadow-lg shadow-emerald-500/20">
              {isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-slate-950" />
              ) : (
                <BellRing className="w-5 h-5 text-slate-950 animate-bounce" />
              )}
            </div>

            <div className="flex-1 min-w-0 pr-4">
              {isSuccess ? (
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-emerald-400">
                    {language === 'hi' ? 'सूचनाएं सक्रिय हो गईं!' : 'Notifications Enabled!'}
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    {language === 'hi'
                      ? 'लाइव अवसर सूचनाएं सक्रिय हो गई हैं। अब सभी नए अपडेट आपको सीधे लॉक स्क्रीन पर मिलेंगे।'
                      : 'Live opportunity alerts are now active directly on your device lock screen.'}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs sm:text-sm font-black text-white tracking-tight">
                      {isIOS
                        ? (language === 'hi' ? 'iPhone पर सीधे लॉक स्क्रीन अलर्ट पाएं' : 'Get Live Alerts on your iPhone')
                        : (language === 'hi' ? 'Lock Screen पर सीधे सरकारी अलर्ट पाएं' : 'Get Live Alerts on Lock Screen')}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                    {isIOS
                      ? (language === 'hi'
                          ? 'हर नई सरकारी भर्ती, योजना व एडमिट कार्ड का इंस्टेंट नोटिफिकेशन पाने के लिए अलर्ट चालू करें।'
                          : 'Get real-time push notifications for government exams, jobs, and schemes on your iPhone.')
                      : (language === 'hi'
                          ? 'नई सरकारी योजनाएं, एडमिट कार्ड व भर्ती निकलते ही आपके फोन पर तुरंत नोटिफिकेशन आएगा।'
                          : 'Get instant notifications for new government schemes, job updates, and deadlines.')}
                  </p>

                  <div className="flex items-center gap-2 mt-3 pt-1">
                    <button
                      type="button"
                      onClick={handleEnablePush}
                      disabled={isLoading}
                      className="py-2 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>
                        {isLoading
                          ? (language === 'hi' ? 'सक्रिय हो रहा है...' : 'Enabling...')
                          : (language === 'hi' ? 'सूचनाएं चालू करें' : 'Enable Alerts')}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDismiss}
                      className="py-2 px-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-semibold hover:bg-white/5 transition-all cursor-pointer"
                    >
                      {language === 'hi' ? 'बाद में' : 'Later'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleDismiss}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. iPhone (iOS) Safari 2-Step Enable Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowIOSGuide(false)} />

          <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-5 text-white shadow-2xl z-10 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">
                    {language === 'hi' ? 'iPhone पर अलर्ट कैसे चालू करें' : 'Enable Alerts on iPhone'}
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    {language === 'hi' ? 'Apple iOS आधिकारिक 2-स्टेप गाइड' : 'Apple iOS Official 2-Step Guide'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </div>
                <div>
                  <span className="font-bold text-slate-200 block">
                    {language === 'hi' ? 'Safari में Share बटन दबाएं' : 'Tap the Share Button in Safari'}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {language === 'hi'
                      ? 'Safari ब्राउज़र के नीचे बीच में Share आइकन (बॉक्स में ऊपर तीर) पर टैप करें।'
                      : 'Tap the Share icon (square with upward arrow) at the bottom bar of Safari.'}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </div>
                <div>
                  <span className="font-bold text-slate-200 block">
                    {language === 'hi' ? '"Add to Home Screen" चुनें' : 'Select "Add to Home Screen"'}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {language === 'hi'
                      ? 'मेन्यू में नीचे स्क्रॉल करके "Add to Home Screen" पर टैप करें और ऊपर "Add" दबाएं।'
                      : 'Scroll down and tap "Add to Home Screen", then tap "Add" in the top right.'}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 text-emerald-300 text-[11px] leading-snug">
                {language === 'hi'
                  ? 'Home Screen आइकन से ऐप खोलते ही iPhone की लॉक स्क्रीन पर सभी सरकारी नोटिफिकेशन सीधे आने लगेंगे।'
                  : 'Open the app from your Home Screen to receive instant lock screen notifications.'}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'समझ गया (Got It)' : 'Got It'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

