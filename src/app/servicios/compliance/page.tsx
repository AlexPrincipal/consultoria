
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';

export default function CompliancePage() {
  return (
    <div className="bg-background text-white">
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ShieldCheck className="h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Cumplimiento Normativo (Compliance)</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Proteja la integridad, reputación y valor de su empresa. Diseñamos e implementamos sistemas de gestión proactivos para prevenir, detectar y corregir riesgos de incumplimiento, asegurando que su operación se ajuste al marco legal, regulatorio y ético.
              </p>
            </div>
            <div className="flex justify-center">
               <Card className="w-full max-w-md bg-card border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-center text-white">Blinde su operación</CardTitle>
                </CardHeader>
                <CardContent>
                 <ContactForm serviceContext="Compliance" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline text-center mb-12 text-white">Más que Cumplir la Ley: Es Gestión de Riesgo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Prevención de Responsabilidad Penal</h3>
              <p className="text-muted-foreground">Implementamos controles para mitigar la responsabilidad penal tanto del personal como de la persona moral, protegiendo a los directivos y a la propia empresa.</p>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Políticas y Procedimientos Clave</h3>
              <p className="text-muted-foreground">Diseñamos e implementamos códigos de conducta, políticas anticorrupción, manuales de prevención de lavado de dinero (PLD) y canales de denuncia seguros.</p>
            </Card>
             <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Supervisión y Auditoría Continua</h3>
              <p className="text-muted-foreground">Realizamos auditorías periódicas y supervisión constante para asegurar la efectividad de los controles internos y la adaptación a nuevas normativas.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
           <h2 className="text-3xl font-bold font-headline mb-4 text-white">El Cumplimiento como Ventaja Competitiva</h2>
           <p className="text-muted-foreground mb-8">Un programa de compliance robusto no es un gasto, es una inversión que abre puertas y genera confianza.</p>
          <div className="text-left mx-auto max-w-2xl bg-card/80 border border-white/10 p-8 rounded-lg">
                <blockquote className="text-lg italic text-white border-l-2 border-primary pl-4">
                  "La implementación del programa de compliance fue un diferenciador clave que nos abrió las puertas a licitaciones gubernamentales y clientes internacionales que antes eran inaccesibles. Su trabajo fue fundamental."
                </blockquote>
                <p className="text-right mt-4 text-primary font-semibold">- Director de Operaciones, Empresa de Construcción</p>
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
