'use client';
import Link from 'next/link';
import Image from 'next/image';
import { SERVICES } from '@/lib/constants';
import { useCMS } from '@/lib/useCMS';
import { NewsletterStrip } from '@/components/sections/NewsletterStrip';

// ── Inline SVG social icons (ultra-light, precise) ────────────────────────────

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function TwitterXIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" stroke="currentColor" fill="none"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  linkedin:  <LinkedInIcon />,
  twitter:   <TwitterXIcon />,
  youtube:   <YouTubeIcon />,
  facebook:  <FacebookIcon />,
  instagram: <InstagramIcon />,
};

const SOCIAL_LABELS: Record<string, string> = {
  linkedin:  'LinkedIn',
  twitter:   'X / Twitter',
  youtube:   'YouTube',
  facebook:  'Facebook',
  instagram: 'Instagram',
};

// ── Footer ─────────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();
  const cms = useCMS();
  const footerContent = cms.footer;
  const company = cms.company;
  const social = footerContent.social ?? {};

  // Only render social icons that have a URL configured
  const activeSocials = Object.entries(social).filter(([, url]) => url?.trim());

  return (
    <>
      <NewsletterStrip />

      <footer className="bg-navy text-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 pb-12 border-b border-white/[0.08]">

            {/* Brand */}
            <div>
              <Image
                src="/images/logo-v2.png"
                alt={company.name}
                width={110}
                height={28}
                className="w-[110px] h-[28px] object-contain mb-5 brightness-0 invert"
              />
              <p className="text-sm leading-relaxed mb-5 text-white/45">
                {footerContent.description}
              </p>
              <p className="font-mono text-[0.58rem] tracking-[0.16em] uppercase text-white/25">
                ABN {company.abn}
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white text-[0.6rem] font-mono tracking-widest uppercase mb-5">Services</h3>
              <ul className="flex flex-col gap-2.5">
                {SERVICES.map(s => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-sm text-white/45 hover:text-white/80 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    >
                      {s.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white text-[0.6rem] font-mono tracking-widest uppercase mb-5">Contact</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <div className="font-mono text-[0.54rem] tracking-widest uppercase text-white/25 mb-1">Email</div>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-sm text-white/55 hover:text-white transition-colors duration-300"
                  >
                    {company.email}
                  </a>
                </div>
                <div>
                  <div className="font-mono text-[0.54rem] tracking-widest uppercase text-white/25 mb-1">Phone</div>
                  <p className="text-sm text-white/55">{company.phone}</p>
                </div>
                <div>
                  <div className="font-mono text-[0.54rem] tracking-widest uppercase text-white/25 mb-1">
                    {cms.locations.adelaide.label}
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">
                    {cms.locations.adelaide.address_line1}<br />
                    {cms.locations.adelaide.address_line2 && <>{cms.locations.adelaide.address_line2}<br /></>}
                    {cms.locations.adelaide.address_line3}
                  </p>
                </div>
              </div>

              {/* Quick nav */}
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5">
                {['/about', '/services', '/contact', '/projects'].map(href => (
                  <Link
                    key={href}
                    href={href}
                    className="text-[0.58rem] font-mono tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors duration-300 capitalize"
                  >
                    {href.replace('/', '')}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-white/25 font-mono tracking-wide">
              © {year} {footerContent.copyright_entity}. All rights reserved.
            </p>

            {/* Social icons — only shown if URLs configured in CMS */}
            {activeSocials.length > 0 && (
              <div className="flex items-center gap-4">
                {activeSocials.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL_LABELS[platform] ?? platform}
                    className="text-white/25 hover:text-white/70 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px"
                  >
                    {SOCIAL_ICONS[platform]}
                  </a>
                ))}
              </div>
            )}

            {/* Placeholder shown when no social configured */}
            {activeSocials.length === 0 && (
              <p className="text-[0.52rem] font-mono tracking-widest uppercase text-white/15">
                Social links — configure in Admin → Footer
              </p>
            )}
          </div>
        </div>
      </footer>
    </>
  );
}
