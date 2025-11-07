'use client';

import { useUser } from '@/firebase';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

// This layout is now primarily for protecting potential future admin routes,
// but the main editing experience is on the live site.
// We will redirect any access to /admin back to the homepage.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();

  useEffect(() => {
      // Always redirect from /admin to the homepage,
      // the new editing experience is there.
      redirect('/');
  }, []);

  // While redirecting, show a loading state.
  if (isUserLoading || !user) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background text-white">
            <p>Redirigiendo...</p>
        </div>
    );
  }

  return <>{children}</>;
}
