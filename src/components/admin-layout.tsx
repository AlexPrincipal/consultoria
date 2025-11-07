'use client';

import { useUser } from '@/firebase';
import AdminToolbar from './admin-toolbar';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDevBypass = isClient && sessionStorage.getItem('dev-admin') === 'true';
  const isAdmin = !isUserLoading && (user || isDevBypass);

  return (
    <>
      {isAdmin && <AdminToolbar />}
      <div className={cn(isAdmin && 'pt-14')}>{children}</div>
    </>
  );
}
