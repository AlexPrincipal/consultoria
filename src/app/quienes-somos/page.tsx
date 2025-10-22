
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { teamMembers } from '@/lib/team';
import { cn } from '@/lib/utils';

export default function QuienesSomosPage() {
  const teamImage = {
    imageUrl: 'https://picsum.photos/seed/lawteam/1200/800',
    description: 'Nuestro equipo de abogados expertos',
    imageHint: 'lawyers team portrait',
  };

  return (
    <div className="bg-background text-white">
      {/* Hero */}
      <section className="py-20 md:py-28 text-center bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            Excelencia e Integridad en la Práctica Legal
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Somos más que abogados; somos los socios estratégicos que su empresa necesita para navegar el complejo entorno legal con confianza y seguridad.
          </p>
        </div>
      </section>

      {/* Misión y Visión y Valores */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h2 className="text-3xl font-bold font-headline mb-4 text-center text-primary">Nuestra Misión</h2>
              <p className="text-muted-foreground leading-relaxed text-center">
                Ofrecer soluciones legales innovadoras, efectivas y a la medida, que no solo resuelvan los problemas actuales de nuestros clientes, sino que también anticipen desafíos futuros. Nos dedicamos a proteger los activos, la reputación y el crecimiento de cada empresa que confía en nosotros.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold font-headline mb-4 text-center text-primary">Nuestra Visión</h2>
              <p className="text-muted-foreground leading-relaxed text-center">
                Ser la firma de abogados líder en derecho corporativo y de negocios en México, reconocida por nuestro enfoque estratégico, nuestro compromiso inquebrantable con la excelencia y por construir relaciones de largo plazo con nuestros clientes, basadas en la confianza y los resultados.
              </p>
            </div>
             <div>
              <h2 className="text-3xl font-bold font-headline mb-4 text-center text-primary">Nuestros Valores</h2>
               <ul className="text-muted-foreground leading-relaxed text-center list-disc list-inside marker:text-primary">
                  <li>Integridad</li>
                  <li>Excelencia</li>
                  <li>Compromiso</li>
                  <li>Innovación</li>
                  <li>Confianza</li>
               </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section id="equipo" className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6">
           <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">Conozca a Nuestro Equipo</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Profesionales dedicados a la excelencia, con la experiencia y el conocimiento para proteger sus intereses.
            </p>
          </div>
          <div className="space-y-16">
            {teamMembers.map((member, index) => (
              <div key={member.slug}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
                  <div className={cn("relative aspect-[4/5] w-full max-w-sm mx-auto", index % 2 !== 0 && "md:order-last")}>
                    <Image
                      src={member.imageUrl}
                      alt={`Retrato de ${member.name}`}
                      fill
                      className="object-cover rounded-lg"
                      data-ai-hint={member.imageHint}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-4 text-center md:text-left">
                    <h3 className="text-3xl font-bold font-headline text-primary">{member.name}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{member.bio}</p>
                     <Button variant="link" asChild className="p-0 text-primary">
                        <Link href={`/quienes-somos/${member.slug}`}>Conocer trayectoria &rarr;</Link>
                    </Button>
                  </div>
                </div>
                {index < teamMembers.length - 1 && (
                  <hr className="mt-16 border-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo y Contacto */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={teamImage.imageUrl}
                  alt={teamImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={teamImage.imageHint}
                />
              </div>
            <div>
              <h2 className="text-3xl font-bold font-headline mb-4">Un Equipo de Expertos a su Disposición</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nuestro equipo está compuesto por abogados con una profunda especialización y una vasta experiencia en diversas áreas del derecho. Combinamos el conocimiento técnico con una visión práctica de los negocios para ofrecer un servicio legal que verdaderamente agrega valor.
              </p>
               <Button asChild>
                <Link href="/contacto">Contacte a Nuestro Equipo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
