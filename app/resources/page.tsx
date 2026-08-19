"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { resources } from "@/lib/resources";
import { ResourceAsset } from "@/lib/types";
import ResourceCard from "@/components/ResourceCard";
import SupportModal from "@/components/SupportModal";

export default function ResourcesPage() {
  const [showSupportModal, setShowSupportModal] = useState(false);

  const triggerSilentDownload = useCallback(async (resource: ResourceAsset) => {
    try {
      const res = await fetch(`/api/download/${resource.filename}`);
      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = resource.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: direct static file download
      const a = document.createElement("a");
      a.href = `/blueprints/${resource.filename}`;
      a.download = resource.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }, []);

  const handleDownload = useCallback(
    async (resource: ResourceAsset) => {
      // Kick off the actual file download in the background immediately
      triggerSilentDownload(resource);
      // Open the support modal right away
      setShowSupportModal(true);
    },
    [triggerSilentDownload]
  );

  const closeSupportModal = () => {
    setShowSupportModal(false);
  };

  return (
    <section className="relative py-24 md:py-32 bg-cream dark:bg-deep pt-28">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.25em] font-semibold text-warm-500 dark:text-warm-400 mb-4">
            Operational Resource Library
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-warm-900 dark:text-warm-100">
            Blueprints & Downloads
          </h1>
          <p className="text-warm-600 dark:text-warm-400 text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
            A curated collection of production-ready automation blueprints,
            operational frameworks, and downloadable assets designed to optimize
            workflows, streamline client management, and scale business operations.
          </p>
        </motion.div>

        {/* Resource Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {resources.map((resource, index) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              index={index}
              onDownload={handleDownload}
            />
          ))}
        </div>

        {/* Empty state */}
        {resources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-warm-500 dark:text-warm-400 text-lg">
              No resources available yet. Check back soon for new blueprints.
            </p>
          </motion.div>
        )}
      </div>

      {/* Support Modal — opens on every download click */}
      <SupportModal open={showSupportModal} onClose={closeSupportModal} />
    </section>
  );
}