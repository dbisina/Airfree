export const SITE_NAME = 'Airfree Geospatial Pty Ltd';
export const SITE_ABN = '698 093 239';
export const SITE_EMAIL = 'info@airfreegeospatial.com.au';
export const SITE_PHONE = '+61 (0) XXX XXX XXX';
export const SITE_TAGLINE = 'Enterprise Spatial Intelligence & Infrastructure Analytics';

export const SERVICES = [
  { slug: 'gis-spatial', number: '01', title: 'Enterprise GIS & Spatial Infrastructure Systems', shortTitle: 'GIS & Spatial Infrastructure', description: 'Design, deployment and management of enterprise-grade spatial data infrastructure. PostGIS database architecture, GIS server deployment, and end-to-end spatial data lifecycle management.', tags: ['PostGIS', 'GeoServer', 'SDI Frameworks', 'ArcGIS Server', 'INSPIRE'] },
  { slug: 'digital-mapping', number: '02', title: 'Digital Mapping & Web GIS Platforms', shortTitle: 'Digital Mapping & Web GIS', description: 'Development and deployment of interactive web-based GIS platforms and geospatial dashboards for institutional decision-support environments.', tags: ['Leaflet.js', 'OpenLayers', 'ArcGIS Online', 'MapBox GL', 'GeoNode'] },
  { slug: 'drone-photogrammetry', number: '03', title: 'Drone, Photogrammetry & 3D Spatial Engineering', shortTitle: 'Drone & Photogrammetry', description: 'End-to-end UAV survey operations and photogrammetric processing workflows. Point cloud generation, 3D mesh modelling, and volumetric analysis.', tags: ['Agisoft Metashape', 'Pix4D', 'DJI Terra', 'CloudCompare', 'LiDAR'] },
  { slug: 'remote-sensing', number: '04', title: 'Remote Sensing & Satellite Analytics', shortTitle: 'Remote Sensing & AI', description: 'Satellite imagery analysis, multispectral classification, change detection, and ML-driven land analysis across large geographic extents.', tags: ['ENVI', 'Google Earth Engine', 'Sentinel Hub', 'GDAL', 'Python'] },
  { slug: 'infrastructure-utility', number: '05', title: 'Infrastructure & Utility Spatial Systems', shortTitle: 'Infrastructure & Utilities', description: 'Geospatial systems for utility networks, asset registers, and infrastructure planning. Network tracing and maintenance GIS for water, gas, and electricity operators.', tags: ['Esri Utility Network', 'OpenStreetMap', 'QGIS', 'Network Analysis', 'AM/FM'] },
  { slug: 'survey-data', number: '06', title: 'Survey Data QA/QC & Spatial Standards', shortTitle: 'Survey Data & QA/QC', description: 'Quality assurance and standards compliance for surveyed spatial data. ISO 19100, ICSM, and ANZLIC-aligned data validation and metadata management.', tags: ['ICSM', 'ISO 19100', 'FME', 'QGIS', 'Python'] },
  { slug: 'environmental', number: '07', title: 'Environmental & Ecological Geospatial Analytics', shortTitle: 'Environmental Intelligence', description: 'Spatial analytics for environmental monitoring, ecological mapping, and carbon accounting across regulated and natural environments.', tags: ['Google Earth Engine', 'ENVI', 'TerrSet', 'ArcGIS Pro', 'Python'] },
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
