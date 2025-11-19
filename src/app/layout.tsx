import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { Cinzel, Lato } from 'next/font/google';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase';
import AdminLayout from '@/components/admin-layout';
import { SITE_NAME, SITE_URL, seoConfig, getOrganizationSchema } from '@/lib/seo';
import Script from 'next/script';
import CookieConsent from '@/components/cookie-consent';
import { configureConsole } from '@/lib/console-config';

// Configure console logging
if (typeof window !== 'undefined') {
  configureConsole();
}

const defaultDescription = seoConfig.pages.home.description;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Estrategias legales empresariales`,
    template: `%s | ${SITE_NAME}`,
  },
  description: defaultDescription,
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon.png',
      type: 'image/png',
    },
    {
      rel: 'shortcut icon',
      url: '/favicon.png',
      type: 'image/png',
    },
    {
      rel: 'apple-touch-icon',
      url: '/favicon.png',
      type: 'image/png',
    },
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} | Estrategias legales empresariales`,
    description: defaultDescription,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
        alt: `${SITE_NAME} logotipo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Estrategias legales empresariales`,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
  weight: ['400', '700'],
});

const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn('dark', cinzel.variable, lato.variable)}>
      <body className="font-body bg-background text-foreground antialiased overflow-x-hidden min-h-screen mobile-safe">
        <div className="min-h-screen overflow-x-hidden relative mobile-safe">
          <FirebaseClientProvider>
            <AdminLayout>
              <Header />
              <main className="overflow-x-hidden mobile-safe">{children}</main>
            </AdminLayout>
            <Footer />
            <Toaster />
            <CookieConsent />
            <Script id="org-schema" type="application/ld+json" strategy="afterInteractive">
              {JSON.stringify(getOrganizationSchema())}
            </Script>
          </FirebaseClientProvider>
        </div>
      </body>
    </html>
  );
}
