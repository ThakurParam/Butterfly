"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

export default function Home() {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subheadingRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const [imageSrc, setImageSrc] = useState(
    // Use local asset from public/
    "/photo-1599631438215-75bc2640feb8.jpeg"
  );

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

    const startAnimations = () => {
      if (imageRef.current) {
        gsap.set(imageRef.current, { transformPerspective: 800, transformOrigin: "50% 50%" });

        timeline.fromTo(
          imageRef.current,
          {
            autoAlpha: 0,
            scale: 1.08,
            y: 30,
            rotate: -2,
            filter: "blur(12px) saturate(0.9) brightness(0.9)",
          },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            rotate: 0,
            filter: "blur(0px) saturate(1) brightness(1.05)",
            duration: 1.4,
          }
        );

        timeline.to(
          imageRef.current,
          { filter: "brightness(1)", duration: 0.6, ease: "power1.out" },
          "<"
        );

        gsap.to(imageRef.current, {
          scale: 1.01,
          duration: 6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      const textElements: (HTMLElement | null)[] = [
        headingRef.current,
        subheadingRef.current,
        ctaRef.current,
      ];

      timeline.fromTo(
        textElements,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15 },
        "<0.2"
      );
    };

    const img = imageRef.current;
    if (img) {
      if (img.complete && img.naturalWidth > 0) {
        startAnimations();
      } else {
        const onLoad = () => startAnimations();
        img.addEventListener("load", onLoad, { once: true });
      }
    }

    // Subtle mouse parallax on pointer-capable devices
    const enableParallax = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    let onMove: ((e: MouseEvent) => void) | null = null;
    if (enableParallax && imageRef.current) {
      onMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const percentX = (e.clientX / innerWidth) - 0.5; // -0.5..0.5
        const percentY = (e.clientY / innerHeight) - 0.5; // -0.5..0.5
        const rotateY = percentX * 6; // left/right tilt
        const rotateX = -percentY * 6; // up/down tilt
        gsap.to(imageRef.current!, {
          rotateX,
          rotateY,
          duration: 0.6,
          ease: "sine.out",
        });
      };
      window.addEventListener("mousemove", onMove);
    }

    return () => {
      timeline.kill();
      gsap.killTweensOf(imageRef.current);
      if (onMove) window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-transparent" />
      </div>

      <section className="relative min-h-[100svh]">
        <img
          ref={imageRef}
          src={imageSrc}
          alt="Butterfly"
          loading="eager"
          fetchPriority="high"
          onError={() => {
            if (imageSrc === "/photo-1587405254461-abd1d1c7440e.jpeg") {
              setImageSrc("/photo-1599631438215-75bc2640feb8.jpeg");
            }
          }}
          className="pointer-events-none select-none absolute inset-0 z-0 w-full h-full object-cover will-change-transform"
        />

        <div className="absolute inset-0 z-[1] bg-black/20" />
        <div className="relative z-10 flex min-h-[100svh] items-center justify-center">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight"
            >
              Embrace the Elegance of Butterfly
            </h1>
            <p
              ref={subheadingRef}
              className="mt-4 text-base sm:text-lg md:text-xl text-white/85"
            >
              Discover beauty in motion
            </p>
            <motion.a
              ref={ctaRef}
              href="/butterfly-journey"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(99,102,241,0.35)" }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-white/90 hover:text-white transition-colors"
            >
              Explore Now
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </motion.a>
          </div>
        </div>
      </section>
    </main>
  );
}
