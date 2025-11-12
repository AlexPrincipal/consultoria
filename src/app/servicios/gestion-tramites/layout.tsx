import type { Metadata } from 'next';
import { getServiceMetadata } from '@/lib/seo';

export const metadata: Metadata = getServiceMetadata('gestion-tramites');

export default function GestionTramitesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
