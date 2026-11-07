'use client';

import { flushSync } from 'react-dom';

export interface ThemeTransitionOptions {
  newTheme: 'light' | 'dark';
  event?: React.MouseEvent | MouseEvent | React.TouchEvent | TouchEvent;
  targetElement?: HTMLElement | null;
  onThemeApply: (newTheme: 'light' | 'dark') => void;
}

let isThemeTransitioning = false;

/**
 * Circular View Transition for Theme Switching
 * Begins expanding from the exact coordinates of the toggle button across the entire viewport.
 * Provides instant click response with zero delay and smooth 500ms ease-in-out expansion.
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

  // Fallback early if View Transition API is not supported or user prefers reduced motion
  if (
    !doc.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    onThemeApply(newTheme);
    return;
  }

  // Prevent concurrent rapid-fire collisions
  if (isThemeTransitioning) {
    onThemeApply(newTheme);
    return;
  }
  isThemeTransitioning = true;

  // 1. Calculate origin coordinates (x, y) immediately from the target button
  const rawEl = targetElement || (event?.currentTarget as HTMLElement) || (event?.target as HTMLElement);
  const el = rawEl?.closest ? (rawEl.closest('button') as HTMLElement) || rawEl : rawEl;

  let x = Math.round(window.innerWidth / 2);
  let y = Math.round(window.innerHeight / 2);

  if (el && typeof el.getBoundingClientRect === 'function') {
    const rect = el.getBoundingClientRect();
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

  // Calculates the radius of circle that can cover the screen
  const right = window.innerWidth - x;
  const bottom = window.innerHeight - y;
  const maxRadius = Math.ceil(
    Math.hypot(
      Math.max(x, right),
      Math.max(y, bottom),
    )
  );

  try {
    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        onThemeApply(newTheme);
      });
    });

    await transition.ready;

    const anim = doc.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );

    if (anim && anim.finished) {
      await anim.finished.catch(() => {});
    }
  } catch (err) {
    onThemeApply(newTheme);
  } finally {
    isThemeTransitioning = false;
  }
}
