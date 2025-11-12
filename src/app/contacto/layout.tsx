import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seo';

export const metadata: Metadata = getPageMetadata('contact');

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
