import type {Metadata} from "next";
import {PageHero} from "@/components/sections/PageHero";
import {RevealOnScroll} from "@/components/ui/RevealOnScroll";
import {SectionLabel} from "@/components/ui/SectionLabel";
import {Button} from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Projects | Airfree Geospatial",
  description:
    "Selected project work including government spatial data infrastructure, utility network digitisation, UAV photogrammetry campaigns, and vegetation monitoring across Australia.",
};

const PROJECT_CARDS = [
  {
    category: "GIS INFRASTRUCTURE",
    title: "Government Spatial Data Infrastructure Implementation",
    scope: "Federal / State Government",
    description:
      "End-to-end SDI design and deployment for a government agency managing large-scale land and infrastructure assets. Deliverables included PostGIS spatial database, GeoServer OGC service layer, and metadata catalogue integration.",
    outcomes: [
      "PostGIS enterprise spatial database",
      "OGC-compliant WMS/WFS services",
      "Multi-agency data sharing framework",
      "ISO 19100 metadata compliance",
    ],
  },
  {
    category: "UTILITY NETWORK",
    title: "Underground Utility Network Digitisation & Asset Register",
    scope: "Regulated Utility Operator",
    description:
      "Digitisation and attribute enrichment of an underground utility network for a regulated infrastructure operator. Over 12,000 linear and point assets captured, validated against survey records, and integrated with the enterprise asset management system.",
    outcomes: [
      "12,000+ assets digitised & attributed",
      "ICSM-standard QA/QC validation",
      "Enterprise AM system integration",
      "Regulatory reporting dataset produced",
    ],
  },
  {
    category: "PHOTOGRAMMETRY",
    title: "UAV Photogrammetry Campaign — Construction Site Volumetrics",
    scope: "Civil Contractor",
    description:
      "Multi-flight UAV photogrammetry campaign across an active construction site. Ground control established with RTK GNSS. Deliverables included 5cm GSD orthomosaic, classified point cloud, and DSM/DTM for earthworks volume calculation.",
    outcomes: [
      "5 cm GSD orthomosaic",
      "Classified LAS point cloud",
      "DSM & DTM generation",
      "Earthworks volume certificates",
    ],
  },
  {
    category: "REMOTE SENSING",
    title: "Vegetation Change Detection — Environmental Monitoring",
    scope: "Environmental Management Authority",
    description:
      "Multi-temporal Sentinel-2 analysis over a 50,000+ hectare management area. Change detection analysis identified clearing events, regrowth zones, and vegetation condition trends over a 5-year period for regulatory reporting.",
    outcomes: [
      "50,000+ ha monitored area",
      "Sentinel-2 5-year time-series",
      "Clearing event detection",
      "Annual condition trend report",
    ],
  },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        label="Project Portfolio"
        title="Selected Engagements"
        subtitle="A summary of representative project types. Specific engagements are managed under client confidentiality."
        imageKey="projects"
      />

      {/* Confidentiality note */}
      <section className="bg-surface py-10">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 text-center">
          <p
            className="text-ink-2 max-w-2xl mx-auto"
            style={{fontSize: "0.9rem"}}
          >
            Airfree Geospatial works on client-confidential engagements across
            government, utilities, and enterprise. Capability Statements
            detailing relevant project experience are available to registered
            procuring organisations upon request.
          </p>
        </div>
      </section>

      {/* Project cards */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <RevealOnScroll>
            <SectionLabel className="mb-10">
              Representative Projects
            </SectionLabel>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECT_CARDS.map((project, i) => (
              <RevealOnScroll key={project.title} delay={i * 0.08}>
                <div className="border border-border-s p-8 bg-white hover:bg-surface transition-colors duration-200 h-full flex flex-col">
                  {/* Category badge */}
                  <div
                    className="font-mono tracking-widest uppercase text-ink-3 mb-3"
                    style={{fontSize: "0.55rem"}}
                  >
                    {project.category}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-serif font-semibold text-navy mb-2 leading-snug"
                    style={{fontSize: "1.1rem"}}
                  >
                    {project.title}
                  </h3>

                  {/* Scope */}
                  <div
                    className="text-ink-3 italic mb-4"
                    style={{fontSize: "0.8rem"}}
                  >
                    {project.scope}
                  </div>

                  {/* Description */}
                  <p
                    className="text-ink-2 leading-relaxed mb-5 flex-1"
                    style={{fontSize: "0.875rem"}}
                  >
                    {project.description}
                  </p>

                  {/* Outcomes */}
                  <ul className="space-y-1.5">
                    {project.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="font-mono text-ink-3"
                        style={{fontSize: "0.65rem"}}
                      >
                        &rarr; {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 text-center">
          <RevealOnScroll>
            <SectionLabel className="text-white/60 mb-4">
              Procurement
            </SectionLabel>
            <h2
              className="font-serif font-bold text-white mb-4"
              style={{fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)"}}
            >
              Request a Capability Statement
            </h2>
            <p
              className="text-white/60 mb-8 max-w-lg mx-auto"
              style={{fontSize: "0.95rem"}}
            >
              Registered procuring organisations may request a formal Capability
              Statement detailing relevant project experience, technical
              competencies, and certifications aligned to their procurement
              requirements.
            </p>
            <Button href="/contact" variant="ghost">
              Contact
            </Button>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
