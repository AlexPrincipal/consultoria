
'use client';

import { useAdminStore } from '@/lib/store';
import { useUser, useFirestore, FirestorePermissionError, errorEmitter } from '@/firebase';
import { useState, useEffect, useRef, useTransition } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Check, Loader } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';

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
  const { isEditMode } = useAdminStore();
  const { isAdmin } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultText);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const canEdit = isEditMode && isAdmin;


  useEffect(() => {
    setValue(defaultText);
  }, [defaultText]);

  useEffect(() => {
    if (isEditing && canEdit) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing, canEdit]);

  const handleSave = () => {
    if (!firestore) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo conectar a la base de datos.',
      });
      return;
    }
     if (value === defaultText) {
      setIsEditing(false);
      return; // No-op if value hasn't changed
    }

    startTransition(() => {
      const data = { [field]: value };
      const docRef = doc(firestore, collectionId, docId);
      
      // Use non-blocking write with structured error handling
      setDoc(docRef, data, { merge: true })
        .then(() => {
            toast({
              title: 'Guardado',
              description: `El campo se ha actualizado correctamente.`,
              action: <Check className="h-5 w-5 text-green-500" />,
            });
        })
        .catch((serverError) => {
            const permissionError = new FirestorePermissionError({
              path: docRef.path,
              operation: 'update', // or 'create' if applicable
              requestResourceData: data,
            });
            
            // This will be caught by the FirebaseErrorListener and displayed in the dev overlay
            errorEmitter.emit('permission-error', permissionError);

            // Also show a user-friendly toast
            toast({
              variant: 'destructive',
              title: 'Error de Permiso',
              description: 'No tienes permiso para guardar estos cambios.',
            });
        });

      setIsEditing(false);
    });
  };

  const handleCancel = () => {
    setValue(defaultText);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  const Component = multiline ? Textarea : Input;

  if (isLoading) {
    return <Skeleton className={cn("h-6 w-48 inline-block", className)} />;
  }

  if (canEdit && isEditing) {
    return (
      <div className="relative">
        <Component
          // @ts-ignore
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className={cn("w-full p-1 h-auto text-base", className)}
          disabled={isPending}
        />
        {isPending && <Loader className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin" />}
      </div>
    );
  }
  
  const renderedValue = value || defaultText;

  // For multiline, we need to render newlines correctly
  if (multiline) {
    return (
        <div
            onClick={() => canEdit && setIsEditing(true)}
            className={cn(
                'transition-all whitespace-pre-wrap',
                canEdit && 'cursor-pointer hover:bg-primary/10 p-1 rounded-md border border-transparent hover:border-primary/50',
                className
            )}
        >
            {renderedValue}
        </div>
    );
  }


  return (
    <span
      onClick={() => canEdit && setIsEditing(true)}
      className={cn(
        'transition-all',
        canEdit && 'cursor-pointer hover:bg-primary/10 p-1 rounded-md border border-transparent hover:border-primary/50',
        className
      )}
    >
      {renderedValue}
    </span>
  );
}
