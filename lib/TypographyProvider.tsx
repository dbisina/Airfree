'use client';
import { useEffect } from 'react';
import { useCMS } from './useCMS';

const HEADING_FONTS: Record<string, string> = {
  playfair: 'var(--font-playfair)',
  cormorant: 'var(--font-cormorant)',
};

const BODY_FONTS: Record<string, string> = {
  inter: 'var(--font-inter)',
  jakarta: 'var(--font-jakarta)',
};

export function TypographyProvider() {
  const cms = useCMS();
  const {
    body_size,
    heading_font,
    body_font,
    nav_font_target,
    label_font_target,
    button_font_target,
  } = cms.typography;

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${body_size}px`;
    
    const serifVal = HEADING_FONTS[heading_font] ?? 'var(--font-playfair)';
    const sansVal = BODY_FONTS[body_font] ?? 'var(--font-inter)';
    const monoVal = 'var(--font-ibm-plex)';

    root.style.setProperty('--font-serif', serifVal);
    root.style.setProperty('--font-sans', sansVal);

    const getFontValue = (target: string) => {
      if (target === 'serif') return serifVal;
      if (target === 'sans') return sansVal;
      if (target === 'mono') return monoVal;
      return 'inherit';
    };

    root.style.setProperty('--font-nav-custom', getFontValue(nav_font_target));
    root.style.setProperty('--font-label-custom', getFontValue(label_font_target));
    root.style.setProperty('--font-button-custom', getFontValue(button_font_target));
  }, [
    body_size,
    heading_font,
    body_font,
    nav_font_target,
    label_font_target,
    button_font_target,
  ]);

  return null;
}
