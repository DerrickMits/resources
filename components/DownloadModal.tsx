"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ArrowRight, CheckCircle } from "lucide-react";
import { ResourceAsset } from "@/lib/types";

interface DownloadModalProps {
  resource: ResourceAsset | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  downloading: boolean;
  downloadStarted: boolean;
  downloadCompleted: boolean;
}

export default function DownloadModal({
  resource,
  open,
  onClose,
  onConfirm,
  downloading,
  downloadStarted,
  downloadCompleted,
}: DownloadModalProps) {
  return (
    <AnimatePresence>
      {open && resource && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white dark:bg-warm-900 rounded-2xl shadow-2xl border border-warm-200 dark:border-warm-800 p-6 md:p-8"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-warm-100 dark:bg-warm-800 flex items-center justify-center hover:bg-warm-200 dark:hover:bg-warm-700 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-warm-600 dark:text-warm-300" />
            </button>

            <AnimatePresence mode="wait">
              {/* ── Stage 3: Download Completed ── */}
              {downloadCompleted ? (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="text-center py-4"
                >
                  {/* Animated checkmark */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                    className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5"
                  >
                    <motion.div
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </motion.div>
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="text-xl font-display font-bold text-warm-900 dark:text-warm-100 mb-2"
                  >
                    Download Completed
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm text-warm-600 dark:text-warm-400 leading-relaxed"
                  >
                    Your file is ready. You can now open the PDF in any document
                    viewer or save it to your preferred location.
                  </motion.p>

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    onClick={onClose}
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-warm-900 dark:bg-warm-100 text-white dark:text-warm-900 font-medium hover:bg-warm-800 dark:hover:bg-warm-200 transition-colors text-sm"
                  >
                    Close
                  </motion.button>
                </motion.div>

              ) : /* ── Stage 2: Download Started ── */
              downloadStarted ? (
                <motion.div
                  key="started"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="text-center py-4"
                >
                  {/* Animated spinning loader */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 rounded-2xl bg-warm-100 dark:bg-warm-800 flex items-center justify-center mx-auto mb-5"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    >
                      <Download className="w-8 h-8 text-warm-700 dark:text-warm-300" />
                    </motion.div>
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-xl font-display font-bold text-warm-900 dark:text-warm-100 mb-2"
                  >
                    Download Started
                  </motion.h3>

                  {/* Animated progress bar */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="w-full bg-warm-100 dark:bg-warm-800 rounded-full h-1.5 mb-3 mt-4 overflow-hidden"
                  >
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="h-full rounded-full bg-warm-600 dark:bg-warm-300"
                    />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="text-sm text-warm-500 dark:text-warm-400"
                  >
                    Preparing your file...
                  </motion.p>
                </motion.div>

              ) : (
                /* ── Stage 1: Confirmation ── */
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="text-center py-2"
                >
                  <div className="w-14 h-14 rounded-2xl bg-warm-100 dark:bg-warm-800 flex items-center justify-center mx-auto mb-4">
                    <Download className="w-7 h-7 text-warm-700 dark:text-warm-300" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-warm-900 dark:text-warm-100 mb-2">
                    Confirm Download
                  </h3>
                  <p className="text-sm text-warm-600 dark:text-warm-400 mb-1">
                    <span className="font-semibold text-warm-800 dark:text-warm-200">
                      {resource.title}
                    </span>
                  </p>
                  <p className="text-xs text-warm-500 dark:text-warm-400 mb-6">
                    {resource.format} &bull; v{resource.version || "1.0"}
                  </p>

                  <button
                    onClick={onConfirm}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-warm-900 dark:bg-warm-100 text-white dark:text-warm-900 font-medium hover:bg-warm-800 dark:hover:bg-warm-200 transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Start Download
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}