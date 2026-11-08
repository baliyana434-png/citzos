'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

interface VoiceReaderProps {
  textToSpeak: string;
  lang?: string;
}

export const VoiceReader: React.FC<VoiceReaderProps> = ({ textToSpeak, lang = 'hi-IN' }) => {
  const { t, language } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);
    }
  }, []);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!supported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel(); // clear previous
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.95; // Clear and understandable speed

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={handleTogglePlay}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
        isPlaying
          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs border border-emerald-500'
          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300/80 dark:bg-emerald-950/70 dark:hover:bg-emerald-900/80 dark:border-emerald-500/40 dark:!text-emerald-200 shadow-2xs'
      }`}
      title={isPlaying ? t('voice_stop') : t('voice_listen')}
      aria-label={t('voice_listen')}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-white shrink-0" />
          <span className="font-bold text-white">{t('voice_stop')}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300 shrink-0" />
          <span className="font-bold">{t('voice_listen')}</span>
        </>
      )}
    </button>
  );
};
