
'use server';

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '@/firebase/server';
import { redirect } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

async function isUserAdmin(uid: string): Promise<boolean> {
  try {
    const adminRoleDocRef = doc(db, 'roles_admin', uid);
    const adminRoleDoc = await getDoc(adminRoleDocRef);
    return adminRoleDoc.exists();
  } catch (error) {
    console.error("An unexpected error occurred in isUserAdmin:", error);
    // Re-throw a generic error to be handled by the login action
    throw new Error('An unexpected error occurred while checking user permissions.');
  }
}

export async function login(prevState: { error: string | null; success?: boolean } | null, formData: FormData): Promise<{ error: string | null; success?: boolean; }> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email y contraseña son requeridos.' };
  }

  // Handle dev login separately
  if (process.env.NODE_ENV === 'development' && email === 'admin@example.com' && password === 'admin') {
     try {
       // Sign in with dev credentials
       const userCredential = await signInWithEmailAndPassword(auth, email, password).catch(async (e) => {
         // If user doesn't exist, create it for dev purposes.
         if (e.code === 'auth/user-not-found') {
           return await createUserWithEmailAndPassword(auth, email, password);
         }
         throw e;
       });

       const user = userCredential.user;

       // Assign admin role in Firestore if it doesn't exist.
       const adminRoleRef = doc(db, 'roles_admin', user.uid);
       const adminDoc = await getDoc(adminRoleRef);
       if (!adminDoc.exists()) {
           await setDoc(adminRoleRef, { uid: user.uid, assignedAt: serverTimestamp() });
           console.log(`Dev admin role created for ${user.uid}`);
       }
       
       revalidatePath('/'); // Revalidate to reflect new auth state
       redirect('/'); // Redirect on success
       
    } catch (e) {
        console.error("Dev login/setup failed", e);
        if (e instanceof FirebaseError) {
             return { error: `Error de Firebase: ${e.message}` };
        }
        return { error: 'No se pudo procesar el inicio de sesión de desarrollo.' };
    }
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user) {
      const isAdmin = await isUserAdmin(user.uid);
      if (isAdmin) {
        revalidatePath('/');
        redirect('/');
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
  // This function remains unchanged as it's not related to the login issue.
  // ... (keeping existing implementation)
  const { defaultTeamMembers } = await import('@/lib/team');
  const { writeBatch } = await import('firebase/firestore');

  try {
    const batch = writeBatch(db);

    defaultTeamMembers.forEach((member) => {
      const docRef = doc(db, 'teamMembers', member.slug);
      batch.set(docRef, member, { merge: true });
    });

    await batch.commit();
    
    revalidatePath('/quienes-somos');

    return { success: true, message: 'La información del equipo ha sido sincronizada correctamente con la base de datos.' };
  } catch (error) {
    console.error('Error syncing team members with Firestore:', error);
    
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    if ((error as any).code === 'permission-denied') {
      errorMessage = 'Permiso denegado. Asegúrese de tener los permisos de administrador para realizar esta acción.';
    }

    return { success: false, message: `Error de sincronización: ${errorMessage}` };
  }
}
