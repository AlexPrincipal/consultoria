import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Jurídico Empresarial y Comercial Logo"
      fill
      className="object-contain"
      priority
    />
  );
}
