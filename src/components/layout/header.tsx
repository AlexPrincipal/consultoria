
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#quienes-somos', label: 'Quiénes Somos' },
  { href: '#testimoniales', label: 'Testimoniales' },
  { href: '#faq', label: 'FAQ' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent',
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-xl font-bold font-headline text-white">
          CMXS Jurídico
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button>Agenda Consulta</Button>
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
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-border">
                  <Link href="/" className="text-lg font-bold font-headline text-white" onClick={() => setOpen(false)}>
                    CMXS Jurídico
                  </Link>
                   <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                      <X className="h-6 w-6 text-white" />
                      <span className="sr-only">Cerrar menú</span>
                    </Button>
                </div>
                <nav className="flex flex-col space-y-4 p-4">
                  {navLinks.map((link) => (
                    <Link key={link.label} href={link.href} className="text-lg text-gray-300 hover:text-white" onClick={() => setOpen(false)}>
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto p-4 border-t border-border">
                   <Button className="w-full">Agenda Consulta</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
