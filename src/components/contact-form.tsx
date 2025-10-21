'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useState, useTransition } from 'react';
import { submitContactForm } from '@/app/actions/contact';

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, ingrese un email válido.' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }),
  serviceContext: z.string().optional(),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function ContactForm({ serviceContext }: { serviceContext?: string }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      serviceContext: serviceContext,
    },
  });

  async function onSubmit(values: ContactFormValues) {
    startTransition(async () => {
      const result = await submitContactForm(values);

      if (result.success) {
        toast({
          title: 'Formulario Enviado',
          description: 'Gracias por su mensaje. Nos pondremos en contacto con usted a la brevedad.',
        });
        form.reset();
      } else {
         toast({
          variant: "destructive",
          title: "Error al enviar",
          description: result.message,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Nombre Completo</FormLabel>
              <FormControl>
                <Input placeholder="Su nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="su@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Teléfono (Opcional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Su número de teléfono" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">¿Cómo podemos ayudarle?</FormLabel>
              <FormControl>
                <Textarea placeholder="Describa brevemente su situación o consulta..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Enviando...' : 'Enviar Consulta'}
        </Button>
      </form>
    </Form>
  );
}
