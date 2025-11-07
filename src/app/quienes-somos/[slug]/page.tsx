'use client';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import EditableText from '@/components/editable-text';
import { Skeleton } from '@/components/ui/skeleton';
import { defaultTeamMembers } from '@/lib/team';

export default function TeamMemberPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Find the default member data from the static file first.
  const defaultMember = defaultTeamMembers.find((m) => m.slug === slug);

  const firestore = useFirestore();
  const memberRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'teamMembers', slug) : null),
    [firestore, slug]
  );
  // Fetch dynamic data from Firestore.
  const { data: firestoreMember, isLoading: isFirestoreLoading } = useDoc(memberRef);

  // Use Firestore data if available, otherwise fall back to the default static data.
  // This ensures the page works even if Firestore is empty.
  const member = firestoreMember || defaultMember;
  const isLoading = isFirestoreLoading && !firestoreMember; // Only show loading if we don't have any data to show yet.

  if (!member) {
    // If neither Firestore nor static data is found, then it's a true 404.
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
        ) : (
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Columna Izquierda - Foto y Datos */}
            <div className="md:col-span-1 flex flex-col items-center">
              <div className="relative h-64 w-64 rounded-lg overflow-hidden border-4 border-white/80 mb-6 shadow-lg">
                <Image
                  src={member.imageUrl}
                  alt={`Retrato de ${member.name}`}
                  fill
                  className="object-cover object-top"
                  data-ai-hint={member.imageHint}
                />
              </div>
              <h1 className="text-3xl font-bold font-headline text-center">
                  <EditableText field="name" defaultText={member.name} isLoading={isLoading} collectionId="teamMembers" docId={member.id} />
              </h1>
              <div className="text-primary text-lg font-medium text-center">
                  <EditableText field="title" defaultText={member.title} isLoading={isLoading} collectionId="teamMembers" docId={member.id} multiline/>
              </div>
              {member.linkedinUrl && <div className="mt-4">
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
                    <div className="text-muted-foreground leading-relaxed">
                      <EditableText field="fullBio" defaultText={member.fullBio} isLoading={isLoading} collectionId="teamMembers" docId={member.id} multiline/>
                    </div>
                  </div>
                  {member.achievements && member.achievements.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg text-primary mb-3">Logros Destacados</h3>
                      <ul className="space-y-3">
                        {member.achievements.map((achievement: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                            <span className="text-muted-foreground">
                                <EditableText field={`achievements.${index}`} defaultText={achievement} isLoading={isLoading} collectionId="teamMembers" docId={member.id} />
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
        )}
      </div>
    </div>
  );
}
