
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Briefcase } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';

export default function CreacionEmpresasPage() {
  return (
    <div className="bg-background text-white">
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Briefcase className="h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Consultoría para la Creación de Empresas</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Inicie su negocio sobre cimientos sólidos. Nuestro asesoramiento proactivo le permite tomar decisiones informadas, minimizar riesgos y maximizar oportunidades desde el día uno, garantizando una estructura legal robusta para un crecimiento seguro.
              </p>
            </div>
            <div className="flex justify-center">
               <Card className="w-full max-w-md bg-card border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-center text-white">Construya su empresa con expertos</CardTitle>
                </CardHeader>
                <CardContent>
                 <ContactForm serviceContext="Creación de Empresas" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline text-center mb-12 text-white">De la Idea a la Operación, sin Fisuras</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Constitución y Trámites</h3>
              <p className="text-muted-foreground">Nos encargamos de la gestión completa de los trámites y requisitos para la constitución legal de su sociedad en México, asegurando un proceso ágil y sin errores.</p>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Estructura Societaria a la Medida</h3>
              <p className="text-muted-foreground">Diseñamos la estructura corporativa (S.A., S.A.S., S. de R.L., etc.) óptima para sus metas de negocio, protegiendo sus intereses y facilitando el gobierno corporativo futuro.</p>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Asesoría para Inversión Extranjera</h3>
              <p className="text-muted-foreground">Ofrecemos asesoría especializada para la apertura de filiales en México, incluyendo trámites migratorios ante el INM para su personal extranjero (Constancia de Empleador).</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <h2 className="text-3xl font-bold font-headline mb-4 text-white">¿Listo para Fortalecer su Empresa?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nuestro equipo está preparado para ofrecerle la asesoría estratégica que su negocio necesita. Contáctenos hoy para una evaluación de su caso.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/contacto">Agendar una Consulta</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
