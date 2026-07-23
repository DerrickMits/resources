"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { resources } from "@/lib/resources";
import { ResourceAsset } from "@/lib/types";
import ResourceCard from "@/components/ResourceCard";
import DownloadModal from "@/components/DownloadModal";

export default function ResourcesPage() {
  const [selectedResource, setSelectedResource] = useState<ResourceAsset | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [downloadCompleted, setDownloadCompleted] = useState(false);

  const handleDownload = (resource: ResourceAsset) => {
    setSelectedResource(resource);
    setDownloadStarted(false);
    setDownloadCompleted(false);
  };

  const handleConfirm = useCallback(async () => {
    if (!selectedResource) return;

    setDownloading(true);
    // Trigger "Download Started" immediately after a brief moment
    // so the UI transition is visible and feels premium
    setTimeout(() => setDownloadStarted(true), 200);

    try {
      const res = await fetch(`/api/download/${selectedResource.filename}`);
      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = selectedResource.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: direct static file download
      const a = document.createElement("a");
      a.href = `/blueprints/${selectedResource.filename}`;
      a.download = selectedResource.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    setDownloading(false);
    // Brief pause so the user sees the "Download Started" animation complete
    // then transition to "Download Completed"
    setTimeout(() => {
      setDownloadStarted(false);
      setDownloadCompleted(true);
    }, 1500);
  }, [selectedResource]);

  const closeModal = () => {
    setSelectedResource(null);
    setDownloadStarted(false);
    setDownloadCompleted(false);
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
            Blueprints &amp; Downloads
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

      {/* Download Modal */}
      <DownloadModal
        resource={selectedResource}
        open={!!selectedResource}
        onClose={closeModal}
        onConfirm={handleConfirm}
        downloading={downloading}
        downloadStarted={downloadStarted}
        downloadCompleted={downloadCompleted}
      />
    </section>
  );
}