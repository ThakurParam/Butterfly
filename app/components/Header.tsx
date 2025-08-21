"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/butterfly-journey", label: "Butterfly Journey" },
    { href: "/products/butterfly", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-3 rounded-xl border border-white/15 bg-white/10 dark:bg-black/20 backdrop-blur-md supports-[backdrop-filter]:bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
          <nav className="flex items-center justify-between px-4 sm:px-6 py-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="text-lg sm:text-xl font-semibold tracking-wide">
              <Link href="/" className="inline-block text-white/90 hover:text-white">Butterfly</Link>
            </motion.div>
            <ul className="hidden md:flex items-center gap-6 text-sm text-white/80">
              {navItems.map((item) => (
                <li key={item.label}>
                  <motion.a
                    href={item.href}
                    whileHover={{ scale: 1.06, color: "#ffffff" }}
                    whileTap={{ scale: 0.97 }}
                    className="transition-colors"
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-white/90 hover:text-white backdrop-blur-md"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-full bg-current transition-transform ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-full bg-current transition-opacity ${mobileOpen ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`absolute left-0 top-3 h-0.5 w-full bg-current transition-transform ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-50 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl supports-[backdrop-filter]:bg-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          >
            <ul className="p-3 divide-y divide-white/10 text-sm">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-3 text-white/85 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}
    </header>
  );
}


