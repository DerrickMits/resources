"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface FollowModalProps {
  open: boolean;
  onClose: () => void;
  filename: string;
}

const API_URL = "/api/follow-webhook";

export default function FollowModal({ open, onClose, filename }: FollowModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          blueprintSlug: filename,
          subscribedAt: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.message || "Webhook failed");
      }
      setSubmitted(true);
      setEmail("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* Escape key + scroll lock + focus top-close button */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeButtonRef.current?.focus(), 80);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [open, onClose]);

  /* Reset every time the modal opens (slug may differ) */
  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setSubmitting(false);
      setError("");
      setEmail("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 18 }}
            transition={{ duration: 0.25, type: "spring", stiffness: 360, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xs bg-white dark:bg-warm-900 rounded-2xl shadow-2xl border border-warm-200 dark:border-warm-800 p-5 sm:p-6"
          >
            {/* ── Success ── */}
            {submitted ? (
              <div className="text-center pt-2 pb-1">
                <p className="text-sm text-warm-700 dark:text-warm-300 font-medium leading-relaxed">
                  Subscribed! We&rsquo;ll email you when this blueprint
                  gets updated.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 text-xs text-accent dark:text-warm-300 hover:underline transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Close */}
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-warm-100 dark:bg-warm-800 flex items-center justify-center hover:bg-warm-200 dark:hover:bg-warm-700 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5 text-warm-600 dark:text-warm-300" />
                </button>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-base font-display font-bold text-warm-900 dark:text-warm-100 pr-6">
                    Follow this Blueprint
                  </h3>
                  <p className="text-xs text-warm-600 dark:text-warm-400 leading-relaxed">
                    Enter your email to get notified whenever this document is
                    revised or updated.
                  </p>

                  <div>
                    <label
                      htmlFor="followEmail"
                      className="block text-xs font-medium text-warm-700 dark:text-warm-300 mb-1"
                    >
                      Your email <span className="text-accent">*</span>
                    </label>
                    <input
                      id="followEmail"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 rounded-lg bg-warm-50 dark:bg-warm-800 border border-warm-200 dark:border-warm-700 text-warm-900 dark:text-warm-100 placeholder:text-warm-400 dark:placeholder:text-warm-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-red-500 dark:text-red-400">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-warm-900 dark:bg-warm-100 text-white dark:text-warm-900 font-medium hover:bg-warm-800 dark:hover:bg-warm-200 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending…" : "Subscribe to Updates"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}