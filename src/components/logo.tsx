
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Jurídico Empresarial y Comercial Logo"
      width={960}
      height={288}
      className={cn("w-48 h-auto object-contain", className)}
      priority
    />
  );
}
