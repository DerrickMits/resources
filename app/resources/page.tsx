"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileCode } from "lucide-react";
import { resources } from "@/lib/resources";
import { ResourceAsset } from "@/lib/types";
import ResourceCard from "@/components/ResourceCard";
import DownloadModal from "@/components/DownloadModal";

export default function ResourcesPage() {
  const [selectedResource, setSelectedResource] = useState<ResourceAsset | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDownload = (resource: ResourceAsset) => {
    setSelectedResource(resource);
    setSuccess(false);
  };

  const handleConfirm = async () => {
    if (!selectedResource) return;

    setDownloading(true);

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

      setSuccess(true);
    } catch {
      // Fallback: direct static file download
      const a = document.createElement("a");
      a.href = `/blueprints/${selectedResource.filename}`;
      a.download = selectedResource.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setSuccess(true);
    }

    setDownloading(false);
  };

  const closeModal = () => {
    setSelectedResource(null);
    setSuccess(false);
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
            Ready-to-import workflow configurations, operational frameworks,
            and automation blueprints. Each asset includes structured JSON for
            direct import into your GoHighLevel sub-account.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-6 mb-14"
        >
          <div className="flex items-center gap-2 text-sm text-warm-500 dark:text-warm-400 bg-white/60 dark:bg-warm-800/60 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-warm-200/60 dark:border-warm-700/60">
            <FileCode className="w-4 h-4 text-warm-600 dark:text-warm-300" />
            <span>
              <strong className="text-warm-800 dark:text-warm-200">
                {resources.length}
              </strong>{" "}
              {resources.length === 1 ? "Blueprint" : "Blueprints"} Available
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-warm-500 dark:text-warm-400 bg-white/60 dark:bg-warm-800/60 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-warm-200/60 dark:border-warm-700/60">
            <Download className="w-4 h-4 text-warm-600 dark:text-warm-300" />
            <span>Direct JSON Import</span>
          </div>
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
        success={success}
      />
    </section>
  );
}