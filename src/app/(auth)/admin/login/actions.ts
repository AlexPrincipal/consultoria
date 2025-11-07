
'use server';

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/firebase/server';
import { redirect } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
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
  const uid = formData.get('uid') as string | undefined;

  if (!email || !password) {
    return { error: 'Email y contraseña son requeridos.' };
  }
  
  // --- DEVELOPMENT LOGIN ---
  // This bypasses Firebase Auth for quick UI testing but won't have real permissions
  // without a corresponding Firestore rule or manual role assignment.
  if (process.env.NODE_ENV === 'development' && email === 'admin@example.com' && password === 'admin') {
    if (uid) {
        try {
            const db = getFirestore(getApp());
            // Assign the admin role to the current (anonymous) user's UID
            await setDoc(doc(db, 'roles_admin', uid), {
                uid: uid,
                assignedAt: new Date().toISOString()
            });
            // We return success so the client can redirect and refresh,
            // which will re-evaluate auth state and admin status.
            return { error: null, success: true };
        } catch (e) {
            console.error("Failed to assign dev admin role:", e);
            return { error: 'No se pudo asignar el rol de administrador de desarrollo.' };
        }
    }
    return { error: 'No se pudo obtener el UID del usuario anónimo para asignar el rol.' };
  }
  // --- END DEVELOPMENT LOGIN ---

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
    // This server action is simple, but we should also handle client-side state.
    await signOut(auth);
    redirect('/admin/login');
}
