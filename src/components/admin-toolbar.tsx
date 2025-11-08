
'use client';

import { useAdminStore } from '@/lib/store';
import { Button } from './ui/button';
import { logout } from '@/app/admin/actions';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Edit, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

// Este componente es la barra de herramientas que aparece en la parte superior
// cuando un administrador ha iniciado sesión.
export default function AdminToolbar() {
  // Se utiliza el hook `useAdminStore` para obtener el estado actual del modo de edición
  // y la función para cambiarlo (toggle).
  const { isEditMode, toggleEditMode } = useAdminStore();

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
        
        {/* El botón de "Cerrar Sesión". */}
        {/* Está envuelto en un formulario porque `logout` es una Acción de Servidor (Server Action).
            Al hacer clic en el botón (que es de tipo `submit`), se envía el formulario y se ejecuta la acción `logout`. */}
        <form action={logout}>
          <Button variant="ghost" size="sm" type="submit">
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
}
