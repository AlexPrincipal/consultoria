
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';

export default function MascPage() {
  return (
    <div className="bg-background text-white">
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <GitBranch className="h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Mecanismos Alternativos de Solución de Conflictos (MASC)</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Representamos a su empresa en procedimientos de arbitraje y mediación, buscando soluciones más rápidas, económicas y confidenciales para resolver disputas fuera de los tribunales tradicionales.
              </p>
            </div>
            <div className="flex justify-center">
               <Card className="w-full max-w-md bg-card border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-center text-white">Explore una alternativa</CardTitle>
                </CardHeader>
                <CardContent>
                 <ContactForm serviceContext="MASC" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline text-center mb-12 text-white">Ventajas de los MASC</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Rapidez y Eficiencia</h3>
              <p className="text-muted-foreground">Resolución de conflictos en una fracción del tiempo que tomaría un litigio judicial.</p>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Ahorro de Costos</h3>
              <p className="text-muted-foreground">Reducción significativa de los costos asociados a largos procesos judiciales.</p>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Confidencialidad</h3>
              <p className="text-muted-foreground">Los procedimientos son privados, protegiendo la reputación y la información sensible de su empresa.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
           <h2 className="text-3xl font-bold font-headline mb-4 text-white">Casos de Éxito</h2>
            <p className="text-muted-foreground mb-8">
              Logramos acuerdos beneficiosos preservando las relaciones comerciales de nuestros clientes.
            </p>
          <div className="text-left mx-auto max-w-2xl bg-card/80 border border-white/10 p-8 rounded-lg">
                <blockquote className="text-lg italic text-white border-l-2 border-primary pl-4">
                  "Una disputa contractual amenazaba una alianza estratégica. A través de la mediación, no solo resolvimos el conflicto en semanas, sino que fortalecimos nuestra relación comercial. Fue la mejor decisión."
                </blockquote>
                <p className="text-right mt-4 text-primary font-semibold">- Director de Operaciones, Empresa de Logística</p>
            </div>
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
