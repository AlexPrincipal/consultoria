
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import EditableText from '@/components/editable-text';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';


const defaultFaqItems = [
  {
    qField: "faq1q", qDefault: "¿Cuál es el primer paso para una consulta?",
    aField: "faq1a", aDefault: "El primer paso es agendar una evaluación inicial a través de nuestro formulario de contacto o llamando directamente a nuestras oficinas. En esta sesión, escucharemos su caso y le explicaremos cómo podemos ayudarle."
  },
  {
    qField: "faq2q", qDefault: "¿Qué tipo de empresas asesoran?",
    aField: "faq2a", aDefault: "Asesoramos a una amplia gama de empresas, desde startups y PyMEs hasta grandes corporativos en diversas industrias como tecnología, construcción, manufactura y servicios."
  },
  {
    qField: "faq3q", qDefault: "¿Cómo se estructuran sus honorarios?",
    aField: "faq3a", aDefault: "Ofrecemos diferentes esquemas de honorarios adaptados a las necesidades del cliente, incluyendo igualas mensuales para asesoría continua, tarifas por hora y honorarios fijos por proyecto. La estructura se define con total transparencia desde el inicio."
  },
  {
    qField: "faq4q", qDefault: "¿Manejan casos fuera de la Ciudad de México?",
    aField: "faq4a", aDefault: "Sí, aunque nuestra sede está en la Ciudad de México, contamos con una red de corresponsales y la capacidad tecnológica para representar y asesorar a clientes en toda la República Mexicana."
  },
    {
    qField: "faq5q", qDefault: "¿Qué es un programa de 'Compliance' y por qué lo necesito?",
    aField: "faq5a", aDefault: "Un programa de Compliance (o cumplimiento normativo) es un conjunto de políticas y procedimientos diseñados para asegurar que su empresa y sus empleados cumplan con las leyes y regulaciones aplicables. Es crucial para prevenir multas, sanciones, daños a la reputación y para operar de manera ética y sostenible."
  }
]

export default function FAQPage() {
  const firestore = useFirestore();
  const contentRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'pageContent', 'faq') : null),
    [firestore]
  );

  const { data: pageData, isLoading } = useDoc(contentRef);
  
  const defaultContent = {
      id: 'faq',
      title: 'Preguntas Frecuentes',
      subhead: 'Encuentre respuestas a las dudas más comunes sobre nuestros servicios legales y cómo podemos colaborar.',
  };

  const content = pageData || defaultContent;

  return (
    <div className="bg-background">
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">
              <EditableText field="title" defaultText={content.title} isLoading={isLoading} collectionId="pageContent" docId="faq" />
            </h1>
            <div className="mt-4 text-lg text-muted-foreground">
               <EditableText field="subhead" defaultText={content.subhead} isLoading={isLoading} collectionId="pageContent" docId="faq" multiline />
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {defaultFaqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline text-white">
                     <EditableText field={item.qField} defaultText={content[item.qField] ?? item.qDefault} isLoading={isLoading} collectionId="pageContent" docId="faq" />
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                     <EditableText field={item.aField} defaultText={content[item.aField] ?? item.aDefault} isLoading={isLoading} collectionId="pageContent" docId="faq" multiline />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}
