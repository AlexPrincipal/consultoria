import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Scale } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';

export default function RepresentacionLegalPage() {
  return (
    <div className="bg-black text-white">
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Scale className="h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Representación Legal de Empresas</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Cuando surgen disputas, necesita una defensa estratégica y firme. Nuestro equipo de litigantes expertos le representa ante tribunales y autoridades para proteger sus intereses y resolver conflictos de manera eficaz.
              </p>
            </div>
            <div className="flex justify-center">
               <Card className="w-full max-w-md bg-card shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-center">Evalúe su caso</CardTitle>
                </CardHeader>
                <CardContent>
                 <ContactForm serviceContext="Representación Legal" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">¿Qué Ofrecemos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">Controversias Laborales</h3>
              <p className="text-muted-foreground">Defensa y representación en juicios laborales, tanto individuales como colectivos, y ante sindicatos.</p>
            </Card>
            <Card className="bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">Representación Legal General</h3>
              <p className="text-muted-foreground">Manejo de disputas contractuales, responsabilidad civil y conflictos entre accionistas.</p>
            </Card>
            <Card className="bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">Litigio Regional y Nacional</h3>
              <p className="text-muted-foreground">Capacidad para gestionar controversias en su región de operación o en cualquier parte del país.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
           <h2 className="text-3xl font-bold font-headline mb-4">Casos de Éxito</h2>
            <p className="text-muted-foreground mb-8">
              Nuestra estrategia combina un profundo análisis jurídico con una ejecución procesal impecable.
            </p>
          <div className="text-left mx-auto max-w-2xl bg-card p-6 rounded-lg">
                <blockquote className="text-lg italic text-white border-l-2 border-primary pl-4">
                  "Enfrentamos un litigio laboral complejo que ponía en riesgo la operación. Su representación fue clave para obtener un resultado favorable y justo."
                </blockquote>
                <p className="text-right mt-4 text-primary font-semibold">- Gerente de RH, Empresa Manufacturera</p>
            </div>
            <div className="mt-8">
                <Button asChild>
                    <Link href="/testimoniales">Conozca más resultados</Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
