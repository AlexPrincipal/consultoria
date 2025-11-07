'use client';

import { useUser } from '@/firebase';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const isDevLogin = typeof window !== 'undefined' && sessionStorage.getItem('dev-admin') === 'true';

  useEffect(() => {
    if (!isUserLoading) {
       if (!user && !isDevLogin) {
        // If not logged in, redirect to login page
        redirect('/admin/login');
      } else if (user || isDevLogin) {
        // If logged in, redirect to the homepage to use the admin toolbar
        redirect('/');
      }
    }
  }, [user, isUserLoading, isDevLogin]);

  // This will be shown briefly during auth check and redirection
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-white">
      <p>Verificando sesión y redirigiendo...</p>
    </div>
  );
}
