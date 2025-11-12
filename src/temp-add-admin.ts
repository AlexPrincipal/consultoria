// Script temporal para agregar usuario como admin
// Este archivo se puede eliminar después de ejecutar

import { doc, setDoc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

export async function addUserAsAdmin() {
  try {
    const { firestore } = initializeFirebase();
    
    // Lista de usuarios que deben ser admin
    const adminUsers = [
      {
        uid: 'PlsM1dvFniOLHikjMZkAxSJeqZz2',
        email: 'alex@gmail.com'
      },
      {
        uid: 'JPCBwG476bcN3VnmFrcQjo4pG3', 
        email: 'admin@example.com'
      }
    ];
    
    // Agregar cada usuario como admin
    for (const user of adminUsers) {
      await setDoc(doc(firestore, 'roles_admin', user.uid), {
        email: user.email,
        role: 'admin',
        createdAt: new Date(),
        createdBy: 'system'
      });
      console.log(`Usuario ${user.email} agregado como admin`);
    }
    
    console.log('Todos los usuarios agregados como admin exitosamente');
    return { success: true };
  } catch (error) {
    console.error('Error agregando usuarios como admin:', error);
    return { success: false, error };
  }
}