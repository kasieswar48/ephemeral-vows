import { useEffect, useState } from "react";
import { previewMode } from "@/config/experience";

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

export function InlineCountdown({ target }: { target: Date }) {
  const [t, setT] = useState(() => diff(target));
  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (previewMode || t.ms === 0) return null;

  const items = [
    { v: t.d, l: "days" },
    { v: t.h, l: "hours" },
    { v: t.m, l: "minutes" },
    { v: t.s, l: "seconds" },
  ];

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {items.map((it, i) => (
        <div
          key={it.l}
          className="glass rounded-full px-4 py-2 sm:px-5 sm:py-2.5 flex items-baseline gap-2"
        >
          <span className="font-display text-lg sm:text-xl text-foreground tabular-nums">
            {it.v.toString().padStart(2, "0")}
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {it.l}
          </span>
          {i < items.length - 1 && (
            <span className="ml-1 text-muted-foreground/40 hidden sm:inline">·</span>
          )}
        </div>
      ))}
    </div>
  );
}
