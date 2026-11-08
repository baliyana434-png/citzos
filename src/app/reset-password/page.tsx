'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BrandSplashScreen } from '@/components/common/BrandSplashScreen';
import { useTranslation } from '@/i18n/useTranslation';
import { Mail, KeyRound, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import { validateRealEmail, validateRealPassword } from '@/utils/antiFraudValidation';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useTranslation();

  const prefillEmail = searchParams.get('email') || '';
  const prefillToken = searchParams.get('token') || '';

  const [email, setEmail] = useState<string>(prefillEmail);
  const [otp, setOtp] = useState<string>(prefillToken);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const emailCheck = validateRealEmail(email, language);
    if (!emailCheck.valid) {
      setErrorMessage(emailCheck.error || (language === 'hi' ? 'मान्य ईमेल दर्ज करें।' : 'Please enter a valid email.'));
      return;
    }

    if (!otp.trim()) {
      setErrorMessage(
        language === 'hi'
          ? 'कृपया ईमेल पर प्राप्त 6-अंकों का वेरिफिकेशन कोड दर्ज करें।'
          : 'Please enter the 6-digit verification code from your email.'
      );
      return;
    }

    const passwordCheck = validateRealPassword(newPassword, '', emailCheck.cleanEmail, language);
    if (!passwordCheck.valid) {
      setErrorMessage(passwordCheck.error || (language === 'hi' ? 'कमजोर पासवर्ड।' : 'Weak password.'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage(language === 'hi' ? 'दोनों पासवर्ड समान होने चाहिए।' : 'Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailCheck.cleanEmail,
          otp: otp.trim(),
          newPassword,
          lang: language,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.message || (language === 'hi' ? 'पासवर्ड रीसेट विफल रहा।' : 'Failed to reset password.'));
        return;
      }

      setSuccessMessage(data.message);
      if (data.sessionToken) {
        try {
          localStorage.setItem('citizen_session_token', data.sessionToken);
          if (data.citizen) {
            localStorage.setItem('citizen_profile', JSON.stringify(data.citizen));
            localStorage.removeItem('citizen_logged_out');
          }
        } catch (e) {}
      }

      // Quick redirect
      setTimeout(() => {
        window.location.href = '/';
      }, 600);
    } catch (err: any) {
      setErrorMessage(
        language === 'hi' ? 'तकनीकी त्रुटि आई। कृपया पुनः प्रयास करें।' : 'Network error. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 flex flex-col justify-center items-center p-4 selection:bg-emerald-500 selection:text-white">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Link href="/" className="hover:opacity-90 transition-opacity" aria-label="Citzos Home">
              <img src="/logo-citzos.png" alt="CITZOS" className="h-8 w-auto object-contain" />
            </Link>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {language === 'hi' ? 'नया पासवर्ड बनाएं' : 'Set New Password'}
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            {language === 'hi'
              ? 'Gmail पर प्राप्त 6-अंकों का वेरिफिकेशन कोड और नया पासवर्ड दर्ज करें।'
              : 'Enter the 6-digit code received on your Gmail and your new secure password.'}
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {language === 'hi' ? 'पंजीकृत ईमेल पता' : 'Registered Email Address'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'hi' ? 'पंजीकृत ईमेल पता' : 'Registered email address'}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* 6-Digit Code / Token */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {language === 'hi' ? '6-अंकों का वेरिफिकेशन कोड' : '6-Digit Verification Code'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder={language === 'hi' ? '6-अंकों का वेरिफिकेशन कोड' : '6-digit verification code'}
                maxLength={6}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 outline-none tracking-widest transition-all"
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {language === 'hi' ? 'नया पासवर्ड' : 'New Password'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={language === 'hi' ? 'नया पासवर्ड' : 'New password'}
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {language === 'hi' ? 'नए पासवर्ड की पुष्टि करें' : 'Confirm New Password'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={language === 'hi' ? 'नए पासवर्ड की पुष्टि करें' : 'Confirm new password'}
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <span>{language === 'hi' ? 'पासवर्ड अपडेट करें' : 'Update Password'}</span>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'लॉगिन पेज पर वापस जाएं' : 'Back to Login'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<BrandSplashScreen />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
