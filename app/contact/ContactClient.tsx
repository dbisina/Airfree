'use client';

import { useState, useEffect } from 'react';
import { useCMS } from '@/lib/useCMS';
import { PageHero } from '@/components/sections/PageHero';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';

// ── Map extras ─────────────────────────────────────────────────────────────────

const mapExtras = {
  adelaide: {
    osmSrc: 'https://www.openstreetmap.org/export/embed.html?bbox=138.680%2C-34.685%2C138.730%2C-34.645&layer=mapnik&marker=-34.6656%2C138.7063',
    mapsUrl: 'https://www.google.com/maps/dir//35+Cassia+Street+Munno+Para+West+SA+5115',
  },
  perth: {
    osmSrc: 'https://www.openstreetmap.org/export/embed.html?bbox=115.880%2C-32.080%2C115.950%2C-32.035&layer=mapnik&marker=-32.0576%2C115.9181',
    mapsUrl: 'https://www.google.com/maps/dir//8+Seddon+Way+Canning+Vale+WA+6155',
  },
  melbourne: {
    osmSrc: 'https://www.openstreetmap.org/export/embed.html?bbox=144.990%2C-37.710%2C145.045%2C-37.655&layer=mapnik&marker=-37.6806%2C145.0155',
    mapsUrl: 'https://www.google.com/maps/dir//324+Settlement+Road+Thomastown+VIC+3072',
  },
};

// ── Styles ─────────────────────────────────────────────────────────────────────

const inputClass =
  'w-full border border-border-s bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-3 focus:outline-none focus:border-brand-blue transition-colors';

const labelClass =
  'block text-xs font-mono uppercase tracking-widest text-ink-3 mb-2';

// ── Component ──────────────────────────────────────────────────────────────────

