
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CheckCircle, Landmark, Shield, Star, Handshake, Sparkles, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedSection from '@/components/animated-section';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import EditableText from '@/components/editable-text';
import { useDoc, useFirestore, useMemoFirebase, useCollection } from '@/firebase';
import { collection, doc, query, orderBy } from 'firebase/firestore';

export default function QuienesSomosPage() {
  const firestore = useFirestore();
  const contentRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'pageContent', 'quienes-somos') : null),
    [firestore]
  );
  const { data: pageData, isLoading: isPageLoading } = useDoc(contentRef);
  
  const teamQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'teamMembers'), orderBy('order', 'asc')) : null),
    [firestore]
  );
  const { data: teamMembers, isLoading: isTeamLoading } = useCollection(teamQuery);

  const isLoading = isPageLoading || isTeamLoading;
  
  const defaultContent = {
    id: 'quienes-somos',
    title: '¿Quiénes somos?',
    subhead: 'Somos un grupo de abogados que ofrecemos servicios profesionales integrales en las áreas legales, contables, financieras, tributarias, mercantiles, laborales, administrativas, orientadas a la creación de tu PYME o negocio de punta a punta. En esencia, el objetivo es proporcionar soluciones legales y de gestión que permitan a la persona física o moral operar de forma segura, eficiente y exitosa.',
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
    ctaButton: 'Contacte a Nuestro Equipo'
  };

  const content = pageData || defaultContent;

  const teamImage = PlaceHolderImages.find(p => p.id === 'quienes-somos-team');
  const misionVisionImage = PlaceHolderImages.find(p => p.id === 'quienes-somos-mision-vision');

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
            <EditableText field="title" defaultText={content.title} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
          </h1>
          <div className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            <EditableText field="subhead" defaultText={content.subhead} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" multiline />
          </div>
        </div>
      </AnimatedSection>

      {/* Misión y Visión */}
       <AnimatedSection className="relative py-20 md:py-28 overflow-hidden">
         <div className="absolute inset-0">
          {misionVisionImage && <Image
              src={misionVisionImage.imageUrl}
              alt={misionVisionImage.description}
              fill
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
                <EditableText field="missionTitle" defaultText={content.missionTitle} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
              </h3>
              <div className="text-muted-foreground leading-relaxed text-lg">
                <EditableText field="missionDesc" defaultText={content.missionDesc} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" multiline />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold font-headline mb-4 text-primary">
                <EditableText field="visionTitle" defaultText={content.visionTitle} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
              </h3>
              <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">
                      <EditableText field="visionItem1" defaultText={content.visionItem1} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
                    </span>
                  </li>
                   <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">
                      <EditableText field="visionItem2" defaultText={content.visionItem2} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
                    </span>
                  </li>
                   <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">
                      <EditableText field="visionItem3" defaultText={content.visionItem3} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
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
                <EditableText field="valuesTitle" defaultText={content.valuesTitle} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
              </h2>
              <div className="text-muted-foreground leading-relaxed">
                <EditableText field="valuesSubhead" defaultText={content.valuesSubhead} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
              </div>
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
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">
              <EditableText field="teamTitle" defaultText={content.teamTitle} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
            </h2>
            <div className="mt-4 text-lg text-muted-foreground">
              <EditableText field="teamSubhead" defaultText={content.teamSubhead} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" multiline/>
            </div>
          </div>
          <div className="space-y-16">
            {(teamMembers || []).map((member, index) => (
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
                {index < (teamMembers?.length ?? 0) - 1 && (
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
             {teamImage && <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={teamImage.imageUrl}
                  alt={teamImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={teamImage.imageHint}
                />
              </div>}
            <div>
              <h2 className="text-3xl font-bold font-headline mb-4">
                <EditableText field="ctaTitle" defaultText={content.ctaTitle} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
              </h2>
              <div className="text-muted-foreground leading-relaxed mb-6">
                <EditableText field="ctaSubhead" defaultText={content.ctaSubhead} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" multiline />
              </div>
               <Button asChild>
                <Link href="/contacto">
                  <EditableText field="ctaButton" defaultText={content.ctaButton} isLoading={isLoading} collectionId="pageContent" docId="quienes-somos" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
