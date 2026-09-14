import React from 'react';
import { Atom, BookOpen, Globe, Pencil, Sigma } from 'lucide-react';

interface Floater {
  Icon: typeof BookOpen;
  top: string;
  left: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  variant: 'a' | 'b' | 'c';
}

const ICONS = [BookOpen, Pencil, Sigma, Atom, Globe];

const FLOATERS: Floater[] = [
  { Icon: BookOpen, top: '8%', left: '4%', size: 22, opacity: 0.14, duration: 26, delay: 0, variant: 'a' },
  { Icon: Atom, top: '12%', left: '18%', size: 18, opacity: 0.1, duration: 34, delay: 4, variant: 'b' },
  { Icon: Sigma, top: '6%', left: '34%', size: 24, opacity: 0.12, duration: 30, delay: 2, variant: 'c' },
  { Icon: Globe, top: '15%', left: '52%', size: 20, opacity: 0.16, duration: 38, delay: 8, variant: 'a' },
  { Icon: Pencil, top: '9%', left: '72%', size: 16, opacity: 0.12, duration: 24, delay: 6, variant: 'b' },
  { Icon: BookOpen, top: '18%', left: '90%', size: 26, opacity: 0.1, duration: 40, delay: 1, variant: 'c' },

  { Icon: Pencil, top: '28%', left: '8%', size: 20, opacity: 0.15, duration: 32, delay: 10, variant: 'b' },
  { Icon: Sigma, top: '34%', left: '26%', size: 17, opacity: 0.1, duration: 28, delay: 5, variant: 'a' },
  { Icon: BookOpen, top: '30%', left: '44%', size: 24, opacity: 0.13, duration: 36, delay: 12, variant: 'c' },
  { Icon: Atom, top: '38%', left: '62%', size: 19, opacity: 0.17, duration: 30, delay: 3, variant: 'b' },
  { Icon: Globe, top: '27%', left: '80%', size: 22, opacity: 0.12, duration: 42, delay: 14, variant: 'a' },
  { Icon: Pencil, top: '44%', left: '94%', size: 18, opacity: 0.14, duration: 26, delay: 9, variant: 'c' },

  { Icon: Atom, top: '52%', left: '5%', size: 24, opacity: 0.11, duration: 40, delay: 7, variant: 'c' },
  { Icon: Globe, top: '58%', left: '22%', size: 17, opacity: 0.16, duration: 30, delay: 11, variant: 'a' },
  { Icon: Pencil, top: '50%', left: '38%', size: 21, opacity: 0.12, duration: 28, delay: 2, variant: 'b' },
  { Icon: BookOpen, top: '62%', left: '56%', size: 19, opacity: 0.15, duration: 36, delay: 15, variant: 'a' },
  { Icon: Sigma, top: '54%', left: '74%', size: 23, opacity: 0.1, duration: 34, delay: 4, variant: 'c' },
  { Icon: Globe, top: '68%', left: '90%', size: 16, opacity: 0.13, duration: 26, delay: 8, variant: 'b' },

  { Icon: Pencil, top: '78%', left: '10%', size: 18, opacity: 0.14, duration: 32, delay: 1, variant: 'a' },
  { Icon: BookOpen, top: '84%', left: '30%', size: 25, opacity: 0.1, duration: 38, delay: 9, variant: 'b' },
  { Icon: Sigma, top: '76%', left: '48%', size: 17, opacity: 0.16, duration: 30, delay: 13, variant: 'c' },
  { Icon: Atom, top: '88%', left: '66%', size: 20, opacity: 0.12, duration: 36, delay: 5, variant: 'a' },
  { Icon: Globe, top: '80%', left: '82%', size: 24, opacity: 0.11, duration: 44, delay: 3, variant: 'b' },
  { Icon: Pencil, top: '94%', left: '40%', size: 15, opacity: 0.13, duration: 28, delay: 10, variant: 'c' },
];

export function FloatingBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {FLOATERS.map((f, i) => {
        const IconCmp = f.Icon || ICONS[i % ICONS.length];
        return (
          <span
            key={i}
            className={`bg-floater bg-floater-${f.variant}`}
            style={{
              top: f.top,
              left: f.left,
              width: f.size,
              height: f.size,
              opacity: f.opacity,
              animationDuration: `${f.duration}s`,
              animationDelay: `-${f.delay}s`,
            }}
          >
            <IconCmp strokeWidth={1.4} className="h-full w-full" />
          </span>
        );
      })}
    </div>
  );
}