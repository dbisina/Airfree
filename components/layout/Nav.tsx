'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS } from '@/lib/constants';
import { AnimatePresence, motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'blur(2px)',
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const transparent = !scrolled && !mobileOpen;

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const linkCls = (href: string) =>
    `px-4 py-1.5 text-[0.62rem] font-nav font-bold tracking-[0.16em] uppercase transition-all duration-300 ${
      transparent
        ? isActive(href) ? 'text-white' : 'text-white/60 hover:text-white'
        : isActive(href) ? 'text-brand-blue' : 'text-ink-2 hover:text-ink'
    }`;

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl z-50 rounded-[4px] border transition-all duration-700 ${
          transparent
            ? 'bg-navy/15 border-white/[0.08] backdrop-blur-md shadow-none'
            : 'bg-white/[0.9] border-black/[0.05] backdrop-blur-md shadow-[0_8px_32px_rgba(10,22,40,0.06)]'
        }`}
      >
        <div className="flex items-center justify-between h-14 px-1.5 sm:px-3 md:px-5">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo.png"
              alt="Airfree Geospatial"
              width={150}
              height={44}
              className={`max-w-[110px] h-8 w-auto object-contain transition-all duration-700 ${transparent ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(link => {
              if (link.children) {
                return (
                  <div
                    key={link.href}
                    className="relative group"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link href={link.href} className={`${linkCls(link.href)} flex items-center gap-1.5`}>
                      {link.label}
                      <svg
                        width="9" height="6" viewBox="0 0 9 6" fill="none"
                        className={`transition-all duration-300 ${transparent ? 'opacity-60' : 'opacity-40'} group-hover:rotate-180 duration-200`}
                      >
                        <path d="M1 1L4.5 4.5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </Link>
                    {/* Dropdown — always white regardless of nav transparency */}
                    <div className={`absolute top-[calc(100%+0.5rem)] left-0 w-72 bg-white border border-black/[0.06] rounded-[4px] shadow-[0_16px_48px_rgba(10,22,40,0.12)] p-2 transition-all duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] ${servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                      <div className="py-1">
                        {link.children.map(child => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2 text-xs rounded-[2px] transition-colors ${
                              pathname === child.href ? 'text-brand-blue bg-surface' : 'text-ink-2 hover:text-ink hover:bg-surface'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                        <div className="border-t border-black/[0.05] mt-1.5 pt-1.5">
                          <Link href="/services" className="block px-4 py-2 text-[0.65rem] font-bold tracking-wider text-brand-blue hover:text-navy transition-colors uppercase">
                            View All Services →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return <Link key={link.href} href={link.href} className={linkCls(link.href)}>{link.label}</Link>;
            })}
          </div>

          {/* Right: Contact + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className={`hidden md:inline-flex items-center px-5.5 py-1.5 text-[0.65rem] font-nav font-bold tracking-[0.16em] uppercase rounded-[2px] border transition-all duration-300 ${
                transparent
                  ? 'border-white/30 bg-white/5 text-white hover:bg-white hover:text-navy'
                  : 'border-brand-blue bg-brand-blue text-white hover:bg-[#3a72a0] hover:border-[#3a72a0]'
              }`}
            >
              Contact
            </Link>
            {/* Morphing hamburger → X */}
            <button
              className={`md:hidden relative w-10 h-10 flex items-center justify-center transition-colors duration-300 ${transparent ? 'text-white' : 'text-ink-2 hover:text-ink'}`}
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
              <span className="absolute w-5 h-px bg-current block"
                style={{
                  top: '50%',
                  transform: mobileOpen ? 'translateY(0px) rotate(45deg)' : 'translateY(-5px)',
                  transition: 'transform 450ms cubic-bezier(0.16,1,0.3,1)',
                }}
              />
              <span className="absolute w-5 h-px bg-current block"
                style={{
                  top: '50%',
                  opacity: mobileOpen ? 0 : 1,
                  transform: mobileOpen ? 'scaleX(0)' : 'scaleX(1)',
                  transition: 'opacity 450ms cubic-bezier(0.16,1,0.3,1), transform 450ms cubic-bezier(0.16,1,0.3,1)',
                }}
              />
              <span className="absolute w-5 h-px bg-current block"
                style={{
                  top: '50%',
                  transform: mobileOpen ? 'translateY(0px) rotate(-45deg)' : 'translateY(5px)',
                  transition: 'transform 450ms cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay — white luxury panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white flex flex-col overflow-y-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Overlay header: logo + close */}
            <div className="flex items-center justify-between px-4 sm:px-6 h-14 border-b border-black/[0.06] shrink-0">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Airfree Geospatial"
                  width={150}
                  height={44}
                  className="max-w-[110px] h-8 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 flex items-center justify-center text-ink-2 hover:text-ink transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Nav links with staggered reveal */}
            <div className="flex flex-col px-5 sm:px-8 pt-6 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    className="block py-5 font-serif text-xl sm:text-2xl font-light text-ink border-b border-black/[0.06] hover:text-brand-blue transition-colors duration-200"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-2 py-3 flex flex-col gap-0.5 border-b border-black/[0.06]">
                      {link.children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="py-2 text-ink-2 text-sm hover:text-brand-blue transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* CTA button */}
              <motion.div className="pt-10 pb-6" variants={itemVariants}>
                <Link
                  href="/contact"
                  className="flex items-center justify-center w-full px-8 py-3.5 rounded-[2px] bg-brand-blue text-white text-sm font-nav font-medium hover:bg-[#3a72a0] transition-colors duration-200 text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>

            {/* Subtle footer */}
            <motion.div
              className="px-5 sm:px-8 py-6 border-t border-black/[0.06] shrink-0"
              variants={itemVariants}
            >
              <p className="text-xs text-ink-2/50 tracking-wide">Airfree Geospatial Solutions</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
