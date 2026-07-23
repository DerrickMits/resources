"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, CheckCircle } from "lucide-react";
import { ResourceAsset } from "@/lib/types";

interface DownloadModalProps {
  resource: ResourceAsset | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  downloading: boolean;
  success: boolean;
}

export default function DownloadModal({
  resource,
  open,
  onClose,
  onConfirm,
  downloading,
  success,
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
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-warm-100 dark:bg-warm-800 flex items-center justify-center hover:bg-warm-200 dark:hover:bg-warm-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-warm-600 dark:text-warm-300" />
            </button>

            {success ? (
              /* Success state */
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-display font-bold text-warm-900 dark:text-warm-100 mb-2">
                  Download Started
                </h3>
                <p className="text-sm text-warm-600 dark:text-warm-400">
                  Your blueprint is being downloaded. You can import the JSON
                  file directly into your GoHighLevel sub-account.
                </p>
              </div>
            ) : (
              /* Confirmation state */
              <div className="text-center py-2">
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
                  disabled={downloading}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-warm-900 dark:bg-warm-100 text-white dark:text-warm-900 font-medium hover:bg-warm-800 dark:hover:bg-warm-200 transition-colors disabled:opacity-60 text-sm"
                >
                  {downloading ? (
                    <>
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 dark:border-warm-900/30 border-t-white dark:border-t-warm-900 rounded-full" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Start Download
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}