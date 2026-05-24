'use client';
import { usePathname } from 'next/navigation';
import Nav from './Nav';
import Footer from './Footer';
import { TypographyProvider } from '@/lib/TypographyProvider';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return <><TypographyProvider />{children}</>;

  return (<><TypographyProvider /><Nav /><main className="flex-1">{children}</main><Footer /></>);
}
