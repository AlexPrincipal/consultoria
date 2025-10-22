import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-40 h-12", className)}>
      <Image
        src="/logo.png"
        alt="C+ Consultoría Legal Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
