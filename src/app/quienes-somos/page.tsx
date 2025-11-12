'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CheckCircle, Landmark, Shield, Star, Handshake, Sparkles, ShieldCheck, Database, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import AnimatedSection from '@/components/animated-section';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import EditableText from '@/components/editable-text';
import { useCollection, useDoc, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, addDoc, doc, writeBatch } from 'firebase/firestore';
import { defaultTeamMembers } from '@/lib/team';
import { useAdminStore } from '@/lib/store';
import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { TeamMember } from '@/lib/data-validation';

type QuienesSomosContentField =
  | 'title'
  | 'subhead'
  | 'missionTitle'
  | 'missionDesc'
  | 'visionTitle'
  | 'visionItem1'
  | 'visionItem2'
  | 'visionItem3'
  | 'firmTitle'
  | 'valuesTitle'
  | 'valuesSubhead'
  | 'teamTitle'
  | 'teamSubhead'
  | 'ctaTitle'
  | 'ctaSubhead'
  | 'ctaButton'
  | 'valor1Title'
  | 'valor2Title'
  | 'valor3Title'
  | 'valor4Title'
  | 'valor5Title';

type QuienesSomosContentDoc = Partial<Record<QuienesSomosContentField, string>>;

type QuienesSomosContent = Record<QuienesSomosContentField, string> & { id: string };
// import { syncTeamMembersWithFirestore } from '@/app/admin/actions'; // Ya no se usa

function AdminTeamSync() {
  const { isEditMode } = useAdminStore();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();

  const handleSync = () => {
    if (!firestore || !user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Firestore no disponible o usuario no autenticado"
      });
      return;
    }

    startTransition(async () => {
      try {
        const { defaultTeamMembers } = await import('@/lib/team');
        
        toast({
          title: "🔄 Sincronizando...",
          description: "Subiendo datos del equipo a Firestore"
        });

        // Usar writeBatch para operación atómica
        const batch = writeBatch(firestore);
        
        for (const member of defaultTeamMembers) {
          const docRef = doc(firestore, 'teamMembers', member.slug);
          batch.set(docRef, member);
        }

        // Ejecutar todas las escrituras de una vez
        await batch.commit();

        toast({
          title: "✅ Sincronización Exitosa",
          description: `${defaultTeamMembers.length} miembros sincronizados con Firestore`
        });
      } catch (error) {
        console.error('❌ Error syncing team members:', error);
        toast({
          variant: "destructive",
          title: "❌ Error de Sincronización",
          description: `Error: ${error instanceof Error ? error.message : 'Error desconocido'}`
        });
      }
    });
  };

  const restoreReneProfile = () => {
    if (!firestore) return;
    
    startTransition(async () => {
      try {
        toast({
          title: "🔄 Restaurando perfil de René...",
          description: "Sincronizando con los datos completos"
        });
        
        // Encontrar el perfil completo de René en defaultTeamMembers
        const reneProfile = defaultTeamMembers.find(member => 
          member.name.includes('René') || member.name.includes('Casillas')
        );
        
        if (reneProfile) {
          // Agregar el perfil completo
          await addDoc(collection(firestore, 'teamMembers'), reneProfile);
          
          toast({
            title: "✅ Perfil de René restaurado",
            description: "Los datos completos han sido sincronizados"
          });
        } else {
          throw new Error('No se encontró el perfil de René en los datos por defecto');
        }
      } catch (error) {
        console.error('Error restaurando perfil de René:', error);
        toast({
          variant: "destructive",
          title: "❌ Error al restaurar",
          description: "No se pudo restaurar el perfil de René"
        });
      }
    });
  };

  if (!isEditMode) return null;

  return (
    <AnimatedSection className="py-12 bg-secondary/30 border-y border-primary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h3 className="font-headline text-2xl text-white flex items-center gap-3"><Database className="h-8 w-8 text-primary" /> Módulo de Administración de Equipo</h3>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                    Utilice esta herramienta para poblar la base de datos de Firestore con la información del archivo local (`src/lib/team.ts`). Este es un paso inicial. Una vez sincronizado, podrá editar cada campo directamente en la página.
                </p>
                 <div className="mt-4 p-4 bg-yellow-900/50 border border-yellow-400/50 rounded-lg text-sm text-yellow-200 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0"/>
                    <span>
                        <strong>Atención:</strong> Al sincronizar, se sobrescribirán los datos existentes en Firestore con la información del archivo local. Use esto para la configuración inicial.
                    </span>
                 </div>
            </div>
            <div className="flex flex-col gap-4">
            <Button onClick={handleSync} disabled={isPending} size="lg">
            {isPending ? 'Sincronizando...' : 'Sincronizar Equipo con la Base de Datos'}
            </Button>
            <Button 
              onClick={restoreReneProfile} 
              disabled={isPending} 
              variant="outline" 
              size="lg"
              className="border-orange-500 text-orange-600 hover:bg-orange-50"
            >
            {isPending ? 'Restaurando...' : '🔧 Restaurar Perfil de René (EMERGENCIA)'}
            </Button>
            </div>
        </div>
      </div>
    </AnimatedSection>
  );
}


