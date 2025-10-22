
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, ShieldCheck, Briefcase, Landmark } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import TestimonialsCarousel from '@/components/testimonials-carousel';
import AnimatedSection from '@/components/animated-section';

function ServiceCard({
  icon,
  title,
  description,
  href,
  className
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
        <CardTitle className="pt-4 font-headline text-xl text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="link" asChild className="p-0 text-primary">
          <Link href={href}>Saber Más &rarr;</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-background');

  return (
    <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center min-h-[700px] text-center text-white bg-black">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover opacity-20"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="relative z-10 p-4 space-y-8 container mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight">
              C+ Consultoría Legal
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
              Transformamos la complejidad legal en seguridad para su negocio. Brindamos asesoría integral y representación experta para que su empresa opere con total confianza.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
               <Button size="lg" asChild>
                <Link href="/contacto">Agendar una Consulta</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/servicios">Nuestros Servicios</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <AnimatedSection id="servicios" className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">
                Nuestras Áreas de Práctica
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Ofrecemos asesoramiento y representación experta en las áreas cruciales del derecho corporativo para proteger y potenciar su negocio.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ServiceCard
                icon={<Briefcase className="h-10 w-10 text-primary" />}
                title="Consultoría Para La Creación De Empresas"
                description="Le guiamos paso a paso en la constitución de su empresa, asegurando una estructura legal sólida desde el inicio."
                href="/servicios/consultoria-creacion-empresas"
              />
              <ServiceCard
                icon={<ShieldCheck className="h-10 w-10 text-primary" />}
                title="Compliance"
                description="Implementamos programas de cumplimiento normativo para mitigar riesgos y proteger la reputación de su empresa."
                 href="/servicios/compliance"
                 className="animation-delay-200"
              />
              <ServiceCard
                icon={<Scale className="h-10 w-10 text-primary" />}
                title="Representación Legal De Empresas"
                description="Defensa experta en disputas laborales y controversias generales ante diversas instancias."
                 href="/servicios/representacion-legal"
                 className="animation-delay-400"
              />
            </div>
          </div>
        </AnimatedSection>
        
        {/* About Us Preview */}
        <AnimatedSection id="quienes-somos" className="py-20 md:py-28 bg-black">
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

        {/* Testimonials */}
        <AnimatedSection id="testimoniales" className="py-20 md:py-28 bg-secondary">
           <div className="container mx-auto px-4 md:px-6 text-center">
             <h2 className="text-4xl md:text-5xl font-bold font-headline text-white mb-16">
              La Confianza de Nuestros Clientes
            </h2>
            <div className="max-w-5xl mx-auto">
              <TestimonialsCarousel />
            </div>
          </div>
        </AnimatedSection>
    </div>
  );
}
