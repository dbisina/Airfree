import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { WMSMap } from '@/components/sections/WMSMap';

export const metadata: Metadata = {
  title: 'Spatial Data Viewer | Airfree Geospatial',
  description: 'Interactive WMS map viewer for Airfree Geospatial spatial data layers and OGC-compliant web map services.',
};

export default function MapPage() {
  return (
    <>
      <PageHero
        label="Spatial Data Viewer"
        title="WMS Layer Viewer"
        subtitle="Interactive map displaying configured Web Map Service layers and spatial data feeds. Powered by OGC-compliant WMS endpoints."
        imageKey="technology"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24">
          <RevealOnScroll>
            <SectionLabel className="mb-6">Live Spatial Data</SectionLabel>
          </RevealOnScroll>

          <RevealOnScroll delay={0.04}>
            <p className="text-ink-2 mb-8 max-w-2xl" style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
              WMS layers displayed here are configured via the CMS admin panel. Add your GeoServer, ArcGIS, or any OGC-compliant WMS endpoint through Admin &rarr; WMS Layers.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.06}>
            <WMSMap height="600px" />
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button href="/contact" variant="outline">
              Discuss Data Sharing
            </Button>
            <Button href="/services/gis-spatial" variant="ghost">
              GIS Infrastructure Services
            </Button>
          </RevealOnScroll>
        </div>
      </section>

      {/* OGC Standards note */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24">
          <RevealOnScroll>
            <SectionLabel className="mb-8">OGC Standards Supported</SectionLabel>
          </RevealOnScroll>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { abbr: 'WMS', full: 'Web Map Service' },
              { abbr: 'WFS', full: 'Web Feature Service' },
              { abbr: 'WCS', full: 'Web Coverage Service' },
              { abbr: 'WMTS', full: 'Web Map Tile Service' },
            ].map(std => (
              <RevealOnScroll key={std.abbr}>
                <div className="border border-border-s p-5 bg-white">
                  <div className="font-mono text-xl text-navy font-light mb-1">{std.abbr}</div>
                  <div className="font-mono text-[0.55rem] tracking-widest uppercase text-ink-3">{std.full}</div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
