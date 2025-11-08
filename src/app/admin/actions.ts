
'use server';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/server';
import { redirect } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import { revalidatePath } from 'next/cache';

/**
 * Función de inicio de sesión que se ejecuta en el servidor.
 * Es una "Server Action" de Next.js.
 * @param prevState - El estado anterior de la acción, útil para mostrar errores en el formulario.
 * @param formData - Los datos del formulario enviados por el cliente.
 * @returns Un objeto que indica si hubo un error o si fue exitoso.
 */
export async function login(prevState: { error: string | null; success?: boolean } | null, formData: FormData): Promise<{ error: string | null; success?: boolean; }> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  console.log(`Intento de inicio de sesión para: ${email}`);

  if (!email || !password) {
    return { error: 'Email y contraseña son requeridos.' };
  }
  
  try {
    // Se intenta iniciar sesión con las credenciales proporcionadas usando Firebase Auth.
    // Esta función establece una cookie de sesión en el navegador del cliente.
    await signInWithEmailAndPassword(auth, email, password);
    console.log(`Inicio de sesión de Firebase exitoso para: ${email}`);

  } catch (e) {
    // Manejo de errores específicos de Firebase.
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
    
    // Manejo de errores genéricos.
    if (e instanceof Error) {
      console.error("Error genérico en la acción de login:", e);
      return { error: e.message };
    }
    console.error("Error desconocido en la acción de login:", e);
    return { error: 'Un error inesperado ocurrió durante el inicio de sesión.' };
  }

  // Si el inicio de sesión es exitoso, se revalida la caché de la página de inicio.
  // Esto asegura que la próxima vez que se cargue, obtenga los datos más recientes.
  revalidatePath('/');
  
  // ¡Importante! La redirección ahora es manejada por el lado del cliente en `aw-admin/page.tsx`.
  // La acción del servidor solo se encarga de la autenticación. Se comenta el redirect aquí.
  // redirect('/');
  // Devolvemos un estado de éxito, aunque el cliente ya no depende directamente de él para redirigir.
  return { error: null, success: true };
}

/**
 * Función de cierre de sesión. También es una "Server Action".
 */
export async function logout() {
  // Llama a Firebase Auth para invalidar la sesión actual.
  await auth.signOut();
  // Se revalida la caché para asegurar que la próxima carga no muestre contenido de administrador.
  revalidatePath('/');
  // Se redirige al usuario a la página de login.
  redirect('/aw-admin');
}

/**
 * Sincroniza los miembros del equipo desde un archivo local a la base de datos de Firestore.
 * Esto es útil para la configuración inicial.
 */
export async function syncTeamMembersWithFirestore(): Promise<{ success: boolean; message: string; }> {
    try {
        const { batch, doc } = await import('firebase/firestore');
        const firestoreBatch = batch(db);

        const { defaultTeamMembers } = await import('@/lib/team');
        
        defaultTeamMembers.forEach(member => {
            const docRef = doc(db, 'teamMembers', member.slug);
            const { id, ...memberData } = member;
            // `set` con `merge: true` crea el documento si no existe o actualiza los campos si ya existe.
            firestoreBatch.set(docRef, memberData, { merge: true });
        });

        // Ejecuta todas las operaciones de escritura en un solo lote.
        await firestoreBatch.commit();
        revalidatePath('/quienes-somos'); // Revalida la página del equipo.

        return { success: true, message: 'Los miembros del equipo se han sincronizado con Firestore.' };
    } catch (error) {
        console.error('Error syncing team members with Firestore:', error);
         if (error instanceof Error) {
            return { success: false, message: `Error del servidor: ${error.message}` };
        }
        return { success: false, message: 'Un error desconocido ocurrió durante la sincronización.' };
    }
}
