import type { Metadata } from 'next';
import { ServicesClient } from './ServicesClient';

export const metadata: Metadata = {
  title: 'Services | Airfree Geospatial',
  description: 'GIS implementation, drone surveys, satellite imagery analysis, utility network mapping, and environmental spatial reporting. Based in Adelaide with offices across Australia.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
