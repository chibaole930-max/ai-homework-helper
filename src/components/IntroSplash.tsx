import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { BookOpenCheck, SkipForward, Sparkles, PenLine, BrainCircuit } from 'lucide-react';

const DURATION = 3200;

const CHIPS = [
  { icon: PenLine, label: 'Soạn bài ghi' },
  { icon: Sparkles, label: 'Giải bài AI' },
  { icon: BrainCircuit, label: 'Thẻ học thông minh' },
];

interface IntroSplashProps {
  onDone: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onDone }) => {
  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const t = setTimeout(onDone, reduced ? 1200 : DURATION + 500);
    const skipT = setTimeout(() => setShowSkip(true), reduced ? 500 : 1600);
    return () => {
      clearTimeout(t);
      clearTimeout(skipT);
    };
  }, [onDone, reduced]);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(1000px 600px at 15% -10%, rgba(129,140,248,0.22), transparent 60%), radial-gradient(900px 620px at 90% 5%, rgba(56,189,248,0.18), transparent 58%), radial-gradient(800px 700px at 95% 95%, rgba(192,132,252,0.16), transparent 55%), radial-gradient(700px 650px at 5% 95%, rgba(52,211,153,0.14), transparent 55%), #f6f7fc',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.45, ease }}
      role="presentation"
    >
      {/* Grid nền nhẹ */}
      <div className="bgfx-grid absolute inset-0 opacity-60" />

      {/* Logo + ring */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="intro-ring absolute inset-0 rounded-[2rem] bg-brand-400/40" />
          <span
            className="intro-ring absolute inset-0 rounded-[2rem] bg-sky-400/30"
            style={{ animationDelay: '0.5s' }}
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-[2rem] bg-gradient-to-tr from-brand-500 via-violet-500 to-sky-400 text-white shadow-2xl shadow-brand-500/40"
          >
            <BookOpenCheck className="h-12 w-12 sm:h-14 sm:w-14 drop-shadow" />
          </motion.div>
        </motion.div>

        {/* Tên thương hiệu */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease }}
        >
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Study<span className="text-gradient-brand">EZ</span>
          </h1>
          <p className="mt-2 text-sm font-semibold text-muted sm:text-base">
            Học giỏi — nhẹ nhàng hơn mỗi ngày
          </p>
        </motion.div>

        {/* Chips đặc trưng */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-2 px-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } },
          }}
        >
          {CHIPS.map(({ icon: Icon, label }) => (
            <motion.span
              key={label}
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#dfe3f4] bg-white/80 px-3.5 py-1.5 text-xs font-bold text-ink shadow-sm backdrop-blur"
            >
              <Icon className="h-3.5 w-3.5 text-brand-500" />
              {label}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-14 left-0 right-0 flex flex-col items-center gap-3">
        <div className="h-1 w-40 overflow-hidden rounded-full bg-[#e3e6f3]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-sky-400"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: DURATION / 1000, ease: 'linear' }}
            data-testid="intro-progress"
          />
        </div>
        {showSkip && (
          <motion.button
            type="button"
            onClick={onDone}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-muted transition-colors hover:bg-white hover:text-ink"
          >
            <SkipForward className="h-3.5 w-3.5" />
            Bỏ qua
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};