'use client';

import { useFirestore, useUser, useDoc, useMemoFirebase } from '@/firebase';
import { doc, collection, getDocs, deleteDoc, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { TeamMember } from '@/lib/data-validation';

type TeamMemberDoc = TeamMember & { id: string };

export default function CleanupPage() {
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const [members, setMembers] = useState<TeamMemberDoc[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const adminRoleRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'roles_admin', user.uid) : null),
    [firestore, user]
  );
  const { data: adminRoleDoc, isLoading: isAdminRoleLoading } = useDoc(adminRoleRef);
  const isAdmin = !isUserLoading && !isAdminRoleLoading && user && !!adminRoleDoc;

  const loadTeamMembers = async () => {
    if (!firestore || !isAdmin) return;
    
    setIsLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore, 'teamMembers'));
      const membersList = snapshot.docs.map((memberDoc: QueryDocumentSnapshot<DocumentData>): TeamMemberDoc => {
        const data = memberDoc.data() as TeamMember;
        return {
          ...data,
          id: memberDoc.id,
        };
      });
      setMembers(membersList);
      setMessage(`Encontrados ${membersList.length} miembros del equipo`);
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const cleanupReneProfiles = async () => {
    if (!firestore || !isAdmin) return;
    
    setIsLoading(true);
    try {
      const reneMembers = members.filter((member) => {
        if (!member.name) {
          return false;
        }
        const name = member.name.toLowerCase();
        return name.includes('rené') || name.includes('rene');
      });
      
      if (reneMembers.length <= 1) {
        setMessage('No hay perfiles duplicados de René para eliminar');
        return;
      }
      
      // Mantener el primero, eliminar el resto
      for (let i = 1; i < reneMembers.length; i++) {
        await deleteDoc(doc(firestore, 'teamMembers', reneMembers[i].id));
      }
      
      setMessage(`Eliminados ${reneMembers.length - 1} perfiles duplicados de René`);
      
      // Recargar datos
      await loadTeamMembers();
      
    } catch (error) {
      setMessage(`Error limpiando: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) {
    return <div>No tienes permisos de administrador</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Limpieza de Datos</h1>
      
      <div className="space-y-4">
        <Button 
          onClick={loadTeamMembers} 
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Cargar Miembros del Equipo'}
        </Button>
        
        {members.length > 0 && (
          <>
            <div className="border rounded p-4">
              <h2 className="text-lg font-semibold mb-2">Miembros del Equipo ({members.length})</h2>
              {members.map((member) => (
                <div key={member.id} className="py-1">
                  <strong>ID:</strong> {member.id} - <strong>Nombre:</strong> {member.name ?? 'Sin nombre'}
                </div>
              ))}
            </div>
            
            <Button 
              onClick={cleanupReneProfiles} 
              disabled={isLoading}
              variant="destructive"
            >
              {isLoading ? 'Limpiando...' : 'Limpiar Perfiles Duplicados de René'}
            </Button>
          </>
        )}
        
        {message && (
          <div className="p-4 bg-gray-100 rounded">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}