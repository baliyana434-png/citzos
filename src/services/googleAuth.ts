/**
 * =======================================================================
 * FROZEN PRODUCTION MODULE - DO NOT MODIFY, SANITIZE, OR REMOVE KEYS
 * =======================================================================
 * Google OAuth Authentication engine and error handlers are permanently
 * locked and verified for production at citzos.in.
 * DO NOT modify or alter authentication flow, popup/redirect handling, or fallbacks.
 * =======================================================================
 */

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  User,
} from 'firebase/auth';
import { getFirebaseAuth, isFirebaseConfigured } from './firebase';
import { SupportedLanguage } from '@/types';

// Detect mobile/tablet browsers that block popups
function isMobileBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
    navigator.userAgent
  );
}

// Key used to signal a redirect-based Google sign-in is in progress
const GOOGLE_REDIRECT_PENDING_KEY = 'citzos_google_redirect_pending';

export function markGoogleRedirectPending(): void {
  try {
    sessionStorage.setItem(GOOGLE_REDIRECT_PENDING_KEY, '1');
    localStorage.setItem(GOOGLE_REDIRECT_PENDING_KEY, '1');
  } catch (_) {}
}

export function clearGoogleRedirectPending(): void {
  try {
    sessionStorage.removeItem(GOOGLE_REDIRECT_PENDING_KEY);
    localStorage.removeItem(GOOGLE_REDIRECT_PENDING_KEY);
  } catch (_) {}
}

export function isGoogleRedirectPending(): boolean {
  try {
    return (
      sessionStorage.getItem(GOOGLE_REDIRECT_PENDING_KEY) === '1' ||
      localStorage.getItem(GOOGLE_REDIRECT_PENDING_KEY) === '1'
    );
  } catch (_) {
    return false;
  }
}

// Cached singleton promise: prevents multiple mounts from competing for the single redirect result
let redirectResultPromise: Promise<GoogleAuthResult | null> | null = null;

/**
 * After a redirect-based sign-in the page reloads.
 * Call this safely on mount to pick up the redirect result.
 */
export function getGoogleRedirectResultSafe(): Promise<GoogleAuthResult | null> {
  if (typeof window === 'undefined') return Promise.resolve(null);

  // Ultra-fast guard: if no redirect is pending, resolve immediately without network delay
  if (!isGoogleRedirectPending()) {
    return Promise.resolve(null);
  }

  if (!redirectResultPromise) {
    const auth = getFirebaseAuth();
    if (!auth || !isFirebaseConfigured()) {
      clearGoogleRedirectPending();
      return Promise.resolve(null);
    }

    redirectResultPromise = getRedirectResult(auth)
      .then((result) => {
        clearGoogleRedirectPending();
        if (!result || !result.user || !result.user.email) return null;
        const user: User = result.user;
        return {
          success: true,
          name: user.displayName || (user.email ?? '').split('@')[0],
          email: (user.email ?? '').toLowerCase().trim(),
          photoURL: user.photoURL || undefined,
          uid: user.uid,
        };
      })
      .catch((err: any) => {
        clearGoogleRedirectPending();
        console.warn('getRedirectResult notice:', err?.code || err?.message);
        return null;
      });
  }

  return redirectResultPromise;
}

export interface GoogleAuthResult {
  success: boolean;
  name: string;
  email: string;
  photoURL?: string;
  uid: string;
}

/**
 * Returns fully localized Google Authentication error messages.
 * Prevents language leakage across English, Hindi, and international languages.
 * Strictly NO emojis.
 */