export default function ContactClient() {
  const cms = useCMS();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    email: '',
    service: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Failed to send enquiry.');
      }

      setSuccess(true);
      setFormData({
        name: '',
        organisation: '',
        email: '',
        service: '',
        message: '',
      });
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const company = cms.company;
  const offices = [
    { key: 'adelaide', ...cms.locations.adelaide, ...mapExtras.adelaide },
    { key: 'perth', ...cms.locations.perth, ...mapExtras.perth },
    { key: 'melbourne', ...cms.locations.melbourne, ...mapExtras.melbourne },
  ];

  return (
    <>
      {/* Hero */}
      <PageHero
        label="Contact"
        title="Get in Touch"
        subtitle="Project enquiries, capability statement requests, and general information. Response within two business days."
        imageKey="contact"
      />

      {/* Contact + Form */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24">
          <div className="flex flex-col md:flex-row gap-10 md:gap-14 lg:gap-24">

            {/* Left: Direct Contact */}
            <div className="max-w-xs w-full shrink-0">
              <RevealOnScroll>
                <SectionLabel className="mb-4">Direct Contact</SectionLabel>
                <h2
                  className="font-serif font-semibold text-ink mb-6"
                  style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)' }}
                >
                  Reach Us Directly
                </h2>

                <div>
                  <div className="flex items-baseline gap-4 py-3 border-t border-b border-border-s">
                    <span className="font-mono text-[0.6rem] tracking-widest uppercase text-ink-3 w-20 shrink-0">
                      EMAIL
                    </span>
                    <a
                      href={`mailto:${company.email}`}
                      className="text-sm text-brand-blue hover:text-navy transition-colors break-all"
                    >
                      {company.email}
                    </a>
                  </div>
                  <div className="flex items-baseline gap-4 py-3 border-b border-border-s">
                    <span className="font-mono text-[0.6rem] tracking-widest uppercase text-ink-3 w-20 shrink-0">
                      PHONE
                    </span>
                    <span className="text-sm text-ink">{company.phone}</span>
                  </div>
                  <div className="flex items-baseline gap-4 py-3 border-b border-border-s">
                    <span className="font-mono text-[0.6rem] tracking-widest uppercase text-ink-3 w-20 shrink-0">
                      ABN
                    </span>
                    <span className="font-mono text-sm text-ink">{company.abn}</span>
                  </div>
                </div>

                <SectionLabel className="mt-8 mb-3">Enquiry Types</SectionLabel>
                <ul className="flex flex-col gap-2 text-sm text-ink-2">
                  <li>Project Scope Consultations</li>
                  <li>Capability Statement Requests</li>
                  <li>Panel &amp; Tender Opportunities</li>
                  <li>Technical Briefings</li>
                </ul>
              </RevealOnScroll>
            </div>

            {/* Right: Form */}
            <div className="flex-1 max-w-lg">
              <RevealOnScroll>
                <SectionLabel className="mb-4">Submit an Enquiry</SectionLabel>
                <h2
                  className="font-serif font-semibold text-ink mb-6"
                  style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)' }}
                >
                  Project Enquiry Form
                </h2>

                {/* ── Form Logic ── */}
                {!mounted ? (
                  <div className="py-12 flex items-center justify-center border border-border-s bg-surface font-mono text-[0.65rem] uppercase tracking-widest text-ink-3">
                    Loading...
                  </div>
                ) : success ? (
                  <div className="bg-brand-blue/5 border border-brand-blue/20 p-8 rounded-[2px] text-center">
                    <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-4">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-brand-blue">
                        <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="font-serif text-base font-semibold text-ink mb-2">Enquiry Sent</h3>
                    <p className="text-xs text-ink-2 mb-6 leading-relaxed">
                      Thank you for contacting Airfree Geospatial. We have received your message and will respond within two business days.
                    </p>
                    <Button onClick={() => setSuccess(false)} variant="primary">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {error && (
                      <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs rounded-[2px] leading-relaxed">
                        {error}
                      </div>
                    )}
                    <div className="mb-5">
                      <label htmlFor="contact-name" className={labelClass}>
                        Name <span className="text-brand-blue">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className={inputClass}
                        required
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="contact-organisation" className={labelClass}>
                        Organisation
                      </label>
                      <input
                        id="contact-organisation"
                        type="text"
                        name="organisation"
                        placeholder="Company or agency name"
                        value={formData.organisation}
                        onChange={e => setFormData(prev => ({ ...prev, organisation: e.target.value }))}
                        className={inputClass}
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="contact-email" className={labelClass}>
                        Email <span className="text-brand-blue">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="you@organisation.com"
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className={inputClass}
                        required
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="contact-service" className={labelClass}>
                        Service Interest
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        className={inputClass}
                        value={formData.service}
                        onChange={e => setFormData(prev => ({ ...prev, service: e.target.value }))}
                      >
                        <option value="">Select a service area</option>
                        <option value="GIS & Spatial Infrastructure">
                          GIS &amp; Spatial Infrastructure
                        </option>
                        <option value="Digital Mapping & Web GIS">
                          Digital Mapping &amp; Web GIS
                        </option>
                        <option value="Drone & Photogrammetry">
                          Drone &amp; Photogrammetry
                        </option>
                        <option value="Remote Sensing & AI">
                          Remote Sensing &amp; AI
                        </option>
                        <option value="Infrastructure & Utilities">
                          Infrastructure &amp; Utilities
                        </option>
                        <option value="Survey Data & QA/QC">
                          Survey Data &amp; QA/QC
                        </option>
                        <option value="Environmental Intelligence">
                          Environmental Intelligence
                        </option>
                        <option value="General Enquiry">General Enquiry</option>
                      </select>
                    </div>

                    <div className="mb-5">
                      <label htmlFor="contact-message" className={labelClass}>
                        Message <span className="text-brand-blue">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        placeholder="Describe your project or enquiry..."
                        value={formData.message}
                        onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className={`${inputClass} resize-y`}
                        required
                      />
                    </div>

                    <Button type="submit" variant="primary" disabled={loading}>
                      {loading ? 'Sending...' : 'Submit Enquiry'}
                    </Button>

                    <p className="text-xs text-ink-3 mt-3">
                      Your message will be sent to {company.email}. Response within 2 business days.
                    </p>
                  </form>
                )}
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24">
          <RevealOnScroll>
            <SectionLabel className="mb-4">Our Offices</SectionLabel>
            <h2
              className="font-serif font-semibold text-ink mb-12"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
            >
              National Presence
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {offices.map(office => (
              <RevealOnScroll key={office.city}>
                <div className="bg-white border border-border-s overflow-hidden">
                  <iframe
                    src={office.osmSrc}
                    title={`${office.city} office location`}
                    width="100%"
                    height="280"
                    loading="lazy"
                    className="block border-0"
                  />
                  <div className="p-6">
                    <span className="font-mono text-[0.55rem] tracking-widest uppercase bg-navy text-white px-2.5 py-1 inline-block mb-3">
                      {office.label}
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-ink mb-2">
                      {office.city}
                    </h3>
                    <address className="not-italic text-sm text-ink-2 leading-relaxed mb-4">
                      {office.address_line1}<br />
                      {office.address_line2 && <>{office.address_line2}<br /></>}
                      {office.address_line3}
                    </address>
                    <a
                      href={office.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono uppercase tracking-widest text-brand-blue hover:text-navy transition-colors"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Capability Statement CTA */}
      <section id="capability" className="bg-navy py-16 sm:py-24 px-4 sm:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <RevealOnScroll>
            <SectionLabel className="text-white/50 mb-5 flex justify-center">
              Capability Statement
            </SectionLabel>
            <h2
              className="font-serif text-white mb-4 leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)' }}
            >
              Request a Capability Statement
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md mx-auto">
              Our capability statement provides a comprehensive overview of our
              service portfolio, project experience, technical qualifications,
              and personnel credentials. Available to registered procuring
              organisations.
            </p>
            <Button href={`mailto:${company.email}`} variant="ghost">
              Request via Email
            </Button>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
