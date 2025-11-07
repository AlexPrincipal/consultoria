'use client';

import { useUser } from '@/firebase';
import { useAdminStore } from '@/lib/store';
import { Button } from './ui/button';
import { logout } from '@/app/(protected)/admin/actions';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Edit, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function AdminToolbar() {
  const { user, isUserLoading } = useUser();
  const { isEditMode, toggleEditMode } = useAdminStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const isDevBypass = isClient && sessionStorage.getItem('dev-admin') === 'true';

  if (isUserLoading) {
    return null; // Don't show anything while checking auth status
  }

  if (!user && !isDevBypass) {
    return null; // Not an admin, don't render the toolbar
  }

  return (
    <div className="fixed top-4 right-4 z-[100] bg-card/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-border/50 flex items-center gap-6">
      <div className="flex items-center space-x-2">
        <Switch
          id="edit-mode-toggle"
          checked={isEditMode}
          onCheckedChange={toggleEditMode}
          aria-label="Toggle Edit Mode"
        />
        <Label htmlFor="edit-mode-toggle" className={cn("font-semibold", isEditMode ? "text-primary" : "text-foreground")}>
          <div className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Modo Edición
          </div>
        </Label>
      </div>
      <form action={() => {
          if (isClient) {
            sessionStorage.removeItem('dev-admin');
          }
          logout();
      }}>
        <Button variant="ghost" size="sm" type="submit">
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar Sesión
        </Button>
      </form>
    </div>
  );
}
