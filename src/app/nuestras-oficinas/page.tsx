
import Image from 'next/image';
import AnimatedSection from '@/components/animated-section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const officeImages = [
  {
    src: '/oficina1.png',
    alt: 'Recepción de nuestras oficinas',
    hint: 'modern office reception',
  },
  {
    src: '/oficina2.png',
    alt: 'Sala de juntas principal',
    hint: 'conference room meeting',
  },
  {
    src: '/oficina3.png',
    alt: 'Área de trabajo colaborativo',
    hint: 'collaborative workspace office',
  },
  {
    src: '/oficina4.png',
    alt: 'Oficina privada con vista',
    hint: 'private office city view',
  },
];

export default function NuestrasOficinasPage() {
  return (
    <div className="bg-background text-white">
      {/* Hero */}
      <AnimatedSection className="py-20 md:py-28 text-center bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            Conozca Nuestras Oficinas
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Un espacio diseñado para la excelencia, la colaboración y la confidencialidad. Le invitamos a conocer el lugar donde creamos las estrategias que protegen y potencian su negocio.
          </p>
        </div>
      </AnimatedSection>

      {/* Gallery Section */}
      <AnimatedSection className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
           <Carousel className="w-full max-w-4xl mx-auto"
            opts={{
                loop: true,
            }}
           >
            <CarouselContent>
              {officeImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                     <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg group">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={image.hint}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-white font-semibold text-2xl font-headline">{image.alt}</h3>
                        </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-[-50px]" />
            <CarouselNext className="right-[-50px]" />
          </Carousel>
        </div>
      </AnimatedSection>
      
      {/* Address & CTA Section */}
      <AnimatedSection className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
            <h2 className="text-3xl font-bold font-headline mb-4 text-white">Visítenos</h2>
             <p className="text-muted-foreground mb-8 text-lg">
                Nuestras puertas están abiertas para usted. Agende una reunión y permítanos discutir cómo podemos colaborar en un entorno profesional y confortable.
             </p>
            <p className="text-primary font-semibold text-xl mb-8">Perif. Blvd. Manuel Ávila Camacho 1903, Cd. Satélite, 53100 Naucalpan de Juárez, Méx.</p>
            <div className="mt-8">
                <Button size="lg" asChild>
                    <Link href="/contacto">Agendar una Reunión</Link>
                </Button>
            </div>
        </div>
      </AnimatedSection>

    </div>
  );
}
