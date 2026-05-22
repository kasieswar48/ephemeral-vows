import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { AnimatePresence, motion } from "framer-motion";

const MEMORIES = [
  "The way you suddenly came back into my life.",
  "Some people quietly become part of your routine.",
  "Even after everything, we still found our way back.",
  "Three words you said once, that I still remember.",
  "Your laugh — the unfair kind that ruins other sounds.",
  "The night the silence between us felt like trust.",
  "You stayed, even when staying wasn't easy.",
];

type Star = { x: number; y: number; z: number; r: number; memory: string };

function GalaxyStars({ onPick }: { onPick: (s: Star) => void }) {
  const group = useRef<THREE.Group>(null);
  const stars = useMemo<Star[]>(() => {
    return MEMORIES.map(() => ({
      x: (Math.random() - 0.5) * 7,
      y: (Math.random() - 0.5) * 4,
      z: (Math.random() - 0.5) * 3,
      r: 0.18 + Math.random() * 0.08,
      memory: "",
    })).map((s, i) => ({ ...s, memory: MEMORIES[i] }));
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.2;
    group.current.children.forEach((c, i) => {
      const m = c as THREE.Mesh;
      m.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.4 + i) * 0.15);
    });
  });

  return (
    <>
      {/* connecting lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                stars.flatMap((s, i) => {
                  const n = stars[(i + 1) % stars.length];
                  return [s.x, s.y, s.z, n.x, n.y, n.z];
                })
              ),
              3,
            ]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#b88ac8" transparent opacity={0.18} />
      </lineSegments>
      <group ref={group}>
        {stars.map((s, i) => (
          <mesh
            key={i}
            position={[s.x, s.y, s.z]}
            onClick={(e) => {
              e.stopPropagation();
              onPick(s);
            }}
            onPointerOver={(e) => ((e.object as THREE.Mesh).scale.setScalar(1.6))}
            onPointerOut={(e) => ((e.object as THREE.Mesh).scale.setScalar(1))}
          >
            <sphereGeometry args={[s.r, 24, 24]} />
            <meshBasicMaterial color="#ffd7ea" />
          </mesh>
        ))}
      </group>
      <Glow />
    </>
  );
}

function Glow() {
  const { camera } = useThree();
  useFrame(({ mouse }) => {
    camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.03;
    camera.position.y += (mouse.y * 0.6 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function SectionGalaxy() {
  const [picked, setPicked] = useState<Star | null>(null);
  return (
    <section className="relative overflow-hidden px-6 py-32">
      <header className="mx-auto mb-10 max-w-2xl text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">iii — memory galaxy</p>
        <h2 className="mt-3 font-display text-3xl sm:text-5xl font-light text-foreground text-glow-soft">
          Tap a star. Find a memory.
        </h2>
      </header>
      <div className="relative mx-auto h-[55svh] max-w-4xl overflow-hidden rounded-3xl glass ring-glow">
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.6} />
          <pointLight position={[0, 0, 4]} intensity={1.2} color="#ffb6d8" />
          <GalaxyStars onPick={setPicked} />
        </Canvas>
        <AnimatePresence>
          {picked && (
            <motion.button
              key={picked.memory}
              onClick={() => setPicked(null)}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong ring-glow absolute left-1/2 top-1/2 z-10 w-[85%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 text-left"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">a memory</p>
              <p className="mt-2 font-display text-2xl sm:text-3xl leading-snug text-foreground">
                "{picked.memory}"
              </p>
              <p className="mt-4 text-xs text-muted-foreground/80">Tap to close</p>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Each star is a small thing I never said out loud.
      </p>
    </section>
  );
}
