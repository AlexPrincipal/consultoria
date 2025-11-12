'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser, useAuth } from '@/firebase';
import { addUserAsAdmin } from '@/temp-add-admin';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AdminPanel() {
  const { user, isAdmin } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [isSettingUpAdmin, setIsSettingUpAdmin] = useState(false);
  const [adminSetupResult, setAdminSetupResult] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSetupAdmin = async () => {
    setIsSettingUpAdmin(true);
    setAdminSetupResult(null);
    
    try {
      const result = await addUserAsAdmin();
      if (result.success) {
        setAdminSetupResult('✅ Usuario configurado como admin exitosamente. Recarga la página.');
      } else {
        setAdminSetupResult('❌ Error al configurar usuario como admin.');
      }
    } catch (error) {
      setAdminSetupResult('❌ Error al configurar usuario como admin.');
      console.error(error);
    } finally {
      setIsSettingUpAdmin(false);
    }
  };

  const handleCompleteLogout = async () => {
    setIsLoggingOut(true);
    try {
      console.log('Iniciando logout completo...');
      
      // 1. Cerrar sesión de Firebase Auth
      await signOut(auth);
      console.log('Sesión de Firebase cerrada');
      
      // 2. Limpiar localStorage
      localStorage.clear();
      console.log('localStorage limpiado');
      
      // 3. Limpiar sessionStorage
      sessionStorage.clear();
      console.log('sessionStorage limpiado');
      
      // 4. Limpiar cualquier cookie de Firebase (usando un enfoque más agresivo)
      if (typeof document !== 'undefined') {
        document.cookie.split(";").forEach((c) => {
          const eqPos = c.indexOf("=");
          const name = eqPos > -1 ? c.substr(0, eqPos) : c;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + window.location.hostname;
        });
        console.log('Cookies limpiadas');
      }
      
      // 5. Esperar un momento para que se procesen los cambios
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 6. Redirigir al login y recargar la página completamente
      console.log('Redirigiendo al login...');
      window.location.href = '/aw-admin';
      
    } catch (error) {
      console.error('Error durante el logout:', error);
      // En caso de error, forzar recarga completa
      window.location.reload();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-muted-foreground mt-2">
            Bienvenido al sistema de edición de contenido
          </p>
        </div>
        
        {user && (
          <Button 
            onClick={handleCompleteLogout} 
            variant="outline"
            disabled={isLoggingOut}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión'}
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estado del Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Usuario:</strong> {user?.email || 'No logueado'}</p>
            <p><strong>Es Admin:</strong> {isAdmin ? 'Sí' : 'No'}</p>
            <p><strong>Estado:</strong> Conectado correctamente</p>
          </div>
          
          {!isAdmin && user && (
            <div className="mt-4 p-4 border rounded-lg bg-yellow-50">
              <p className="text-sm mb-2">⚠️ Tu usuario no tiene permisos de administrador.</p>
              <Button 
                onClick={handleSetupAdmin} 
                disabled={isSettingUpAdmin}
                variant="outline"
              >
                {isSettingUpAdmin ? 'Configurando...' : 'Configurar como Admin'}
              </Button>
              {adminSetupResult && (
                <p className="mt-2 text-sm">{adminSetupResult}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6">
        <p>🎉 El panel administrativo está funcionando correctamente.</p>
        <p className="text-sm text-muted-foreground mt-2">
          Próximamente se añadirán las funcionalidades de edición de contenido.
        </p>
      </div>
    </div>
  );
}