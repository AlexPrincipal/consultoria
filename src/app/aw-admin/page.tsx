
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
  // `useActionState` es un hook de React para manejar el estado de las acciones de formulario.
  // `state` contiene la respuesta de la acción (éxito o error).
  // `formAction` es la función que se pasa al prop `action` del formulario.
  // `isPending` es un booleano que indica si la acción está en curso.
  const [state, formAction, isPending] = useActionState(login, null);
  
  // `useRouter` para manejar la redirección del lado del cliente.
  const router = useRouter();
  
  // `useUser` nos da el estado actual del usuario: si está logueado, si es admin, y si se está cargando.
  const { user, isAdmin, isAdminLoading } = useUser();

  // `useEffect` se ejecuta cuando cambian las dependencias `user`, `isAdmin`, etc.
  // Es crucial para la redirección DESPUÉS de un inicio de sesión exitoso.
  useEffect(() => {
    // Esta es la condición de redirección:
    // 1. La comprobación de administrador NO debe estar en curso (`!isAdminLoading`).
    // 2. Debe existir un objeto `user` (la sesión está activa).
    // 3. `isAdmin` debe ser `true`.
    // Si todo esto se cumple, significa que el inicio de sesión fue exitoso y se ha confirmado el rol.
    if (!isAdminLoading && user && isAdmin) {
      // `router.replace('/')` redirige al usuario a la página de inicio.
      // Se usa `replace` en lugar de `push` para que el usuario no pueda volver a la página de login con el botón "atrás" del navegador.
      router.replace('/');
    }
  }, [user, isAdmin, isAdminLoading, router]); // El efecto se vuelve a ejecutar si alguno de estos valores cambia.


  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full bg-card border-border/50">
        <CardHeader className="text-center">
            <div className="w-80 h-48 mx-auto relative mb-4">
                <Logo />
            </div>
          <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
          <CardDescription>Ingrese sus credenciales para administrar el contenido.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* El `action` del formulario está vinculado a `formAction` del hook `useActionState`.
              Esto ejecuta la acción `login` del servidor cuando se envía el formulario. */}
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
            
            {/* Muestra un mensaje de error si el `state` de la acción del formulario contiene un error. */}
            {state?.error && (
               <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Error de Inicio de Sesión</AlertTitle>
                  <AlertDescription>
                    {state.error}
                  </AlertDescription>
                </Alert>
            )}
            
            {/* El botón de envío se deshabilita mientras la acción de inicio de sesión (`isPending`) o
                la comprobación del rol de administrador (`isAdminLoading`) están en curso. */}
            <Button type="submit" className="w-full" disabled={isPending || isAdminLoading}>
              {isPending || isAdminLoading ? 'Verificando...' : 'Iniciar Sesión'}
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
