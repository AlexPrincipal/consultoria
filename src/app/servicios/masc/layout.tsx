import type { Metadata } from 'next';
import { getServiceMetadata } from '@/lib/seo';

export const metadata: Metadata = getServiceMetadata('masc');

export default function MascLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
