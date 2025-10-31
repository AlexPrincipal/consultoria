
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import AnimatedSection from '@/components/animated-section';

const officeImages = [
  {
    src: '/oficina1.png',
    alt: 'Recepción de nuestras oficinas',
    hint: 'modern office reception',
    title: 'Una Bienvenida Profesional'
  },
  {
    src: '/oficina2.png',
    alt: 'Sala de juntas principal',
    hint: 'conference room meeting',
    title: 'Decisiones Estratégicas'
  },
  {
    src: '/oficina3.png',
    alt: 'Área de trabajo colaborativo',
    hint: 'collaborative workspace office',
    title: 'Innovación y Colaboración'
  },
  {
    src: '/oficina4.png',
    alt: 'Oficina privada con vista',
    hint: 'private office city view',
    title: 'Confidencialidad y Enfoque'
  },
];

export default function NuestrasOficinasPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-background text-white min-h-[calc(100vh-7rem)]">
      <AnimatedSection className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">
              Un Espacio a la Altura de sus Negocios
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Le invitamos a un recorrido virtual por nuestras instalaciones, diseñadas para la excelencia, la confidencialidad y la colaboración estratégica.
            </p>
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
                    className="object-contain"
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
                <h2 className="font-headline text-3xl text-primary mb-4">Nuestros Espacios</h2>
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
                      <h3 className="font-headline text-2xl text-white mb-2">{officeImages[activeIndex].title}</h3>
                      <p className="text-muted-foreground">
                        {officeImages[activeIndex].alt}.
                      </p>
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
