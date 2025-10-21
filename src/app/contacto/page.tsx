import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from '@/components/contact-form';

export default function ContactPage() {
  return (
    <div className="bg-background">
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">Contáctenos</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Estamos listos para escucharle. Complete el formulario para agendar una evaluación de su caso o para cualquier otra consulta. Nuestro equipo se pondrá en contacto a la brevedad.
              </p>
              <div className="mt-8 space-y-4 text-muted-foreground">
                <p><strong>Email:</strong> <a href="mailto:contacto@cmxsjuridico.com" className="hover:text-primary">contacto@cmxsjuridico.com</a></p>
                <p><strong>Teléfono:</strong> <a href="tel:+525512345678" className="hover:text-primary">+52 55 1234 5678</a></p>
                <p><strong>Dirección:</strong> Dirección de la Firma, No. 123, Colonia Corporativa, Ciudad, Estado, CP 12345</p>
              </div>
            </div>
            <div>
              <Card className="bg-card border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-white">Formulario de Contacto</CardTitle>
                  <CardDescription>
                    Déjenos sus datos y un breve mensaje.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
