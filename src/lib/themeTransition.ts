'use client';

import { flushSync } from 'react-dom';

export interface ThemeTransitionOptions {
  newTheme: 'light' | 'dark';
  event?: React.MouseEvent | MouseEvent | React.TouchEvent | TouchEvent;
  targetElement?: HTMLElement | null;
  onThemeApply: (newTheme: 'light' | 'dark') => void;
}

/**
 * Circular View Transition for Theme Switching
 * Inspired by Blinkit / Apple iOS fluid wave physics.
 * Expands a clipPath circle from the exact center of the toggle button across the entire viewport
 * with a luxurious, calm 1100ms duration and smooth natural deceleration curve.
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

  const doc = document as any;

  // Return early if View Transition API is not supported or user prefers reduced motion
  if (
    !doc.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    onThemeApply(newTheme);
    return;
  }

  // CRITICAL: Always calculate exact center of the toggle button so circle starts from the button
  const rawEl = targetElement || (event?.currentTarget as HTMLElement) || (event?.target as HTMLElement);
  const el = rawEl?.closest ? (rawEl.closest('button') as HTMLElement) || rawEl : rawEl;
  let x = Math.round(window.innerWidth / 2);
  let y = Math.round(window.innerHeight / 2);

  if (el && typeof el.getBoundingClientRect === 'function') {
    const rect = el.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      x = Math.round(rect.left + rect.width / 2);
      y = Math.round(rect.top + rect.height / 2);
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

  const right = window.innerWidth - x;
  const bottom = window.innerHeight - y;
  // Compute radius to the farthest corner with safety margin so corners never get clipped
  const maxRadius = Math.ceil(
    Math.hypot(
      Math.max(x, right),
      Math.max(y, bottom)
    )
  ) + 24;

  // Set CSS variables so the incoming pseudo-element starts at 0px at the toggle button
  doc.documentElement.style.setProperty('--theme-toggle-x', `${x}px`);
  doc.documentElement.style.setProperty('--theme-toggle-y', `${y}px`);

  try {
    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        onThemeApply(newTheme);
      });
    });

    await transition.ready;

    // Luxurious, calm 1100ms circular expansion with natural deceleration
    doc.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 1100,
        easing: 'cubic-bezier(0.25, 1, 0.35, 1)',
        pseudoElement: '::view-transition-new(root)',
        fill: 'forwards',
      }
    );

    try {
      if (transition.finished) {
        await transition.finished;
      }
    } catch (_) {
      // Ignore transition cancel / abort errors
    } finally {
      doc.documentElement.style.removeProperty('--theme-toggle-x');
      doc.documentElement.style.removeProperty('--theme-toggle-y');
    }
  } catch (err) {
    // If transition fails or is aborted, fallback directly
    onThemeApply(newTheme);
    doc.documentElement.style.removeProperty('--theme-toggle-x');
    doc.documentElement.style.removeProperty('--theme-toggle-y');
  }
}
