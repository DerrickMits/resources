"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Download } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative flex items-center justify-center min-h-[calc(100vh-8rem)] bg-cream dark:bg-deep overflow-hidden pt-16">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] bg-warm-200/25 dark:bg-warm-800/15 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />

      <div className="z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm uppercase tracking-[0.25em] font-semibold text-warm-500 dark:text-warm-400 mb-4">
            Resource Library
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-warm-900 dark:text-warm-100 tracking-tight leading-[1.1] mb-6">
            Operational Resources
            <br />
            <span className="text-warm-600 dark:text-warm-400">&amp; Blueprint Hub</span>
          </h1>

          <p className="text-lg md:text-xl text-warm-600 dark:text-warm-400 leading-relaxed max-w-xl mx-auto mb-10">
            Download ready-to-use CRM automation blueprints, workflow snapshots,
            and executive frameworks designed for high performance operations.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-warm-900 dark:bg-warm-100 text-white dark:text-warm-900 font-medium hover:bg-warm-800 dark:hover:bg-warm-200 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              Browse Resources
            </Link>
            <Link
              href="https://portfoliosite-pearl-one.vercel.app"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-warm-300 dark:border-warm-700 text-warm-700 dark:text-warm-300 font-medium hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Back to Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}