'use client';
import Link from 'next/link';
import Image from 'next/image';
import { SERVICES } from '@/lib/constants';
import { useCMS } from '@/lib/useCMS';
import { FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();
  const cms = useCMS();
  const footerContent = cms.footer;
  const company = cms.company;

  return (
    <footer className="bg-navy text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <Image src="/images/logo-v2.png" alt={company.name} width={110} height={28} className="w-[110px] h-[28px] object-contain mb-4 brightness-0 invert" />
            <p className="text-sm leading-relaxed mb-4 text-white/50">
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
          <div className="flex items-center gap-5">
            <a href="#" aria-label="LinkedIn" className="text-white/30 hover:text-white/70 transition-colors"><FaLinkedin size={16} /></a>
            <a href="#" aria-label="Twitter" className="text-white/30 hover:text-white/70 transition-colors"><FaTwitter size={16} /></a>
            <a href="#" aria-label="YouTube" className="text-white/30 hover:text-white/70 transition-colors"><FaYoutube size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
