import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, ShieldCheck, Briefcase } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function ServiceCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Card className="bg-card text-card-foreground text-center flex flex-col items-center shadow-lg hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300">
      <CardHeader className="items-center">
        {icon}
        <CardTitle className="pt-4 font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="link" asChild>
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
        <section className="relative flex items-center justify-center min-h-[600px] text-center text-white bg-black">
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
          <div className="relative z-10 p-4 space-y-6 container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
              Promesa de Valor: Su Socio Legal Estratégico
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
              En C+ Consultoría Jurídica, transformamos la complejidad legal en tranquilidad para su empresa. Ofrecemos estrategias sólidas y un acompañamiento integral para que usted se enfoque en lo que mejor sabe hacer: hacer crecer su negocio.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
               <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/contacto">Iniciar Evaluación de Caso</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-black" asChild>
                <Link href="/servicios">Explorar Servicios</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section id="servicios" className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-white">
                Nuestras Áreas de Práctica Centrales
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Ofrecemos asesoramiento y representación experta en las áreas cruciales del derecho corporativo para proteger y potenciar su negocio.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ServiceCard
                icon={<Briefcase className="h-10 w-10 text-primary" />}
                title="Consultoría para Creación de Empresas"
                description="Le guiamos paso a paso en la constitución de su empresa, asegurando una estructura legal sólida desde el inicio."
                href="/servicios/consultoria-creacion-empresas"
              />
              <ServiceCard
                icon={<ShieldCheck className="h-10 w-10 text-primary" />}
                title="Compliance"
                description="Implementamos programas de cumplimiento normativo para mitigar riesgos y proteger la reputación de su empresa."
                 href="/servicios/compliance"
              />
              <ServiceCard
                icon={<Scale className="h-10 w-10 text-primary" />}
                title="Representación Legal de Empresas"
                description="Defensa experta en disputas laborales y controversias generales ante diversas instancias."
                 href="/servicios/representacion-legal"
              />
            </div>
            <div className="text-center mt-12">
              <Button asChild>
                <Link href="/servicios">Ver Todos los Servicios</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* About Us Preview */}
        <section id="quienes-somos" className="py-20 md:py-28 bg-black">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
               <h2 className="text-3xl md:text-4xl font-bold font-headline text-white mb-4">
                ¿Quién es C+ Consultoría Jurídica?
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                Somos un equipo de abogados expertos, apasionados por ofrecer soluciones legales innovadoras y efectivas. Nuestra firma se funda sobre los pilares de la integridad, la excelencia y un compromiso inquebrantable con los objetivos de nuestros clientes, convirtiéndonos en sus socios estratégicos para el éxito.
              </p>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black" asChild>
                <Link href="/quienes-somos">Conozca Nuestra Firma</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonial Preview */}
        <section id="testimoniales" className="py-20 md:py-28 bg-secondary">
          <div className="container mx-auto px-4 md:px-6 text-center">
             <h2 className="text-3xl md:text-4xl font-bold font-headline text-white mb-12">
              La Confianza de Nuestros Clientes
            </h2>
            <div className="max-w-3xl mx-auto">
                <blockquote className="text-xl md:text-2xl italic text-white border-l-4 border-primary pl-6 text-left">
                  "El equipo de C+ Jurídico transformó nuestra forma de gestionar los riesgos legales. Su enfoque proactivo y su profundo conocimiento nos han dado una tranquilidad invaluable."
                </blockquote>
                <div className="mt-6 flex items-center justify-start gap-4">
                  <p className="text-white">
                    <span className="font-semibold">Cliente Satisfecho</span>, <span className="text-sm text-gray-300">CEO, Empresa Ejemplo</span>
                  </p>
                </div>
                 <div className="mt-12">
                    <Button asChild>
                        <Link href="/testimoniales">Ver más casos de éxito</Link>
                    </Button>
                </div>
            </div>
          </div>
        </section>
    </div>
  );
}
