import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Manager | Airfree Geospatial',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F7F5] font-sans">
      {children}
    </div>
  );
}
