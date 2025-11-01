'use server';

import { z } from 'zod';
import { sendContactEmail } from '@/ai/flows/send-email-flow';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string(),
  serviceContext: z.string().optional(),
});

export async function submitContactForm(formData: unknown) {
  const parsedData = formSchema.safeParse(formData);

  if (!parsedData.success) {
    return { success: false, message: 'Los datos del formulario no son válidos.' };
  }

  try {
    await sendContactEmail(parsedData.data);
    return { success: true, message: 'Formulario recibido correctamente.' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Hubo un error al enviar el mensaje. Intente de nuevo más tarde.' };
  }
}
