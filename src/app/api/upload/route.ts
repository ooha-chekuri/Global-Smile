import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const uploadSchema = z.object({
  filename: z.string(),
  contentType: z.enum(["image/jpeg", "image/png"]),
});

function validateFileSize(buffer: Buffer): string | null {
  if (buffer.length > MAX_FILE_SIZE) {
    return `File size exceeds 5MB limit (${(buffer.length / (1024 * 1024)).toFixed(1)}MB)`;
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const filenameRaw = formData.get("filename") as string | null;
    const contentTypeRaw = formData.get("contentType") as string | null;

    const parsed = uploadSchema.safeParse({ filename: filenameRaw, contentType: contentTypeRaw });
    if (!file || !parsed.success) {
      return NextResponse.json(
        { error: "Invalid file", code: "INVALID_FILE" },
        { status: 400 }
      );
    }

    const { filename, contentType } = parsed.data;
    const buffer = Buffer.from(await file.arrayBuffer());

    const sizeError = validateFileSize(buffer);
    if (sizeError) {
      return NextResponse.json(
        { error: sizeError, code: "FILE_TOO_LARGE" },
        { status: 400 }
      );
    }

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(filename, file, {
        access: "public",
        addRandomSuffix: true,
      });
      return NextResponse.json({ url: blob.url }, { status: 200 });
    }

    const uploadDir = join(process.cwd(), "public", "temp-uploads");
    await mkdir(uploadDir, { recursive: true });
    const uniqueName = `${randomUUID()}-${filename}`;
    const filePath = join(uploadDir, uniqueName);
    await writeFile(filePath, buffer);

    const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
    const url = `${baseUrl}/temp-uploads/${uniqueName}`;
    return NextResponse.json({ url }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Upload failed", code: "UPLOAD_ERROR" },
      { status: 500 }
    );
  }
}
