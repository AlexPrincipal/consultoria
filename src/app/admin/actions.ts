
'use server';

import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/server';
import { redirect } from 'next/navigation';
import { collection, doc, getFirestore, writeBatch, setDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { revalidatePath } from 'next/cache';
import { defaultTeamMembers } from '@/lib/team';

export async function logout() {
  await signOut(auth);
  redirect('/admin/login');
}

export async function updateHomePageContent(data: any) {
  try {
    const db = getFirestore(getApp());
    const docRef = doc(db, 'homePageContent', 'main');
    await setDoc(docRef, data, { merge: true });

    // Invalidate the cache for the homepage to show the new content
    revalidatePath('/');
    
    return { success: true, message: 'Contenido de la página de inicio actualizado correctamente.' };
  } catch (error) {
    console.error("Error updating document: ", error);
    let errorMessage = 'Ocurrió un error desconocido al guardar.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}


export async function syncTeamMembersWithFirestore() {
  try {
    const db = getFirestore(getApp());
    const batch = writeBatch(db);
    const teamMembersCol = collection(db, 'teamMembers');

    defaultTeamMembers.forEach((member) => {
      const docRef = doc(teamMembersCol, member.slug);
      batch.set(docRef, member);
    });

    await batch.commit();

    // Revalidate paths where team members are displayed
    revalidatePath('/quienes-somos');
    defaultTeamMembers.forEach((member) => {
      revalidatePath(`/quienes-somos/${member.slug}`);
    });

    return { success: true, message: 'Miembros del equipo sincronizados con la base de datos.' };
  } catch (error) {
    console.error("Error syncing team members: ", error);
    let errorMessage = 'Ocurrió un error desconocido durante la sincronización.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}

    