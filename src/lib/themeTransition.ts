'use client';

import { flushSync } from 'react-dom';

export interface ThemeTransitionOptions {
  newTheme: 'light' | 'dark';
  event?: React.MouseEvent | MouseEvent;
  targetElement?: HTMLElement | null;
  onThemeApply: (newTheme: 'light' | 'dark') => void;
}

/**
 * Circular View Transition for Theme Switching
 * Inspired by Blinkit / Apple iOS fluid wave physics.
 * Expands a clipPath circle from the exact click coordinates across the entire viewport
 * with a luxurious 850ms duration and natural deceleration curve.
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

  // Calculate origin coordinates (x, y)
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  if (
    event &&
    typeof event.clientX === 'number' &&
    typeof event.clientY === 'number' &&
    (event.clientX > 0 || event.clientY > 0)
  ) {
    x = event.clientX;
    y = event.clientY;
  } else if (targetElement) {
    const rect = targetElement.getBoundingClientRect();
    x = rect.left + rect.width / 2;
    y = rect.top + rect.height / 2;
  }

  const right = window.innerWidth - x;
  const bottom = window.innerHeight - y;
  // Calculate maximum distance to the farthest corner with safety margin
  const maxRadius = Math.ceil(
    Math.hypot(
      Math.max(x, right),
      Math.max(y, bottom)
    )
  ) + 16;

  try {
    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        onThemeApply(newTheme);
      });
    });

    await transition.ready;

    // Blinkit-style fluid deceleration curve with calm 850ms duration
    doc.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 850,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  } catch (err) {
    // If transition fails or is aborted, fallback directly
    onThemeApply(newTheme);
  }
}