export function getGoogleAuthErrorMessage(
  errorCodeOrMessage: string | undefined,
  language: SupportedLanguage = 'en'
): string {
  const code = (errorCodeOrMessage || '').toLowerCase();

  if (
    code.includes('popup-closed') ||
    code.includes('closed-by-user') ||
    code.includes('window was closed') ||
    code.includes('cancelled')
  ) {
    return '';
  }

  if (code.includes('timeout')) {
    const messages: Record<SupportedLanguage, string> = {
      en: 'Google sign-in timed out. Please try again.',
      hi: 'Google साइन-इन का समय समाप्त हो गया। कृपया पुनः प्रयास करें।',
      es: 'Se agoto el tiempo de espera de Google. Intentelo de nuevo.',
      fr: 'Le delai de connexion Google a expire.',
      de: 'Zeituberschreitung bei der Google-Anmeldung.',
      ar: 'انتهت مهلة تسجيل الدخول الى Google.',
    };
    return messages[language] || messages.en;
  }

  if (code.includes('popup-blocked')) {
    const messages: Record<SupportedLanguage, string> = {
      en: 'Browser blocked the Google popup. Please allow popups in your browser address bar.',
      hi: 'ब्राउज़र ने Google पॉप-अप ब्लॉक कर दिया है। कृपया एड्रेस बार में पॉप-अप की अनुमति दें।',
      es: 'El navegador bloqueo la ventana emergente de Google. Habilite las ventanas emergentes.',
      fr: 'Le navigateur a bloque la fenetre pop-up Google. Veuillez autoriser les fenetres pop-up.',
      de: 'Der Browser hat das Google-Popup blockiert. Bitte Popups in der Adressleiste erlauben.',
      ar: 'حظر المتصفح النافذة المنبثقة لـ Google. يرجى السماح بالنوافذ المنبثقة.',
    };
    return messages[language] || messages.en;
  }

  if (code.includes('origin_mismatch') || code.includes('redirect_uri_mismatch')) {
    const messages: Record<SupportedLanguage, string> = {
      en: 'Google OAuth origin mismatch on local IP. Please test on http://localhost:3000 or enter your Google email below.',
      hi: 'लोकल नेटवर्क IP पर Google OAuth अनुमति नहीं देता। कृपया PC पर http://localhost:3000 पर खोलें या नीचे अपना Google ईमेल दर्ज करें।',
      es: 'Google OAuth no admite IP local. Pruebe en http://localhost:3000.',
      fr: 'Google OAuth ne prend pas en charge les IP locales. Testez sur http://localhost:3000.',
      de: 'Google OAuth unterstutzt keine lokalen IPs. Bitte auf http://localhost:3000 testen.',
      ar: 'لا يدعم Google OAuth عناوين IP المحلية.',
    };
    return messages[language] || messages.en;
  }

  if (code.includes('unauthorized-domain')) {
    const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'citzos.in';
    const messages: Record<SupportedLanguage, string> = {
      en: `Domain (${currentHost}) is not in Firebase authorized domains. Please add ${currentHost} in Firebase Console > Authentication > Settings > Authorized domains.`,
      hi: `यह डोमेन (${currentHost}) Firebase में अधिकृत नहीं है। कृपया Firebase Console में Authentication > Settings > Authorized domains में ${currentHost} जोड़ें।`,
      es: `El dominio ${currentHost} no esta autorizado en Firebase Console.`,
      fr: `Le domaine ${currentHost} n'est pas autorise dans Firebase Console.`,
      de: `Domain ${currentHost} ist in Firebase Console nicht autorisiert.`,
      ar: `هذا النطاق ${currentHost} غير مصرح به في Firebase Console.`,
    };
    return messages[language] || messages.en;
  }

  if (code.includes('not configured') || code.includes('not-configured')) {
    const messages: Record<SupportedLanguage, string> = {
      en: 'Authentication service temporarily busy. Please try signing in with email or click again.',
      hi: 'प्रमाणीकरण सेवा अस्थायी रूप से व्यस्त है। कृपया ईमेल से लॉगिन करें या पुनः प्रयास करें।',
      es: 'Servicio de autenticacion temporalmente ocupado. Por favor use el correo electronico.',
      fr: 'Service d\'authentification temporairement indisponible. Veuillez vous connecter avec votre adresse e-mail.',
      de: 'Authentifizierungsdienst vorubergehend beschaftigt. Bitte mit E-Mail anmelden.',
      ar: 'خدمة المصادقة مشغولة مؤقتا. يرجى تسجيل الدخول باستخدام البريد الإلكتروني.',
    };
    return messages[language] || messages.en;
  }

  const fallbacks: Record<SupportedLanguage, string> = {
    en: 'Google sign-in could not be completed. Please try again or use email login.',
    hi: 'Google साइन-इन पूर्ण नहीं हो सका। कृपया पुनः प्रयास करें या ईमेल पासवर्ड का उपयोग करें।',
    es: 'Error al iniciar sesion con Google. Intentelo de nuevo.',
    fr: 'Echec de la connexion avec Google. Veuillez reessayer.',
    de: 'Google-Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.',
    ar: 'فشل تسجيل الدخول باستخدام Google. يرجى المحاولة مرة اخرى.',
  };
  return fallbacks[language] || fallbacks.en;
}

