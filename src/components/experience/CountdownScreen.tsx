import { motion } from "framer-motion";
import { Countdown } from "./Countdown";
import { StarField } from "./StarField";
import { DustParticles } from "./Particles";

export function CountdownScreen({
  target,
  accelerate,
  onComplete,
}: {
  target: Date;
  accelerate: boolean;
  onComplete: () => void;
}) {
  return (
    <motion.section
      className="relative grid min-h-[100svh] place-items-center overflow-hidden px-6"
      animate={accelerate ? { filter: ["blur(0px)", "blur(2px)", "blur(0px)"] } : {}}
      transition={accelerate ? { duration: 0.5, repeat: 10 } : {}}
    >
      <StarField density={accelerate ? 1.4 : 1} />
      <DustParticles count={50} />
      <motion.div
        aria-hidden
        animate={{ opacity: accelerate ? [0.2, 0.8, 0.2] : 0.25 }}
        transition={{ duration: accelerate ? 0.4 : 6, repeat: Infinity }}
        className="absolute inset-0 aurora-bg"
      />
      <div className="relative z-10 flex flex-col items-center gap-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="font-display text-2xl sm:text-3xl text-foreground/90 max-w-md leading-snug"
        >
          {accelerate ? "It's almost time…" : "Some moments take years to arrive…"}
        </motion.p>
        <Countdown target={target} accelerate={accelerate} onComplete={onComplete} />
        {!accelerate && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.2, duration: 1.4 }}
            className="text-xs sm:text-sm tracking-[0.25em] uppercase text-muted-foreground"
          >
            Come back when the clock reaches your moment
          </motion.p>
        )}
      </div>

      {accelerate && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0, 0.6, 0, 1] }}
          transition={{ duration: 5, times: [0, 0.3, 0.45, 0.7, 0.85, 1] }}
          style={{ background: "radial-gradient(circle at 50% 50%, oklch(1 0 0 / 0.95), transparent 70%)" }}
        />
      )}
    </motion.section>
  );
}
