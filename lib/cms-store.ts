export const CMS_KEY = 'airfree_cms_content';

export interface HeroSlide {
  id: string;
  photo: string;
  label: string;
  heading: string;
  body: string;
  cta_primary: string;
  cta_secondary: string;
}

export interface CMSLocation {
  label: string;
  city: string;
  address_line1: string;
  address_line2: string;
  address_line3: string;
}

export interface CMSService {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  tags: string;       // comma-separated
  overview: string;
}

export interface CMSProject {
  id: string;
  title: string;
  category: string;
  scope: string;
  year: string;
  location: string;
  image: string;
  description: string;
  outcomes: string;   // newline-separated bullet points
  featured: boolean;
}

export interface CMSWMSLayer {
  id: string;
  name: string;
  url: string;
  layers: string;
  format: string;
  transparent: boolean;
  attribution: string;
  visible: boolean;
  opacity: number;
  description: string;
}

export interface CMSPageEntry {
  label: string;
  title: string;
  subtitle: string;
}

export interface CMSSection {
  id: string;
  label: string;
  enabled: boolean;
}

export interface CMSContent {
  company: { name: string; abn: string; tagline: string; email: string; phone: string; phone_note: string; };
  hero: { slides: HeroSlide[]; };
  page_photos: { about: string; services: string; contact: string; industries: string; products: string; projects: string; technology: string; };
  page_content: {
    home: CMSPageEntry;
    about: CMSPageEntry;
    services: CMSPageEntry;
    contact: CMSPageEntry;
    industries: CMSPageEntry;
    products: CMSPageEntry;
    projects: CMSPageEntry;
    technology: CMSPageEntry;
  };
  about_intro: { heading: string; tagline: string; body: string; photo: string; };
  locations: { adelaide: CMSLocation; perth: CMSLocation; melbourne: CMSLocation; };
  footer: {
    brand_tagline: string;
    description: string;
    copyright_entity: string;
    social: {
      linkedin: string;
      twitter: string;
      youtube: string;
      facebook: string;
      instagram: string;
    };
  };
  typography: {
    body_size: number;
    heading_font: string;
    body_font: string;
    nav_font_target: string;
    label_font_target: string;
    button_font_target: string;
    heading_size: number;
    nav_size: number;
    button_size: number;
    label_size: number;
  };
  services: CMSService[];
  projects: CMSProject[];
  wms_layers: CMSWMSLayer[];
  page_sections: {
    home: CMSSection[];
    about: CMSSection[];
    services: CMSSection[];
    contact: CMSSection[];
    industries: CMSSection[];
    projects: CMSSection[];
    products: CMSSection[];
    technology: CMSSection[];
  };
}

