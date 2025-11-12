'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import Logo from '@/components/logo';
import { useUser, useAuth } from '@/firebase';

export default function AdminLoginPage() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user, isAdmin, isAdminLoading } = useUser();
  const auth = useAuth();

  useEffect(() => {
    console.log('AdminLoginPage - useEffect triggered:', {
      isAdminLoading,
      user: !!user,
      userEmail: user?.email,
      isAdmin
    });
    
    if (!isAdminLoading && user && isAdmin) {
      console.log('Redirigiendo a /aw-admin/admin');
      router.replace('/aw-admin/admin');
    }
  }, [user, isAdmin, isAdminLoading, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      setError('Email y contraseña son requeridos.');
      setIsPending(false);
      return;
    }

    try {
      console.log(`Intento de inicio de sesión para: ${email}`);
      await signInWithEmailAndPassword(auth, email, password);
      console.log(`Inicio de sesión exitoso para: ${email}`);
      // No necesitamos redirigir manualmente, useEffect lo hará cuando el estado cambie
    } catch (error: unknown) {
      console.error('Error en login:', error);

      if (
        error instanceof FirebaseError &&
        (error.code === 'auth/invalid-credential' ||
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password')
      ) {
        setError('Las credenciales proporcionadas no son válidas.');
      } else if (error instanceof FirebaseError) {
        setError(`Error de autenticación: ${error.message}`);
      } else {
        setError('Ocurrió un error inesperado durante la autenticación.');
      }
    } finally {
      setIsPending(false);
    }
  };

  // Debug info en la consola
  console.log('AdminLoginPage render:', {
    isAdminLoading,
    hasUser: !!user,
    isAdmin,
    isPending
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full bg-card border-border/50">
        <CardHeader className="text-center">
          <div className="w-32 h-24 mx-auto relative mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl">Panel de Administración</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder al sistema de edición
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                required
                disabled={isPending}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                disabled={isPending}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
          
          {error && (
            <Alert className="mt-4" variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error de inicio de sesión</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
