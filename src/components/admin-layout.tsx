
'use client';

import { useUser } from '@/firebase';
import AdminToolbar from './admin-toolbar';
import { cn } from '@/lib/utils';
import { useAdminStore } from '@/lib/store';


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useUser();
  const { isEditMode } = useAdminStore();
  
  // The toolbar is only shown if a user is logged in and is therefore an admin.
  const showToolbar = isAdmin;

  return (
    <>
      {showToolbar && <AdminToolbar />}
      <div className={cn(showToolbar && isEditMode && 'pt-14')}>{children}</div>
    </>
  );
}
