import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scale, ShieldCheck, Briefcase } from 'lucide-react';

const services = [
  {
    icon: <Briefcase className="h-12 w-12 text-primary" />,
    title: "Consultoría Corporativa",
    description: "Asesoramiento estratégico para garantizar que su negocio opere con seguridad jurídica y eficiencia.",
    href: "/servicios/consultoria-corporativa"
  },
  {
    icon: <ShieldCheck className="h-12 w-12 text-primary" />,
    title: "Compliance y Prevención",
    description: "Implementamos programas de cumplimiento normativo para mitigar riesgos y proteger la reputación de su empresa.",
    href: "/servicios/compliance-y-prevencion"
  },
  {
    icon: <Scale className="h-12 w-12 text-primary" />,
    title: "Representación en Litigios",
    description: "Defensa experta en disputas comerciales, civiles y administrativas ante tribunales y autoridades.",
    href: "/servicios/representacion-en-litigios"
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
