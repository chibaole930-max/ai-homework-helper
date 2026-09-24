import React, { useEffect, useRef } from 'react';

// Các chấm sáng nhỏ — mỗi chấm 1 tốc độ/độ sâu riêng
const PARTICLES = Array.from({ length: 26 }, (_, i) => {
  const seed = (i * 37 + 11) % 97;
  return {
    top: `${(seed * 3.1) % 94 + 3}%`,
    left: `${(seed * 7.7) % 94 + 3}%`,
    size: 2 + (seed % 4),
    depth: 0.4 + ((seed % 5) / 5) * 1.6, // 0.4 -> 2.0
    duration: 9 + (seed % 14) + 's',
    delay: `-${(seed % 9)}s`,
    opacity: 0.25 + (seed % 4) * 0.13,
  };
});

export function FloatingBackground() {
  const layersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !layersRef.current) return;

    const layers = layersRef.current.querySelectorAll<HTMLElement>('[data-depth]');
    let raf = 0;
    let tx = 0;
    let ty = 0;

    const apply = () => {
      layers.forEach((el) => {
        const d = parseFloat(el.dataset.depth || '1');
        el.style.transform = `translate3d(${(tx * d).toFixed(1)}px, ${(ty * d).toFixed(1)}px, 0)`;
      });
    };

    const onMove = (e: MouseEvent) => {
      // Hướng chuyển động ngược cursor -> cảm giác chiều sâu
      tx = (0.5 - e.clientX / window.innerWidth) * 34;
      ty = (0.5 - e.clientY / window.innerHeight) * 26;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={layersRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* 1. Lưới chiều sâu (grid) */}
      <div data-depth="0.25" className="absolute inset-0 bgfx-grid will-change-transform" />

      {/* 2. Aurora orbs — chuyển động nhẹ theo cursor (độ sâu khác nhau) */}
      <div
        data-depth="0.7"
        className="bgfx-orb bgfx-orb-a absolute -top-[20%] -left-[15%] h-[75vmax] w-[75vmax]"
      />
      <div
        data-depth="1.5"
        className="bgfx-orb bgfx-orb-b absolute -bottom-[25%] -right-[15%] h-[65vmax] w-[65vmax]"
      />
      <div
        data-depth="1.0"
        className="bgfx-orb bgfx-orb-c absolute top-[25%] left-[45%] h-[55vmax] w-[55vmax]"
      />

      {/* 3. Rọi sáng nhẹ từ trên — cảm giác "premium light" */}
      <div
        data-depth="0.15"
        className="absolute inset-x-0 top-0 h-56"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0) 100%)',
        }}
      />

      {/* 4. Particles nổi */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          data-depth={p.depth}
          className="absolute will-change-transform"
          style={{ top: p.top, left: p.left }}
        >
          <span
            className="bgfx-particle block"
            style={
              {
                width: p.size,
                height: p.size,
                animationDuration: p.duration,
                animationDelay: p.delay,
                '--p-op': p.opacity,
              } as React.CSSProperties
            }
          />
        </span>
      ))}
    </div>
  );
}