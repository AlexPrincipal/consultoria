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

  try {
    await signInWithEmailAndPassword(auth, email, password);
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
  
  return redirect('/admin');
}
