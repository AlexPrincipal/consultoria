import Link from 'next/link';
import { Facebook, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and Address */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-headline text-white">CMXS Jurídico</h3>
            <p className="text-sm">
              Dirección de la Firma, No. 123<br />
              Colonia Corporativa, Ciudad, Estado<br />
              CP 12345
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Misión</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Valores</Link></li>
              <li><Link href="#contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:contacto@cmxsjuridico.com" className="hover:text-white transition-colors">contacto@cmxsjuridico.com</a></li>
              <li><a href="tel:+525512345678" className="hover:text-white transition-colors">+52 55 1234 5678</a></li>
            </ul>
          </div>

          {/* Column 4: Social Media and Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Síganos</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-primary transition-colors"><Facebook /></a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-primary transition-colors"><Linkedin /></a>
            </div>
            <Link href="#" className="text-sm hover:text-white transition-colors">Aviso de Privacidad</Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CMXS Jurídico. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
