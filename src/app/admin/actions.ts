
'use server';

import { signOut } from 'firebase/auth';
import { writeBatch, doc } from 'firebase/firestore';
import { auth, db } from '@/firebase/server';
import { redirect } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import { revalidatePath } from 'next/cache';

/**
 * Función de inicio de sesión simplificada - ahora manejada del lado del cliente
 */
export async function login(prevState: { error: string | null; success?: boolean } | null, formData: FormData): Promise<{ error: string | null; success?: boolean; }> {
  // Esta función ya no es necesaria, pero la mantenemos para compatibilidad
  return { error: 'Login ahora se maneja del lado del cliente', success: false };
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
        console.log('🔄 Starting team members sync with validation...');
        
        const { validateTeamMember, normalizeTeamMember } = await import('@/lib/data-validation');
        const { defaultTeamMembers } = await import('@/lib/team');
        
        // Validar y normalizar cada miembro antes de agregarlo
        const validatedMembers = [];
        for (const member of defaultTeamMembers) {
            console.log(`🔍 Validating member: ${member.name}`);
            
            const normalizedMember = normalizeTeamMember(member);
            if (normalizedMember) {
                validatedMembers.push(normalizedMember);
                console.log(`✅ Member ${member.name} validated and normalized`);
            } else {
                console.error(`❌ Member ${member.name} failed validation - SKIPPING`);
            }
        }

        if (validatedMembers.length === 0) {
            return { success: false, message: 'No valid team members found to sync' };
        }

        // Usar batch para operaciones atómicas
        const firestoreBatch = writeBatch(db);

        // Agregar solo los miembros validados
        validatedMembers.forEach(member => {
            const docRef = doc(db, 'teamMembers', member.slug);
            // Usar set sin merge para sobrescribir completamente los datos corruptos
            firestoreBatch.set(docRef, member);
            console.log(`📝 Queued member for sync: ${member.name} (${member.slug})`);
        });

        // Ejecutar todas las operaciones en un solo lote
        await firestoreBatch.commit();
        
        // Revalidar la página del equipo
        revalidatePath('/quienes-somos');
        
        console.log(`✅ Team members sync completed successfully - ${validatedMembers.length} members synced`);
        return { 
            success: true, 
            message: `Successfully synced ${validatedMembers.length} validated team members with Firestore.` 
        };
    } catch (error) {
        console.error('❌ Error syncing team members with Firestore:', error);
         if (error instanceof Error) {
            return { success: false, message: `Error del servidor: ${error.message}` };
        }
        return { success: false, message: 'Un error desconocido ocurrió durante la sincronización.' };
    }
}
