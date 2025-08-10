import { NextResponse } from "next/server";
import { serverStorage, BUCKET_ID } from "@/lib/appwriteServer";

export async function GET() {
  const res = await serverStorage.listFiles(BUCKET_ID, undefined);
  const files = res.files.map((f) => ({
    ...f,
    previewUrl: serverStorage.getFilePreview(BUCKET_ID, f.$id).href,
  }));
  return NextResponse.json({ files });
}
