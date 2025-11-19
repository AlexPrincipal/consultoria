'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ConsentValue = 'accepted' | 'rejected';

const COOKIE_NAME = 'cookie-consent';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function readConsentCookie(): ConsentValue | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + COOKIE_NAME + '=([^;]*)'));
  return match ? (decodeURIComponent(match[1]) as ConsentValue) : null;
}

function writeConsentCookie(value: ConsentValue) {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
}

function clearConsentCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export default function CookieConsent({ className }: { className?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const current = readConsentCookie();
    setVisible(!current);

    const openHandler = () => {
      clearConsentCookie();
      setVisible(true);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('open-cookie-consent', openHandler as EventListener);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('open-cookie-consent', openHandler as EventListener);
      }
    };
  }, []);

  const accept = () => {
    writeConsentCookie('accepted');
    setVisible(false);
  };

  const reject = () => {
    writeConsentCookie('rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 px-4 pb-4',
        className
      )}
      role="region"
      aria-label="Aviso de cookies"
    >
      <div className="mx-auto max-w-3xl rounded-lg border border-primary/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 shadow-lg">
        <div className="p-4 md:p-5">
          <p className="text-sm md:text-base text-muted-foreground">
            Usamos cookies para mejorar tu experiencia, analizar el uso del sitio y, si aceptas, habilitar funciones opcionales. Puedes cambiar tu decisión en cualquier momento.
            Consulta nuestra{' '}
            <Link href="/politica-de-cookies" className="underline hover:text-primary">
              Política de Cookies
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={reject} className="order-2 sm:order-1">
              Rechazar
            </Button>
            <Button onClick={accept} className="order-1 sm:order-2">
              Aceptar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
