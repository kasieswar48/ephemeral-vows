import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";

const Experience = lazy(() =>
  import("@/components/experience/Experience").then((m) => ({ default: m.Experience })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A small letter, in light" },
      { name: "description", content: "A cinematic, emotional birthday experience — quietly handcrafted." },
      { property: "og:title", content: "A small letter, in light" },
      { property: "og:description", content: "A cinematic, emotional birthday experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <Suspense fallback={<div className="grid min-h-[100svh] place-items-center bg-background text-muted-foreground">…</div>}>
      {mounted ? <Experience /> : <div className="grid min-h-[100svh] place-items-center bg-background" />}
    </Suspense>
  );
}
