import Image from 'next/image';
import { notFound } from 'next/navigation';
import { teamMembers } from '@/lib/team';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function generateStaticParams() {
  return teamMembers.map((member) => ({
    slug: member.slug,
  }));
}

export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  const member = teamMembers.find((m) => m.slug === params.slug);

  if (!member) {
    notFound();
  }

  return (
    <div className="bg-background text-white py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Columna Izquierda - Foto y Datos */}
          <div className="md:col-span-1 flex flex-col items-center">
            <div className="relative h-64 w-64 rounded-full overflow-hidden border-4 border-primary mb-6 shadow-lg">
              <Image
                src={member.imageUrl}
                alt={`Retrato de ${member.name}`}
                fill
                className="object-cover"
                data-ai-hint={member.imageHint}
              />
            </div>
            <h1 className="text-3xl font-bold font-headline text-center">{member.name}</h1>
            <p className="text-primary text-lg font-medium text-center">{member.title}</p>
            <div className="mt-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="LinkedIn">
                  <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Columna Derecha - Biografía y Logros */}
          <div className="md:col-span-2">
            <Card className="bg-card border-border/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-white">Perfil Profesional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg text-primary mb-2">Biografía</h3>
                  <p className="text-muted-foreground leading-relaxed">{member.fullBio}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary mb-3">Logros Destacados</h3>
                  <ul className="space-y-3">
                    {member.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-8 text-center md:text-left">
                <Button asChild>
                    <Link href="/quienes-somos#equipo">Volver al Equipo</Link>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
