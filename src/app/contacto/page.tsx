
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from '@/components/contact-form';
import EditableText from '@/components/editable-text';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';


export default function ContactPage() {
  const firestore = useFirestore();
  const contentRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'pageContent', 'contact') : null),
    [firestore]
  );
  const { data: pageData, isLoading } = useDoc(contentRef, {
      id: 'contact',
      title: 'Contáctenos',
      subhead: 'Estamos listos para escucharle. Complete el formulario para agendar una evaluación de su caso o para cualquier otra consulta. Nuestro equipo se pondrá en contacto a la brevedad.',
      emailLabel: 'Email:',
      emailValue: 'contacto@cplusjuridico.com',
      phoneLabel: 'Teléfono:',
      phoneValue: '+52 311 118 1084',
      addressLabel: 'Dirección:',
      addressValue: 'Perif. Blvd. Manuel Ávila Camacho 1903, Cd. Satélite, 53100 Naucalpan de Juárez, Méx.',
      formTitle: 'Formulario de Contacto',
      formSubhead: 'Déjenos sus datos y un breve mensaje.'
  });
  
  const content = pageData || {};

  return (
    <div className="bg-background">
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">
                 <EditableText field="title" defaultText={content.title} isLoading={isLoading} pageId="contact" />
              </h1>
              <div className="mt-4 text-lg text-muted-foreground">
                <EditableText field="subhead" defaultText={content.subhead} isLoading={isLoading} pageId="contact" multiline />
              </div>
              <div className="mt-8 space-y-4 text-muted-foreground">
                 <div>
                    <strong><EditableText field="emailLabel" defaultText={content.emailLabel} isLoading={isLoading} pageId="contact" /></strong>
                    <a href={`mailto:${content.emailValue}`} className="hover:text-primary ml-2">
                      <EditableText field="emailValue" defaultText={content.emailValue} isLoading={isLoading} pageId="contact" />
                    </a>
                </div>
                 <div>
                    <strong><EditableText field="phoneLabel" defaultText={content.phoneLabel} isLoading={isLoading} pageId="contact" /></strong> 
                    <a href={`tel:${content.phoneValue}`} className="hover:text-primary ml-2">
                       <EditableText field="phoneValue" defaultText={content.phoneValue} isLoading={isLoading} pageId="contact" />
                    </a>
                </div>
                 <div>
                    <strong><EditableText field="addressLabel" defaultText={content.addressLabel} isLoading={isLoading} pageId="contact" /></strong> 
                    <p className='inline ml-2'>
                        <EditableText field="addressValue" defaultText={content.addressValue} isLoading={isLoading} pageId="contact" multiline/>
                    </p>
                </div>
              </div>
            </div>
            <div>
              <Card className="bg-card border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-white">
                    <EditableText field="formTitle" defaultText={content.formTitle} isLoading={isLoading} pageId="contact" />
                  </CardTitle>
                  <CardDescription>
                    <EditableText field="formSubhead" defaultText={content.formSubhead} isLoading={isLoading} pageId="contact" />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

    