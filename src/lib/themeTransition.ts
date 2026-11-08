'use client';

import { flushSync } from 'react-dom';

export interface ThemeTransitionOptions {
  newTheme: 'light' | 'dark';
  event?: React.MouseEvent | MouseEvent | React.TouchEvent | TouchEvent;
  targetElement?: HTMLElement | null;
  onThemeApply: (newTheme: 'light' | 'dark') => void;
}

/**
 * Universal Circular Theme Transition
 * - 100% Mobile (iPhone iOS WebKit & Android Chrome) + Desktop support
 * - Instant UI reaction: 0ms click delay
 * - Exact Blinkit timing: 380ms with snappy cubic-bezier(0.2, 0, 0, 1) curve
 * - Origin: Exact touch/click coordinate or radio button center
 */
export async function executeThemeTransition({
  newTheme,
  event,
  targetElement,
  onThemeApply,
}: ThemeTransitionOptions): Promise<void> {
  if (typeof window === 'undefined') {
    onThemeApply(newTheme);
    return;
  }

  // Clean up any existing ripple from rapid clicks
  const existingRipple = document.getElementById('theme-circle-wave');
  if (existingRipple && existingRipple.parentNode) {
    existingRipple.parentNode.removeChild(existingRipple);
  }

  // 1. Resolve exact coordinates: Priority 1 = User's touch/click coordinates; Priority 2 = targetElement center
  let x = Math.round(window.innerWidth / 2);
  let y = Math.round(window.innerHeight / 2);
  let hasCoords = false;

  // Extract from Touch or Mouse event
  if (event) {
    const touchEv = event as unknown as TouchEvent;
    if (touchEv.touches && touchEv.touches.length > 0) {
      x = Math.round(touchEv.touches[0].clientX);
      y = Math.round(touchEv.touches[0].clientY);
      hasCoords = true;
    } else if (touchEv.changedTouches && touchEv.changedTouches.length > 0) {
      x = Math.round(touchEv.changedTouches[0].clientX);
      y = Math.round(touchEv.changedTouches[0].clientY);
      hasCoords = true;
    } else {
      const mouseEv = event as unknown as MouseEvent;
      if (typeof mouseEv.clientX === 'number' && (mouseEv.clientX > 0 || mouseEv.clientY > 0)) {
        x = Math.round(mouseEv.clientX);
        y = Math.round(mouseEv.clientY);
        hasCoords = true;
      }
    }
  }

  // If no direct pointer coordinates, calculate center of targetElement
  if (!hasCoords && targetElement && typeof targetElement.getBoundingClientRect === 'function') {
    const rect = targetElement.getBoundingClientRect();
    if (rect.width > 0 || rect.height > 0) {
      x = Math.round(rect.left + rect.width / 2);
      y = Math.round(rect.top + rect.height / 2);
    }
  }

  // Calculate radius to the furthest corner of viewport
  const maxRadius = Math.ceil(
    Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )
  ) + 16;

  const doc = document as any;

  // Set CSS custom properties on documentElement for GPU keyframes
  doc.documentElement.style.setProperty('--theme-x', `${x}px`);
  doc.documentElement.style.setProperty('--theme-y', `${y}px`);
  doc.documentElement.style.setProperty('--theme-r', `${maxRadius}px`);

  const DURATION = 380; // ms (0.38s matching reference video)

  const apply = () => {
    flushSync(() => {
      onThemeApply(newTheme);
    });
  };

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Engine 1: Native View Transitions API (Android Chrome, Desktop Chrome/Edge, Safari 18+)
  if (!prefersReducedMotion && typeof doc.startViewTransition === 'function') {
    try {
      const transition = doc.startViewTransition(apply);

      // Catch any rapid click aborts so no error is logged
      if (transition.finished) {
        transition.finished.catch(() => {});
      }

      await transition.ready;
      return;
    } catch (_) {
      // If View Transitions fails or is aborted, fall through to universal fallback
    }
  }

  // Engine 2: Universal Circular Wave Fallback for iPhone (iOS Safari < 18, WebViews, Firefox)
  try {
    const ripple = document.createElement('div');
    ripple.id = 'theme-circle-wave';
    ripple.style.position = 'fixed';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '0px';
    ripple.style.height = '0px';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = newTheme === 'dark' ? '#0b0b0e' : '#f8fafc';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.zIndex = '99999999';
    ripple.style.pointerEvents = 'none';
    ripple.style.willChange = 'width, height';
    ripple.style.transition = `width ${DURATION}ms cubic-bezier(0.2, 0, 0, 1), height ${DURATION}ms cubic-bezier(0.2, 0, 0, 1)`;

    document.body.appendChild(ripple);

    // Force layout
    ripple.getBoundingClientRect();

    requestAnimationFrame(() => {
      ripple.style.width = `${maxRadius * 2}px`;
      ripple.style.height = `${maxRadius * 2}px`;
    });

    // Apply theme changes halfway through expansion
    setTimeout(() => {
      apply();
    }, Math.round(DURATION * 0.45));

    // Remove ripple once complete
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, DURATION + 40);
  } catch (err) {
    apply();
  }
}
