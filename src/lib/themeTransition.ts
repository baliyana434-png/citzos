'use client';

import { flushSync } from 'react-dom';

export interface ThemeTransitionOptions {
  newTheme: 'light' | 'dark';
  event?: React.MouseEvent | MouseEvent | React.TouchEvent | TouchEvent;
  targetElement?: HTMLElement | null;
  onThemeApply: (newTheme: 'light' | 'dark') => void;
}

const DURATION = 600; // ms (0.6s)

/**
 * Circular View Transition for Theme Switching
 * Instant switch with zero delay on click, 600ms smooth animation.
 * Dual-Engine:
 * 1. Native View Transitions API with CSS @keyframes circle reveal (Chrome / Edge / Safari 18+)
 * 2. High-performance DOM circular ripple fallback for older Safari, Firefox, and in-app webviews
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

  // Clean up any in-flight ripple from a previous rapid click so instant toggling always works
  const existingRipple = document.getElementById('theme-transition-ripple');
  if (existingRipple && existingRipple.parentNode) {
    existingRipple.parentNode.removeChild(existingRipple);
  }

  // Synchronously resolve the toggle button element
  const raw = targetElement || (event?.currentTarget as HTMLElement) || (event?.target as HTMLElement);
  const button = (raw?.closest ? (raw.closest('button') as HTMLElement) || raw : raw) as HTMLElement;

  // Circle center = toggle button center
  let x = Math.round(window.innerWidth / 2);
  let y = Math.round(window.innerHeight / 2);

  if (button && typeof button.getBoundingClientRect === 'function') {
    const rect = button.getBoundingClientRect();
    if (rect.width > 0 || rect.height > 0) {
      x = Math.round(rect.left + rect.width / 2);
      y = Math.round(rect.top + rect.height / 2);
    } else {
      x = Math.round(rect.left);
      y = Math.round(rect.top);
    }
  } else if (
    event &&
    'clientX' in event &&
    typeof event.clientX === 'number' &&
    typeof event.clientY === 'number' &&
    (event.clientX > 0 || event.clientY > 0)
  ) {
    x = Math.round(event.clientX);
    y = Math.round(event.clientY);
  }

  // Radius of circle that covers the entire screen from (x, y)
  const maxRadius = Math.ceil(
    Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )
  ) + 16;

  // Set CSS variables on documentElement so CSS @keyframes has exact coordinates
  const doc = document as any;
  doc.documentElement.style.setProperty('--theme-x', `${x}px`);
  doc.documentElement.style.setProperty('--theme-y', `${y}px`);
  doc.documentElement.style.setProperty('--theme-r', `${maxRadius}px`);

  const apply = () => {
    flushSync(() => {
      onThemeApply(newTheme);
    });
  };

  // Engine 1: Native View Transitions API
  if (typeof doc.startViewTransition === 'function') {
    try {
      const transition = doc.startViewTransition(apply);

      await transition.ready;

      // Both CSS animation and JS animate run in sync for maximum browser compatibility
      try {
        doc.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: DURATION,
            easing: 'ease-out',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      } catch (_) {
        // Fallback to CSS @keyframes theme-circle-reveal
      }

      if (transition.finished) {
        await transition.finished.catch(() => {});
      } else {
        await new Promise((r) => setTimeout(r, DURATION));
      }
      return;
    } catch (_) {
      // Fall through to Engine 2 fallback
    }
  }

  // Engine 2: Universal Circular Ripple Fallback (Safari, Firefox, Mobile WebViews)
  try {
    const ripple = document.createElement('div');
    ripple.id = 'theme-transition-ripple';
    ripple.style.position = 'fixed';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '0px';
    ripple.style.height = '0px';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = newTheme === 'dark' ? '#0b0b0d' : '#ffffff';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.zIndex = '999999';
    ripple.style.pointerEvents = 'none';
    ripple.style.transition = `width ${DURATION}ms ease-out, height ${DURATION}ms ease-out`;

    document.body.appendChild(ripple);

    // Force reflow
    ripple.getBoundingClientRect();

    requestAnimationFrame(() => {
      ripple.style.width = `${maxRadius * 2}px`;
      ripple.style.height = `${maxRadius * 2}px`;
    });

    // Apply theme halfway through expansion
    setTimeout(() => {
      apply();
    }, DURATION / 2);

    // Clean up ripple after transition completes
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, DURATION + 50);
  } catch (err) {
    apply();
  }
}
