import type { Metadata } from 'next';
import { getServiceMetadata } from '@/lib/seo';

export const metadata: Metadata = getServiceMetadata('compliance');

export default function ComplianceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
