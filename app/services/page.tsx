import type {Metadata} from "next";
import {PageHero} from "@/components/sections/PageHero";
import {RevealOnScroll} from "@/components/ui/RevealOnScroll";
import {SectionLabel} from "@/components/ui/SectionLabel";
import {Button} from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | Airfree Geospatial",
  description:
    "GIS implementation, drone surveys, satellite imagery analysis, utility network mapping, and environmental spatial reporting. Based in Adelaide with offices across Australia.",
};

const SERVICES = [
  {
    image: 'Images/gisinfra.jpg',
    slug: "gis-spatial",
    number: "01",
    title: "Enterprise GIS & Spatial Infrastructure Systems",
    shortTitle: "GIS & Spatial Infrastructure",
    description:
      "Design, deployment and management of enterprise-grade spatial data infrastructure. PostGIS database architecture, GIS server deployment, SDI frameworks, and end-to-end spatial data lifecycle management for government and enterprise.",
    tags: [
      "PostGIS",
      "GeoServer",
      "SDI Frameworks",
      "ArcGIS Server",
      "INSPIRE",
    ],
  },
  {
    image: 'Images/digitalmap.png',
    slug: "digital-mapping",
    number: "02",
    title: "Digital Mapping & Web GIS Platforms",
    shortTitle: "Digital Mapping & Web GIS",
    description:
      "Development and deployment of interactive web-based GIS platforms and geospatial dashboards for institutional decision-support environments.",
    tags: ["Leaflet.js", "OpenLayers", "ArcGIS Online", "MapBox GL", "GeoNode"],
  },
  {
    image: 'Images/dronemap.png',
    slug: "drone-photogrammetry",
    number: "03",
    title: "Drone, Photogrammetry & 3D Spatial Engineering",
    shortTitle: "Drone & Photogrammetry",
    description:
      "End-to-end UAV survey operations and photogrammetric processing workflows. Point cloud generation, 3D mesh modelling, orthomosaic production, and volumetric analysis.",
    tags: ["Agisoft Metashape", "Pix4D", "DJI Terra", "CloudCompare", "LiDAR"],
  },
  {
    image: 'Images/gisinfra.jpg',
    slug: "remote-sensing",
    number: "04",

    title: "Remote Sensing & Satellite Analytics",
    shortTitle: "Remote Sensing & AI",
    description:
      "Satellite imagery analysis, multispectral classification, change detection, and ML-driven land analysis across large geographic extents using global earth observation platforms.",
    tags: ["ENVI", "Google Earth Engine", "Sentinel Hub", "GDAL", "Python"],
  },
  {
    image: 'Images/gisinfra.jpg',
    slug: "infrastructure-utility",
    number: "05",
    title: "Infrastructure & Utility Spatial Systems",
    shortTitle: "Infrastructure & Utilities",
    description:
      "Geospatial systems for utility networks, asset registers, and infrastructure planning. Network tracing and maintenance GIS for water, gas, and electricity operators.",
    tags: [
      "Esri Utility Network",
      "OpenStreetMap",
      "QGIS",
      "Network Analysis",
      "AM/FM",
    ],
  },
  {
    image: 'Images/gisinfra.jpg',
    slug: "survey-data",
    number: "06",
    title: "Survey Data QA/QC & Spatial Standards",
    shortTitle: "Survey Data & QA/QC",
    description:
      "Quality assurance and standards compliance for surveyed spatial data. ISO 19100, ICSM, and ANZLIC-aligned data validation, coordinate system management, and metadata standards.",
    tags: ["ICSM", "ISO 19100", "FME", "QGIS", "Python"],
  },
  {
    image: 'Images/gisinfra.jpg',
    slug: "environmental",
    number: "07",
    title: "Environmental & Ecological Geospatial Analytics",
    shortTitle: "Environmental Intelligence",
    description:
      "Spatial analytics for environmental monitoring, ecological mapping, and carbon accounting across regulated and natural environments.",
    tags: ["Google Earth Engine", "ENVI", "TerrSet", "ArcGIS Pro", "Python"],
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
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24">
          <RevealOnScroll>
            <SectionLabel className="mb-10">All Services</SectionLabel>
          </RevealOnScroll>

          {/* GRID CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <RevealOnScroll key={service.slug} delay={i * 0.07}>
                <div className="border-b border-border-s py-10">
                  <div className="flex flex-col sm:grid sm:grid-cols-[4rem_1fr_auto] gap-4 sm:gap-8 items-start">
                    {/* Number */}
                    <div className="font-mono text-[0.65rem] tracking-widest text-ink-3 mb-2">
                      {service.number}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-semibold text-navy mb-3 leading-snug text-[1.1rem] group-hover:text-brand-blue transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-ink-2 text-sm leading-relaxed mb-6 flex-1">
                      {service.description}
                    </p>

                    {/* TAGS */}

                    {/* CTA */}
                    <Link href={`/services/${service.slug}`}>
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
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24 text-center">
          <RevealOnScroll>
            <h2
              className="font-serif font-bold text-navy mb-4"
              style={{fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)"}}
            >
              Not sure which service applies?
            </h2>
            <p
              className="text-ink-2 mb-8 max-w-md mx-auto"
              style={{fontSize: "0.95rem"}}
            >
              Contact our team to discuss your project scope and we will
              identify the appropriate service capability and delivery approach.
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