export const CMS_DEFAULTS: CMSContent = {
  company: {
    name: 'Airfree Geospatial Pty Ltd',
    abn: '698 093 239',
    tagline: 'Enterprise Spatial Intelligence & Infrastructure Analytics',
    email: 'info@airfreegeospatial.com.au',
    phone: '+61 (0) XXX XXX XXX',
    phone_note: 'For all substantive project enquiries',
  },
  hero: {
    slides: [
      { id: 'slide-1', photo: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=80', label: 'Enterprise GIS & Infrastructure', heading: 'AIRFREE\nGEOSPATIAL', body: 'Mission-critical geospatial solutions for government authorities, utility networks, and large-scale engineering operations across Australia.', cta_primary: 'View Services', cta_secondary: 'Contact Us' },
      { id: 'slide-2', photo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80', label: 'Remote Sensing & Satellite Analytics', heading: 'EARTH\nOBSERVATION', body: 'Satellite imagery analysis, multispectral classification, and change detection — precision-derived intelligence from orbital data across continental extents.', cta_primary: 'View Services', cta_secondary: 'Contact Us' },
      { id: 'slide-3', photo: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80', label: 'Infrastructure Analytics', heading: 'SPATIAL\nINTELLIGENCE', body: 'From utility network mapping to 3D terrain modelling — spatially referencing the built environment with centimetre-level precision for engineering and planning operations.', cta_primary: 'View Services', cta_secondary: 'Contact Us' },
      { id: 'slide-4', photo: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1920&q=80', label: 'Environmental & Survey Services', heading: 'PRECISION\nMAPPING', body: 'End-to-end spatial workflows covering UAV photogrammetry, environmental monitoring, survey QA/QC, and enterprise digital twin platforms at institutional scale.', cta_primary: 'View Services', cta_secondary: 'Contact Us' },
    ],
  },
  page_photos: {
    about: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80',
    services: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&q=80',
    contact: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=80',
    industries: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1600&q=80',
    products: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80',
    projects: 'https://images.unsplash.com/photo-1569396116180-210c182bedb8?w=1600&q=80',
    technology: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=1600&q=80',
  },
  page_content: {
    home:       { label: 'Enterprise Spatial Intelligence', title: 'Airfree Geospatial', subtitle: 'Delivering mission-critical geospatial solutions across Australia.' },
    about:      { label: 'About the Practice', title: 'Enterprise Geospatial Intelligence', subtitle: 'A specialised consultancy serving government, utilities, and large-scale engineering operations across Australia.' },
    services:   { label: 'Service Portfolio', title: 'Enterprise Geospatial Services', subtitle: 'Seven specialised service domains covering the full spectrum of spatial intelligence.' },
    contact:    { label: 'Get in Touch', title: 'Contact the Team', subtitle: 'Project enquiries, panel opportunities, and capability statement requests are welcome.' },
    industries: { label: 'Sectors We Serve', title: 'Industries & Sectors', subtitle: 'Built for organisations where precision, compliance, and spatial accuracy are non-negotiable.' },
    products:   { label: 'Software & Products', title: 'Geospatial Products', subtitle: 'Purpose-built software platforms and spatial data products for enterprise deployments.' },
    projects:   { label: 'Project Portfolio', title: 'Selected Engagements', subtitle: 'A summary of representative project types managed under client confidentiality.' },
    technology: { label: 'Technology Stack', title: 'Our Technology', subtitle: 'Enterprise-grade spatial technology platforms, standards, and software environments.' },
  },
  about_intro: {
    heading: 'About Airfree Geospatial',
    tagline: 'Specialised Geospatial Intelligence',
    body: 'Airfree Geospatial Pty Ltd is a specialised geospatial intelligence and infrastructure analytics consultancy serving government, utilities, and large-scale engineering operations across Australia.',
    photo: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80',
  },
  locations: {
    adelaide: { label: 'Head Office', city: 'Adelaide, SA', address_line1: '35 Cassia Street', address_line2: 'Munno Para West', address_line3: 'SA 5115, Australia' },
    perth:    { label: 'Branch Office', city: 'Perth, WA', address_line1: '8 Seddon Way', address_line2: 'Canning Vale', address_line3: 'WA 6155, Australia' },
    melbourne:{ label: 'Branch Office', city: 'Melbourne, VIC', address_line1: '324 Settlement Road', address_line2: 'Thomastown', address_line3: 'VIC 3072, Australia' },
  },
  footer: {
    brand_tagline: 'Enterprise Spatial Intelligence',
    description: 'A specialised geospatial intelligence and infrastructure analytics consultancy serving government, utilities, and large-scale engineering operations.',
    copyright_entity: 'Airfree Geospatial Pty Ltd',
    social: {
      linkedin: '',
      twitter: '',
      youtube: '',
      facebook: '',
      instagram: '',
    },
  },
  typography: {
    body_size: 18,
    heading_font: 'playfair',
    body_font: 'inter',
    nav_font_target: 'sans',
    label_font_target: 'mono',
    button_font_target: 'sans',
    heading_size: 100,
    nav_size: 100,
    button_size: 100,
    label_size: 100,
  },
  services: [
    { id: 'svc-01', slug: 'gis-spatial',             number: '01', title: 'Enterprise GIS & Spatial Infrastructure Systems',       shortTitle: 'GIS & Spatial Infrastructure', description: 'Design, deployment and management of enterprise-grade spatial data infrastructure. PostGIS database architecture, GIS server deployment, and end-to-end spatial data lifecycle management.', image: '/images/gisinfra.jpg',   tags: 'PostGIS, GeoServer, SDI Frameworks, ArcGIS Server, INSPIRE',          overview: '' },
    { id: 'svc-02', slug: 'digital-mapping',          number: '02', title: 'Digital Mapping & Web GIS Platforms',                   shortTitle: 'Digital Mapping & Web GIS',     description: 'Development and deployment of interactive web-based GIS platforms and geospatial dashboards for institutional decision-support environments.',                                       image: '/images/digitalmap.png', tags: 'Leaflet.js, OpenLayers, ArcGIS Online, MapBox GL, GeoNode',           overview: '' },
    { id: 'svc-03', slug: 'drone-photogrammetry',     number: '03', title: 'Drone, Photogrammetry & 3D Spatial Engineering',         shortTitle: 'Drone & Photogrammetry',        description: 'End-to-end UAV survey operations and photogrammetric processing workflows. Point cloud generation, 3D mesh modelling, and volumetric analysis.',                                    image: '/images/dronemap.png',   tags: 'Agisoft Metashape, Pix4D, DJI Terra, CloudCompare, LiDAR',           overview: '' },
    { id: 'svc-04', slug: 'remote-sensing',           number: '04', title: 'Remote Sensing & Satellite Analytics',                   shortTitle: 'Remote Sensing & AI',           description: 'Satellite imagery analysis, multispectral classification, change detection, and ML-driven land analysis across large geographic extents.',                                           image: '/images/digitalmap.png', tags: 'ENVI, Google Earth Engine, Sentinel Hub, GDAL, Python',              overview: '' },
    { id: 'svc-05', slug: 'infrastructure-utility',   number: '05', title: 'Infrastructure & Utility Spatial Systems',               shortTitle: 'Infrastructure & Utilities',    description: 'Geospatial systems for utility networks, asset registers, and infrastructure planning. Network tracing and maintenance GIS for water, gas, and electricity operators.',             image: '/images/gisinfra.jpg',   tags: 'Esri Utility Network, OpenStreetMap, QGIS, Network Analysis, AM/FM', overview: '' },
    { id: 'svc-06', slug: 'survey-data',              number: '06', title: 'Survey Data QA/QC & Spatial Standards',                  shortTitle: 'Survey Data & QA/QC',           description: 'Quality assurance and standards compliance for surveyed spatial data. ISO 19100, ICSM, and ANZLIC-aligned data validation and metadata management.',                                 image: '/images/gisinfra.jpg',   tags: 'ICSM, ISO 19100, FME, QGIS, Python',                                overview: '' },
    { id: 'svc-07', slug: 'environmental',            number: '07', title: 'Environmental & Ecological Geospatial Analytics',        shortTitle: 'Environmental Intelligence',    description: 'Spatial analytics for environmental monitoring, ecological mapping, and carbon accounting across regulated and natural environments.',                                              image: '/images/dronemap.png',   tags: 'Google Earth Engine, ENVI, TerrSet, ArcGIS Pro, Python',            overview: '' },
  ],
  projects: [
    { id: 'prj-01', title: 'Government Spatial Data Infrastructure Implementation',  category: 'GIS INFRASTRUCTURE', scope: 'Federal / State Government',       year: '2024', location: 'Adelaide, SA', image: '', description: 'End-to-end SDI design and deployment for a government agency managing large-scale land and infrastructure assets. Deliverables included PostGIS spatial database, GeoServer OGC service layer, and metadata catalogue integration.', outcomes: 'PostGIS enterprise spatial database\nOGC-compliant WMS/WFS services\nMulti-agency data sharing framework\nISO 19100 metadata compliance', featured: true },
    { id: 'prj-02', title: 'Underground Utility Network Digitisation & Asset Register', category: 'UTILITY NETWORK',    scope: 'Regulated Utility Operator',       year: '2024', location: 'Perth, WA',    image: '', description: 'Digitisation and attribute enrichment of an underground utility network for a regulated infrastructure operator. Over 12,000 linear and point assets captured, validated against survey records, and integrated with the enterprise asset management system.', outcomes: '12,000+ assets digitised & attributed\nICSM-standard QA/QC validation\nEnterprise AM system integration\nRegulatory reporting dataset produced', featured: true },
    { id: 'prj-03', title: 'UAV Photogrammetry Campaign — Construction Site Volumetrics', category: 'PHOTOGRAMMETRY',  scope: 'Civil Contractor',                year: '2023', location: 'Melbourne, VIC', image: '', description: 'Multi-flight UAV photogrammetry campaign across an active construction site. Ground control established with RTK GNSS. Deliverables included 5cm GSD orthomosaic, classified point cloud, and DSM/DTM for earthworks volume calculation.', outcomes: '5 cm GSD orthomosaic\nClassified LAS point cloud\nDSM & DTM generation\nEarthworks volume certificates', featured: true },
    { id: 'prj-04', title: 'Vegetation Change Detection — Environmental Monitoring',    category: 'REMOTE SENSING',    scope: 'Environmental Management Authority', year: '2023', location: 'Adelaide, SA', image: '', description: 'Multi-temporal Sentinel-2 analysis over a 50,000+ hectare management area. Change detection analysis identified clearing events, regrowth zones, and vegetation condition trends over a 5-year period for regulatory reporting.', outcomes: '50,000+ ha monitored area\nSentinel-2 5-year time-series\nClearing event detection\nAnnual condition trend report', featured: true },
  ],
  wms_layers: [],
  page_sections: {
    home: [
      { id: 'hero',              label: 'Hero Slider',        enabled: true },
      { id: 'capability-strip',  label: 'Capability Strip',   enabled: true },
      { id: 'photo-strip',       label: 'Photo Strip',        enabled: true },
      { id: 'services',          label: 'Service Pillars',    enabled: true },
      { id: 'about',             label: 'About Section',      enabled: true },
      { id: 'industries',        label: 'Industries Teaser',  enabled: true },
      { id: 'cta',               label: 'Contact CTA',        enabled: true },
    ],
    about: [
      { id: 'hero',        label: 'Page Hero',       enabled: true },
      { id: 'mission',     label: 'Mission',         enabled: true },
      { id: 'principles',  label: 'Core Principles', enabled: true },
      { id: 'sectors',     label: 'Sectors',         enabled: true },
      { id: 'cta',         label: 'Contact CTA',     enabled: true },
    ],
    services: [
      { id: 'hero',      label: 'Page Hero',   enabled: true },
      { id: 'list',      label: 'Service List', enabled: true },
      { id: 'cta',       label: 'Footer CTA',  enabled: true },
    ],
    contact: [
      { id: 'hero',  label: 'Page Hero',    enabled: true },
      { id: 'form',  label: 'Contact Form', enabled: true },
    ],
    industries: [
      { id: 'hero',      label: 'Page Hero',    enabled: true },
      { id: 'sectors',   label: 'Sectors Grid', enabled: true },
      { id: 'cta',       label: 'Contact CTA',  enabled: true },
    ],
    projects: [
      { id: 'hero',       label: 'Page Hero',     enabled: true },
      { id: 'disclaimer', label: 'Disclaimer',    enabled: true },
      { id: 'grid',       label: 'Project Cards', enabled: true },
      { id: 'cta',        label: 'Procurement CTA', enabled: true },
    ],
    products: [
      { id: 'hero', label: 'Page Hero', enabled: true },
      { id: 'grid', label: 'Products Grid', enabled: true },
    ],
    technology: [
      { id: 'hero',  label: 'Page Hero',        enabled: true },
      { id: 'stack', label: 'Technology Stack', enabled: true },
    ],
  },
};

export function readCMS(): CMSContent {
  if (typeof window === 'undefined') return CMS_DEFAULTS;
  try {
    const stored = localStorage.getItem(CMS_KEY);
    if (!stored) return CMS_DEFAULTS;
    const parsed = JSON.parse(stored) as Partial<CMSContent>;
    return {
      ...CMS_DEFAULTS,
      ...parsed,
      footer: {
        ...CMS_DEFAULTS.footer,
        ...(parsed.footer || {}),
        social: {
          ...CMS_DEFAULTS.footer.social,
          ...((parsed.footer as { social?: Record<string, string> })?.social || {}),
        },
      },
      page_content: {
        ...CMS_DEFAULTS.page_content,
        ...(parsed.page_content || {}),
      },
      typography: {
        ...CMS_DEFAULTS.typography,
        ...(parsed.typography || {}),
      },
      services:   Array.isArray(parsed.services)   ? parsed.services   : CMS_DEFAULTS.services,
      projects:   Array.isArray(parsed.projects)   ? parsed.projects   : CMS_DEFAULTS.projects,
      wms_layers: Array.isArray(parsed.wms_layers) ? parsed.wms_layers : CMS_DEFAULTS.wms_layers,
      page_sections: {
        ...CMS_DEFAULTS.page_sections,
        ...(parsed.page_sections || {}),
      },
    } as CMSContent;
  } catch {
    return CMS_DEFAULTS;
  }
}
