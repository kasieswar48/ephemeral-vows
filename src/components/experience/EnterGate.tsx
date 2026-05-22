import { motion } from "framer-motion";
import { StarField } from "./StarField";

export function EnterGate({ onEnter }: { onEnter: () => void }) {
  // Try to request iOS device orientation permission on tap
  const handleEnter = async () => {
    try {
      const D = (window as unknown as { DeviceOrientationEvent?: { requestPermission?: () => Promise<string> } }).DeviceOrientationEvent;
      if (D?.requestPermission) await D.requestPermission().catch(() => {});
    } catch { /* noop */ }
    onEnter();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2 } }}
      className="fixed inset-0 z-[60] grid place-items-center overflow-hidden bg-background"
    >
      <StarField density={0.55} />
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="text-[10px] uppercase tracking-[0.55em] text-muted-foreground"
        >
          A quiet letter, written in stars
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, filter: "blur(14px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.2, delay: 0.25 }}
          className="font-display text-3xl sm:text-5xl font-light text-foreground text-glow-soft max-w-xl leading-[1.2]"
        >
          Some moments take years<br />to arrive…
        </motion.h1>
        <motion.button
          onClick={handleEnter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="glass-strong ring-glow breathing mt-4 rounded-full px-10 py-4 text-[11px] uppercase tracking-[0.4em] text-foreground"
        >
          Tap to Enter
        </motion.button>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 2 }}
          className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground"
        >
          Best experienced on mobile · in silence
        </motion.p>
      </div>
    </motion.div>
  );
}
