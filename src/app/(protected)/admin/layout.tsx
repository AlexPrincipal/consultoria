'use client';

import { useUser } from '@/firebase';
import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { logout } from './actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from '@/components/logo';

// --- TEMPORARY DEVELOPMENT MODE ---
// This allows access to the admin panel without a real Firebase user
// by using the "admin/admin" credentials. This should be disabled in production.
const isDevBypassEnabled = process.env.NEXT_PUBLIC_DEV_ADMIN_BYPASS === 'true';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const pathname = usePathname();

  // Determine if the user is authenticated, either through Firebase or the dev bypass
  const isAuthenticated = user || isDevBypassEnabled;

  useEffect(() => {
    // If loading is finished and user is not authenticated (and bypass is off), redirect.
    if (!isUserLoading && !isAuthenticated && pathname !== '/admin/login') {
      redirect('/admin/login');
    }
  }, [isAuthenticated, isUserLoading, pathname]);

  // While loading Firebase auth state, show a loader.
  if (isUserLoading && !isDevBypassEnabled) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background text-white">
            <p>Verificando autenticación...</p>
        </div>
    );
  }

  // If user is authenticated (Firebase or bypass), render the admin layout.
  if (isAuthenticated) {
    return (
        <div className="min-h-screen bg-background text-white">
            <header className="bg-card border-b border-border/50">
                <div className="container mx-auto px-4 md:px-6 h-24 flex justify-between items-center">
                    <Link href="/admin" className="relative w-32 h-20">
                      <Logo />
                    </Link>
                    <form action={logout}>
                        <Button variant="outline" type="submit">Cerrar Sesión</Button>
                    </form>
                </div>
            </header>
            <main className="p-4 md:p-8">
                {children}
            </main>
        </div>
    );
  }

  // Fallback for login page or if redirect hasn't executed yet.
  if (pathname === '/admin/login') {
      return <>{children}</>;
  }


  return null;
}
