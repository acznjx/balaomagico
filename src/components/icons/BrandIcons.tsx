// src/components/icons/BrandIcons.tsx

/**
 * O lucide-react removeu os ícones de marca nas versões recentes, então os
 * glifos das redes ficam aqui como SVG inline. Traço e proporção seguem o
 * padrão do lucide (viewBox 24, strokeWidth 2), para combinar com os demais.
 *
 * Importe daqui em vez de duplicar SVG pelos componentes:
 *   import { InstagramIcon, FacebookIcon } from "@/components/icons/BrandIcons";
 */

interface IconProps {
  className?: string;
}

export function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}