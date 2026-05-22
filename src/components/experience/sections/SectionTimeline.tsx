import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const points = [
  { title: "In your 9th standard", note: "The first time your name quietly became familiar." },
  { title: "Random conversations", note: "Small conversations that somehow stayed longer than they should have." },
  { title: "Silence", note: "Even distance never fully erased your presence." },
  { title: "Again", note: "Like the universe quietly pulling two paths together again." },
  { title: "Distance", note: "Not every connection disappears just because life creates space." },
  { title: "Still here", note: "After all the pauses, somehow… still here." },
];

function Card({ p, i }: { p: (typeof points)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.3"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const glow = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const dotShadow = useTransform(
    glow,
    (v) => `0 0 ${8 + v * 18}px oklch(0.82 0.12 70 / ${0.3 + v * 0.55})`
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="relative w-full"
    >
      {/* dot */}
      <motion.span
        style={{ boxShadow: dotShadow }}
        className="absolute left-0 sm:left-1/2 top-6 z-10 block h-3 w-3 -translate-x-1/2 rounded-full bg-[oklch(0.85_0.12_70)]"
      />
      <div className={`pl-8 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-12`}>
        <div className={i % 2 === 0 ? "sm:col-start-1 sm:pr-10 sm:text-right" : "sm:col-start-2 sm:pl-10"}>
          <div className="glass rounded-2xl px-6 py-5 sm:px-7 sm:py-6 min-h-[140px] flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              chapter {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-display text-2xl sm:text-[1.7rem] font-light text-foreground">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.note}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SectionTimeline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pathScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-32">
      <div className="relative mx-auto max-w-4xl">
        <header className="mb-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">ii — a few chapters</p>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-light text-foreground text-glow-soft">
            Quietly, in order.
          </h2>
        </header>

        <div className="relative">
          {/* center line — left on mobile, center on sm+ */}
          <div className="pointer-events-none absolute left-0 sm:left-1/2 top-0 bottom-0 -translate-x-1/2">
            <div className="relative h-full w-px overflow-hidden bg-border">
              <motion.div
                style={{ scaleY: pathScale, transformOrigin: "top" }}
                className="absolute inset-0 bg-gradient-to-b from-[oklch(0.85_0.12_70)] via-[oklch(0.72_0.13_55)] to-[oklch(0.55_0.10_50)]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-14 sm:gap-20">
            {points.map((p, i) => (
              <Card key={i} p={p} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
