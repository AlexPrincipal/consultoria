import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seo';

export const metadata: Metadata = getPageMetadata('faq');

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
