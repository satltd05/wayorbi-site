import { Bike, Bus, Car, Footprints, Plane, Ship, TrainFront, type LucideProps } from 'lucide-react';
import type { JSX } from 'react';
import type { TransportMode } from '../data/carnets';

const ICONS: Record<TransportMode, (props: LucideProps) => JSX.Element> = {
  Train: (p) => <TrainFront {...p} />,
  Bus: (p) => <Bus {...p} />,
  Voiture: (p) => <Car {...p} />,
  Avion: (p) => <Plane {...p} />,
  Bateau: (p) => <Ship {...p} />,
  Vélo: (p) => <Bike {...p} />,
  Marche: (p) => <Footprints {...p} />,
};

export default function TransportIcon({ mode, size = 16, className = '' }: { mode: TransportMode; size?: number; className?: string }) {
  const Icon = ICONS[mode];
  return <Icon size={size} className={className} aria-hidden="true" />;
}
