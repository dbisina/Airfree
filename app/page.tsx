'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroSlider } from '@/components/sections/HeroSlider';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { useCMS } from '@/lib/useCMS';
import { CMS_DEFAULTS } from '@/lib/cms-store';

const PHOTO_PANELS = [
  { src: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&q=80', label: 'Drone & Photogrammetry' },
  { src: 'https://images.unsplash.com/photo-1569396116180-210c182bedb8?w=800&q=80', label: 'Remote Sensing & AI' },
  { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', label: 'Spatial Infrastructure' },
  { src: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&q=80', label: 'Earth Observation' },
];

const CAPS = [
  { abbr: 'GIS', label: 'Spatial Infrastructure' },
  { abbr: 'UAV', label: 'Photogrammetry & 3D' },
  { abbr: 'SAT', label: 'Remote Sensing & AI' },
  { abbr: 'ENV', label: 'Environmental Analytics' },
];

const STATS = [
  { val: '7', lbl: 'Service Domains' },
  { val: '3', lbl: 'National Offices' },
  { val: 'AU', lbl: 'Jurisdiction' },
  { val: 'ENT', lbl: 'Enterprise Grade' },
];

// ── Section components ────────────────────────────────────────────────────────

function CapabilityStrip() {
  return (
    <section className="bg-navy border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.08]">
          {CAPS.map((cap, i) => (
            <RevealOnScroll key={cap.abbr} delay={i * 0.08}>
              <div className="px-4 md:px-8 py-5 md:py-8">
                <div className="font-mono text-2xl md:text-3xl font-light text-white mb-2 tracking-tight">{cap.abbr}</div>
                <div className="text-xs text-white/35 tracking-widest uppercase font-mono">{cap.label}</div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhotoStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 h-44 sm:h-64 md:h-[420px]">
      {PHOTO_PANELS.map((panel, i) => (
        <div key={panel.label} className="relative overflow-hidden group">
          <Image
            src={panel.src}
            alt={panel.label}
            fill
            priority={i === 0}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.85)] via-[rgba(10,22,40,0.15)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <div className="font-mono text-[0.48rem] tracking-[0.2em] uppercase text-white/40 mb-1.5">0{i + 1}</div>
            <div className="font-serif text-white text-xs sm:text-sm md:text-base leading-tight">{panel.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ServicePillars() {
  const cms = useCMS();
  // CMS services — fall back to defaults only when none configured
  const services = Array.isArray(cms.services) && cms.services.length > 0
    ? cms.services
    : CMS_DEFAULTS.services;
  const preview = services.slice(0, 4);

  return (
    <section className="py-20 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-16 md:mb-20">
          <div className="flex-1">
            <RevealOnScroll>
              <SectionLabel className="mb-5">Core Service Pillars</SectionLabel>
            </RevealOnScroll>
            <RevealOnScroll delay={0.06}>
              <h2 className="font-serif text-ink leading-[1.08]" style={{ fontSize: 'clamp(1.6rem, 5vw, 4.2rem)' }}>
                {services.length} Enterprise<br />Geospatial {services.length === 1 ? 'Capability' : 'Capabilities'}
              </h2>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.12} className="md:max-w-sm md:pb-2">
            <p className="text-base text-ink-2 leading-relaxed">
              Specialised service domains covering the full spectrum of spatial intelligence — from enterprise infrastructure design to environmental carbon analytics.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24">
        <RevealOnScroll delay={0.08}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {preview.map((service) => {
              // Tags: CMS = comma-separated string, constants = string[]
              const tags: string[] = typeof service.tags === 'string'
                ? (service.tags as string).split(',').map((t: string) => t.trim()).filter(Boolean)
                : (service.tags as unknown as string[]);
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative h-60 sm:h-64 md:h-80 overflow-hidden bg-navy block"
                >
                  <Image
                    src={service.image || '/images/gisinfra.jpg'}
                    alt={service.shortTitle}
                    fill
                    className="object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 640px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/55 to-navy/15" />
                  <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7 md:p-8">
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[0.5rem] tracking-[0.22em] text-white/30 uppercase">
                        {service.number}
                      </span>
                      <div className="w-7 h-7 rounded-full border border-white/15 group-hover:border-brand-blue group-hover:bg-brand-blue flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path d="M2 7L7 2M7 2H3M7 2V6" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {tags.slice(0, 2).map(tag => (
                          <span key={tag} className="font-mono text-[0.45rem] uppercase tracking-widest px-2 py-0.5 border border-white/15 text-white/40">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3
                        className="font-serif text-white leading-snug group-hover:text-blue-100 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                        style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}
                      >
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15} className="mt-10 flex items-center gap-6">
          <Button href="/services" variant="outline">View All Services</Button>
          {services.length > 4 && (
            <span className="font-mono text-[0.58rem] tracking-widest uppercase text-ink-3">
              +{services.length - 4} more capabilities
            </span>
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}

function AboutSection() {
  const cms = useCMS();
  const ai = cms.about_intro;
  const photo = ai.photo || 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80';

  return (
    <section className="py-20 md:py-36 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-24 items-center">
          <div>
            <RevealOnScroll><SectionLabel className="mb-5">{ai.tagline || 'About the Practice'}</SectionLabel></RevealOnScroll>
            <RevealOnScroll delay={0.06}>
              <h2 className="font-serif text-ink leading-[1.08] mb-7" style={{ fontSize: 'clamp(1.5rem, 4vw, 3.6rem)' }}>
                {ai.heading || 'Spatial Intelligence at Institutional Scale'}
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p className="text-base text-ink-2 leading-relaxed mb-10">
                {ai.body || 'Airfree Geospatial Pty Ltd is a specialised geospatial intelligence and infrastructure analytics consultancy.'}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.18}>
              <Button href="/about" variant="outline">About the Practice</Button>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.08} className="relative">
            <div className="ring-1 ring-black/[0.06]">
              <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden">
                <Image
                  src={photo}
                  alt="Aerial view of urban infrastructure"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.88)] via-[rgba(10,22,40,0.3)] to-[rgba(10,22,40,0.05)]" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {STATS.map(stat => (
                      <div key={stat.lbl}>
                        <div className="font-mono text-xl sm:text-2xl font-light text-white mb-1">{stat.val}</div>
                        <div className="font-mono text-[0.52rem] tracking-widest uppercase text-white/40">{stat.lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

function IndustriesTeaser() {
  const sectors = [
    'Government & Public Administration',
    'Utility Networks',
    'Critical Infrastructure',
    'Mining & Resources',
    'Construction & Engineering',
    'Environmental Agencies',
    'Agriculture & Rural Land',
    'Urban Planning',
  ];
  return (
    <section className="py-20 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-14">
          <div className="flex-1">
            <RevealOnScroll><SectionLabel className="mb-5">Sectors We Serve</SectionLabel></RevealOnScroll>
            <RevealOnScroll delay={0.06}>
              <h2 className="font-serif text-ink leading-[1.08]" style={{ fontSize: 'clamp(1.4rem, 4vw, 3.4rem)' }}>
                Built for the Organisations<br />That Cannot Afford Imprecision
              </h2>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.1} className="md:pb-2">
            <Button href="/industries" variant="outline" size="sm">All Sectors</Button>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sectors.map((sector, i) => (
            <RevealOnScroll key={sector} delay={i * 0.04} className="h-full">
              <Link
                href="/industries"
                className="group flex flex-col h-full bg-white border border-black/[0.04] hover:border-brand-blue/20 hover:shadow-[0_8px_30px_rgba(10,22,40,0.03)] rounded-[4px] transition-all duration-500 p-6 sm:p-8"
              >
                <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-brand-blue mb-4">0{i + 1}</div>
                <div className="font-serif text-xs sm:text-sm md:text-base text-ink group-hover:text-brand-blue transition-colors leading-snug min-w-0">
                  {sector}
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function FullBleedCTA() {
  return (
    <section className="relative py-20 sm:py-32 md:py-40 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=80"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-[rgba(10,22,40,0.78)]" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 text-center">
        <RevealOnScroll>
          <SectionLabel className="text-white/50 mb-6 flex justify-center">Ready to Begin</SectionLabel>
          <h2 className="font-serif text-white leading-[1.05] mb-6" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 4rem)' }}>
            Ready to Discuss Your Requirements?
          </h2>
          <p className="text-white/55 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Project enquiries, panel opportunities, and capability statement requests are welcome. Response within two business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary">Get in Touch</Button>
            <Button href="/services" variant="ghost">View Services</Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ── Section registry — render functions, not pre-created nodes ────────────────

const SECTION_REGISTRY: Record<string, () => React.ReactNode> = {
  'hero':             () => <HeroSlider />,
  'capability-strip': () => <CapabilityStrip />,
  'photo-strip':      () => <PhotoStrip />,
  'services':         () => <ServicePillars />,
  'about':            () => <AboutSection />,
  'industries':       () => <IndustriesTeaser />,
  'cta':              () => <FullBleedCTA />,
};

const DEFAULT_ORDER = ['hero', 'capability-strip', 'photo-strip', 'services', 'about', 'industries', 'cta'];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const cms = useCMS();
  const cmsSections = cms.page_sections?.home ?? [];

  const sectionIds: string[] = cmsSections.length > 0
    ? cmsSections.filter(s => s.enabled).map(s => s.id)
    : DEFAULT_ORDER;

  return (
    <>
      {sectionIds.map(id => {
        const render = SECTION_REGISTRY[id];
        if (!render) return null;
        return <React.Fragment key={id}>{render()}</React.Fragment>;
      })}
    </>
  );
}
