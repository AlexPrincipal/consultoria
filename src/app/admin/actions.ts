
'use server';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '@/firebase/server';
import { redirect } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc, serverTimestamp, setDoc, writeBatch } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { defaultTeamMembers } from '@/lib/team';

async function isUserAdmin(uid: string): Promise<boolean> {
  try {
    const adminRoleDocRef = doc(db, 'roles_admin', uid);
    const adminRoleDoc = await getDoc(adminRoleDocRef);
    return adminRoleDoc.exists();
  } catch (error) {
     if (error instanceof Error && error.message.includes('permission-denied')) {
        // This is likely a security rule issue. We can throw a more specific error.
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

  if (!email || !password) {
    return { error: 'Email y contraseña son requeridos.' };
  }
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const isAdmin = await isUserAdmin(user.uid);
    if (!isAdmin) {
        await signOut(auth);
        return { error: 'No tienes los permisos de administrador necesarios.' };
    }
     return { error: null, success: true };

  } catch (e) {
    if (e instanceof FirebaseError) {
        switch (e.code) {
            case 'auth/invalid-credential':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return { error: 'Las credenciales proporcionadas no son válidas.' };
            default:
                console.error(`Unexpected Firebase error: ${e.code}`, e);
                return { error: `Ocurrió un error inesperado de Firebase: ${e.message}` };
        }
    }
    
    if (e instanceof Error) {
      // Catch custom errors from isUserAdmin
      if ((e as any).code === 'ADMIN_CHECK_PERMISSION_DENIED') {
          return { error: `Error de permisos: ${e.message}` };
      }
      console.error("Generic error in login action:", e);
      return { error: e.message };
    }

    return { error: 'Un error inesperado ocurrió durante el inicio de sesión.' };
  }
}

export async function logout() {
  await signOut(auth);
  revalidatePath('/');
  redirect('/admin');
}


export async function syncTeamMembersWithFirestore(): Promise<{ success: boolean; message: string; }> {
    try {
        const batch = writeBatch(db);

        defaultTeamMembers.forEach(member => {
            const docRef = doc(db, 'teamMembers', member.slug);
            // We need to remove the 'id' field as it's the document ID, not part of the data.
            const { id, ...memberData } = member;
            batch.set(docRef, memberData, { merge: true });
        });

        await batch.commit();

        // Revalidate the path to ensure the page shows the latest data.
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
