
'use server';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/server';
import { redirect } from 'next/navigation';
import { FirebaseError } from 'firebase/app';

export async function login(prevState: { error: string | null } | null, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email y contraseña son requeridos.' };
  }

  // --- TEMPORARY DEVELOPMENT LOGIN ---
  // If the user is 'admin@example.com' and password is 'admin', redirect to the dashboard.
  if (email === 'admin@example.com' && password === 'admin') {
    // This is a temporary bypass for development. For a real app,
    // the user should be created in the Firebase Console and this block removed.
    redirect('/admin');
  }
  // --- END TEMPORARY DEVELOPMENT LOGIN ---

  try {
    await signInWithEmailAndPassword(auth, email, password);
    // On successful sign-in, redirect to the admin dashboard.
    redirect('/admin');
  } catch (e) {
    if (e instanceof FirebaseError) {
        switch (e.code) {
            case 'auth/invalid-credential':
                return { error: 'Las credenciales proporcionadas no son válidas.' };
            case 'auth/user-not-found':
                 return { error: 'No se encontró ningún usuario con este correo electrónico.' };
            case 'auth/wrong-password':
                return { error: 'Contraseña incorrecta. Por favor, inténtelo de nuevo.' };
            default:
                return { error: 'Ocurrió un error inesperado. Por favor, inténtelo más tarde.' };
        }
    }
    return { error: 'Un error inesperado ocurrió.' };
  }
}
