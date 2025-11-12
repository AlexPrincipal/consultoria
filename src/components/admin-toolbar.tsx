
'use client';

import { useState } from 'react';
import { useAdminStore } from '@/lib/store';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Edit, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

// Este componente es la barra de herramientas que aparece en la parte superior
// cuando un administrador ha iniciado sesión.
export default function AdminToolbar() {
  // Se utiliza el hook `useAdminStore` para obtener el estado actual del modo de edición
  // y la función para cambiarlo (toggle).
  const { isEditMode, toggleEditMode } = useAdminStore();
  const auth = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleCompleteLogout = async () => {
    setIsLoggingOut(true);
    try {
      console.log('Iniciando logout completo desde toolbar...');
      
      // 1. Cerrar sesión de Firebase Auth
      await signOut(auth);
      console.log('Sesión de Firebase cerrada');
      
      // 2. Limpiar localStorage
      localStorage.clear();
      console.log('localStorage limpiado');
      
      // 3. Limpiar sessionStorage
      sessionStorage.clear();
      console.log('sessionStorage limpiado');
      
      // 4. Limpiar cualquier cookie de Firebase
      if (typeof document !== 'undefined') {
        document.cookie.split(";").forEach((c) => {
          const eqPos = c.indexOf("=");
          const name = eqPos > -1 ? c.substr(0, eqPos) : c;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + window.location.hostname;
        });
        console.log('Cookies limpiadas');
      }
      
      // 5. Esperar un momento para que se procesen los cambios
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 6. Redirigir al login y recargar la página completamente
      console.log('Redirigiendo al login...');
      window.location.href = '/aw-admin';
      
    } catch (error) {
      console.error('Error durante el logout:', error);
      // En caso de error, forzar recarga completa
      window.location.reload();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    // La barra de herramientas está fija (`fixed`) en la parte superior (`top-0`) y ocupa todo el ancho.
    // `z-[100]` asegura que esté por encima de la mayoría de los otros elementos.
    // `backdrop-blur-sm` le da un efecto de desenfoque al fondo para mayor legibilidad.
    <div className="fixed top-0 left-0 right-0 z-[100] bg-background/90 backdrop-blur-sm shadow-md border-b border-border/50">
      <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-sm uppercase tracking-wider text-primary">Admin</span>
          
          {/* El interruptor (Switch) para activar/desactivar el modo de edición. */}
          <div className="flex items-center space-x-2">
            <Switch
              id="edit-mode-toggle"
              // El estado `checked` del interruptor está vinculado a `isEditMode`.
              checked={isEditMode}
              // Cuando se hace clic en el interruptor, se llama a `toggleEditMode` para cambiar el estado.
              onCheckedChange={toggleEditMode}
              aria-label="Toggle Edit Mode"
            />
            <Label htmlFor="edit-mode-toggle" className={cn("font-semibold text-sm", isEditMode ? "text-primary" : "text-foreground")}>
              <div className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Modo Edición
              </div>
            </Label>
          </div>
        </div>
        
        {/* El botón de "Cerrar Sesión" ahora usa la misma lógica completa que el panel admin. */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleCompleteLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {isLoggingOut ? 'Cerrando...' : 'Cerrar Sesión'}
        </Button>
      </div>
    </div>
  );
}
