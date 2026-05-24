'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { CMS_DEFAULTS, HeroSlide } from '@/lib/cms-store';
import { useCMS } from '@/lib/useCMS';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';

const SLIDE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const FALLBACK_PHOTO = 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=80';

export function HeroSlider() {
  const cms = useCMS();
  const slides = cms.hero.slides;
  const [current, setCurrent] = useState(0);
  const [coords, setCoords] = useState<{ lat: number; lon: number; location: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    let active = true;

    async function fetchCoords() {
      let ipLat = null;
      let ipLon = null;
      let ipLoc = "";

      // 1. Try ipapi.co (primary IP lookup)
      try {
        const r = await fetch('https://ipapi.co/json/');
        const d = await r.json();
        if (active && d.latitude && d.longitude && !d.error) {
          ipLat = d.latitude;
          ipLon = d.longitude;
          ipLoc = `${d.country_name || ''}${d.region ? ' / ' + d.region : ''}`;
          setCoords({ lat: ipLat, lon: ipLon, location: ipLoc });
          setLoading(false);
        }
      } catch (e) {
        // fallback: ipinfo.io
        try {
          const r2 = await fetch('https://ipinfo.io/json');
          const d2 = await r2.json();
          if (active && d2.loc) {
            const [lat, lon] = d2.loc.split(',').map(Number);
            ipLat = lat;
            ipLon = lon;
            ipLoc = `${d2.country || ''}${d2.region ? ' / ' + d2.region : ''}`;
            setCoords({ lat, lon, location: ipLoc });
            setLoading(false);
          }
        } catch (e2) {}
      }

      // 2. Silently upgrade to precise GPS coordinates if permission is granted
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          if (!active) return;
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          let loc = ipLoc;
          try {
            const r = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            const d = await r.json();
            const country = d.address?.country || '';
            const state = d.address?.state || d.address?.region || d.address?.county || '';
            loc = `${country}${state ? ' / ' + state : ''}`;
          } catch (err) {}
          if (active) {
            setCoords({ lat, lon, location: loc });
            setLoading(false);
          }
        },
        () => {},
        { timeout: 8000 }
      );
    }

    fetchCoords();

    return () => {
      active = false;
    };
  }, []);

  const formatCoords = () => {
    if (loading || !coords) {
      return (
        <>
          <span>LOADING COORDINATES...</span>
          <br />
          <span className="text-white/20">RETRIEVING LOCATION</span>
        </>
      );
    }
    const latDir = coords.lat >= 0 ? 'N' : 'S';
    const lonDir = coords.lon >= 0 ? 'E' : 'W';
    return (
      <>
        <span>{`${Math.abs(coords.lat).toFixed(4)}° ${latDir}, ${Math.abs(coords.lon).toFixed(4)}° ${lonDir}`}</span>
        <br />
        <span className="text-white/40">{coords.location}</span>
      </>
    );
  };

  const slide = slides[current] ?? CMS_DEFAULTS.hero.slides[0];
  const photo = slide.photo || FALLBACK_PHOTO;
  const headingLines = slide.heading.split('\n');

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background images */}
      <AnimatePresence>
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 1.8, ease: SLIDE_EASE }}
        >
          <Image
            src={photo}
            alt=""
            fill
            priority={current === 0}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/30" />

      {/* HUD overlays */}
      <div className="absolute top-[6.5rem] right-6 sm:right-8 md:right-16 lg:right-24 z-20 text-right font-mono text-[0.58rem] tracking-[0.14em] uppercase text-white/45 select-none leading-relaxed">
        {formatCoords()}
      </div>

      <div className="absolute bottom-[2.5rem] left-6 sm:left-8 md:left-16 lg:left-24 z-20 hidden lg:block">
        <span className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-white/45 select-none">
          AIRFREE GEOSPATIAL PTY LTD &nbsp;|&nbsp; ABN 698 093 239 &nbsp;|&nbsp; AUSTRALIA
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-8 md:px-16 lg:px-24 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.15, ease: SLIDE_EASE }}
          >
            <SectionLabel className="text-white/70 mb-8">
              {slide.label}
            </SectionLabel>
          </motion.div>

          <motion.h1
            className="font-serif font-semibold text-white leading-[1.15] tracking-[-0.01em] mb-6"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 4.2rem)' }}
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.3, delay: 0.3, ease: SLIDE_EASE }}
          >
            {headingLines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </motion.h1>

          <motion.div
            className="h-[1px] w-[72px] mb-8"
            style={{ background: 'var(--brand-blue)' }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, delay: 0.6, ease: SLIDE_EASE }}
          />

          <motion.p
            className="text-white/55 text-sm sm:text-sm mb-8 sm:mb-12 max-w-xl leading-[1.8] tracking-[0.01em]"
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.75, ease: SLIDE_EASE }}
          >
            {slide.body}
          </motion.p>

          <motion.div
            className="flex flex-col xs:flex-row sm:flex-row gap-3"
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.85, ease: SLIDE_EASE }}
          >
            <Button
              href="/services"
              variant="primary"
              className="max-[479px]:text-[0.5rem] max-[479px]:tracking-[0.06em] max-[479px]:px-4 max-[479px]:py-2.5"
            >
              {slide.cta_primary}
            </Button>
            <Button
              href="/contact"
              variant="ghost"
              className="max-[479px]:text-[0.5rem] max-[479px]:tracking-[0.06em] max-[479px]:px-4 max-[479px]:py-2.5 group flex items-center gap-2"
            >
              <span>{slide.cta_secondary}</span>
              <svg
                width="11" height="11" viewBox="0 0 12 12" fill="none"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path d="M2 10L10 2M10 2H3.5M10 2V8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 right-10 z-10 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`block transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              i === current
                ? 'w-10 h-[2px] bg-white'
                : 'w-4 h-[1px] bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-mono text-[0.5rem] tracking-[0.28em] uppercase text-white/30">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
