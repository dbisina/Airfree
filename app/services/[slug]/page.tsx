import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {PageHero} from "@/components/sections/PageHero";
import {RevealOnScroll} from "@/components/ui/RevealOnScroll";
import {SectionLabel} from "@/components/ui/SectionLabel";
import {Button} from "@/components/ui/Button";
import { image } from "framer-motion/client";

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

const SERVICE_DETAILS: Record<
  string,
  {
    overview: string;
    contextTitle: string;
    contextBody: string;
    solutions: {title: string; description: string}[];
    standards?: string[];
  }
> = {
  "gis-spatial": {
    overview:
      "Enterprise GIS is not simply a collection of maps and layers — it is a managed spatial data ecosystem: a structured architecture of databases, services, governance frameworks, and analytical platforms that enables an organisation to create, store, manage, share, and use spatially referenced information at institutional scale. Airfree Geospatial designs and deploys Spatial Data Infrastructure (SDI) systems that are production-grade, OGC-compliant, and structured to meet the data governance, interoperability, and security requirements of government agencies, utility operators, and large engineering organisations.",
    contextTitle: "The Infrastructure Problem",
    contextBody:
      "Many government and enterprise organisations accumulate spatial data across disconnected systems — desktop GIS installations, shared drives, proprietary formats, and siloed databases — without a coherent architecture for managing, validating, or sharing that data. This results in data duplication, version conflicts, accuracy degradation, and regulatory non-compliance. Enterprise GIS infrastructure resolves these systemic failures through architectural design.",
    solutions: [
      {
        title: "Spatial Database Architecture",
        description:
          "PostGIS spatial database design and deployment. Feature class schema, topology rule configuration, domain and subtype management, GIST spatial indexing, and performance tuning for large-volume enterprise datasets.",
      },
      {
        title: "GIS Server Deployment",
        description:
          "GeoServer and MapServer installation, configuration, and administration. OGC service publication (WMS, WFS, WCS, WMTS), security configuration, caching strategy, and high-availability clustering.",
      },
      {
        title: "SDI Framework Design",
        description:
          "End-to-end Spatial Data Infrastructure design aligned with ANZLIC, ICSM, and ISO 19100 standards. Data custodianship models, metadata schemas, service catalogue architecture, and multi-agency interoperability frameworks.",
      },
      {
        title: "Data Lifecycle Management",
        description:
          "Spatial data quality assurance workflows, versioned dataset management, archival strategies, and automated validation pipelines ensuring ongoing data integrity across the organisation.",
      },
      {
        title: "Enterprise Integration",
        description:
          "Connecting spatial data infrastructure to enterprise systems — ERP, asset management, SCADA — enabling spatially aware operational decision-making across all business functions.",
      },
      {
        title: "Governance & Compliance",
        description:
          "Spatial data governance frameworks, metadata management protocols, and compliance documentation aligned with federal and state spatial data standards and privacy legislation.",
      },
    ],
    standards: [
      "OGC WMS/WFS/WCS",
      "ISO 19100 Series",
      "ANZLIC",
      "ICSM",
      "INSPIRE",
    ],
  },
  "digital-mapping": {
    overview:
      "Modern geospatial decision-making requires more than desktop GIS. Airfree Geospatial develops and deploys interactive web-based GIS platforms that make spatial data accessible to decision-makers, field teams, and the public — without requiring specialist GIS software. Our web GIS implementations are built on open standards and production-tested stacks suitable for government portals, corporate dashboards, and public-facing map services.",
    contextTitle: "The Accessibility Gap",
    contextBody:
      "Valuable spatial data locked in desktop GIS systems cannot support real-time decision-making, cross-team collaboration, or mobile field operations. Web GIS platforms bridge this gap by delivering spatial intelligence through standard web browsers and mobile devices, without compromising data accuracy or governance.",
    solutions: [
      {
        title: "Custom Web GIS Portals",
        description:
          "Bespoke web GIS portal development using OpenLayers or Leaflet. Custom UI/UX design, layer management, spatial querying, and print templates. Built for government, utilities, and enterprise environments.",
      },
      {
        title: "ArcGIS Online & Portal Configuration",
        description:
          "ArcGIS Online and ArcGIS Enterprise Portal setup, configuration, and administration. Web map and web app design, hosted feature layer management, and organisational user administration.",
      },
      {
        title: "Real-Time Spatial Dashboards",
        description:
          "Operational dashboards integrating live spatial data feeds. Asset tracking, field crew locations, sensor data mapping, and real-time event layers for utility and infrastructure operations.",
      },
      {
        title: "MapBox & Open-Source Stacks",
        description:
          "High-performance map applications using MapBox GL JS for advanced cartographic rendering. Suitable for public-facing map portals requiring smooth interaction across desktop and mobile.",
      },
      {
        title: "GeoNode Deployments",
        description:
          "Open-source spatial data catalogue and web GIS deployments using GeoNode. Self-hosted, OGC-compliant data sharing platforms for government and research organisations.",
      },
      {
        title: "Mobile GIS Applications",
        description:
          "Mobile-optimised web GIS applications for field data collection, inspection recording, and offline mapping. GPS-integrated attribute capture and geotagged photo management.",
      },
    ],
    standards: ["OGC WMS/WFS", "Open Geospatial APIs", "W3C Web Standards"],
  },
  "drone-photogrammetry": {
    overview:
      "Airfree Geospatial operates end-to-end UAV survey programs from flight planning and regulatory compliance through to final deliverable production. Our photogrammetric workflows produce survey-grade spatial outputs: point clouds, 3D meshes, orthomosaics, digital surface and terrain models. Every dataset is validated for geometric accuracy and delivered with full metadata and processing reports.",
    contextTitle: "Why Photogrammetry",
    contextBody:
      "Traditional ground survey methods are slow, expensive, and often dangerous for inaccessible or active infrastructure sites. UAV photogrammetry achieves comparable spatial accuracy at a fraction of the cost and time, with the additional capability of producing three-dimensional outputs — point clouds and surface models — that ground surveys cannot efficiently deliver.",
    solutions: [
      {
        title: "UAV Survey Operations",
        description:
          "CASA-compliant UAV survey flight planning and execution. Site risk assessment, airspace authorisation, ground control point placement, and systematic coverage flight patterns for photogrammetric acquisition.",
      },
      {
        title: "Point Cloud Generation & Classification",
        description:
          "Dense point cloud production from photogrammetric image matching. Automated and manual classification of ground, vegetation, building, and infrastructure points. LAS/LAZ format deliverables.",
      },
      {
        title: "Orthomosaic Production",
        description:
          "High-resolution orthophotography production. Geometric correction, colour balancing, and GeoTIFF export at specified GSD. Suitable for cadastral, construction progress, and environmental monitoring applications.",
      },
      {
        title: "Digital Surface & Terrain Models",
        description:
          "DSM and DTM generation from photogrammetric point clouds. Contour extraction, slope and aspect analysis, and cut/fill volume calculations for earthworks and hydrology applications.",
      },
      {
        title: "3D Mesh Modelling",
        description:
          "Textured 3D mesh models for infrastructure inspection, heritage recording, and BIM integration. OBJ, FBX, and Cesium 3D Tiles format export for web visualisation.",
      },
      {
        title: "Volumetric Analysis",
        description:
          "Stockpile volume measurement, cut/fill analysis, and change detection between survey epochs. Accurate to sub-percent volumetric tolerance when combined with RTK ground control.",
      },
    ],
    standards: ["CASA Part 101", "ICSM SP1", "ISO 19157"],
  },
  "remote-sensing": {
    overview:
      "Airfree Geospatial delivers satellite-derived spatial intelligence across continental scales — from single-site change detection to national-scale land classification. Our remote sensing practice uses multispectral, hyperspectral, SAR, and thermal imagery from leading earth observation platforms, combined with machine learning and spectral analysis workflows validated against ground truth data.",
    contextTitle: "The Scale Advantage",
    contextBody:
      "Traditional field survey and UAV operations are constrained by area coverage and revisit frequency. Satellite remote sensing enables monitoring of large areas — thousands of square kilometres — with consistent, repeatable imagery at regular intervals. For vegetation monitoring, environmental compliance, and land-use change detection, satellite data is the only operationally viable solution.",
    solutions: [
      {
        title: "Multispectral & Hyperspectral Analysis",
        description:
          "Image processing and analysis of Sentinel-2, Landsat, PlanetScope, and SPOT imagery. Band combination, spectral index calculation (NDVI, NDWI, NBR), and vegetation/water/soil classification.",
      },
      {
        title: "Change Detection",
        description:
          "Multi-temporal image comparison for land cover change, vegetation loss, coastal erosion, and flood extent mapping. Statistical change analysis with significance testing and uncertainty quantification.",
      },
      {
        title: "ML-Driven Classification",
        description:
          "Machine learning land-cover classification using Random Forest, SVM, and deep learning classifiers. Training data development, accuracy assessment, and change-over-time classification series.",
      },
      {
        title: "SAR Analysis",
        description:
          "Synthetic Aperture Radar analysis using Sentinel-1 data. Surface deformation monitoring, flood mapping under cloud cover, and soil moisture estimation for agriculture and water management.",
      },
      {
        title: "Google Earth Engine Processing",
        description:
          "Cloud-based large-area analysis using Google Earth Engine. Continental-scale vegetation indices, time-series trend analysis, and export of processed imagery products.",
      },
      {
        title: "Environmental Monitoring Programs",
        description:
          "Structured satellite monitoring programs for regulatory reporting. Quarterly or annual vegetation condition reports, habitat extent tracking, and trend analysis aligned with environmental authority requirements.",
      },
    ],
    standards: ["ESA Copernicus", "OGC Earth Observation", "ISO 19157"],
  },
  "infrastructure-utility": {
    overview:
      "Utility network operators and infrastructure asset managers require spatially accurate, operationally integrated GIS systems — not just maps. Airfree Geospatial designs and implements utility GIS environments that support network tracing, asset management, maintenance scheduling, and regulatory reporting. Our systems are built to operate within the data governance and interoperability requirements of regulated utility environments.",
    contextTitle: "Infrastructure Complexity",
    contextBody:
      "Modern utility networks — water, gas, electricity, telecommunications — are spatially complex assets operating under strict regulatory frameworks. Accurate spatial data is essential for fault localisation, maintenance planning, compliance reporting, and capital works coordination. Many operators still manage these assets across disconnected systems, creating operational risk and regulatory exposure.",
    solutions: [
      {
        title: "Utility Network Design & Implementation",
        description:
          "Esri Utility Network and Geometric Network design and implementation for water, gas, and electricity distribution systems. Network topology rules, asset classification schemas, and trace configuration.",
      },
      {
        title: "Asset Register Systems",
        description:
          "Spatial asset register development for linear and point infrastructure assets. Attribute schema design, data migration, and integration with enterprise asset management systems (Maximo, SAP, TechOne).",
      },
      {
        title: "Network Tracing & Analysis",
        description:
          "Upstream/downstream tracing, isolation zone identification, and customer impact analysis. Configured for water distribution, gas reticulation, and electricity feeder networks.",
      },
      {
        title: "Field Operations Integration",
        description:
          "Mobile GIS integration for field crews. Work order mapping, GPS-enabled asset inspection, photo capture, and real-time status update to enterprise systems.",
      },
      {
        title: "Infrastructure Condition Monitoring",
        description:
          "Spatial management of inspection programs and condition ratings. Automated deterioration modelling, maintenance priority mapping, and capital planning spatial analysis.",
      },
      {
        title: "Regulatory Reporting & Compliance",
        description:
          "Spatial data management supporting AER, IPART, ESC, and infrastructure regulator reporting requirements. Asset register validation, GIS data audit, and compliance dataset preparation.",
      },
    ],
    standards: [
      "Esri Utility Network",
      "OGC Standards",
      "Australian Infrastructure Regulations",
    ],
  },
  "survey-data": {
    overview:
      "Spatial data quality is not optional in government, utility, and infrastructure environments — it is a legal and operational requirement. Airfree Geospatial provides specialist survey data validation, QA/QC workflow design, and spatial standards compliance services. We work with survey datasets at all scales, from cadastral boundary data to large-scale infrastructure corridor surveys, ensuring that data delivered into enterprise spatial systems meets defined accuracy, completeness, and standards requirements.",
    contextTitle: "Data Quality Risk",
    contextBody:
      "Survey data entering enterprise GIS environments without rigorous QA/QC carries significant operational and legal risk. Coordinate system errors, topology violations, attribute inconsistencies, and metadata gaps can propagate silently through data management systems — compromising decisions made years after the original survey. Systematic validation workflows prevent these failures at source.",
    solutions: [
      {
        title: "Survey Data Validation",
        description:
          "Automated and manual validation of survey datasets against defined accuracy standards. Coordinate comparison, topology checking, attribute completeness audit, and outlier detection using QGIS and Python scripting.",
      },
      {
        title: "ISO 19100 & ICSM Compliance",
        description:
          "Assessment and remediation of spatial datasets against ISO 19100 series standards and ICSM Survey Practice guidelines. Metadata completeness checking and standards gap reporting.",
      },
      {
        title: "CRS Management",
        description:
          "Coordinate Reference System audit, transformation, and documentation. GDA94/GDA2020 transformation, MGA zone validation, and vertical datum reconciliation for multi-epoch survey datasets.",
      },
      {
        title: "FME Validation Workflows",
        description:
          "Automated data validation pipeline design using FME. Multi-rule validation schemas, exception reporting, and remediation workflow development for survey data intake and ongoing QA.",
      },
      {
        title: "Metadata Standards",
        description:
          "ISO 19115/19139 metadata creation, validation, and catalogue integration. ANZLIC metadata schema compliance and GeoCat-compatible metadata export for government data catalogues.",
      },
      {
        title: "QA Documentation",
        description:
          "Survey accuracy report production, data quality statements (DQS), and compliance certificates for project handover and regulatory submission.",
      },
    ],
    standards: [
      "ISO 19100 Series",
      "ICSM Survey Practice",
      "ANZLIC Metadata Profile",
      "GDA2020",
    ],
  },
  environmental: {
    overview:
      "Environmental planning, management, and reporting increasingly depends on spatially accurate, satellite-derived intelligence about vegetation extent, condition, change, and biodiversity value. Airfree Geospatial delivers geospatial analytics for environmental consultancies, government agencies, and natural resource management bodies — from habitat mapping and ecological corridor delineation to carbon stock estimation and biodiversity offset accounting.",
    contextTitle: "Regulatory Context",
    contextBody:
      "Environmental impact assessment, native vegetation clearing approvals, biodiversity offset calculations, and carbon methodology compliance all require spatially explicit data meeting regulatory standards. Inaccurate or incomplete spatial data in these contexts carries legal liability, project delays, and environmental risk. Specialist geospatial capability is essential for defensible environmental spatial analysis.",
    solutions: [
      {
        title: "Habitat Mapping & Classification",
        description:
          "Vegetation community mapping using satellite imagery, UAV photogrammetry, and field-validated spectral classification. Output to Esri, QGIS, and state vegetation mapping standards.",
      },
      {
        title: "Ecological Corridor Analysis",
        description:
          "Wildlife corridor delineation, connectivity analysis, and barrier identification using least-cost path and circuit theory methods. Output for biodiversity assessment and planning applications.",
      },
      {
        title: "Carbon Stock Estimation",
        description:
          "Above-ground biomass estimation using remote sensing indices, allometric relationships, and field plot calibration. Methodology-aligned with ERF and ACCU offset schemes.",
      },
      {
        title: "Environmental Impact Zone Mapping",
        description:
          "Project impact footprint delineation, buffer zone generation, and ecological sensitivity layer overlay. Spatial analysis supporting EPBC Act referrals and state EIA submissions.",
      },
      {
        title: "Vegetation Change Detection",
        description:
          "Multi-temporal satellite analysis to detect clearing events, regrowth, and vegetation condition change. Time-series reporting for native vegetation management plans and offset compliance monitoring.",
      },
      {
        title: "NRM & Biodiversity Registers",
        description:
          "Spatial data management for natural resource management programs. Biodiversity feature registers, invasive species mapping, waterway condition mapping, and weed treatment record spatial management.",
      },
    ],
    standards: [
      "EPBC Act",
      "ERF Methodology",
      "State Native Vegetation Acts",
      "ISO 19157",
    ],
  },
};

