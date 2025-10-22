import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      className={cn("fill-current text-white", className)}
      aria-label="Jurídico Empresarial y Comercial Logo"
    >
      <g fontFamily="serif" fontSize="22" transform="translate(0, 5)">
        {/* C+ part */}
        <text x="5" y="30" fontSize="40" className="font-headline">C</text>
        <path d="M 25 15 L 45 40" stroke="currentColor" strokeWidth="1.5" />
        
        {/* Text part */}
        <g transform="translate(60, 0)" fontFamily="sans-serif" fontSize="11" className="font-body">
          <text x="0" y="14">Jurídico</text>
          <text x="0" y="28">Empresarial</text>
          <text x="0" y="42">y Comercial</text>
        </g>
      </g>
    </svg>
  );
}
