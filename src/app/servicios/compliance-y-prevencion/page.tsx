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
                 <ContactForm serviceContext="Compliance y Prevención" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">Nuestros Servicios de Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">Matrices de Riesgo</h3>
              <p className="text-muted-foreground">Identificamos y evaluamos los riesgos específicos de su industria y operación para priorizar acciones.</p>
            </Card>
            <Card className="bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">Políticas y Procedimientos</h3>
              <p className="text-muted-foreground">Diseñamos códigos de conducta, políticas anticorrupción y protocolos de prevención de lavado de dinero.</p>
            </Card>
            <Card className="bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">Capacitación y Auditoría</h3>
              <p className="text-muted-foreground">Formamos a su personal y realizamos auditorías periódicas para asegurar la efectividad del programa.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
           <h2 className="text-3xl font-bold font-headline mb-4">Beneficios de un Sólido Programa de Compliance</h2>
            <p className="text-muted-foreground mb-8">
              Invertir en cumplimiento normativo es invertir en la longevidad y el valor de su empresa.
            </p>
          <ul className="space-y-4 text-left mx-auto max-w-2xl">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
              <span><span className="font-semibold">Reducción de Sanciones:</span> Evite multas y sanciones por incumplimiento de normativas locales e internacionales.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
              <span><span className="font-semibold">Mejora de la Reputación:</span> Genere confianza entre clientes, inversores y socios comerciales.</span>
            </li>
             <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
              <span><span className="font-semibold">Ventaja Competitiva:</span> Acceda a nuevos mercados y oportunidades de negocio que exigen altos estándares de cumplimiento.</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
