import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';

export default function CompliancePage() {
  return (
    <div className="bg-black text-white">
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ShieldCheck className="h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Compliance y Prevención de Riesgos</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Proteja la integridad y reputación de su empresa. Desarrollamos e implementamos programas de cumplimiento normativo a la medida para blindar su operación contra riesgos legales y regulatorios.
              </p>
            </div>
            <div className="flex justify-center">
               <Card className="w-full max-w-md bg-card shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-center">Evalúe su riesgo actual</CardTitle>
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
          <h2 className="text-3xl font-bold font-headline text-center mb-12">¿Qué Ofrecemos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">Responsabilidad Penal</h3>
              <p className="text-muted-foreground">Asesoría para prevenir y gestionar la responsabilidad penal del personal y de la empresa.</p>
            </Card>
            <Card className="bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">Supervisión y Auditoría</h3>
              <p className="text-muted-foreground">Realizamos auditorías periódicas y supervisión continua para asegurar la efectividad de los controles internos.</p>
            </Card>
             <Card className="bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">Políticas y Procedimientos</h3>
              <p className="text-muted-foreground">Diseñamos códigos de conducta, políticas anticorrupción y protocolos de prevención de lavado de dinero.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
           <h2 className="text-3xl font-bold font-headline mb-4">Casos de Éxito</h2>
           <p className="text-muted-foreground mb-8">Un programa de compliance robusto es la mejor defensa.</p>
          <div className="text-left mx-auto max-w-2xl bg-card p-6 rounded-lg">
                <blockquote className="text-lg italic text-white border-l-2 border-primary pl-4">
                  "La implementación del programa de compliance con C+ Jurídica nos abrió las puertas a licitaciones gubernamentales que antes eran inaccesibles. Su trabajo fue fundamental."
                </blockquote>
                <p className="text-right mt-4 text-primary font-semibold">- Director de Operaciones, Empresa de Construcción</p>
            </div>
            <div className="mt-8">
                <Button asChild>
                    <Link href="/testimoniales">Más sobre nuestros clientes</Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
