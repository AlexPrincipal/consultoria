
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
                Aseguramos que su empresa cumpla con todas las leyes y regulaciones aplicables para evitar sanciones. Implementamos un sistema de gestión proactivo para prevenir, detectar y corregir riesgos, garantizando que sus actividades se ajusten al marco legal, regulatorio y ético.
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
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold flex items-center gap-3"><CheckCircle className="h-6 w-6 text-primary"/> Prevención de Responsabilidad Penal</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Implementamos controles para mitigar la responsabilidad penal tanto del personal como de la persona moral, protegiendo a los directivos y a la propia empresa.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold flex items-center gap-3"><CheckCircle className="h-6 w-6 text-primary"/> Políticas y Procedimientos Clave</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Diseñamos e implementamos códigos de conducta, políticas anticorrupción, manuales de prevención de lavado de dinero (PLD) y canales de denuncia seguros.</p>
              </CardContent>
            </Card>
             <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold flex items-center gap-3"><CheckCircle className="h-6 w-6 text-primary"/> Supervisión y Auditoría Continua</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Realizamos auditorías periódicas y supervisión constante para asegurar la efectividad de los controles internos y la adaptación a nuevas normativas.</p>
              </CardContent>
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
