import type { Metadata } from 'next';
import { getServiceMetadata } from '@/lib/seo';

export const metadata: Metadata = getServiceMetadata('asesoria-consultoria-legal');

export default function AsesoriaConsultoriaLegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
