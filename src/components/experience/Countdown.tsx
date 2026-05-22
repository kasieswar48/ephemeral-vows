import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s, ms };
}

function Cell({ label, value, accelerate }: { label: string; value: number; accelerate?: boolean }) {
  const str = value.toString().padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="glass ring-glow relative overflow-hidden rounded-2xl px-4 py-5 sm:px-7 sm:py-7 min-w-[72px] sm:min-w-[110px]">
        <div className="absolute inset-0 aurora-bg opacity-30" />
        <AnimatePresence mode="popLayout">
          <motion.div
            key={str}
            initial={{ y: accelerate ? -8 : -28, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: accelerate ? 8 : 28, opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: accelerate ? 0.08 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative font-display text-5xl sm:text-7xl font-light text-foreground text-glow tabular-nums"
          >
            {str}
          </motion.div>
        </AnimatePresence>
      </div>
      <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function Countdown({
  target,
  accelerate = false,
  onComplete,
}: {
  target: Date;
  accelerate?: boolean;
  onComplete?: () => void;
}) {
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    if (accelerate) {
      // fast spin for 5s
      const start = performance.now();
      const id = setInterval(() => {
        const elapsed = performance.now() - start;
        setT({
          d: Math.floor(Math.random() * 99),
          h: Math.floor(Math.random() * 24),
          m: Math.floor(Math.random() * 60),
          s: Math.floor(Math.random() * 60),
          ms: 0,
        });
        if (elapsed > 4800) {
          clearInterval(id);
          setT({ d: 0, h: 0, m: 0, s: 0, ms: 0 });
          onComplete?.();
        }
      }, 60);
      return () => clearInterval(id);
    }
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target, accelerate, onComplete]);

  const sep = (
    <motion.span
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="hidden sm:block font-display text-5xl sm:text-6xl text-primary/60 mt-2"
    >
      ·
    </motion.span>
  );

  return (
    <div className="flex items-start justify-center gap-2 sm:gap-4">
      <Cell label="Days" value={t.d} accelerate={accelerate} />
      {sep}
      <Cell label="Hours" value={t.h} accelerate={accelerate} />
      {sep}
      <Cell label="Minutes" value={t.m} accelerate={accelerate} />
      {sep}
      <Cell label="Seconds" value={t.s} accelerate={accelerate} />
    </div>
  );
}
