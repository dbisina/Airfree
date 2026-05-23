'use client';
import Link from 'next/link';
import Image from 'next/image';
import { SERVICES } from '@/lib/constants';
import { useCMS } from '@/lib/useCMS';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();
  const cms = useCMS();
  const footerContent = cms.footer;
  const company = cms.company;

  return (
    <footer className="bg-navy text-white/70">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <Image src="/images/airfreelogo.png" alt={company.name} width={140} height={40} className="h-9 w-auto object-contain mb-4 brightness-0 invert" />
            <p className="mb-4 font-mono text-[0.56rem] tracking-widest uppercase text-white/20">
            {footerContent.brand_tagline}
          </p>
            <p className="text-sm leading-relaxed mb-4  text-white/50">
              {footerContent.description}
            </p>
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-white/30">
              ABN {company.abn}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-xs font-medium tracking-widest uppercase mb-5">Services</h3>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map(s => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-white/50 hover:text-white/80 transition-colors">
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-xs font-medium tracking-widest uppercase mb-5">Contact</h3>
            <div className="flex flex-col gap-3">
              <div>
                <div className="font-mono text-[0.56rem] tracking-widest uppercase text-white/30 mb-0.5">Email</div>
                <a href={`mailto:${company.email}`} className="text-sm text-white/60 hover:text-white transition-colors">{company.email}</a>
              </div>
              <div>
                <div className="font-mono text-[0.56rem] tracking-widest uppercase text-white/30 mb-0.5">Phone</div>
                <p className="text-sm text-white/60">{company.phone}</p>
              </div>
              <div>
                <div className="font-mono text-[0.56rem] tracking-widest uppercase text-white/30 mb-0.5">{cms.locations.adelaide.label}</div>
                <p className="text-sm text-white/60 leading-relaxed">
                  {cms.locations.adelaide.address_line1}<br />
                  {cms.locations.adelaide.address_line2 && <>{cms.locations.adelaide.address_line2}<br /></>}
                  {cms.locations.adelaide.address_line3}
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              {['/about', '/services', '/contact', '/projects'].map(href => (
                <Link key={href} href={href} className="text-xs text-white/40 hover:text-white/70 transition-colors capitalize">
                  {href.replace('/', '')}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {year} {footerContent.copyright_entity}. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-ink-3 hover:text-brand-blue transition-colors"
            >
              <FaLinkedin size={18} />
            </a>

            <a
              href="#"
              className="text-ink-3 hover:text-brand-blue transition-colors"
            >
              <FaTwitter size={18} />
            </a>

            <a
              href="#"
              className="text-ink-3 hover:text-brand-blue transition-colors"
            >
              <FaFacebook size={18} />
            </a>

            <a
              href="#"
              className="text-ink-3 hover:text-brand-blue transition-colors"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="#"
              className="text-ink-3 hover:text-brand-blue transition-colors"
            >
              <FaYoutube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
