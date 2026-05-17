import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { z } from "zod";

const uploadSchema = z.object({
  filename: z.string(),
  contentType: z.enum(["image/jpeg", "image/png"]),
});

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
