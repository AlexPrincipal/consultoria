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
    if (error.code === 'permission-denied') {
      // Create a more informative, structured error to be thrown.
      // This will be caught by the login action and propagated to the UI.
      const permissionError = new Error(
        `Firestore Permission Denied: The server-side action was not allowed to read the admin role document. ` +
        `Path: /roles_admin/${uid}. ` +
        `Check Firestore rules to ensure the server environment or authenticated user has read access.`
      );
      // Attach original error for deeper debugging if needed
      (permissionError as any).originalError = error;
      throw permissionError;
    }
    // For other errors, log them on the server and re-throw a generic message.
    console.error("An unexpected error occurred in isUserAdmin:", error);
    throw new Error('An unexpected error occurred while checking user permissions.');
  }
}

export async function login(prevState: { error: string | null; success?: boolean } | null, formData: FormData): Promise<{ error: string | null; success?: boolean; devAdmin?: boolean; }> {
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
    // This will now catch the more descriptive error from isUserAdmin
    if (e instanceof Error) {
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
