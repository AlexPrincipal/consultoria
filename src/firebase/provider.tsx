
'use client';

import React, { DependencyList, createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

// Define la estructura de las props que el FirebaseProvider necesita para funcionar.
interface FirebaseProviderProps {
  children: ReactNode;      // Los componentes hijos que tendrán acceso al contexto.
  firebaseApp: FirebaseApp;   // La instancia de la aplicación de Firebase.
  firestore: Firestore;       // La instancia de Firestore.
  auth: Auth;                 // La instancia de Firebase Authentication.
}

// Define la estructura del estado de autenticación del usuario.
interface UserAuthState {
  user: User | null;          // El objeto User de Firebase, o null si no hay sesión.
  isUserLoading: boolean;     // Un booleano que indica si se está cargando el estado del usuario.
  userError: Error | null;    // Un objeto de error si la autenticación falla.
}

// Define la estructura completa del estado del contexto de Firebase.
export interface FirebaseContextState {
  areServicesAvailable: boolean; // Indica si los servicios de Firebase están listos.
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
  isAdmin: boolean;             // Booleano: ¿es el usuario actual un administrador?
  isAdminLoading: boolean;      // Booleano: ¿se está comprobando el rol de administrador?
}

// Define la estructura de los datos devueltos por el hook useFirebase.
export interface FirebaseServicesAndUser {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
  isAdmin: boolean;
  isAdminLoading: boolean;
}

// Define la estructura de los datos devueltos por el hook useUser.
export interface UserHookResult {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
  isAdmin: boolean;
  isAdminLoading: boolean;
}

// Crea el Contexto de React. Los componentes lo usarán para acceder a los datos de Firebase.
export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

// --- El Componente Provider Principal ---
// Este componente envuelve la aplicación y provee el estado de Firebase a todos sus hijos.
export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
  firebaseApp,
  firestore,
  auth,
}) => {
  // Estado para almacenar la información de autenticación del usuario.
  const [userAuthState, setUserAuthState] = useState<UserAuthState>({
    user: null,         // Inicialmente no hay usuario.
    isUserLoading: true, // Se establece en true porque la primera comprobación aún no ha ocurrido.
    userError: null,
  });

  // useEffect se ejecuta cuando el componente se monta y cada vez que `auth` cambia.
  // Es el núcleo de la detección de sesión en tiempo real.
  useEffect(() => {
    // Si el servicio de autenticación no está disponible, se establece un estado de error.
    if (!auth) {
      setUserAuthState({ user: null, isUserLoading: false, userError: new Error("Auth service not provided.") });
      return;
    }

    // onAuthStateChanged es un "oyente" de Firebase que se dispara cada vez que el estado
    // de autenticación cambia (inicio de sesión, cierre de sesión).
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        // Cuando Firebase responde, actualizamos el estado.
        // firebaseUser será el objeto User si la sesión está activa, o null si no lo está.
        setUserAuthState({ user: firebaseUser, isUserLoading: false, userError: null });
      },
      (error) => {
        // Si hay un error con el oyente, se captura aquí.
        console.error("FirebaseProvider: onAuthStateChanged error:", error);
        setUserAuthState({ user: null, isUserLoading: false, userError: error });
      }
    );

    // La función de limpieza de useEffect. Se ejecuta cuando el componente se desmonta.
    // 'unsubscribe' detiene el oyente para evitar fugas de memoria.
    return () => unsubscribe();
  }, [auth]); // La dependencia es `auth`, por lo que este efecto solo se vuelve a ejecutar si la instancia de `auth` cambia.

  // --- Lógica de Administrador ---
  // Esta es la lógica clave y simplificada: si existe un objeto `user`, es un administrador.
  // Como la autenticación anónima está deshabilitada, la única forma de que `user` exista
  // es a través de un inicio de sesión manual.
  const isAdmin = !!userAuthState.user;
  
  // El estado de carga del rol de admin está directamente ligado al estado de carga del usuario.
  // No hay comprobaciones adicionales, lo que elimina condiciones de carrera.
  const isAdminLoading = userAuthState.isUserLoading;

  // `useMemo` optimiza el rendimiento. El valor del contexto solo se recalcula si una de
  // sus dependencias cambia.
  const contextValue = useMemo((): FirebaseContextState => {
    const servicesAvailable = !!(firebaseApp && firestore && auth);
    return {
      areServicesAvailable: servicesAvailable,
      firebaseApp: servicesAvailable ? firebaseApp : null,
      firestore: servicesAvailable ? firestore : null,
      auth: servicesAvailable ? auth : null,
      user: userAuthState.user,
      isUserLoading: userAuthState.isUserLoading,
      userError: userAuthState.userError,
      isAdmin,
      isAdminLoading,
    };
  }, [firebaseApp, firestore, auth, userAuthState, isAdmin, isAdminLoading]);

  // El componente Provider devuelve el contexto con el valor calculado,
  // haciendo que `contextValue` esté disponible para todos los componentes hijos.
  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};

// --- Hooks Personalizados (Custom Hooks) ---
// Estos hooks simplifican el acceso a los datos del contexto.

// Hook para obtener todos los servicios de Firebase. Lanza un error si se usa fuera del Provider.
export const useFirebase = (): FirebaseServicesAndUser => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider.');
  }

  if (!context.areServicesAvailable || !context.firebaseApp || !context.firestore || !context.auth) {
    throw new Error('Firebase core services not available. Check FirebaseProvider props.');
  }

  return {
    firebaseApp: context.firebaseApp,
    firestore: context.firestore,
    auth: context.auth,
    user: context.user,
    isUserLoading: context.isUserLoading,
    userError: context.userError,
    isAdmin: context.isAdmin,
    isAdminLoading: context.isAdminLoading,
  };
};

// Hook para obtener solo el servicio de Autenticación.
export const useAuth = (): Auth => {
  const { auth } = useFirebase();
  return auth;
};

// Hook para obtener solo el servicio de Firestore.
export const useFirestore = (): Firestore => {
  const { firestore } = useFirebase();
  return firestore;
};

// Hook para obtener solo la instancia de la App de Firebase.
export const useFirebaseApp = (): FirebaseApp => {
  const { firebaseApp } = useFirebase();
  return firebaseApp;
};

// Hook para memoizar una referencia o consulta de Firebase, crucial para evitar re-renderizados infinitos en `useDoc` y `useCollection`.
type MemoFirebase <T> = T & {__memo?: boolean};

export function useMemoFirebase<T>(factory: () => T, deps: DependencyList): T | (MemoFirebase<T>) {
  const memoized = useMemo(factory, deps);
  
  if(typeof memoized !== 'object' || memoized === null) return memoized;
  (memoized as MemoFirebase<T>).__memo = true;
  
  return memoized;
}

// Hook para obtener solo la información del usuario y su estado de administrador.
// Este es el hook que los componentes de la UI (como AdminLayout) usan.
export const useUser = (): UserHookResult => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a FirebaseProvider.');
  }
  
  return { 
    user: context.user, 
    isUserLoading: context.isUserLoading, 
    userError: context.userError, 
    isAdmin: context.isAdmin, 
    isAdminLoading: context.isAdminLoading
  };
};
