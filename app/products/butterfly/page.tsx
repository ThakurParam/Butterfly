"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function ButterflyProductPage() {
  const images = useMemo(
    () => [
      "/photo-1599631438215-75bc2640feb8.jpeg",
      "/photo-1587405254461-abd1d1c7440e.jpeg",
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  const mainImageRef = useRef<HTMLDivElement | null>(null);
  const priceCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mainImageRef.current) return;

    const element = mainImageRef.current;
    const onMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const percentX = (e.clientX - rect.left) / rect.width - 0.5;
      const percentY = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(element, {
        rotateY: percentX * 8,
        rotateX: -percentY * 8,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    const onLeave = () => {
      gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
    };

    element.addEventListener("mousemove", onMove);
    element.addEventListener("mouseleave", onLeave);
    return () => {
      element.removeEventListener("mousemove", onMove);
      element.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (!priceCardRef.current) return;
    gsap.fromTo(
      priceCardRef.current,
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
    );
  }, []);

  return (
    <main className="relative min-h-[100svh] w-full overflow-x-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white pt-24">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      {/* breadcrumb */}
      <motion.nav
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-6xl px-6 text-sm text-white/70"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-2">
          <li>
            <a href="/" className="hover:text-white transition-colors">Home</a>
          </li>
          <li className="text-white/40">/</li>
          <li>
            <a href="/products/butterfly" className="text-white/90">Butterfly</a>
          </li>
        </ol>
      </motion.nav>

      {/* hero + gallery */}
      <section className="mx-auto mt-6 grid w-full max-w-6xl grid-cols-1 gap-10 px-6 md:mt-10 md:grid-cols-2">
        <div className="relative">
          <motion.div
            ref={mainImageRef}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] will-change-transform"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={activeImage}
                alt="Butterfly product image"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                draggable={false}
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/0" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-4 grid grid-cols-4 gap-3"
          >
            {images.map((src, idx) => (
              <motion.button
                key={src}
                variants={fadeUp}
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-[4/3] overflow-hidden rounded-xl border transition-all ${
                  activeIndex === idx
                    ? "border-indigo-400 shadow-[0_12px_40px_rgba(99,102,241,0.25)]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <img src={src} alt="Thumbnail" className="h-full w-full object-cover" />
                {activeIndex === idx && (
                  <span className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-indigo-400/60" />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-col justify-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.h1 variants={fadeUp} className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Butterfly
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-3 max-w-prose text-white/80">
              Elegance in motion. Inspired by nature, crafted for modern life. Butterfly brings a sense of calm and
              fluidity to your space with visuals that feel alive and interactions that stay out of your way.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 flex items-end gap-6">
              <div ref={priceCardRef} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
                <div className="text-xs uppercase tracking-wide text-white/60">Starting at</div>
                <div className="text-3xl font-semibold">$249</div>
              </div>
              <div className="flex items-center gap-3 text-sm text-yellow-300/90">
                <Stars />
                <span className="text-white/70">4.8 • 120 reviews</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 20px 60px rgba(99,102,241,0.35)" }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-[0_8px_30px_rgba(99,102,241,0.35)] transition-colors hover:bg-indigo-400"
              >
                Add to cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-white/90 backdrop-blur-md transition-colors hover:text-white"
              >
                Buy now
              </motion.button>
            </motion.div>

            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {[
                {
                  title: "Living visuals",
                  desc: "Subtle motion that responds to your presence without distraction.",
                },
                { title: "Calm by design", desc: "Soft gradients, refined contrast, and a focus on content." },
                { title: "Feather‑light", desc: "Smooth performance with efficient animations." },
                { title: "Adaptive", desc: "Looks and feels right on any device and input method." },
              ].map((f) => (
                <motion.li
                  key={f.title}
                  variants={fadeUp}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/85"
                >
                  <div className="font-medium text-white">{f.title}</div>
                  <div className="mt-1 text-white/75">{f.desc}</div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* specs */}
      <section className="mx-auto mt-16 w-full max-w-6xl px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-2xl font-semibold tracking-tight"
        >
          Specifications
        </motion.h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { k: "Material", v: "Anodized aluminum, optically-clear glass" },
            { k: "Dimensions", v: "210 × 140 × 18 mm" },
            { k: "Weight", v: "480 g" },
            { k: "Power", v: "USB‑C, 5V 2A" },
            { k: "Connectivity", v: "Bluetooth LE, Wi‑Fi 6" },
            { k: "Warranty", v: "2 years limited" },
          ].map((row) => (
            <motion.div
              key={row.k}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-xs uppercase tracking-wide text-white/60">{row.k}</div>
              <div className="mt-1 text-sm text-white/85">{row.v}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* reviews preview */}
      <section className="mx-auto mt-16 w-full max-w-6xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-md"
        >
          <motion.h3 variants={fadeUp} className="text-lg font-medium">
            What people are saying
          </motion.h3>
          <motion.p variants={fadeUp} className="mt-1 text-sm text-white/75">
            "It feels alive without being distracting. The motion is just… soothing."
          </motion.p>
          <motion.div variants={fadeUp} className="mt-4 flex items-center gap-3">
            <Stars />
            <span className="text-sm text-white/70">4.8 average rating</span>
          </motion.div>
        </motion.div>
      </section>

      {/* related */}
      <section className="mx-auto mt-16 w-full max-w-6xl px-6 pb-24">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-2xl font-semibold tracking-tight"
        >
          You might also like
        </motion.h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Aurora", img: "/photo-1599631438215-75bc2640feb8.jpeg" },
            { title: "Zephyr", img: "/photo-1587405254461-abd1d1c7440e.jpeg" },
            { title: "Ripple", img: "/photo-1599631438215-75bc2640feb8.jpeg" },
          ].map((card) => (
            <motion.a
              key={card.title}
              href="#"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <img src={card.img} alt="Related" className="h-48 w-full object-cover transition-transform group-hover:scale-[1.03]" />
              <div className="p-4">
                <div className="text-sm font-medium">{card.title}</div>
                <div className="text-xs text-white/70">Explore the collection →</div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </main>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-1.5 text-yellow-300">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`h-4 w-4 ${i === 4 ? "opacity-60" : "opacity-100"}`}
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}


