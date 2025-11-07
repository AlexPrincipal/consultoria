
'use server';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '@/firebase/server';
import { redirect } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc, serverTimestamp, setDoc, writeBatch } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { defaultTeamMembers } from '@/lib/team';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

async function isUserAdmin(uid: string): Promise<boolean> {
  try {
    const adminRoleDocRef = doc(db, 'roles_admin', uid);
    const adminRoleDoc = await getDoc(adminRoleDocRef);
    return adminRoleDoc.exists();
  } catch (error) {
     if (error instanceof Error) {
        // This is a more structured way to throw server-side errors
        // that can be caught and inspected if needed.
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
        // If it's the dev admin and the user doesn't exist, create it.
        if (process.env.NODE_ENV === 'development' && email === 'admin@example.com' && (e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential')) {
             try {
                console.log('Development admin user not found. Attempting to create...');
                const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
                const newUser = newUserCredential.user;

                // Assign admin role
                const adminRoleRef = doc(db, 'roles_admin', newUser.uid);
                await setDoc(adminRoleRef, { uid: newUser.uid, assignedAt: serverTimestamp() });
                console.log(`Development admin user created and role assigned: ${newUser.uid}`);

                // Proceed with successful login
                return { error: null, success: true };

             } catch(creationError) {
                 if (creationError instanceof FirebaseError) {
                     console.error(`Failed to create dev admin user: ${creationError.code}`, creationError);
                     return { error: `No se pudo crear el usuario admin de desarrollo: ${creationError.message}` };
                 }
                 console.error("Generic error during dev admin creation:", creationError);
                 return { error: 'Ocurrió un error inesperado al crear el usuario admin.' };
             }
        }

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
    // Handle generic errors
    if (e instanceof Error) {
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

