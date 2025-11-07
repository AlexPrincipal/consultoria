'use client';

// This page is now effectively a redirect handler.
// The AdminLayout will redirect authenticated users to the homepage.
// Non-authenticated users will be redirected to the login page.

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // The logic is handled in the layout, but as a fallback,
    // we can redirect to the homepage.
    router.replace('/');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-white">
      <p>Redirigiendo...</p>
    </div>
  );
}
