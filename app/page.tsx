import Image from 'next/image';
import Link from 'next/link';
import { HeroSlider } from '@/components/sections/HeroSlider';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { SERVICES } from '@/lib/constants';

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

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      {/* Capability Strip */}
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

      {/* Photo Strip — 4 panels, tall */}
      <div className="grid grid-cols-2 md:grid-cols-4 h-40 sm:h-56 md:h-[380px]">
        {PHOTO_PANELS.map((panel, i) => (
          <div key={panel.label} className="relative overflow-hidden group">
            <Image
              src={panel.src}
              alt={panel.label}
              fill
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

      {/* Service Pillars — numbered list, no orphan grid */}
      <section className="py-16 sm:py-28 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-16 md:mb-20">
            <div className="flex-1">
              <RevealOnScroll>
                <SectionLabel className="mb-5">Core Service Pillars</SectionLabel>
              </RevealOnScroll>
              <RevealOnScroll delay={0.06}>
                <h2 className="font-serif text-ink leading-[1.08]" style={{ fontSize: 'clamp(1.6rem, 5vw, 4.2rem)' }}>
                  Seven Enterprise<br />Geospatial Capabilities
                </h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delay={0.12} className="md:max-w-sm md:pb-2">
              <p className="text-base text-ink-2 leading-relaxed">
                Specialised service domains covering the full spectrum of spatial intelligence — from enterprise infrastructure design to environmental carbon analytics.
              </p>
            </RevealOnScroll>
          </div>

          {/* Numbered list — works for any count, no orphan */}
          <div className="border-t border-border-s">
            {SERVICES.map((service, i) => (
              <RevealOnScroll key={service.slug} delay={i * 0.04}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex items-start md:items-center gap-3 sm:gap-6 md:gap-12 py-5 md:py-7 border-b border-border-s hover:bg-[#fafafa] transition-colors px-1 -mx-1"
                >
                  {/* Number */}
                  <div className="shrink-0 w-10 sm:w-14 md:w-16">
                    <div className="font-mono text-[0.6rem] tracking-widest text-ink-3 mb-2">{service.number}</div>
                    <div className="h-px w-8 bg-brand-blue" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-serif font-semibold text-ink group-hover:text-brand-blue transition-colors mb-2 md:mb-0 leading-tight"
                      style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)' }}
                    >
                      {service.title}
                    </h3>
                    <p className="hidden lg:block text-sm text-ink-3 leading-relaxed mt-1.5 max-w-xl">
                      {service.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="hidden md:flex flex-wrap gap-1.5 shrink-0 max-w-[260px] justify-end">
                    {service.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="font-mono text-[0.5rem] tracking-widest uppercase px-2 py-1 border border-border-s text-ink-3 whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 w-8 h-8 rounded-[2px] border border-black/[0.06] group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={0.15} className="mt-12 text-center">
            <Button href="/services" variant="outline">View All Services</Button>
          </RevealOnScroll>
        </div>
      </section>

      {/* About — text left, full-bleed photo right with stats overlay */}
      <section className="py-16 sm:py-28 md:py-36 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text */}
            <div>
              <RevealOnScroll><SectionLabel className="mb-5">About the Practice</SectionLabel></RevealOnScroll>
              <RevealOnScroll delay={0.06}>
                <h2 className="font-serif text-ink leading-[1.08] mb-7" style={{ fontSize: 'clamp(1.5rem, 4vw, 3.6rem)' }}>
                  Spatial Intelligence<br />at Institutional Scale
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <p className="text-base text-ink-2 leading-relaxed mb-5">
                  Airfree Geospatial Pty Ltd is a specialised geospatial intelligence and infrastructure analytics consultancy. We exist to deliver enterprise-grade spatial solutions to organisations whose decisions depend on accurate, verifiable, and spatially referenced information.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.14}>
                <p className="text-base text-ink-2 leading-relaxed mb-10">
                  Our work spans federal and state government agencies, major utility networks, mining and resources operations, and critical engineering infrastructure.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <Button href="/about" variant="outline">About the Practice</Button>
              </RevealOnScroll>
            </div>

            {/* Photo with stats overlay */}
            <RevealOnScroll delay={0.08} className="relative">
              <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80"
                  alt="Aerial view of urban infrastructure"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.88)] via-[rgba(10,22,40,0.3)] to-[rgba(10,22,40,0.05)]" />
                {/* Stats overlaid at bottom */}
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
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Industries teaser — horizontal scroll cards on mobile, grid on desktop */}
      <section className="py-16 sm:py-28 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
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
            {[
              'Government & Public Administration',
              'Utility Networks',
              'Critical Infrastructure',
              'Mining & Resources',
              'Construction & Engineering',
              'Environmental Agencies',
              'Agriculture & Rural Land',
              'Urban Planning',
            ].map((sector, i) => (
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

      {/* Full-bleed photo CTA */}
      <section className="relative py-20 sm:py-36 md:py-48 overflow-hidden">
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
    </>
  );
}
