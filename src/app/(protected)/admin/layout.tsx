'use client';

import { useUser } from '@/firebase';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { logout } from './actions';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();

  const isDevBypass =
    typeof window !== 'undefined' && sessionStorage.getItem('dev-admin') === 'true';

  useEffect(() => {
    if (!isUserLoading && !user && !isDevBypass) {
      redirect('/admin/login');
    }
  }, [user, isUserLoading, isDevBypass]);

  if (isUserLoading && !isDevBypass) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-white">
        <p>Verificando sesión...</p>
      </div>
    );
  }

  // If we are here, the user is authenticated either via Firebase or dev bypass
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
             <div className="w-24 h-16 relative">
                <Logo />
             </div>
            <h1 className="text-xl font-bold font-headline text-white">Panel de Administración</h1>
          </div>
          <form action={logout}>
            <Button variant="outline" type="submit">
              Cerrar Sesión
            </Button>
          </form>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-6">{children}</main>
    </div>
  );
}
