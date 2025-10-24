
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, ShieldCheck, Scale, FileText, Building, GitBranch, Anchor } from 'lucide-react';
import Logo from '@/components/logo';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const services = [
  {
    icon: <Briefcase />,
    title: "Asesoría y Consultoría Legal",
    href: "/servicios/asesoria-consultoria-legal",
    color: "bg-blue-200/20 hover:bg-blue-300/30 text-blue-100",
  },
  {
    icon: <Scale />,
    title: "Representación y Defensa",
    href: "/servicios/representacion-defensa",
    color: "bg-green-200/20 hover:bg-green-300/30 text-green-100",
  },
   {
    icon: <Anchor />,
    title: "Comercio Internacional",
    href: "/servicios/comercio-internacional",
     color: "bg-pink-200/20 hover:bg-pink-300/30 text-pink-100",
  },
  {
    icon: <GitBranch />,
    title: "MASC",
    href: "/servicios/masc",
    color: "bg-purple-200/20 hover:bg-purple-300/30 text-purple-100",
  },
  {
    icon: <FileText />,
    title: "Gestión y Trámites",
    href: "/servicios/gestion-tramites",
    color: "bg-yellow-200/20 hover:bg-yellow-300/30 text-yellow-100",
  },
  {
    icon: <Building />,
    title: "Área Empresarial Específica",
    href: "/servicios/area-empresarial-especifica",
    color: "bg-red-200/20 hover:bg-red-300/30 text-red-100",
  },
  {
    icon: <ShieldCheck />,
    title: "Compliance",
    href: "/servicios/compliance",
    color: "bg-indigo-200/20 hover:bg-indigo-300/30 text-indigo-100",
  },
];

function CircularMenu() {
    return (
        <div className="relative w-[700px] h-[700px]">
        {/* Center Logo */}
        <div className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none">
          <div className="w-56 h-56 bg-card flex justify-center items-center rounded-lg shadow-2xl p-4">
            <Logo />
          </div>
        </div>
        
        {/* Service Bubbles */}
        {services.map((service, index) => {
            const angle = (index / services.length) * (2 * Math.PI); // Angle in radians
            const radius = 280; // Circle radius
            const itemSize = 192; // Width/height of the bubble
            const containerSize = 700;
            
            // Calculate position
            const x = (containerSize / 2) + radius * Math.cos(angle - Math.PI / 2) - (itemSize / 2);
            const y = (containerSize / 2) + radius * Math.sin(angle - Math.PI / 2) - (itemSize / 2);

            return (
                <Link
                  href={service.href}
                  key={service.title}
                  className={cn(
                      "absolute flex flex-col items-center justify-center w-48 h-48 rounded-full transition-all duration-300 transform hover:scale-110 hover:z-20",
                      "text-center p-4 backdrop-blur-sm border border-white/10",
                      service.color
                  )}
                  style={{
                      top: `${y}px`,
                      left: `${x}px`,
                  }}
                  >
                  <div className="w-10 h-10 text-white [&>svg]:w-full [&>svg]:h-full">
                      {service.icon}
                  </div>
                  <h3 className="mt-2 font-headline text-base text-white">{service.title}</h3>
              </Link>
            )
        })}
      </div>
    );
}

export default function ServicesPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">Nuestras Prácticas</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Brindamos soluciones legales integrales, diseñadas para proteger y fortalecer su empresa en cada etapa de su desarrollo. Explore nuestras áreas de especialización.
            </p>
          </div>

          {/* Desktop Circular Menu */}
          <div className="hidden md:flex justify-center items-center">
            {isClient ? <CircularMenu /> : (
                 <div className="relative w-[700px] h-[700px] flex items-center justify-center">
                    <Skeleton className="w-56 h-56 rounded-lg" />
                    {[...Array(7)].map((_, i) => {
                         const angle = (i / 7) * (2 * Math.PI);
                         const radius = 280;
                         const itemSize = 192;
                         const containerSize = 700;
                         const x = (containerSize / 2) + radius * Math.cos(angle - Math.PI / 2) - (itemSize / 2);
                         const y = (containerSize / 2) + radius * Math.sin(angle - Math.PI / 2) - (itemSize / 2);
                        return <Skeleton key={i} className="w-48 h-48 rounded-full absolute" style={{ top: `${y}px`, left: `${x}px` }}/>
                    })}
                 </div>
            )}
          </div>

          {/* Mobile Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-6">
            {services.map((service) => (
              <Link href={service.href} key={service.title}>
                 <div className={cn(
                    "flex flex-col items-center justify-center p-6 rounded-lg h-full text-center transition-all duration-300 transform hover:scale-105",
                    "backdrop-blur-sm border border-white/10",
                    service.color
                 )}>
                    <div className="w-10 h-10 text-white [&>svg]:w-full [&>svg]:h-full">
                        {service.icon}
                    </div>
                   <h3 className="mt-4 font-headline text-lg font-semibold text-white">{service.title}</h3>
                 </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
