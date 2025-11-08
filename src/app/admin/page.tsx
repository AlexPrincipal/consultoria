

'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import Logo from '@/components/logo';
import Link from 'next/link';
import { useUser } from '@/firebase';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);
  const router = useRouter();
  const { user, isUserLoading, isAdmin, isAdminLoading } = useUser();

  useEffect(() => {
    // If user is already logged in and they are an admin, redirect them away from login page.
    if (!isAdminLoading && user && isAdmin) {
      router.replace('/');
    }
  }, [user, isAdmin, isAdminLoading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full bg-card border-border/50">
        <CardHeader className="text-center">
            <div className="w-32 h-28 mx-auto relative mb-4">
                <Logo />
            </div>
          <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
          <CardDescription>Ingrese sus credenciales para administrar el contenido.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                defaultValue="admin@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required defaultValue="admin123"/>
            </div>
            {state?.error && (
               <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Error de Inicio de Sesión</AlertTitle>
                  <AlertDescription>
                    {state.error}
                  </AlertDescription>
                </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isPending || isAdminLoading}>
              {isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>
            <div className="mt-4 text-center text-sm">
                ¿Necesita crear el usuario admin?{' '}
                <Link href="/aw-admin/setup" className="underline text-primary">
                    Ir a la página de configuración
                </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
