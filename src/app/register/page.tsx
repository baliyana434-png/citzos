/**
 * =======================================================================
 * FROZEN PRODUCTION ROUTE - DO NOT MODIFY OR REFACTOR
 * =======================================================================
 * Citizen Registration page route is permanently locked and verified for production.
 * =======================================================================
 */

'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthModal } from '@/components/auth/AuthModal';
import { CitizenProfile } from '@/types';
import { BrandSplashScreen } from '@/components/common/BrandSplashScreen';

function RegisterContent() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
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
          (parsed.isAadhaarVerified || parsed.isOnboarded)
        ) {
          window.location.replace('/');
          return;
        }
      }
    } catch (e) {}

    setCheckingAuth(false);
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
      initialScreen="signup"
      onLoginSuccess={handleLoginSuccess}
    />
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<BrandSplashScreen />}>
      <RegisterContent />
    </Suspense>
  );
}
