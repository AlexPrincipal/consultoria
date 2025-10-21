
'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Autoplay from "embla-carousel-autoplay"

const testimonials = [
  {
    quote: "El equipo de C+ Consultoría Jurídica transformó nuestra forma de gestionar los riesgos legales. Su enfoque proactivo y su profundo conocimiento nos han dado una tranquilidad invaluable.",
    client: "Cliente Satisfecho",
    company: "CEO, Empresa Ejemplo",
    logoId: "testimonial-logo",
  },
  {
    quote: "Su asesoría en la reestructuración corporativa fue impecable. Nos guiaron en cada paso con una claridad y profesionalismo excepcionales. Altamente recomendados.",
    client: "Director General",
    company: "Startup Tecnológica",
    logoId: "testimonial-logo-2",
  },
  {
    quote: "Enfrentamos un litigio complejo y su representación fue clave para obtener un resultado favorable. Su estrategia y dedicación marcaron la diferencia.",
    client: "Gerente Legal",
    company: "Constructora Nacional",
    logoId: "testimonial-logo-3",
  },
  {
    quote: "Gracias a su programa de Compliance, pudimos acceder a nuevos mercados internacionales que requerían altos estándares de cumplimiento. Un socio estratégico sin duda.",
    client: "Directora de Expansión",
    company: "Fintech Innovadora",
    logoId: "testimonial-logo-4",
  },
  {
    quote: "La constitución de nuestra empresa en México fue un proceso rápido y sin contratiempos gracias a su gestoría experta. Un servicio de primera clase.",
    client: "Country Manager",
    company: "Filial Multinacional",
    logoId: "testimonial-logo-5",
  },
];

export default function TestimonialsCarousel() {
  return (
    <Carousel 
      className="w-full max-w-4xl mx-auto"
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: true,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => {
          const logo = PlaceHolderImages.find((p) => p.id === testimonial.logoId);
          return (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <Card className="bg-card/50 text-card-foreground flex flex-col shadow-lg border-white/10 h-full">
                  <CardContent className="p-6 flex-grow flex flex-col justify-between">
                    <blockquote className="text-muted-foreground italic border-l-2 border-primary pl-4 text-left">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="mt-6 flex items-center gap-4">
                      {logo && (
                        <Image
                          src={logo.imageUrl}
                          alt={logo.description}
                          width={48}
                          height={48}
                          className="rounded-full object-cover w-12 h-12"
                          data-ai-hint={logo.imageHint}
                        />
                      )}
                      <div className="text-left">
                        <p className="font-semibold text-white">{testimonial.client}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}
