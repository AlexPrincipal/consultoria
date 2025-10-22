"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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
  { 
    label: 'Servicios',
    isDropdown: true,
    href: '/servicios',
    items: [
      { href: '/servicios', label: 'Todos los Servicios' },
      { href: '/servicios/consultoria-creacion-empresas', label: 'Creación de Empresas' },
      { href: '/servicios/compliance', label: 'Compliance' },
      { href: '/servicios/representacion-legal', label: 'Representación Legal' },
    ]
  },
  { href: '/quienes-somos', label: 'Quiénes Somos' },
  { href: '/testimoniales', label: 'Testimoniales' },
  { href: '/faq', label: 'FAQ' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isServiceRouteActive = pathname.startsWith('/servicios');

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors duration-300',
        isScrolled ? 'bg-background/95 backdrop-blur-sm border-b border-white/10' : 'bg-transparent',
      )}
    >
      <div className="container mx-auto flex h-28 items-center justify-between px-4 md:px-6">
        <Link href="/" className="relative w-32 h-28">
          <Logo className="w-full h-auto object-contain" />
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
                    <Link href={item.href} className={cn(pathname === item.href && "text-primary")}>{item.label}</Link>
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
                <SheetContent side="right" className="bg-background border-l-stone-800 w-[80vw] p-0">
                    <SheetHeader className="p-4 border-b border-border flex flex-row justify-between items-center">
                    <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                        <Link href="/" onClick={() => setOpen(false)} className="relative w-32 h-10">
                        <Logo />
                        </Link>
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                        <X className="h-6 w-6 text-white" />
                        <span className="sr-only">Cerrar menú</span>
                        </Button>
                    </SheetHeader>
                <div className="flex flex-col h-full">
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
                        <Link href="/contacto">Agenda Consulta</Link>
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
