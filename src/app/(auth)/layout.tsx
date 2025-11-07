import RootLayout from '@/app/layout';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // Este layout simplemente re-exporta el RootLayout para aplicar los estilos globales
  // a las páginas de autenticación, sin interferir con la lógica de protección.
  return <>{children}</>;
}
