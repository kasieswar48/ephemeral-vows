import { motion } from "framer-motion";
import { StarField } from "../StarField";
import { herName } from "@/config/experience";

export function SectionFinal() {
  return (
    <section className="relative grid min-h-[100svh] place-items-center overflow-hidden px-6 py-32">
      <StarField density={0.55} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 50%, oklch(0.25 0.06 65 / 0.35), transparent 75%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
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
          className="font-display font-light text-foreground text-glow leading-[1.15] text-[2rem] sm:text-[3.5rem]"
        >
          Once again,
          <br />
          <span className="bg-gradient-to-r from-[oklch(0.92_0.08_80)] via-[oklch(0.82_0.13_65)] to-[oklch(0.72_0.13_50)] bg-clip-text text-transparent">
            Happy Birthday, {herName}.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 0.78, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ delay: 0.4, duration: 1.4 }}
          className="mt-12 font-display text-lg sm:text-xl font-light text-foreground/80 leading-[1.85]"
        >
          Maybe this universe never truly stands still.
          <br />
          Stars drift.
          <br />
          Worlds change.
          <br />
          People lose and find each other again.
          <br />
          But if there&apos;s one thing I hope lasts endlessly…
          <br />
          <span className="text-foreground">it&apos;s this strange, beautiful connection between us.</span>
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
          whileInView={{ opacity: 0.55 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1.6 }}
          className="text-xs sm:text-sm italic tracking-wide text-muted-foreground font-light leading-[1.8]"
        >
          — like the universe itself,
          <br />
          I hope some part of us never truly ends.
        </motion.p>
      </div>
    </section>
  );
}
