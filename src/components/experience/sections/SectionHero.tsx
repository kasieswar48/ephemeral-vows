import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { StarField } from "../StarField";

export function SectionHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const target = getBirthdayTarget();

  return (
    <section ref={ref} className="relative grid min-h-[100svh] place-items-center overflow-hidden px-6">
      <StarField density={0.6} />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, oklch(0.28 0.05 60 / 0.28), transparent 70%)",
        }}
      />
      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="mb-8 text-[10px] sm:text-[11px] uppercase tracking-[0.55em] text-muted-foreground"
        >
          A quiet letter, written in stars
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(14px)", y: 14 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light text-foreground text-glow-soft leading-[1.18] text-[2rem] sm:text-[3.5rem] md:text-[4rem]"
        >
          Maybe the universe was quiet.
          <br />
          But somehow,
          <br />
          <span className="bg-gradient-to-r from-[oklch(0.92_0.08_80)] via-[oklch(0.82_0.13_65)] to-[oklch(0.72_0.13_50)] bg-clip-text text-transparent">
            it kept bringing me back to you.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 0.78, y: 0 }}
          transition={{ duration: 1.6, delay: 1.4 }}
          className="mt-10 max-w-xl text-[15px] sm:text-base leading-[1.9] text-muted-foreground font-light"
        >
          Across distance, silence, time,
          <br className="hidden sm:block" />
          and all the moments life pulled us apart…
          <br />
          some part of me still found its way back to you.
        </motion.p>

        <InlineCountdown target={target} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2.4, duration: 1.4 }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground">scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="block h-8 w-px bg-gradient-to-b from-transparent via-foreground/50 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
