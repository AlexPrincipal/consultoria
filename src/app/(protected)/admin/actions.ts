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
    // The data is a single field update, e.g., { heroHeadline: "New Text" }
    const docRef = doc(db, 'homePageContent', 'main');
    await setDoc(docRef, data, { merge: true });

    // Invalidate the cache for the homepage to show the new content
    revalidatePath('/');
    
    return { success: true, message: 'Contenido actualizado.' };
  } catch (error) {
    console.error("Error updating document: ", error);
    let errorMessage = 'Ocurrió un error desconocido al guardar.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}
