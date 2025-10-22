import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="C+ Consultoría Legal Logo"
      width={480}
      height={144}
      className={cn("object-contain w-auto h-auto", className)}
      priority
    />
  );
}
