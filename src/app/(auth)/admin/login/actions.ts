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
    // For dev mode, we just return success and let the client handle the redirect.
    // The client-side will set a sessionStorage item to track this dev login.
    return { error: null, success: true };
  }
  // --- END TEMPORARY DEVELOPMENT LOGIN ---

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
        // On successful Firebase login, return success and let client redirect.
        return { error: null, success: true };
    }
    // This case should ideally not be reached if signInWithEmailAndPassword succeeds
    return { error: 'No se pudo iniciar sesión.'};

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
