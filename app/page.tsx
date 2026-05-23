import Image from "next/image";
import Link from "next/link";
import {HeroSlider} from "@/components/sections/HeroSlider";
import {RevealOnScroll} from "@/components/ui/RevealOnScroll";
import {SectionLabel} from "@/components/ui/SectionLabel";
import {Button} from "@/components/ui/Button";
import {SERVICES} from "@/lib/constants";

const PHOTO_PANELS = [
  {
    src: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&q=80",
    label: "Drone & Photogrammetry",
  },
  {
    src: "https://images.unsplash.com/photo-1569396116180-210c182bedb8?w=800&q=80",
    label: "Remote Sensing & AI",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    label: "Spatial Infrastructure",
  },
  {
    src: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&q=80",
    label: "Earth Observation",
  },
];

const CAPS = [
  {abbr: "GIS", label: "Spatial Infrastructure"},
  {abbr: "UAV", label: "Photogrammetry & 3D"},
  {abbr: "SAT", label: "Remote Sensing & AI"},
  {abbr: "ENV", label: "Environmental Analytics"},
];

const STATS = [
  {val: "7", lbl: "Service Domains"},
  {val: "3", lbl: "National Offices"},
  {val: "AU", lbl: "Jurisdiction"},
  {val: "ENT", lbl: "Enterprise Grade"},
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
                  <div className="font-mono text-2xl md:text-3xl font-light text-white mb-2 tracking-tight">
                    {cap.abbr}
                  </div>
                  <div className="text-xs text-white/35 tracking-widest uppercase font-mono">
                    {cap.label}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Strip — 4 panels, tall */}

      {/* Service Pillars — numbered list, no orphan grid */}
      <section className="py-16 sm:py-28 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="mb-16 md:mb-20">
            <RevealOnScroll>
              <SectionLabel className="mb-5">Core Service Pillars</SectionLabel>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06}>
              <h2
                className="font-serif text-ink leading-[1.08] whitespace-nowrap"
                style={{fontSize: "clamp(1.6rem, 5vw, 4.2rem)"}}
              >
                Our Geospatial Capabilities
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.12}>
              <p className="mt-6 max-w-2xl text-base text-ink-2 leading-relaxed">
                Specialised service domains covering the full spectrum of
                spatial intelligence — from enterprise infrastructure design to
                environmental analytics.
              </p>
            </RevealOnScroll>
          </div>

          {/* GRID (NEW CARD STYLE) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.slice(0, 3).map((service, i) => (
              <RevealOnScroll key={service.slug} delay={i * 0.08}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex flex-col h-full border border-border-s bg-white overflow-hidden  hover:shadow-md transition-all duration-300"
                >
                  {/* IMAGE */}
                  <div className="h-44 overflow-hidden bg-surface">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Number */}
                    <div className="font-mono text-[0.65rem] tracking-widest text-ink-3 mb-2">
                      {service.number}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-semibold text-navy mb-3 leading-snug text-[1.1rem] group-hover:text-brand-blue transition-colors">
                      {service.shortTitle}
                    </h3>

                    {/* Description */}
                    <p className="text-ink-2 text-sm leading-relaxed flex-1">
                      {service.description}
                    </p>

                    {/* CTA */}

                    <div className="mt-6 flex justify-end">
                      <div className="flex items-center gap-3 py-2transition-all duration-300 group-hover:border-brand-blue">
                        {/* Label */}
                        <span className="text-sm font-medium text-ink-2 group-hover:text-brand-blue transition-colors">
                          View Service
                        </span>

                        {/* Icon button (visually unified, not detached) */}

                        <div
                          className="
                            w-10 h-10  flex items-center justify-center bg-surface group-hover:bg-brand-bluetransition-all duration-300"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 10 10"
                            fill="none"
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          >
                            <path
                              d="M1 5h8M5 1l4 4-4 4"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>

          {/* VIEW ALL BUTTON */}
          <RevealOnScroll delay={0.2} className="mt-12 text-center">
            <Button href="/services" variant="outline">
              View All Services
            </Button>
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {/* MAIN TILE */}
            <div className="md:col-span-2 relative overflow-hidden  group h-64 md:h-[360px]">
              <Image
                src={PHOTO_PANELS[0].src}
                alt={PHOTO_PANELS[0].label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.85)] via-[rgba(10,22,40,0.2)] to-transparent" />

              <div className="absolute bottom-0 p-5 md:p-6">
                <div className="font-mono text-[0.55rem] tracking-[0.25em] text-white/50 mb-2">
                  01
                </div>
                <div className="font-serif text-white text-lg md:text-xl leading-tight max-w-sm">
                  {PHOTO_PANELS[0].label}
                </div>
              </div>
            </div>

            {/* RIGHT STACK */}
            <div className="grid grid-rows-2 gap-4">
              {PHOTO_PANELS.slice(1, 3).map((panel, i) => (
                <div
                  key={panel.label}
                  className="relative overflow-hidden  group h-28 md:h-[170px]"
                >
                  <Image
                    src={panel.src}
                    alt={panel.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.85)] via-[rgba(10,22,40,0.2)] to-transparent" />

                  <div className="absolute bottom-0 p-4">
                    <div className="font-mono text-[0.5rem] tracking-[0.25em] text-white/50 mb-1">
                      0{i + 2}
                    </div>
                    <div className="font-serif text-white text-sm leading-tight max-w-45">
                      {panel.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* BOTTOM STRIP */}
            <div className="md:col-span-3 grid grid-cols-2 gap-4">
              {PHOTO_PANELS.slice(3, 5).map((panel, i) => (
                <div
                  key={panel.label}
                  className="relative overflow-hidden group h-36 md:h-50 "
                >
                  <Image
                    src={panel.src}
                    alt={panel.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.85)] via-[rgba(10,22,40,0.2)] to-transparent" />

                  <div className="absolute bottom-0 p-4 md:p-5">
                    <div className="font-mono text-[0.5rem] tracking-[0.25em] text-white/50 mb-1">
                      0{i + 4}
                    </div>
                    <div className="font-serif text-white text-sm md:text-base">
                      {panel.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About — text left, full-bleed photo right with stats overlay */}
      <section className="py-16 sm:py-28 md:py-36 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text */}
            <div>
              <RevealOnScroll>
                <SectionLabel className="mb-5">About the Practice</SectionLabel>
              </RevealOnScroll>
              <RevealOnScroll delay={0.06}>
                <h2
                  className="font-serif text-ink leading-[1.08] mb-7"
                  style={{fontSize: "clamp(1.5rem, 4vw, 3.6rem)"}}
                >
                  Spatial Intelligence
                  <br />
                  at Institutional Scale
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <p className="text-base text-ink-2 leading-relaxed mb-5">
                  Airfree Geospatial Pty Ltd is a specialised geospatial
                  intelligence and infrastructure analytics consultancy. We
                  exist to deliver enterprise-grade spatial solutions to
                  organisations whose decisions depend on accurate, verifiable,
                  and spatially referenced information.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.14}>
                <p className="text-base text-ink-2 leading-relaxed mb-10">
                  Our work spans federal and state government agencies, major
                  utility networks, mining and resources operations, and
                  critical engineering infrastructure.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <Button href="/about" variant="outline">
                  About the Practice
                </Button>
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
                    {STATS.map((stat) => (
                      <div key={stat.lbl}>
                        <div className="font-mono text-xl sm:text-2xl font-light text-white mb-1">
                          {stat.val}
                        </div>
                        <div className="font-mono text-[0.52rem] tracking-widest uppercase text-white/40">
                          {stat.lbl}
                        </div>
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
              <RevealOnScroll>
                <SectionLabel className="mb-5">Sectors We Serve</SectionLabel>
              </RevealOnScroll>
              <RevealOnScroll delay={0.06}>
                <h2
                  className="font-serif text-ink leading-[1.08]"
                  style={{fontSize: "clamp(1.4rem, 4vw, 3.4rem)"}}
                >
                  Built for the Organisations
                  <br />
                  That Cannot Afford Imprecision
                </h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delay={0.1} className="md:pb-2">
              <Button href="/industries" variant="outline" size="sm">
                All Sectors
              </Button>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Government & Public Administration",
              "Utility Networks",
              "Critical Infrastructure",
              "Mining & Resources",
              "Construction & Engineering",
              "Environmental Agencies",
              "Agriculture & Rural Land",
              "Urban Planning",
            ].map((sector, i) => (
              <RevealOnScroll key={sector} delay={i * 0.04} className="h-full">
                <Link
                  href="/industries"
                  className="group flex flex-col h-full bg-white border border-black/[0.04] hover:border-brand-blue/20 hover:shadow-[0_8px_30px_rgba(10,22,40,0.03)] rounded-[4px] transition-all duration-500 p-6 sm:p-8"
                >
                  <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-brand-blue mb-4">
                    0{i + 1}
                  </div>
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
            <SectionLabel className="text-white/50 mb-6 flex justify-center">
              Ready to Begin
            </SectionLabel>
            <h2
              className="font-serif text-white leading-[1.05] mb-6"
              style={{fontSize: "clamp(1.5rem, 4.5vw, 4rem)"}}
            >
              Ready to Discuss Your Requirements?
            </h2>
            <p className="text-white/55 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Project enquiries, panel opportunities, and capability statement
              requests are welcome. Response within two business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary">
                Get in Touch
              </Button>
              <Button href="/services" variant="ghost">
                View Services
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
