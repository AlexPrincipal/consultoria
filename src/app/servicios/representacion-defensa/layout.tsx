import type { Metadata } from 'next';
import { getServiceMetadata } from '@/lib/seo';

export const metadata: Metadata = getServiceMetadata('representacion-defensa');

export default function RepresentacionDefensaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
