import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seo';

export const metadata: Metadata = getPageMetadata('services');

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
