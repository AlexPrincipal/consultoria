'use client';

import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import AdminToolbar from './admin-toolbar';
import { cn } from '@/lib/utils';
import { doc } from 'firebase/firestore';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  // Create a memoized reference to the admin role document
  const adminRoleRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'roles_admin', user.uid) : null),
    [firestore, user]
  );
  
  // Use the useDoc hook to check for the existence of the admin role document
  const { data: adminRoleDoc, isLoading: isAdminRoleLoading } = useDoc(adminRoleRef);

  // The user is an admin if they are logged in and their admin role document exists
  const isAdmin = !isUserLoading && !isAdminRoleLoading && user && !!adminRoleDoc;

  return (
    <>
      {isAdmin && <AdminToolbar />}
      <div className={cn(isAdmin && 'pt-14')}>{children}</div>
    </>
  );
}
