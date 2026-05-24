import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact | Airfree Geospatial',
  description:
    'Get in touch with our team in Adelaide, Perth, or Melbourne. We take on project work for government agencies, utilities, and private engineering clients.',
};

export default function ContactPage() {
  return <ContactClient />;
}
