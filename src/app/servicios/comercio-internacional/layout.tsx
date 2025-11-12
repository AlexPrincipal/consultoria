import type { Metadata } from 'next';
import { getServiceMetadata } from '@/lib/seo';

export const metadata: Metadata = getServiceMetadata('comercio-internacional');

export default function ComercioInternacionalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