export default function QuienesSomosPage() {
  const firestore = useFirestore();

  const contentRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'pageContent', 'quienes-somos') : null),
    [firestore]
  );
  const { data: pageData, isLoading: isPageLoading } = useDoc<QuienesSomosContentDoc>(contentRef);
  
  const teamMembersRef = useMemoFirebase(
    () => (firestore ? collection(firestore, 'teamMembers') : null),
    [firestore]
  );
  const { data: teamMembersData, isLoading: isTeamLoading } = useCollection<TeamMember>(teamMembersRef);

  const isLoading = isPageLoading || isTeamLoading;
  
  // FILTRAR DUPLICADOS POR SLUG
  const removeDuplicates = <T extends { slug?: string; id?: string; name?: string }>(members: T[]): T[] => {
    const seen = new Set<string>();
    return members.filter((member) => {
      const key = member.slug || member.id || member.name;
      if (!key) {
        return true;
      }
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  };
  
  // Mezcla datos: parte de los defaults y sobrescribe con Firestore cuando exista,
  // garantizando que siempre aparezcan todos (incluido el tercer abogado)
  const mergedTeamMembers: TeamMember[] = (() => {
  const base: TeamMember[] = [...defaultTeamMembers];
    if (Array.isArray(teamMembersData) && teamMembersData.length > 0) {
      const indexBySlug = new Map(base.map((m, i) => [m.slug, i] as const));
      for (const fm of teamMembersData) {
        const idx = fm?.slug ? indexBySlug.get(fm.slug) : undefined;
        const fallback = typeof idx === 'number' ? base[idx] : undefined;
        const merged: TeamMember = {
          ...(fallback ?? {}),
          ...(fm as Partial<TeamMember>),
          // Asegurar campos mínimos con fallback
          name: fm?.name || fallback?.name || '',
          title: fm?.title || fallback?.title || '',
          imageUrl: fm?.imageUrl || fallback?.imageUrl || '',
          bio: fm?.bio || fallback?.bio || '',
          order: typeof fm?.order === 'number' ? fm.order : (fallback?.order ?? 999),
          imageHint: fm?.imageHint || fallback?.imageHint || '',
          imagePosition: fm?.imagePosition || fallback?.imagePosition || '',
          linkedinUrl: fm?.linkedinUrl || fallback?.linkedinUrl || '',
          homeSummary: fm?.homeSummary || fallback?.homeSummary || '',
          fullBio: fm?.fullBio || fallback?.fullBio || '',
          achievements: Array.isArray(fm?.achievements) && fm!.achievements!.length > 0 ? fm!.achievements! : (fallback?.achievements ?? []),
          id: fm?.id || fallback?.id || fm?.slug || fallback?.slug || 'sin-id',
          slug: fm?.slug || fallback?.slug || fm?.id || fallback?.id || 'sin-slug'
        } as TeamMember;
        if (typeof idx === 'number') base[idx] = merged; else base.push(merged);
      }
    }
    return base.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  })();

  const displayTeamMembers = removeDuplicates(mergedTeamMembers);

  const defaultContent: QuienesSomosContent = {
    id: 'quienes-somos',
    title: '¿Quiénes somos?',
    subhead: 'Somos un grupo de abogados que ofrecemos servicios profesionales integrales en las áreas legales, contables, financieras, tributarias, mercantiles, laborales, administrativas, orientadas a la creación de tu PYME o negocio de punta a punta. En esencia, el objetivo es proporcionar soluciones legales y de gestión que permitan a la persona física o moral operar de forma segura, eficiente y exitosa.',
    firmTitle: 'Nuestra Firma',
    missionTitle: 'Nuestra Misión',
    missionDesc: 'Ofrecer soluciones legales innovadoras, efectivas y a la medida, que no solo resuelvan los problemas actuales de nuestros clientes, sino que también anticipen desafíos futuros. Nos dedicamos a proteger los activos, la reputación y el crecimiento de cada empresa que confía en nosotros.',
    visionTitle: 'Nuestra Visión',
    visionItem1: 'Ser la firma de abogados líder en derecho corporativo y de negocios en México.',
    visionItem2: 'Reconocida por nuestro enfoque estratégico y compromiso inquebrantable con la excelencia.',
    visionItem3: 'Construir relaciones de largo plazo con nuestros clientes, basadas en la confianza y los resultados.',
    valuesTitle: 'Nuestros Valores',
    valuesSubhead: 'Los principios que guían cada una de nuestras acciones y decisiones.',
    teamTitle: 'Conozca a Nuestro Equipo',
    teamSubhead: 'Profesionales dedicados a la excelencia, con la experiencia y el conocimiento para proteger sus intereses.',
    ctaTitle: 'Un Equipo de Expertos a su Disposición',
    ctaSubhead: 'Nuestro equipo está compuesto por abogados con una profunda especialización y una vasta experiencia en diversas áreas del derecho. Combinamos el conocimiento técnico con una visión práctica de los negocios para ofrecer un servicio legal que verdaderamente agrega valor.',
    ctaButton: 'Contacte a Nuestro Equipo',
    valor1Title: 'Integridad',
    valor2Title: 'Excelencia', 
    valor3Title: 'Compromiso',
    valor4Title: 'Innovación',
    valor5Title: 'Confianza'
  };

  const content: QuienesSomosContent = {
    ...defaultContent,
    ...(pageData ?? {}),
  } as QuienesSomosContent;
  
  const teamImage = PlaceHolderImages.find(p => p.id === 'quienes-somos-team');
  const misionVisionImage = PlaceHolderImages.find(p => p.id === 'quienes-somos-mision-vision');

  const valores = [
    { 
      title: content.valor1Title ?? "Integridad", 
      field: "valor1Title",
      icon: <Shield className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" /> 
    },
    { 
      title: content.valor2Title ?? "Excelencia", 
      field: "valor2Title",
      icon: <Star className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" /> 
    },
    { 
      title: content.valor3Title ?? "Compromiso", 
      field: "valor3Title",
      icon: <Handshake className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" /> 
    },
    { 
      title: content.valor4Title ?? "Innovación", 
      field: "valor4Title",
      icon: <Sparkles className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" /> 
    },
    { 
      title: content.valor5Title ?? "Confianza", 
      field: "valor5Title",
      icon: <ShieldCheck className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" /> 
    }
  ];

  // Sanitizar textos de CTA para evitar placeholders como "undefined", pruebas o textos demasiado cortos
  const isBad = (val?: string, min = 3) => {
    if (typeof val !== 'string') return true;
    const t = val.trim();
    if (t.length < min) return true;
    const lowered = t.toLowerCase();
    return lowered === 'undefined' || lowered === 'null' || lowered === 'ed' || lowered === 'prueba' || lowered === 'prueba de cambios';
  };
  const ctaTitleText = isBad(content.ctaTitle, 8) ? defaultContent.ctaTitle : content.ctaTitle;
  const ctaSubheadText = isBad(content.ctaSubhead, 24) ? defaultContent.ctaSubhead : content.ctaSubhead;
  const ctaButtonText = isBad(content.ctaButton, 3) ? defaultContent.ctaButton : content.ctaButton;

  return (
    <div className="bg-background text-white">
      {/* Hero */}
      <AnimatedSection className="py-20 md:py-28 text-center bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 tracking-tight">
            <EditableText field="title" defaultText={content.title ?? defaultContent.title} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
          </h1>
          <div className="mt-4 text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            <EditableText field="subhead" defaultText={content.subhead ?? defaultContent.subhead} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" multiline />
          </div>
        </div>
      </AnimatedSection>
      
      <AdminTeamSync />

      {/* Misión y Visión */}
       <AnimatedSection className="relative py-20 md:py-28 overflow-hidden">
         <div className="absolute inset-0">
          {misionVisionImage && misionVisionImage.imageUrl && <Image
              src={misionVisionImage.imageUrl}
              alt={misionVisionImage.description}
              fill
              sizes="100vw"
              className="object-cover opacity-10"
              data-ai-hint={misionVisionImage.imageHint}
            />}
          </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
                 <Landmark className="h-12 w-12 text-primary mx-auto mb-4" />
                 <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">
                   <EditableText field="firmTitle" defaultText={content.firmTitle ?? "Nuestra Firma"} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
                 </h2>
            </div>
          <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
            <div>
              <h3 className="text-3xl font-bold font-headline mb-4 text-primary">
                <EditableText field="missionTitle" defaultText={content.missionTitle ?? defaultContent.missionTitle} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
              </h3>
              <div className="text-muted-foreground leading-relaxed text-lg">
                <EditableText field="missionDesc" defaultText={content.missionDesc ?? defaultContent.missionDesc} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" multiline />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold font-headline mb-4 text-primary">
                <EditableText field="visionTitle" defaultText={content.visionTitle ?? defaultContent.visionTitle} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
              </h3>
              <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">
                      <EditableText field="visionItem1" defaultText={content.visionItem1 ?? defaultContent.visionItem1} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">
                      <EditableText field="visionItem2" defaultText={content.visionItem2 ?? defaultContent.visionItem2} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">
                      <EditableText field="visionItem3" defaultText={content.visionItem3 ?? defaultContent.visionItem3} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
                    </span>
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
              <h2 className="text-3xl font-bold font-headline mb-4 text-white">
                <EditableText field="valuesTitle" defaultText={content.valuesTitle ?? defaultContent.valuesTitle} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
              </h2>
              <div className="text-muted-foreground leading-relaxed">
                <EditableText field="valuesSubhead" defaultText={content.valuesSubhead ?? defaultContent.valuesSubhead} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
                {valores.map((valor, index) => (
                    <div key={`${valor.field}-${index}`} className="fade-in-up opacity-0" style={{ animationDelay: `${index * 150}ms` }}>
                        <Card className="group bg-card/50 border-white/10 p-6 text-center flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-primary/20">
                            {valor.icon}
                            <h4 className="text-xl font-headline text-white">
                              <EditableText 
                                field={valor.field} 
                                defaultText={valor.title} 
                                isLoading={isLoading} 
                                collectionId="pageContent" 
                                docId="quienes-somos" 
                              />
                            </h4>
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
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">
              <EditableText field="teamTitle" defaultText={content.teamTitle ?? defaultContent.teamTitle} isLoading={isTeamLoading} collectionId="pageContent" docId="quienes-somos" />
            </h2>
            <div className="mt-4 text-lg text-muted-foreground">
              <EditableText field="teamSubhead" defaultText={content.teamSubhead ?? defaultContent.teamSubhead} isLoading={isTeamLoading} collectionId="pageContent" docId="quienes-somos" multiline/>
            </div>
          </div>
          <div className="space-y-16">
            {displayTeamMembers.map((member, index) => {
              const uniqueKey = `team-${member.slug || member.id || member.name?.toLowerCase().replace(/\s+/g, '-') || index}`;
              return (
                <div key={uniqueKey}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
                  <div className={cn("relative aspect-[4/5] w-full max-w-sm mx-auto rounded-lg overflow-hidden", index % 2 !== 0 && "md:order-last") }>
                    {member.imageUrl ? (
                      <Image
                        src={member.imageUrl}
                        alt={`Retrato de ${member.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={cn("object-cover", member.imagePosition ?? "object-center")}
                        data-ai-hint={member.imageHint}
                      />
                    ) : (
                      <div className="w-full h-full bg-muted/20 rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground">Sin imagen</span>
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2 space-y-4 text-center md:text-left">
                    <h3 className="text-3xl font-bold font-headline text-primary">
                      <EditableText field="name" defaultText={member.name ?? 'Nombre no disponible'} isLoading={isTeamLoading} collectionId="teamMembers" docId={member.slug} />
                    </h3>
                     <div className="text-lg font-medium text-white">
                        <EditableText field="title" defaultText={member.title ?? 'Título no disponible'} isLoading={isTeamLoading} collectionId="teamMembers" docId={member.slug} />
                    </div>
                    <div className="text-muted-foreground leading-relaxed text-lg">
                      <EditableText field="bio" defaultText={member.bio ?? 'Biografía no disponible'} isLoading={isTeamLoading} collectionId="teamMembers" docId={member.slug} multiline />
                    </div>
                    {member.slug && (
                      <Button variant="link" asChild className="p-0 text-primary">
                        <Link href={`/quienes-somos/${member.slug}`}>Conocer trayectoria &rarr;</Link>
                      </Button>
                    )}
                  </div>
                </div>
                {index < displayTeamMembers.length - 1 && (
                  <hr className="mt-16 border-white/10" />
                )}
              </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Equipo y Contacto (Restaurado) */}
      <AnimatedSection className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             {teamImage && teamImage?.imageUrl && (
               <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={teamImage.imageUrl}
                  alt={teamImage.description}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  data-ai-hint={teamImage.imageHint}
                />
              </div>
             )}
            <div>
              <h2 className="text-3xl font-bold font-headline mb-4">
                <EditableText field="ctaTitle" defaultText={ctaTitleText} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
              </h2>
              <div className="text-muted-foreground leading-relaxed mb-6">
                <EditableText field="ctaSubhead" defaultText={ctaSubheadText} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" multiline />
              </div>
               <Button asChild>
                <Link href="/contacto">
                  <EditableText field="ctaButton" defaultText={ctaButtonText} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
                </Link>
              </Button>
              
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
