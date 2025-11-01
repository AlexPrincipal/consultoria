
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

// Define the schema for the email sending tool
const SendEmailToolSchema = z.object({
  to: z.string().email(),
  from: z.string().email(),
  subject: z.string(),
  html: z.string(),
});

// Define the Genkit tool for sending emails
const sendEmailTool = ai.defineTool(
  {
    name: 'sendEmail',
    description: 'Sends an email to a specified recipient.',
    inputSchema: SendEmailToolSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    if (!process.env.RESEND_API_KEY) {
      console.warn('--- RESEND_API_KEY is not set. Simulating email send. ---');
      console.log(`To: ${input.to}`);
      console.log(`From: ${input.from}`);
      console.log(`Subject: ${input.subject}`);
      console.log('Body (HTML):', input.html);
      console.log('-----------------------------------------------------------');
      return;
    }
    
    try {
      await resend.emails.send({
        from: input.from,
        to: input.to,
        subject: input.subject,
        html: input.html,
      });
    } catch (error) {
      console.error('Error sending email via Resend:', error);
      // We re-throw the error so the calling flow knows it failed.
      throw new Error('Failed to send email.');
    }
  }
);

// Define the prompt that will use the tool
const emailPrompt = ai.definePrompt(
  {
    name: 'sendEmailPrompt',
    input: { schema: ContactFormInputSchema },
    // Make the tool available to the model
    tools: [sendEmailTool],
    prompt: `
      A user has submitted a contact form on the website. 
      Your task is to generate the content for an email notification and send it to the site administrator.
      
      The user's details are:
      - Name: {{{name}}}
      - Email: {{{email}}}
      - Phone: {{{phone}}}
      - Service of Interest: {{{serviceContext}}}
      - Message: {{{message}}}
      
      Use the sendEmail tool to send the email.
    `,
  },
  async (input) => {
    // Generate the email content using the model and the provided tool
    const llmResponse = await ai.generate({
      prompt: `
        A user has submitted a contact form. Please formulate and send an email to the administrator.
        
        Details:
        - Name: ${input.name}
        - Email: ${input.email}
        - Phone: ${input.phone || 'Not provided'}
        - Service of Interest: ${input.serviceContext || 'Not specified'}
        - Message: ${input.message}
        
        The 'to' address is '${TO_EMAIL}'.
        The 'from' address is '${FROM_EMAIL}'.
        The subject should be '${input.serviceContext ? `${SUBJECT_PREFIX} - Interés en ${input.serviceContext}` : SUBJECT_PREFIX}'.
        The body should be a well-formatted HTML document.
      `,
      tools: [sendEmailTool],
      model: 'googleai/gemini-2.5-flash',
    });

    const toolCall = llmResponse.toolCalls?.find(call => call.tool === 'sendEmail');

    if (toolCall) {
        await sendEmailTool(toolCall.input);
    } else {
        // Fallback for simulation or if model fails to call tool
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

        await sendEmailTool({
            to: TO_EMAIL,
            from: FROM_EMAIL,
            subject: subject,
            html: body
        });
    }
  }
);


// This is the main flow that will be called by the server action.
const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    // We call the prompt which has the logic to use the email tool.
    await emailPrompt(input);
  }
);

export async function sendContactEmail(input: ContactFormInput): Promise<void> {
  await sendEmailFlow(input);
}
