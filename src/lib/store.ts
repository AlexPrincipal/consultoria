
import { create } from 'zustand';

// Define la estructura del estado de administrador.
type AdminState = {
  isEditMode: boolean;      // Un booleano para saber si el modo de edición está activo.
  toggleEditMode: () => void; // Una función para cambiar el estado de `isEditMode`.
};

// `create` de Zustand es una función que crea un "store" (almacén de estado).
// Es una forma de manejar estado global en React de manera simple.
export const useAdminStore = create<AdminState>((set) => ({
  // Estado inicial: el modo de edición está desactivado por defecto.
  isEditMode: false,
  
  // `toggleEditMode` es la función que los componentes llamarán para cambiar el estado.
  // `set` es una función que Zustand proporciona para actualizar el estado de forma segura.
  // `(state) => ({ isEditMode: !state.isEditMode })` significa:
  // "toma el estado actual (`state`), y devuelve un nuevo objeto de estado donde
  // `isEditMode` es el valor opuesto al que tenía".
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
}));
