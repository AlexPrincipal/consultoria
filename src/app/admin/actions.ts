
'use server';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase/server';
import { redirect } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

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
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(`Inicio de sesión exitoso para UID: ${user.uid}`);

    const isAdmin = await isUserAdmin(user.uid);
    if (!isAdmin) {
        console.log(`El usuario ${user.uid} no es admin. Cerrando sesión.`);
        await auth.signOut(); // Use the server-side auth instance
        return { error: 'No tienes los permisos de administrador necesarios.' };
    }
     console.log(`El usuario ${user.uid} es admin. Redireccionando...`);
     return { error: null, success: true };

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
      if ((e as any).code === 'ADMIN_CHECK_PERMISSION_DENIED') {
          console.error(`Error de permisos al verificar el rol: ${e.message}`);
          return { error: `Error de permisos: ${e.message}` };
      }
      console.error("Error genérico en la acción de login:", e);
      return { error: e.message };
    }
    console.error("Error desconocido en la acción de login:", e);
    return { error: 'Un error inesperado ocurrió durante el inicio de sesión.' };
  }
}

export async function logout() {
  await auth.signOut();
  revalidatePath('/');
  redirect('/admin');
}

export async function syncTeamMembersWithFirestore(): Promise<{ success: boolean; message: string; }> {
    try {
        const batch = db.batch();

        const { defaultTeamMembers } = await import('@/lib/team');
        
        defaultTeamMembers.forEach(member => {
            const docRef = doc(db, 'teamMembers', member.slug);
            const { id, ...memberData } = member;
            batch.set(docRef, memberData, { merge: true });
        });

        await batch.commit();
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
