'use server';

import { z } from 'zod';

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

  const { name, email, phone, message, serviceContext } = parsedData.data;

  // Aquí es donde procesarías los datos en el backend.
  // Por ejemplo, podrías enviarlos a un CRM, una base de datos o un servicio de email.
  console.log('--- Nueva consulta recibida ---');
  console.log('Nombre:', name);
  console.log('Email:', email);
  console.log('Teléfono:', phone);
  console.log('Servicio:', serviceContext || 'No especificado');
  console.log('Mensaje:', message);
  console.log('-----------------------------');
  
  // Por ahora, simulamos un envío exitoso.
  return { success: true, message: 'Formulario recibido correctamente.' };
}
