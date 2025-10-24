
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';

export default function AreaEmpresarialPage() {
  return (
    <div className="bg-background text-white">
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Building className="h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Área Empresarial Específica</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Ofrecemos una asesoría 360° en las áreas críticas del derecho que impactan directamente en la operación y estrategia de su negocio. Nuestro enfoque multidisciplinario garantiza una cobertura legal completa y soluciones integrales.
              </p>
            </div>
            <div className="flex justify-center">
               <Card className="w-full max-w-md bg-card border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-center text-white">Solicite asesoría integral</CardTitle>
                </CardHeader>
                <CardContent>
                 <ContactForm serviceContext="Área Empresarial Específica" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline text-center mb-12 text-white">Nuestras Especialidades de Negocio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Derecho Corporativo</h3>
              <p className="text-muted-foreground">Asesoría experta en la organización interna, gobierno corporativo, toma de decisiones y todas las actividades comerciales de la empresa.</p>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Derecho Mercantil</h3>
              <p className="text-muted-foreground">Gestión y estrategia en títulos de crédito, contratos comerciales, fusiones, escisiones y adquisiciones (M&A) y otros actos de comercio.</p>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <h3 className="font-semibold text-xl mb-2 text-white">Derecho Laboral</h3>
              <p className="text-muted-foreground">Consultoría en contratación y terminación de relaciones laborales, negociación colectiva y defensa estratégica en demandas individuales o colectivas.</p>
            </Card>
             <Card className="bg-card/50 p-6 border-white/10 mt-8">
              <h3 className="font-semibold text-xl mb-2 text-white">Asesoría Fiscal y Contable</h3>
              <p className="text-muted-foreground">Estrategias para la optimización fiscal, gestión de obligaciones tributarias, elaboración de dictámenes y auditorías para una salud financiera óptima.</p>
            </Card>
             <Card className="bg-card/50 p-6 border-white/10 mt-8">
              <h3 className="font-semibold text-xl mb-2 text-white">Gestión Administrativa</h3>
              <p className="text-muted-foreground">Asistencia, gestoría y representación en todo tipo de trámites y procedimientos ante las diversas instancias gubernamentales.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
           <h2 className="text-3xl font-bold font-headline mb-4 text-white">Un Enfoque que Integra, una Solución que Simplifica</h2>
            <p className="text-muted-foreground mb-8">
              Nuestro enfoque multidisciplinario nos permite ofrecer soluciones completas, centralizando sus necesidades legales en un solo punto de contacto estratégico.
            </p>
          <div className="text-left mx-auto max-w-2xl bg-card/80 border border-white/10 p-8 rounded-lg">
                <blockquote className="text-lg italic text-white border-l-2 border-primary pl-4">
                  "Tener un solo punto de contacto para nuestras necesidades legales, fiscales y laborales ha sido un cambio radical. Su visión 360° nos ha ahorrado tiempo, evitado problemas de coordinación y nos ha dado una ventaja competitiva."
                </blockquote>
                <p className="text-right mt-4 text-primary font-semibold">- Director Financiero, Grupo Comercial</p>
            </div>
            <div className="mt-8">
                <Button asChild variant="outline">
                    <Link href="/testimoniales">Lea las opiniones de nuestros clientes</Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