export async function generateStaticParams() {
  return SERVICES.map((s) => ({slug: s.slug}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  return {
    title: service
      ? `${service.shortTitle} | Airfree Geospatial`
      : "Services | Airfree Geospatial",
    description: service
      ? service.description
      : "Geospatial services from Airfree Geospatial.",
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const detail = SERVICE_DETAILS[slug];

  if (!service || !detail) notFound();

  return (
    <>
      <PageHero
        label={`Service ${service.number}`}
        title={service.title}
        subtitle={service.description}
        breadcrumb={{label: "Services", href: "/services"}}
        imageKey="services"
      />

      {/* Overview */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <RevealOnScroll>
              <SectionLabel className="mb-4">Overview</SectionLabel>
              <h2
                className="font-serif font-bold text-navy mb-6 leading-tight"
                style={{fontSize: "clamp(1.3rem, 2.5vw, 2.25rem)"}}
              >
                {service.shortTitle}
              </h2>
              <p
                className="text-ink-2 leading-relaxed"
                style={{fontSize: "0.95rem"}}
              >
                {detail.overview}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <div className="border border-border-s bg-surface p-6 sm:p-8">
                <h3
                  className="font-serif font-semibold text-navy mb-4"
                  style={{fontSize: "1.1rem"}}
                >
                  {detail.contextTitle}
                </h3>
                <p
                  className="text-ink-2 leading-relaxed"
                  style={{fontSize: "0.9rem"}}
                >
                  {detail.contextBody}
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <RevealOnScroll>
            <SectionLabel className="mb-4">Solutions Provided</SectionLabel>
            <h2
              className="font-serif font-bold text-navy mb-12 leading-tight"
              style={{fontSize: "clamp(1.3rem, 2.5vw, 2.25rem)"}}
            >
              What We Deliver
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detail.solutions.map((solution, i) => (
              <RevealOnScroll key={solution.title} delay={i * 0.08}>
                <div className="bg-white border border-border-s p-5 sm:p-7 h-full">
                  <div className="w-8 h-0.5 bg-brand-blue mb-4" />
                  <h3
                    className="font-serif font-semibold text-navy mb-3"
                    style={{fontSize: "1rem"}}
                  >
                    {solution.title}
                  </h3>
                  <p
                    className="text-ink-2 leading-relaxed"
                    style={{fontSize: "0.875rem"}}
                  >
                    {solution.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Standards */}
      {detail.standards && detail.standards.length > 0 && (
        <section className="bg-navy py-12 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
            <RevealOnScroll>
              <SectionLabel className="text-white/60 mb-6">
                Standards & Protocols
              </SectionLabel>
              <div className="flex flex-wrap gap-3">
                {detail.standards.map((std) => (
                  <span
                    key={std}
                    className="font-mono border border-white/20 px-3 py-1.5 text-white/70"
                    style={{fontSize: "0.7rem"}}
                  >
                    {std}
                  </span>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 text-center">
          <RevealOnScroll>
            <h2
              className="font-serif font-bold text-navy mb-4"
              style={{fontSize: "clamp(1.4rem, 2.5vw, 2rem)"}}
            >
              Request a Capability Statement
            </h2>
            <p
              className="text-ink-2 mb-8 max-w-md mx-auto"
              style={{fontSize: "0.95rem"}}
            >
              Contact our team to discuss your project requirements and receive
              a tailored capability statement for procurement purposes.
            </p>
            <Button href="/contact" variant="primary">
              Contact
            </Button>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
