import { cn } from "@/lib/utils";
import { Landmark } from 'lucide-react';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <Landmark className="h-8 w-8 text-primary" />
        <span className="font-bold text-xl font-headline tracking-wider text-white">C+ Consultoría Legal</span>
    </div>
  );
}
