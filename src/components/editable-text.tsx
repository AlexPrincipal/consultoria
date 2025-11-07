'use client';

import { AppState, useStore } from '@/lib/store';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { updateHomePageContent } from '@/app/(protected)/admin/actions';
import { doc } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface EditableTextProps extends React.HTMLAttributes<HTMLDivElement> {
  field: string;
  defaultText: string;
  isLoading?: boolean;
  as?: 'input' | 'textarea';
}

export default function EditableText({
  field,
  defaultText,
  isLoading: isDataLoading,
  as = 'input',
  className,
  ...props
}: EditableTextProps) {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [currentText, setCurrentText] = useState(defaultText);
  const [isEditingThis, setIsEditingThis] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const isEditingGlobally = useStore((state: AppState) => state.isEditing);
  const homePageContentRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'homePageContent', 'main') : null),
    [firestore]
  );
  const { data: homePageData } = useDoc(homePageContentRef);

  const isAuthenticated = !!user;

  useEffect(() => {
    if (homePageData && homePageData[field]) {
      setCurrentText(homePageData[field]);
    } else {
      setCurrentText(defaultText);
    }
  }, [homePageData, field, defaultText]);
  
  useEffect(() => {
    if (isEditingThis && inputRef.current) {
        inputRef.current.focus();
        // Move cursor to end of text
        inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
    }
  }, [isEditingThis]);

  const handleSave = async (newValue: string) => {
    if (newValue === currentText) return;

    const optimisticData = { ...homePageData, [field]: newValue };
    setCurrentText(newValue); // Optimistic update

    toast({ title: 'Guardando...', description: `Actualizando "${field}"` });
    
    const result = await updateHomePageContent({ [field]: newValue });

    if (result.success) {
      toast({ title: 'Guardado', description: `El campo "${field}" se ha actualizado.` });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.message });
      setCurrentText(homePageData?.[field] || defaultText); // Revert on failure
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && as === 'input') {
      e.preventDefault();
      setIsEditingThis(false);
      handleSave((e.target as HTMLInputElement).value);
    }
    if (e.key === 'Escape') {
      setIsEditingThis(false);
      // Optional: revert changes on escape
      setCurrentText(homePageData?.[field] || defaultText);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsEditingThis(false);
    handleSave(e.target.value);
  };


  if (isDataLoading) {
    return <Skeleton className={cn("h-6 w-48 inline-block", className)} />;
  }
  
  if (isEditingGlobally && isAuthenticated) {
    if (isEditingThis) {
       const commonProps = {
         ref: inputRef as any,
         defaultValue: currentText,
         onBlur: handleBlur,
         onKeyDown: handleKeyDown,
         className: cn("bg-transparent border-0 ring-0 focus:ring-0 focus:outline-none p-0 m-0 w-full", className)
       };
       return as === 'textarea' ? (
         <textarea {...commonProps} rows={3} />
       ) : (
         <input {...commonProps} />
       );
    }

    return (
      <span
        onClick={() => setIsEditingThis(true)}
        className={cn("relative cursor-pointer hover:bg-primary/10 p-1 rounded-md border-2 border-dashed border-transparent hover:border-primary/50 transition-all group", className)}
        {...props}
      >
        {currentText}
        <Pencil className="h-3 w-3 absolute top-1 right-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      </span>
    );
  }

  return <span className={className} {...props}>{currentText}</span>;
}
