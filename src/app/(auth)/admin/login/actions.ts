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
  if (email === 'admin@example.com' && password === 'admin') {
    // This is insecure and for development ONLY.
    // The client-side will set a sessionStorage item to track this dev login.
    // We redirect to the root page where the admin toolbar will be visible.
    redirect('/');
  }
  // --- END TEMPORARY DEVELOPMENT LOGIN ---

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
        // On successful Firebase login, redirect to the root to use the admin toolbar.
        redirect('/');
    }
    return { error: 'No se pudo redirigir.'};

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
