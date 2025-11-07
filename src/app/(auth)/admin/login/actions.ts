
'use server';

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/firebase/server';
import { redirect } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getApp } from 'firebase/app';

// This function checks if a user has the 'admin' role in Firestore.
async function isUserAdmin(uid: string): Promise<boolean> {
  try {
    const db = getFirestore(getApp());
    const adminRoleDoc = await getDoc(doc(db, 'roles_admin', uid));
    return adminRoleDoc.exists();
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

export async function login(prevState: { error: string | null; success?: boolean } | null, formData: FormData): Promise<{ error: string | null; success?: boolean }> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email y contraseña son requeridos.' };
  }
  
  // --- TEMPORARY DEVELOPMENT LOGIN ---
  // This bypasses Firebase Auth for quick UI testing but won't have real permissions.
  if (process.env.NODE_ENV === 'development' && email === 'admin@example.com' && password === 'admin') {
    return { error: null, success: true };
  }
  // --- END TEMPORARY DEVELOPMENT LOGIN ---

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user) {
      const isAdmin = await isUserAdmin(user.uid);
      if (isAdmin) {
        return { error: null, success: true }; // Admin confirmed
      } else {
        await signOut(auth); // Sign out non-admin users
        return { error: 'No tienes los permisos de administrador necesarios.' };
      }
    }
    
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

export async function logout() {
    await signOut(auth);
    redirect('/admin/login');
}
