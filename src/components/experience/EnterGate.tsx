import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { StarField } from "./StarField";
import { InlineCountdown } from "./InlineCountdown";
import { getBirthdayTarget, previewMode } from "@/config/experience";

export function EnterGate({ onEnter }: { onEnter: () => void }) {
  const target = getBirthdayTarget();
  const [unlocked, setUnlocked] = useState(true
  );

  useEffect(() => {
    if (unlocked) return;
    const id = setInterval(() => {
      if (Date.now() >= target.getTime()) setUnlocked(true);
    }, 1000);
    return () => clearInterval(id);
  }, [unlocked, target]);

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
      className="fixed inset-0 z-[60] grid h-[100svh] place-items-center overflow-hidden bg-background"
    >
      <StarField density={0.45} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 50%, oklch(0.24 0.05 60 / 0.4), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-7 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground"
        >
          A little something, made for you
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(14px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.2, delay: 0.25 }}
          className="font-display text-[1.55rem] sm:text-[2.1rem] font-light leading-[1.35] text-foreground text-glow-soft"
        >
          I made something small for you…
          <br />
          <span className="bg-gradient-to-r from-[oklch(0.92_0.08_80)] via-[oklch(0.82_0.13_65)] to-[oklch(0.72_0.13_50)] bg-clip-text text-transparent">
            with all the feelings
            <br />
            I never really knew how to explain.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.8, duration: 1.6 }}
          className="text-[13.5px] sm:text-[14.5px] leading-[1.95] text-muted-foreground font-light"
        >
          Wait until your day arrives.
          <br />
          There&apos;s a small piece of my heart
          <br />
          waiting here for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-2 min-h-[56px] flex items-center justify-center"
        >
          {unlocked ? (
            <motion.button
              onClick={handleEnter}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="glass-strong ring-glow breathing rounded-full px-10 py-4 text-[11px] uppercase tracking-[0.4em] text-foreground"
            >
              Tap to Enter
            </motion.button>
          ) : (
            <InlineCountdown target={target} />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
