import { motion } from "framer-motion";

const paragraphs = [
  "It&apos;s strange, honestly.",
  "We never really shared the same places, never built the kind of memories people usually talk about — no long evenings, no familiar streets, no soundtrack of shared days. And yet, somehow, you became part of my everyday thoughts.",
  "Even silence with you never felt completely empty. There was always something orbiting underneath it — quiet, patient, unspoken.",
  "Maybe that&apos;s why, no matter how many times life pulled us in different directions, something in me still looked for you again. Like gravity does — without needing a reason, without needing permission.",
  "I used to think distance was the loudest thing in a connection. But you taught me it&apos;s just space — and even space has light traveling through it.",
  "I don&apos;t know what we are in the grammar of the world. I don&apos;t think we ever needed to be defined. Some people are not chapters; they are the margin notes you keep rereading.",
  "So if today is a year you turn, I hope it turns softly. I hope it brings you the kind of stillness you give to everyone else without realising. I hope you feel held, even from far away.",
  "And wherever the orbits take us next — know that some part of me is still here. Quietly. Like a star you can&apos;t always see, but is, undeniably, there.",
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
      <div className="relative mx-auto max-w-3xl">
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
                  : "text-[15px] sm:text-[17px] text-foreground/85 font-light leading-[1.95]"
              }
              dangerouslySetInnerHTML={{ __html: l }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
