
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import EditableText from '@/components/editable-text';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import Script from 'next/script';
import { getServiceSchema } from '@/lib/seo';

export default function CompliancePage() {
    const serviceImage = PlaceHolderImages.find((p) => p.id === 'servicio-compliance');
    const firestore = useFirestore();

    const contentRef = useMemoFirebase(
      () => (firestore ? doc(firestore, 'content', 'compliance') : null),
      [firestore]
    );
    const { data: content, isLoading } = useDoc(contentRef);

    // Contenido por defecto
    const defaultContent = {
      title: "Cumplimiento Normativo (Compliance)",
      description: "Aseguramos que su empresa cumpla con todas las leyes y regulaciones aplicables para evitar sanciones. Implementamos un sistema de gestión proactivo para prevenir, detectar y corregir riesgos, garantizando que sus actividades se ajusten al marco legal, regulatorio y ético.",
      formTitle: "Blinde su operación",
      sectionTitle: "Más que Cumplir la Ley: Es Gestión de Riesgo",
      service1Title: "Prevención de Responsabilidad Penal",
      service1Description: "Implementamos controles para mitigar la responsabilidad penal tanto del personal como de la persona moral, protegiendo a los directivos y a la propia empresa.",
      service2Title: "Políticas y Procedimientos Clave",
      service2Description: "Diseñamos e implementamos códigos de conducta, políticas anticorrupción, manuales de prevención de lavado de dinero (PLD) y canales de denuncia seguros.",
      service3Title: "Supervisión y Auditoría Continua",
      service3Description: "Realizamos auditorías periódicas y supervisión constante para asegurar la efectividad de los controles internos y la adaptación a nuevas normativas.",
      ctaTitle: "¿Listo para Fortalecer su Empresa?",
      ctaDescription: "Nuestro equipo está preparado para ofrecerle la asesoría estratégica que su negocio necesita. Contáctenos hoy para una evaluación de su caso.",
    };
    const serviceSchema = getServiceSchema('compliance');

  return (
    <div className="bg-background text-white">
      <Script id="service-schema-compliance" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceSchema)}
      </Script>
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold font-headline">
                <EditableText
                  field="title"
                  defaultText={content?.title ?? defaultContent.title}
                  isLoading={isLoading}
                  className="text-4xl md:text-5xl font-bold font-headline"
                  collectionId="content"
                  docId="compliance"
                />
              </h1>
              <div className="mt-4 text-lg text-muted-foreground">
                <EditableText
                  field="description"
                  defaultText={content?.description ?? defaultContent.description}
                  isLoading={isLoading}
                  multiline
                  className="mt-4 text-lg text-muted-foreground"
                  collectionId="content"
                  docId="compliance"
                />
              </div>
                {serviceImage && (
                <div className="relative aspect-video rounded-lg overflow-hidden mt-6">
                    <Image
                    src={serviceImage.imageUrl}
                    alt={serviceImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={serviceImage.imageHint}
                    />
                </div>
                )}
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
                      docId="compliance"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                 <ContactForm serviceContext="Compliance" />
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
              docId="compliance"
            />
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary"/>
                  <EditableText
                    field="service1Title"
                    defaultText={content?.service1Title ?? defaultContent.service1Title}
                    isLoading={isLoading}
                    className="text-xl text-white font-semibold"
                    collectionId="content"
                    docId="compliance"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="text-muted-foreground">
                  <EditableText
                    field="service1Description"
                    defaultText={content?.service1Description ?? defaultContent.service1Description}
                    isLoading={isLoading}
                    multiline
                    className="text-muted-foreground"
                    collectionId="content"
                    docId="compliance"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary"/>
                  <EditableText
                    field="service2Title"
                    defaultText={content?.service2Title ?? defaultContent.service2Title}
                    isLoading={isLoading}
                    className="text-xl text-white font-semibold"
                    collectionId="content"
                    docId="compliance"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="text-muted-foreground">
                  <EditableText
                    field="service2Description"
                    defaultText={content?.service2Description ?? defaultContent.service2Description}
                    isLoading={isLoading}
                    multiline
                    className="text-muted-foreground"
                    collectionId="content"
                    docId="compliance"
                  />
                </div>
              </CardContent>
            </Card>
             <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary"/>
                  <EditableText
                    field="service3Title"
                    defaultText={content?.service3Title ?? defaultContent.service3Title}
                    isLoading={isLoading}
                    className="text-xl text-white font-semibold"
                    collectionId="content"
                    docId="compliance"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="text-muted-foreground">
                  <EditableText
                    field="service3Description"
                    defaultText={content?.service3Description ?? defaultContent.service3Description}
                    isLoading={isLoading}
                    multiline
                    className="text-muted-foreground"
                    collectionId="content"
                    docId="compliance"
                  />
                </div>
              </CardContent>
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
              docId="compliance"
            />
          </h2>
          <div className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            <EditableText
              field="ctaDescription"
              defaultText={content?.ctaDescription ?? defaultContent.ctaDescription}
              isLoading={isLoading}
              multiline
              className="text-muted-foreground mb-8 max-w-2xl mx-auto"
              collectionId="content"
              docId="compliance"
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
