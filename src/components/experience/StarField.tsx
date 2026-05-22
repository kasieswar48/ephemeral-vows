import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function Stars({ count = 1000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.012;
    ref.current.rotation.x = Math.sin(t * 0.04) * 0.06;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.72 + Math.sin(t * 0.6) * 0.10;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        sizeAttenuation
        color={"#f4d9a8"}
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ParallaxRig() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });
  const tilt = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: DeviceOrientationEvent) => {
      // gamma: left-right tilt (-90..90), beta: front-back (-180..180)
      const g = (e.gamma ?? 0) / 45; // -1..1
      const b = ((e.beta ?? 0) - 30) / 60; // recenter around upright handheld
      tilt.current.x = Math.max(-1, Math.min(1, g));
      tilt.current.y = Math.max(-1, Math.min(1, b));
    };
    window.addEventListener("deviceorientation", handler, true);
    return () => window.removeEventListener("deviceorientation", handler, true);
  }, []);

  useFrame(({ mouse }) => {
    const tx = (mouse.x || 0) * 0.35 + tilt.current.x * 0.5;
    const ty = (mouse.y || 0) * 0.2 + -tilt.current.y * 0.3;
    target.current.x += (tx - target.current.x) * 0.035;
    target.current.y += (ty - target.current.y) * 0.035;
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
  const count = Math.floor((isMobile ? 500 : 1100) * density);
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden>
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
