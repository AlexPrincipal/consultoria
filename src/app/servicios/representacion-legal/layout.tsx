import type { Metadata } from 'next';
import { getServiceMetadata } from '@/lib/seo';

export const metadata: Metadata = getServiceMetadata('representacion-legal');

export default function RepresentacionLegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
