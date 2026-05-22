import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { herName } from "@/config/experience";

// Stars arrange into letters "H" and "B"
function constellationPoints(): [number, number][] {
  const pts: [number, number][] = [];
  // H — left bar, right bar, crossbar
  const HX = -1.6;
  for (let i = 0; i < 7; i++) pts.push([HX, -1 + i * 0.33]);
  for (let i = 0; i < 7; i++) pts.push([HX + 1, -1 + i * 0.33]);
  for (let i = 1; i < 4; i++) pts.push([HX + i * 0.25, 0.1]);
  // B — vertical bar + two bumps
  const BX = 0.6;
  for (let i = 0; i < 7; i++) pts.push([BX, -1 + i * 0.33]);
  // top bump
  for (let i = 0; i < 6; i++) {
    const a = (-Math.PI / 2) + (i / 5) * Math.PI;
    pts.push([BX + Math.cos(a) * 0.45, 0.55 + Math.sin(a) * 0.55]);
  }
  // bottom bump
  for (let i = 0; i < 6; i++) {
    const a = (-Math.PI / 2) + (i / 5) * Math.PI;
    pts.push([BX + Math.cos(a) * 0.55, -0.55 + Math.sin(a) * 0.55]);
  }
  return pts;
}

function Constellation({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const targets = useRef(constellationPoints());
  const ref = useRef<THREE.Points>(null);
  const origins = useRef<Float32Array | null>(null);

  const count = targets.current.length;
  if (!origins.current) {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    origins.current = arr;
  }

  useFrame(() => {
    if (!ref.current || !origins.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const p = progressRef.current;
    for (let i = 0; i < count; i++) {
      const ox = origins.current[i * 3];
      const oy = origins.current[i * 3 + 1];
      const oz = origins.current[i * 3 + 2];
      const tx = targets.current[i][0];
      const ty = targets.current[i][1];
      arr[i * 3] = ox + (tx - ox) * p;
      arr[i * 3 + 1] = oy + (ty - oy) * p;
      arr[i * 3 + 2] = oz + (0 - oz) * p;
    }
    pos.needsUpdate = true;
  });

  const initial = new Float32Array(count * 3);
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[initial, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.09} color="#ffd5ea" transparent opacity={0.95} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  );
}

export function SectionFinal({ onOpenSurprise }: { onOpenSurprise: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const progress = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4], [0.6, 0]);

  const progressRef = useRef(0);
  useMotionValueEvent(progress, "change", (v) => {
    progressRef.current = v;
  });

  return (
    <section ref={ref} className="relative min-h-[200svh] overflow-hidden">
      <div className="sticky top-0 grid h-[100svh] place-items-center overflow-hidden">
        <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 aurora-bg opacity-20" />
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 1.5]}>
            <ConstellationBridge progressRef={progressRef} />
          </Canvas>
        </div>
        <motion.div style={{ opacity: textOpacity }} className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">v — the moment</p>
          <h2 className="font-display text-4xl sm:text-7xl font-light text-foreground text-glow leading-[1.05]">
            Happy Birthday
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {herName}
            </span>
          </h2>
          <motion.button
            onClick={onOpenSurprise}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="glass-strong ring-glow breathing mt-6 rounded-full px-8 py-4 text-xs uppercase tracking-[0.35em] text-foreground"
          >
            Open Your Surprise
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

function ConstellationBridge({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  // a tiny adapter so we can read the latest framer value inside r3f loop
  const dummy = useRef(0);
  useFrame(() => { dummy.current = progressRef.current; });
  return <Constellation progress={progressRef.current} />;
}
