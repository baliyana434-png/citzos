'use client';

import React from 'react';
import styles from './GlowingPendulumBell.module.css';

export interface GlowingPendulumBellProps {
  className?: string;
  isMobileCompact?: boolean;
}

export const GlowingPendulumBell: React.FC<GlowingPendulumBellProps> = ({
  className = '',
  isMobileCompact = false,
}) => {
  return (
    <div
      className={`${styles.bellStageWrapper} ${isMobileCompact ? styles.mobileCompact : ''} ${className}`}
      aria-hidden="true"
    >
      {/* Ambient Radial Glow Pool that casts warm illumination onto surrounding content */}
      <div className={styles.ambientGlowPool} />

      {/* Continuous Pendulum Bell Lantern */}
      <div className={styles.bellContainer}>
        <div className={styles.rope} />
        <div className={styles.bellTop} />

        <div className={styles.bellBase} />
        <div className={`${styles.bellBase} ${styles.bellBaseSecondary}`} />
        <div className={styles.shadowL1} />
        <div className={styles.shadowL2} />
        <div className={styles.leftGlow} />
        <div className={styles.leftGlow2} />
        <div className={styles.rightGlow} />
        <div className={styles.rightGlow2} />
        <div className={styles.midRing} />
        <div className={`${styles.midRing} ${styles.midRingSmall}`} />

        <div className={styles.glow} />
        <div className={styles.glow2} />

        <div className={styles.bellBuffTop} />
        <div className={styles.bellBuff} />

        <div className={styles.bellBottom} />
        <div className={styles.bellBottomRimGlow} />

        <div className={styles.bellRingContainer}>
          <div className={styles.bellRingClapper} />
          <div className={styles.bellRays} />
        </div>

        <div className={styles.volumetricBeam}>
          <div className={styles.vl} />
          <div className={styles.vr} />
        </div>
      </div>
    </div>
  );
};
