
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Briefcase } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';
import EditableText from '@/components/editable-text';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import Script from 'next/script';
import { getServiceSchema } from '@/lib/seo';

export default function CreacionEmpresasPage() {
  const firestore = useFirestore();

  const contentRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'content', 'consultoria-creacion-empresas') : null),
    [firestore]
  );
  const { data: content, isLoading } = useDoc(contentRef);

  // Contenido por defecto
  const defaultContent = {
    title: "Consultoría para la Creación de Empresas",
    description: "Inicie su negocio sobre cimientos sólidos. Nuestro asesoramiento proactivo le permite tomar decisiones informadas, minimizar riesgos y maximizar oportunidades desde el día uno, garantizando una estructura legal robusta para un crecimiento seguro.",
    formTitle: "Construya su empresa con expertos",
    sectionTitle: "De la Idea a la Operación, sin Fisuras",
    service1Title: "Constitución y Trámites",
    service1Description: "Nos encargamos de la gestión completa de los trámites y requisitos para la constitución legal de su sociedad en México, asegurando un proceso ágil y sin errores.",
    service2Title: "Estructura Societaria a la Medida",
    service2Description: "Diseñamos la estructura corporativa (S.A., S.A.S., S. de R.L., etc.) óptima para sus metas de negocio, protegiendo sus intereses y facilitando el gobierno corporativo futuro.",
    service3Title: "Asesoría para Inversión Extranjera",
    service3Description: "Ofrecemos asesoría especializada para la apertura de filiales en México, incluyendo trámites migratorios ante el INM para su personal extranjero (Constancia de Empleador).",
    ctaTitle: "¿Listo para Fortalecer su Empresa?",
    ctaDescription: "Nuestro equipo está preparado para ofrecerle la asesoría estratégica que su negocio necesita. Contáctenos hoy para una evaluación de su caso.",
  };
    const serviceSchema = getServiceSchema('consultoria-creacion-empresas');

  return (
    <div className="bg-background text-white">
      <Script id="service-schema-consultoria-creacion" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceSchema)}
      </Script>
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Briefcase className="h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-headline">
                <EditableText
                  field="title"
                  defaultText={content?.title ?? defaultContent.title}
                  isLoading={isLoading}
                  className="text-4xl md:text-5xl font-bold font-headline"
                  collectionId="content"
                  docId="consultoria-creacion-empresas"
                />
              </h1>
              <div className="mt-4 text-lg text-muted-foreground"><EditableText
                  field="description"
                  defaultText={content?.description ?? defaultContent.description}
                  isLoading={isLoading}
                  multiline
                  className="mt-4 text-lg text-muted-foreground"
                  collectionId="content"
                  docId="consultoria-creacion-empresas"
                />
              </div>
            </div>
            <div className="flex justify-center">
               <Card className="w-full max-w-md bg-card border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-center text-white">
                    <EditableText
                      field="formTitle"
                      defaultText={content?.formTitle ?? defaultContent.formTitle}
                      isLoading={isLoading}
                      className="text-2xl font-headline text-center text-white"
                      collectionId="content"
                      docId="consultoria-creacion-empresas"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                 <ContactForm serviceContext="Creación de Empresas" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline text-center mb-12 text-white">
            <EditableText
              field="sectionTitle"
              defaultText={content?.sectionTitle ?? defaultContent.sectionTitle}
              isLoading={isLoading}
              className="text-3xl font-bold font-headline text-center mb-12 text-white"
              collectionId="content"
              docId="consultoria-creacion-empresas"
            />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">
                <EditableText
                  field="service1Title"
                  defaultText={content?.service1Title ?? defaultContent.service1Title}
                  isLoading={isLoading}
                  className="font-semibold text-xl mb-2 text-white"
                  collectionId="content"
                  docId="consultoria-creacion-empresas"
                />
              </h3>
              <div className="text-muted-foreground"><EditableText
                  field="service1Description"
                  defaultText={content?.service1Description ?? defaultContent.service1Description}
                  isLoading={isLoading}
                  multiline
                  className="text-muted-foreground"
                  collectionId="content"
                  docId="consultoria-creacion-empresas"
                />
              </div>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">
                <EditableText
                  field="service2Title"
                  defaultText={content?.service2Title ?? defaultContent.service2Title}
                  isLoading={isLoading}
                  className="font-semibold text-xl mb-2 text-white"
                  collectionId="content"
                  docId="consultoria-creacion-empresas"
                />
              </h3>
              <div className="text-muted-foreground"><EditableText
                  field="service2Description"
                  defaultText={content?.service2Description ?? defaultContent.service2Description}
                  isLoading={isLoading}
                  multiline
                  className="text-muted-foreground"
                  collectionId="content"
                  docId="consultoria-creacion-empresas"
                />
              </div>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">
                <EditableText
                  field="service3Title"
                  defaultText={content?.service3Title ?? defaultContent.service3Title}
                  isLoading={isLoading}
                  className="font-semibold text-xl mb-2 text-white"
                  collectionId="content"
                  docId="consultoria-creacion-empresas"
                />
              </h3>
              <div className="text-muted-foreground"><EditableText
                  field="service3Description"
                  defaultText={content?.service3Description ?? defaultContent.service3Description}
                  isLoading={isLoading}
                  multiline
                  className="text-muted-foreground"
                  collectionId="content"
                  docId="consultoria-creacion-empresas"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <h2 className="text-3xl font-bold font-headline mb-4 text-white">
            <EditableText
              field="ctaTitle"
              defaultText={content?.ctaTitle ?? defaultContent.ctaTitle}
              isLoading={isLoading}
              className="text-3xl font-bold font-headline mb-4 text-white"
              collectionId="content"
              docId="consultoria-creacion-empresas"
            />
          </h2>
          <div className="text-muted-foreground mb-8 max-w-2xl mx-auto"><EditableText
              field="ctaDescription"
              defaultText={content?.ctaDescription ?? defaultContent.ctaDescription}
              isLoading={isLoading}
              multiline
              className="text-muted-foreground mb-8 max-w-2xl mx-auto"
              collectionId="content"
              docId="consultoria-creacion-empresas"
            />
          </div>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/contacto">Agendar una Consulta</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
