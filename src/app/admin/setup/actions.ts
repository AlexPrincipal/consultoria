
'use server';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/server';
import { FirebaseError } from 'firebase/app';

interface SetupResult {
    success: boolean;
    message: string;
}

/**
 * Creates the development admin user if it doesn't exist and assigns the admin role.
 * This action should only be available and callable in a development environment.
 */
export async function setupDevAdmin(): Promise<SetupResult> {
    console.log("Iniciando la acción setupDevAdmin...");
    if (process.env.NODE_ENV !== 'development') {
        console.warn('Bloqueado: setupDevAdmin solo está disponible en modo de desarrollo.');
        return { success: false, message: 'Esta acción solo está disponible en modo de desarrollo.' };
    }

    const email = 'admin@example.com';
    const password = 'admin';

    try {
        // 1. Try to create the user
        console.log(`Intentando crear usuario: ${email}`);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(`¡Éxito! Usuario administrador de desarrollo creado con UID: ${user.uid}`);

        // 2. Assign the admin role in Firestore
        console.log(`Asignando rol de administrador en Firestore al UID: ${user.uid}`);
        const adminRoleRef = doc(db, 'roles_admin', user.uid);
        await setDoc(adminRoleRef, { uid: user.uid, assignedAt: serverTimestamp() });
        console.log(`¡Éxito! Rol de administrador asignado a ${user.uid}`);

        return { success: true, message: '¡Éxito! El usuario admin@example.com ha sido creado. Ahora puede iniciar sesión.' };

    } catch (error) {
        console.error("--- ERROR DETECTADO EN SETUPDEVADMIN ---");
        if (error instanceof FirebaseError) {
            console.error(`Código de error de Firebase: ${error.code}`);
            console.error(`Mensaje de error de Firebase: ${error.message}`);
            // If the user already exists, that's okay. We just inform the user.
            if (error.code === 'auth/email-already-in-use') {
                console.log('El usuario administrador de desarrollo ya existe.');
                return { success: true, message: 'El usuario administrador ya existe. Puede iniciar sesión directamente.'};
            }
            return { success: false, message: `Error de Firebase: ${error.message} (${error.code})` };
        }

        console.error('Error desconocido al configurar el administrador de desarrollo:', error);
        
        if (error instanceof Error) {
            return { success: false, message: `Ocurrió un error desconocido: ${error.message}` };
        }

        return { success: false, message: 'Ocurrió un error desconocido.' };
    }
}
