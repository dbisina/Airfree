import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/sections/PageHero';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { SectionLabel } from '@/components/ui/SectionLabel';

export const metadata: Metadata = {
  title: 'Industries | Airfree Geospatial',
  description: 'We work with local and federal government, utility networks, mining companies, construction firms, and environmental agencies. Spatial data services across eight sectors.',
};

const STATS = [
  { value: '8', label: 'Industry Sectors' },
  { value: '7', label: 'Service Domains' },
  { value: 'AU', label: 'Jurisdiction' },
  { value: 'ENT', label: 'Enterprise Grade' },
];

const SECTORS = [
  {
    number: '01',
    title: 'Government & Public Administration',
    description:
      'Federal, state, and local government agencies rely on spatially accurate, audit-ready data systems to fulfil statutory obligations, manage public assets, and plan infrastructure. Airfree Geospatial delivers SDI frameworks, spatial data governance, and compliant mapping platforms built to the standards required by Australian government environments.',
    capabilities: [
      {
        name: 'Spatial Data Infrastructure (SDI)',
        description:
          'End-to-end SDI design aligned with ANZLIC and ICSM frameworks for multi-agency data sharing and OGC-compliant service publication.',
      },
      {
        name: 'Land & Asset Register Systems',
        description:
          'Authoritative spatial asset registers for government land, property, and infrastructure assets with full attribute management.',
      },
      {
        name: 'Planning & Compliance Mapping',
        description:
          'Zoning, development constraint, and land use mapping systems supporting statutory planning and regulatory assessment workflows.',
      },
      {
        name: 'Emergency Management Spatial Systems',
        description:
          'Operational GIS platforms for emergency management coordination, evacuation route mapping, and incident spatial tracking.',
      },
    ],
  },
  {
    number: '02',
    title: 'Utility Networks',
    description:
      'Water, gas, electricity, and telecommunications operators managing distributed network assets across large service territories require GIS systems built for operational precision. Airfree Geospatial implements utility network GIS, asset registers, and field operations integration for regulated utility environments.',
    capabilities: [
      {
        name: 'Utility Network GIS',
        description:
          'Esri Utility Network design and implementation for water, gas, and electricity distribution with full topology and trace capability.',
      },
      {
        name: 'AMI Spatial Analytics',
        description:
          'Spatial integration of advanced metering infrastructure data for demand analysis, outage correlation, and customer impact mapping.',
      },
      {
        name: 'Outage Management Mapping',
        description:
          'Real-time outage spatial management, isolation zone mapping, and customer notification spatial analysis.',
      },
      {
        name: 'Infrastructure Asset Registers',
        description:
          'Spatial asset registers for linear and point network assets integrated with enterprise asset management systems.',
      },
    ],
  },
  {
    number: '03',
    title: 'Critical Infrastructure',
    description:
      'Transport corridors, ports, airports, and national security infrastructure require high-accuracy spatial data under strict data governance requirements. Our spatial systems for critical infrastructure prioritise accuracy, security classification compliance, and long-term data integrity.',
    capabilities: [
      {
        name: 'Corridor GIS',
        description:
          'Linear infrastructure corridor mapping, easement management, and multi-modal network spatial data management for transport authorities.',
      },
      {
        name: 'Condition Monitoring Spatial Systems',
        description:
          'Asset condition rating spatial management, inspection program mapping, and deterioration trend spatial analysis.',
      },
      {
        name: 'BIM-GIS Integration',
        description:
          'Integration of Building Information Modelling data with GIS spatial context for construction, operation, and maintenance workflows.',
      },
      {
        name: 'Infrastructure Safety Mapping',
        description:
          'Hazard zone mapping, exclusion areas, and safety buffer spatial management for critical asset environments.',
      },
    ],
  },
  {
    number: '04',
    title: 'Mining & Resources',
    description:
      'Mining operations from exploration through production and rehabilitation require integrated spatial data management across site, environmental, and operational functions. Airfree Geospatial supports spatial data management across the full resource project lifecycle.',
    capabilities: [
      {
        name: 'Mine Site Mapping',
        description:
          'High-accuracy site mapping from UAV photogrammetry and ground survey. Pit boundary management, infrastructure layout, and progress monitoring.',
      },
      {
        name: 'Drill Hole Spatial Data',
        description:
          'Spatial management of exploration drill hole data. 3D collar locations, downhole survey, and geological domain delineation.',
      },
      {
        name: 'Environmental Compliance GIS',
        description:
          'Spatial management of environmental monitoring programs, discharge point locations, vegetation offset areas, and rehabilitation progress.',
      },
      {
        name: 'Rehabilitation Monitoring',
        description:
          'Satellite-derived vegetation establishment monitoring for post-mining rehabilitation compliance reporting.',
      },
    ],
  },
  {
    number: '05',
    title: 'Construction & Engineering',
    description:
      'Civil contractors and project managers requiring survey-grade spatial data, progress tracking, and coordination across large construction programs depend on accurate, timely spatial deliverables. Airfree Geospatial provides UAV survey operations, photogrammetric processing, and spatial data management for active construction environments.',
    capabilities: [
      {
        name: 'Site Survey & Mapping',
        description:
          'UAV and ground control survey for construction sites. Orthomosaics, DSM/DTM, and volume calculations at defined survey frequencies.',
      },
      {
        name: 'Construction Progress Monitoring',
        description:
          'Multi-epoch photogrammetric comparison to quantify earthworks progress, identify schedule deviations, and support certification.',
      },
      {
        name: 'Subcontractor Coordination GIS',
        description:
          'Shared spatial platforms for multi-party construction program coordination, work zone allocation, and utilities conflict management.',
      },
      {
        name: 'Volume & Earthworks Analysis',
        description:
          'Cut/fill volume calculation, stockpile measurement, and earthworks balance analysis from UAV-derived surface models.',
      },
    ],
  },
  {
    number: '06',
    title: 'Agriculture & Rural Land',
    description:
      'Large-scale agricultural operations, water authorities, and rural landholders managing property boundaries, irrigation systems, and crop production data require spatial systems that operate in remote and low-connectivity environments. Airfree Geospatial delivers practical spatial data solutions for rural and agricultural contexts.',
    capabilities: [
      {
        name: 'Property Boundary Management',
        description:
          'Cadastral boundary management, title boundary validation, and rural property spatial register development and maintenance.',
      },
      {
        name: 'Crop Mapping & Health Monitoring',
        description:
          'Multispectral satellite and UAV imagery analysis for crop health assessment, weed detection, and yield zone delineation.',
      },
      {
        name: 'Irrigation Planning',
        description:
          'Spatial analysis of irrigation network infrastructure, water allocation zones, and soil moisture mapping for irrigation scheduling.',
      },
      {
        name: 'Soil Classification Mapping',
        description:
          'Spatial soil type classification and erosion risk mapping using remote sensing and field-validated spectral analysis.',
      },
    ],
  },
  {
    number: '07',
    title: 'Environmental Agencies',
    description:
      'Natural resource management bodies, conservation organisations, and environmental consultancies require satellite-derived ecological data and regulatory-compliant spatial reporting. Airfree Geospatial delivers geospatial analytics aligned with Australian environmental legislation and NRM frameworks.',
    capabilities: [
      {
        name: 'Habitat Mapping',
        description:
          'Vegetation community mapping and threatened ecological community delineation using satellite imagery and field-validated classification.',
      },
      {
        name: 'NRM Planning GIS',
        description:
          'Spatial planning support for natural resource management programs, catchment management, and invasive species response.',
      },
      {
        name: 'Biodiversity Registers',
        description:
          'Spatial biodiversity feature registers, fauna survey location management, and offset area tracking for regulatory compliance.',
      },
      {
        name: 'Water Catchment Monitoring',
        description:
          'Catchment-scale satellite monitoring of vegetation cover, riparian condition, and surface water extent for NRM reporting.',
      },
    ],
  },
  {
    number: '08',
    title: 'Urban Planning',
    description:
      'Local government planning departments and urban developers requiring spatial analysis of zoning, development applications, land use change, and urban growth modelling depend on accurate, current spatial data. Airfree Geospatial supports planning functions with web GIS platforms, spatial analysis, and data management infrastructure.',
    capabilities: [
      {
        name: 'Zoning Analysis GIS',
        description:
          'Zoning scheme spatial management, overlay mapping, and development constraint analysis for planning assessment workflows.',
      },
      {
        name: 'Development Application Mapping',
        description:
          'Spatial management of development application lifecycles, site context mapping, and notification area generation.',
      },
      {
        name: 'Land Use Monitoring',
        description:
          'Multi-temporal satellite and cadastral analysis to track land use change, infill development, and greenfield conversion.',
      },
      {
        name: 'Urban Heat & Growth Analysis',
        description:
          'Urban heat island mapping from thermal satellite data and urban growth modelling for long-range planning studies.',
      },
    ],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        label="Industry Sectors"
        title="Sectors We Support"
        subtitle="Enterprise spatial intelligence across Australia's most demanding institutional and industrial sectors."
        imageKey="industries"
      />

      {/* Stats strip */}
      <div className="bg-navy border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {STATS.map((stat) => (
              <div key={stat.label} className="py-8 px-6 text-center">
                <div
                  className="font-serif font-bold text-white mb-1"
                  style={{ fontSize: '2rem' }}
                >
                  {stat.value}
                </div>
                <div className="font-mono text-[0.6rem] tracking-widest uppercase text-white/40">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sector sections */}
      {SECTORS.map((sector, i) => (
        <section
          key={sector.number}
          className={`py-16 ${i % 2 === 0 ? 'bg-white' : 'bg-surface'}`}
        >
          <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left */}
              <RevealOnScroll>
                <SectionLabel className="mb-3">Sector {sector.number}</SectionLabel>
                <h2
                  className="font-serif font-bold text-navy mb-5 leading-tight"
                  style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                >
                  {sector.title}
                </h2>
                <p className="text-ink-2 leading-relaxed mb-6" style={{ fontSize: '0.9rem' }}>
                  {sector.description}
                </p>
                <Link
                  href="/contact"
                  className="font-sans font-medium text-brand-blue text-sm hover:text-navy transition-colors"
                >
                  Discuss Requirements &rarr;
                </Link>
              </RevealOnScroll>

              {/* Right */}
              <RevealOnScroll delay={0.12}>
                <h3
                  className="font-mono text-[0.6rem] tracking-widest uppercase text-ink-3 mb-5"
                >
                  How Airfree Supports {sector.title}
                </h3>
                <div className="space-y-5">
                  {sector.capabilities.map((cap) => (
                    <div key={cap.name} className="border-l-2 border-brand-blue/30 pl-4">
                      <div
                        className="font-serif font-semibold text-navy mb-1"
                        style={{ fontSize: '0.95rem' }}
                      >
                        {cap.name}
                      </div>
                      <p className="text-ink-2 leading-relaxed" style={{ fontSize: '0.85rem' }}>
                        {cap.description}
                      </p>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 text-center">
          <RevealOnScroll>
            <SectionLabel className="text-white/60 mb-4">Engagement</SectionLabel>
            <h2
              className="font-serif font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}
            >
              Discuss your sector requirements
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto" style={{ fontSize: '0.95rem' }}>
              Contact our team to discuss capability alignment, procurement options, and engagement models relevant to your sector.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-sans font-medium tracking-wide transition-colors duration-200 px-6 py-3 text-sm bg-transparent text-white border border-white/60 hover:bg-white hover:text-navy"
            >
              Contact Us
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
