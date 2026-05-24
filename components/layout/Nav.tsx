'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS } from '@/lib/constants';
import { AnimatePresence, motion, Variants } from 'framer-motion';

// ── Motion config ─────────────────────────────────────────────────────────────

const SPRING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const overlayVariants: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.85, ease: SPRING, staggerChildren: 0.07, delayChildren: 0.12 },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.6, ease: SPRING },
  },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.6,  ease: SPRING } },
  exit:    { opacity: 0, y: -8, filter: 'blur(2px)', transition: { duration: 0.35, ease: SPRING } },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function Nav() {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const transparent = !scrolled && !mobileOpen;

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  // ── Nav link classes ────────────────────────────────────────────────────────

  const linkCls = (href: string) =>
    [
      'relative px-4 lg:px-5 py-2 rounded-[2px]',
      'text-[0.58rem] lg:text-[0.64rem] font-nav font-bold tracking-[0.13em] lg:tracking-[0.17em] uppercase',
      'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
      transparent
        ? isActive(href)
          ? 'text-white'
          : 'text-white/55 hover:text-white hover:bg-white/[0.06]'
        : isActive(href)
          ? 'text-brand-blue bg-brand-blue/[0.06]'
          : 'text-ink-2/80 hover:text-ink hover:bg-black/[0.04]',
    ].join(' ');

  return (
    <>
      {/* ── FLOATING ISLAND NAV ────────────────────────────────────────────── */}
      <nav
        className={[
          'fixed top-5 left-1/2 -translate-x-1/2 z-50',
          'w-[calc(100%-1.5rem)] max-w-6xl',
          'rounded-[4px] border',
          'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          transparent
            ? 'bg-white/[0.05] border-white/[0.10] backdrop-blur-xl shadow-none'
            : 'bg-white/[0.92] border-black/[0.06] backdrop-blur-xl shadow-[0_8px_40px_rgba(10,22,40,0.07),0_1px_4px_rgba(10,22,40,0.04)]',
        ].join(' ')}
      >
        <div className="flex items-center justify-between h-16 px-3 sm:px-4 lg:px-5">

          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center shrink-0 group">
            <Image
              src="/images/logo-v2.png"
              alt="Airfree Geospatial"
              width={190}
              height={56}
              className={[
                'h-[26px] sm:h-[29px] lg:h-[32px] w-auto object-contain',
                'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                'group-hover:opacity-80',
                transparent ? 'brightness-0 invert' : '',
              ].join(' ')}
            />
          </Link>

          {/* ── Desktop links — show at md+ ───────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-0">

            {NAV_LINKS.map(link => {
              if (link.children) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link href={link.href} className={`${linkCls(link.href)} flex items-center gap-1.5`}>
                      {link.label}
                      <svg
                        width="8" height="5" viewBox="0 0 8 5" fill="none"
                        className={[
                          'transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                          transparent ? 'opacity-50' : 'opacity-35',
                          servicesOpen ? 'rotate-180' : '',
                        ].join(' ')}
                      >
                        <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>

                    {/* Dropdown — always white, refined */}
                    <div
                      className={[
                        'absolute top-[calc(100%+0.625rem)] left-0 w-[17rem]',
                        'bg-white border border-black/[0.06] rounded-[4px]',
                        'shadow-[0_20px_60px_rgba(10,22,40,0.10),0_4px_12px_rgba(10,22,40,0.04)]',
                        'p-2 origin-top',
                        'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                        servicesOpen
                          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                          : 'opacity-0 -translate-y-3 scale-[0.97] pointer-events-none',
                      ].join(' ')}
                    >
                      <div className="py-1 px-1">
                        {link.children.map(child => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={[
                              'flex items-center px-3.5 py-2.5 rounded-[2px] text-xs',
                              'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                              pathname === child.href
                                ? 'text-brand-blue bg-brand-blue/[0.06] font-medium'
                                : 'text-ink-2 hover:text-ink hover:bg-black/[0.04]',
                            ].join(' ')}
                          >
                            {child.label}
                          </Link>
                        ))}
                        <div className="h-px bg-black/[0.05] my-1.5 mx-1" />
                        <Link
                          href="/services"
                          className="flex items-center justify-between px-3.5 py-2.5 rounded-[2px] text-[0.65rem] font-bold tracking-[0.12em] uppercase text-brand-blue hover:bg-brand-blue/[0.06] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        >
                          View All Services
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                            <path d="M2 10L10 2M10 2H3.5M10 2V8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link key={link.href} href={link.href} className={linkCls(link.href)}>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ── Right: CTA + hamburger ────────────────────────────────────── */}
          <div className="flex items-center gap-3">

            {/* Contact — button-in-button architecture */}
            <Link
              href="/contact"
              className={[
                'hidden lg:inline-flex items-center gap-2.5',
                'pl-4 lg:pl-5 pr-1.5 py-1.5 rounded-[3px]',
                'text-[0.58rem] lg:text-[0.64rem] font-nav font-bold tracking-[0.12em] lg:tracking-[0.16em] uppercase',
                'border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                'group active:scale-[0.97]',
                transparent
                  ? 'border-white/25 text-white hover:bg-white hover:border-white hover:text-navy'
                  : 'border-brand-blue bg-brand-blue text-white hover:bg-[#3a72a0] hover:border-[#3a72a0]',
              ].join(' ')}
            >
              <span>Contact</span>
              {/* Nested icon circle */}
              <span className={[
                'w-[26px] h-[26px] rounded-[3px] flex items-center justify-center shrink-0',
                'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                'group-hover:translate-x-0.5 group-hover:-translate-y-px',
                transparent
                  ? 'bg-white/15 group-hover:bg-white/25'
                  : 'bg-white/20 group-hover:bg-white/30',
              ].join(' ')}>
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>

            {/* Morphing hamburger → X */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className={[
                'lg:hidden relative w-10 h-10 flex items-center justify-center rounded-[3px]',
                'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                transparent
                  ? 'text-white hover:bg-white/[0.08]'
                  : 'text-ink-2 hover:text-ink hover:bg-black/[0.05]',
              ].join(' ')}
            >
              <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
              <span
                className="absolute w-[18px] h-px bg-current block"
                style={{
                  top: '50%',
                  transform: mobileOpen ? 'translateY(0) rotate(45deg)' : 'translateY(-5px)',
                  transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
                }}
              />
              <span
                className="absolute w-[18px] h-px bg-current block"
                style={{
                  top: '50%',
                  opacity: mobileOpen ? 0 : 1,
                  transform: mobileOpen ? 'scaleX(0)' : 'scaleX(1)',
                  transition: 'opacity 350ms cubic-bezier(0.16,1,0.3,1), transform 350ms cubic-bezier(0.16,1,0.3,1)',
                }}
              />
              <span
                className="absolute w-[18px] h-px bg-current block"
                style={{
                  top: '50%',
                  transform: mobileOpen ? 'translateY(0) rotate(-45deg)' : 'translateY(5px)',
                  transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </button>
          </div>

        </div>
      </nav>

      {/* ── MOBILE OVERLAY ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white flex flex-col overflow-y-auto"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-7 h-[62px] border-b border-black/[0.06] shrink-0">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
                <Image
                  src="/images/logo-v2.png"
                  alt="Airfree Geospatial"
                  width={190}
                  height={56}
                  className="h-[26px] sm:h-[29px] w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 flex items-center justify-center rounded-[3px] text-ink-2 hover:text-ink hover:bg-black/[0.05] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                  <path d="M3.5 3.5L14.5 14.5M14.5 3.5L3.5 14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col px-5 sm:px-8 pt-4 pb-6 flex-1">
              {NAV_LINKS.map(link => (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-5 font-serif text-xl sm:text-2xl font-light text-ink border-b border-black/[0.05] hover:text-brand-blue transition-colors duration-300"
                  >
                    {link.label}
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="opacity-20 shrink-0">
                      <path d="M2 10L10 2M10 2H3.5M10 2V8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                  {link.children && (
                    <div className="py-3 flex flex-col gap-0 border-b border-black/[0.05]">
                      {link.children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="py-2.5 px-1 text-ink-2 text-sm hover:text-brand-blue transition-colors duration-200"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Mobile CTA — button-in-button */}
              <motion.div className="pt-8 pb-4" variants={itemVariants}>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between w-full px-6 py-4 rounded-[3px] bg-brand-blue text-white hover:bg-[#3a72a0] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group active:scale-[0.98]"
                >
                  <span className="font-nav font-bold text-sm tracking-[0.12em] uppercase">Contact Us</span>
                  <span className="w-8 h-8 rounded-[3px] bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Footer strip */}
            <motion.div
              className="px-5 sm:px-8 py-5 border-t border-black/[0.05] shrink-0"
              variants={itemVariants}
            >
              <p className="font-mono text-[0.58rem] tracking-widest text-ink-2/35 uppercase">
                Airfree Geospatial Solutions
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
