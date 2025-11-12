
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

export default function RepresentacionDefensaPage() {
    const serviceImage = PlaceHolderImages.find((p) => p.id === 'servicio-representacion');
    const firestore = useFirestore();

    const contentRef = useMemoFirebase(
      () => (firestore ? doc(firestore, 'content', 'representacion-defensa') : null),
      [firestore]
    );
    const { data: content, isLoading } = useDoc(contentRef);

    // Contenido por defecto
    const defaultContent = {
      title: "Representación y Defensa",
      description: "Cuando sus intereses están en juego, necesita un defensor estratégico. Actuamos en nombre de su empresa con una defensa sólida y una representación experta en negociaciones, ante autoridades y en procedimientos judiciales en materia empresarial.",
      formTitle: "Evalúe su caso con un experto",
      sectionTitle: "Nuestras Áreas de Representación",
      service1Title: "Representación en Negociaciones",
      service1Description: "Actuamos como su abogado en la negociación de contratos complejos, alianzas estratégicas, fusiones, adquisiciones (M&A), o disoluciones para asegurar siempre los términos más favorables para su negocio.",
      service2Title: "Representación ante Organismos Públicos",
      service2Description: "Gestionamos y tramitamos asuntos ante autoridades administrativas, registros mercantiles, notarías o reguladores (por ejemplo, en temas de competencia económica o protección de datos).",
      service3Title: "Formalización de Acuerdos",
      service3Description: "Firmamos documentos, contratos, o escrituras en nombre de la sociedad, asegurando que todos los actos cumplan con el marco legal corporativo y los estatutos internos.",
      service4Title: "Defensa Corporativa en Litigios",
      service4Description: "Representamos a la empresa como demandante o demandada en juicios o procedimientos ante tribunales.",
      ctaTitle: "¿Listo para Fortalecer su Empresa?",
      ctaDescription: "Nuestro equipo está preparado para ofrecerle la asesoría estratégica que su negocio necesita. Contáctenos hoy para una evaluación de su caso.",
    };

    const serviceSchema = getServiceSchema('representacion-defensa');

  return (
    <div className="bg-background text-white">
      <Script id="service-schema-representacion-defensa" type="application/ld+json" strategy="afterInteractive">
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
                  docId="representacion-defensa"
                />
              </h1>
              <div className="mt-4 text-lg text-muted-foreground"><EditableText
                  field="description"
                  defaultText={content?.description ?? defaultContent.description}
                  isLoading={isLoading}
                  multiline
                  className="mt-4 text-lg text-muted-foreground"
                  collectionId="content"
                  docId="representacion-defensa"
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
                      docId="representacion-defensa"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                 <ContactForm serviceContext="Representación y Defensa" />
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
              docId="representacion-defensa"
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
                     docId="representacion-defensa"
                   />
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="text-muted-foreground"><EditableText
                    field="service1Description"
                    defaultText={content?.service1Description ?? defaultContent.service1Description}
                    isLoading={isLoading}
                    multiline
                    className="text-muted-foreground"
                    collectionId="content"
                    docId="representacion-defensa"
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
                     docId="representacion-defensa"
                   />
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="text-muted-foreground"><EditableText
                    field="service2Description"
                    defaultText={content?.service2Description ?? defaultContent.service2Description}
                    isLoading={isLoading}
                    multiline
                    className="text-muted-foreground"
                    collectionId="content"
                    docId="representacion-defensa"
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
                     docId="representacion-defensa"
                   />
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="text-muted-foreground"><EditableText
                    field="service3Description"
                    defaultText={content?.service3Description ?? defaultContent.service3Description}
                    isLoading={isLoading}
                    multiline
                    className="text-muted-foreground"
                    collectionId="content"
                    docId="representacion-defensa"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                 <CardTitle className="text-xl text-white font-semibold flex items-center gap-3">
                   <CheckCircle className="h-6 w-6 text-primary"/>
                   <EditableText
                     field="service4Title"
                     defaultText={content?.service4Title ?? defaultContent.service4Title}
                     isLoading={isLoading}
                     className="text-xl text-white font-semibold"
                     collectionId="content"
                     docId="representacion-defensa"
                   />
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="text-muted-foreground mb-4">
                  <EditableText
                    field="service4Description"
                    defaultText={content?.service4Description ?? defaultContent.service4Description}
                    isLoading={isLoading}
                    multiline
                    className="text-muted-foreground"
                    collectionId="content"
                    docId="representacion-defensa"
                  />
                </div>
                <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                  <li><span className='font-semibold text-white/90'>Litigio Mercantil:</span> Disputas por incumplimiento de contratos, competencia desleal, reclamación de deudas (cobranza judicial), o conflictos entre socios.</li>
                  <li><span className='font-semibold text-white/90'>Litigio Laboral:</span> Defensa de la empresa ante demandas de empleados o sindicatos (despidos, condiciones de trabajo).</li>
                  <li><span className='font-semibold text-white/90'>Litigio Administrativo/Fiscal:</span> Impugnación de multas, sanciones o resoluciones emitidas por autoridades gubernamentales.</li>
                </ul>
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
              docId="representacion-defensa"
            />
          </h2>
          <div className="text-muted-foreground mb-8 max-w-2xl mx-auto"><EditableText
              field="ctaDescription"
              defaultText={content?.ctaDescription ?? defaultContent.ctaDescription}
              isLoading={isLoading}
              multiline
              className="text-muted-foreground mb-8 max-w-2xl mx-auto"
              collectionId="content"
              docId="representacion-defensa"
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
