export const SITE_NAME = 'Airfree Geospatial Pty Ltd';
export const SITE_ABN = '698 093 239';
export const SITE_EMAIL = 'info@airfreegeospatial.com.au';
export const SITE_PHONE = '+61 (0) XXX XXX XXX';
export const SITE_TAGLINE = 'Enterprise Spatial Intelligence & Infrastructure Analytics';

export const SERVICES = [
  {
    image: 'Images/gisinfra.jpg',
    slug: "gis-spatial",
    number: "01",
    title: "Enterprise GIS & Spatial Infrastructure Systems",
    shortTitle: "GIS Infrastructure",
    description:
      "Design and deployment of enterprise-grade GIS infrastructure including PostGIS architecture, spatial databases, and scalable geospatial systems for organizations.",
    tags: ["PostGIS", "GeoServer", "SDI", "ArcGIS Server", "INSPIRE"],
    
  },

  {
    image: 'Images/digitalmap.png',
    slug: "digital-mapping",
    number: "02",
    title: "Digital Mapping & Web GIS Platforms",
    shortTitle: "Web GIS Platforms",
    description:
      "Interactive web-based GIS platforms and dashboards for real-time spatial visualization, decision-making, and data exploration.",
    tags: ["Leaflet.js", "OpenLayers", "Mapbox", "ArcGIS Online", "GeoNode"],
   
  },

  {
    image: 'Images/dronemap.png',
    slug: "drone-photogrammetry",
    number: "03",
    title: "Drone, Photogrammetry & 3D Spatial Engineering",
    shortTitle: "Drone & 3D Mapping",
    description:
      "UAV surveying, photogrammetry, LiDAR processing, 3D modeling, and volumetric analysis for engineering and terrain reconstruction.",
    tags: ["Pix4D", "Agisoft", "DJI Terra", "LiDAR", "CloudCompare"],
    
  },

  {
    image: 'Images/gisinfra.jpg',
    slug: "remote-sensing",
    number: "04",
    title: "Remote Sensing & Satellite Analytics",
    shortTitle: "Satellite Analytics",
    description:
      "Satellite image processing, land use classification, change detection, and AI-driven earth observation analytics at scale.",
    tags: ["Google Earth Engine", "Sentinel Hub", "ENVI", "GDAL", "Python"],
    
  },

  {
    image: 'Images/gisinfra.jpg',
    slug: "infrastructure-utility",
    number: "05",
    title: "Infrastructure & Utility Spatial Systems",
    shortTitle: "Utility GIS Systems",
    description:
      "GIS solutions for utility networks, asset management, and infrastructure planning for water, gas, power, and transport systems.",
    tags: ["Network Analysis", "ArcGIS Utility Network", "QGIS", "AM/FM", "OSM"],
    
  },

  {
    image: 'Images/gisinfra.jpg',
    slug: "survey-data",
    number: "06",
    title: "Survey Data QA/QC & Spatial Standards",
    shortTitle: "Data QA/QC",
    description:
      "Quality control, validation, and compliance of spatial datasets aligned with ISO 19100 and international geospatial standards.",
    tags: ["ISO 19100", "FME", "QGIS", "Metadata", "Python"],
    
  },

  {
    image: 'Images/gisinfra.jpg',
    slug: "environmental",
    number: "07",
    title: "Environmental & Ecological Geospatial Analytics",
    shortTitle: "Environmental GIS",
    description:
      "Environmental monitoring, ecological mapping, carbon tracking, and sustainability-focused spatial analytics for natural systems.",
    tags: ["Google Earth Engine", "ENVI", "TerrSet", "ArcGIS Pro", "Python"],
   
  },
];

export const LOCATIONS = [
  { id: 'adelaide', label: 'Head Office', city: 'Adelaide, SA', address: ['35 Cassia Street', 'Munno Para West', 'SA 5115, Australia'] },
  { id: 'perth', label: 'Branch Office', city: 'Perth, WA', address: ['8 Seddon Way', 'Canning Vale', 'WA 6155, Australia'] },
  { id: 'melbourne', label: 'Branch Office', city: 'Melbourne, VIC', address: ['324 Settlement Road', 'Thomastown', 'VIC 3072, Australia'] },
];

export const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80',
  'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1920&q=80',
];

export const NAV_LINKS = [
  { href: '/about', label: 'About' },
  {
    href: '/services',
    label: 'Services',
    children: SERVICES.map(s => ({ href: `/services/${s.slug}`, label: s.shortTitle })),
  },
  { href: '/products', label: 'Products' },
  { href: '/industries', label: 'Industries' },
  { href: '/projects', label: 'Projects' },
];
