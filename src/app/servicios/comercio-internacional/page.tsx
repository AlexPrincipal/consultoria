
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Anchor, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';

export default function ComercioInternacionalPage() {
  return (
    <div className="bg-background text-white">
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Anchor className="h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Asesoría en Comercio Internacional y Aduanas</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Garantizamos que sus operaciones de importación y exportación se realicen de manera legal, eficiente y estratégica. Actuamos como su garante de cumplimiento normativo en la frontera.
              </p>
            </div>
            <div className="flex justify-center">
               <Card className="w-full max-w-md bg-card border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-center text-white">Optimice sus operaciones</CardTitle>
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
          <h2 className="text-3xl font-bold font-headline text-center mb-12 text-white">¿Qué Ofrecemos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Cumplimiento Aduanero</h3>
              <p className="text-muted-foreground">Asesoría para asegurar que todas sus operaciones cumplan con la legislación aduanera vigente.</p>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Estrategia de Comercio</h3>
              <p className="text-muted-foreground">Diseño de estrategias para optimizar aranceles, aprovechar tratados de libre comercio y mejorar la eficiencia logística.</p>
            </Card>
             <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Defensa y Litigio</h3>
              <p className="text-muted-foreground">Representación ante autoridades aduaneras y en litigios relacionados con comercio internacional.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
           <h2 className="text-3xl font-bold font-headline mb-4 text-white">Casos de Éxito</h2>
           <p className="text-muted-foreground mb-8">Nuestra asesoría abre fronteras y optimiza la cadena de suministro.</p>
          <div className="text-left mx-auto max-w-2xl bg-card/80 border border-white/10 p-8 rounded-lg">
                <blockquote className="text-lg italic text-white border-l-2 border-primary pl-4">
                  "Su expertise en derecho aduanero fue crucial para resolver una retención de mercancía que amenazaba nuestra producción. Actuaron rápido y con eficacia."
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
