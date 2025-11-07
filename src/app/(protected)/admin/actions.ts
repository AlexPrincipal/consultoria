'use server';

import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/server';
import { redirect } from 'next/navigation';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { revalidatePath } from 'next/cache';

export async function logout() {
  await signOut(auth);
  redirect('/admin/login');
}

export async function updateHomePageContent(data: any) {
  try {
    const db = getFirestore(getApp());
    const docRef = doc(db, 'homePageContent', 'main');
    await setDoc(docRef, data, { merge: true });
    revalidatePath('/');
    return { success: true, message: 'Contenido de la página de inicio actualizado.' };
  } catch (error) {
    console.error("Error updating document: ", error);
    let errorMessage = 'Ocurrió un error desconocido al guardar.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}

export async function updatePageContent(data: any, pageId: string) {
    if (!pageId) {
        return { success: false, message: 'Se requiere un ID de página.' };
    }
  try {
    const db = getFirestore(getApp());
    const docRef = doc(db, 'pageContent', pageId);
    await setDoc(docRef, data, { merge: true });

    revalidatePath(`/${pageId}`); // Revalidate the specific page
    revalidatePath('/quienes-somos'); // Also revalidate related pages just in case
    
    return { success: true, message: 'Contenido actualizado.' };
  } catch (error) {
    console.error(`Error updating document [${pageId}]: `, error);
    let errorMessage = 'Ocurrió un error desconocido al guardar.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}

    