
'use server';
/**
 * @fileOverview A flow for sending a contact form email using Resend.
 *
 * - sendContactEmail - A function that handles sending the contact email.
 * - ContactFormInput - The input type for the sendContactEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { Resend } from 'resend';

const TO_EMAIL = 'chrisjaog@gmail.com';
const FROM_EMAIL = 'onboarding@resend.dev'; // IMPORTANT: Resend requires a verified domain to send from your own email. 'onboarding@resend.dev' is for testing.
const SUBJECT_PREFIX = 'Nuevo Mensaje de Contacto C+ Jurídico';

// Initialize Resend. It will automatically use the RESEND_API_KEY from your environment variables.
const resend = new Resend(process.env.RESEND_API_KEY);

const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person submitting the form.'),
  email: z.string().email().describe('The email address of the person submitting the form.'),
  phone: z.string().optional().describe('The optional phone number.'),
  message: z.string().describe('The message content from the form.'),
  serviceContext: z.string().optional().describe('The service page from which the form was submitted.'),
});

export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

// This is the main flow that will be called by the server action.
const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (input) => {
    const subject = input.serviceContext
        ? `${SUBJECT_PREFIX} - Interés en ${input.serviceContext}`
        : SUBJECT_PREFIX;

    const body = `
        <html><body>
        <h2>Nuevo Mensaje de Contacto</h2>
        <p><strong>Nombre:</strong> ${input.name}</p>
        <p><strong>Email:</strong> ${input.email}</p>
        <p><strong>Teléfono:</strong> ${input.phone || 'No proporcionado'}</p>
        <p><strong>Servicio de Interés:</strong> ${input.serviceContext || 'No especificado'}</p>
        <hr>
        <h3>Mensaje:</h3>
        <p>${input.message}</p>
        </body></html>
    `;

    if (!process.env.RESEND_API_KEY) {
      console.warn('--- RESEND_API_KEY is not set. Simulating email send. ---');
      console.log(`To: ${TO_EMAIL}`);
      console.log(`From: ${FROM_EMAIL}`);
      console.log(`Subject: ${subject}`);
      console.log('Body (HTML):', body);
      console.log('-----------------------------------------------------------');
      return { success: true };
    }

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: subject,
        html: body,
      });
       return { success: true };
    } catch (error) {
      console.error('Error sending email via Resend:', error);
      // We re-throw the error so the calling flow knows it failed.
      throw new Error('Failed to send email.');
    }
  }
);

export async function sendContactEmail(input: ContactFormInput): Promise<{ success: boolean }> {
  return await sendEmailFlow(input);
}
