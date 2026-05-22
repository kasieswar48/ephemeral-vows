import { useEffect, useState } from "react";

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms % 86400000) / 3600000),
    m: Math.floor((ms % 3600000) / 60000),
    s: Math.floor((ms % 60000) / 1000),
    ms,
  };
}

export function InlineCountdown({
  target,
  className = "",
}: {
  target: Date;
  className?: string;
}) {
  const [t, setT] = useState(() => diff(target));
  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (t.ms === 0) return null;

  const parts = [
    { v: t.d, l: "days" },
    { v: t.h, l: "hours" },
    { v: t.m, l: "minutes" },
  ];

  return (
    <div
      className={`flex items-baseline justify-center gap-3 sm:gap-5 text-foreground/85 ${className}`}
    >
      {parts.map((p, i) => (
        <div key={p.l} className="flex items-baseline gap-2">
          <span className="font-display text-xl sm:text-2xl font-light tabular-nums text-glow-soft">
            {p.v.toString().padStart(2, "0")}
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            {p.l}
          </span>
          {i < parts.length - 1 && (
            <span className="ml-1 text-muted-foreground/40">·</span>
          )}
        </div>
      ))}
    </div>
  );
}
