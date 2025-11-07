'use server';

import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/server';
import { redirect } from 'next/navigation';

export async function logout() {
  await signOut(auth);
  redirect('/admin/login');
}
