import { Info } from 'lucide-react';
import type { ReactNode } from 'react';

/** Petite étiquette « Démo » à côté d'une interaction simulée. */
export function DemoTag({ children = 'Démo' }: { children?: ReactNode }) {
  return <span className="demo-tag">{children}</span>;
}

/** Note explicative sur le caractère simulé ou fictif d'un contenu. */
export default function DemoNote({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-start gap-2 text-xs leading-relaxed text-muted ${className}`}>
      <Info size={14} className="mt-0.5 shrink-0 text-lagoon" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
