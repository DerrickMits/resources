"use client";

import { motion } from "framer-motion";
import {
  Download,
  CheckCircle2,
  FileCode,
  SquareArrowOutUpRight,
} from "lucide-react";
import { ResourceAsset } from "@/lib/types";

interface ResourceCardProps {
  resource: ResourceAsset;
  index: number;
  onDownload: (resource: ResourceAsset) => void;
}

export default function ResourceCard({
  resource,
  index,
  onDownload,
}: ResourceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-white dark:bg-warm-900 rounded-2xl border border-warm-200 dark:border-warm-800 p-6 md:p-8 hover:shadow-xl hover:border-warm-300 dark:hover:border-warm-700 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Category badge */}
          <span className="px-2.5 py-0.5 rounded-full bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-400 text-xs font-medium">
            {resource.category}
          </span>
          {/* Format badge */}
          <span className="px-2.5 py-0.5 rounded-full border border-warm-200 dark:border-warm-700 text-warm-500 dark:text-warm-400 text-xs font-medium flex items-center gap-1">
            <FileCode className="w-3 h-3" />
            {resource.format}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-display font-bold text-warm-900 dark:text-warm-100 mb-3 leading-snug">
        {resource.title}
      </h3>

      {/* Description */}
      <p className="text-warm-600 dark:text-warm-300 text-sm leading-relaxed mb-5">
        {resource.description}
      </p>

      {/* Architecture Highlights */}
      <div className="space-y-3 mb-6">
        {resource.highlights.map((highlight) => (
          <div key={highlight.label} className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-accent dark:text-warm-300 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-warm-800 dark:text-warm-200">
                {highlight.label}
              </p>
              <p className="text-xs text-warm-500 dark:text-warm-400 leading-relaxed">
                {highlight.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-400 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Download Button */}
      <button
        onClick={() => onDownload(resource)}
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-warm-900 dark:bg-warm-100 text-white dark:text-warm-900 font-medium hover:bg-warm-800 dark:hover:bg-warm-200 transition-colors shadow-sm text-sm"
      >
        <Download className="w-4 h-4" />
        Download Blueprint
        <SquareArrowOutUpRight className="w-3.5 h-3.5 opacity-60" />
      </button>
    </motion.div>
  );
}