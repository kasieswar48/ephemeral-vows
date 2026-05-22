import { motion } from "framer-motion";
import { DustParticles } from "../Particles";

const lines = [
  "There are people you meet,",
  "and people who quietly become a season in your life.",
  "You were the season I didn't see coming.",
  "We didn't always speak.",
  "We didn't always know what to say.",
  "But every time the silence cracked open,",
  "it was your voice on the other side.",
  "If today is a year you turn,",
  "let it turn gently.",
  "Let it bring you the softness you give everyone else.",
  "And know — wherever I am — I'm hoping for you.",
];

export function SectionLetter() {
  return (
    <section className="relative overflow-hidden px-6 py-40">
      <motion.div
        aria-hidden
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "linear-gradient(120deg, oklch(0.35 0.18 290), oklch(0.45 0.18 340), oklch(0.3 0.15 250), oklch(0.4 0.18 320))",
          backgroundSize: "300% 300%",
          filter: "blur(60px)",
        }}
      />
      <div className="absolute inset-0 bg-background/40" />
      <DustParticles count={35} />
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="mb-12 text-[10px] uppercase tracking-[0.5em] text-muted-foreground">iv — the letter</p>
        <div className="space-y-6">
          {lines.map((l, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-xl sm:text-3xl font-light text-foreground/95 leading-relaxed"
            >
              {l}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
