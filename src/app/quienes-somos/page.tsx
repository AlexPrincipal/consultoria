
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { teamMembers } from '@/lib/team';
import { cn } from '@/lib/utils';
import { CheckCircle, Landmark, Shield, Star, Handshake, Sparkles, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedSection from '@/components/animated-section';

export default function QuienesSomosPage() {
  const teamImage = {
    imageUrl: 'https://picsum.photos/seed/lawteam/1200/800',
    description: 'Nuestro equipo de abogados expertos',
    imageHint: 'lawyers team portrait',
  };
  
  const misionVisionImage = {
      imageUrl: 'https://images.unsplash.com/photo-1613909207394-67a574507d83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxsYWR5JTIwanVzdGljZSUyMHN0YXR1ZXxlbnwwfHx8fDE3NjE4Nzg2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Estatua de la justicia',
      imageHint: 'lady justice statue'
  }

  const valores = [
    { title: "Integridad", icon: <Shield className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" /> },
    { title: "Excelencia", icon: <Star className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" /> },
    { title: "Compromiso", icon: <Handshake className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" /> },
    { title: "Innovación", icon: <Sparkles className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" /> },
    { title: "Confianza", icon: <ShieldCheck className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" /> }
  ];

  return (
    <div className="bg-background text-white">
      {/* Hero */}
      <AnimatedSection className="py-20 md:py-28 text-center bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            ¿Quiénes somos?
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Somos un grupo de abogados que ofrecemos servicios profesionales integrales en las áreas legales, contables, financieras, tributarias, mercantiles, laborales, administrativas, orientadas a la creación de tu PYME o negocio de punta a punta. En esencia, el objetivo es proporcionar soluciones legales y de gestión que permitan a la persona física o moral operar de forma segura, eficiente y exitosa.
          </p>
        </div>
      </AnimatedSection>

      {/* Misión y Visión */}
       <AnimatedSection className="relative py-20 md:py-28">
         <Image
            src={misionVisionImage.imageUrl}
            alt={misionVisionImage.description}
            fill
            className="object-cover opacity-10"
            data-ai-hint={misionVisionImage.imageHint}
          />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
                 <Landmark className="h-12 w-12 text-primary mx-auto mb-4" />
                 <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">Nuestra Firma</h2>
            </div>
          <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
            <div>
              <h3 className="text-3xl font-bold font-headline mb-4 text-primary">Nuestra Misión</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Ofrecer soluciones legales innovadoras, efectivas y a la medida, que no solo resuelvan los problemas actuales de nuestros clientes, sino que también anticipen desafíos futuros. Nos dedicamos a proteger los activos, la reputación y el crecimiento de cada empresa que confía en nosotros.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold font-headline mb-4 text-primary">Nuestra Visión</h3>
              <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Ser la firma de abogados líder en derecho corporativo y de negocios en México.</span>
                  </li>
                   <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Reconocida por nuestro enfoque estratégico y compromiso inquebrantable con la excelencia.</span>
                  </li>
                   <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Construir relaciones de largo plazo con nuestros clientes, basadas en la confianza y los resultados.</span>
                  </li>
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Valores */}
      <AnimatedSection className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold font-headline mb-4 text-white">Nuestros Valores</h2>
              <p className="text-muted-foreground leading-relaxed">Los principios que guían cada una de nuestras acciones y decisiones.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
                {valores.map((valor, index) => (
                    <div key={valor.title} className="fade-in-up opacity-0" style={{ animationDelay: `${index * 150}ms` }}>
                        <Card className="group bg-card/50 border-white/10 p-6 text-center flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-primary/20">
                            {valor.icon}
                            <h4 className="text-xl font-headline text-white">{valor.title}</h4>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection id="equipo" className="py-20 md:py-28 bg-background">
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
      </AnimatedSection>

      {/* Equipo y Contacto */}
      <AnimatedSection className="py-20 md:py-28 bg-secondary">
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
      </AnimatedSection>
    </div>
  );
}
