// src/app/api/upload-image/route.ts
import { NextResponse } from "next/server";
import { Client, Storage, ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

export const runtime = "nodejs";

// ---- ENV ----
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "";
const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "";
const apiKey = process.env.APPWRITE_API_KEY || "";
const MENU_BUCKET_ID = process.env.NEXT_PUBLIC_MENU_BUCKET_ID || "";

function envCheck() {
  const missing: string[] = [];
  if (!endpoint) missing.push("NEXT_PUBLIC_APPWRITE_ENDPOINT");
  if (!project) missing.push("NEXT_PUBLIC_APPWRITE_PROJECT_ID");
  if (!apiKey) missing.push("APPWRITE_API_KEY");
  if (!MENU_BUCKET_ID) missing.push("NEXT_PUBLIC_MENU_BUCKET_ID");
  return missing;
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(project)
  .setKey(apiKey);
const storage = new Storage(client);

function buildViewUrl(fileId: string) {
  // Keep /v1 in the endpoint for public link
  return `${endpoint}/storage/buckets/${MENU_BUCKET_ID}/files/${fileId}/view?project=${project}`;
}

async function uploadOne(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error(
      `Only image files are allowed (got ${file.type || file.name})`
    );
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const input = InputFile.fromBuffer(buffer, file.name);
  const created = await storage.createFile(MENU_BUCKET_ID, ID.unique(), input);
  return {
    fileName: file.name,
    imageId: created.$id,
    url: buildViewUrl(created.$id),
  };
}

export async function POST(req: Request) {
  try {
    const missing = envCheck();
    if (missing.length) {
      return NextResponse.json(
        { error: `Missing env: ${missing.join(", ")}` },
        { status: 500 }
      );
    }

    const form = await req.formData();

    // MULTIPLE: <input name="files" type="file" multiple />
    const many = form.getAll("files").filter(Boolean) as File[];

    // SINGLE: <input name="file" type="file" />
    const single = form.get("file") as File | null;

    if (!many.length && !single) {
      return NextResponse.json(
        { error: "No file(s) uploaded" },
        { status: 400 }
      );
    }

    // Handle multiple first if provided
    if (many.length) {
      const results = [];
      for (const f of many) {
        results.push(await uploadOne(f));
      }
      console.log(
        "Uploaded files:",
        results.map((r) => ({ imageId: r.imageId, fileName: r.fileName }))
      );
      return NextResponse.json(
        { count: results.length, items: results },
        { status: 201 }
      );
    }

    // Fallback to single
    const result = await uploadOne(single!);
    console.log("Uploaded file:", {
      imageId: result.imageId,
      fileName: result.fileName,
    });
    return NextResponse.json(
      { imageId: result.imageId, url: result.url },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("upload-image error:", err);
    const msg = err?.response?.message || err?.message || "Upload failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
