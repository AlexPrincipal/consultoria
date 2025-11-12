'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, ShieldCheck, Scale, FileText, Building, GitBranch, Anchor } from 'lucide-react';
import { cn } from '@/lib/utils';
import Script from 'next/script';
import { getServiceSchema } from '@/lib/seo';

const services = [
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: "Asesoría y Consultoría Legal",
    description: "Orientación estratégica sobre derechos, responsabilidades y regulaciones para resolver problemas complejos y diseñar proyectos empresariales a largo plazo.",
    href: "/servicios/asesoria-consultoria-legal"
  },
  {
    icon: <Scale className="h-10 w-10 text-primary" />,
    title: "Representación y Defensa",
    description: "Representación experta en negociaciones, ante organismos públicos y en litigios mercantiles, laborales y administrativos para proteger sus intereses.",
    href: "/servicios/representacion-defensa"
  },
  {
    icon: <GitBranch className="h-10 w-10 text-primary" />,
    title: "Mecanismos Alternativos (MASC)",
    description: "Soluciones de conflictos a través de arbitraje y mediación, buscando una resolución más rápida, económica y confidencial fuera de los tribunales.",
    href: "/servicios/masc"
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "Gestión y Trámites",
    description: "Elaboración de contratos, constitución de sociedades, y gestión de trámites para asegurar la correcta legalización y operación de su empresa.",
    href: "/servicios/gestion-tramites"
  },
  {
    icon: <Building className="h-10 w-10 text-primary" />,
    title: "Área Empresarial Específica",
    description: "Asesoría especializada en derecho corporativo, mercantil, laboral y fiscal para cubrir todas las necesidades de su negocio.",
    href: "/servicios/area-empresarial-especifica"
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Cumplimiento Normativo (Compliance)",
    description: "Implementación de sistemas de gestión proactivos para prevenir, detectar y corregir riesgos de incumplimiento legal, regulatorio y ético.",
    href: "/servicios/compliance"
  },
  {
    icon: <Anchor className="h-10 w-10 text-primary" />,
    title: "Comercio Internacional y Aduanas",
    description: "Asesoría especializada en derecho aduanero para asegurar que sus operaciones de importación y exportación sean legales, eficientes y estratégicas.",
    href: "/servicios/comercio-internacional"
  }
];

export default function ServicesPage() {
  const serviceSchema = getServiceSchema('representacion-legal');

  return (
    <div className="bg-background">
      <Script id="service-schema-representacion-legal" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceSchema)}
      </Script>
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">Nuestros Servicios</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Brindamos soluciones legales integrales, diseñadas para proteger y fortalecer su empresa en cada etapa de su desarrollo. Explore nuestras áreas de especialización.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className={cn(
                "bg-card/50 text-card-foreground text-left flex flex-col shadow-lg hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300 border border-white/10"
              )}>
                <CardHeader>
                  {service.icon}
                  <CardTitle className="pt-6 font-headline text-xl text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
                <CardFooter>
                   <Button variant="link" asChild className="p-0 text-primary">
                    <Link href={service.href}>Conocer Más &rarr;</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}