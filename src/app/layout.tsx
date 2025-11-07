import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { Cinzel, Lato } from 'next/font/google';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase';
import AdminToolbar from '@/components/admin-toolbar';

export const metadata: Metadata = {
  title: 'C+ Consultoría Legal',
  description: 'Estrategias legales sólidas para la tranquilidad de su empresa.',
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
      <body className="font-body bg-background text-foreground antialiased pt-14">
        <FirebaseClientProvider>
          <AdminToolbar />
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
