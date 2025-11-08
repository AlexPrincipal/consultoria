'use client';

import { useUser } from '@/firebase';
import AdminToolbar from './admin-toolbar';
import { cn } from '@/lib/utils';
import { useAdminStore } from '@/lib/store';


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useUser();
  const { isEditMode } = useAdminStore();
  
  const showToolbar = isAdmin;

  return (
    <>
      {showToolbar && <AdminToolbar />}
      <div className={cn(isAdmin && isEditMode && 'pt-14')}>{children}</div>
    </>
  );
}
