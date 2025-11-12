import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seo';

export const metadata: Metadata = getPageMetadata('whyUs');

export default function WhyUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
