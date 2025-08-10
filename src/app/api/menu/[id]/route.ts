// src/app/api/menu/[id]/route.ts
import { NextResponse } from "next/server";
import { Client, Databases } from "node-appwrite";

export const runtime = "nodejs";

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const API_KEY = process.env.APPWRITE_API_KEY!;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const MENU_COLLECTION_ID = process.env.NEXT_PUBLIC_MENU_COLLECTION_ID!;

function getDb() {
  const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);
  return new Databases(client);
}

// Get one menu item
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const doc = await db.getDocument(
      DATABASE_ID,
      MENU_COLLECTION_ID,
      params.id
    );
    return NextResponse.json(doc);
  } catch (err: any) {
    console.error("GET /api/menu/:id error:", err);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

// Update menu item
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const db = getDb();
    const updated = await db.updateDocument(
      DATABASE_ID,
      MENU_COLLECTION_ID,
      params.id,
      body
    );
    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("PATCH /api/menu/:id error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

// Delete menu item
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDb();
    await db.deleteDocument(DATABASE_ID, MENU_COLLECTION_ID, params.id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("DELETE /api/menu/:id error:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
