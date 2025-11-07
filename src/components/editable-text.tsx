'use client';

import { useAdminStore } from '@/lib/store';
import { useUser } from '@/firebase';
import { useState, useEffect, useRef, useTransition } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';
import { updateHomePageContent } from '@/app/(protected)/admin/actions';
import { useToast } from '@/hooks/use-toast';
import { Check, Loader, X } from 'lucide-react';

interface EditableTextProps {
  field: string;
  defaultText: string;
  isLoading: boolean;
  multiline?: boolean;
  className?: string;
}

export default function EditableText({
  field,
  defaultText,
  isLoading,
  multiline = false,
  className,
}: EditableTextProps) {
  const { isEditMode } = useAdminStore();
  const { user } = useUser();
  const { toast } = useToast();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultText);
  const [isPending, startTransition] = useTransition();

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  
  const isDevBypass = isClient && sessionStorage.getItem('dev-admin') === 'true';

  useEffect(() => {
    setValue(defaultText);
  }, [defaultText]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateHomePageContent({ [field]: value });
      if (result.success) {
        toast({
          title: 'Guardado',
          description: `El campo se ha actualizado correctamente.`,
          action: <Check className="h-5 w-5 text-green-500" />,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.message,
        });
      }
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
  
  const canEdit = isEditMode && (user || isDevBypass);

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

  return (
    <span
      onClick={() => canEdit && setIsEditing(true)}
      className={cn(
        'transition-all',
        canEdit && 'cursor-pointer hover:bg-primary/10 p-1 rounded-md border border-transparent hover:border-primary/50',
        className
      )}
    >
      {value || defaultText}
    </span>
  );
}
