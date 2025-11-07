'use server';

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '@/firebase/server';
import { redirect } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc, getFirestore, writeBatch, setDoc, serverTimestamp } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { revalidatePath } from 'next/cache';
import { defaultTeamMembers } from '@/lib/team';

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

  // Handle dev login separately
  if (process.env.NODE_ENV === 'development' && email === 'admin@example.com' && password === 'admin') {
     try {
       // For dev mode, we can try to sign in a dev user or ensure the role exists for a known test UID
       // The simplest robust way is to just return success and let the client-side useUser hook handle the admin check.
       // The problem is we need to grant the admin role to the anonymous user if it's a dev login.
       const tempAuth = getAuth();
       
       // This will only work if there is a current user (even anonymous) on the server component side.
       // A better approach would be to have a dedicated dev user, but let's try to assign role to anonymous user.
       
       // This cannot be done reliably on the server as there's no guarantee of a user session.
       // The client must handle this.
       // Let's modify this to just return success, and fix the client page to react to isAdmin.
       return { error: null, success: true };
    } catch (e) {
        console.error("Dev login failed", e);
        return { error: 'No se pudo asignar el rol de administrador de desarrollo.' };
    }
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user) {
      const isAdmin = await isUserAdmin(user.uid);
      if (isAdmin) {
        return { error: null, success: true };
      } else {
        await signOut(auth);
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
  revalidatePath('/');
  redirect('/admin');
}

export async function syncTeamMembersWithFirestore(): Promise<{ success: boolean; message: string }> {
  try {
    const batch = writeBatch(db);

    defaultTeamMembers.forEach((member) => {
      const docRef = doc(db, 'teamMembers', member.slug);
      // We use set with merge:true to avoid overwriting fields that might be added later in the CMS
      // but are not present in the local file. For a pure sync, you might just use set(docRef, member).
      batch.set(docRef, member, { merge: true });
    });

    await batch.commit();
    
    // Revalidate the path to ensure the client-side fetches the new data
    revalidatePath('/quienes-somos');

    return { success: true, message: 'La información del equipo ha sido sincronizada correctamente con la base de datos.' };
  } catch (error) {
    console.error('Error syncing team members with Firestore:', error);
    
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
     // You could check for specific Firebase errors here, like permission denied.
    if (error.code === 'permission-denied') {
      errorMessage = 'Permiso denegado. Asegúrese de tener los permisos de administrador para realizar esta acción.';
    }

    return { success: false, message: `Error de sincronización: ${errorMessage}` };
  }
}