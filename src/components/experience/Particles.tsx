import { useEffect, useRef } from "react";

export function DustParticles({ count = 40 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const isMobile = window.innerWidth < 768;
    const n = isMobile ? Math.floor(count * 0.5) : count;
    const el = ref.current;
    el.innerHTML = "";
    for (let i = 0; i < n; i++) {
      const d = document.createElement("span");
      const size = Math.random() * 3 + 1;
      d.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        background: radial-gradient(circle, oklch(1 0 0 / 0.9), transparent 70%);
        border-radius:50%;
        filter: blur(${Math.random() * 1.2}px);
        opacity:${0.2 + Math.random() * 0.6};
        animation: dustFloat ${8 + Math.random() * 10}s ease-in-out ${-Math.random() * 8}s infinite;
        pointer-events:none;
      `;
      el.appendChild(d);
    }
    if (!document.getElementById("dust-kf")) {
      const s = document.createElement("style");
      s.id = "dust-kf";
      s.textContent = `@keyframes dustFloat {
        0%,100% { transform: translate(0,0); }
        50% { transform: translate(${(Math.random() - 0.5) * 30}px, -40px); }
      }`;
      document.head.appendChild(s);
    }
  }, [count]);
  return <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden />;
}
