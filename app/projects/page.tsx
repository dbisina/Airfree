'use client';

import Image from 'next/image';
import { PageHero } from '@/components/sections/PageHero';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { useCMS } from '@/lib/useCMS';
import { CMS_DEFAULTS } from '@/lib/cms-store'; // used for projects fallback

export default function ProjectsPage() {
  const cms = useCMS();
  // Use Array.isArray (not .length) so an intentionally emptied list stays empty
  const projects = Array.isArray(cms.projects) ? cms.projects : CMS_DEFAULTS.projects;

  return (
    <>
      <PageHero
        imageKey="projects"
        pageKey="projects"
      />

      {/* Confidentiality note */}
      <section className="bg-surface py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24 text-center">
          <p className="text-ink-2 max-w-2xl mx-auto" style={{ fontSize: '0.9rem' }}>
            Airfree Geospatial works on client-confidential engagements across government, utilities, and enterprise. Capability Statements detailing relevant project experience are available to registered procuring organisations upon request.
          </p>
        </div>
      </section>

      {/* Project cards */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24">
          <RevealOnScroll>
            <SectionLabel className="mb-10">Representative Projects</SectionLabel>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => {
              const outcomes = project.outcomes
                .split('\n')
                .map(o => o.trim())
                .filter(Boolean);
              return (
                <RevealOnScroll key={project.id} delay={i * 0.08}>
                  <div className="border border-border-s bg-white hover:bg-surface transition-colors duration-200 h-full flex flex-col overflow-hidden">
                    {/* Optional project photo */}
                    {project.image && (
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1023px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-navy/30" />
                      </div>
                    )}

                    <div className="p-8 flex flex-col flex-1">
                      {/* Category badge */}
                      <div
                        className="font-mono tracking-widest uppercase text-ink-3 mb-3"
                        style={{ fontSize: '0.55rem' }}
                      >
                        {project.category}
                      </div>

                      {/* Title */}
                      <h3
                        className="font-serif font-semibold text-navy mb-2 leading-snug"
                        style={{ fontSize: '1.1rem' }}
                      >
                        {project.title}
                      </h3>

                      {/* Meta row */}
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-ink-3 italic" style={{ fontSize: '0.8rem' }}>{project.scope}</span>
                        {project.year && (
                          <>
                            <span className="text-ink-3/40">·</span>
                            <span className="font-mono text-ink-3" style={{ fontSize: '0.65rem' }}>{project.year}</span>
                          </>
                        )}
                        {project.location && (
                          <>
                            <span className="text-ink-3/40">·</span>
                            <span className="text-ink-3" style={{ fontSize: '0.75rem' }}>{project.location}</span>
                          </>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-ink-2 leading-relaxed mb-5 flex-1" style={{ fontSize: '0.875rem' }}>
                        {project.description}
                      </p>

                      {/* Outcomes */}
                      {outcomes.length > 0 && (
                        <ul className="space-y-1.5">
                          {outcomes.map((outcome) => (
                            <li
                              key={outcome}
                              className="font-mono text-ink-3"
                              style={{ fontSize: '0.65rem' }}
                            >
                              &rarr; {outcome}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24 text-center">
          <RevealOnScroll>
            <SectionLabel className="text-white/60 mb-4">Procurement</SectionLabel>
            <h2
              className="font-serif font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}
            >
              Request a Capability Statement
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto" style={{ fontSize: '0.95rem' }}>
              Registered procuring organisations may request a formal Capability Statement detailing relevant project experience, technical competencies, and certifications aligned to their procurement requirements.
            </p>
            <Button href="/contact" variant="ghost">
              Request Capability Statement
            </Button>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
