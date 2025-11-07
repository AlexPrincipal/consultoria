'use client';

import { useActionState, useEffect } from 'react';
import { login } from '@/app/(auth)/admin/login/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import Logo from '@/components/logo';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);
  
  const isDevLogin = (form: FormData) => {
      return form.get('email') === 'admin@example.com' && form.get('password') === 'admin';
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if(isDevLogin(formData)) {
        // Set a session storage item for the dev bypass
        sessionStorage.setItem('dev-admin', 'true');
    } else {
        sessionStorage.removeItem('dev-admin');
    }
    formAction(formData);
  };


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
          <form onSubmit={handleSubmit} className="space-y-4">
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
