import { motion } from "framer-motion";
import { StarField } from "./StarField";
import { DustParticles } from "./Particles";

export function EnterGate({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2 } }}
      className="fixed inset-0 z-[60] grid place-items-center overflow-hidden bg-background"
    >
      <StarField density={0.7} />
      <DustParticles count={30} />
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="text-[11px] uppercase tracking-[0.5em] text-muted-foreground"
        >
          A quiet letter, in light
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 0.2 }}
          className="font-display text-4xl sm:text-6xl font-light text-foreground text-glow-soft max-w-xl leading-tight"
        >
          Some moments take years to arrive…
        </motion.h1>
        <motion.button
          onClick={onEnter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="glass-strong ring-glow breathing mt-4 rounded-full px-10 py-4 text-sm uppercase tracking-[0.35em] text-foreground"
        >
          Tap to Enter
        </motion.button>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2 }}
          className="text-xs text-muted-foreground"
        >
          Best experienced with sound · on mobile
        </motion.p>
      </div>
    </motion.div>
  );
}