export class GoogleAuthService {
  /**
   * Official Google OAuth Sign-In via Firebase Auth.
   * On mobile devices (iOS Safari, Android Chrome), popups fail due to WebKit Intelligent
   * Tracking Prevention (ITP) blocking third-party storage, leading to a blank screen on firebaseapp.com.
   * Therefore, mobile browsers use signInWithRedirect natively.
   * Desktop browsers use signInWithPopup to preserve active page state.
   */
  static async signInWithGoogle(): Promise<GoogleAuthResult> {
    if (typeof window === 'undefined') {
      throw new Error('Google sign-in is only available in browser.');
    }

    const auth = getFirebaseAuth();
    if (!auth || !isFirebaseConfigured()) {
      const err: any = new Error('Firebase Auth is not configured.');
      err.code = 'auth/not-configured';
      throw err;
    }

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    provider.addScope('email');
    provider.addScope('profile');

    // On mobile devices, always use signInWithRedirect to prevent popup blank-screen hangs
    if (isMobileBrowser()) {
      try {
        markGoogleRedirectPending();
        await signInWithRedirect(auth, provider);
        return {
          success: false,
          name: '',
          email: '',
          uid: '',
        };
      } catch (redirErr: any) {
        clearGoogleRedirectPending();
        const err: any = new Error(redirErr?.message || 'Google sign-in redirect failed');
        err.code = redirErr?.code || 'auth/failed';
        throw err;
      }
    }

    // On desktop browsers, use popup flow
    return new Promise<GoogleAuthResult>((resolve, reject) => {
      let isSettled = false;

      const finishResolve = (res: GoogleAuthResult) => {
        if (!isSettled) {
          isSettled = true;
          cleanup();
          resolve(res);
        }
      };

      const finishReject = (err: any) => {
        if (!isSettled) {
          isSettled = true;
          cleanup();
          reject(err);
        }
      };

      // Safety Timeout: auto-cancel after 90 seconds so UI never hangs indefinitely
      const timeoutId = setTimeout(() => {
        const err: any = new Error('Google sign-in timed out. Please try again.');
        err.code = 'auth/timeout';
        finishReject(err);
      }, 90000);

      const cleanup = () => {
        clearTimeout(timeoutId);
      };

      signInWithPopup(auth, provider)
        .then((result) => {
          const user: User = result.user;
          if (!user || !user.email) {
            const err: any = new Error('Verified email not returned by Google.');
            err.code = 'auth/no-email';
            return finishReject(err);
          }
          finishResolve({
            success: true,
            name: user.displayName || user.email.split('@')[0],
            email: user.email.toLowerCase().trim(),
            photoURL: user.photoURL || undefined,
            uid: user.uid,
          });
        })
        .catch(async (fbErr: any) => {
          const code = (fbErr?.code || '').toLowerCase();
          console.warn('Firebase signInWithPopup error code:', code || fbErr?.message);

          // If popup is explicitly blocked or restricted by browser, fall back to redirect
          if (code === 'auth/popup-blocked' || code.includes('blocked')) {
            try {
              markGoogleRedirectPending();
              await signInWithRedirect(auth, provider);
              return finishResolve({
                success: false,
                name: '',
                email: '',
                uid: '',
              });
            } catch (redirErr: any) {
              clearGoogleRedirectPending();
              const err: any = new Error(redirErr?.message || 'Google sign-in redirect failed');
              err.code = redirErr?.code || 'auth/failed';
              return finishReject(err);
            }
          }

          const err: any = new Error(fbErr?.message || fbErr?.code || 'Google sign-in failed');
          err.code = fbErr?.code || 'auth/failed';
          finishReject(err);
        });
    });
  }

  /**
   * Signs out the current user session from Firebase Auth
   */
  static async signOut(): Promise<void> {
    try {
      const auth = getFirebaseAuth();
      if (auth && isFirebaseConfigured()) {
        await signOut(auth);
      }
    } catch (error) {
      console.warn('Firebase signOut error:', error);
    }
  }
}
