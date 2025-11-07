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
    const adminRoleDocRef = doc(db, 'roles_admin', uid);
    const adminRoleDoc = await getDoc(adminRoleDocRef);
    return adminRoleDoc.exists();
  } catch (error) {
    // This is a server-side action, we cannot emit a client-side error.
    // We will throw a more informative error to be caught by the login action.
    if (error.code === 'permission-denied') {
        const readableError = new Error(`Permission denied when checking admin role for UID: ${uid}. Path: /roles_admin/${uid}. Ensure server-side code has adequate permissions or rules allow this check.`);
        (readableError as any).originalError = error;
        throw readableError;
    }
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
       // This is a dev-only convenience. In a real app, you'd have a proper admin user creation flow.
       // We set a flag that the client provider will pick up upon auth state change.
       return { error: null, success: true, devAdmin: true };
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
                return { error: `Ocurrió un error inesperado de Firebase: ${e.message}` };
        }
    }
    if (e instanceof Error) {
        // Catch the custom error from isUserAdmin
        return { error: e.message };
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
    if ((error as any).code === 'permission-denied') {
      errorMessage = 'Permiso denegado. Asegúrese de tener los permisos de administrador para realizar esta acción.';
    }

    return { success: false, message: `Error de sincronización: ${errorMessage}` };
  }
}
