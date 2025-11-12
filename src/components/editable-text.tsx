'use client';

import { useAdminStore } from '@/lib/store';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { useState, useEffect, useCallback, useRef } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface EditableTextProps {
  field: string;
  defaultText: string;
  isLoading: boolean;
  multiline?: boolean;
  className?: string;
  collectionId: string;
  docId: string;
}

export default function EditableText({
  field,
  defaultText,
  isLoading,
  multiline = false,
  className,
  collectionId,
  docId
}: EditableTextProps) {
  // Validación inicial de props
  const safeField = field || 'defaultField';
  const safeDefaultText = defaultText || '';
  const safeCollectionId = collectionId || 'defaultCollection';
  const safeDocId = docId || 'defaultDoc';

  const { isEditMode } = useAdminStore();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [content, setContent] = useState(safeDefaultText);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const adminRoleRef = useMemoFirebase(
    () => {
      try {
        return (firestore && user ? doc(firestore, 'roles_admin', user.uid) : null);
      } catch (error) {
        return null;
      }
    },
    [firestore, user]
  );
  
  const { data: adminRoleDoc, isLoading: isAdminRoleLoading } = useDoc(adminRoleRef);
  const isAdmin = !isUserLoading && !isAdminRoleLoading && user && !!adminRoleDoc;
  const canEdit = isEditMode && isAdmin;

  const saveToFirestore = useCallback(async (newContent: string) => {
    try {
      // Validaciones robustas
      if (!firestore || !safeField || !safeCollectionId || !safeDocId || !canEdit) {
        return;
      }

      const trimmedContent = (newContent || '').trim();
      const trimmedDefault = safeDefaultText.trim();
      
      if (trimmedContent === trimmedDefault) {
        return;
      }

      setIsSaving(true);
      
      const docRef = doc(firestore, safeCollectionId, safeDocId);
      await setDoc(docRef, { [safeField]: trimmedContent }, { merge: true });
      
      if (toast) {
        toast({
          title: 'Guardado',
          description: 'Cambios guardados automáticamente.',
        });
      }
    } catch (error) {
      if (toast) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No se pudo guardar el cambio.',
        });
      }
      // Restaurar contenido original en caso de error
      setContent(safeDefaultText);
    } finally {
      setIsSaving(false);
    }
  }, [firestore, safeDefaultText, canEdit, safeCollectionId, safeDocId, safeField, toast]);

  // Sincronizar contenido cuando cambie defaultText
  useEffect(() => {
    const newSafeText = defaultText || '';
    if (newSafeText !== content && !isEditing) {
      setContent(newSafeText);
    }
  }, [defaultText, content, isEditing]);

  // Debounce para guardado automático
  useEffect(() => {
    if (!canEdit || isEditing) return;
    
    const trimmedContent = content.trim();
    const trimmedDefault = safeDefaultText.trim();
    
    if (trimmedContent !== trimmedDefault) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      
      debounceRef.current = setTimeout(() => {
        saveToFirestore(content);
      }, 1000);
      
      return () => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
      };
    }
  }, [content, safeDefaultText, canEdit, isEditing, saveToFirestore]);

  const handleClick = useCallback(() => {
    if (canEdit && !isEditing && !isSaving) {
      setIsEditing(true);
    }
  }, [canEdit, isEditing, isSaving]);

  const handleChange = useCallback((evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    try {
      const value = evt.target.value || '';
      setContent(value);
    } catch (error) {
      // En caso de error, mantener el contenido actual
    }
  }, []);

  const handleBlur = useCallback(() => {
    if (!isEditing) return;
    
    setIsEditing(false);
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    
    const trimmedContent = content.trim();
    const trimmedDefault = safeDefaultText.trim();
    
    if (trimmedContent !== trimmedDefault && canEdit) {
      saveToFirestore(content);
    }
  }, [isEditing, content, safeDefaultText, canEdit, saveToFirestore]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    try {
      if (e.key === 'Enter' && !multiline) {
        e.preventDefault();
        handleBlur();
      }
      if (e.key === 'Escape') {
        setContent(safeDefaultText);
        setIsEditing(false);
      }
    } catch (error) {
      // Continuar normalmente si hay error en el manejo de teclas
    }
  }, [multiline, handleBlur, safeDefaultText]);

  // Auto-focus cuando entra en modo edición
  useEffect(() => {
    if (isEditing) {
      try {
        const ref = multiline ? textareaRef.current : inputRef.current;
        if (ref) {
          setTimeout(() => {
            ref.focus();
            ref.select();
          }, 10);
        }
      } catch (error) {
        // Si hay error con el focus, continuar sin problema
      }
    }
  }, [isEditing, multiline]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Estados de carga
  if (isLoading) {
    return (
      <div className={cn("h-6 w-48 bg-gray-200 animate-pulse rounded", className)} />
    );
  }

  // Modo lectura
  if (!canEdit) {
    const displayContent = content || safeDefaultText || 'Contenido no disponible';
    return multiline ? (
      <span className={cn("whitespace-pre-wrap", className)}>
        {displayContent}
      </span>
    ) : (
      <span className={className}>{displayContent}</span>
    );
  }

  // Modo edición activo
  if (isEditing) {
    return (
      <div className="relative inline-block w-full">
        {multiline ? (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={cn(
              "w-full p-3 bg-black/80 text-white border border-blue-400/50 rounded-md", 
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              "placeholder-gray-300 backdrop-blur-sm shadow-lg",
              "resize-none transition-all duration-200",
              className
            )}
            placeholder="Escribe aquí..."
            rows={3}
            disabled={isSaving}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={content}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={cn(
              "w-full p-2 bg-black/80 text-white border border-blue-400/50 rounded", 
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              "placeholder-gray-300 backdrop-blur-sm shadow-lg",
              "transition-all duration-200",
              className
            )}
            placeholder="Escribe aquí..."
            disabled={isSaving}
          />
        )}
        {isSaving && (
          <Loader2 className="absolute -right-6 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-blue-400" />
        )}
      </div>
    );
  }

  // Modo edición disponible (hover)
  const displayContent = content || safeDefaultText || 'Haz clic para editar';
  
  const sharedProps = {
    onClick: handleClick,
    className: cn(
      'transition-all duration-200 cursor-pointer hover:bg-blue-500/20 p-1 rounded-md',
      'border border-transparent hover:border-blue-400/50',
      'hover:shadow-md hover:shadow-blue-500/25',
      multiline && 'whitespace-pre-wrap',
      isSaving && 'bg-blue-500/10 border-blue-400/30 pointer-events-none',
      className
    ),
    role: "button" as const,
    tabIndex: 0,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleClick();
      }
    }
  };

  const content_with_loader = (
    <>
      {displayContent}
      {isSaving && (
        <Loader2 className="inline ml-2 h-4 w-4 animate-spin text-blue-400" />
      )}
    </>
  );
  
  // Usar span para contenido inline para evitar errores de hidratación
  return multiline ? (
    <div {...sharedProps}>
      {content_with_loader}
    </div>
  ) : (
    <span {...sharedProps}>
      {content_with_loader}
    </span>
  );
}
