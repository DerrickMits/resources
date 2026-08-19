"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SupportModalProps {
  open: boolean;
  onClose: () => void;
}

const BUY_ME_A_SODA_URL = "https://www.buymeasoda.com/qGOV2LRA2mc1A8g98AbZJnVpSDz2";
const QR_CODE_URL = "https://api.buymesoda.com/media/qr_codes/qGOV2LRA2mc1A8g98AbZJnVpSDz2.png";

export default function SupportModal({ open, onClose }: SupportModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      // Focus the close button for accessibility
      const timer = setTimeout(() => closeButtonRef.current?.focus(), 100);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
        clearTimeout(timer);
      };
    }
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 350, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-modal-heading"
            aria-describedby="support-modal-body"
            className="relative w-full max-w-sm bg-white dark:bg-warm-900 rounded-2xl shadow-2xl border border-warm-200 dark:border-warm-800 p-6 sm:p-8"
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-warm-100 dark:bg-warm-800 flex items-center justify-center hover:bg-warm-200 dark:hover:bg-warm-700 transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 text-warm-600 dark:text-warm-300" />
            </button>

            {/* Content */}
            <div className="text-center">
              {/* Headline */}
              <h2
                id="support-modal-heading"
                className="text-xl sm:text-2xl font-display font-bold text-warm-900 dark:text-warm-100 mb-3"
              >
                Your download is on the way!
              </h2>

              {/* Body message */}
              <p
                id="support-modal-body"
                className="text-sm text-warm-600 dark:text-warm-400 leading-relaxed mb-6"
              >
                I hope this resource brings immense value to your workflow. If you&rsquo;d like to support the time and
                research that goes into creating these, consider buying me a soda.
              </p>

              {/* QR code container */}
              <div className="inline-flex items-center justify-center p-4 rounded-xl bg-warm-50 dark:bg-warm-800/60 border border-warm-100 dark:border-warm-700/60 mb-5">
                <img
                  src={QR_CODE_URL}
                  alt="Buy Me a Soda QR code — scan to support"
                  width={180}
                  height={180}
                  className="w-[180px] h-[180px] sm:w-[180px] sm:h-[180px] rounded-lg"
                  draggable={false}
                />
              </div>

              {/* Support link button — fallback for mobile / non-QR users */}
              <a
                href={BUY_ME_A_SODA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl bg-warm-900 dark:bg-warm-100 text-white dark:text-warm-900 font-medium hover:bg-warm-800 dark:hover:bg-warm-200 transition-colors text-sm"
              >
                Support via Link
              </a>

              {/* Secondary dismiss link */}
              <button
                onClick={onClose}
                className="mt-4 text-xs text-warm-500 dark:text-warm-400 hover:text-warm-700 dark:hover:text-warm-300 transition-colors"
              >
                Continue browsing
              </button>

              {/* Footer note */}
              <p className="mt-5 text-xs text-warm-400 dark:text-warm-500">
                Thanks for being here, happy building!
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}