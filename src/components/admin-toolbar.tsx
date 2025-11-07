
'use client';

import { useUser } from '@/firebase';
import { Button } from './ui/button';
import { logout } from '@/app/(protected)/admin/actions';
import { AppState, useStore } from '@/lib/store';
import { Edit, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const isDevBypassEnabled = process.env.NEXT_PUBLIC_DEV_ADMIN_BYPASS === 'true';

export default function AdminToolbar() {
  const { user, isUserLoading } = useUser();
  const { isEditing, setIsEditing } = useStore((state: AppState) => ({
    isEditing: state.isEditing,
    setIsEditing: state.setIsEditing,
  }));

  const isAuthenticated = user || isDevBypassEnabled;

  useEffect(() => {
    // If user logs out, disable editing mode
    if (!isAuthenticated) {
      setIsEditing(false);
    }
  }, [isAuthenticated, setIsEditing]);

  if (isUserLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-[100]">
      <div className="flex items-center gap-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 p-2 shadow-lg">
        <Button
          variant={isEditing ? 'default' : 'outline'}
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className={cn(
            "transition-all",
            isEditing ? "bg-primary text-primary-foreground" : "bg-transparent"
          )}
        >
          <Edit className="mr-2 h-4 w-4" />
          {isEditing ? 'Salir del Modo Edición' : 'Modo Edición'}
        </Button>
        <form action={logout}>
          <Button variant="ghost" size="icon" type="submit" aria-label="Cerrar sesión">
            <LogOut className="h-5 w-5 text-muted-foreground" />
          </Button>
        </form>
      </div>
    </div>
  );
}
