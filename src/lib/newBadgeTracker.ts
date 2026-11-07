'use client';

const STORAGE_KEY = 'citizen_new_badges_seen';
const SEVENTY_TWO_HOURS_MS = 72 * 60 * 60 * 1000; // 72 Hours in Milliseconds

interface BadgeSeenStore {
  [opportunityId: string]: number; // first seen timestamp in ms
}

let memorySeenStore: BadgeSeenStore = {};
let isStoreLoaded = false;

function getSeenStore(): BadgeSeenStore {
  if (isStoreLoaded) return memorySeenStore;
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    memorySeenStore = raw ? JSON.parse(raw) || {} : {};
    isStoreLoaded = true;
    return memorySeenStore;
  } catch (e) {
    return {};
  }
}

function saveSeenStore(store: BadgeSeenStore): void {
  memorySeenStore = store;
  isStoreLoaded = true;
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {}
}

/**
 * Stamps first-seen timestamp for opportunities as soon as they appear on screen.
 * Once stamped, the 72-hour countdown begins regardless of clicks.
 */
export function recordOpportunitiesSeen(oppIds: string[]): void {
  if (typeof window === 'undefined' || !oppIds || oppIds.length === 0) return;
  try {
    const store = getSeenStore();
    const now = Date.now();
    let hasChanges = false;

    oppIds.forEach((id) => {
      if (id && !store[id]) {
        store[id] = now;
        hasChanges = true;
      }
    });

    if (hasChanges) {
      saveSeenStore(store);
      window.dispatchEvent(new CustomEvent('new_badges_updated'));
    }
  } catch (e) {}
}

/**
 * Checks whether an opportunity's "New" badge is still active within its 72-hour window.
 * Returns false if:
 * 1. The opportunity is not flagged as isNew.
 * 2. 72 hours have elapsed since the user first saw this opportunity.
 */
export function isOpportunityNewActive(oppId: string, isFlaggedNew?: boolean): boolean {
  if (!isFlaggedNew) return false;
  if (typeof window === 'undefined') return true;

  try {
    const store = getSeenStore();
    const firstSeen = store[oppId];

    if (!firstSeen) {
      // First time user encounters this opportunity: stamp now and show badge
      store[oppId] = Date.now();
      saveSeenStore(store);
      return true;
    }

    const elapsed = Date.now() - firstSeen;
    return elapsed < SEVENTY_TWO_HOURS_MS;
  } catch (e) {
    return Boolean(isFlaggedNew);
  }
}
