'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthModal } from '@/components/auth/AuthModal';
import { CitizenProfile } from '@/types';
import { useTranslation } from '@/i18n/useTranslation';
import { BrandSplashScreen } from '@/components/common/BrandSplashScreen';
import { getGoogleRedirectResultSafe } from '@/services/googleAuth';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useTranslation();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [pendingPrefill, setPendingPrefill] = useState<{
    name: string;
    email: string;
    photoURL?: string;
    isGoogle: boolean;
  } | null>(null);

  const fromLogout = searchParams.get('from') === 'logout';
  const initialNotice = fromLogout
    ? language === 'hi'
      ? 'सफलतापूर्वक लॉग आउट हो गया। नागरिक पोर्टल में प्रवेश हेतु पुनः लॉगिन करें।'
      : 'You have been logged out successfully. Please log in to continue.'
    : undefined;

  useEffect(() => {
    let cancelled = false;

    async function checkLoginState() {
      // 1. Check if returning from a mobile Google OAuth redirect
      try {
        const redirectUser = await getGoogleRedirectResultSafe();
        if (cancelled) return;
        if (redirectUser && redirectUser.email) {
          const cleanEmail = redirectUser.email.toLowerCase().trim();

          // Check if citizen is ALREADY REGISTERED in the database
          try {
            const res = await fetch(`/api/citizens/profile?email=${encodeURIComponent(cleanEmail)}`, {
              cache: 'no-store',
            });
            const data = await res.json();
            if (res.ok && data.success && data.citizen && (data.citizen.dob || data.citizen.state || data.citizen.registeredAt)) {
              // Registered citizen -> instant direct login
              await handleLoginSuccess(data.citizen);
              return;
            }
          } catch (e) {}

          // Non-registered account -> DO NOT auto-login!
          // Push directly to Sign Up Step 2 so user enters their real details!
          setPendingPrefill({
            name: redirectUser.name,
            email: cleanEmail,
            photoURL: redirectUser.photoURL,
            isGoogle: true,
          });
          setCheckingAuth(false);
          return;
        }
      } catch (err) {
        console.warn('Redirect auth notice:', err);
      }

      // 2. Check if already logged in with verified profile
      try {
        const isLoggedOut = localStorage.getItem('citizen_logged_out');
        const saved = localStorage.getItem('citizen_profile');
        if (isLoggedOut !== 'true' && saved) {
          const parsed = JSON.parse(saved);
          if (
            parsed &&
            parsed.id &&
            parsed.id !== 'cit-guest' &&
            parsed.id !== 'cit-default' &&
            parsed.isOnboarded &&
            parsed.dob
          ) {
            // Restore server session cookie for middleware
            await fetch('/api/auth/session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ citizenId: parsed.id, email: parsed.email }),
            }).catch(() => {});

            window.location.replace('/');
            return;
          } else {
            // Stale or incomplete unverified profile, clean up
            localStorage.removeItem('citizen_profile');
          }
        }
      } catch (e) {}

      setCheckingAuth(false);
    }

    checkLoginState();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLoginSuccess = async (profile: Partial<CitizenProfile>) => {
    try {
      localStorage.removeItem('citizen_logged_out');
      if (profile && profile.id) {
        localStorage.setItem('citizen_profile', JSON.stringify(profile));
      }
      if (profile && profile.email) {
        await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ citizenId: profile.id, email: profile.email }),
        }).catch(() => {});
      }
    } catch (e) {}
    window.location.replace('/');
  };

  if (checkingAuth) {
    return <BrandSplashScreen />;
  }

  return (
    <AuthModal
      isOpen={true}
      isFullPageGate={true}
      onClose={() => {}}
      initialScreen={pendingPrefill ? 'signup' : 'login'}
      prefillData={pendingPrefill || undefined}
      initialNotice={initialNotice}
      onLoginSuccess={handleLoginSuccess}
      showBellLight={true}
    />
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<BrandSplashScreen />}>
      <LoginContent />
    </Suspense>
  );
}
