import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scale, ShieldCheck, Briefcase } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
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
          <Link href="#">Saber Más &rarr;</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-background');
  const testimonialLogo = PlaceHolderImages.find((p) => p.id === 'testimonial-logo');

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
              Su Defensa es Nuestra Única Prioridad.
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
              Estrategias legales sólidas para la tranquilidad de su empresa.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="w-full sm:w-auto">
                Iniciar Evaluación de Caso
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-black">
                Explorar Servicios
              </Button>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section id="servicios" className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center text-white mb-12">
              Nuestras Áreas de Práctica Centrales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ServiceCard
                icon={<Briefcase className="h-10 w-10 text-primary" />}
                title="Consultoría Corporativa"
                description="Asesoramiento estratégico para garantizar que su negocio opere con seguridad jurídica y eficiencia."
              />
              <ServiceCard
                icon={<ShieldCheck className="h-10 w-10 text-primary" />}
                title="Compliance y Prevención"
                description="Implementamos programas de cumplimiento normativo para mitigar riesgos y proteger la reputación de su empresa."
              />
              <ServiceCard
                icon={<Scale className="h-10 w-10 text-primary" />}
                title="Representación en Litigios"
                description="Defensa experta en disputas comerciales, civiles y administrativas ante tribunales y autoridades."
              />
            </div>
          </div>
        </section>
        
        {/* About Us Placeholder */}
        <section id="quienes-somos" className="py-20 md:py-28 bg-black">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-white mb-4">
                Quiénes Somos
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Somos un equipo de abogados expertos, apasionados por ofrecer soluciones legales innovadoras y efectivas. Nuestra firma se funda sobre los pilares de la integridad, la excelencia y un compromiso inquebrantable con los objetivos de nuestros clientes. (Más información próximamente).
              </p>
            </div>
          </div>
        </section>

        {/* Credibility Block */}
        <section id="testimoniales" className="py-20 md:py-28 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-3">
                <blockquote className="text-xl md:text-2xl italic text-white border-l-4 border-primary pl-6">
                  "El equipo de CMXS Jurídico transformó nuestra forma de gestionar los riesgos legales. Su enfoque proactivo y su profundo conocimiento nos han dado una tranquilidad invaluable."
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  {testimonialLogo && (
                    <Image
                      src={testimonialLogo.imageUrl}
                      alt={testimonialLogo.description}
                      width={120}
                      height={40}
                      className="object-contain"
                      data-ai-hint={testimonialLogo.imageHint}
                    />
                  )}
                  <div className="text-white">
                    <p className="font-semibold">Cliente Satisfecho</p>
                    <p className="text-sm text-gray-300">CEO, Empresa Ejemplo</p>
                  </div>
                </div>
              </div>
              <div id="contacto" className="md:col-span-2">
                <Card className="bg-background border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline text-white">Contáctenos Rápidamente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">Nombre</Label>
                        <Input id="name" placeholder="Su nombre completo" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                        <Input id="email" type="email" placeholder="su@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-300">Teléfono</Label>
                        <Input id="phone" type="tel" placeholder="Su número de teléfono" />
                      </div>
                      <Button type="submit" className="w-full !mt-6">
                        Enviar Consulta
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section Placeholder */}
        <section id="faq" className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-white mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Aquí encontrará respuestas a las dudas más comunes sobre nuestros servicios. (Contenido de FAQ próximamente).
            </p>
          </div>
        </section>
    </div>
  );
}
