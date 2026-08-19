"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

const WEBHOOK_URL = "https://hook.eu1.make.com/rdk97wmwkvqke9jp3jidxrum59sp6c4z";

export default function ResourceRequest() {
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !topic.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          topic: topic.trim(),
          date: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      setSubmitted(true);
      setEmail("");
      setTopic("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white dark:bg-warm-900 rounded-2xl border border-warm-200 dark:border-warm-800 p-6 sm:p-8 md:p-10 shadow-xl">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-warm-900 dark:text-warm-100 mb-2">
            Need an SOP or resource not listed here?
          </h3>
          <p className="text-sm sm:text-base text-warm-600 dark:text-warm-400 leading-relaxed">
            Tell me what you&rsquo;re trying to build or optimize, and I&rsquo;ll
            draft it next.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-6"
            >
              <p className="text-sm sm:text-base text-warm-700 dark:text-warm-300 font-medium">
                Request received! We&rsquo;ll draft an outline and notify you
                once it&rsquo;s live.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs text-accent dark:text-warm-300 hover:underline transition-colors"
              >
                Submit another request
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="requesterEmail"
                  className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1.5"
                >
                  Your email address <span className="text-accent">*</span>
                </label>
                <input
                  id="requesterEmail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-warm-50 dark:bg-warm-800 border border-warm-200 dark:border-warm-700 text-warm-900 dark:text-warm-100 placeholder:text-warm-400 dark:placeholder:text-warm-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
                  required
                />
              </div>

              {/* Topic */}
              <div>
                <label
                  htmlFor="sopTopic"
                  className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1.5"
                >
                  What SOP or template do you need?{" "}
                  <span className="text-accent">*</span>
                </label>
                <textarea
                  id="sopTopic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder='e.g. "A social media content calendar for a SaaS startup"'
                  maxLength={100}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-warm-50 dark:bg-warm-800 border border-warm-200 dark:border-warm-700 text-warm-900 dark:text-warm-100 placeholder:text-warm-400 dark:placeholder:text-warm-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors resize-none"
                  required
                />
                <p className="mt-1.5 text-xs text-warm-400 dark:text-warm-500">
                  Keep it brief — max 100 characters (one or two sentences)
                </p>
              </div>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-red-500 dark:text-red-400"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-warm-900 dark:bg-warm-100 text-white dark:text-warm-900 font-medium hover:bg-warm-800 dark:hover:bg-warm-200 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Request Resource
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}