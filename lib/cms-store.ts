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

export interface CMSContent {
  company: { name: string; abn: string; tagline: string; email: string; phone: string; phone_note: string; };
  hero: { slides: HeroSlide[]; };
  page_photos: { about: string; services: string; contact: string; industries: string; products: string; projects: string; technology: string; };
  about_intro: { heading: string; tagline: string; body: string; photo: string; };
  locations: { adelaide: CMSLocation; perth: CMSLocation; melbourne: CMSLocation; };
  footer: { brand_tagline: string; description: string; copyright_entity: string; };
  typography: {
    body_size: number;
    heading_font: string; // 'playfair' | 'cormorant'
    body_font: string;    // 'inter' | 'jakarta'
    nav_font_target: string;
    label_font_target: string;
    button_font_target: string;
    heading_size: number;
    nav_size: number;
    button_size: number;
    label_size: number;
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
      { id: 'slide-1', photo: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=80', label: 'Enterprise Spatial Intelligence', heading: 'AIRFREE\nGEOSPATIAL', body: 'Delivering mission-critical geospatial solutions for government authorities, utility networks, and large-scale engineering operations across Australia.', cta_primary: 'View Services', cta_secondary: 'Contact Us' },
      { id: 'slide-2', photo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80', label: 'Spatial Intelligence', heading: 'AIRFREE\nGEOSPATIAL', body: 'Delivering mission-critical geospatial solutions for government authorities, utility networks, and large-scale engineering operations across Australia.', cta_primary: 'View Services', cta_secondary: 'Contact Us' },
      { id: 'slide-3', photo: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80', label: 'Infrastructure Analytics', heading: 'AIRFREE\nGEOSPATIAL', body: 'Delivering mission-critical geospatial solutions for government authorities, utility networks, and large-scale engineering operations across Australia.', cta_primary: 'View Services', cta_secondary: 'Contact Us' },
      { id: 'slide-4', photo: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1920&q=80', label: 'Geospatial Services', heading: 'AIRFREE\nGEOSPATIAL', body: 'Delivering mission-critical geospatial solutions for government authorities, utility networks, and large-scale engineering operations across Australia.', cta_primary: 'View Services', cta_secondary: 'Contact Us' },
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
    adelaide: { label: 'Head Office', city: 'Adelaide, SA', address_line1: '35 Cassia Street', address_line2: 'Munno Para West', address_line3: 'SA 5115, Australia' },
    perth: { label: 'Branch Office', city: 'Perth, WA', address_line1: '8 Seddon Way', address_line2: 'Canning Vale', address_line3: 'WA 6155, Australia' },
    melbourne: { label: 'Branch Office', city: 'Melbourne, VIC', address_line1: '324 Settlement Road', address_line2: 'Thomastown', address_line3: 'VIC 3072, Australia' },
  },
  footer: {
    brand_tagline: 'Enterprise Spatial Intelligence',
    description: 'A specialised geospatial intelligence and infrastructure analytics consultancy serving government, utilities, and large-scale engineering operations.',
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

export function readCMS(): CMSContent {
  if (typeof window === 'undefined') return CMS_DEFAULTS;
  try {
    const stored = localStorage.getItem(CMS_KEY);
    if (!stored) return CMS_DEFAULTS;
    const parsed = JSON.parse(stored);
    return {
      ...CMS_DEFAULTS,
      ...parsed,
      typography: {
        ...CMS_DEFAULTS.typography,
        ...(parsed.typography || {}),
      },
    } as CMSContent;
  } catch {
    return CMS_DEFAULTS;
  }
}
