
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';


export default function RepresentacionDefensaPage() {
    const serviceImage = PlaceHolderImages.find((p) => p.id === 'servicio-representacion');

  return (
    <div className="bg-background text-white">
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Representación y Defensa</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Cuando sus intereses están en juego, necesita un defensor estratégico. Actuamos en nombre de su empresa con una defensa sólida y una representación experta en negociaciones, ante autoridades y en procedimientos judiciales en materia empresarial.
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
                  <CardTitle className="text-2xl font-headline text-center text-white">Evalúe su caso con un experto</CardTitle>
                </CardHeader>
                <CardContent>
                 <ContactForm serviceContext="Representación y Defensa" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline text-center mb-12 text-white">Nuestras Áreas de Representación</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            
            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                 <CardTitle className="text-xl text-white font-semibold flex items-center gap-3"><CheckCircle className="h-6 w-6 text-primary"/>Representación en Negociaciones</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Actuamos como su abogado en la negociación de contratos complejos, alianzas estratégicas, fusiones, adquisiciones (M&A), o disoluciones para asegurar siempre los términos más favorables para su negocio.</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                 <CardTitle className="text-xl text-white font-semibold flex items-center gap-3"><CheckCircle className="h-6 w-6 text-primary"/>Representación ante Organismos Públicos</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Gestionamos y tramitamos asuntos ante autoridades administrativas, registros mercantiles, notarías o reguladores (por ejemplo, en temas de competencia económica o protección de datos).</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                 <CardTitle className="text-xl text-white font-semibold flex items-center gap-3"><CheckCircle className="h-6 w-6 text-primary"/>Formalización de Acuerdos</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground">Firmamos documentos, contratos, o escrituras en nombre de la sociedad, asegurando que todos los actos cumplan con el marco legal corporativo y los estatutos internos.</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 p-6 border-white/10">
              <CardHeader className="p-0">
                 <CardTitle className="text-xl text-white font-semibold flex items-center gap-3"><CheckCircle className="h-6 w-6 text-primary"/>Defensa Corporativa en Litigios</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-muted-foreground mb-4">Representamos a la empresa como demandante o demandada en juicios o procedimientos ante tribunales.</p>
                <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                  <li><span className='font-semibold text-white/90'>Litigio Mercantil:</span> Disputas por incumplimiento de contratos, competencia desleal, reclamación de deudas (cobranza judicial), o conflictos entre socios.</li>
                  <li><span className='font-semibold text-white/90'>Litigio Laboral:</span> Defensa de la empresa ante demandas de empleados o sindicatos (despidos, condiciones de trabajo).</li>
                  <li><span className='font-semibold text-white/90'>Litigio Administrativo/Fiscal:</span> Impugnación de multas, sanciones o resoluciones emitidas por autoridades gubernamentales.</li>
                </ul>
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
