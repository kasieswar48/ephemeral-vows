import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const points = [
  { title: "9th standard", note: "the year a name first became familiar." },
  { title: "Random conversations", note: "small messages that meant more than they said." },
  { title: "Silence", note: "the chapter neither of us wrote, but both kept." },
  { title: "Again", note: "the soft surprise of you, returning." },
  { title: "Distance", note: "miles that learned to be quiet, not gone." },
  { title: "Still here", note: "after everything — still here." },
];

function Point({ p, i }: { p: (typeof points)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.2"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [i % 2 === 0 ? -30 : 30, 0]);
  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className={`relative flex items-start gap-5 sm:gap-8 ${i % 2 === 0 ? "" : "sm:flex-row-reverse sm:text-right"}`}
    >
      <div className="relative z-10 mt-2 flex-shrink-0">
        <span className="block h-4 w-4 rounded-full bg-primary ring-glow" />
      </div>
      <div className="glass max-w-sm rounded-2xl px-5 py-4 sm:px-6 sm:py-5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">chapter {String(i + 1).padStart(2, "0")}</p>
        <h3 className="mt-1 font-display text-2xl sm:text-3xl text-foreground">{p.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.note}</p>
      </div>
    </motion.div>
  );
}

export function SectionTimeline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pathScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-32">
      <div className="absolute inset-0 aurora-bg opacity-20" />
      <div className="relative mx-auto max-w-3xl">
        <header className="mb-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">ii — the timeline</p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-light text-foreground text-glow-soft">
            A few chapters, in light
          </h2>
        </header>
        <div className="relative">
          {/* Glowing center line */}
          <div className="absolute left-2 sm:left-1/2 top-0 bottom-0 -translate-x-1/2">
            <div className="relative h-full w-px overflow-hidden bg-border">
              <motion.div
                style={{ scaleY: pathScale, transformOrigin: "top" }}
                className="absolute inset-0 bg-gradient-to-b from-primary via-accent to-primary/40 shadow-[0_0_16px_rgba(255,180,220,0.6)]"
              />
            </div>
          </div>
          <div className="space-y-14 sm:space-y-20 pl-8 sm:pl-0">
            {points.map((p, i) => (
              <div key={i} className={`sm:grid sm:grid-cols-2 sm:items-center ${i % 2 === 0 ? "" : ""}`}>
                <div className={i % 2 === 0 ? "sm:pr-12 sm:justify-self-end sm:col-start-1" : "sm:pl-12 sm:col-start-2"}>
                  <Point p={p} i={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
