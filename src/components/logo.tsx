import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Jurídico Empresarial y Comercial Logo"
      width={960}
      height={288} // mantiene la relación de aspecto 10:3
      className={cn("w-auto h-auto object-contain", className)}
      priority
      sizes="(max-width: 768px) 120px, (max-width: 1024px) 160px, 200px"
    />
  );
}
