'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';


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
        cta_primary: 'View Capabilities',
        cta_secondary: 'Request Capability Statement',
      },
      {
        id: 'slide-2',
        photo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
        label: 'Enterprise Spatial Intelligence',
        heading: 'AIRFREE GEOSPATIAL',
        body: 'Advanced remote sensing and satellite analytics for infrastructure monitoring and environmental intelligence across Australia.',
        cta_primary: 'View Capabilities',
        cta_secondary: 'Request Capability Statement',
      },
      {
        id: 'slide-3',
        photo: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80',
        label: 'Enterprise Spatial Intelligence',
        heading: 'AIRFREE GEOSPATIAL',
        body: 'Enterprise GIS and spatial data infrastructure powering decisions for utilities, government and large-scale engineering operations.',
        cta_primary: 'View Capabilities',
        cta_secondary: 'Request Capability Statement',
      },
      {
        id: 'slide-4',
        photo: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1920&q=80',
        label: 'Enterprise Spatial Intelligence',
        heading: 'AIRFREE GEOSPATIAL',
        body: 'Precision drone photogrammetry and 3D spatial engineering for complex terrain, infrastructure, and environmental surveys.',
        cta_primary: 'View Capabilities',
        cta_secondary: 'Request Capability Statement',
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

const NAV_SECTIONS = [
  { id: 'company', label: 'Company Info' },
  { id: 'hero', label: 'Hero Slides' },
  { id: 'photos', label: 'Page Photos' },
  { id: 'about', label: 'About Section' },
  { id: 'locations', label: 'Locations' },
  { id: 'footer', label: 'Footer' },
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

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setAuthenticated(false);
    } catch {
      // ignore
    }
  };

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
          typography: {
            ...DEFAULTS.typography,
            ...(parsed.typography || {}),
          },
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
          typography: {
            ...DEFAULTS.typography,
            ...(data.typography || {}),
          },
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
