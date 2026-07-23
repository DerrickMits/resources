"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Feather, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-warm-200/60 dark:border-warm-800/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Back to portfolio */}
        <Link
          href="https://portfoliosite-pearl-one.vercel.app"
          className="group inline-flex items-center gap-2 text-sm font-medium text-warm-600 dark:text-warm-400 hover:text-warm-900 dark:hover:text-warm-100 transition-colors"
        >
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-warm-100 dark:bg-warm-800 group-hover:bg-warm-200 dark:group-hover:bg-warm-700 transition-colors">
            <ArrowLeft
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              strokeWidth={2}
            />
          </span>
          <span className="hidden sm:inline">Back to Portfolio</span>
        </Link>

        {/* Wordmark — centered like The Ledger */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-display text-lg sm:text-xl font-bold text-warm-900 dark:text-warm-100 hover:text-warm-700 dark:hover:text-warm-300 transition-colors inline-flex items-center gap-1.5"
        >
          <Feather
            className="w-4 h-4 text-accent dark:text-warm-300"
            strokeWidth={2}
          />
          <span>Resources</span>
        </Link>

        {/* Theme toggle */}
        <div className="flex items-center">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl bg-warm-100 dark:bg-warm-800 flex items-center justify-center hover:bg-warm-200 dark:hover:bg-warm-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-warm-300" strokeWidth={2} />
              ) : (
                <Moon className="w-4 h-4 text-warm-700" strokeWidth={2} />
              )}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}