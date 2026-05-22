import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EnterGate } from "./EnterGate";
import { ScrollProgress } from "./ScrollProgress";
import { SectionHero } from "./sections/SectionHero";
import { SectionBeginning } from "./sections/SectionBeginning";
import { SectionTimeline } from "./sections/SectionTimeline";
import { SectionLetter } from "./sections/SectionLetter";
import { SectionFinal } from "./sections/SectionFinal";
import { useLenis } from "./useLenis";

export function Experience() {
  const [entered, setEntered] = useState(false);
  useLenis(entered);

  return (
    <main className="relative min-h-[100svh] text-foreground">
      <ScrollProgress />

      <AnimatePresence mode="wait">
        {!entered && <EnterGate key="gate" onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && (
        <motion.div
          initial={{ opacity: 0, filter: "blur(18px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHero />
          <SectionBeginning />
          <SectionTimeline />
          <SectionLetter />
          <SectionFinal />
          <div className="h-16" />
        </motion.div>
      )}
    </main>
  );
}
