
'use client';

import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { defaultTeamMembers } from '@/lib/team';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import EditableText from '@/components/editable-text';

export default function TeamMemberPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Find the default member data from the static file first.
  const defaultMember = defaultTeamMembers.find((m) => m.slug === slug);

  const firestore = useFirestore();
  const memberRef = useMemoFirebase(
    () => (firestore && slug ? doc(firestore, 'teamMembers', slug) : null),
    [firestore, slug]
  );
  const { data: memberData, isLoading: isMemberLoading } = useDoc(memberRef);

  // Use data from Firestore if available, otherwise fall back to default static data.
  // PERO: Solo usar Firestore si los datos están COMPLETOS
  const isFirestoreDataComplete = memberData && 
    memberData.name && 
    memberData.title && 
    memberData.imageUrl && 
    memberData.bio;
  
  const member = isFirestoreDataComplete ? memberData : defaultMember;
  const isLoading = isMemberLoading && !memberData;

  // Solo hacer notFound si realmente no hay member Y no está cargando
  if (!isLoading && !member) {
    notFound();
  }

  return (
    <div className="bg-background text-white py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="md:col-span-1 flex flex-col items-center">
              <Skeleton className="h-64 w-64 rounded-lg mb-6" />
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="md:col-span-2">
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        ) : member ? (
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Columna Izquierda - Foto y Datos */}
            <div className="md:col-span-1 flex flex-col items-center">
              <div className="relative h-64 w-64 rounded-lg overflow-hidden border-4 border-white/80 mb-6 shadow-lg">
                {member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={`Retrato de ${member.name || 'miembro del equipo'}`}
                    fill
                    className="object-cover object-top"
                    data-ai-hint={member.imageHint}
                    sizes="256px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600">Sin imagen</span>
                  </div>
                )}
              </div>
              <h1 className="text-3xl font-bold font-headline text-center">
                 <EditableText field="name" defaultText={member?.name || 'Nombre no disponible'} isLoading={isLoading} collectionId="teamMembers" docId={slug} />
              </h1>
              <div className="text-primary text-lg font-medium text-center">
                 <EditableText field="title" defaultText={member?.title || 'Título no disponible'} isLoading={isLoading} collectionId="teamMembers" docId={slug} />
              </div>
              {member?.linkedinUrl && <div className="mt-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary" />
                  </Link>
                </Button>
              </div>}
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
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      <EditableText field="fullBio" defaultText={member?.fullBio || 'Biografía no disponible'} isLoading={isLoading} collectionId="teamMembers" docId={slug} multiline />
                    </div>
                  </div>
                  {member?.achievements && member.achievements.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg text-primary mb-3">Logros Destacados</h3>
                      <ul className="space-y-3">
                        {member.achievements.map((achievement: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                            <span className="text-muted-foreground">
                                <EditableText 
                                  field={`achievement${index + 1}`} 
                                  defaultText={achievement || 'Logro no disponible'} 
                                  isLoading={isLoading} 
                                  collectionId="teamMembers" 
                                  docId={slug} 
                                />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="mt-8 text-center md:text-left">
                  <Button asChild>
                      <Link href="/quienes-somos#equipo">Volver al Equipo</Link>
                  </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Perfil no encontrado</h1>
            <p className="text-muted-foreground mb-6">
              No se pudo encontrar el perfil con el identificador: {slug}
            </p>
            <Button asChild>
              <Link href="/quienes-somos#equipo">Volver al Equipo</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
