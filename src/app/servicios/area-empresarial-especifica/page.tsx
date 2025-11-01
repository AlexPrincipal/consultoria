
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AreaEmpresarialPage() {
    const serviceImage = PlaceHolderImages.find((p) => p.id === 'servicio-area-empresarial');
    
  return (
    <div className="bg-background text-white">
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Área Empresarial Específica</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Ofrecemos una asesoría 360° en las áreas críticas del derecho que impactan directamente en la operación y estrategia de su negocio. Nuestro enfoque multidisciplinario garantiza una cobertura legal completa y soluciones integrales.
              </p>
                {serviceImage && (
                <div className="relative aspect-video rounded-lg overflow-hidden mt-6">
                    <Image
                    src={serviceImage.imageUrl}
                    alt={serviceImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={serviceImage.imageHint}
                    />
                </div>
                )}
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
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold">Derecho Corporativo</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Asesoría experta en la organización interna, gobierno corporativo, toma de decisiones y todas las actividades comerciales de la empresa.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold">Derecho Mercantil</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Gestión y estrategia en títulos de crédito, contratos comerciales, fusiones, escisiones y adquisiciones (M&A) y otros actos de comercio.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold">Derecho Laboral</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Consultoría en contratación, terminación de relaciones laborales, negociación colectiva y defensa estratégica en demandas individuales o colectivas.</p>
              </CardContent>
            </Card>
             <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold">Asesoría Fiscal y Contable</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Estrategias para la optimización fiscal, gestión de obligaciones tributarias, elaboración de dictámenes y auditorías para una salud financiera óptima.</p>
              </CardContent>
            </Card>
             <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold">Gestión Administrativa</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Asistencia, gestoría y representación en todo tipo de trámites y procedimientos ante las diversas instancias gubernamentales.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <h2 className="text-3xl font-bold font-headline mb-4 text-white">¿Listo para Fortalecer su Empresa?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nuestro equipo está preparado para ofrecerle la asesoría estratégica que su negocio necesita. Contáctenos hoy para una evaluación de su caso.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/contacto">Agendar una Consulta</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
