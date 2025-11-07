'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, ShieldCheck, Briefcase, Landmark, FileText, Building, GitBranch, Anchor, Target, Users, Zap, Building2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import AnimatedSection from '@/components/animated-section';
import { teamMembers } from '@/lib/team';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

function ServiceCard({
  icon,
  title,
  description,
  href,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  className?: string;
}) {
  return (
    <Card className={cn("bg-card/50 text-card-foreground text-left flex flex-col shadow-lg hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300 border border-white/10", className)}>
      <CardHeader>
        {icon}
        <CardTitle className="pt-4 font-headline text-xl text-white">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="link" asChild className="p-0 text-primary">
          <Link href={href}>Saber Más &rarr;</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

const whyUsFeatures = [
  {
    icon: <Target className="h-10 w-10 text-primary" />,
    title: 'Soluciones enfocadas en tus resultados',
    description: 'Diseñamos cada estrategia legal no solo para resolver un problema, sino para que tu negocio obtenga un beneficio tangible y medible.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Un socio estratégico a tu lado',
    description: 'Nos involucramos para entender tu mercado, anticipar tus necesidades y comprometernos con tu crecimiento como un aliado que comparte tu visión.',
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: 'Experiencia que entiende tu negocio',
    description: 'Tu caso estará respaldado por un equipo que combina la solidez legal con una visión de negocios real, forjada en roles de alta dirección.',
  },
];

const officeImages = [
  { src: '/oficina1.png', alt: 'Recepción de nuestras oficinas', hint: 'modern office reception' },
  { src: '/oficina2.png', alt: 'Sala de juntas principal', hint: 'conference room meeting' },
  { src: '/oficina3.png', alt: 'Área de trabajo colaborativo', hint: 'collaborative workspace office' },
  { src: '/oficina4.png', alt: 'Oficina privada con vista', hint: 'private office city view' },
];


function OfficeCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg" ref={emblaRef}>
      <div className="flex h-full">
        {officeImages.map((img, index) => (
          <div className="relative flex-[0_0_100%] h-full" key={index}>
            <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                data-ai-hint={img.hint}
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

  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-background');
  
  const content = {
      heroHeadline: homePageData?.heroHeadline || "C+ Consultoría Legal",
      heroSubhead: homePageData?.heroSubhead || "Transformamos la complejidad legal en seguridad para su negocio. Brindamos asesoría integral y representación experta para que su empresa opere con total confianza.",
      heroPrimaryCtaText: homePageData?.heroPrimaryCtaText || "Agendar una Consulta",
      heroSecondaryCtaText: homePageData?.heroSecondaryCtaText || "Nuestros Servicios",
      servicesOverviewTitle: homePageData?.servicesOverviewTitle || "Nuestras Áreas de Práctica",
      service1Title: homePageData?.service1Title || "Asesoría y Consultoría",
      service1Description: homePageData?.service1Description || "Orientación estratégica para la resolución de problemas complejos y el diseño de proyectos empresariales a largo plazo.",
      service2Title: homePageData?.service2Title || "Representación y Defensa",
      service2Description: homePageData?.service2Description || "Defensa experta en negociaciones y litigios mercantiles, laborales y administrativos ante diversas instancias.",
      service3Title: homePageData?.service3Title || "Compliance",
      service3Description: homePageData?.service3Description || "Implementamos programas de cumplimiento para mitigar riesgos, asegurar el marco legal y proteger la reputación de su empresa.",
      contactUsTitle: homePageData?.contactUsTitle || "¿Listo para Fortalecer su Empresa?",
  }


  return (
    <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center min-h-[700px] text-center text-white bg-black">
          {heroImage && (
            <Image
              src={homePageData?.heroBackgroundImageUrl || heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover opacity-20"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="relative z-10 p-4 space-y-8 container mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight">
               {isLoading ? <Skeleton className="h-20 w-3/4 mx-auto" /> : content.heroHeadline}
            </h1>
            <div className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
               {isLoading ? <Skeleton className="h-12 w-full mx-auto" /> : content.heroSubhead}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
               <Button size="lg" asChild>
                <Link href="/contacto">
                   {isLoading ? <Skeleton className="h-6 w-36" /> : content.heroPrimaryCtaText}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/servicios">
                   {isLoading ? <Skeleton className="h-6 w-36" /> : content.heroSecondaryCtaText}
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
                {isLoading ? <Skeleton className="h-12 w-1/2 mx-auto" /> : content.servicesOverviewTitle}
              </h2>
               <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Ofrecemos asesoramiento y representación experta en las áreas cruciales del derecho corporativo para proteger y potenciar su negocio.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ServiceCard
                icon={<Briefcase className="h-10 w-10 text-primary" />}
                title={isLoading ? "Cargando..." : content.service1Title}
                description={isLoading ? "Cargando descripción..." : content.service1Description}
                href="/servicios/asesoria-consultoria-legal"
              />
              <ServiceCard
                icon={<Scale className="h-10 w-10 text-primary" />}
                title={isLoading ? "Cargando..." : content.service2Title}
                description={isLoading ? "Cargando descripción..." : content.service2Description}
                href="/servicios/representacion-defensa"
              />
              <ServiceCard
                icon={<ShieldCheck className="h-10 w-10 text-primary" />}
                title={isLoading ? "Cargando..." : content.service3Title}
                description={isLoading ? "Cargando descripción..." : content.service3Description}
                href="/servicios/compliance"
              />
              <ServiceCard
                icon={<Anchor className="h-10 w-10 text-primary" />}
                title="Comercio Internacional"
                description="Garantizamos que sus operaciones de importación y exportación se realicen de manera legal, eficiente y estratégica."
                 href="/servicios/comercio-internacional"
              />
               <ServiceCard
                icon={<GitBranch className="h-10 w-10 text-primary" />}
                title="MASC"
                description="Resolvemos disputas de forma más rápida, económica y confidencial a través de la mediación y el arbitraje."
                 href="/servicios/masc"
              />
               <ServiceCard
                icon={<FileText className="h-10 w-10 text-primary" />}
                title="Gestión y Trámites"
                description="Nos encargamos de la elaboración de contratos, constitución de sociedades y legalización de documentos."
                 href="/servicios/gestion-tramites"
              />
              <ServiceCard
                icon={<Building className="h-10 w-10 text-primary" />}
                title="Área Empresarial Específica"
                description="Ofrecemos una asesoría 360° en derecho corporativo, mercantil, laboral, fiscal y gestión administrativa."
                 href="/servicios/area-empresarial-especifica"
              />
               <ServiceCard
                icon={<Briefcase className="h-10 w-10 text-primary" />}
                title="Creación de Empresas"
                description="Asesoramiento proactivo para iniciar su negocio sobre cimientos sólidos, minimizando riesgos y maximizando oportunidades."
                href="/servicios/consultoria-creacion-empresas"
              />
            </div>
          </div>
        </AnimatedSection>
        
        {/* Why Choose Us Section */}
        <AnimatedSection id="por-que-escogernos" className="py-20 md:py-28 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">
                La Diferencia Estratégica
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                No solo somos abogados; somos socios de negocio. Descubra por qué nuestros clientes nos eligen.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {whyUsFeatures.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold font-headline text-white">{feature.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-16">
              <Button variant="outline" asChild>
                <Link href="/por-que-escogernos">Descubra más ventajas</Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Team Preview Section */}
        <AnimatedSection id="equipo" className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">
                Conozca a Nuestro Equipo
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                La experiencia y dedicación que su empresa merece. Conozca a los socios que lideran nuestra firma.
              </p>
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
                <Link href="/quienes-somos">Ver Todo el Equipo</Link>
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
                <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">Un Espacio a la Altura de sus Negocios</h2>
                <p className="text-muted-foreground text-lg">
                  Nuestras instalaciones están diseñadas para la excelencia, la confidencialidad y la colaboración estratégica. Le invitamos a conocer el entorno donde protegeremos sus intereses.
                </p>
                <Button variant="outline" asChild>
                    <Link href="/nuestras-oficinas">Recorrido Virtual</Link>
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
                Socios Estratégicos en Derecho Corporativo
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                Somos un equipo de abogados expertos, apasionados por ofrecer soluciones legales innovadoras y efectivas. Nuestra firma se funda sobre los pilares de la integridad, la excelencia y un compromiso inquebrantable con los objetivos de nuestros clientes, convirtiéndonos en sus socios estratégicos para el éxito.
              </p>
              <Button variant="outline" asChild>
                <Link href="/quienes-somos">Conozca Nuestra Firma</Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Call to Action */}
        <AnimatedSection className="py-20 md:py-28 bg-black">
            <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold font-headline text-white">
                {isLoading ? <Skeleton className="h-10 w-3/4 mx-auto" /> : content.contactUsTitle}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Los servicios legales no deberían ser un gasto, sino una inversión en tu éxito. Hablemos de cómo podemos generar valor para tu empresa.
            </p>
            <div className="mt-8">
                <Button size="lg" asChild>
                <Link href="/contacto">Agendar una Consulta Estratégica</Link>
                </Button>
            </div>
            </div>
        </AnimatedSection>
    </div>
  );
}
