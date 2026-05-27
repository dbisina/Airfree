'use client';

import Image from 'next/image';
import { PageHero } from '@/components/sections/PageHero';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { useCMS } from '@/lib/useCMS';
import { CMS_DEFAULTS } from '@/lib/cms-store';

export function ServicesClient() {
  const cms = useCMS();

  // Use CMS services; fall back to defaults only if completely missing
  const services = Array.isArray(cms.services) && cms.services.length > 0
    ? cms.services
    : CMS_DEFAULTS.services;

  return (
    <>
      <PageHero
        imageKey="services"
        pageKey="services"
      />

      {/* Services list — split layout */}
      <section className="bg-white py-20 md:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24">
          <RevealOnScroll>
            <SectionLabel className="mb-10">All Services</SectionLabel>
          </RevealOnScroll>
        </div>

        <div className="max-w-7xl mx-auto">
          {services.map((service, i) => {
            // CMS stores tags as comma-separated string; constants store as array
            const tags: string[] = typeof service.tags === 'string'
              ? (service.tags as string).split(',').map((t: string) => t.trim()).filter(Boolean)
              : (service.tags as unknown as string[]);

            return (
              <RevealOnScroll key={service.slug} delay={i * 0.06}>
                <div className="group border-b border-border-s grid grid-cols-1 md:grid-cols-[280px_1fr]">
                  {/* Image */}
                  <div className="relative h-44 md:h-full overflow-hidden">
                    <Image
                      src={service.image || '/images/gisinfra.jpg'}
                      alt={service.shortTitle}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                      sizes="(max-width: 767px) 100vw, 280px"
                    />
                    <div className="absolute inset-0 bg-navy/15" />
                  </div>

                  {/* Content */}
                  <div className="px-6 py-8 md:px-10 md:py-12 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-5 mb-4">
                        <div className="shrink-0">
                          <div className="font-mono text-ink-3 leading-none mb-1.5" style={{ fontSize: '1.25rem' }}>
                            {service.number}
                          </div>
                          <div className="w-6 h-0.5 bg-brand-blue" />
                        </div>
                        <h2
                          className="font-serif font-semibold text-navy leading-snug"
                          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
                        >
                          {service.title}
                        </h2>
                      </div>
                      <p className="text-ink-2 mb-5 leading-relaxed pl-11" style={{ fontSize: '0.9rem' }}>
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pl-11">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[0.55rem] tracking-widest uppercase px-2 py-0.5 border border-border-s text-ink-3"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-start pt-0 md:pt-2 shrink-0">
                      <Button href={`/services/${service.slug}`} variant="outline" size="sm">
                        View Service
                      </Button>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-surface py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24 text-center">
          <RevealOnScroll>
            <h2
              className="font-serif font-bold text-navy mb-4"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}
            >
              Not sure which service applies?
            </h2>
            <p className="text-ink-2 mb-8 max-w-md mx-auto" style={{ fontSize: '0.95rem' }}>
              Contact our team to discuss your project scope and we will identify the appropriate service capability and delivery approach.
            </p>
            <Button href="/contact" variant="primary">
              Discuss Requirements
            </Button>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
