import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  hint?: string;
}

export interface DropdownGroup {
  label?: string;
  options: DropdownOption[];
}

interface DropdownProps {
  value: string;
  groups: DropdownGroup[];
  onChange: (value: string) => void;
  label?: string;
  align?: 'left' | 'right';
  className?: string;
  buttonClassName?: string;
  title?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  groups,
  onChange,
  label,
  align = 'right',
  className = '',
  buttonClassName = '',
  title,
}) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const flat = groups.flatMap((g) => g.options);
  const current = flat.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title={title || 'Chọn'}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-1 pl-2.5 pr-1.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-sm active:scale-[0.98] transition-all duration-150 text-[11px] font-bold text-slate-700 ${buttonClassName}`}
      >
        {label ? (
          <span className="text-slate-400 font-semibold hidden lg:inline">{label}</span>
        ) : null}
        <span className="text-indigo-700 whitespace-nowrap">
          {current?.label ?? 'Chọn'}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center text-slate-400"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Nền mờ đóng menu khi chạm ra ngoài (mobile) */}
            <div
              className="fixed inset-0 z-30 lg:hidden"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              role="listbox"
              className={`absolute z-40 mt-2 min-w-[168px] max-w-[70vw] rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-xl p-1.5 shadow-[0_18px_50px_-12px_rgba(15,23,42,0.28)] ${
                align === 'right' ? 'right-0' : 'left-0'
              }`}
            >
              {groups.map((g, gi) => (
                <div key={g.label || gi}>
                  {g.label ? (
                    <div className="px-2.5 pt-2 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      {g.label}
                    </div>
                  ) : null}
                  <div className="space-y-0.5">
                    {g.options.map((o) => {
                      const active = o.value === value;
                      return (
                        <button
                          key={o.value}
                          type="button"
                          role="option"
                          aria-selected={active}
                          onClick={() => {
                            onChange(o.value);
                            setOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left text-xs font-bold transition-colors duration-150 ${
                            active
                              ? 'bg-indigo-50 text-indigo-700'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex-1 whitespace-nowrap">{o.label}</span>
                          {o.hint ? (
                            <span className="text-[10px] font-semibold text-slate-400">
                              {o.hint}
                            </span>
                          ) : null}
                          {active ? (
                            <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};