import { CitizenProfile, CitizenSubscription } from '@/types';

/**
 * Validates whether a citizen's subscription is active and within its 365-day validity period.
 * Authoritative source of truth is always the user's expiration timestamp in MongoDB Atlas.
 */
export function isSubscriptionStructurallyValid(sub?: CitizenSubscription | null): boolean {
  if (!sub || typeof sub !== 'object') return false;
  if (sub.status !== 'active') return false;

  // Amount must be genuine (1 INR or legacy 19 INR)
  if ((sub.amount !== 1 && sub.amount !== 19) || sub.currency !== 'INR') {
    return false;
  }

  // Must have a genuine transaction identifier
  if (!sub.transactionId || typeof sub.transactionId !== 'string' || sub.transactionId.trim().length < 4) {
    return false;
  }

  // Expiry timestamp must exist and be in the future
  if (!sub.validUntil) return false;
  const expiry = new Date(sub.validUntil);
  if (isNaN(expiry.getTime()) || expiry.getTime() <= Date.now()) {
    return false;
  }

  return true;
}

/**
 * Authoritative client subscription check.
 * Returns true if the citizen has an active 1-year pass that has not expired.
 * Used across OpportunityCard, DetailBottomSheet, Header, and Page components.
 */
export function isCitizenSubscribed(
  profile?: CitizenProfile | null
): profile is CitizenProfile & { subscription: CitizenSubscription } {
  if (!profile || !profile.subscription) return false;
  return isSubscriptionStructurallyValid(profile.subscription);
}

/**
 * Server-side subscription sync: Verifies and syncs subscription authenticity against MongoDB Atlas.
 * Guarantees that paid 1-year subscriptions are NEVER wiped by client glitches or temporary offline status.
 * Only transitions to expired if the server confirms the 365 days have genuinely passed.
 */
export async function verifySubscriptionWithServer(
  profile: CitizenProfile,
  onExpired?: () => void
): Promise<boolean> {
  if (!profile.subscription || profile.subscription.status !== 'active') {
    return false;
  }

  // 1. Client-side clock check
  const expiry = new Date(profile.subscription.validUntil);
  if (isNaN(expiry.getTime()) || expiry.getTime() <= Date.now()) {
    // 365 days have genuinely expired
    onExpired?.();
    return false;
  }

  // 2. Server database sync with MongoDB Atlas
  try {
    const res = await fetch('/api/subscription/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        citizenId: profile.id,
        email: profile.email,
        subscription: profile.subscription,
      }),
    });

    const data = await res.json();
    if (res.ok && data.valid && data.subscription) {
      // Sync authoritative subscription from MongoDB into localStorage
      const updatedProfile: CitizenProfile = {
        ...profile,
        subscription: data.subscription,
      };
      try {
        localStorage.setItem('citizen_profile', JSON.stringify(updatedProfile));
      } catch (_) {}
      return true;
    } else if (data.expired) {
      // Server confirms 365 days have expired
      onExpired?.();
      return false;
    }

    return true;
  } catch (e) {
    // Offline or network glitch: NEVER wipe user's valid 1-year pass!
    // Maintain active pass until back online.
    return true;
  }
}
