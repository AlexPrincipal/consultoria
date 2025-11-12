import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seo';

export const metadata: Metadata = getPageMetadata('offices');

export default function OfficesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
