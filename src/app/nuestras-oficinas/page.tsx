
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import AnimatedSection from '@/components/animated-section';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import EditableText from '@/components/editable-text';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

const officeImageIds = ['oficina-1', 'oficina-2', 'oficina-3', 'oficina-4'];
const officeImages = PlaceHolderImages.filter(p => officeImageIds.includes(p.id)).map(image => ({
    src: image.imageUrl,
    alt: image.description,
    hint: image.imageHint,
    id: image.id
}));

const defaultContent = {
  title: 'Un Espacio a la Altura de sus Negocios',
  subhead: 'Le invitamos a un recorrido virtual por nuestras instalaciones, diseñadas para la excelencia, la confidencialidad y la colaboración estratégica.',
  sectionTitle: 'Nuestros Espacios',
  office1Title: 'Una Bienvenida Profesional',
  office1Desc: 'Nuestro lobby recibe a clientes con elegancia y profesionalismo.',
  office2Title: 'Decisiones Estratégicas', 
  office2Desc: 'Salas de conferencias equipadas para negociaciones importantes.',
  office3Title: 'Innovación y Colaboración',
  office3Desc: 'Espacios modernos que fomentan el trabajo en equipo.',
  office4Title: 'Confidencialidad y Enfoque',
  office4Desc: 'Oficinas privadas para consultas delicadas.'
};


export default function NuestrasOficinasPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const firestore = useFirestore();
  const contentRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'pageContent', 'oficinas') : null),
    [firestore]
  );
  const { data: pageData, isLoading } = useDoc(contentRef);
  const content = pageData || defaultContent;

  const getOfficeTitle = (index: number) => {
    switch(index) {
      case 0: return content.office1Title ?? defaultContent.office1Title;
      case 1: return content.office2Title ?? defaultContent.office2Title;
      case 2: return content.office3Title ?? defaultContent.office3Title;
      case 3: return content.office4Title ?? defaultContent.office4Title;
      default: return 'Oficina';
    }
  };

  const getOfficeDesc = (index: number) => {
    switch(index) {
      case 0: return content.office1Desc ?? defaultContent.office1Desc;
      case 1: return content.office2Desc ?? defaultContent.office2Desc;
      case 2: return content.office3Desc ?? defaultContent.office3Desc;
      case 3: return content.office4Desc ?? defaultContent.office4Desc;
      default: return 'Descripción de oficina';
    }
  };

  return (
    <div className="bg-background text-white min-h-[calc(100vh-7rem)]">
      <AnimatedSection className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">
              <EditableText field="title" defaultText={content.title} isLoading={isLoading} collectionId="pageContent" docId="oficinas" />
            </h1>
            <div className="mt-4 text-lg text-muted-foreground">
              <EditableText field="subhead" defaultText={content.subhead} isLoading={isLoading} collectionId="pageContent" docId="oficinas" multiline />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Image Display */}
            <div className="lg:w-2/3 relative aspect-video w-full rounded-lg overflow-hidden shadow-2xl bg-card/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="w-full h-full"
                >
                  <Image
                    src={officeImages[activeIndex].src}
                    alt={officeImages[activeIndex].alt}
                    fill
                    className="object-cover"
                    data-ai-hint={officeImages[activeIndex].hint}
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority={activeIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnails and Description */}
            <div className="lg:w-1/3 flex flex-col justify-between">
              <div>
                <h2 className="font-headline text-3xl text-primary mb-4">
                  <EditableText field="sectionTitle" defaultText={content.sectionTitle} isLoading={isLoading} collectionId="pageContent" docId="oficinas" />
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
                  {officeImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "relative aspect-video rounded-md overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ring-offset-2 ring-offset-background",
                        activeIndex === index ? 'ring-2 ring-primary' : 'ring-0 hover:opacity-80'
                      )}
                    >
                      <Image
                        src={image.src}
                        alt={`Thumbnail of ${image.alt}`}
                        fill
                        className="object-cover"
                        data-ai-hint={image.hint}
                        sizes="150px"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 lg:mt-0 text-left">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <h3 className="font-headline text-2xl text-white mb-2">
                        <EditableText 
                          field={`office${activeIndex + 1}Title`} 
                          defaultText={getOfficeTitle(activeIndex)} 
                          isLoading={isLoading} 
                          collectionId="pageContent" 
                          docId="oficinas" 
                        />
                      </h3>
                      <div className="text-muted-foreground">
                        <EditableText 
                          field={`office${activeIndex + 1}Desc`} 
                          defaultText={getOfficeDesc(activeIndex)} 
                          isLoading={isLoading} 
                          collectionId="pageContent" 
                          docId="oficinas" 
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
