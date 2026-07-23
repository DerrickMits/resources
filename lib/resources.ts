import { ResourceAsset } from "./types";

export const resources: ResourceAsset[] = [
  {
    id: "ghl-sales-workflow-blueprint",
    title: "GoHighLevel High-Performance Multi-Stage Sales Automation Engine",
    category: "CRM Automation",
    format: "GHL Workflow Blueprint (.JSON)",
    description:
      "Complete operational blueprint featuring a 4-stage automated sales engine: inbound form lead nurturing, conditional hot-lead response routing, appointment confirmation with dynamic variables, and automated no-show recovery sequences.",
    highlights: [
      {
        label: "Nurture Sequence",
        detail:
          "Form submitted trigger, opportunity creation in NEW LEAD stage, business hour window enforcement (Mon to Fri, 9 AM to 5 PM), Stop on Response condition.",
      },
      {
        label: "Hot Lead Escalation",
        detail:
          "Customer reply filter via workflow targeting, stage move to HOT LEAD, real-time internal team alerts with contact name and message variables.",
      },
      {
        label: "Appointment Booking Engine",
        detail:
          "Calendar triggers, dynamic email template integration (meeting location, start time, reschedule/cancel links), mobile push notification with one-tap opportunity card redirect, stage update to BOOKED.",
      },
      {
        label: "No Show Recovery Protocol",
        detail:
          "Appointment status trigger filtered to No Show, opportunity stage update to NO SHOW, re-entry toggle enabled, automated client re-engagement with SMS or email reschedule invites.",
      },
    ],
    tags: ["GoHighLevel", "CRM Automation", "Workflow Engineering", "Lead Routing", "Sales Pipeline"],
    filename: "gohighlevel-sales-workflow-blueprint.json",
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