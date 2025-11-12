import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { Cinzel, Lato } from 'next/font/google';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase';
import AdminLayout from '@/components/admin-layout';
import { SITE_NAME, SITE_URL, seoConfig } from '@/lib/seo';

const defaultDescription = seoConfig.pages.home.description;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Estrategias legales empresariales`,
    template: `%s | ${SITE_NAME}`,
  },
  description: defaultDescription,
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
      <body className="font-body bg-background text-foreground antialiased">
        <FirebaseClientProvider>
          <AdminLayout>
            <Header />
            <main>{children}</main>
          </AdminLayout>
          <Footer />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
