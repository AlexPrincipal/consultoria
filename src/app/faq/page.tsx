import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "¿Cuál es el primer paso para una consulta?",
    answer: "El primer paso es agendar una evaluación inicial a través de nuestro formulario de contacto o llamando directamente a nuestras oficinas. En esta sesión, escucharemos su caso y le explicaremos cómo podemos ayudarle."
  },
  {
    question: "¿Qué tipo de empresas asesoran?",
    answer: "Asesoramos a una amplia gama de empresas, desde startups y PyMEs hasta grandes corporativos en diversas industrias como tecnología, construcción, manufactura y servicios."
  },
  {
    question: "¿Cómo se estructuran sus honorarios?",
    answer: "Ofrecemos diferentes esquemas de honorarios adaptados a las necesidades del cliente, incluyendo igualas mensuales para asesoría continua, tarifas por hora y honorarios fijos por proyecto. La estructura se define con total transparencia desde el inicio."
  },
  {
    question: "¿Manejan casos fuera de la Ciudad de México?",
    answer: "Sí, aunque nuestra sede está en la Ciudad de México, contamos con una red de corresponsales y la capacidad tecnológica para representar y asesorar a clientes en toda la República Mexicana."
  },
    {
    question: "¿Qué es un programa de 'Compliance' y por qué lo necesito?",
    answer: "Un programa de Compliance (o cumplimiento normativo) es un conjunto de políticas y procedimientos diseñados para asegurar que su empresa y sus empleados cumplan con las leyes y regulaciones aplicables. Es crucial para prevenir multas, sanciones, daños a la reputación y para operar de manera ética y sostenible."
  }
]

export default function FAQPage() {
  return (
    <div className="bg-background">
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">Preguntas Frecuentes</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Encuentre respuestas a las dudas más comunes sobre nuestros servicios legales y cómo podemos colaborar.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline text-white">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.answer}
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
