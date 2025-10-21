import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Briefcase } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';

export default function ConsultoriaPage() {
  return (
    <div className="bg-black text-white">
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Briefcase className="h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Consultoría Corporativa Estratégica</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Fortalecemos la estructura legal de su empresa para un crecimiento seguro y sostenible. Nuestro asesoramiento proactivo le permite tomar decisiones informadas, minimizar riesgos y maximizar oportunidades.
              </p>
            </div>
            <div className="flex justify-center">
               <Card className="w-full max-w-md bg-card shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-center">Inicie su consulta</CardTitle>
                </CardHeader>
                <CardContent>
                 <ContactForm serviceContext="Consultoría Corporativa" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">Áreas Clave de Asesoramiento</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">Estructuración Societaria</h3>
              <p className="text-muted-foreground">Desde la constitución hasta fusiones y adquisiciones, diseñamos la estructura corporativa óptima para sus metas.</p>
            </Card>
            <Card className="bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">Contratos y Acuerdos</h3>
              <p className="text-muted-foreground">Redacción y negociación de contratos comerciales, laborales y de propiedad intelectual que protegen sus intereses.</p>
            </Card>
            <Card className="bg-card p-6">
              <h3 className="font-semibold text-xl mb-2">Gobierno Corporativo</h3>
              <p className="text-muted-foreground">Implementamos las mejores prácticas para asegurar la transparencia y eficiencia en la toma de decisiones.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
           <h2 className="text-3xl font-bold font-headline mb-4">¿Por qué elegirnos para su consultoría?</h2>
            <p className="text-muted-foreground mb-8">
              Nuestro enfoque va más allá de la simple asesoría legal. Nos convertimos en un socio estratégico que entiende su negocio.
            </p>
          <ul className="space-y-4 text-left mx-auto max-w-2xl">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
              <span><span className="font-semibold">Visión de Negocio:</span> Aportamos una perspectiva legal que se alinea con sus objetivos comerciales.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
              <span><span className="font-semibold">Prevención de Riesgos:</span> Identificamos y mitigamos problemas potenciales antes de que se conviertan en crisis.</span>
            </li>
             <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
              <span><span className="font-semibold">Eficiencia Operativa:</span> Le ayudamos a optimizar sus procesos legales para reducir costos y tiempos.</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
