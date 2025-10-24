
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';

export default function AsesoriaPage() {
  return (
    <div className="bg-background text-white">
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Briefcase className="h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Asesoría y Consultoría Legal</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Más allá del consejo legal, ofrecemos una visión estratégica. Le orientamos sobre sus derechos, responsabilidades y el complejo entorno regulatorio para transformar los desafíos en oportunidades y los proyectos a largo plazo en realidades exitosas.
              </p>
            </div>
            <div className="flex justify-center">
               <Card className="w-full max-w-md bg-card border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-center text-white">Inicie su consulta estratégica</CardTitle>
                </CardHeader>
                <CardContent>
                 <ContactForm serviceContext="Asesoría y Consultoría Legal" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline text-center mb-12 text-white">Nuestra Consultoría Estratégica</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Orientación Normativa Clara</h3>
              <p className="text-muted-foreground">Analizamos a fondo la legislación aplicable a su industria para que opere con certeza, minimizando riesgos y asegurando el cumplimiento en cada decisión.</p>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Diseño de Estrategias de Negocio</h3>
              <p className="text-muted-foreground">Le acompañamos en el diseño de proyectos empresariales, fusiones, adquisiciones y reestructuraciones, alineando la estructura legal con sus objetivos de crecimiento.</p>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Resolución de Problemas Complejos</h3>
              <p className="text-muted-foreground">Nos anticipamos a los conflictos. Brindamos asesoramiento para solucionar disputas complejas de manera eficiente, protegiendo sus relaciones comerciales y evitando litigios costosos.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
           <h2 className="text-3xl font-bold font-headline mb-4 text-white">Un Socio Estratégico, no solo un Abogado</h2>
            <p className="text-muted-foreground mb-8">
              Nuestra consultoría ha sido clave para el crecimiento y la seguridad jurídica de múltiples empresas.
            </p>
            <div className="text-left mx-auto max-w-2xl bg-card/80 border border-white/10 p-8 rounded-lg">
                <blockquote className="text-lg italic text-white border-l-2 border-primary pl-4">
                  "La asesoría estratégica que recibimos fue fundamental para nuestra expansión internacional. Nos ayudaron a navegar un entorno regulatorio complejo con total seguridad y visión de futuro."
                </blockquote>
                <p className="text-right mt-4 text-primary font-semibold">- CEO, Fintech en Expansión</p>
            </div>
             <div className="mt-8">
                <Button asChild variant="outline">
                    <Link href="/testimoniales">Ver más historias de éxito</Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
