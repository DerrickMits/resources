export type AssetCategory =
  | "CRM Automation"
  | "SOP Blueprint"
  | "Executive Framework"
  | "Workflow Template";

export type AssetFormat =
  | "GHL Workflow Blueprint (.JSON)"
  | "PDF Document"
  | "Markdown Template";

export interface ResourceHighlight {
  label: string;
  detail: string;
}

export interface ResourceAsset {
  id: string;
  title: string;
  category: AssetCategory;
  format: AssetFormat;
  description: string;
  highlights: ResourceHighlight[];
  tags: string[];
  filename: string;
  version?: string;
  date?: string;
}