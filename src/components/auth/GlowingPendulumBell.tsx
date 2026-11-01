'use client';

import React from 'react';
import styles from './GlowingPendulumBell.module.css';

export interface GlowingPendulumBellProps {
  className?: string;
  isMobileCompact?: boolean;
}

export const GlowingPendulumBell: React.FC<GlowingPendulumBellProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`${styles['bell-stage-wrapper']} ${className}`}
      aria-hidden="true"
    >
      <div className={styles['bell-container']}>
        <div className={styles['rope']} />
        <div className={styles['bell-top']} />

        <div className={styles['bell-base']} />
        <div className={`${styles['bell-base']} ${styles['bell-base-2']}`} />
        <div className={styles['shadow-l1']} />
        <div className={styles['shadow-l2']} />
        <div className={styles['left-glow']} />
        <div className={styles['left-glow2']} />
        <div className={styles['r-glow']} />
        <div className={styles['r-glow2']} />
        <div className={styles['mid-ring']} />
        <div className={`${styles['mid-ring']} ${styles['mid-ring-small']}`} />

        <div className={styles['glow']} />
        <div className={styles['glow2']} />

        <div className={styles['bell-buff-t']} />
        <div className={styles['bell-buff']} />

        <div className={styles['bell-btm']} />
        <div className={styles['bell-btm2']} />

        <div className={styles['bell-ring-container']}>
          <div className={styles['bell-ring']} />
          <div className={styles['bell-rays']} />
        </div>

        <div className={styles['volumetric']}>
          <div className={styles['vl']} />
          <div className={styles['vr']} />
        </div>
      </div>

      <div className={styles['grain']} />
    </div>
  );
};
