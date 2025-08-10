// src/app/api/debug-env/route.ts
import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    defaultBucket: process.env.APPWRITE_DEFAULT_BUCKET_ID,
    hasKey: !!process.env.APPWRITE_API_KEY,
  });
}
