import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    quote: "El equipo de CMXS Jurídico transformó nuestra forma de gestionar los riesgos legales. Su enfoque proactivo y su profundo conocimiento nos han dado una tranquilidad invaluable.",
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
];

export default function TestimonialsPage() {
  return (
    <div className="bg-background">
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">Casos de Éxito y Testimoniales</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              La confianza de nuestros clientes es nuestro mayor activo. Vea lo que dicen sobre su experiencia trabajando con CMXS Jurídico.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const logo = PlaceHolderImages.find((p) => p.id === testimonial.logoId);
              return (
                <Card key={index} className="bg-card/50 text-card-foreground flex flex-col shadow-lg border-white/10">
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <blockquote className="text-muted-foreground italic border-l-2 border-primary pl-4 flex-grow">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="mt-6 flex items-center gap-4">
                      {logo && (
                        <Image
                          src={logo.imageUrl}
                          alt={logo.description}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                          data-ai-hint={logo.imageHint}
                        />
                      )}
                      <div>
                        <p className="font-semibold text-white">{testimonial.client}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
