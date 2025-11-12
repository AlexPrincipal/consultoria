import type { Metadata } from 'next';
import { getServiceMetadata } from '@/lib/seo';

export const metadata: Metadata = getServiceMetadata('area-empresarial-especifica');

export default function AreaEmpresarialEspecificaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
