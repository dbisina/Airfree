'use client';
import { useState, useEffect } from 'react';
import { CMSContent, CMS_DEFAULTS, readCMS, mergeWithDefaults } from './cms-store';

/**
 * Fetches live CMS content from Redis via /api/cms (cross-device source of truth).
 * Falls back to localStorage → CMS_DEFAULTS if Redis is unavailable.
 * Also listens to storage events so admin preview updates instantly in the same browser.
 */
export function useCMS(): CMSContent {
  const [data, setData] = useState<CMSContent>(CMS_DEFAULTS);

  useEffect(() => {
    async function loadRemote() {
      try {
        const res = await fetch('/api/cms', { cache: 'no-store' });
        if (res.ok) {
          const raw = await res.json();
          setData(mergeWithDefaults(raw));
          return;
        }
      } catch {
        // Redis not configured or network error — fall through
      }
      // Fallback: localStorage / defaults (works for local admin preview)
      setData(readCMS());
    }

    loadRemote();

    // Keep in sync with admin panel edits (same-browser preview)
    const handler = () => setData(readCMS());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return data;
}
