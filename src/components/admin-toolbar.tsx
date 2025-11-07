'use client';

import { useAdminStore } from '@/lib/store';
import { Button } from './ui/button';
import { logout } from '@/app/admin/actions';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Edit, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminToolbar() {
  const { isEditMode, toggleEditMode } = useAdminStore();

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-background/90 backdrop-blur-sm shadow-md border-b border-border/50">
      <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-sm uppercase tracking-wider text-primary">Admin</span>
          <div className="flex items-center space-x-2">
            <Switch
              id="edit-mode-toggle"
              checked={isEditMode}
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
