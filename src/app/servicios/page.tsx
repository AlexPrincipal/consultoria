import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scale, ShieldCheck, Briefcase } from 'lucide-react';

const services = [
  {
    icon: <Briefcase className="h-12 w-12 text-primary" />,
    title: "Consultoría para Creación de Empresas",
    description: "Le guiamos paso a paso en la constitución de su empresa, asegurando una estructura legal sólida desde el inicio.",
    href: "/servicios/consultoria-creacion-empresas"
  },
  {
    icon: <ShieldCheck className="h-12 w-12 text-primary" />,
    title: "Compliance",
    description: "Implementamos programas de cumplimiento normativo para mitigar riesgos y proteger la reputación de su empresa.",
    href: "/servicios/compliance"
  },
  {
    icon: <Scale className="h-12 w-12 text-primary" />,
    title: "Representación Legal de Empresas",
    description: "Defensa experta en disputas laborales y controversias generales ante diversas instancias.",
    href: "/servicios/representacion-legal"
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-background">
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
              <Card key={service.title} className="bg-card text-card-foreground text-center flex flex-col items-center shadow-lg hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300">
                <CardHeader className="items-center pt-8">
                  {service.icon}
                  <CardTitle className="pt-6 font-headline text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
                <CardFooter className="pb-8">
                  <Button asChild>
                    <Link href={service.href}>Conocer Más</Link>
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
