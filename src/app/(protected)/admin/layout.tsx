'use client';

import { useUser } from '@/firebase';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDevLogin = isClient && sessionStorage.getItem('dev-admin') === 'true';

  useEffect(() => {
    // Wait until the user status is determined and we are on the client
    if (!isUserLoading && isClient) {
       if (!user && !isDevLogin) {
        // If not logged in (and not in dev mode), redirect to the login page.
        redirect('/admin/login');
      } else if (user || isDevLogin) {
        // If logged in, redirect to the homepage to use the admin toolbar.
        // This is the central hub for inline editing.
        redirect('/');
      }
    }
  }, [user, isUserLoading, isDevLogin, isClient]);

  // This will be shown briefly during auth check and redirection.
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-white">
      <p>Verificando sesión y redirigiendo...</p>
    </div>
  );
}
