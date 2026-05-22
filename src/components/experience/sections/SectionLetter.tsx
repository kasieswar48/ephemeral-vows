import { motion } from "framer-motion";

const paragraphs = [
  "I&apos;ve been trying to write this for a while.",
  "It&apos;s hard to explain something that never really had a beginning. We didn&apos;t start with a moment. No single day, no obvious reason. You just became familiar. Slowly. Like learning the shape of a constellation you can&apos;t name yet.",
  "Most of what I know about you lives in small things. The way you type when you&apos;re tired. The things that make you laugh. The silences that never felt awkward. These aren&apos;t memories in the usual sense. They&apos;re just... impressions that stayed.",
  "I used to believe distance weakens things. That miles somehow subtract from meaning. But you changed that. Because even when there was nothing between us — no messages, no updates, no proof — I still found myself thinking about you. Like gravity. No ceremony. Just pull.",
  "I don&apos;t know what we are. I&apos;ve stopped trying to name it. Some things don&apos;t need definitions to be real. You don&apos;t ask the moon why it orbits. You just accept that it does.",
  "So here&apos;s what I want you to know today. Not something dramatic. Just the truth: you matter to me. In a way that time hasn&apos;t erased and distance hasn&apos;t dimmed. That&apos;s rare. I know it&apos;s rare.",
  "I hope this year brings you quiet joy. The kind that doesn&apos;t need announcing. I hope you find moments that feel like they belong only to you. And I hope, somewhere in all of it, you remember that someone far away is still glad you exist.",
  "That&apos;s all, really. Just — glad. Like a star that keeps showing up in the same part of the sky. Not because it has to. Because that&apos;s just where it belongs.",
];

export function SectionLetter() {
  return (
    <section className="relative overflow-hidden px-6 py-40">
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
        <div className="space-y-8">
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
                  : "text-[15px] sm:text-[17px] text-foreground/80 font-light leading-[2]"
              }
              dangerouslySetInnerHTML={{ __html: l }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
