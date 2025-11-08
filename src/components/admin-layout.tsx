
'use client';

import { useUser } from '@/firebase';
import AdminToolbar from './admin-toolbar';
import { cn } from '@/lib/utils';
import { useAdminStore } from '@/lib/store';

// Este es un "Layout Component" que envuelve el contenido principal de la aplicación.
// Su propósito es decidir si debe mostrar la barra de herramientas de administrador.
// Es un Componente de Cliente ('use client') porque necesita usar hooks (useUser, useAdminStore)
// para reaccionar a los cambios de estado del lado del cliente, como el inicio de sesión.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Se utiliza el hook `useUser` para obtener el estado de autenticación actual.
  // `isAdmin` será `true` solo si el `FirebaseProvider` ha confirmado que hay un usuario logueado.
  const { isAdmin } = useUser();
  
  // Se utiliza `useAdminStore` para saber si el "Modo Edición" está activado en la barra de herramientas.
  const { isEditMode } = useAdminStore();
  
  // La condición para mostrar la barra de herramientas es simple: ¿el usuario es administrador?
  const showToolbar = isAdmin;

  return (
    <>
      {/* Renderizado condicional: El AdminToolbar solo se renderiza en el DOM si showToolbar es true. */}
      {showToolbar && <AdminToolbar />}
      
      {/* El `div` que envuelve el contenido principal (`children`).
          Aplica un padding-top (pt-14) SOLO si la barra de herramientas se está mostrando
          Y el modo de edición está activo. Esto evita que la barra de herramientas (que es `fixed`)
          se superponga con el contenido de la página. */}
      <div className={cn(showToolbar && isEditMode && 'pt-14')}>{children}</div>
    </>
  );
}
