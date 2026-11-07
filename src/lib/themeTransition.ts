'use client';

import { flushSync } from 'react-dom';

export interface ThemeTransitionOptions {
  newTheme: 'light' | 'dark';
  event?: React.MouseEvent | MouseEvent | React.TouchEvent | TouchEvent;
  targetElement?: HTMLElement | null;
  onThemeApply: (newTheme: 'light' | 'dark') => void;
}

// 0.2s duration with ease-out
const DURATION = 200;
const EASING = 'ease-out';

let isThemeTransitioning = false;

/**
 * Circular View Transition for Theme Switching
 * Frame-by-frame measured:
 * Toggle ke center se circle nikalta hai aur poore page ko naye theme se cover kar deta hai.
 * Speed: 350ms, Easing: ease-out.
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

  // Fallback if View Transition API is not supported or user prefers reduced motion
  if (
    !doc.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    onThemeApply(newTheme);
    return;
  }

  // Prevent duplicate concurrent rapid-fire collisions
  if (isThemeTransitioning) {
    onThemeApply(newTheme);
    return;
  }
  isThemeTransitioning = true;

  // Synchronously resolve the toggle button element
  const raw = targetElement || (event?.currentTarget as HTMLElement) || (event?.target as HTMLElement);
  const button = (raw?.closest ? (raw.closest('button') as HTMLElement) || raw : raw) as HTMLElement;

  // Circle center = toggle button center
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  if (button && typeof button.getBoundingClientRect === 'function') {
    const rect = button.getBoundingClientRect();
    x = Math.round(rect.left + rect.width / 2);
    y = Math.round(rect.top + rect.height / 2);
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
  );

  const apply = () => {
    flushSync(() => {
      onThemeApply(newTheme);
    });
  };

  try {
    const transition = doc.startViewTransition(apply);

    await transition.ready;

    const anim = doc.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: DURATION,
        easing: EASING,
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
