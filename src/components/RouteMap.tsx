import { useId, useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { CarnetStep } from '../data/carnets';
import { curvedPath, projectSteps } from '../lib/carnets';

/**
 * Carte stylisée d'un itinéraire : les étapes sont placées selon leurs vraies coordonnées
 * (projetées et mises à l'échelle) et reliées par le tracé dégradé de l'orbite Wayorbi.
 */
export default function RouteMap({
  steps,
  activeIndex,
  onSelect,
  label,
  className = '',
}: {
  steps: CarnetStep[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
  label: string;
  className?: string;
}) {
  const id = useId().replace(/:/g, '');
  const reduceMotion = useReducedMotion();
  const points = useMemo(() => projectSteps(steps), [steps]);
  const path = useMemo(() => curvedPath(points), [points]);
  const key = steps.map((s) => s.id).join('-');

  return (
    <svg viewBox="0 0 800 500" className={`h-full w-full select-none overflow-visible ${className}`} role="img" aria-label={label}>
      <defs>
        <linearGradient id={`route-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1fb8de" />
          <stop offset="50%" stopColor="#3d7bf2" />
          <stop offset="100%" stopColor="#b89ede" />
        </linearGradient>
        <pattern id={`dots-${id}`} width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="rgba(184,205,248,0.16)" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill={`url(#dots-${id})`} />
      <path d={path} fill="none" stroke="rgba(184,205,248,0.18)" strokeWidth="3" strokeLinecap="round" />
      <motion.path
        key={key}
        d={path}
        fill="none"
        stroke={`url(#route-${id})`}
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={reduceMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
      />
      {steps.map((step, index) => {
        const { x, y } = points[index];
        const active = index === activeIndex;
        const below = y < 420;
        const marker = (
          <>
            {active && <circle cx={x} cy={y} r={26} fill="rgba(61,123,242,0.22)" stroke="rgba(110,231,249,0.7)" strokeWidth="1.5" />}
            <circle cx={x} cy={y} r={active ? 15 : 12} fill={active ? '#1fb8de' : '#16244d'} stroke={active ? '#ffffff' : '#93c5fd'} strokeWidth={active ? 2.5 : 2} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={active ? '#0e1733' : '#e2e8f0'} style={{ fontFamily: 'Inter, sans-serif' }}>
              {index + 1}
            </text>
            <text
              x={x}
              y={below ? y + 34 : y - 24}
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill={active ? '#ffffff' : '#cbd5e1'}
              style={{ fontFamily: 'Inter, sans-serif', paintOrder: 'stroke', stroke: '#0e1733', strokeWidth: 4, strokeLinejoin: 'round' }}
            >
              {step.city}
            </text>
          </>
        );
        if (!onSelect) return <g key={step.id}>{marker}</g>;
        return (
          <g
            key={step.id}
            role="button"
            tabIndex={0}
            aria-label={`Étape ${index + 1} : ${step.city}`}
            aria-pressed={active}
            onClick={() => onSelect(index)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onSelect(index);
              }
            }}
            className="cursor-pointer focus:outline-none [&:focus-visible>circle:first-of-type]:stroke-white"
          >
            {marker}
          </g>
        );
      })}
    </svg>
  );
}
