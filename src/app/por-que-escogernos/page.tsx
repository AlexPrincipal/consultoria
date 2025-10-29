
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Target, Users, Zap } from 'lucide-react';
import AnimatedSection from '@/components/animated-section';

const features = [
  {
    icon: <Target className="h-12 w-12 text-primary" />,
    title: 'Enfoque en Resultados, no en Procesos',
    description: 'No medimos nuestro valor en horas, sino en resultados tangibles. Cada estrategia y acción legal está diseñada para impactar positivamente en sus objetivos de negocio, optimizando su retorno de inversión en servicios legales.',
    imageId: 'why-us-strategy',
  },
  {
    icon: <Users className="h-12 w-12 text-primary" />,
    title: 'Socios Estratégicos, no solo Proveedores',
    description: 'Nos integramos en su visión. Vamos más allá de la simple asesoría para convertirnos en socios que entienden su mercado, anticipan sus necesidades y se comprometen con su crecimiento a largo plazo.',
    imageId: 'why-us-commitment',
  },
  {
    icon: <Zap className="h-12 w-12 text-primary" />,
    title: 'Experiencia Ejecutiva, no solo Académica',
    description: 'Nuestro equipo combina una profunda experiencia legal con una visión empresarial forjada en roles de alta dirección. Hablamos su idioma, entendemos la presión del negocio y ofrecemos soluciones que son legalmente sólidas y comercialmente viables.',
    imageId: 'why-us-experience',
  },
];

export default function WhyUsPage() {
  return (
    <div className="bg-background text-white">
      {/* Hero */}
      <AnimatedSection className="py-20 md:py-28 text-center bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            ¿Por Qué Elegirnos?
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            En un entorno de negocios complejo, necesita más que un abogado. Necesita un socio estratégico que proteja su presente y potencie su futuro. Descubra nuestro enfoque diferencial.
          </p>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-20">
            {features.map((feature, index) => {
              const image = PlaceHolderImages.find((p) => p.id === feature.imageId);
              const isEven = index % 2 === 0;
              return (
                <div key={feature.title} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className={`space-y-4 ${isEven ? 'md:order-last' : ''}`}>
                    <div className="flex items-center gap-4">
                      {feature.icon}
                      <h2 className="text-3xl font-bold font-headline text-primary">{feature.title}</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">{feature.description}</p>
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

      {/* Testimonial Quote */}
      <AnimatedSection className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
            <h2 className="text-3xl font-bold font-headline mb-4 text-white">Nuestra Promesa: Valor Estratégico</h2>
             <div className="text-left mx-auto max-w-3xl bg-card/80 border border-white/10 p-8 rounded-lg">
                <blockquote className="text-xl italic text-white border-l-4 border-primary pl-6">
                  "Finalmente encontramos un despacho que no solo entiende las leyes, sino que entiende nuestro negocio. Su asesoría va más allá del cumplimiento; nos han ayudado a tomar decisiones más inteligentes y rentables. Son una extensión de nuestro equipo directivo."
                </blockquote>
                <p className="text-right mt-6 text-primary font-semibold">- CEO, Empresa de Tecnología en Crecimiento</p>
            </div>
        </div>
      </AnimatedSection>


      {/* Call to Action */}
      <AnimatedSection className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold font-headline text-white">¿Listo para una Verdadera Asociación Legal?</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Deje de ver los servicios legales como un gasto. Con nosotros, son una inversión en su éxito. Hablemos de cómo podemos generar valor para su empresa.
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
