

'use client';

import { useTransition, useState } from 'react';
import { setupDevAdmin } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Terminal, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function SetupAdminPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSetup = () => {
    startTransition(async () => {
      const actionResult = await setupDevAdmin();
      setResult(actionResult);
    });
  };
  
  if (process.env.NODE_ENV !== 'development') {
      return (
        <div className="flex items-center justify-center min-h-screen bg-background">
             <Card className="mx-auto max-w-sm w-full bg-card border-border/50">
                 <CardHeader>
                    <CardTitle>Acceso Denegado</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className='text-muted-foreground'>Esta página solo está disponible en el entorno de desarrollo.</p>
                 </CardContent>
            </Card>
        </div>
      )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-md w-full bg-card border-border/50">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <UserPlus className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline text-center">Configuración de Administrador</CardTitle>
          <CardDescription className="text-center">
            Crea el usuario de desarrollo (`admin@example.com`) con rol de administrador.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {result ? (
            result.success ? (
              <Alert variant="default" className="border-green-500/50 text-green-200">
                <Check className="h-4 w-4 text-green-400" />
                <AlertTitle>¡Configuración Completa!</AlertTitle>
                <AlertDescription>
                  {result.message}
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error en la Configuración</AlertTitle>
                <AlertDescription>
                  {result.message}
                </AlertDescription>
              </Alert>
            )
          ) : (
             <p className="text-sm text-center text-muted-foreground">
                Haz clic en el botón para crear el usuario administrador con la contraseña "admin123". 
                Solo necesitas hacer esto una vez.
            </p>
          )}

          {!result?.success && (
            <Button onClick={handleSetup} className="w-full" disabled={isPending}>
              {isPending ? 'Creando usuario...' : 'Crear Usuario Admin'}
            </Button>
          )}

          <div className="text-center">
            <Button variant="link" asChild>
              <Link href="/aw-admin">Ir a Iniciar Sesión &rarr;</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
