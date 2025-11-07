'use client';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/admin/actions';
import { useAuth, useUser } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User as FirebaseUser } from 'firebase/auth';

function AdminWelcome({ user }: { user: FirebaseUser }) {
  return (
    <Card className="w-full max-w-lg bg-card border-border/50">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Panel de Administración</CardTitle>
        <CardDescription>
          Bienvenido, {user.email}. Desde aquí podrás gestionar el contenido de la página.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground mb-6'>Próximamente: aquí encontrarás los formularios para editar los textos e imágenes de tu sitio web.</p>
        <form action={logout}>
          <Button variant="outline" type="submit">Cerrar Sesión</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function AdminPage() {
    const { user, isUserLoading } = useUser();

    if (isUserLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Cargando...</p>
            </div>
        )
    }

    if (!user) {
        // This case should be handled by the layout redirect, but as a fallback:
        return (
             <div className="flex items-center justify-center min-h-screen">
                <p>No autorizado.</p>
            </div>
        );
    }
  
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <AdminWelcome user={user} />
        </div>
    );
}
