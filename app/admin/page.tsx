'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(
  () => import('@/components/admin/RichTextEditor').then(m => m.RichTextEditor),
  { ssr: false, loading: () => <div className="border border-black/[0.08] bg-[#FAFAF9] h-[200px] flex items-center justify-center font-mono text-[0.6rem] tracking-widest uppercase text-black/30">Loading editor…</div> },
);


// ─── Types ───────────────────────────────────────────────────────────────────

interface HistoryEntry {
  timestamp: number;
  label: string;
  data: CMSContent;
}

interface HeroSlide {
  id: string;
  photo: string;
  label: string;
  heading: string;
  body: string;
  cta_primary: string;
  cta_secondary: string;
}

interface CMSLocation {
  label: string;
  city: string;
  address_line1: string;
  address_line2: string;
  address_line3: string;
}

interface CMSService {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  tags: string;
  overview: string;
}

interface CMSProject {
  id: string;
  title: string;
  category: string;
  scope: string;
  year: string;
  location: string;
  image: string;
  description: string;
  outcomes: string;
  featured: boolean;
}

interface CMSWMSLayer {
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

interface CMSPageEntry {
  label: string;
  title: string;
  subtitle: string;
}

interface CMSSection {
  id: string;
  label: string;
  enabled: boolean;
}

interface CMSContent {
  company: {
    name: string;
    abn: string;
    tagline: string;
    email: string;
    phone: string;
    phone_note: string;
  };
  hero: {
    slides: HeroSlide[];
  };
  page_photos: {
    about: string;
    services: string;
    contact: string;
    industries: string;
    products: string;
    projects: string;
    technology: string;
  };
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
  about_intro: {
    heading: string;
    tagline: string;
    body: string;
    photo: string;
  };
  locations: {
    adelaide: CMSLocation;
    perth: CMSLocation;
    melbourne: CMSLocation;
  };
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

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULTS: CMSContent = {
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
      {
        id: 'slide-1',
        photo: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=80',
        label: 'Enterprise Spatial Intelligence',
        heading: 'AIRFREE GEOSPATIAL',
        body: 'Delivering mission-critical geospatial solutions for government authorities, utility networks, and large-scale engineering operations across Australia.',
        cta_primary: 'View Services',
        cta_secondary: 'Contact Us',
      },
      {
        id: 'slide-2',
        photo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
        label: 'Enterprise Spatial Intelligence',
        heading: 'AIRFREE GEOSPATIAL',
        body: 'Advanced remote sensing and satellite analytics for infrastructure monitoring and environmental intelligence across Australia.',
        cta_primary: 'View Services',
        cta_secondary: 'Contact Us',
      },
      {
        id: 'slide-3',
        photo: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80',
        label: 'Enterprise Spatial Intelligence',
        heading: 'AIRFREE GEOSPATIAL',
        body: 'Enterprise GIS and spatial data infrastructure powering decisions for utilities, government and large-scale engineering operations.',
        cta_primary: 'View Services',
        cta_secondary: 'Contact Us',
      },
      {
        id: 'slide-4',
        photo: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1920&q=80',
        label: 'Enterprise Spatial Intelligence',
        heading: 'AIRFREE GEOSPATIAL',
        body: 'Precision drone photogrammetry and 3D spatial engineering for complex terrain, infrastructure, and environmental surveys.',
        cta_primary: 'View Services',
        cta_secondary: 'Contact Us',
      },
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
  about_intro: {
    heading: 'About Airfree Geospatial',
    tagline: 'Specialised Geospatial Intelligence',
    body: 'Airfree Geospatial Pty Ltd is a specialised geospatial intelligence and infrastructure analytics consultancy serving government, utilities, and large-scale engineering operations across Australia.',
    photo: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80',
  },
  locations: {
    adelaide: {
      label: 'Head Office',
      city: 'Adelaide, SA',
      address_line1: '35 Cassia Street',
      address_line2: 'Munno Para West',
      address_line3: 'SA 5115, Australia',
    },
    perth: {
      label: 'Branch Office',
      city: 'Perth, WA',
      address_line1: '8 Seddon Way',
      address_line2: 'Canning Vale',
      address_line3: 'WA 6155, Australia',
    },
    melbourne: {
      label: 'Branch Office',
      city: 'Melbourne, VIC',
      address_line1: '324 Settlement Road',
      address_line2: 'Thomastown',
      address_line3: 'VIC 3072, Australia',
    },
  },
  footer: {
    brand_tagline: 'Enterprise Spatial Intelligence',
    description:
      'A specialised geospatial intelligence and infrastructure analytics consultancy serving government, utilities, and large-scale engineering operations.',
    copyright_entity: 'Airfree Geospatial Pty Ltd',
    social: { linkedin: '', twitter: '', youtube: '', facebook: '', instagram: '' },
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
  services: [
    { id: 'svc-01', slug: 'gis-spatial', number: '01', title: 'Enterprise GIS & Spatial Infrastructure Systems', shortTitle: 'GIS & Spatial Infrastructure', description: 'Design, deployment and management of enterprise-grade spatial data infrastructure.', image: '/images/gisinfra.jpg', tags: 'PostGIS, GeoServer, SDI Frameworks, ArcGIS Server, INSPIRE', overview: '' },
    { id: 'svc-02', slug: 'digital-mapping', number: '02', title: 'Digital Mapping & Web GIS Platforms', shortTitle: 'Digital Mapping & Web GIS', description: 'Development and deployment of interactive web-based GIS platforms and geospatial dashboards.', image: '/images/digitalmap.png', tags: 'Leaflet.js, OpenLayers, ArcGIS Online, MapBox GL, GeoNode', overview: '' },
    { id: 'svc-03', slug: 'drone-photogrammetry', number: '03', title: 'Drone, Photogrammetry & 3D Spatial Engineering', shortTitle: 'Drone & Photogrammetry', description: 'End-to-end UAV survey operations and photogrammetric processing workflows.', image: '/images/dronemap.png', tags: 'Agisoft Metashape, Pix4D, DJI Terra, CloudCompare, LiDAR', overview: '' },
    { id: 'svc-04', slug: 'remote-sensing', number: '04', title: 'Remote Sensing & Satellite Analytics', shortTitle: 'Remote Sensing & AI', description: 'Satellite imagery analysis, multispectral classification, change detection, and ML-driven land analysis.', image: '/images/digitalmap.png', tags: 'ENVI, Google Earth Engine, Sentinel Hub, GDAL, Python', overview: '' },
    { id: 'svc-05', slug: 'infrastructure-utility', number: '05', title: 'Infrastructure & Utility Spatial Systems', shortTitle: 'Infrastructure & Utilities', description: 'Geospatial systems for utility networks, asset registers, and infrastructure planning.', image: '/images/gisinfra.jpg', tags: 'Esri Utility Network, OpenStreetMap, QGIS, Network Analysis, AM/FM', overview: '' },
    { id: 'svc-06', slug: 'survey-data', number: '06', title: 'Survey Data QA/QC & Spatial Standards', shortTitle: 'Survey Data & QA/QC', description: 'Quality assurance and standards compliance for surveyed spatial data.', image: '/images/gisinfra.jpg', tags: 'ICSM, ISO 19100, FME, QGIS, Python', overview: '' },
    { id: 'svc-07', slug: 'environmental', number: '07', title: 'Environmental & Ecological Geospatial Analytics', shortTitle: 'Environmental Intelligence', description: 'Spatial analytics for environmental monitoring, ecological mapping, and carbon accounting.', image: '/images/dronemap.png', tags: 'Google Earth Engine, ENVI, TerrSet, ArcGIS Pro, Python', overview: '' },
  ],
  projects: [
    { id: 'prj-01', title: 'Government Spatial Data Infrastructure Implementation', category: 'GIS INFRASTRUCTURE', scope: 'Federal / State Government', year: '2024', location: 'Adelaide, SA', image: '', description: 'End-to-end SDI design and deployment for a government agency managing large-scale land and infrastructure assets.', outcomes: 'PostGIS enterprise spatial database\nOGC-compliant WMS/WFS services\nMulti-agency data sharing framework\nISO 19100 metadata compliance', featured: true },
    { id: 'prj-02', title: 'Underground Utility Network Digitisation & Asset Register', category: 'UTILITY NETWORK', scope: 'Regulated Utility Operator', year: '2024', location: 'Perth, WA', image: '', description: 'Digitisation and attribute enrichment of an underground utility network for a regulated infrastructure operator. Over 12,000 assets captured and validated.', outcomes: '12,000+ assets digitised & attributed\nICSM-standard QA/QC validation\nEnterprise AM system integration\nRegulatory reporting dataset produced', featured: true },
    { id: 'prj-03', title: 'UAV Photogrammetry Campaign — Construction Site Volumetrics', category: 'PHOTOGRAMMETRY', scope: 'Civil Contractor', year: '2023', location: 'Melbourne, VIC', image: '', description: 'Multi-flight UAV photogrammetry campaign across an active construction site with RTK GNSS ground control.', outcomes: '5 cm GSD orthomosaic\nClassified LAS point cloud\nDSM & DTM generation\nEarthworks volume certificates', featured: true },
    { id: 'prj-04', title: 'Vegetation Change Detection — Environmental Monitoring', category: 'REMOTE SENSING', scope: 'Environmental Management Authority', year: '2023', location: 'Adelaide, SA', image: '', description: 'Multi-temporal Sentinel-2 analysis over a 50,000+ hectare management area with 5-year change detection.', outcomes: '50,000+ ha monitored area\nSentinel-2 5-year time-series\nClearing event detection\nAnnual condition trend report', featured: true },
  ],
  wms_layers: [],
  page_sections: {
    home: [
      { id: 'hero',             label: 'Hero Slider',       enabled: true },
      { id: 'capability-strip', label: 'Capability Strip',  enabled: true },
      { id: 'photo-strip',      label: 'Photo Strip',       enabled: true },
      { id: 'services',         label: 'Service Pillars',   enabled: true },
      { id: 'about',            label: 'About Section',     enabled: true },
      { id: 'industries',       label: 'Industries Teaser', enabled: true },
      { id: 'cta',              label: 'Contact CTA',       enabled: true },
    ],
    about:      [{ id: 'hero', label: 'Page Hero', enabled: true }, { id: 'mission', label: 'Mission', enabled: true }, { id: 'principles', label: 'Core Principles', enabled: true }, { id: 'sectors', label: 'Sectors', enabled: true }, { id: 'cta', label: 'Contact CTA', enabled: true }],
    services:   [{ id: 'hero', label: 'Page Hero', enabled: true }, { id: 'list', label: 'Service List', enabled: true }, { id: 'cta', label: 'Footer CTA', enabled: true }],
    contact:    [{ id: 'hero', label: 'Page Hero', enabled: true }, { id: 'form', label: 'Contact Form', enabled: true }],
    industries: [{ id: 'hero', label: 'Page Hero', enabled: true }, { id: 'sectors', label: 'Sectors Grid', enabled: true }, { id: 'cta', label: 'Contact CTA', enabled: true }],
    projects:   [{ id: 'hero', label: 'Page Hero', enabled: true }, { id: 'disclaimer', label: 'Disclaimer', enabled: true }, { id: 'grid', label: 'Project Cards', enabled: true }, { id: 'cta', label: 'Procurement CTA', enabled: true }],
    products:   [{ id: 'hero', label: 'Page Hero', enabled: true }, { id: 'grid', label: 'Products Grid', enabled: true }],
    technology: [{ id: 'hero', label: 'Page Hero', enabled: true }, { id: 'stack', label: 'Technology Stack', enabled: true }],
  },
};

// ─── Class constants ──────────────────────────────────────────────────────────

const INPUT_CLS =
  'w-full bg-white border border-black/[0.08] text-black text-sm px-3.5 py-2.5 focus:outline-none focus:border-[#4A86B8] focus:ring-1 focus:ring-[#4A86B8]/20 transition-all duration-300 placeholder:text-black/25';

const LABEL_CLS =
  'block font-mono text-[0.58rem] tracking-[0.18em] uppercase text-black/45 mb-2';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function deepSet(
  obj: Record<string, unknown>,
  path: string,
  value: string,
): Record<string, unknown> {
  const keys = path.split('.');
  const result = JSON.parse(JSON.stringify(obj)) as Record<string, unknown>;
  let curr: Record<string, unknown> = result;
  for (let i = 0; i < keys.length - 1; i++) {
    curr = curr[keys[i]] as Record<string, unknown>;
  }
  curr[keys[keys.length - 1]] = value;
  return result;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className={LABEL_CLS}>{children}</label>;
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={INPUT_CLS}
      suppressHydrationWarning
    />
  );
}

function TextareaInput({
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className={`${INPUT_CLS} resize-y`}
      suppressHydrationWarning
    />
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  rows,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div className="mb-5" suppressHydrationWarning>
      <FieldLabel>{label}</FieldLabel>
      {textarea ? (
        <TextareaInput value={value} onChange={onChange} rows={rows} placeholder={placeholder} />
      ) : (
        <TextInput value={value} onChange={onChange} placeholder={placeholder} />
      )}
    </div>
  );
}

function PhotoField({
  label,
  value,
  onChange,
  height = 'h-20',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  height?: string;
}) {
  return (
    <div className="mb-5" suppressHydrationWarning>
      <FieldLabel>{label}</FieldLabel>
      {value && (
        <div className={`${height} relative overflow-hidden border border-black/[0.06] mb-2`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://..."
          className={INPUT_CLS}
          suppressHydrationWarning
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="px-3 border border-black/[0.08] text-black/40 hover:text-black/70 text-xs transition-colors whitespace-nowrap"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6 pb-5 border-b border-black/[0.06]">
      <h2 className="font-serif text-lg text-black font-medium mb-1">{title}</h2>
      {description && <p className="text-black/40 text-xs">{description}</p>}
    </div>
  );
}

// ─── Section: Company Info ────────────────────────────────────────────────────

function CompanySection({
  content,
  handleChange,
}: {
  content: CMSContent;
  handleChange: (path: string, value: string) => void;
}) {
  const phoneIsPlaceholder = content.company.phone.includes('XXX');
  return (
    <>
      <SectionHeading
        title="Company Info"
        description="Core company details used across the site."
      />
      {phoneIsPlaceholder && (
        <div className="bg-amber-50 border border-amber-200 px-4 py-3 mb-5 flex items-start gap-2.5">
          <span className="text-amber-500 text-sm mt-0.5">⚠</span>
          <div>
            <p className="text-amber-700 text-xs font-medium">Phone number is a placeholder</p>
            <p className="text-amber-600/70 text-[0.65rem] mt-0.5">
              Update before publishing the site.
            </p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-x-5">
        <Field
          label="Company Name"
          value={content.company.name}
          onChange={v => handleChange('company.name', v)}
        />
        <Field
          label="ABN"
          value={content.company.abn}
          onChange={v => handleChange('company.abn', v)}
        />
      </div>
      <Field
        label="Tagline"
        value={content.company.tagline}
        onChange={v => handleChange('company.tagline', v)}
      />
      <div className="grid grid-cols-2 gap-x-5">
        <Field
          label="Email Address"
          value={content.company.email}
          onChange={v => handleChange('company.email', v)}
        />
        <div className="mb-5">
          <FieldLabel>Phone Number</FieldLabel>
          <TextInput
            value={content.company.phone}
            onChange={v => handleChange('company.phone', v)}
            placeholder="+61 X XXXX XXXX"
          />
          {phoneIsPlaceholder && (
            <p className="text-amber-600/60 text-[0.6rem] mt-1.5 font-mono">
              Update with real number before launch
            </p>
          )}
        </div>
      </div>
      <Field
        label="Phone Note (shown below number)"
        value={content.company.phone_note}
        onChange={v => handleChange('company.phone_note', v)}
      />
    </>
  );
}

// ─── Section: Hero Slides ─────────────────────────────────────────────────────

function HeroSlidesSection({
  content,
  addSlide,
  removeSlide,
  moveSlide,
  updateSlide,
}: {
  content: CMSContent;
  addSlide: () => void;
  removeSlide: (id: string) => void;
  moveSlide: (id: string, dir: -1 | 1) => void;
  updateSlide: (id: string, key: keyof HeroSlide, value: string) => void;
}) {
  return (
    <>
      <SectionHeading
        title="Hero Slides"
        description="Full-screen homepage slider. Each slide has its own photo, heading, and CTAs."
      />
      {content.hero.slides.map((slide, idx) => (
        <div key={slide.id} className="mb-1">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[0.55rem] tracking-widest uppercase text-[#4A86B8]">
              Slide {idx + 1}
            </span>
          </div>
          {slide.photo && (
            <div className="h-28 w-full overflow-hidden border border-black/[0.06] mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={slide.photo} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="mb-3">
            <FieldLabel>Photo URL</FieldLabel>
            <div className="flex gap-2">
              <input
                type="text"
                value={slide.photo}
                onChange={e => updateSlide(slide.id, 'photo', e.target.value)}
                placeholder="https://..."
                className={INPUT_CLS}
              />
              {slide.photo && (
                <button
                  onClick={() => updateSlide(slide.id, 'photo', '')}
                  className="px-3 border border-black/[0.08] text-black/40 hover:text-black/70 text-xs transition-colors whitespace-nowrap"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="mb-3">
            <FieldLabel>Label (small caps)</FieldLabel>
            <input
              type="text"
              value={slide.label}
              onChange={e => updateSlide(slide.id, 'label', e.target.value)}
              className={INPUT_CLS}
            />
          </div>
          <div className="mb-3">
            <FieldLabel>Heading</FieldLabel>
            <input
              type="text"
              value={slide.heading}
              onChange={e => updateSlide(slide.id, 'heading', e.target.value)}
              className={INPUT_CLS}
            />
          </div>
          <div className="mb-3">
            <FieldLabel>Body Text</FieldLabel>
            <textarea
              value={slide.body}
              onChange={e => updateSlide(slide.id, 'body', e.target.value)}
              rows={2}
              className={`${INPUT_CLS} resize-y`}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-5 mb-3">
            <div>
              <FieldLabel>Primary CTA</FieldLabel>
              <input
                type="text"
                value={slide.cta_primary}
                onChange={e => updateSlide(slide.id, 'cta_primary', e.target.value)}
                className={INPUT_CLS}
              />
            </div>
            <div>
              <FieldLabel>Secondary CTA</FieldLabel>
              <input
                type="text"
                value={slide.cta_secondary}
                onChange={e => updateSlide(slide.id, 'cta_secondary', e.target.value)}
                className={INPUT_CLS}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 mb-4">
            <button
              onClick={() => moveSlide(slide.id, -1)}
              disabled={idx === 0}
              className="text-xs text-black/35 hover:text-black/60 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
            >
              ↑ Up
            </button>
            <button
              onClick={() => moveSlide(slide.id, 1)}
              disabled={idx === content.hero.slides.length - 1}
              className="text-xs text-black/35 hover:text-black/60 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
            >
              ↓ Down
            </button>
            <button
              onClick={() => {
                if (content.hero.slides.length > 1) removeSlide(slide.id);
              }}
              disabled={content.hero.slides.length <= 1}
              className="text-xs text-red-400/70 hover:text-red-500 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
            >
              🗑 Remove
            </button>
          </div>
          {idx < content.hero.slides.length - 1 && (
            <div className="border-b border-black/[0.06] mb-6 pb-2" />
          )}
        </div>
      ))}
      <button
        onClick={addSlide}
        className="w-full border border-dashed border-black/20 text-black/40 hover:text-black/60 hover:border-black/30 text-xs py-2.5 transition-colors mt-2"
      >
        + Add Slide
      </button>
    </>
  );
}

// ─── Section: Page Photos ─────────────────────────────────────────────────────

const PAGE_PHOTO_LABELS: Array<{ key: keyof CMSContent['page_photos']; label: string }> = [
  { key: 'about', label: 'About Page' },
  { key: 'services', label: 'Services Page' },
  { key: 'contact', label: 'Contact Page' },
  { key: 'industries', label: 'Industries Page' },
  { key: 'products', label: 'Products Page' },
  { key: 'projects', label: 'Projects Page' },
  { key: 'technology', label: 'Technology Page' },
];

function PagePhotosSection({
  content,
  handleChange,
}: {
  content: CMSContent;
  handleChange: (path: string, value: string) => void;
}) {
  return (
    <>
      <SectionHeading
        title="Page Hero Photos"
        description="Background image shown in each page's header hero section."
      />
      <div className="grid grid-cols-1 gap-4">
        {PAGE_PHOTO_LABELS.map(({ key, label }) => (
          <PhotoField
            key={key}
            label={label}
            value={content.page_photos[key]}
            onChange={v => handleChange(`page_photos.${key}`, v)}
            height="h-20"
          />
        ))}
      </div>
    </>
  );
}

// ─── Section: About ───────────────────────────────────────────────────────────

function AboutSection({
  content,
  handleChange,
}: {
  content: CMSContent;
  handleChange: (path: string, value: string) => void;
}) {
  return (
    <>
      <SectionHeading
        title="About Section"
        description="Introductory content shown on the About page."
      />
      <PhotoField
        label="About Photo"
        value={content.about_intro.photo}
        onChange={v => handleChange('about_intro.photo', v)}
        height="h-28"
      />
      <div className="grid grid-cols-2 gap-x-5">
        <Field
          label="Heading"
          value={content.about_intro.heading}
          onChange={v => handleChange('about_intro.heading', v)}
        />
        <Field
          label="Tagline"
          value={content.about_intro.tagline}
          onChange={v => handleChange('about_intro.tagline', v)}
        />
      </div>
      <Field
        label="Body Text"
        value={content.about_intro.body}
        onChange={v => handleChange('about_intro.body', v)}
        textarea
        rows={4}
      />
    </>
  );
}

// ─── Section: Locations ───────────────────────────────────────────────────────

const LOCATION_KEYS = ['adelaide', 'perth', 'melbourne'] as const;
type LocationKey = (typeof LOCATION_KEYS)[number];

function LocationsSection({
  content,
  handleChange,
}: {
  content: CMSContent;
  handleChange: (path: string, value: string) => void;
}) {
  return (
    <>
      <SectionHeading
        title="Office Locations"
        description="Address information for each office. Displayed on the Contact page."
      />
      {LOCATION_KEYS.map((city: LocationKey, i) => (
        <div key={city} className="mb-8 last:mb-0">
          <div className="font-mono text-[0.6rem] tracking-widest uppercase text-[#4A86B8] mb-4">
            {city.charAt(0).toUpperCase() + city.slice(1)}
          </div>
          <div className="grid grid-cols-2 gap-x-5">
            <Field
              label="Office Label"
              value={content.locations[city].label}
              onChange={v => handleChange(`locations.${city}.label`, v)}
            />
            <Field
              label="City Display Name"
              value={content.locations[city].city}
              onChange={v => handleChange(`locations.${city}.city`, v)}
            />
            <Field
              label="Address Line 1"
              value={content.locations[city].address_line1}
              onChange={v => handleChange(`locations.${city}.address_line1`, v)}
            />
            <Field
              label="Address Line 2"
              value={content.locations[city].address_line2}
              onChange={v => handleChange(`locations.${city}.address_line2`, v)}
            />
          </div>
          <Field
            label="Address Line 3 (State & Postcode)"
            value={content.locations[city].address_line3}
            onChange={v => handleChange(`locations.${city}.address_line3`, v)}
          />
          {i < LOCATION_KEYS.length - 1 && (
            <div className="h-px bg-black/[0.06] mt-2 mb-6" />
          )}
        </div>
      ))}
    </>
  );
}

// ─── Section: Footer ──────────────────────────────────────────────────────────

function FooterSection({
  content,
  handleChange,
}: {
  content: CMSContent;
  handleChange: (path: string, value: string) => void;
}) {
  return (
    <>
      <SectionHeading title="Footer" description="Text shown in the site footer." />
      <Field
        label="Brand Tagline"
        value={content.footer.brand_tagline}
        onChange={v => handleChange('footer.brand_tagline', v)}
      />
      <Field
        label="Description Text"
        value={content.footer.description}
        onChange={v => handleChange('footer.description', v)}
        textarea
        rows={3}
      />
      <Field
        label="Copyright Entity Name"
        value={content.footer.copyright_entity}
        onChange={v => handleChange('footer.copyright_entity', v)}
      />

      {/* Social Links */}
      <div className="mt-6 pt-5 border-t border-black/[0.06]">
        <SectionHeading
          title="Social Media Links"
          description="Enter full URLs (e.g. https://linkedin.com/company/airfree). Leave blank to hide that icon."
        />
        <Field
          label="LinkedIn URL"
          value={content.footer.social?.linkedin ?? ''}
          onChange={v => handleChange('footer.social.linkedin', v)}
          placeholder="https://linkedin.com/company/..."
        />
        <Field
          label="X / Twitter URL"
          value={content.footer.social?.twitter ?? ''}
          onChange={v => handleChange('footer.social.twitter', v)}
          placeholder="https://x.com/..."
        />
        <Field
          label="YouTube URL"
          value={content.footer.social?.youtube ?? ''}
          onChange={v => handleChange('footer.social.youtube', v)}
          placeholder="https://youtube.com/@..."
        />
        <Field
          label="Facebook URL"
          value={content.footer.social?.facebook ?? ''}
          onChange={v => handleChange('footer.social.facebook', v)}
          placeholder="https://facebook.com/..."
        />
        <Field
          label="Instagram URL"
          value={content.footer.social?.instagram ?? ''}
          onChange={v => handleChange('footer.social.instagram', v)}
          placeholder="https://instagram.com/..."
        />
      </div>
    </>
  );
}

// ─── Section: Typography ──────────────────────────────────────────────────────

const HEADING_FONT_OPTIONS = [
  {
    id: 'playfair',
    name: 'Playfair Display',
    preview: 'Airfree Geospatial',
    style: 'var(--font-playfair)',
    desc: 'Classic editorial serif',
  },
  {
    id: 'cormorant',
    name: 'Cormorant Garamond',
    preview: 'Airfree Geospatial',
    style: 'var(--font-cormorant)',
    desc: 'Elegant & refined',
  },
];

const BODY_FONT_OPTIONS = [
  {
    id: 'inter',
    name: 'Inter',
    preview: 'Geospatial consultancy delivering spatial intelligence.',
    style: 'var(--font-inter)',
    desc: 'Clean & modern',
  },
  {
    id: 'jakarta',
    name: 'Plus Jakarta Sans',
    preview: 'Geospatial consultancy delivering spatial intelligence.',
    style: 'var(--font-jakarta)',
    desc: 'Geometric & open',
  },
];

function TypographySection({
  content,
  handleChange,
  handleNumber,
}: {
  content: CMSContent;
  handleChange: (path: string, value: string) => void;
  handleNumber: (key: keyof CMSContent['typography'], value: number) => void;
}) {
  return (
    <>
      <SectionHeading
        title="Typography Config"
        description="Configure font sizing scales and family targets live across the entire website."
      />

      {/* --- Section: Font Sizes (Sliders) --- */}
      <div className="mb-10">
        <h3 className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-black/45 mb-6 pb-2 border-b border-black/[0.04]">
          Font Size Scaling
        </h3>

        {/* Base Body Size */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <FieldLabel>Base Body Size (Root font-size)</FieldLabel>
            <span className="font-mono text-[0.7rem] text-[#4A86B8]">{content.typography.body_size}px</span>
          </div>
          <input
            type="range"
            min={14}
            max={24}
            step={0.5}
            value={content.typography.body_size}
            onChange={e => handleNumber('body_size', Number(e.target.value))}
            className="w-full accent-[#4A86B8] cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="font-mono text-[0.55rem] text-black/25">14px — Compact</span>
            <span className="font-mono text-[0.55rem] text-black/25">24px — Large</span>
          </div>
        </div>

        {/* Heading Size Scale */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <FieldLabel>Headings Size Scale</FieldLabel>
            <span className="font-mono text-[0.7rem] text-[#4A86B8]">{content.typography.heading_size || 100}%</span>
          </div>
          <input
            type="range"
            min={70}
            max={150}
            step={5}
            value={content.typography.heading_size || 100}
            onChange={e => handleNumber('heading_size', Number(e.target.value))}
            className="w-full accent-[#4A86B8] cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="font-mono text-[0.55rem] text-black/25">70% — Decreased</span>
            <span className="font-mono text-[0.55rem] text-black/25">150% — Increased</span>
          </div>
        </div>

        {/* Nav Size Scale */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <FieldLabel>Navigation Text Size Scale</FieldLabel>
            <span className="font-mono text-[0.7rem] text-[#4A86B8]">{content.typography.nav_size || 100}%</span>
          </div>
          <input
            type="range"
            min={70}
            max={150}
            step={5}
            value={content.typography.nav_size || 100}
            onChange={e => handleNumber('nav_size', Number(e.target.value))}
            className="w-full accent-[#4A86B8] cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="font-mono text-[0.55rem] text-black/25">70% — Decreased</span>
            <span className="font-mono text-[0.55rem] text-black/25">150% — Increased</span>
          </div>
        </div>

        {/* Button Size Scale */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <FieldLabel>Buttons Text Size Scale</FieldLabel>
            <span className="font-mono text-[0.7rem] text-[#4A86B8]">{content.typography.button_size || 100}%</span>
          </div>
          <input
            type="range"
            min={70}
            max={150}
            step={5}
            value={content.typography.button_size || 100}
            onChange={e => handleNumber('button_size', Number(e.target.value))}
            className="w-full accent-[#4A86B8] cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="font-mono text-[0.55rem] text-black/25">70% — Decreased</span>
            <span className="font-mono text-[0.55rem] text-black/25">150% — Increased</span>
          </div>
        </div>

        {/* Label Size Scale */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <FieldLabel>Section Labels Size Scale</FieldLabel>
            <span className="font-mono text-[0.7rem] text-[#4A86B8]">{content.typography.label_size || 100}%</span>
          </div>
          <input
            type="range"
            min={70}
            max={150}
            step={5}
            value={content.typography.label_size || 100}
            onChange={e => handleNumber('label_size', Number(e.target.value))}
            className="w-full accent-[#4A86B8] cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="font-mono text-[0.55rem] text-black/25">70% — Decreased</span>
            <span className="font-mono text-[0.55rem] text-black/25">150% — Increased</span>
          </div>
        </div>
      </div>

      {/* --- Section: Font Families --- */}
      <div className="mb-10">
        <h3 className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-black/45 mb-6 pb-2 border-b border-black/[0.04]">
          Typography Families
        </h3>

        {/* Heading font */}
        <div className="mb-8">
          <FieldLabel>Serif Family (Used for Headings)</FieldLabel>
          <div className="flex flex-col gap-3 mt-2">
            {HEADING_FONT_OPTIONS.map(font => (
              <button
                key={font.id}
                onClick={() => handleChange('typography.heading_font', font.id)}
                className={`w-full text-left border px-4 py-4 transition-all ${
                  content.typography.heading_font === font.id
                    ? 'border-[#4A86B8] bg-[#4A86B8]/[0.04]'
                    : 'border-black/[0.08] hover:border-black/20 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[0.55rem] tracking-widest uppercase text-black/40">{font.name}</span>
                  {content.typography.heading_font === font.id && (
                    <span className="font-mono text-[0.5rem] tracking-widest uppercase text-[#4A86B8]">Active</span>
                  )}
                </div>
                <div
                  className="text-2xl text-black/80 leading-tight"
                  style={{ fontFamily: font.style }}
                >
                  {font.preview}
                </div>
                <p className="text-black/35 text-[0.65rem] mt-1.5">{font.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Body font */}
        <div className="mb-8">
          <FieldLabel>Sans-Serif Family (Used for Body Text)</FieldLabel>
          <div className="flex flex-col gap-3 mt-2">
            {BODY_FONT_OPTIONS.map(font => (
              <button
                key={font.id}
                onClick={() => handleChange('typography.body_font', font.id)}
                className={`w-full text-left border px-4 py-4 transition-all ${
                  content.typography.body_font === font.id
                    ? 'border-[#4A86B8] bg-[#4A86B8]/[0.04]'
                    : 'border-black/[0.08] hover:border-black/20 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[0.55rem] tracking-widest uppercase text-black/40">{font.name}</span>
                  {content.typography.body_font === font.id && (
                    <span className="font-mono text-[0.5rem] tracking-widest uppercase text-[#4A86B8]">Active</span>
                  )}
                </div>
                <div
                  className="text-sm text-black/70 leading-relaxed"
                  style={{ fontFamily: font.style }}
                >
                  {font.preview}
                </div>
                <p className="text-black/35 text-[0.65rem] mt-1.5">{font.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- Section: Font Mapping Targets --- */}
      <div className="mb-6">
        <h3 className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-black/45 mb-6 pb-2 border-b border-black/[0.04]">
          Layout Font Family Mapping
        </h3>

        {/* Nav Font Target Selection */}
        <div className="mb-5">
          <FieldLabel>Navbar Font Family</FieldLabel>
          <select
            value={content.typography.nav_font_target}
            onChange={e => handleChange('typography.nav_font_target', e.target.value)}
            className={INPUT_CLS}
          >
            <option value="sans">Sans-Serif Family (Body font selection)</option>
            <option value="serif">Serif Family (Heading font selection)</option>
            <option value="mono">Monospace Family (IBM Plex Mono)</option>
            <option value="inherit">Inherit (Default browser stack)</option>
          </select>
        </div>

        {/* Button Font Target Selection */}
        <div className="mb-5">
          <FieldLabel>Buttons Font Family</FieldLabel>
          <select
            value={content.typography.button_font_target}
            onChange={e => handleChange('typography.button_font_target', e.target.value)}
            className={INPUT_CLS}
          >
            <option value="sans">Sans-Serif Family (Body font selection)</option>
            <option value="serif">Serif Family (Heading font selection)</option>
            <option value="mono">Monospace Family (IBM Plex Mono)</option>
            <option value="inherit">Inherit (Default browser stack)</option>
          </select>
        </div>

        {/* Section Label Font Target Selection */}
        <div className="mb-5">
          <FieldLabel>Section Labels Font Family</FieldLabel>
          <select
            value={content.typography.label_font_target}
            onChange={e => handleChange('typography.label_font_target', e.target.value)}
            className={INPUT_CLS}
          >
            <option value="sans">Sans-Serif Family (Body font selection)</option>
            <option value="serif">Serif Family (Heading font selection)</option>
            <option value="mono">Monospace Family (IBM Plex Mono)</option>
            <option value="inherit">Inherit (Default browser stack)</option>
          </select>
        </div>
      </div>
    </>
  );
}

// ─── Nav config ───────────────────────────────────────────────────────────────

// ─── Section: Page Builder ───────────────────────────────────────────────────

const PAGE_KEYS: Array<{ key: keyof CMSContent['page_sections']; label: string; url: string }> = [
  { key: 'home',       label: 'Home',        url: '/' },
  { key: 'about',      label: 'About',       url: '/about' },
  { key: 'services',   label: 'Services',    url: '/services' },
  { key: 'contact',    label: 'Contact',     url: '/contact' },
  { key: 'industries', label: 'Industries',  url: '/industries' },
  { key: 'projects',   label: 'Projects',    url: '/projects' },
  { key: 'products',   label: 'Products',    url: '/products' },
  { key: 'technology', label: 'Technology',  url: '/technology' },
];

function PageBuilderSection({
  content,
  reorderSections,
  toggleSection,
}: {
  content: CMSContent;
  reorderSections: (page: keyof CMSContent['page_sections'], fromIdx: number, toIdx: number) => void;
  toggleSection: (page: keyof CMSContent['page_sections'], id: string) => void;
}) {
  const [activePage, setActivePage] = useState<keyof CMSContent['page_sections']>('home');
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const sections = content.page_sections[activePage] ?? [];

  const handleDrop = (toIdx: number) => {
    if (dragIdx === null || dragIdx === toIdx) return;
    reorderSections(activePage, dragIdx, toIdx);
    setDragIdx(null);
    setDragOverIdx(null);
  };

  return (
    <>
      <SectionHeading
        title="Page Builder"
        description="Drag sections to reorder them on each page. Toggle visibility to hide without deleting. Changes apply live after saving."
      />

      {/* Page selector */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {PAGE_KEYS.map(p => (
          <button
            key={p.key}
            onClick={() => setActivePage(p.key)}
            className={`px-3 py-1.5 text-[0.65rem] font-mono tracking-widest uppercase border transition-colors ${
              activePage === p.key
                ? 'bg-[#4A86B8] border-[#4A86B8] text-white'
                : 'border-black/[0.08] text-black/50 hover:text-black/80 hover:border-black/20'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Preview link */}
      <div className="flex items-center gap-2 mb-5">
        <span className="font-mono text-[0.55rem] tracking-widest uppercase text-black/30">
          Editing:
        </span>
        <a
          href={PAGE_KEYS.find(p => p.key === activePage)?.url}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[0.6rem] text-[#4A86B8] hover:text-[#3a72a0] transition-colors"
        >
          {PAGE_KEYS.find(p => p.key === activePage)?.url} ↗
        </a>
      </div>

      {/* Section list */}
      <div className="space-y-1.5">
        {sections.map((section, i) => (
          <div
            key={section.id}
            draggable
            onDragStart={() => setDragIdx(i)}
            onDragOver={e => { e.preventDefault(); setDragOverIdx(i); }}
            onDrop={() => handleDrop(i)}
            onDragEnd={() => { setDragIdx(null); setDragOverIdx(null); }}
            className={`flex items-center gap-3 px-4 py-3 bg-white border cursor-grab active:cursor-grabbing select-none transition-all ${
              dragOverIdx === i && dragIdx !== i
                ? 'border-[#4A86B8] bg-[#4A86B8]/[0.03]'
                : 'border-black/[0.06]'
            } ${dragIdx === i ? 'opacity-40' : 'opacity-100'}`}
          >
            {/* Drag handle */}
            <span className="text-black/20 hover:text-black/40 transition-colors shrink-0" style={{ fontSize: '1.1rem', lineHeight: 1, letterSpacing: '-2px' }}>
              ⠿
            </span>

            {/* Index */}
            <span className="font-mono text-[0.5rem] text-black/25 w-4 shrink-0">{String(i + 1).padStart(2, '0')}</span>

            {/* Label */}
            <span className={`flex-1 text-sm transition-colors ${section.enabled ? 'text-black' : 'text-black/30 line-through'}`}>
              {section.label}
            </span>

            {/* ID badge */}
            <span className="font-mono text-[0.5rem] tracking-widest uppercase text-black/20 hidden sm:block">
              {section.id}
            </span>

            {/* Toggle */}
            <button
              onClick={() => toggleSection(activePage, section.id)}
              className={`shrink-0 w-8 h-4 rounded-full transition-all duration-300 relative ${section.enabled ? 'bg-[#4A86B8]' : 'bg-black/15'}`}
              title={section.enabled ? 'Hide section' : 'Show section'}
            >
              <span
                className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all duration-300 ${section.enabled ? 'left-[18px]' : 'left-0.5'}`}
              />
            </button>
          </div>
        ))}
      </div>

      <p className="mt-4 text-black/30 text-xs">
        Drag rows to reorder. Toggle the switch to show/hide a section without removing it.
      </p>
    </>
  );
}

// ─── Section: Services ────────────────────────────────────────────────────────

function ServicesSection({
  content,
  addService,
  removeService,
  moveService,
  updateService,
}: {
  content: CMSContent;
  addService: () => void;
  removeService: (id: string) => void;
  moveService: (id: string, dir: -1 | 1) => void;
  updateService: (id: string, key: keyof CMSService, value: string) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <>
      <SectionHeading title="Services" description="Manage service entries shown across the site. Changes propagate to the homepage grid, services listing, and individual service pages." />
      <div className="space-y-2 mb-5">
        {content.services.map((svc, i) => (
          <div key={svc.id} className="border border-black/[0.06] bg-white">
            <div className="flex items-center gap-3 px-4 py-3">
              <span className="font-mono text-[0.55rem] text-black/30 w-5">{svc.number || String(i + 1).padStart(2, '0')}</span>
              <span className="flex-1 text-sm text-black truncate">{svc.title || 'Untitled Service'}</span>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => moveService(svc.id, -1)} className="px-1.5 py-0.5 text-black/30 hover:text-black/60 text-xs transition-colors" title="Move up">↑</button>
                <button onClick={() => moveService(svc.id, 1)}  className="px-1.5 py-0.5 text-black/30 hover:text-black/60 text-xs transition-colors" title="Move down">↓</button>
                <button onClick={() => setExpanded(e => e === svc.id ? null : svc.id)} className="px-2 py-0.5 text-[0.65rem] border border-black/[0.08] text-black/50 hover:text-black/80 transition-colors">{expanded === svc.id ? 'Close' : 'Edit'}</button>
                <button onClick={() => removeService(svc.id)} className="px-2 py-0.5 text-[0.65rem] border border-red-200 text-red-400 hover:text-red-600 transition-colors">Remove</button>
              </div>
            </div>
            {expanded === svc.id && (
              <div className="border-t border-black/[0.06] px-4 py-5 bg-[#FAFAF9] grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                <Field label="Number" value={svc.number} onChange={v => updateService(svc.id, 'number', v)} placeholder="01" />
                <Field label="Slug (URL)" value={svc.slug} onChange={v => updateService(svc.id, 'slug', v)} placeholder="gis-spatial" />
                <div className="sm:col-span-2"><Field label="Title" value={svc.title} onChange={v => updateService(svc.id, 'title', v)} placeholder="Enterprise GIS & Spatial Infrastructure Systems" /></div>
                <Field label="Short Title" value={svc.shortTitle} onChange={v => updateService(svc.id, 'shortTitle', v)} placeholder="GIS & Spatial Infrastructure" />
                <Field label="Tags (comma-separated)" value={svc.tags} onChange={v => updateService(svc.id, 'tags', v)} placeholder="PostGIS, GeoServer, ArcGIS" />
                <div className="sm:col-span-2"><Field label="Description" value={svc.description} onChange={v => updateService(svc.id, 'description', v)} textarea rows={3} /></div>
                <div className="sm:col-span-2"><Field label="Overview (detail page body)" value={svc.overview} onChange={v => updateService(svc.id, 'overview', v)} textarea rows={5} placeholder="Extended content shown on the service detail page..." /></div>
                <div className="sm:col-span-2"><PhotoField label="Service Image" value={svc.image} onChange={v => updateService(svc.id, 'image', v)} height="h-32" /></div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={addService} className="w-full border border-dashed border-black/20 hover:border-[#4A86B8] text-black/40 hover:text-[#4A86B8] text-xs py-3 transition-colors">
        + Add Service
      </button>
    </>
  );
}

// ─── Section: Projects ────────────────────────────────────────────────────────

function ProjectsSection({
  content,
  addProject,
  removeProject,
  updateProject,
}: {
  content: CMSContent;
  addProject: () => void;
  removeProject: (id: string) => void;
  updateProject: (id: string, key: keyof CMSProject, value: string | boolean) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <>
      <SectionHeading title="Projects" description="Manage project case studies shown on the Projects page. Add photos, outcomes, and client sector details." />
      <div className="space-y-2 mb-5">
        {content.projects.map(prj => (
          <div key={prj.id} className="border border-black/[0.06] bg-white">
            <div className="flex items-center gap-3 px-4 py-3">
              <span className="font-mono text-[0.55rem] text-black/30 shrink-0">{prj.category || 'PROJECT'}</span>
              <span className="flex-1 text-sm text-black truncate">{prj.title || 'Untitled Project'}</span>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => setExpanded(e => e === prj.id ? null : prj.id)} className="px-2 py-0.5 text-[0.65rem] border border-black/[0.08] text-black/50 hover:text-black/80 transition-colors">{expanded === prj.id ? 'Close' : 'Edit'}</button>
                <button onClick={() => removeProject(prj.id)} className="px-2 py-0.5 text-[0.65rem] border border-red-200 text-red-400 hover:text-red-600 transition-colors">Remove</button>
              </div>
            </div>
            {expanded === prj.id && (
              <div className="border-t border-black/[0.06] px-4 py-5 bg-[#FAFAF9] grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                <div className="sm:col-span-2"><Field label="Title" value={prj.title} onChange={v => updateProject(prj.id, 'title', v)} /></div>
                <Field label="Category" value={prj.category} onChange={v => updateProject(prj.id, 'category', v)} placeholder="GIS INFRASTRUCTURE" />
                <Field label="Scope / Client Type" value={prj.scope} onChange={v => updateProject(prj.id, 'scope', v)} placeholder="Federal / State Government" />
                <Field label="Year" value={prj.year} onChange={v => updateProject(prj.id, 'year', v)} placeholder="2024" />
                <Field label="Location" value={prj.location} onChange={v => updateProject(prj.id, 'location', v)} placeholder="Adelaide, SA" />
                <div className="sm:col-span-2"><Field label="Description" value={prj.description} onChange={v => updateProject(prj.id, 'description', v)} textarea rows={4} /></div>
                <div className="sm:col-span-2">
                  <div className="mb-5">
                    <FieldLabel>Outcomes (one per line)</FieldLabel>
                    <textarea value={prj.outcomes} onChange={e => updateProject(prj.id, 'outcomes', e.target.value)} rows={5} placeholder={'PostGIS enterprise database\nOGC-compliant services\n...'} className={`${INPUT_CLS} resize-y`} suppressHydrationWarning />
                    <p className="text-black/30 text-[0.6rem] mt-1">Each line becomes a bullet point on the project card.</p>
                  </div>
                </div>
                <div className="sm:col-span-2"><PhotoField label="Project Photo (optional)" value={prj.image} onChange={v => updateProject(prj.id, 'image', v)} height="h-32" /></div>
                <div className="sm:col-span-2 flex items-center gap-2 mb-3">
                  <input type="checkbox" id={`feat-${prj.id}`} checked={prj.featured} onChange={e => updateProject(prj.id, 'featured', e.target.checked)} className="accent-[#4A86B8]" />
                  <label htmlFor={`feat-${prj.id}`} className="text-sm text-black/60">Featured project</label>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={addProject} className="w-full border border-dashed border-black/20 hover:border-[#4A86B8] text-black/40 hover:text-[#4A86B8] text-xs py-3 transition-colors">
        + Add Project
      </button>
    </>
  );
}

// ─── Section: Page Content ────────────────────────────────────────────────────

function PageContentSection({
  content,
  handleChange,
}: {
  content: CMSContent;
  handleChange: (path: string, value: string) => void;
}) {
  const pages: Array<{ key: keyof CMSContent['page_content']; label: string }> = [
    { key: 'home',       label: 'Home' },
    { key: 'about',      label: 'About' },
    { key: 'services',   label: 'Services' },
    { key: 'contact',    label: 'Contact' },
    { key: 'industries', label: 'Industries' },
    { key: 'products',   label: 'Products' },
    { key: 'projects',   label: 'Projects' },
    { key: 'technology', label: 'Technology' },
  ];
  return (
    <>
      <SectionHeading title="Page Content" description="Edit the label, title, and subtitle shown in each page hero section. These override the hardcoded defaults." />
      <div className="space-y-6">
        {pages.map(({ key, label }) => (
          <div key={key} className="border border-black/[0.06] bg-white p-5">
            <div className="font-mono text-[0.6rem] tracking-widest uppercase text-[#4A86B8] mb-4">{label} Page</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
              <Field label="Label (eyebrow)" value={content.page_content[key].label} onChange={v => handleChange(`page_content.${key}.label`, v)} placeholder="e.g. Service Portfolio" />
              <Field label="Title (H1)" value={content.page_content[key].title} onChange={v => handleChange(`page_content.${key}.title`, v)} />
              <Field label="Subtitle" value={content.page_content[key].subtitle} onChange={v => handleChange(`page_content.${key}.subtitle`, v)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Section: WMS Layers ──────────────────────────────────────────────────────

function WMSSection({
  content,
  addWMSLayer,
  removeWMSLayer,
  updateWMSLayer,
}: {
  content: CMSContent;
  addWMSLayer: () => void;
  removeWMSLayer: (id: string) => void;
  updateWMSLayer: (id: string, key: keyof CMSWMSLayer, value: string | boolean | number) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <>
      <SectionHeading
        title="WMS Layers"
        description="Configure Web Map Service (WMS) layers displayed on the spatial data viewer page (/map). Add OGC-compliant WMS endpoints from GeoServer, ArcGIS, or any WMS provider."
      />
      {content.wms_layers.length === 0 && (
        <div className="border border-dashed border-black/10 bg-white p-8 text-center mb-5">
          <div className="font-mono text-[0.6rem] tracking-widest uppercase text-black/30 mb-2">No WMS layers configured</div>
          <p className="text-black/40 text-xs">Add WMS endpoints to display spatial data on the interactive map page.</p>
        </div>
      )}
      <div className="space-y-2 mb-5">
        {content.wms_layers.map(layer => (
          <div key={layer.id} className="border border-black/[0.06] bg-white">
            <div className="flex items-center gap-3 px-4 py-3">
              <span className={`w-2 h-2 rounded-full shrink-0 ${layer.visible ? 'bg-green-400' : 'bg-black/15'}`} title={layer.visible ? 'Visible' : 'Hidden'} />
              <span className="flex-1 text-sm text-black truncate">{layer.name || 'Untitled Layer'}</span>
              <span className="font-mono text-[0.55rem] text-black/30 hidden sm:block truncate max-w-[180px]">{layer.url}</span>
              <div className="flex items-center gap-1 shrink-0">
                {layer.url && (
                  <a href={`${layer.url}?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetCapabilities`} target="_blank" rel="noreferrer" className="px-2 py-0.5 text-[0.65rem] border border-black/[0.08] text-[#4A86B8] hover:bg-[#4A86B8]/5 transition-colors">
                    Test ↗
                  </a>
                )}
                <button onClick={() => setExpanded(e => e === layer.id ? null : layer.id)} className="px-2 py-0.5 text-[0.65rem] border border-black/[0.08] text-black/50 hover:text-black/80 transition-colors">{expanded === layer.id ? 'Close' : 'Edit'}</button>
                <button onClick={() => removeWMSLayer(layer.id)} className="px-2 py-0.5 text-[0.65rem] border border-red-200 text-red-400 hover:text-red-600 transition-colors">Remove</button>
              </div>
            </div>
            {expanded === layer.id && (
              <div className="border-t border-black/[0.06] px-4 py-5 bg-[#FAFAF9] grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                <Field label="Layer Name (display)" value={layer.name} onChange={v => updateWMSLayer(layer.id, 'name', v)} placeholder="e.g. Cadastre Boundaries" />
                <Field label="Format" value={layer.format} onChange={v => updateWMSLayer(layer.id, 'format', v)} placeholder="image/png" />
                <div className="sm:col-span-2"><Field label="WMS Endpoint URL" value={layer.url} onChange={v => updateWMSLayer(layer.id, 'url', v)} placeholder="https://your-geoserver.com/geoserver/wms" /></div>
                <div className="sm:col-span-2"><Field label="Layer Names (comma-separated)" value={layer.layers} onChange={v => updateWMSLayer(layer.id, 'layers', v)} placeholder="workspace:layer_name" /></div>
                <Field label="Attribution" value={layer.attribution} onChange={v => updateWMSLayer(layer.id, 'attribution', v)} placeholder="© Airfree Geospatial" />
                <div>
                  <FieldLabel>Opacity (0–1)</FieldLabel>
                  <input type="number" min="0" max="1" step="0.05" value={layer.opacity} onChange={e => updateWMSLayer(layer.id, 'opacity', parseFloat(e.target.value) || 1)} className={INPUT_CLS} suppressHydrationWarning />
                </div>
                <div className="sm:col-span-2"><Field label="Description" value={layer.description} onChange={v => updateWMSLayer(layer.id, 'description', v)} textarea rows={2} /></div>
                <div className="sm:col-span-2 flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm text-black/60 cursor-pointer">
                    <input type="checkbox" checked={layer.transparent} onChange={e => updateWMSLayer(layer.id, 'transparent', e.target.checked)} className="accent-[#4A86B8]" />
                    Transparent background
                  </label>
                  <label className="flex items-center gap-2 text-sm text-black/60 cursor-pointer">
                    <input type="checkbox" checked={layer.visible} onChange={e => updateWMSLayer(layer.id, 'visible', e.target.checked)} className="accent-[#4A86B8]" />
                    Visible on map
                  </label>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={addWMSLayer} className="w-full border border-dashed border-black/20 hover:border-[#4A86B8] text-black/40 hover:text-[#4A86B8] text-xs py-3 transition-colors">
        + Add WMS Layer
      </button>
      <div className="mt-5 p-4 bg-[#4A86B8]/[0.04] border border-[#4A86B8]/20">
        <div className="font-mono text-[0.58rem] tracking-widest uppercase text-[#4A86B8] mb-2">Requires Leaflet</div>
        <p className="text-black/50 text-xs leading-relaxed">The WMS map viewer uses Leaflet.js. Run <code className="bg-black/5 px-1 py-0.5 rounded text-[0.7rem]">npm install leaflet @types/leaflet</code> to enable the interactive map at <code className="bg-black/5 px-1 py-0.5 rounded text-[0.7rem]">/map</code>.</p>
      </div>
    </>
  );
}

function EnquiriesSection({
  enquiries,
  loading,
  onRefresh,
}: {
  enquiries: {
    id: string;
    name: string;
    organisation: string;
    email: string;
    service: string;
    message: string;
    timestamp: string;
  }[];
  loading: boolean;
  onRefresh: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return isoString;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <SectionHeading
          title="Contact Form Enquiries"
          description="View recent project and capability statement enquiries submitted through the contact form. Saved securely to Upstash Redis."
        />
        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-3 py-1.5 text-xs font-mono uppercase tracking-widest border border-black/10 bg-white hover:bg-black/5 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {enquiries.length === 0 ? (
        <div className="border border-dashed border-black/10 bg-white p-8 text-center">
          <div className="font-mono text-[0.6rem] tracking-widest uppercase text-black/30 mb-2">No enquiries found</div>
          <p className="text-black/40 text-xs">Submitted contact forms will appear here.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {enquiries.map(item => (
            <div key={item.id} className="border border-black/[0.06] bg-white">
              <div className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none" onClick={() => setExpanded(e => e === item.id ? null : item.id)}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-black">{item.name}</span>
                    {item.organisation && (
                      <span className="text-xs text-black/40 truncate">({item.organisation})</span>
                    )}
                  </div>
                  <div className="text-xs text-black/50 truncate mt-0.5">{item.service || 'General Enquiry'}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[0.65rem] font-mono text-black/30">{formatDate(item.timestamp)}</div>
                  <div className="text-[0.65rem] text-[#4A86B8] font-semibold mt-0.5">
                    {expanded === item.id ? 'Click to collapse' : 'Click to read'}
                  </div>
                </div>
              </div>
              {expanded === item.id && (
                <div className="border-t border-black/[0.06] px-4 py-4 bg-[#FAFAF9] text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 border-b border-black/[0.05] pb-3">
                    <div>
                      <span className="font-mono text-[0.6rem] text-black/40 block mb-0.5">SENDER EMAIL</span>
                      <a href={`mailto:${item.email}`} className="text-brand-blue hover:underline">{item.email}</a>
                    </div>
                    <div>
                      <span className="font-mono text-[0.6rem] text-black/40 block mb-0.5">SERVICE INTEREST</span>
                      <span className="text-black/70 font-semibold">{item.service || 'General Enquiry'}</span>
                    </div>
                  </div>
                  <div>
                    <span className="font-mono text-[0.6rem] text-black/40 block mb-1">MESSAGE CONTENT</span>
                    <p className="text-black/80 whitespace-pre-wrap leading-relaxed bg-white border border-black/[0.04] p-3 font-mono text-[0.65rem]">
                      {item.message}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Section: Newsletter Subscribers ─────────────────────────────────────────

function SubscribersSection({
  subscribers,
  loading,
  onRefresh,
}: {
  subscribers: { email: string; subscribedAt: string }[];
  loading: boolean;
  onRefresh: () => void;
}) {
  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return iso;
    }
  };

  const handleExport = () => {
    if (subscribers.length === 0) return;
    const csv = ['Email,Subscribed At', ...subscribers.map(s => `${s.email},${s.subscribedAt}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `airfree-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex items-start justify-between mb-6 gap-4">
        <SectionHeading
          title="Newsletter Subscribers"
          description={`${subscribers.length} subscriber${subscribers.length !== 1 ? 's' : ''} collected via the footer newsletter strip. Stored securely in Upstash Redis.`}
        />
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExport}
            disabled={subscribers.length === 0}
            className="px-3 py-1.5 text-xs font-mono uppercase tracking-widest border border-black/10 bg-white hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="px-3 py-1.5 text-xs font-mono uppercase tracking-widest border border-black/10 bg-white hover:bg-black/5 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {subscribers.length === 0 ? (
        <div className="border border-dashed border-black/10 bg-white p-8 text-center">
          <div className="font-mono text-[0.6rem] tracking-widest uppercase text-black/30 mb-2">No subscribers yet</div>
          <p className="text-black/40 text-xs">Email addresses collected via the footer newsletter will appear here.</p>
        </div>
      ) : (
        <div className="border border-black/[0.06] bg-white divide-y divide-black/[0.05]">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_auto] px-4 py-2 bg-[#FAFAF9]">
            <span className="font-mono text-[0.58rem] tracking-widest uppercase text-black/35">Email Address</span>
            <span className="font-mono text-[0.58rem] tracking-widest uppercase text-black/35">Subscribed</span>
          </div>
          {subscribers.map((sub, i) => (
            <div key={`${sub.email}-${i}`} className="grid grid-cols-[1fr_auto] items-center px-4 py-3 hover:bg-black/[0.015] transition-colors">
              <a
                href={`mailto:${sub.email}`}
                className="text-sm text-[#4A86B8] hover:text-navy transition-colors truncate pr-4"
              >
                {sub.email}
              </a>
              <span className="font-mono text-[0.62rem] text-black/35 whitespace-nowrap">
                {formatDate(sub.subscribedAt)}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Section: Send Newsletter ─────────────────────────────────────────────────

function SendNewsletterSection({ subscriberCount }: { subscriberCount: number }) {
  const [subject, setSubject] = useState('');
  const [html, setHtml] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ sent: number; failed: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleSend = async () => {
    if (!subject.trim() || !html.trim() || html === '<p></p>') return;
    setSending(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, html }),
      });
      const data = await res.json();
      if (data.ok) {
        setResult(data);
        setConfirmed(false);
      } else {
        setError(data.error ?? 'Failed to send newsletter.');
      }
    } catch (e) {
      setError('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const ready = subject.trim().length > 0 && html.trim().length > 0 && html !== '<p></p>';

  return (
    <>
      <SectionHeading
        title="Send Newsletter"
        description={`Compose and broadcast to ${subscriberCount} subscriber${subscriberCount !== 1 ? 's' : ''}. Sent from info@airfreegroup.com.au.`}
      />

      {result && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-[2px]">
          <div className="font-mono text-[0.6rem] tracking-widest uppercase text-green-700 mb-1">Newsletter Sent</div>
          <p className="text-sm text-green-800">
            ✓ {result.sent} delivered · {result.failed} failed · {result.total} total
          </p>
          <button
            onClick={() => { setResult(null); setSubject(''); setHtml(''); setConfirmed(false); }}
            className="mt-3 text-[0.6rem] font-mono uppercase tracking-widest text-green-600 hover:text-green-800 underline"
          >
            Compose another →
          </button>
        </div>
      )}

      {error && (
        <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-[2px] text-xs text-red-700">
          {error}
        </div>
      )}

      {!result && (
        <>
          {/* Subject */}
          <div className="mb-5">
            <label className={LABEL_CLS}>Email Subject *</label>
            <input
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="e.g. Airfree Geospatial — Project Update May 2026"
              className={INPUT_CLS}
            />
          </div>

          {/* Body */}
          <div className="mb-6">
            <label className={LABEL_CLS}>Email Body *</label>
            <RichTextEditor value={html} onChange={setHtml} />
          </div>

          {/* Send controls */}
          {!confirmed ? (
            <button
              onClick={() => setConfirmed(true)}
              disabled={!ready || subscriberCount === 0}
              className="px-5 py-2.5 bg-[#0A1628] text-white text-xs font-mono uppercase tracking-widest hover:opacity-85 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {subscriberCount === 0 ? 'No subscribers' : `Preview Send → ${subscriberCount} recipients`}
            </button>
          ) : (
            <div className="border border-amber-200 bg-amber-50 p-4 rounded-[2px] flex items-start gap-4">
              <div className="flex-1">
                <p className="text-xs font-mono uppercase tracking-widest text-amber-700 mb-1">Confirm broadcast</p>
                <p className="text-sm text-amber-800">
                  Send <strong>&ldquo;{subject}&rdquo;</strong> to <strong>{subscriberCount}</strong> subscriber{subscriberCount !== 1 ? 's' : ''}? This cannot be undone.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setConfirmed(false)}
                  className="px-3 py-1.5 text-xs font-mono uppercase tracking-widest border border-black/10 bg-white hover:bg-black/5"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  disabled={sending}
                  className="px-4 py-1.5 bg-[#0A1628] text-white text-xs font-mono uppercase tracking-widest hover:opacity-85 disabled:opacity-50 flex items-center gap-2"
                >
                  {sending ? (
                    <>
                      <span className="inline-block w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin"/>
                      Sending…
                    </>
                  ) : 'Send Now'}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

const NAV_SECTIONS = [
  { id: 'company',    label: 'Company Info' },
  { id: 'hero',       label: 'Hero Slides' },
  { id: 'photos',     label: 'Page Photos' },
  { id: 'pages',      label: 'Page Content' },
  { id: 'services',   label: 'Services' },
  { id: 'projects',   label: 'Projects' },
  { id: 'builder',    label: 'Page Builder' },
  { id: 'enquiries',   label: 'Enquiries' },
  { id: 'subscribers', label: 'Subscribers' },
  { id: 'compose',     label: 'Send Newsletter' },
  { id: 'about',       label: 'About Section' },
  { id: 'locations',  label: 'Locations' },
  { id: 'footer',     label: 'Footer' },
  { id: 'typography', label: 'Typography' },
] as const;

type SectionId = (typeof NAV_SECTIONS)[number]['id'];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [submittingLogin, setSubmittingLogin] = useState(false);
  const [content, setContent] = useState<CMSContent>(DEFAULTS);
  const [saved, setSaved] = useState(false);
  const [synced, setSynced] = useState(false);
  const [saving, setSaving] = useState(false);
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('company');
  const importRef = useRef<HTMLInputElement>(null);
  const laptopRef = useRef<HTMLIFrameElement>(null);
  const phoneRef = useRef<HTMLIFrameElement>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const fetchHistory = () => {
    fetch('/api/cms/history')
      .then(r => r.json())
      .then((entries: HistoryEntry[]) => setHistoryEntries(entries))
      .catch(() => {});
  };

  const [enquiries, setEnquiries] = useState<{
    id: string;
    name: string;
    organisation: string;
    email: string;
    service: string;
    message: string;
    timestamp: string;
  }[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);

  const [subscribers, setSubscribers] = useState<{ email: string; subscribedAt: string }[]>([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(false);

  const fetchSubscribers = () => {
    setLoadingSubscribers(true);
    fetch('/api/newsletter')
      .then(r => r.json())
      .then(data => {
        if (data.ok && data.subscribers) setSubscribers(data.subscribers);
      })
      .catch(err => console.error('Failed to load subscribers:', err))
      .finally(() => setLoadingSubscribers(false));
  };

  const fetchEnquiries = () => {
    setLoadingEnquiries(true);
    fetch('/api/contact')
      .then(r => r.json())
      .then(data => {
        if (data.ok && data.submissions) {
          setEnquiries(data.submissions);
        }
      })
      .catch(err => console.error('Failed to load enquiries:', err))
      .finally(() => setLoadingEnquiries(false));
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setAuthenticated(false);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchEnquiries();
      fetchSubscribers();
      fetchHistory();
    }
  }, [authenticated]);

  // Check auth and load content on mount
  useEffect(() => {
    setMounted(true);

    fetch('/api/auth/status')
      .then(r => r.json())
      .then((data: { authenticated: boolean }) => {
        setAuthenticated(data.authenticated);
        setCheckingAuth(false);
      })
      .catch(() => {
        setAuthenticated(false);
        setCheckingAuth(false);
      });

    const stored = localStorage.getItem('airfree_cms_content');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const merged = {
          ...DEFAULTS,
          ...parsed,
          footer:        { ...DEFAULTS.footer, ...(parsed.footer || {}), social: { ...DEFAULTS.footer.social, ...((parsed.footer as any)?.social || {}) } },
          page_content:  { ...DEFAULTS.page_content,  ...(parsed.page_content  || {}) },
          typography:    { ...DEFAULTS.typography,     ...(parsed.typography    || {}) },
          services:      Array.isArray(parsed.services)   ? parsed.services   : DEFAULTS.services,
          projects:      Array.isArray(parsed.projects)   ? parsed.projects   : DEFAULTS.projects,
          wms_layers:    Array.isArray(parsed.wms_layers) ? parsed.wms_layers : DEFAULTS.wms_layers,
          page_sections: { ...DEFAULTS.page_sections,  ...(parsed.page_sections || {}) },
        };
        setContent(merged);
      } catch {
        // ignore parse errors
      }
    }

    // Fetch live content from Redis (overrides localStorage if Redis has data)
    fetch('/api/cms')
      .then(r => r.json())
      .then((data: CMSContent) => {
        const merged = {
          ...DEFAULTS,
          ...data,
          footer:        { ...DEFAULTS.footer, ...(data.footer || {}), social: { ...DEFAULTS.footer.social, ...((data.footer as any)?.social || {}) } },
          page_content:  { ...DEFAULTS.page_content,  ...(data.page_content  || {}) },
          typography:    { ...DEFAULTS.typography,     ...(data.typography    || {}) },
          page_sections: { ...DEFAULTS.page_sections,  ...(data.page_sections || {}) },
          services:      Array.isArray(data.services)   ? data.services   : DEFAULTS.services,
          projects:      Array.isArray(data.projects)   ? data.projects   : DEFAULTS.projects,
          wms_layers:    Array.isArray(data.wms_layers) ? data.wms_layers : DEFAULTS.wms_layers,
        };
        setContent(merged);
        localStorage.setItem('airfree_cms_content', JSON.stringify(merged));
        setSynced(true);
      })
      .catch(() => {
        // Fall back to localStorage (already loaded above)
        setSynced(true);
      });

    // Load history
    fetchHistory();
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('airfree_cms_content', JSON.stringify(content));
    setSaved(true);
    const t = setTimeout(() => setSaved(false), 2000);
    return () => clearTimeout(t);
  }, [content]);

  // Debounced save to Redis (1.5s after last change)
  useEffect(() => {
    if (!synced) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      setSaving(true);
      try {
        await fetch('/api/cms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(content),
        });
        fetchHistory();
      } finally {
        setSaving(false);
      }
    }, 1500);
    return () => clearTimeout(saveTimer.current);
  }, [content, synced]);

  // Auto-reload iframes on content change (debounced 900ms)
  useEffect(() => {
    const t = setTimeout(() => {
      reloadPreviews();
    }, 900);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleChange = (path: string, value: string) => {
    setContent(
      prev =>
        deepSet(
          prev as unknown as Record<string, unknown>,
          path,
          value,
        ) as unknown as CMSContent,
    );
  };

  const handleNumber = (key: keyof CMSContent['typography'], value: number) => {
    setContent(prev => ({
      ...prev,
      typography: {
        ...prev.typography,
        [key]: value,
      },
    }));
  };

  const addSlide = () =>
    setContent(prev => ({
      ...prev,
      hero: {
        slides: [
          ...prev.hero.slides,
          {
            id: crypto.randomUUID(),
            photo: '',
            label: 'Enterprise Spatial Intelligence',
            heading: 'AIRFREE GEOSPATIAL',
            body: '',
            cta_primary: 'View Capabilities',
            cta_secondary: 'Request Capability Statement',
          },
        ],
      },
    }));

  const removeSlide = (id: string) =>
    setContent(prev => ({
      ...prev,
      hero: { slides: prev.hero.slides.filter(s => s.id !== id) },
    }));

  const moveSlide = (id: string, dir: -1 | 1) =>
    setContent(prev => {
      const slides = [...prev.hero.slides];
      const idx = slides.findIndex(s => s.id === id);
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= slides.length) return prev;
      [slides[idx], slides[newIdx]] = [slides[newIdx], slides[idx]];
      return { ...prev, hero: { slides } };
    });

  const updateSlide = (id: string, key: keyof HeroSlide, value: string) =>
    setContent(prev => ({
      ...prev,
      hero: {
        slides: prev.hero.slides.map(s => (s.id === id ? { ...s, [key]: value } : s)),
      },
    }));

  // ── Services handlers ─────────────────────────────────────────────────────

  const addService = () =>
    setContent(prev => ({
      ...prev,
      services: [
        ...prev.services,
        {
          id: crypto.randomUUID(),
          slug: '',
          number: String(prev.services.length + 1).padStart(2, '0'),
          title: '',
          shortTitle: '',
          description: '',
          image: '',
          tags: '',
          overview: '',
        },
      ],
    }));

  const removeService = (id: string) =>
    setContent(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }));

  const moveService = (id: string, dir: -1 | 1) =>
    setContent(prev => {
      const arr = [...prev.services];
      const idx = arr.findIndex(s => s.id === id);
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= arr.length) return prev;
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      return { ...prev, services: arr };
    });

  const updateService = (id: string, key: keyof CMSService, value: string) =>
    setContent(prev => ({
      ...prev,
      services: prev.services.map(s => (s.id === id ? { ...s, [key]: value } : s)),
    }));

  // ── Projects handlers ─────────────────────────────────────────────────────

  const addProject = () =>
    setContent(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: crypto.randomUUID(),
          title: '',
          category: '',
          scope: '',
          year: new Date().getFullYear().toString(),
          location: '',
          image: '',
          description: '',
          outcomes: '',
          featured: false,
        },
      ],
    }));

  const removeProject = (id: string) =>
    setContent(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));

  const updateProject = (id: string, key: keyof CMSProject, value: string | boolean) =>
    setContent(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, [key]: value } : p)),
    }));

  // ── WMS handlers ──────────────────────────────────────────────────────────

  const addWMSLayer = () =>
    setContent(prev => ({
      ...prev,
      wms_layers: [
        ...prev.wms_layers,
        {
          id: crypto.randomUUID(),
          name: '',
          url: '',
          layers: '',
          format: 'image/png',
          transparent: true,
          attribution: '© Airfree Geospatial',
          visible: true,
          opacity: 1,
          description: '',
        },
      ],
    }));

  const removeWMSLayer = (id: string) =>
    setContent(prev => ({ ...prev, wms_layers: prev.wms_layers.filter(l => l.id !== id) }));

  const updateWMSLayer = (id: string, key: keyof CMSWMSLayer, value: string | boolean | number) =>
    setContent(prev => ({
      ...prev,
      wms_layers: prev.wms_layers.map(l => (l.id === id ? { ...l, [key]: value } : l)),
    }));

  // ── Page Builder handlers ─────────────────────────────────────────────────

  const reorderSections = (page: keyof CMSContent['page_sections'], fromIdx: number, toIdx: number) =>
    setContent(prev => {
      const arr = [...prev.page_sections[page]];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return { ...prev, page_sections: { ...prev.page_sections, [page]: arr } };
    });

  const toggleSection = (page: keyof CMSContent['page_sections'], id: string) =>
    setContent(prev => ({
      ...prev,
      page_sections: {
        ...prev.page_sections,
        [page]: prev.page_sections[page].map(s =>
          s.id === id ? { ...s, enabled: !s.enabled } : s
        ),
      },
    }));

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target?.result as string) as CMSContent;
        setContent(parsed);
      } catch {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    if (confirm('Reset all content to defaults? This cannot be undone.')) {
      setContent(DEFAULTS);
    }
  };

  const handleRevert = async (timestamp: number) => {
    if (!confirm('Revert to this version?')) return;
    const res = await fetch('/api/cms/revert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timestamp }),
    });
    const json = (await res.json()) as { ok: boolean; data?: CMSContent };
    if (json.ok && json.data) {
      setContent(json.data);
      localStorage.setItem('airfree_cms_content', JSON.stringify(json.data));
      await fetchHistory();
    }
  };

  const reloadPreviews = () => {
    if (laptopRef.current) laptopRef.current.src = laptopRef.current.src;
    if (phoneRef.current) phoneRef.current.src = phoneRef.current.src;
  };

  const handleReload = () => {
    reloadPreviews();
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingLogin(true);
    setLoginError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setAuthenticated(true);
      } else {
        setLoginError(data.error || 'Authentication failed');
      }
    } catch {
      setLoginError('Server error. Please try again.');
    } finally {
      setSubmittingLogin(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  if (!mounted || checkingAuth) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F7F7F5]">
        <div className="font-serif text-sm text-black/40 animate-pulse">Loading Admin Portal...</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="h-screen w-screen bg-[#F7F7F5] flex items-center justify-center px-4">
        <div className="max-w-md w-full border border-black/[0.06] bg-white p-8 sm:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.02)] rounded-[4px] relative overflow-hidden">
          {/* Subtle line decoration */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-blue" />
          
          <div className="text-center mb-10">
            <span className="font-mono text-[0.55rem] tracking-[0.24em] uppercase text-black/40 block mb-2">
              AIRFREE GEOSPATIAL
            </span>
            <h1 className="font-serif text-2xl text-black font-semibold tracking-tight">
              Enterprise CMS Portal
            </h1>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label htmlFor="admin-password" className={LABEL_CLS}>
                Security Credentials
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className={INPUT_CLS}
                autoFocus
              />
              {loginError && (
                <p className="text-red-500 font-mono text-[0.65rem] tracking-wide mt-2">
                  ⚠ {loginError.toUpperCase()}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submittingLogin}
              className={`w-full py-3 text-[0.62rem] font-bold tracking-[0.18em] uppercase rounded-[2px] border transition-all duration-500 select-none ${
                submittingLogin
                  ? 'bg-black/5 border-black/[0.06] text-black/35 cursor-not-allowed'
                  : 'bg-brand-blue border-brand-blue text-white hover:bg-[#3a72a0] hover:border-[#3a72a0] cursor-pointer'
              }`}
            >
              {submittingLogin ? 'Authenticating...' : 'Access CMS'}
            </button>
          </form>

          <div className="text-center mt-10">
            <Link
              href="/"
              className="text-[0.6rem] font-mono tracking-widest text-black/35 hover:text-black/60 uppercase transition-colors"
            >
              ← Return to homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#F7F7F5]">
      {/* ── TOP BAR ──────────────────────────────────────────────────────────── */}
      <header className="shrink-0 bg-white border-b border-black/[0.06] px-6 py-3 flex items-center justify-between z-20">
        {/* Left: brand */}
        <span className="font-serif text-sm text-black">Airfree CMS</span>

        {/* Right: actions */}
        <div className="flex items-center gap-3">
          {saving ? (
            <span className="flex items-center gap-1.5 text-xs text-black/40">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-pulse" />
              Saving...
            </span>
          ) : saved && (
            <span className="flex items-center gap-1.5 text-xs text-green-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Saved
            </span>
          )}
          <button
            onClick={handleReload}
            className="text-xs text-black/40 hover:text-black/70 transition-colors"
          >
            ↺ Reload
          </button>
          <button
            onClick={() => window.open('/', '_blank')}
            className="text-xs px-3 py-1.5 border border-black/20 text-black/50 hover:text-black/80 hover:border-black/40 rounded-[2px] transition-colors"
          >
            Preview Changes ↗
          </button>
          <button
            onClick={() => window.open('https://airfreegeospatial.com.au', '_blank')}
            className="text-xs px-3 py-1.5 border border-black/20 text-black/50 hover:text-black/80 hover:border-black/40 rounded-[2px] transition-colors"
          >
            Live Site ↗
          </button>
          <button
            onClick={handleDownload}
            className="text-xs px-3 py-1.5 bg-[#4A86B8] hover:bg-[#3a72a0] text-white rounded-[2px] transition-colors"
          >
            ⬇ Download JSON
          </button>
          <button
            onClick={handleLogout}
            className="text-xs px-3 py-1.5 border border-red-200 text-red-500 hover:bg-red-50 rounded-[2px] transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* ── BODY (2 columns 50/50) ───────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── LEFT HALF: nav + editor ───────────────────────────────────────── */}
        <div className="w-1/2 flex overflow-hidden border-r border-black/[0.06]">
        {/* ── LEFT NAV (180px) ──────────────────────────────────────────────── */}
        <aside className="w-[180px] shrink-0 bg-white border-r border-black/[0.06] flex flex-col overflow-hidden">
          {/* Brand */}
          <div className="px-5 py-5 border-b border-black/[0.06]">
            <div className="font-serif text-sm font-medium text-black">Airfree CMS</div>
            <div className="font-mono text-[0.55rem] tracking-widest text-black/30 mt-0.5">
              v2.0
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex-1 py-3 overflow-y-auto">
            {NAV_SECTIONS.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`py-2.5 px-5 text-sm w-full text-left transition-colors border-l-2 ${
                  activeSection === section.id
                    ? 'bg-[#4A86B8]/[0.06] text-[#4A86B8] border-[#4A86B8]'
                    : 'text-black/40 hover:text-black/70 border-transparent'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>

          {/* Version History */}
          <div className="border-t border-black/[0.06] mt-auto">
            <button
              onClick={() => setHistoryOpen(o => !o)}
              className="w-full px-5 py-3 text-left flex items-center justify-between text-xs text-black/50 hover:text-black/70 transition-colors"
            >
              <span className="font-mono text-[0.55rem] tracking-widest uppercase">Version History</span>
              <span className="text-black/30">{historyOpen ? '▲' : '▼'}</span>
            </button>
            {historyOpen && (
              <div className="max-h-64 overflow-y-auto border-t border-black/[0.06]">
                {historyEntries.length === 0 ? (
                  <p className="px-5 py-4 text-black/30 text-xs">No saved versions yet.</p>
                ) : historyEntries.map(entry => (
                  <div key={entry.timestamp} className="px-5 py-3 border-b border-black/[0.04] flex flex-col gap-1">
                    <span className="text-black/60 text-xs leading-tight">{entry.label}</span>
                    <button
                      onClick={() => handleRevert(entry.timestamp)}
                      className="text-left text-[#4A86B8] text-[0.65rem] hover:text-[#3a72a0] transition-colors font-mono"
                    >
                      Restore this version →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom actions */}
          <div className="p-4 border-t border-black/[0.06] flex flex-col gap-2">
            <button
              onClick={() => importRef.current?.click()}
              className="w-full border border-black/20 hover:border-black/40 text-black/50 hover:text-black/80 text-xs py-2 transition-colors"
            >
              Import JSON
            </button>
            <input
              ref={importRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <button
              onClick={handleReset}
              className="w-full text-black/25 hover:text-black/50 text-xs py-1.5 transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
        </aside>

        {/* ── EDITOR (flex-1, scrollable) ───────────────────────────────────── */}
        <div className="flex-1 min-w-0 overflow-y-auto bg-[#F7F7F5]">
          <div className="px-8 py-8">
            {activeSection === 'company' && (
              <CompanySection content={content} handleChange={handleChange} />
            )}
            {activeSection === 'hero' && (
              <HeroSlidesSection
                content={content}
                addSlide={addSlide}
                removeSlide={removeSlide}
                moveSlide={moveSlide}
                updateSlide={updateSlide}
              />
            )}
            {activeSection === 'photos' && (
              <PagePhotosSection content={content} handleChange={handleChange} />
            )}
            {activeSection === 'about' && (
              <AboutSection content={content} handleChange={handleChange} />
            )}
            {activeSection === 'locations' && (
              <LocationsSection content={content} handleChange={handleChange} />
            )}
            {activeSection === 'footer' && (
              <FooterSection content={content} handleChange={handleChange} />
            )}
            {activeSection === 'typography' && (
              <TypographySection content={content} handleChange={handleChange} handleNumber={handleNumber} />
            )}
            {activeSection === 'pages' && (
              <PageContentSection content={content} handleChange={handleChange} />
            )}
            {activeSection === 'services' && (
              <ServicesSection
                content={content}
                addService={addService}
                removeService={removeService}
                moveService={moveService}
                updateService={updateService}
              />
            )}
            {activeSection === 'projects' && (
              <ProjectsSection
                content={content}
                addProject={addProject}
                removeProject={removeProject}
                updateProject={updateProject}
              />
            )}
            {activeSection === 'builder' && (
              <PageBuilderSection
                content={content}
                reorderSections={reorderSections}
                toggleSection={toggleSection}
              />
            )}
            {activeSection === 'enquiries' && (
              <EnquiriesSection
                enquiries={enquiries}
                loading={loadingEnquiries}
                onRefresh={fetchEnquiries}
              />
            )}
            {activeSection === 'subscribers' && (
              <SubscribersSection
                subscribers={subscribers}
                loading={loadingSubscribers}
                onRefresh={fetchSubscribers}
              />
            )}
            {activeSection === 'compose' && (
              <SendNewsletterSection subscriberCount={subscribers.length} />
            )}
          </div>
        </div>
        </div>{/* end left half */}

        {/* ── RIGHT HALF: device mockups ────────────────────────────────────── */}
        <div className="w-1/2 bg-[#ECEAE8] flex items-center justify-center">
          <div style={{ position: 'relative', userSelect: 'none' }}>

            {/* ── LAPTOP MOCKUP ── */}
            <div>
              {/* Lid / screen bezel */}
              <div style={{
                width: 500,
                background: '#1e1e1e',
                borderRadius: '10px 10px 0 0',
                padding: '10px 10px 8px',
                boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
              }}>
                {/* Camera dot */}
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#333', margin: '0 auto 6px' }} />
                {/* Screen — 16:10 aspect */}
                <div style={{
                  width: 480,
                  height: 300,
                  background: '#000',
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <iframe
                    ref={laptopRef}
                    src="/"
                    title="Desktop preview"
                    onLoad={() => { try { const d = laptopRef.current?.contentDocument; if (d) { const s = d.createElement('style'); s.textContent = '::-webkit-scrollbar{display:none}*{scrollbar-width:none;-ms-overflow-style:none}'; d.head.appendChild(s); } } catch {} }}
                    style={{
                      position: 'absolute',
                      top: 0, left: 0,
                      width: 1280,
                      height: 800,
                      border: 'none',
                      transform: `scale(${480 / 1280})`,
                      transformOrigin: 'top left',
                    }}
                  />
                </div>
              </div>
              {/* Hinge line */}
              <div style={{ width: 500, height: 3, background: '#111' }} />
              {/* Keyboard base — wider trapezoid illusion */}
              <div style={{
                width: 524,
                marginLeft: -12,
                height: 14,
                background: 'linear-gradient(to bottom, #cccccc, #b8b8b8)',
                borderRadius: '0 0 6px 6px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
              }} />
              <div style={{
                width: 560,
                marginLeft: -30,
                height: 6,
                background: '#aaaaaa',
                borderRadius: '0 0 4px 4px',
              }} />
            </div>

            {/* ── PHONE MOCKUP — overlapping bottom-right ── */}
            <div style={{
              position: 'absolute',
              bottom: 10,
              right: -70,
              width: 120,
              background: '#1a1a1a',
              borderRadius: 22,
              padding: '8px 6px',
              boxShadow: '0 16px 50px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.06)',
              zIndex: 10,
            }}>
              {/* Notch */}
              <div style={{ width: 36, height: 8, background: '#000', borderRadius: '0 0 8px 8px', margin: '0 auto 4px' }} />
              {/* Screen */}
              <div
                style={{
                  width: 108,
                  height: 220,
                  background: '#000',
                  borderRadius: 14,
                  overflow: 'hidden',
                  position: 'relative',
                }}
                onWheel={(e) => {
                  e.preventDefault();
                  phoneRef.current?.contentWindow?.scrollBy({ top: e.deltaY * (390 / 108), behavior: 'auto' });
                }}
              >
                <iframe
                  ref={phoneRef}
                  src="/"
                  title="Mobile preview"
                  onLoad={() => { try { const d = phoneRef.current?.contentDocument; if (d) { const s = d.createElement('style'); s.textContent = '::-webkit-scrollbar{display:none}*{scrollbar-width:none;-ms-overflow-style:none}'; d.head.appendChild(s); } } catch {} }}
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: 390,
                    height: 844,
                    border: 'none',
                    transform: `scale(${108 / 390})`,
                    transformOrigin: 'top left',
                  }}
                />
              </div>
              {/* Home indicator */}
              <div style={{ width: 36, height: 4, background: '#333', borderRadius: 2, margin: '5px auto 0' }} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
