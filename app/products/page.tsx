import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/sections/PageHero';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { SectionLabel } from '@/components/ui/SectionLabel';

export const metadata: Metadata = {
  title: 'Products | Airfree Geospatial',
  description: 'Web GIS platforms, mobile field tools, spatial API subscriptions, and managed hosting for government and infrastructure operators.',
};

const PRODUCTS = [
  {
    badge: 'PLATFORM',
    title: 'Airfree Web GIS',
    description:
      'White-label enterprise web GIS portal platform for government and utilities. Configurable basemaps, OGC service integration, role-based access control, and institutional print templates. Deployed on-premises or sovereign cloud.',
    features: [
      'Custom basemap configuration',
      'OGC service integration (WMS/WFS)',
      'Role-based access control',
      'Print-ready template system',
      'Audit trail & access logging',
    ],
  },
  {
    badge: 'MOBILE',
    title: 'Airfree Map',
    description:
      'Navigation and field data collection platform for ground-truth operations and infrastructure inspection. Offline-capable, GPS-integrated attribute capture with spatial photo geotagging.',
    features: [
      'Offline map tiles & vector data',
      'GPS-tracked field recording',
      'Attribute data capture forms',
      'Spatial photo geotagging',
      'Data sync to enterprise GIS',
    ],
  },
  {
    badge: 'API',
    title: 'Spatial API Suite',
    description:
      'REST and OGC API subscriptions providing access to curated national spatial datasets. Available in rate-limited tiers for integration into third-party applications and automated workflows.',
    features: [
      'WMS/WFS/OGC API endpoints',
      'National dataset coverage',
      'JSON-LD geometry export',
      'Tiered rate limiting',
      'Authentication & access tokens',
    ],
  },
  {
    badge: 'ADVISORY',
    title: 'GIS Licensing Advisory',
    description:
      'Vendor-neutral GIS software licensing optimisation for ArcGIS, QGIS, and cloud GIS technology stacks. Includes cost modelling, deployment architecture review, and migration planning.',
    features: [
      'License audit & optimisation',
      'Multi-vendor cost modelling',
      'Cloud vs. on-premises analysis',
      'Transition roadmap',
      'Vendor negotiation support',
    ],
  },
  {
    badge: 'HOSTING',
    title: 'GIS Hosting & Infrastructure',
    description:
      'Managed hosting for PostGIS, GeoServer, and web GIS applications on Australian sovereign cloud infrastructure. SLA-backed availability with professional monitoring and support.',
    features: [
      'Australian sovereign cloud',
      'SLA-backed uptime guarantee',
      'Automated backups & DR',
      'SSL/TLS & security hardening',
      'Performance monitoring',
    ],
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        label="Product Suite"
        title="Geospatial Products & Platforms"
        subtitle="Engineered spatial platforms and subscriptions for government, utilities, and enterprise organisations."
        imageKey="products"
      />

      {/* Products grid */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <RevealOnScroll>
            <SectionLabel className="mb-12">All Products</SectionLabel>
          </RevealOnScroll>

          {/* 2-col grid, last item centered via col-start */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRODUCTS.map((product, i) => (
              <RevealOnScroll
                key={product.title}
                delay={i * 0.08}
                className={
                  i === PRODUCTS.length - 1 && PRODUCTS.length % 2 !== 0
                    ? 'md:col-start-1 md:col-span-1 md:justify-self-center md:w-full'
                    : ''
                }
              >
                <div className="border border-border-s p-8 bg-white h-full flex flex-col">
                  {/* Badge */}
                  <span className="font-mono text-[0.55rem] tracking-widest uppercase bg-navy text-white px-3 py-1 inline-block mb-5 self-start">
                    {product.badge}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-serif font-semibold text-navy mb-3"
                    style={{ fontSize: '1.2rem' }}
                  >
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="text-ink-2 leading-relaxed mb-6" style={{ fontSize: '0.9rem' }}>
                    {product.description}
                  </p>

                  {/* Features */}
                  <ul className="mb-8 flex-1 space-y-2">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-ink-2"
                        style={{ fontSize: '0.875rem' }}
                      >
                        <span className="text-brand-blue mt-0.5 flex-shrink-0">&#10003;</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <Link
                    href="/contact"
                    className="font-sans font-medium text-brand-blue text-sm hover:text-navy transition-colors"
                  >
                    Enquire About This Product &rarr;
                  </Link>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 text-center">
          <RevealOnScroll>
            <SectionLabel className="mb-4">Custom Requirements</SectionLabel>
            <h2
              className="font-serif font-bold text-navy mb-4"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}
            >
              Need something tailored?
            </h2>
            <p className="text-ink-2 max-w-md mx-auto" style={{ fontSize: '0.95rem' }}>
              All Airfree Geospatial products can be configured to meet specific government procurement, data sovereignty, and integration requirements. Contact our team to discuss a custom deployment.
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
