import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Jurídico Empresarial y Comercial Logo"
      fill
      sizes="(max-width: 768px) 120px, 150px"
      className="object-contain"
      priority
    />
  );
}
