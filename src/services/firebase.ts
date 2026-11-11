import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyAOHH-q4-mKpTHcwUjezHrlBFDo9Xs3u44';

// Dynamic custom authDomain: seamlessly uses www.citzos.in when hosted on citzos to prevent firebaseapp.com in browser URL
export const getCustomAuthDomain = (): string => {
  if (typeof window !== 'undefined') {
    const host = window.location.host;
    if (host.includes('citzos.in')) {
      return 'www.citzos.in';
    }
    if (host.includes('vercel.app')) {
      return host;
    }
    if (host.includes('localhost') || host.includes('127.0.0.1')) {
      return host;
    }
  }
  return process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'www.citzos.in';
};

const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'lifeos-7a6f1';
const FIREBASE_STORAGE_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'lifeos-7a6f1.firebasestorage.app';
const FIREBASE_MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '316506287911';
const FIREBASE_APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:316506287911:web:cfda70c003fa4f31864302';

export const getFirebaseConfig = () => ({
  apiKey: FIREBASE_API_KEY,
  authDomain: getCustomAuthDomain(),
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
});

export const isFirebaseConfigured = (): boolean => {
  const key = FIREBASE_API_KEY;
  return Boolean(key && key !== 'YOUR_FIREBASE_API_KEY' && key.startsWith('AIzaSy'));
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export const getFirebaseApp = (): FirebaseApp | null => {
  if (typeof window === 'undefined') return null;
  if (!app && isFirebaseConfigured()) {
    try {
      app = getApps().length > 0 ? getApp() : initializeApp(getFirebaseConfig());
    } catch (error) {
      console.warn('Firebase app initialization error:', error);
    }
  }
  return app;
};

export const getFirebaseAuth = (): Auth | null => {
  if (typeof window === 'undefined') return null;
  if (!auth && isFirebaseConfigured()) {
    try {
      const firebaseApp = getFirebaseApp();
      if (firebaseApp) {
        auth = getAuth(firebaseApp);
      }
    } catch (error) {
      console.warn('Firebase auth initialization error:', error);
    }
  }
  return auth;
};

// Initial client-side attempt
if (typeof window !== 'undefined' && isFirebaseConfigured()) {
  getFirebaseAuth();
}

export { app, auth };
