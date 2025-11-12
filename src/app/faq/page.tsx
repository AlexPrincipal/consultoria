
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import EditableText from '@/components/editable-text';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import Script from 'next/script';
import { faqItems, getFaqSchema } from '@/lib/seo';

const editableFaqItems = [
  { qField: 'faq1q', aField: 'faq1a', defaults: faqItems[0] },
  { qField: 'faq2q', aField: 'faq2a', defaults: faqItems[1] },
  { qField: 'faq3q', aField: 'faq3a', defaults: faqItems[2] },
  { qField: 'faq4q', aField: 'faq4a', defaults: faqItems[3] },
  { qField: 'faq5q', aField: 'faq5a', defaults: faqItems[4] },
];

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
  const faqSchema = getFaqSchema();

  return (
    <div className="bg-background">
      <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>
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
              {editableFaqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline text-white">
                     <EditableText field={item.qField} defaultText={content[item.qField] ?? item.defaults.question} isLoading={isLoading} collectionId="pageContent" docId="faq" />
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                     <EditableText field={item.aField} defaultText={content[item.aField] ?? item.defaults.answer} isLoading={isLoading} collectionId="pageContent" docId="faq" multiline />
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
