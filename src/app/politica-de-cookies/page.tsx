import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description:
    'Información sobre el uso de cookies, finalidad, conservación y cómo administrar tu consentimiento.',
};

export default function CookiePolicyPage() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-10 md:py-16 prose prose-invert max-w-3xl">
      <h1>Política de Cookies</h1>
      <p>
        Utilizamos cookies para mejorar tu experiencia de navegación, analizar el rendimiento del sitio y, si
        lo aceptas, habilitar funcionalidades opcionales. Puedes aceptar o rechazar el uso de cookies no
        esenciales en cualquier momento desde el aviso de cookies.
      </p>
      <h2>¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio
        web. Pueden ser propias (establecidas por este sitio) o de terceros.
      </p>
      <h2>Tipos de cookies que podemos utilizar</h2>
      <ul>
        <li>
          <strong>Necesarias:</strong> Imprescindibles para el funcionamiento básico del sitio. No requieren
          consentimiento.
        </li>
        <li>
          <strong>Analíticas/Medición:</strong> Nos ayudan a entender cómo se usa el sitio para mejorar su
          rendimiento.
        </li>
        <li>
          <strong>Funcionales:</strong> Recuerdan tus preferencias para ofrecer una experiencia personalizada.
        </li>
      </ul>
      <h2>Gestión del consentimiento</h2>
      <p>
        Puedes aceptar o rechazar cookies no necesarias desde el aviso de cookies. También puedes configurar tu
        navegador para bloquear o eliminar cookies.
      </p>
      <h2>Contacto</h2>
      <p>
        Si tienes preguntas sobre esta política, contáctanos a través de los medios publicados en este sitio.
      </p>
    </section>
  );
}
