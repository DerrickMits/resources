import { ResourceAsset } from "./types";

export const resources: ResourceAsset[] = [
  {
    id: "gtd-asana-workflow-guide",
    title: "Getting Things Done (GTD) Workflow Implementation for Asana",
    category: "SOP Blueprint",
    format: "PDF Document",
    description:
      "A comprehensive step-by-step guide to implementing the GTD productivity methodology inside Asana. Covers inbox processing, project setup, context tags, weekly review cadence, and automation rules to keep your workflow running on autopilot.",
    highlights: [
      {
        label: "Inbox to Action",
        detail:
          "Capture every task, email, and idea into a unified Asana inbox. Process to next actions with clear project assignments, due dates, and priority tags.",
      },
      {
        label: "Project & Context Organization",
        detail:
          "Structure projects by responsibility area and outcome. Use custom fields, sections, and context tags (Calls, Errands, Online, Desk) for filterable task views.",
      },
      {
        label: "Weekly Review Cadence",
        detail:
          "Built-in weekly review checklist to clear inboxes, update project status, review someday/maybe items, and recalibrate priorities for the week ahead.",
      },
      {
        label: "Automation Rules",
        detail:
          "Pre-configured Asana automation rules for recurring task creation, assignment triggers, due date escalation, and cross-project sync to eliminate manual upkeep.",
      },
    ],
    tags: ["Asana", "GTD Methodology", "Productivity", "Workflow Design", "Project Management"],
    filename: "gtd-asana-workflow-guide.pdf",
    version: "1.0.0",
    date: "2026-07-15",
  },
];

export function getResourceById(id: string): ResourceAsset | undefined {
  return resources.find((r) => r.id === id);
}

export function getAllCategories(): string[] {
  return [...new Set(resources.map((r) => r.category))];
}