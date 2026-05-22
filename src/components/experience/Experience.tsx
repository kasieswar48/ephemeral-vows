import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getBirthdayTarget, previewMode } from "@/config/experience";
import { EnterGate } from "./EnterGate";
import { CountdownScreen } from "./CountdownScreen";
import { MuteButton, useAmbientAudio } from "./AudioController";
import { ScrollProgress } from "./ScrollProgress";
import { SectionBeginning } from "./sections/SectionBeginning";
import { SectionTimeline } from "./sections/SectionTimeline";
import { SectionGalaxy } from "./sections/SectionGalaxy";
import { SectionLetter } from "./sections/SectionLetter";
import { SectionFinal } from "./sections/SectionFinal";
import { SurpriseModal } from "./SurpriseModal";
import { useLenis } from "./useLenis";

type Phase = "gate" | "countdown" | "accelerating" | "story";

export function Experience() {
  const target = getBirthdayTarget();
  const isAfter = Date.now() >= target.getTime();
  const unlocked = previewMode || isAfter;

  const [phase, setPhase] = useState<Phase>("gate");
  const [surprise, setSurprise] = useState(false);
  const { start, toggleMute, muted, playWhoosh } = useAmbientAudio();

  useLenis(phase === "story");

  // Auto-trigger acceleration when countdown reaches zero in real time
  useEffect(() => {
    if (phase !== "countdown" || previewMode) return;
    const id = setInterval(() => {
      if (Date.now() >= target.getTime()) {
        setPhase("accelerating");
        playWhoosh();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [phase, target, playWhoosh]);

  const enter = async () => {
    await start();
    if (unlocked) {
      // jump to acceleration → story for a magical reveal
      setPhase("accelerating");
      playWhoosh();
    } else {
      setPhase("countdown");
    }
  };

  return (
    <main className="relative min-h-[100svh] text-foreground">
      <ScrollProgress />
      <MuteButton muted={muted} onToggle={toggleMute} />

      <AnimatePresence mode="wait">
        {phase === "gate" && <EnterGate key="gate" onEnter={enter} />}

        {phase === "countdown" && (
          <motion.div key="cd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <CountdownScreen target={target} accelerate={false} onComplete={() => {}} />
          </motion.div>
        )}

        {phase === "accelerating" && (
          <motion.div key="acc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 1.2 } }}>
            <CountdownScreen
              target={target}
              accelerate
              onComplete={() => setPhase("story")}
            />
          </motion.div>
        )}

        {phase === "story" && (
          <motion.div
            key="story"
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionBeginning />
            <SectionTimeline />
            <SectionGalaxy />
            <SectionLetter />
            <SectionFinal onOpenSurprise={() => setSurprise(true)} />
            <footer className="py-12 text-center text-xs text-muted-foreground">
              made quietly · with light
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <SurpriseModal open={surprise} onClose={() => setSurprise(false)} />
    </main>
  );
}
