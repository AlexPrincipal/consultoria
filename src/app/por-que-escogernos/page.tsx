
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Target, Users, Zap } from 'lucide-react';
import AnimatedSection from '@/components/animated-section';
import EditableText from '@/components/editable-text';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';


const featuresData = [
  {
    icon: <Target className="h-12 w-12 text-primary" />,
    titleField: 'feature1Title',
    defaultTitle: 'Soluciones enfocadas en tus resultados',
    descriptionField: 'feature1Desc',
    defaultDescription: 'Tu éxito es nuestra medida. Diseñamos cada estrategia legal no solo para resolver un problema, sino para que tu negocio obtenga un beneficio tangible. Tu inversión en asesoría legal se traduce en resultados concretos y medibles.',
    imageId: 'why-us-strategy',
  },
  {
    icon: <Users className="h-12 w-12 text-primary" />,
    titleField: 'feature2Title',
    defaultTitle: 'Un socio estratégico a tu lado',
    descriptionField: 'feature2Desc',
    defaultDescription: 'Más que tus abogados, seremos parte de tu equipo. Nos involucramos para entender tu mercado, anticipar tus necesidades y comprometernos con tu crecimiento. Tendrás un aliado que comparte tu visión y trabaja por tus metas.',
    imageId: 'why-us-commitment',
  },
  {
    icon: <Zap className="h-12 w-12 text-primary" />,
    titleField: 'feature3Title',
    defaultTitle: 'Experiencia que entiende tu negocio',
    descriptionField: 'feature3Desc',
    defaultDescription: 'Tu caso estará respaldado por un equipo que combina la solidez legal con una visión de negocios real, forjada en roles de alta dirección. Hablamos tu idioma y te ofrecemos soluciones que no solo son correctas en papel, sino que funcionan en la práctica.',
    imageId: 'why-us-experience',
  },
];

export default function WhyUsPage() {

  const firestore = useFirestore();
  const contentRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'pageContent', 'why-us') : null),
    [firestore]
  );
  const { data: pageData, isLoading } = useDoc(contentRef, {
      id: 'why-us',
      title: 'La tranquilidad de tener al socio correcto',
      subhead: 'En un entorno de negocios complejo, no solo necesitas un abogado, sino un aliado que proteja tu presente y potencie tu futuro. Descubre cómo nuestro enfoque marca la diferencia para tu empresa.',
      ctaTitle: '¿Listo para que trabajemos juntos?',
      ctaSubhead: 'Los servicios legales no deberían ser un gasto, sino una inversión en tu éxito. Hablemos de cómo podemos generar valor para tu empresa.',
      ctaButton: 'Agendar una Consulta Estratégica'
  });

  const content = pageData || {};

  return (
    <div className="bg-background text-white">
      {/* Hero */}
      <AnimatedSection className="py-20 md:py-28 text-center bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            <EditableText field="title" defaultText={content.title} isLoading={isLoading} pageId="why-us" />
          </h1>
          <div className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
             <EditableText field="subhead" defaultText={content.subhead} isLoading={isLoading} pageId="why-us" multiline/>
          </div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-20">
            {featuresData.map((feature, index) => {
              const image = PlaceHolderImages.find((p) => p.id === feature.imageId);
              const isEven = index % 2 === 0;
              return (
                <div key={feature.titleField} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className={`space-y-4 ${isEven ? 'md:order-last' : ''}`}>
                    <div className="flex items-center gap-4">
                      {feature.icon}
                      <h2 className="text-3xl font-bold font-headline text-primary">
                        <EditableText field={feature.titleField} defaultText={content[feature.titleField] ?? feature.defaultTitle} isLoading={isLoading} pageId="why-us" />
                      </h2>
                    </div>
                    <div className="text-muted-foreground leading-relaxed text-lg">
                       <EditableText field={feature.descriptionField} defaultText={content[feature.descriptionField] ?? feature.defaultDescription} isLoading={isLoading} pageId="why-us" multiline/>
                    </div>
                  </div>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Call to Action */}
      <AnimatedSection className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold font-headline text-white">
            <EditableText field="ctaTitle" defaultText={content.ctaTitle} isLoading={isLoading} pageId="why-us" />
          </h2>
          <div className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
             <EditableText field="ctaSubhead" defaultText={content.ctaSubhead} isLoading={isLoading} pageId="why-us" multiline />
          </div>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/contacto">
                <EditableText field="ctaButton" defaultText={content.ctaButton} isLoading={isLoading} pageId="why-us" />
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

    