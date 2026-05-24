import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About | Airfree Geospatial',
  description: 'Airfree Geospatial is an Australian spatial data consultancy. We work with government bodies, utility operators, and engineering firms on GIS infrastructure, field surveys, and spatial analysis.',
};

const PRINCIPLES = [
  {
    title: 'Precision Over Assumption',
    description:
      'We validate spatial data against ground truth and authoritative sources before it informs any decision. Inaccurate spatial data is not a cosmetic problem — it produces costly errors in asset management, planning, and regulatory compliance.',
  },
  {
    title: 'Architecture Before Application',
    description:
      'Sustainable spatial systems begin with the right database design, governance frameworks, and data standards. We design infrastructure that scales, before any application layer is built.',
  },
  {
    title: 'Institutional-Grade Delivery',
    description:
      'Our outputs meet the technical and compliance standards required by government agencies, utility operators, and regulated industries. Deliverables are documented, validated, and structured for long-term operational use.',
  },
];

const SECTORS = [
  'Government & Public Administration',
  'Utility Network Operators',
  'Critical Infrastructure',
  'Mining & Resources',
  'Construction & Engineering',
  'Environmental Agencies',
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="About Airfree Geospatial"
        subtitle="Mission, philosophy, and the institutional framework that defines our enterprise geospatial consultancy."
        imageKey="about"
      />

      {/* Mission */}
      <section className="bg-white py-16 sm:py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealOnScroll>
              <SectionLabel className="mb-4">Mission</SectionLabel>
              <h2 className="font-serif font-bold text-navy mb-6 leading-tight" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.75rem)' }}>
                Advancing the Precision and Utility of Spatial Intelligence
              </h2>
              <p className="text-ink-2 leading-relaxed mb-5" style={{ fontSize: '0.95rem' }}>
                Airfree Geospatial Pty Ltd is an enterprise geospatial consultancy serving government agencies, utility network operators, and large-scale engineering organisations across Australia. We design, build, and manage spatial data infrastructure and analytical systems that organisations depend on for operational decisions, regulatory compliance, and asset management.
              </p>
              <p className="text-ink-2 leading-relaxed" style={{ fontSize: '0.95rem' }}>
                Our practice spans the full spatial data lifecycle — from the design of enterprise GIS architecture and SDI frameworks through to UAV survey operations, satellite imagery analysis, and web-based spatial platform development. Every engagement is grounded in spatial data standards, validated workflows, and institutional-grade delivery.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <div className="border border-border-s bg-surface p-5 sm:p-8">
                <h3 className="font-serif font-semibold text-navy mb-4" style={{ fontSize: '1.15rem' }}>
                  The Problem We Solve
                </h3>
                <p className="text-ink-2 leading-relaxed mb-4" style={{ fontSize: '0.9rem' }}>
                  Most organisations accumulate spatial data across disconnected environments — desktop GIS installations, shared drives, proprietary formats, and departmental silos — without a coherent architecture for managing, validating, or sharing that data.
                </p>
                <p className="text-ink-2 leading-relaxed" style={{ fontSize: '0.9rem' }}>
                  This fragmentation produces duplication, version conflicts, accuracy degradation, and regulatory exposure. Airfree Geospatial resolves these systemic failures by designing and deploying production-grade spatial data infrastructure aligned with OGC standards, ISO 19100, and Australian spatial governance frameworks.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Three Principles */}
      <section className="bg-surface py-16 sm:py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <RevealOnScroll>
            <SectionLabel className="mb-4">Philosophy</SectionLabel>
            <h2 className="font-serif font-bold text-navy mb-14 leading-tight" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.75rem)' }}>
              How We Work
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRINCIPLES.map((p, i) => (
              <RevealOnScroll key={p.title} delay={i * 0.1}>
                <div className="bg-white border border-border-s p-5 sm:p-8 h-full">
                  <div className="w-9 h-0.5 bg-brand-blue mb-5" />
                  <h3 className="font-serif font-semibold text-navy mb-4" style={{ fontSize: '1.1rem' }}>
                    {p.title}
                  </h3>
                  <p className="text-ink-2 leading-relaxed" style={{ fontSize: '0.9rem' }}>
                    {p.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <RevealOnScroll>
            <SectionLabel className="text-white/60 mb-4">Operational Focus</SectionLabel>
            <h2
              className="font-serif font-bold text-white mb-12 leading-tight"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2.75rem)' }}
            >
              The Organisations We Support
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {SECTORS.map((sector, i) => (
              <RevealOnScroll key={sector} delay={i * 0.07}>
                <div className="border-b border-white/10 py-5 pr-8">
                  <span className="font-mono text-[0.55rem] tracking-widest uppercase text-white/30 mr-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-white/80 text-sm">{sector}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 text-center">
          <RevealOnScroll>
            <h2 className="font-serif font-bold text-navy mb-4" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}>
              Discuss your requirements
            </h2>
            <p className="text-ink-2 mb-8 max-w-md mx-auto" style={{ fontSize: '0.95rem' }}>
              Engage our team to scope your geospatial project, request a capability statement, or discuss a standing consultancy arrangement.
            </p>
            <Button href="/contact" variant="primary">
              Get in Touch
            </Button>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
