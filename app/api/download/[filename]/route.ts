import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Prevent path traversal
  const sanitized = path.basename(filename);
  const filePath = path.join(
    process.cwd(),
    "public",
    "blueprints",
    sanitized
  );

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: "Blueprint not found" },
      { status: 404 }
    );
  }

  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(sanitized).toLowerCase();

  const contentType: Record<string, string> = {
    ".json": "application/json",
    ".pdf": "application/pdf",
    ".md": "text/markdown",
    ".txt": "text/plain",
  };

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": contentType[ext] || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${sanitized}"`,
      "Content-Length": String(fileBuffer.length),
    },
  });
}