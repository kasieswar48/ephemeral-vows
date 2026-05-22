import { AnimatePresence, motion } from "framer-motion";
import { X, Music, MessageCircleHeart, Mic, Sparkles } from "lucide-react";
import { useState } from "react";
import { herName } from "@/config/experience";

type Tab = "letter" | "playlist" | "voice" | "secret";

export function SurpriseModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("letter");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background/70 backdrop-blur-md px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong ring-glow relative w-full max-w-lg overflow-hidden rounded-3xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full glass text-foreground/80 hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">a small surprise</p>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              <TabBtn icon={<MessageCircleHeart className="h-3.5 w-3.5" />} label="Note" active={tab === "letter"} onClick={() => setTab("letter")} />
              <TabBtn icon={<Music className="h-3.5 w-3.5" />} label="Playlist" active={tab === "playlist"} onClick={() => setTab("playlist")} />
              <TabBtn icon={<Mic className="h-3.5 w-3.5" />} label="Voice" active={tab === "voice"} onClick={() => setTab("voice")} />
              <TabBtn icon={<Sparkles className="h-3.5 w-3.5" />} label="Secret" active={tab === "secret"} onClick={() => setTab("secret")} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="min-h-[180px]"
              >
                {tab === "letter" && (
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl text-foreground">For you, {herName}.</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      I made this small thing because words on a screen are easier to keep than the ones we lose
                      to silence. Today is your day. Be the softest version of yourself. Let people love you out loud.
                      And if the world feels too big — remember someone, somewhere, built you a sky.
                    </p>
                  </div>
                )}
                {tab === "playlist" && (
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl text-foreground">A small playlist</h3>
                    <p className="text-xs text-muted-foreground">Paste your Spotify embed URL in <code>src/components/experience/SurpriseModal.tsx</code>.</p>
                    <div className="overflow-hidden rounded-xl border border-border">
                      <iframe
                        title="Spotify playlist"
                        src="https://open.spotify.com/embed/playlist/37i9dQZF1DWZqd5JICZI0u?utm_source=generator&theme=0"
                        width="100%"
                        height="232"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
                {tab === "voice" && (
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl text-foreground">A voice note</h3>
                    <p className="text-sm text-muted-foreground">
                      Drop an MP3 in <code>public/voice-note.mp3</code> and it will play below.
                    </p>
                    <audio controls src="/voice-note.mp3" className="w-full">
                      Your browser does not support audio.
                    </audio>
                  </div>
                )}
                {tab === "secret" && (
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl text-foreground">One last thing</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground italic">
                      "Even if we never talk the same way again — I'll always be a little proud, from a quiet distance,
                      of every version of you that's still becoming."
                    </p>
                    <p className="pt-2 text-right text-xs text-muted-foreground">— someone who remembers</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TabBtn({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-all ${
        active ? "bg-primary/20 text-foreground ring-1 ring-primary/40" : "glass text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
