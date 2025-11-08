
'use server';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/server';
import { redirect } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import { revalidatePath } from 'next/cache';

/**
 * Checks if a user has an admin role document in Firestore.
 * This function is for server-side checks if needed elsewhere, but is no longer used for login.
 * @param uid The user's ID.
 * @returns A boolean indicating if the user is an admin.
 */
async function isUserAdmin(uid: string): Promise<boolean> {
  console.log(`Verificando estado de admin para UID: ${uid}`);
  try {
    const adminRoleDocRef = doc(db, 'roles_admin', uid);
    const adminRoleDoc = await getDoc(adminRoleDocRef);
    const isAdmin = adminRoleDoc.exists();
    console.log(`El usuario ${uid} ${isAdmin ? 'es' : 'no es'} administrador.`);
    return isAdmin;
  } catch (error) {
     if (error instanceof Error && error.message.includes('permission-denied')) {
         const permissionError = new Error(`Permission denied when checking admin status for UID: ${uid}. Ensure Firestore rules allow this read.`);
         (permissionError as any).code = 'ADMIN_CHECK_PERMISSION_DENIED';
         throw permissionError;
     }
     if (error instanceof Error) {
        const customError = new Error(`Error checking admin status: ${error.message}`);
        (customError as any).code = 'ADMIN_CHECK_FAILED';
        throw customError;
    }
    throw new Error("An unknown error occurred while checking admin status.");
  }
}

export async function login(prevState: { error: string | null; success?: boolean } | null, formData: FormData): Promise<{ error: string | null; success?: boolean; }> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  console.log(`Intento de inicio de sesión para: ${email}`);

  if (!email || !password) {
    return { error: 'Email y contraseña son requeridos.' };
  }
  
  try {
    console.log('Intentando iniciar sesión con Firebase Auth...');
    // The login action's only job is to sign the user in.
    // The client-side will determine if the logged-in user is an admin.
    await signInWithEmailAndPassword(auth, email, password);
    console.log(`Inicio de sesión de Firebase exitoso para: ${email}`);

  } catch (e) {
    console.error('--- ERROR DETECTADO EN EL LOGIN ---');
    if (e instanceof FirebaseError) {
        console.error(`Código de error de Firebase: ${e.code}`);
        console.error(`Mensaje de error de Firebase: ${e.message}`);
        switch (e.code) {
            case 'auth/invalid-credential':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return { error: 'Las credenciales proporcionadas no son válidas.' };
            default:
                return { error: `Ocurrió un error inesperado de Firebase: ${e.message}` };
        }
    }
    
    if (e instanceof Error) {
      console.error("Error genérico en la acción de login:", e);
      return { error: e.message };
    }
    console.error("Error desconocido en la acción de login:", e);
    return { error: 'Un error inesperado ocurrió durante el inicio de sesión.' };
  }

  // If everything is successful, revalidate the home page and redirect.
  revalidatePath('/');
  redirect('/');
}

export async function logout() {
  await auth.signOut();
  revalidatePath('/');
  redirect('/admin');
}

export async function syncTeamMembersWithFirestore(): Promise<{ success: boolean; message: string; }> {
    try {
        const { batch, doc } = await import('firebase/firestore');
        const firestoreBatch = batch(db);

        const { defaultTeamMembers } = await import('@/lib/team');
        
        defaultTeamMembers.forEach(member => {
            const docRef = doc(db, 'teamMembers', member.slug);
            const { id, ...memberData } = member;
            firestoreBatch.set(docRef, memberData, { merge: true });
        });

        await firestoreBatch.commit();
        revalidatePath('/quienes-somos');

        return { success: true, message: 'Los miembros del equipo se han sincronizado con Firestore.' };
    } catch (error) {
        console.error('Error syncing team members with Firestore:', error);
         if (error instanceof Error) {
            return { success: false, message: `Error del servidor: ${error.message}` };
        }
        return { success: false, message: 'Un error desconocido ocurrió durante la sincronización.' };
    }
}
