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
import { useUser } from '@/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(login, null);
  const { user, isUserLoading, isAdmin } = useUser();
  
  useEffect(() => {
    // If the user is already an admin (checked by the useUser hook), redirect them.
    if (!isUserLoading && isAdmin) {
      router.push('/'); 
    }
  }, [isAdmin, isUserLoading, router]);
  
  // This handles the successful login from the form action
  useEffect(() => {
     if (state?.success) {
      // For dev login, set a flag for the provider to handle role assignment
      if (state.devAdmin) {
         sessionStorage.setItem('dev-admin', 'true');
      }
      // A full page refresh is more reliable to ensure all providers re-evaluate auth state
      window.location.href = '/';
    }
  }, [state]);

  // If user is loading or already admin, don't render the form to avoid flashes.
  if (isUserLoading || isAdmin) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <p className="text-white">Verificando sesión...</p>
        </div>
    );
  }


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
              <Input id="password" name="password" type="password" required defaultValue="admin"/>
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
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
