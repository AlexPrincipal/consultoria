
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ComercioInternacionalPage() {
    const serviceImage = PlaceHolderImages.find((p) => p.id === 'servicio-comercio');

  return (
    <div className="bg-background text-white">
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Asesoría en Comercio Internacional y Aduanas</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Convierta las fronteras en oportunidades. Nuestro servicio especializado en Derecho Aduanero y Comercio Internacional garantiza que sus operaciones de importación y exportación se realicen de manera legal, eficiente y estratégica, actuando como su garante de cumplimiento en la frontera.
              </p>
                {serviceImage && (
                <div className="relative aspect-video rounded-lg overflow-hidden mt-6">
                    <Image
                    src={serviceImage.imageUrl}
                    alt={serviceImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={serviceImage.imageHint}
                    />
                </div>
                )}
            </div>
            <div className="flex justify-center">
               <Card className="w-full max-w-md bg-card border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-center text-white">Optimice sus operaciones globales</CardTitle>
                </CardHeader>
                <CardContent>
                 <ContactForm serviceContext="Comercio Internacional y Aduanas" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline text-center mb-12 text-white">Navegando el Comercio Global con Certeza</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold flex items-center gap-3"><CheckCircle className="h-6 w-6 text-primary"/> Cumplimiento Aduanero Estratégico</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Aseguramos que cada operación cumpla con la compleja legislación aduanera vigente, evitando costosas multas, demoras y sanciones.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold flex items-center gap-3"><CheckCircle className="h-6 w-6 text-primary"/> Optimización de la Cadena de Suministro</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Diseñamos estrategias para optimizar aranceles, aprovechar tratados de libre comercio (T-MEC y otros) y mejorar la eficiencia de su cadena logística global.</p>
              </CardContent>
            </Card>
             <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold flex items-center gap-3"><CheckCircle className="h-6 w-6 text-primary"/> Defensa y Litigio Aduanero</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Le representamos y defendemos ante autoridades aduaneras, y en litigios derivados de procedimientos como el PAMA (Procedimiento Administrativo en Materia Aduanera).</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
           <h2 className="text-3xl font-bold font-headline mb-4 text-white">Abriendo Fronteras para su Negocio</h2>
           <p className="text-muted-foreground mb-8">Nuestra asesoría convierte los desafíos del comercio internacional en ventajas competitivas.</p>
          <div className="text-left mx-auto max-w-2xl bg-card/80 border border-white/10 p-8 rounded-lg">
                <blockquote className="text-lg italic text-white border-l-2 border-primary pl-4">
                  "Su profundo expertise en derecho aduanero fue crucial para liberar una retención de mercancía que amenazaba con parar nuestra línea de producción. Actuaron con una rapidez y una eficacia que nos salvó de pérdidas millonarias."
                </blockquote>
                <p className="text-right mt-4 text-primary font-semibold">- Gerente de Logística, Empresa Automotriz</p>            </div>
            <div className="mt-8">
                <Button asChild variant="outline">
                    <Link href="/testimoniales">Más sobre nuestros clientes</Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
