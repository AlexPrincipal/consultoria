
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function CompliancePage() {
    const serviceImage = PlaceHolderImages.find((p) => p.id === 'servicio-compliance');
  return (
    <div className="bg-background text-white">
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Cumplimiento Normativo (Compliance)</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Aseguramos que su empresa cumpla con todas las leyes y regulaciones aplicables para evitar sanciones. Implementamos un sistema de gestión proactivo para prevenir, detectar y corregir riesgos, garantizando que sus actividades se ajusten al marco legal, regulatorio y ético.
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
