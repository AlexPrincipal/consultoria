import type { Metadata } from 'next';
import { getServiceMetadata } from '@/lib/seo';

export const metadata: Metadata = getServiceMetadata('consultoria-creacion-empresas');

export default function ConsultoriaCreacionEmpresasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
