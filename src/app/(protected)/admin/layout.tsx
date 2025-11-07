'use client';

import { useUser } from '@/firebase';
import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { logout } from './actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from '@/components/logo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    // If loading is finished and there is no user, redirect to login.
    if (!isUserLoading && !user && pathname !== '/admin/login') {
      redirect('/admin/login');
    }
  }, [user, isUserLoading, pathname]);

  // While loading, you can show a loader or null.
  if (isUserLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background text-white">
            <p>Verificando autenticación...</p>
        </div>
    );
  }

  // If user is authenticated, render the children with a basic admin layout.
  if (user) {
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

  // Fallback in case redirect hasn't happened yet (e.g., for /admin/login page itself).
  // If we are on the login page, we don't want to render the protected layout.
  if (pathname === '/admin/login') {
      return <>{children}</>;
  }


  return null;
}
