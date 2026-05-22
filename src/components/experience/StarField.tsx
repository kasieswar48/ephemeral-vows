import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Stars({ count = 1200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 1.6 + 0.4;
    }
    return { positions, sizes };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.02;
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.7 + Math.sin(t * 0.8) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        color={"#f5d6ea"}
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ParallaxRig() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });
  useFrame(({ mouse }) => {
    target.current.x += (mouse.x * 0.4 - target.current.x) * 0.04;
    target.current.y += (mouse.y * 0.25 - target.current.y) * 0.04;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function StarField({
  density = 1,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const count = Math.floor((isMobile ? 600 : 1400) * density);
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        dpr={[1, isMobile ? 1.3 : 2]}
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Stars count={count} />
        <ParallaxRig />
      </Canvas>
    </div>
  );
}
