import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seo';

export const metadata: Metadata = getPageMetadata('about');

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
