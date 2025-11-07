'use client';

import { useUser } from '@/firebase';
import { redirect, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDevLogin = isClient && sessionStorage.getItem('dev-admin') === 'true';
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';

  useEffect(() => {
    if (isUserLoading || !isClient) {
      // Don't do anything while auth state is loading or not on client
      return;
    }

    const isAuthenticated = user || isDevLogin;
    
    if (isAdminRoute && !isAuthenticated) {
      // If on an admin page (but not login) and not authenticated, go to login
      redirect('/admin/login');
    } else if (isAdminRoute && isAuthenticated) {
      // If on an admin page and authenticated, go to the homepage to use the toolbar
      redirect('/');
    }

  }, [user, isUserLoading, isDevLogin, isClient, isAdminRoute]);

  // Render children by default, or a loading state if preferred
  if (isUserLoading && isAdminRoute) {
     return (
      <div className="flex min-h-screen items-center justify-center bg-background text-white">
        <p>Verificando sesión y redirigiendo...</p>
      </div>
    );
  }
  
  return <>{children}</>;
}
