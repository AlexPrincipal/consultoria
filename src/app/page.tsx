
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, ShieldCheck, Briefcase, Landmark, FileText, Building, GitBranch, Anchor, Target, Users, Zap, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedSection from '@/components/animated-section';
import { teamMembers } from '@/lib/team';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useDoc, useFirestore, useMemoFirebase }from '@/firebase';
import { doc } from 'firebase/firestore';
import EditableText from '@/components/editable-text';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function ServiceCard({
  icon,
  title,
  description,
  href,
  className,
  titleField,
  descriptionField,
  isLoading
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  className?: string;
  titleField: string;
  descriptionField: string;
  isLoading: boolean;
}) {
  return (
    <Card className={cn("bg-card/50 text-card-foreground text-left flex flex-col shadow-lg hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300 border border-white/10", className)}>
      <CardHeader>
        {icon}
        <CardTitle className="pt-4 font-headline text-xl text-white">
          <EditableText field={titleField} defaultText={title} isLoading={isLoading} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-muted-foreground text-sm leading-relaxed">
          <EditableText field={descriptionField} defaultText={description} isLoading={isLoading} multiline />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="link" asChild className="p-0 text-primary">
          <Link href={href}>Saber Más &rarr;</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

const officeImageIds = ['oficina-1', 'oficina-2', 'oficina-3', 'oficina-4'];
const officeImages = PlaceHolderImages.filter(p => officeImageIds.includes(p.id));


function OfficeCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg" ref={emblaRef}>
      <div className="flex h-full">
        {officeImages.map((img, index) => (
          <div className="relative flex-[0_0_100%] h-full" key={index}>
            <Image
                src={img.imageUrl}
                alt={img.description}
                fill
                className="object-cover"
                data-ai-hint={img.imageHint}
                priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}


export default function Home() {
  const firestore = useFirestore();
  const mainTeamMembers = teamMembers.slice(0, 2);

  const homePageContentRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'homePageContent', 'main') : null),
    [firestore]
  );
  
  const { data: homePageData, isLoading } = useDoc(homePageContentRef);
  
  const defaultContent = {
      heroHeadline: "C+ Consultoría Legal",
      heroSubhead: "Transformamos la complejidad legal en seguridad para su negocio. Brindamos asesoría integral y representación experta para que su empresa opere con total confianza.",
      heroPrimaryCtaText: "Agendar una Consulta",
      heroSecondaryCtaText: "Nuestros Servicios",
      heroBackgroundImageUrl: "https://images.unsplash.com/photo-1730629689669-5567c3d00ad5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGxlZ2FsfGVufDB8fHx8MTc2MTAxODk4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      servicesOverviewTitle: "Nuestras Áreas de Práctica",
      servicesOverviewSubhead: "Ofrecemos asesoramiento y representación experta en las áreas cruciales del derecho corporativo para proteger y potenciar su negocio.",
      service1Title: "Asesoría y Consultoría",
      service1Description: "Orientación estratégica para la resolución de problemas complejos y el diseño de proyectos empresariales a largo plazo.",
      service2Title: "Representación y Defensa",
      service2Description: "Defensa experta en negociaciones y litigios mercantiles, laborales y administrativos ante diversas instancias.",
      service3Title: "Compliance",
      service3Description: "Implementamos programas de cumplimiento para mitigar riesgos, asegurar el marco legal y proteger la reputación de su empresa.",
      service4Title: "Comercio Internacional",
      service4Description: "Garantizamos que sus operaciones de importación y exportación se realicen de manera legal, eficiente y estratégica.",
      service5Title: "MASC",
      service5Description: "Resolvemos disputas de forma más rápida, económica y confidencial a través de la mediación y el arbitraje.",
      service6Title: "Gestión y Trámites",
      service6Description: "Nos encargamos de la elaboración de contratos, constitución de sociedades y legalización de documentos.",
      service7Title: "Área Empresarial Específica",
      service7Description: "Ofrecemos una asesoría 360° en derecho corporativo, mercantil, laboral, fiscal y gestión administrativa.",
      service8Title: "Creación de Empresas",
      service8Description: "Asesoramiento proactivo para iniciar su negocio sobre cimientos sólidos, minimizando riesgos y maximizando oportunidades.",
      whyUsTitle: "La Diferencia Estratégica",
      whyUsSubhead: "No solo somos abogados; somos socios de negocio. Descubra por qué nuestros clientes nos eligen.",
      whyUsFeature1Title: "Soluciones enfocadas en tus resultados",
      whyUsFeature1Desc: "Diseñamos cada estrategia legal no solo para resolver un problema, sino para que tu negocio obtenga un beneficio tangible y medible.",
      whyUsFeature2Title: "Un socio estratégico a tu lado",
      whyUsFeature2Desc: "Nos involucramos para entender tu mercado, anticipar tus necesidades y comprometernos con tu crecimiento como un aliado que comparte tu visión.",
      whyUsFeature3Title: "Experiencia que entiende tu negocio",
      whyUsFeature3Desc: "Tu caso estará respaldado por un equipo que combina la solidez legal con una visión de negocios real, forjada en roles de alta dirección.",
      whyUsCtaText: "Descubra más ventajas",
      teamTitle: "Conozca a Nuestro Equipo",
      teamSubhead: "La experiencia y dedicación que su empresa merece. Conozca a los socios que lideran nuestra firma.",
      teamCtaText: "Ver Todo el Equipo",
      officeTitle: "Un Espacio a la Altura de sus Negocios",
      officeSubhead: "Nuestras instalaciones están diseñadas para la excelencia, la confidencialidad y la colaboración estratégica. Le invitamos a conocer el entorno donde protegeremos sus intereses.",
      officeCtaText: "Recorrido Virtual",
      aboutTitle: "Socios Estratégicos en Derecho Corporativo",
      aboutSubhead: "Somos un equipo de abogados expertos, apasionados por ofrecer soluciones legales innovadoras y efectivas. Nuestra firma se funda sobre los pilares de la integridad, la excelencia y un compromiso inquebrantable con los objetivos de nuestros clientes, convirtiéndonos en sus socios estratégicos para el éxito.",
      aboutCtaText: "Conozca Nuestra Firma",
      contactUsTitle: "¿Listo para Fortalecer su Empresa?",
      contactUsSubhead: "Los servicios legales no deberían ser un gasto, sino una inversión en tu éxito. Hablemos de cómo podemos generar valor para tu empresa.",
      contactUsCtaText: "Agendar una Consulta Estratégica"
  }

  const content = homePageData || {};
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center min-h-[700px] text-center text-white bg-black">
          {heroImage && (
            <Image
              src={content.heroBackgroundImageUrl ?? heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover opacity-20"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="relative z-10 p-4 space-y-8 container mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight">
               <EditableText field="heroHeadline" defaultText={content.heroHeadline ?? defaultContent.heroHeadline} isLoading={isLoading} />
            </h1>
            <div className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
               <EditableText field="heroSubhead" defaultText={content.heroSubhead ?? defaultContent.heroSubhead} isLoading={isLoading} multiline />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
               <Button size="lg" asChild>
                <Link href="/contacto">
                   <EditableText field="heroPrimaryCtaText" defaultText={content.heroPrimaryCtaText ?? defaultContent.heroPrimaryCtaText} isLoading={isLoading} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/servicios">
                   <EditableText field="heroSecondaryCtaText" defaultText={content.heroSecondaryCtaText ?? defaultContent.heroSecondaryCtaText} isLoading={isLoading} />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <AnimatedSection id="servicios" className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">
                <EditableText field="servicesOverviewTitle" defaultText={content.servicesOverviewTitle ?? defaultContent.servicesOverviewTitle} isLoading={isLoading} />
              </h2>
               <div className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                 <EditableText field="servicesOverviewSubhead" defaultText={content.servicesOverviewSubhead ?? defaultContent.servicesOverviewSubhead} isLoading={isLoading} multiline/>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ServiceCard
                icon={<Briefcase className="h-10 w-10 text-primary" />}
                title={content.service1Title ?? defaultContent.service1Title}
                description={content.service1Description ?? defaultContent.service1Description}
                href="/servicios/asesoria-consultoria-legal"
                titleField="service1Title"
                descriptionField="service1Description"
                isLoading={isLoading}
              />
              <ServiceCard
                icon={<Scale className="h-10 w-10 text-primary" />}
                title={content.service2Title ?? defaultContent.service2Title}
                description={content.service2Description ?? defaultContent.service2Description}
                href="/servicios/representacion-defensa"
                titleField="service2Title"
                descriptionField="service2Description"
                isLoading={isLoading}
              />
              <ServiceCard
                icon={<ShieldCheck className="h-10 w-10 text-primary" />}
                title={content.service3Title ?? defaultContent.service3Title}
                description={content.service3Description ?? defaultContent.service3Description}
                href="/servicios/compliance"
                titleField="service3Title"
                descriptionField="service3Description"
                isLoading={isLoading}
              />
              <ServiceCard
                icon={<Anchor className="h-10 w-10 text-primary" />}
                title={content.service4Title ?? defaultContent.service4Title}
                description={content.service4Description ?? defaultContent.service4Description}
                 href="/servicios/comercio-internacional"
                 titleField="service4Title"
                 descriptionField="service4Description"
                 isLoading={isLoading}
              />
               <ServiceCard
                icon={<GitBranch className="h-10 w-10 text-primary" />}
                title={content.service5Title ?? defaultContent.service5Title}
                description={content.service5Description ?? defaultContent.service5Description}
                 href="/servicios/masc"
                 titleField="service5Title"
                 descriptionField="service5Description"
                 isLoading={isLoading}
              />
               <ServiceCard
                icon={<FileText className="h-10 w-10 text-primary" />}
                title={content.service6Title ?? defaultContent.service6Title}
                description={content.service6Description ?? defaultContent.service6Description}
                 href="/servicios/gestion-tramites"
                 titleField="service6Title"
                 descriptionField="service6Description"
                 isLoading={isLoading}
              />
              <ServiceCard
                icon={<Building className="h-10 w-10 text-primary" />}
                title={content.service7Title ?? defaultContent.service7Title}
                description={content.service7Description ?? defaultContent.service7Description}
                 href="/servicios/area-empresarial-especifica"
                 titleField="service7Title"
                 descriptionField="service7Description"
                 isLoading={isLoading}
              />
               <ServiceCard
                icon={<Briefcase className="h-10 w-10 text-primary" />}
                title={content.service8Title ?? defaultContent.service8Title}
                description={content.service8Description ?? defaultContent.service8Description}
                href="/servicios/consultoria-creacion-empresas"
                titleField="service8Title"
                descriptionField="service8Description"
                isLoading={isLoading}
              />
            </div>
          </div>
        </AnimatedSection>
        
        {/* Why Choose Us Section */}
        <AnimatedSection id="por-que-escogernos" className="py-20 md:py-28 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">
                 <EditableText field="whyUsTitle" defaultText={content.whyUsTitle ?? defaultContent.whyUsTitle} isLoading={isLoading} />
              </h2>
              <div className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                 <EditableText field="whyUsSubhead" defaultText={content.whyUsSubhead ?? defaultContent.whyUsSubhead} isLoading={isLoading} multiline/>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-4"><Target className="h-10 w-10 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline text-white">
                  <EditableText field="whyUsFeature1Title" defaultText={content.whyUsFeature1Title ?? defaultContent.whyUsFeature1Title} isLoading={isLoading} />
                </h3>
                <div className="text-muted-foreground mt-2 text-sm">
                  <EditableText field="whyUsFeature1Desc" defaultText={content.whyUsFeature1Desc ?? defaultContent.whyUsFeature1Desc} isLoading={isLoading} multiline />
                </div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4"><Users className="h-10 w-10 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline text-white">
                  <EditableText field="whyUsFeature2Title" defaultText={content.whyUsFeature2Title ?? defaultContent.whyUsFeature2Title} isLoading={isLoading} />
                </h3>
                <div className="text-muted-foreground mt-2 text-sm">
                  <EditableText field="whyUsFeature2Desc" defaultText={content.whyUsFeature2Desc ?? defaultContent.whyUsFeature2Desc} isLoading={isLoading} multiline />
                </div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4"><Zap className="h-10 w-10 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline text-white">
                  <EditableText field="whyUsFeature3Title" defaultText={content.whyUsFeature3Title ?? defaultContent.whyUsFeature3Title} isLoading={isLoading} />
                </h3>
                <div className="text-muted-foreground mt-2 text-sm">
                  <EditableText field="whyUsFeature3Desc" defaultText={content.whyUsFeature3Desc ?? defaultContent.whyUsFeature3Desc} isLoading={isLoading} multiline />
                </div>
              </div>
            </div>
            <div className="text-center mt-16">
              <Button variant="outline" asChild>
                <Link href="/por-que-escogernos">
                   <EditableText field="whyUsCtaText" defaultText={content.whyUsCtaText ?? defaultContent.whyUsCtaText} isLoading={isLoading} />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Team Preview Section */}
        <AnimatedSection id="equipo" className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">
                <EditableText field="teamTitle" defaultText={content.teamTitle ?? defaultContent.teamTitle} isLoading={isLoading} />
              </h2>
              <div className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                 <EditableText field="teamSubhead" defaultText={content.teamSubhead ?? defaultContent.teamSubhead} isLoading={isLoading} multiline />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {mainTeamMembers.map((member) => (
                <div key={member.slug} className="flex flex-col items-center text-center">
                  <div className="relative w-48 h-48 mb-4">
                    <Image
                      src={member.imageUrl}
                      alt={`Retrato de ${member.name}`}
                      fill
                      className={cn(
                        "rounded-full object-cover border-4 border-primary/50",
                        (member as any).imagePosition || ''
                      )}
                      data-ai-hint={member.imageHint}
                    />
                  </div>
                  <h3 className="text-2xl font-bold font-headline text-white">{member.name}</h3>
                  <p className="text-primary font-medium">{member.title}</p>
                  <p className="text-muted-foreground mt-2 text-sm max-w-xs">{member.homeSummary}</p>
                  <Button variant="link" asChild className="mt-4 p-0 text-primary">
                    <Link href={`/quienes-somos/${member.slug}`}>Ver Perfil Completo &rarr;</Link>
                  </Button>
                </div>
              ))}
            </div>
            <div className="text-center mt-16">
              <Button variant="outline" asChild>
                <Link href="/quienes-somos">
                  <EditableText field="teamCtaText" defaultText={content.teamCtaText ?? defaultContent.teamCtaText} isLoading={isLoading} />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Office Preview Section */}
        <AnimatedSection id="oficinas" className="py-20 md:py-28 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                 <Building2 className="h-12 w-12 text-primary" />
                <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">
                  <EditableText field="officeTitle" defaultText={content.officeTitle ?? defaultContent.officeTitle} isLoading={isLoading} />
                </h2>
                <div className="text-muted-foreground text-lg">
                  <EditableText field="officeSubhead" defaultText={content.officeSubhead ?? defaultContent.officeSubhead} isLoading={isLoading} multiline />
                </div>
                <Button variant="outline" asChild>
                    <Link href="/nuestras-oficinas">
                      <EditableText field="officeCtaText" defaultText={content.officeCtaText ?? defaultContent.officeCtaText} isLoading={isLoading} />
                    </Link>
                </Button>
              </div>
              <OfficeCarousel />
            </div>
          </div>
        </AnimatedSection>

        {/* About Us Preview */}
        <AnimatedSection id="quienes-somos" className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
                <Landmark className="h-12 w-12 text-primary mx-auto mb-6" />
               <h2 className="text-4xl md:text-5xl font-bold font-headline text-white mb-4">
                <EditableText field="aboutTitle" defaultText={content.aboutTitle ?? defaultContent.aboutTitle} isLoading={isLoading} />
              </h2>
              <div className="text-gray-300 leading-relaxed mb-8 text-lg">
                <EditableText field="aboutSubhead" defaultText={content.aboutSubhead ?? defaultContent.aboutSubhead} isLoading={isLoading} multiline />
              </div>
              <Button variant="outline" asChild>
                <Link href="/quienes-somos">
                  <EditableText field="aboutCtaText" defaultText={content.aboutCtaText ?? defaultContent.aboutCtaText} isLoading={isLoading} />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Call to Action */}
        <AnimatedSection className="py-20 md:py-28 bg-black">
            <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold font-headline text-white">
                <EditableText field="contactUsTitle" defaultText={content.contactUsTitle ?? defaultContent.contactUsTitle} isLoading={isLoading} />
            </h2>
            <div className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                <EditableText field="contactUsSubhead" defaultText={content.contactUsSubhead ?? defaultContent.contactUsSubhead} isLoading={isLoading} multiline />
            </div>
            <div className="mt-8">
                <Button size="lg" asChild>
                <Link href="/contacto">
                  <EditableText field="contactUsCtaText" defaultText={content.contactUsCtaText ?? defaultContent.contactUsCtaText} isLoading={isLoading} />
                </Link>
                </Button>
            </div>
            </div>
        </AnimatedSection>
    </div>
  );
}

    
