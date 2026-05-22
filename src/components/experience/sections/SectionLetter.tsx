import { motion } from "framer-motion";

const paragraphs = [
  "I don&apos;t think you know how naturally you became a part of my life.",
  "We never really had big moments together. No long walks. No photos. No perfect memories like people usually talk about.",
  "But still… you stayed in my thoughts. Quietly. Without trying. Without needing a reason.",
  "Even after distance. Even after silence. Even after life changed so many things between us — somehow, you never really left my heart.",
  "There were days I didn&apos;t say anything. Days we didn&apos;t talk. Days where everything around me kept moving. But every time my mind slowed down, it always came back to you.",
  "And honestly, that feeling is rare. To feel peaceful about someone, even from far away — that&apos;s not something you find easily.",
  "Maybe that&apos;s why I wanted to make this for you. Not to say something big. Not to ask for anything. Just to remind you that somewhere in this huge universe, there&apos;s someone whose day becomes a little softer just by thinking about you.",
  "You don&apos;t have to do anything with this. Just know it&apos;s here. Quietly. The same way you&apos;ve always been in my heart.",
];

export function SectionLetter() {
  return (
    <section className="relative overflow-hidden px-6 py-32 sm:py-40">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, oklch(0.18 0.04 60 / 0.5), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-2xl">
        <p className="mb-14 text-center text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
          iii — the letter
        </p>
        <div className="space-y-7">
          {paragraphs.map((l, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ delay: Math.min(i * 0.08, 0.4), duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className={
                i === 0
                  ? "font-display text-2xl sm:text-3xl font-light text-foreground/95 leading-[1.5]"
                  : "text-[15px] sm:text-[17px] text-foreground/80 font-light leading-[1.95]"
              }
              dangerouslySetInnerHTML={{ __html: l }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
