
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';

export default function GestionTramitesPage() {
  return (
    <div className="bg-background text-white">
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <FileText className="h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Gestión y Trámites</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Nos encargamos de la elaboración de documentos clave y la gestión de trámites necesarios para la constitución, operación y legalización de su empresa, garantizando el cumplimiento y la seguridad jurídica.
              </p>
            </div>
            <div className="flex justify-center">
               <Card className="w-full max-w-md bg-card border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-center text-white">Inicie su trámite</CardTitle>
                </CardHeader>
                <CardContent>
                 <ContactForm serviceContext="Gestión y Trámites" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline text-center mb-12 text-white">Nuestros Servicios de Gestión</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Elaboración de Contratos</h3>
              <p className="text-muted-foreground">Redacción y revisión de todo tipo de contratos (comerciales, laborales, de arrendamiento, etc.).</p>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Constitución de Sociedades</h3>
              <p className="text-muted-foreground">Asesoría completa y gestión para la creación legal de su nueva empresa en México.</p>
            </Card>
             <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Dictámenes y Legalización</h3>
              <p className="text-muted-foreground">Emisión de dictámenes legales y gestión para la legalización de documentos y operaciones.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
           <h2 className="text-3xl font-bold font-headline mb-4 text-white">Casos de Éxito</h2>
            <p className="text-muted-foreground mb-8">
              Hemos ayudado a decenas de emprendedores y empresas a establecerse con éxito y seguridad.
            </p>
            <div className="text-left mx-auto max-w-2xl bg-card/80 border border-white/10 p-8 rounded-lg">
                <blockquote className="text-lg italic text-white border-l-2 border-primary pl-4">
                  "El proceso de constituir nuestra filial en México parecía abrumador. Su gestoría lo hizo sencillo, rápido y nos dio la confianza para operar desde el primer día."
                </blockquote>
                <p className="text-right mt-4 text-primary font-semibold">- Country Manager, Empresa de Software</p>
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
