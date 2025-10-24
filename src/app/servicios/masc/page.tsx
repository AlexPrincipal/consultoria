
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
                No todas las batallas deben librarse en un tribunal. Representamos a su empresa en procedimientos de arbitraje y mediación, buscando soluciones más rápidas, económicas y confidenciales para resolver disputas y preservar sus relaciones comerciales.
              </p>
            </div>
            <div className="flex justify-center">
               <Card className="w-full max-w-md bg-card border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-center text-white">Explore una alternativa al litigio</CardTitle>
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
          <h2 className="text-3xl font-bold font-headline text-center mb-12 text-white">Las Ventajas de una Solución Alternativa</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-card/50 p-6 border-white/10">
               <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold flex items-center gap-3"><CheckCircle className="h-6 w-6 text-primary"/> Rapidez y Eficiencia</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Resuelva conflictos complejos en una fracción del tiempo que tomaría un litigio judicial tradicional, permitiéndole a su negocio seguir adelante sin interrupciones prolongadas.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold flex items-center gap-3"><CheckCircle className="h-6 w-6 text-primary"/> Ahorro de Costos</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Reduzca significativamente los costos asociados a largos y desgastantes procesos judiciales. La mediación y el arbitraje son alternativas financieramente inteligentes.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold flex items-center gap-3"><CheckCircle className="h-6 w-6 text-primary"/> Confidencialidad Absoluta</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Los procedimientos son privados, lo que protege la reputación de su empresa, su información sensible y las relaciones comerciales que tanto le ha costado construir.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
           <h2 className="text-3xl font-bold font-headline mb-4 text-white">Preservando Relaciones, Logrando Acuerdos</h2>
            <p className="text-muted-foreground mb-8">
              Hemos logrado acuerdos beneficiosos para nuestros clientes, resolviendo disputas sin destruir valiosas alianzas comerciales.
            </p>
          <div className="text-left mx-auto max-w-2xl bg-card/80 border border-white/10 p-8 rounded-lg">
                <blockquote className="text-lg italic text-white border-l-2 border-primary pl-4">
                  "Una disputa contractual amenazaba una alianza estratégica de años. A través de la mediación que su equipo dirigió, no solo resolvimos el conflicto en semanas, sino que fortalecimos nuestra relación comercial. Fue la mejor decisión."
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
