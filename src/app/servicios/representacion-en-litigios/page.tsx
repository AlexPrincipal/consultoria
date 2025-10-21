import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Scale } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';

export default function LitigiosPage() {
  return (
    <div className="bg-black text-white">
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Scale className="h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Representación en Litigios y Controversias</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Cuando surgen disputas, necesita una defensa estratégica y firme. Nuestro equipo de litigantes expertos le representa ante tribunales y autoridades administrativas para proteger sus intereses y resolver conflictos de manera eficaz.
              </p>
            </div>
            <div className="flex justify-center">
               <Card className="w-full max-w-md bg-card shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-center">Evalúe su caso</CardTitle>
                </CardHeader>
                <CardContent>
                 <ContactForm serviceContext="Representación en Litigios" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">Tipos de Litigio que Manejamos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">Litigio Civil y Mercantil</h3>
              <p className="text-muted-foreground">Disputas contractuales, responsabilidad civil, conflictos entre accionistas y recuperación de cartera.</p>
            </Card>
            <Card className="bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">Litigio Administrativo y Fiscal</h3>
              <p className="text-muted-foreground">Defensa contra actos de autoridad, créditos fiscales, clausuras y procedimientos de licitación.</p>
            </Card>
            <Card className="bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">Amparo</h3>
              <p className="text-muted-foreground">Protección de sus derechos fundamentales contra leyes o actos de autoridad que vulneren la Constitución.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
           <h2 className="text-3xl font-bold font-headline mb-4">Nuestra Estrategia de Litigio</h2>
            <p className="text-muted-foreground mb-8">
              Combinamos un profundo análisis jurídico con una ejecución procesal impecable para maximizar sus probabilidades de éxito.
            </p>
          <ul className="space-y-4 text-left mx-auto max-w-2xl">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
              <span><span className="font-semibold">Análisis de Viabilidad:</span> Evaluamos honestamente las fortalezas y debilidades de su caso desde el inicio.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
              <span><span className="font-semibold">Soluciones Alternativas:</span> Exploramos la mediación y el arbitraje para una resolución más rápida y menos costosa cuando es posible.</span>
            </li>
             <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
              <span><span className="font-semibold">Defensa Rigurosa:</span> Preparamos y presentamos argumentos sólidos, respaldados por evidencia contundente, en todas las instancias del proceso.</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
