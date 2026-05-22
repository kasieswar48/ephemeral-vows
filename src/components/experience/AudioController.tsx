import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

// Lightweight ambient pad synthesized via Web Audio API — no external file needed.
// Soft sine + slow LFO for a dreamy cinematic bed.
export function useAmbientAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);

  const start = async () => {
    if (started) return;
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      ctxRef.current = ctx;
      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      masterRef.current = master;

      // chord: A2, E3, A3, C#4 — warm minor-ish pad
      const freqs = [110, 164.81, 220, 277.18];
      freqs.forEach((f, i) => {
        const o = ctx.createOscillator();
        o.type = i === 0 ? "sine" : "triangle";
        o.frequency.value = f;
        const g = ctx.createGain();
        g.gain.value = 0.06 / (i + 1);
        // gentle vibrato
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.1 + i * 0.05;
        const lfoG = ctx.createGain();
        lfoG.gain.value = 0.6;
        lfo.connect(lfoG).connect(o.frequency);
        lfo.start();
        o.connect(g).connect(master);
        o.start();
      });

      // soft noise shimmer
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuf = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuf.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuf;
      noise.loop = true;
      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.012;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1800;
      filter.Q.value = 0.7;
      noise.connect(filter).connect(noiseGain).connect(master);
      noise.start();

      // fade in
      master.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 2.5);
      setStarted(true);
      setMuted(false);
    } catch (e) {
      console.warn("Audio init failed", e);
    }
  };

  const toggleMute = () => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) {
      void start();
      return;
    }
    const target = muted ? 0.45 : 0;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(target, ctx.currentTime + 0.8);
    setMuted(!muted);
  };

  const playWhoosh = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(80, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 4);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1);
    g.gain.linearRampToValueAtTime(0, ctx.currentTime + 5);
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 1200;
    o.connect(f).connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 5.2);
  };

  useEffect(() => () => { ctxRef.current?.close(); }, []);

  return { start, toggleMute, muted, started, playWhoosh };
}

export function MuteButton({
  muted,
  onToggle,
}: {
  muted: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      onClick={onToggle}
      aria-label={muted ? "Unmute" : "Mute"}
      className="glass fixed top-4 right-4 z-50 grid h-11 w-11 place-items-center rounded-full text-foreground/80 hover:text-foreground transition-colors"
    >
      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </motion.button>
  );
}
