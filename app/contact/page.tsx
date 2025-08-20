"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type FormState = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // Simulate a request; replace with your API route when ready
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-400/10 via-transparent to-transparent" />
      </div>

      <section className="relative">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Contact us</h1>
            <p className="mt-3 text-white/85 max-w-2xl mx-auto">
              Tell us about your project, feedback, or just say hello.
            </p>
          </motion.div>

          <div className="mt-10 grid lg:grid-cols-3 gap-6 items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              <div className="space-y-4 text-white/85 text-sm">
                <div>
                  <div className="text-white">Email</div>
                  <a href="mailto:hello@butterfly.app" className="hover:text-white">hello@butterfly.app</a>
                </div>
                <div>
                  <div className="text-white">Office</div>
                  <div>San Francisco, CA</div>
                </div>
                <div>
                  <div className="text-white">Hours</div>
                  <div>Mon–Fri, 9:00–17:00 PT</div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={onSubmit}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-2 rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-white/80">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-white/80">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={onChange}
                    className="mt-1 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm text-white/80">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={onChange}
                    className="mt-1 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                    placeholder="How can we help?"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(99,102,241,0.35)" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === "loading"}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-white/90 hover:text-white disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Sending...
                    </span>
                  ) : (
                    <span>Send message →</span>
                  )}
                </motion.button>

                {status === "success" && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-emerald-300"
                  >
                    Message sent! We'll get back soon.
                  </motion.span>
                )}
                {status === "error" && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-rose-300"
                  >
                    Something went wrong. Please try again.
                  </motion.span>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </main>
  );
}


