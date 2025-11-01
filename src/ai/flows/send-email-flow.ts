
'use server';
/**
 * @fileOverview A flow for sending a contact form email.
 *
 * - sendContactEmail - A function that handles sending the contact email.
 * - ContactFormInput - The input type for the sendContactEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TO_EMAIL = 'chrisjaog@gmail.com';
const SUBJECT_PREFIX = 'Nuevo Mensaje de Contacto C+ Jurídico';

const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person submitting the form.'),
  email: z.string().email().describe('The email address of the person submitting the form.'),
  phone: z.string().optional().describe('The optional phone number.'),
  message: z.string().describe('The message content from the form.'),
  serviceContext: z.string().optional().describe('The service page from which the form was submitted.'),
});

export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

export async function sendContactEmail(input: ContactFormInput): Promise<void> {
  await sendEmailFlow(input);
}

const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    // NOTE: This is a simulation. In a real implementation, we would use a tool 
    // to send an email with a service like Resend or SendGrid.
    
    const subject = input.serviceContext
      ? `${SUBJECT_PREFIX} - Interés en ${input.serviceContext}`
      : SUBJECT_PREFIX;

    const body = `
      Has recibido un nuevo mensaje de contacto:

      Nombre: ${input.name}
      Email: ${input.email}
      Teléfono: ${input.phone || 'No proporcionado'}
      Servicio de Interés: ${input.serviceContext || 'No especificado'}
      
      Mensaje:
      ${input.message}
    `;

    console.log('--- SIMULATING EMAIL SEND (NOT ACTUALLY SENT) ---');
    console.log(`To: ${TO_EMAIL}`);
    console.log(`Subject: ${subject}`);
    console.log('Body:', body);
    console.log('----------------------------------------------------');
    console.log('To make this work, you need to integrate a real email sending service (e.g., Resend, SendGrid).');


    // Example of what a real implementation would look like:
    // const sendEmailTool = ai.defineTool( ... );
    // const emailPrompt = ai.definePrompt({ tools: [sendEmailTool], ... });
    // await emailPrompt(input);
  }
);
