
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react';
import Logo from '@/components/logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/quienes-somos', label: 'Quiénes Somos' },
  {
    label: 'Servicios',
    isDropdown: true,
    href: '/servicios',
    items: [
      { href: '/servicios', label: 'Todos los Servicios' },
      { href: '/servicios/asesoria-consultoria-legal', label: 'Asesoría y Consultoría' },
      { href: '/servicios/representacion-defensa', label: 'Representación y Defensa' },
      { href: '/servicios/masc', label: 'MASC' },
      { href: '/servicios/gestion-tramites', label: 'Gestión y Trámites' },
      { href: '/servicios/area-empresarial-especifica', label: 'Área Empresarial Específica' },
      { href: '/servicios/compliance', label: 'Compliance' },
      { href: '/servicios/comercio-internacional', label: 'Comercio Internacional' },
    ]
  },
  { href: '/por-que-escogernos', label: '¿Por qué nosotros?' },
  { href: '/nuestras-oficinas', label: 'Oficinas' },
  { href: '/faq', label: 'FAQ' },
];

if (process.env.NODE_ENV === 'development') {
  navLinks.push({ href: '/admin', label: 'Admin' });
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 10) {
        setIsScrolled(true);
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setShow(false);
        } else {
          // Scrolling up
          setShow(true);
        }
      } else {
        setIsScrolled(false);
        setShow(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isServiceRouteActive = pathname.startsWith('/servicios');

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-background/95 backdrop-blur-sm border-b border-white/10' : 'bg-transparent',
        show ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="container mx-auto flex h-28 items-center justify-between px-4 md:px-6">
        <Link href="/" className="relative w-32 h-28">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
            link.isDropdown && link.items ? (
            <DropdownMenu key={link.label}>
                <DropdownMenuTrigger className={cn("flex items-center text-sm font-medium uppercase tracking-widest text-gray-300 hover:text-primary transition-colors focus:outline-none",
                  isServiceRouteActive && "text-primary"
                )}>
                {link.label}
                <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-background border-border/50'>
                {link.items.map((item) => (
                    <DropdownMenuItem key={item.label} asChild>
                    <Link href={item.href} className={cn("cursor-pointer", pathname === item.href ? "text-primary" : "text-white")}>{item.label}</Link>
                    </DropdownMenuItem>
                ))}
                </DropdownMenuContent>
            </DropdownMenu>
            ) : (
            <Link key={link.label} href={link.href!} className={cn("text-sm font-medium uppercase tracking-widest text-gray-300 hover:text-primary transition-colors", pathname === link.href && "text-primary")}>
                {link.label}
            </Link>
            )
        ))}
        </nav>
        <div className="flex items-center space-x-2">
            <div className="hidden md:block">
                <Button asChild size="sm">
                    <Link href="/contacto">Consulta</Link>
                </Button>
            </div>
            <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6 text-white" />
                    <span className="sr-only">Abrir menú</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-background border-l-stone-800 w-[80vw]">
                    <SheetHeader className="p-4 border-b border-border flex flex-row items-center justify-between">
                        <SheetTitle asChild>
                           <Link href="/" onClick={() => setOpen(false)} className="relative w-32 h-10 block">
                                <Logo />
                            </Link>
                        </SheetTitle>
                    </SheetHeader>
                <div className="flex flex-col h-[calc(100%-73px)]">
                    <nav className="flex flex-col space-y-2 p-4">
                    {navLinks.map((link) => (
                        link.isDropdown && link.items ? (
                        <div key={link.label} className="flex flex-col space-y-2">
                            <span className={cn("text-lg font-semibold text-white uppercase tracking-wider", isServiceRouteActive && "text-primary")}>{link.label}</span>
                            {link.items.map(item => (
                            <Link key={item.label} href={item.href} className={cn("text-gray-400 hover:text-primary pl-4", pathname === item.href && "text-primary font-semibold")} onClick={() => setOpen(false)}>
                                {item.label}
                            </Link>
                            ))}
                        </div>
                        ) : (
                        <Link key={link.label} href={link.href!} className={cn("text-lg text-gray-300 hover:text-primary uppercase tracking-wider", pathname === link.href && "text-primary")} onClick={() => setOpen(false)}>
                            {link.label}
                        </Link>
                        )
                    ))}
                    </nav>
                    <div className="mt-auto p-4 border-t border-border">
                    <Button className="w-full" asChild>
                        <Link href="/contacto" onClick={() => setOpen(false)}>Agenda Consulta</Link>
                    </Button>
                    </div>
                </div>
                </SheetContent>
            </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
