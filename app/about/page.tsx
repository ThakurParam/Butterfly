"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-transparent" />
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
              About Butterfly
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
              We craft calm, delightful experiences that feel weightless and alive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative mt-14 sm:mt-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold">Our Mission</h2>
                <p className="mt-3 text-white/80 leading-relaxed">
                  We believe interfaces should get out of the way and let people
                  flow. Butterfly blends motion, craft, and performance so every
                  interaction feels intentional and effortless.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { k: "Users served", v: "250k+" },
                  { k: "Markets", v: "35+" },
                  { k: "Uptime", v: "99.98%" },
                  { k: "NPS", v: "74" },
                ].map((s) => (
                  <motion.div
                    key={s.k}
                    className="rounded-xl border border-white/10 bg-white/[0.05] p-4 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-2xl font-semibold">{s.v}</div>
                    <div className="mt-1 text-xs text-white/70">{s.k}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="relative mt-14 sm:mt-16">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="text-xl sm:text-2xl font-semibold">What we value</h3>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { t: "Craft", d: "We obsess over the last 1%." , i: "✧"},
              { t: "Clarity", d: "Simple is faster to trust." , i: "☼"},
              { t: "Sustainability", d: "Performance is a kindness." , i: "♻"},
              { t: "Delight", d: "Motion with purpose." , i: "❤"},
            ].map((v, idx) => (
              <motion.div
                key={v.t}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-xl border border-white/10 bg-white/[0.05] p-5"
              >
                <div className="text-2xl">{v.i}</div>
                <div className="mt-3 font-medium">{v.t}</div>
                <div className="mt-1 text-sm text-white/75">{v.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="relative mt-14 sm:mt-16">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="text-xl sm:text-2xl font-semibold">Our journey</h3>
          <div className="mt-6 relative">
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-6">
              {[
                { y: "2021", h: "Founded", p: "Started with a focus on motion-first design." },
                { y: "2022", h: "First 50k users", p: "Scaled globally with a privacy-first core." },
                { y: "2024", h: "Butterfly Suite", p: "Launched a cohesive system across platforms." },
                { y: "2025", h: "Today", p: "Continuing to refine what calm software can be." },
              ].map((e, idx) => (
                <motion.div
                  key={e.y}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="relative pl-10 sm:pl-14"
                >
                  <div className="absolute left-2.5 sm:left-4 top-2 h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-[0_0_0_6px_rgba(99,102,241,0.15)]" />
                  <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4 sm:p-5">
                    <div className="text-xs text-white/60">{e.y}</div>
                    <div className="mt-1 font-medium">{e.h}</div>
                    <div className="mt-1 text-sm text-white/75">{e.p}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section className="relative mt-14 sm:mt-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h3 className="text-xl sm:text-2xl font-semibold">Team</h3>
            <a href="#contact" className="text-sm text-white/80 hover:text-white">Join us →</a>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { n: "Aria Park", r: "Design", img: "/photo-1599631438215-75bc2640feb8.jpeg" },
              { n: "Noah Singh", r: "Engineering", img: "/photo-1587405254461-abd1d1c7440e.jpeg" },
              { n: "Mila Chen", r: "Research", img: "/photo-1599631438215-75bc2640feb8.jpeg" },
            ].map((m, idx) => (
              <motion.div
                key={m.n}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                whileHover={{ y: -3 }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={m.img}
                    alt={m.n}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <div className="font-medium">{m.n}</div>
                  <div className="text-xs text-white/70">{m.r}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mt-16 mb-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl p-6 sm:p-8 text-center"
          >
            <h4 className="text-lg sm:text-xl font-medium">Ready to build the future with us?</h4>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-4 px-5 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-white/90 hover:text-white transition-colors"
            >
              Get in touch
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}


