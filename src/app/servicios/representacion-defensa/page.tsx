
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';

export default function RepresentacionDefensaPage() {
  return (
    <div className="bg-background text-white">
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Scale className="h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Representación y Defensa</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Actuamos en nombre de su empresa en negociaciones, ante organismos públicos y en procedimientos judiciales para salvaguardar sus intereses con una defensa sólida y estratégica.
              </p>
            </div>
            <div className="flex justify-center">
               <Card className="w-full max-w-md bg-card border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-center text-white">Evalúe su caso</CardTitle>
                </CardHeader>
                <CardContent>
                 <ContactForm serviceContext="Representación y Defensa" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline text-center mb-12 text-white">Áreas de Representación</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Negociaciones</h3>
              <p className="text-muted-foreground">Representación en contratos complejos, alianzas, fusiones y adquisiciones (M&A).</p>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Organismos Públicos</h3>
              <p className="text-muted-foreground">Gestión de trámites ante autoridades administrativas, registros y reguladores.</p>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Formalización</h3>
              <p className="text-muted-foreground">Firma de documentos y contratos, asegurando el cumplimiento del marco legal y estatutario.</p>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Defensa Corporativa</h3>
              <p className="text-muted-foreground">Representación en litigios mercantiles, laborales y administrativo/fiscales.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
           <h2 className="text-3xl font-bold font-headline mb-4 text-white">Casos de Éxito</h2>
            <p className="text-muted-foreground mb-8">
              Nuestra estrategia combina un profundo análisis jurídico con una ejecución procesal impecable.
            </p>
          <div className="text-left mx-auto max-w-2xl bg-card/80 border border-white/10 p-8 rounded-lg">
                <blockquote className="text-lg italic text-white border-l-2 border-primary pl-4">
                  "Enfrentamos un litigio complejo que ponía en riesgo la operación. Su representación fue clave para obtener un resultado favorable y justo, protegiendo el futuro de la compañía."
                </blockquote>
                <p className="text-right mt-4 text-primary font-semibold">- Gerente Legal, Empresa Manufacturera</p>
            </div>
            <div className="mt-8">
                <Button asChild variant="outline">
                    <Link href="/testimoniales">Conozca más resultados</Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
