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
  {
    id: "sop-circle-online-community-setup-guide",
    title: "SOP: Circle Online Community Setup Guide",
    category: "SOP Blueprint",
    format: "PDF Document",
    description:
      "A complete standard operating procedure for building, configuring, and launching a branded online community using Circle. Covers workspace architecture, member management, content organization, and moderation workflows.",
    highlights: [
      {
        label: "Workspace Architecture",
        detail:
          "Design your community structure with spaces, categories, and nested groups. Configure member permissions, invite links, and access tiers for public and private areas.",
      },
      {
        label: "Member Onboarding",
        detail:
          "Set up automated welcome sequences, onboarding checklists, and role-based access controls to guide new members from sign-up to active participation.",
      },
      {
        label: "Content Management",
        detail:
          "Organize posts, threads, and resources using categories and tags. Schedule announcements, create pinned posts, and manage content moderation workflows.",
      },
      {
        label: "Community Analytics & Growth",
        detail:
          "Track member activity, engagement metrics, and retention data. Implement feedback loops, Q&A threads, and event scheduling to sustain community growth.",
      },
    ],
    tags: ["Circle", "Community Management", "SOP", "Operations", "Client Onboarding"],
    filename: "sop-circle-online-community-setup-guide.pdf",
    version: "1.0.0",
    date: "2026-07-15",
  },
  {
    id: "ai-fluency-vocabulary-cheat-sheet",
    title: "AI Fluency: Essential Vocabulary & Concepts Cheat Sheet",
    category: "Executive Framework",
    format: "PDF Document",
    description:
      "A curated reference guide covering foundational AI terminology, machine learning concepts, automation vocabulary, and practical language for leading AI-driven initiatives in executive operations.",
    highlights: [
      {
        label: "Core AI Terminology",
        detail:
          "Key terms like LLM, NLP, RAG, fine-tuning, prompt engineering, and vector databases explained in plain business language with real-world context.",
      },
      {
        label: "Automation & Workflow Vocabulary",
        detail:
          "Definitions for trigger-action logic, API orchestration, webhooks, conditional branching, and event-driven automation patterns used across modern CRM platforms.",
      },
      {
        label: "Data Science Foundations",
        detail:
          "Concepts including supervised vs unsupervised learning, feature engineering, model evaluation, and data pipeline architecture distilled for non-technical stakeholders.",
      },
      {
        label: "Executive Communication Guide",
        detail:
          "Language patterns for briefing leadership on AI readiness, vendor evaluation criteria, ROI framing, and strategic roadmaps for organizational AI adoption.",
      },
    ],
    tags: ["AI", "Machine Learning", "Executive Reference", "Automation", "Digital Fluency"],
    filename: "ai-fluency-vocabulary-cheat-sheet.pdf",
    version: "1.0.0",
    date: "2026-07-15",
  },
  {
    id: "ai-prompts-for-career-exploration",
    title: "AI Prompts for Career Exploration & Professional Development",
    category: "Executive Framework",
    format: "PDF Document",
    description:
      "A structured collection of AI prompt templates designed to guide career exploration, skill gap analysis, resume tailoring, interview preparation, and strategic professional development planning.",
    highlights: [
      {
        label: "Career Discovery Prompts",
        detail:
          "Prompt patterns for identifying transferable skills, exploring adjacent industries, and mapping career trajectories using AI-powered analysis of your professional background.",
      },
      {
        label: "Skill Gap & Development",
        detail:
          "Templates for prompting AI to audit your current skill set against target roles, recommend learning pathways, and generate personalized upskilling roadmaps.",
      },
      {
        label: "Resume & Application Strategy",
        detail:
          "Prompts for tailoring resumes to specific job descriptions, crafting compelling cover letters, and optimizing LinkedIn profiles with keyword-rich positioning.",
      },
      {
        label: "Interview Readiness",
        detail:
          "Scenario-based prompts that simulate behavioral interviews, generate practice questions for executive roles, and provide structured feedback on your responses.",
      },
    ],
    tags: ["AI Prompts", "Career Development", "Executive Growth", "Professional Skills", "Leadership"],
    filename: "ai-prompts-for-career-exploration.pdf",
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