'use client';
import Image from 'next/image';
import Link from 'next/link';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { useCMS } from '@/lib/useCMS';

type PageImageKey = 'about' | 'services' | 'contact' | 'industries' | 'products' | 'projects' | 'technology';

interface Props {
  label?: string;
  title?: string;
  subtitle?: string;
  breadcrumb?: { label: string; href: string };
  imageKey?: PageImageKey;
  /** Direct image path/URL — takes priority over imageKey CMS lookup */
  imageUrl?: string;
  /**
   * When set, reads label/title/subtitle from cms.page_content[pageKey] as defaults.
   * Explicit props still override CMS values.
   */
  pageKey?: PageImageKey;
}

export function PageHero({ label, title, subtitle, breadcrumb, imageKey, imageUrl, pageKey }: Props) {
  const cms = useCMS();
  const imageSrc = imageUrl || (imageKey ? (cms.page_photos[imageKey] || null) : null);

  // CMS page_content supplies defaults when explicit props aren't provided
  const cmsPage = pageKey ? cms.page_content[pageKey] : null;
  const effectiveLabel    = label    ?? cmsPage?.label    ?? undefined;
  const effectiveTitle    = title    ?? cmsPage?.title    ?? '';
  const effectiveSubtitle = subtitle ?? cmsPage?.subtitle ?? undefined;

  return (
    <section className="relative pt-28 pb-16 px-4 sm:px-8 md:px-10 lg:px-24 overflow-hidden">
      {/* Background — photo if provided, otherwise navy + dot grid */}
      {imageSrc ? (
        <>
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[rgba(10,22,40,0.72)]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-navy" />
          <div className="absolute inset-0 dot-grid opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy" />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        {breadcrumb && (
          <div className="mb-5">
            <Link href={breadcrumb.href} className="font-mono text-[0.6rem] tracking-[0.16em] uppercase text-white/40 hover:text-white/70 transition-colors">
              ← {breadcrumb.label}
            </Link>
          </div>
        )}
        {effectiveLabel && <SectionLabel className="text-white/55 mb-5">{effectiveLabel}</SectionLabel>}
        <h1
          className="font-serif font-bold text-white leading-[1.05] mb-6"
          style={{ fontSize: 'clamp(1.5rem, 5vw, 4rem)' }}
        >
          {effectiveTitle}
        </h1>
        {effectiveSubtitle && (
          <p className="text-white/60 max-w-2xl leading-relaxed text-sm sm:text-base md:text-lg">
            {effectiveSubtitle}
          </p>
        )}
      </div>
    </section>
  );
}
