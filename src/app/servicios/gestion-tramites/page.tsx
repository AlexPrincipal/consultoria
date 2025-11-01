
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function GestionTramitesPage() {
    const serviceImage = PlaceHolderImages.find((p) => p.id === 'servicio-gestion');

  return (
    <div className="bg-background text-white">
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Gestión y Trámites</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                La base de un negocio sólido reside en su formalidad. Nos encargamos de la elaboración de contratos, escrituras, dictámenes, constitución de sociedades y legalización de documentos para garantizar la seguridad jurídica en cada paso de su operación.
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
                  <CardTitle className="text-2xl font-headline text-center text-white">Asegure la formalidad de su negocio</CardTitle>
                </CardHeader>
                <CardContent>
                 <ContactForm serviceContext="Gestión y Trámites" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline text-center mb-12 text-white">Nuestros Servicios de Gestión Documental</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold flex items-center gap-3"><CheckCircle className="h-6 w-6 text-primary"/> Elaboración de Contratos y Escrituras</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Redactamos y revisamos todo tipo de contratos (comerciales, laborales, de arrendamiento, etc.) y escrituras, asegurando que sus acuerdos sean claros, sólidos y legalmente vinculantes.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold flex items-center gap-3"><CheckCircle className="h-6 w-6 text-primary"/> Constitución de Sociedades</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Le guiamos en todo el proceso de creación legal de su nueva empresa en México, desde la elección del tipo de sociedad hasta su inscripción final, para un arranque sin contratiempos.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                <CardTitle className="text-xl text-white font-semibold flex items-center gap-3"><CheckCircle className="h-6 w-6 text-primary"/> Emisión de Dictámenes y Legalización</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Emitimos dictámenes legales expertos sobre la viabilidad de operaciones y nos encargamos de la legalización y apostilla de documentos para su validez nacional e internacional.</p>
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
