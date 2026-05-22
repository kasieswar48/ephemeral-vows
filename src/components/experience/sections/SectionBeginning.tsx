import { motion } from "framer-motion";
import { StarField } from "../StarField";
import { herName } from "@/config/experience";

export function SectionBeginning() {
  return (
    <section className="relative grid min-h-[100svh] place-items-center overflow-hidden px-6 py-32">
      <StarField density={0.4} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 50%, oklch(0.22 0.05 60 / 0.45), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2 }}
          className="mb-8 text-[10px] uppercase tracking-[0.5em] text-muted-foreground"
        >
          i — the moment
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
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
          whileInView={{ opacity: 0.82, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ delay: 0.3, duration: 1.4 }}
          className="mt-12 text-lg sm:text-xl text-foreground/85 font-display font-light leading-[1.7]"
        >
          In this endless universe of passing moments,
          <br />
          you became one of the few feelings that quietly stayed.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1.6 }}
          className="mx-auto my-12 h-px w-32 origin-center bg-gradient-to-r from-transparent via-foreground/30 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ delay: 0.8, duration: 1.4 }}
          className="mx-auto max-w-2xl text-[15px] sm:text-base leading-[2.2] text-muted-foreground font-light"
        >
          Maybe not every story is perfect.
          <br />
          Maybe not every connection arrives at the right time.
          <br />
          But some people still leave a mark on your soul,
          <br />
          <span className="text-foreground/80">without even trying.</span>
        </motion.p>
      </div>
    </section>
  );
}
