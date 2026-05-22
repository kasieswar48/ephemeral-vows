import { motion } from "framer-motion";
import { StarField } from "../StarField";
import { herName } from "@/config/experience";

export function SectionFinal() {
  return (
    <section className="relative grid min-h-[100svh] place-items-center overflow-hidden px-6 py-32">
      <StarField density={0.7} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 50%, oklch(0.25 0.06 65 / 0.40), transparent 75%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="mb-10 text-[10px] uppercase tracking-[0.55em] text-muted-foreground"
        >
          iv — the ending
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light text-foreground text-glow leading-[1.1] text-[2.4rem] sm:text-[4rem]"
        >
          Happy Birthday,
          <br />
          <span className="bg-gradient-to-r from-[oklch(0.92_0.08_80)] via-[oklch(0.82_0.13_65)] to-[oklch(0.72_0.13_50)] bg-clip-text text-transparent">
            {herName}.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 0.85, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ delay: 0.4, duration: 1.4 }}
          className="mt-12 font-display text-xl sm:text-2xl font-light text-foreground/90 leading-[1.7]"
        >
          Maybe this universe is endless.
          <br />
          But somehow,
          <br />
          it still led me back to you.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.6 }}
          className="mx-auto my-14 h-px w-24 origin-center bg-gradient-to-r from-transparent via-foreground/40 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1.6 }}
          className="text-xs sm:text-sm italic tracking-wide text-muted-foreground font-light"
        >
          — for the girl who stayed in my orbit.
        </motion.p>
      </div>
    </section>
  );
}
