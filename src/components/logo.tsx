import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="C+ Consultoría Legal Logo"
      width={160}
      height={48}
      className={cn("object-contain", className)}
      priority
    />
  );
}
