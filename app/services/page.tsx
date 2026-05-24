import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Services | Airfree Geospatial',
  description: 'GIS implementation, drone surveys, satellite imagery analysis, utility network mapping, and environmental spatial reporting. Based in Adelaide with offices across Australia.',
};

const SERVICES = [
  {
    slug: 'gis-spatial',
    number: '01',
    title: 'Enterprise GIS & Spatial Infrastructure Systems',
    shortTitle: 'GIS & Spatial Infrastructure',
    description:
      'Design, deployment and management of enterprise-grade spatial data infrastructure. PostGIS database architecture, GIS server deployment, SDI frameworks, and end-to-end spatial data lifecycle management for government and enterprise.',
    tags: ['PostGIS', 'GeoServer', 'SDI Frameworks', 'ArcGIS Server', 'INSPIRE'],
  },
  {
    slug: 'digital-mapping',
    number: '02',
    title: 'Digital Mapping & Web GIS Platforms',
    shortTitle: 'Digital Mapping & Web GIS',
    description:
      'Development and deployment of interactive web-based GIS platforms and geospatial dashboards for institutional decision-support environments.',
    tags: ['Leaflet.js', 'OpenLayers', 'ArcGIS Online', 'MapBox GL', 'GeoNode'],
  },
  {
    slug: 'drone-photogrammetry',
    number: '03',
    title: 'Drone, Photogrammetry & 3D Spatial Engineering',
    shortTitle: 'Drone & Photogrammetry',
    description:
      'End-to-end UAV survey operations and photogrammetric processing workflows. Point cloud generation, 3D mesh modelling, orthomosaic production, and volumetric analysis.',
    tags: ['Agisoft Metashape', 'Pix4D', 'DJI Terra', 'CloudCompare', 'LiDAR'],
  },
  {
    slug: 'remote-sensing',
    number: '04',
    title: 'Remote Sensing & Satellite Analytics',
    shortTitle: 'Remote Sensing & AI',
    description:
      'Satellite imagery analysis, multispectral classification, change detection, and ML-driven land analysis across large geographic extents using global earth observation platforms.',
    tags: ['ENVI', 'Google Earth Engine', 'Sentinel Hub', 'GDAL', 'Python'],
  },
  {
    slug: 'infrastructure-utility',
    number: '05',
    title: 'Infrastructure & Utility Spatial Systems',
    shortTitle: 'Infrastructure & Utilities',
    description:
      'Geospatial systems for utility networks, asset registers, and infrastructure planning. Network tracing and maintenance GIS for water, gas, and electricity operators.',
    tags: ['Esri Utility Network', 'OpenStreetMap', 'QGIS', 'Network Analysis', 'AM/FM'],
  },
  {
    slug: 'survey-data',
    number: '06',
    title: 'Survey Data QA/QC & Spatial Standards',
    shortTitle: 'Survey Data & QA/QC',
    description:
      'Quality assurance and standards compliance for surveyed spatial data. ISO 19100, ICSM, and ANZLIC-aligned data validation, coordinate system management, and metadata standards.',
    tags: ['ICSM', 'ISO 19100', 'FME', 'QGIS', 'Python'],
  },
  {
    slug: 'environmental',
    number: '07',
    title: 'Environmental & Ecological Geospatial Analytics',
    shortTitle: 'Environmental Intelligence',
    description:
      'Spatial analytics for environmental monitoring, ecological mapping, and carbon accounting across regulated and natural environments.',
    tags: ['Google Earth Engine', 'ENVI', 'TerrSet', 'ArcGIS Pro', 'Python'],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Service Portfolio"
        title="Enterprise Geospatial Services"
        subtitle="Seven specialised service domains covering the full spectrum of spatial intelligence — from enterprise infrastructure design to satellite-derived environmental analytics."
        imageKey="services"
      />

      {/* Services list */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <RevealOnScroll>
            <SectionLabel className="mb-10">All Services</SectionLabel>
          </RevealOnScroll>
          <div>
            {SERVICES.map((service, i) => (
              <RevealOnScroll key={service.slug} delay={i * 0.07}>
                <div className="border-b border-border-s py-10">
                  <div className="grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[4rem_1fr_auto] gap-4 sm:gap-8 items-start">
                    {/* Number */}
                    <div>
                      <div
                        className="font-mono text-ink-3 leading-none mb-2"
                        style={{ fontSize: '1.75rem' }}
                      >
                        {service.number}
                      </div>
                      <div className="w-9 h-0.5 bg-brand-blue" />
                    </div>

                    {/* Content */}
                    <div>
                      <h2
                        className="font-serif font-semibold text-navy mb-3 leading-snug"
                        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
                      >
                        {service.title}
                      </h2>
                      <p className="text-ink-2 mb-5 leading-relaxed" style={{ fontSize: '0.9rem' }}>
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
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
                    <div className="pt-1">
                      <Button href={`/services/${service.slug}`} variant="outline" size="sm">
                        View Service
                      </Button>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 text-center">
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
