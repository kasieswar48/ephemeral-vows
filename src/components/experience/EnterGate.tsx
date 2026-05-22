import { motion } from "framer-motion";
import { StarField } from "./StarField";

export function EnterGate({ onEnter }: { onEnter: () => void }) {
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
      <StarField density={0.5} />
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="text-[10px] uppercase tracking-[0.55em] text-muted-foreground"
        >
          A quiet letter, written in stars
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(14px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.2, delay: 0.25 }}
          className="font-display text-[1.8rem] sm:text-[3rem] font-light text-foreground text-glow-soft leading-[1.25]"
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.65, y: 0 }}
          transition={{ delay: 0.8, duration: 1.6 }}
          className="text-[14px] sm:text-[15px] leading-[1.9] text-muted-foreground font-light max-w-md"
        >
          Some stories arrive slowly.
          <br />
          Not all at once,
          <br />
          not perfectly,
          <br />
          not loudly.
          <br />
          But somehow,
          <br />
          they still become important.
        </motion.p>

        <motion.button
          onClick={handleEnter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="glass-strong ring-glow breathing mt-2 rounded-full px-10 py-4 text-[11px] uppercase tracking-[0.4em] text-foreground"
        >
          Wait for your moment
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2.2, duration: 1.4 }}
          className="text-[11px] leading-[1.8] text-muted-foreground font-light"
        >
          Wait until your day arrives…
          <br />
          there&apos;s something written here just for you.
        </motion.p>
      </div>
    </motion.div>
  );
}

