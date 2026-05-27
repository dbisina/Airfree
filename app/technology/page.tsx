import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { SectionLabel } from '@/components/ui/SectionLabel';

export const metadata: Metadata = {
  title: 'Technology | Airfree Geospatial',
  description: 'Our tooling: PostGIS, QGIS, ArcGIS, GeoServer, Agisoft Metashape, Google Earth Engine, Python, and the full OGC standards stack.',
};

const TECH_CATEGORIES = [
  {
    label: 'Category 01',
    title: 'Spatial Databases',
    description:
      'The foundation of enterprise spatial systems. Our spatial database practice is built on open standards and production-tested architectures capable of managing large-scale geospatial datasets with full topological integrity.',
    tools: [
      {
        name: 'PostGIS',
        role: 'Primary Spatial Database',
        description:
          'Spatial extension for PostgreSQL. Used for all enterprise spatial database deployments. Supports geometry, raster, topology, and routing functions with full OGC compliance.',
      },
      {
        name: 'PostgreSQL',
        role: 'Enterprise Database Engine',
        description:
          'Production-grade relational database backing all spatial data infrastructure. Configured for high-availability, replication, and connection pooling (PgBouncer).',
      },
      {
        name: 'SpatiaLite',
        role: 'Mobile / Lightweight Spatial DB',
        description:
          'SQLite-based spatial database for mobile and offline GIS applications. Used for field data collection and single-file dataset distribution.',
      },
    ],
  },
  {
    label: 'Category 02',
    title: 'GIS Platforms',
    description:
      'Desktop GIS platforms validated for enterprise project delivery. Selection is driven by licensing context, data format requirements, and analyst capability.',
    tools: [
      {
        name: 'QGIS',
        role: 'Primary Desktop GIS',
        description:
          'Open-source GIS platform used for data processing, cartography, spatial analysis, and QA/QC workflows. Preferred for government and regulated environment deployments.',
      },
      {
        name: 'ArcGIS Pro',
        role: 'Enterprise GIS Desktop',
        description:
          'Esri enterprise GIS for workflows requiring ArcGIS data formats, Esri Utility Network, or ArcGIS Online integration.',
      },
      {
        name: 'Global Mapper',
        role: 'Data Processing & Conversion',
        description:
          'Multi-format spatial data processing. Used for format conversion, LiDAR processing, raster analysis, and terrain derivative production.',
      },
    ],
  },
  {
    label: 'Category 03',
    title: 'Web GIS & Map Servers',
    description:
      'Server-side geospatial services and web mapping platforms for delivering spatial data to applications, portals, and end users over OGC-standard interfaces.',
    tools: [
      {
        name: 'GeoServer',
        role: 'OGC Map Server',
        description:
          'Primary WMS/WFS/WCS server for publishing spatial data as OGC-compliant services. Configured for enterprise performance with layer caching and security.',
      },
      {
        name: 'MapServer',
        role: 'Web Mapping Engine',
        description:
          'High-performance map rendering engine for WMS service delivery. Used in environments requiring minimal dependencies and maximum rendering throughput.',
      },
      {
        name: 'ArcGIS Online',
        role: 'Cloud GIS Platform',
        description:
          'Esri cloud GIS for web map publication, hosted feature layers, and Survey123 mobile data collection. Used within existing Esri enterprise agreements.',
      },
    ],
  },
  {
    label: 'Category 04',
    title: 'UAV & Photogrammetry',
    description:
      'Photogrammetric processing platforms and UAV hardware ecosystems for aerial survey operations and 3D spatial engineering deliverables.',
    tools: [
      {
        name: 'Agisoft Metashape',
        role: 'Photogrammetry Processing',
        description:
          'Primary photogrammetric software for point cloud generation, orthomosaic production, and 3D mesh modelling from UAV and terrestrial imagery.',
      },
      {
        name: 'Pix4D',
        role: 'Cloud & Desktop Processing',
        description:
          'Photogrammetric processing with cloud batch capability. Used for large-scale campaigns requiring parallel processing and automated quality reporting.',
      },
      {
        name: 'DJI Terra',
        role: 'Flight & Processing',
        description:
          'Flight planning and photogrammetric processing for DJI enterprise UAV platforms. Used for rapid-turnaround site surveys and construction monitoring.',
      },
    ],
  },
  {
    label: 'Category 05',
    title: 'Remote Sensing',
    description:
      'Earth observation analysis platforms for multispectral, hyperspectral, thermal, and SAR imagery processing across continental spatial extents.',
    tools: [
      {
        name: 'ENVI',
        role: 'Hyperspectral Analysis Platform',
        description:
          'Industry-standard remote sensing image analysis software. Used for spectral classification, change detection, and advanced band analysis on high-resolution imagery.',
      },
      {
        name: 'Google Earth Engine',
        role: 'Cloud Remote Sensing',
        description:
          'Planetary-scale cloud computing platform for earth observation data analysis. Used for large-area time-series analysis and national-scale vegetation monitoring.',
      },
      {
        name: 'ERDAS IMAGINE',
        role: 'Remote Sensing Platform',
        description:
          'Comprehensive remote sensing and image analysis platform. Used for photogrammetric processing, orthorectification, and large-format imagery workflows.',
      },
    ],
  },
  {
    label: 'Category 06',
    title: 'Programming & Data Science',
    description:
      'Spatial programming environments, scripting libraries, and data conversion toolkits underpinning automation, custom analysis, and data pipeline development.',
    tools: [
      {
        name: 'Python',
        role: 'Spatial Scripting & Automation',
        description:
          'Primary scripting language. Libraries: GeoPandas (vector), Rasterio (raster), Shapely (geometry), Fiona (I/O), PDAL (point cloud). Used for all automation and custom analysis workflows.',
      },
      {
        name: 'R',
        role: 'Spatial Statistics',
        description:
          'Statistical computing for spatial data science. Libraries: sf, terra, raster, sp. Used for geostatistical analysis, spatial regression, and ecological modelling.',
      },
      {
        name: 'GDAL/OGR',
        role: 'Format Conversion & Processing',
        description:
          'Open-source translator library for raster and vector geospatial data. Underpins format conversion, CRS transformation, and batch processing workflows.',
      },
    ],
  },
  {
    label: 'Category 07',
    title: 'Standards & Protocols',
    description:
      'The spatial data standards, OGC protocols, and regulatory frameworks that define technical requirements across all Airfree Geospatial project deliverables.',
    tools: [
      {
        name: 'OGC Standards',
        role: 'Interoperability Protocols',
        description:
          'WMS, WFS, WCS, WMTS, WPS, OGC API Features. All spatial service deployments implement OGC-compliant interfaces for maximum interoperability.',
      },
      {
        name: 'ISO 19100 Series',
        role: 'Spatial Data Standards',
        description:
          'ISO 19100 geographic information standards: 19103 (schema), 19107 (geometry), 19110 (feature cataloguing), 19115 (metadata), 19139 (metadata encoding).',
      },
      {
        name: 'ANZLIC / ICSM',
        role: 'Australian Spatial Standards',
        description:
          'Australian and New Zealand Land Information Council metadata profiles and ICSM survey practice guidelines applied to all government and regulated sector deliverables.',
      },
    ],
  },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        imageKey="technology"
        pageKey="technology"
      />

      {TECH_CATEGORIES.map((cat, i) => {
        const isEven = i % 2 === 0;
        const sectionBg = isEven ? 'bg-white' : 'bg-surface';
        const cardBg = isEven ? 'bg-surface' : 'bg-white';

        return (
          <section key={cat.label} className={`${sectionBg} py-20`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
                {/* Left: description */}
                <RevealOnScroll>
                  <SectionLabel className="mb-3">{cat.label}</SectionLabel>
                  <h2
                    className="font-serif font-bold text-navy mb-5 leading-tight"
                    style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                  >
                    {cat.title}
                  </h2>
                  <p className="text-ink-2 leading-relaxed" style={{ fontSize: '0.9rem' }}>
                    {cat.description}
                  </p>
                </RevealOnScroll>

                {/* Right: tool cards */}
                <div className="space-y-4">
                  {cat.tools.map((tool, j) => (
                    <RevealOnScroll key={tool.name} delay={j * 0.08}>
                      <div className={`${cardBg} border border-border-s p-6`}>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <span
                            className="font-mono text-navy font-normal"
                            style={{ fontSize: '1rem' }}
                          >
                            {tool.name}
                          </span>
                          <span
                            className="font-mono tracking-widest uppercase text-brand-blue flex-shrink-0"
                            style={{ fontSize: '0.55rem' }}
                          >
                            {tool.role}
                          </span>
                        </div>
                        <p className="text-ink-2 leading-relaxed" style={{ fontSize: '0.85rem' }}>
                          {tool.description}
                        </p>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24 text-center">
          <RevealOnScroll>
            <SectionLabel className="text-white/60 mb-4">Capability</SectionLabel>
            <h2
              className="font-serif font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}
            >
              Platform questions or stack requirements?
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto" style={{ fontSize: '0.95rem' }}>
              Our team can advise on technology selection, integration architecture, and migration pathways for your spatial data environment.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center font-sans font-medium tracking-wide transition-colors duration-200 px-6 py-3 text-sm bg-transparent text-white border border-white/60 hover:bg-white hover:text-navy"
            >
              Discuss Technology Requirements
            </a>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
