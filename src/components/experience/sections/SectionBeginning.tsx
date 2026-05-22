import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { StarField } from "../StarField";

function PaperPlane() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.position.x = Math.sin(t * 0.4) * 1.2;
    ref.current.position.y = Math.sin(t * 0.6) * 0.4;
    ref.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    ref.current.rotation.y = Math.sin(t * 0.3) * 0.3 + 0.4;
    ref.current.rotation.x = -0.2 + Math.sin(t * 0.4) * 0.1;
  });
  return (
    <group ref={ref}>
      {/* Simple paper plane built from triangles */}
      <mesh>
        <coneGeometry args={[0.5, 1.4, 4]} />
        <meshStandardMaterial color="#f5e9f1" emissive="#b88aa8" emissiveIntensity={0.25} roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.05, -0.1]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.9, 0.9]} />
        <meshStandardMaterial color="#e9d6e2" side={THREE.DoubleSide} emissive="#996b87" emissiveIntensity={0.15} />
      </mesh>
    </group>
  );
}

const words = ["We", "never", "really", "met.", "Yet", "somehow,", "you", "stayed."];

export function SectionBeginning() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative grid min-h-[100svh] place-items-center overflow-hidden px-6 py-24">
      <StarField density={0.6} />
      <div className="absolute inset-0 z-[1] opacity-80">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 3]} intensity={1.2} color="#f5b8d6" />
          <pointLight position={[-3, -2, 2]} intensity={0.8} color="#8a6cb8" />
          <PaperPlane />
        </Canvas>
      </div>
      <motion.div style={{ y }} className="relative z-10 max-w-2xl text-center">
        <p className="mb-6 text-[10px] uppercase tracking-[0.5em] text-muted-foreground">i — the beginning</p>
        <h2 className="font-display text-4xl sm:text-6xl font-light leading-tight text-foreground">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ delay: i * 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-2"
            >
              {w}
            </motion.span>
          ))}
        </h2>
      </motion.div>
    </section>
  );
}
