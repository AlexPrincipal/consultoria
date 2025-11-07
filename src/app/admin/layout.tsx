'use client';

import { useUser } from '@/firebase';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    // If loading is finished and there is no user, redirect to login.
    if (!isUserLoading && !user) {
      redirect('/admin/login');
    }
  }, [user, isUserLoading]);

  // While loading, you can show a loader or null.
  if (isUserLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background text-white">
            <p>Verificando autenticación...</p>
        </div>
    );
  }

  // If user is authenticated, render the children.
  if (user) {
    return <>{children}</>;
  }

  // Fallback in case redirect hasn't happened yet.
  return null;
}
