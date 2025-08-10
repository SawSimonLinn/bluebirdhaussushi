// src/app/api/menu/bulk/route.ts
import { NextResponse } from "next/server";
import { Client, Databases, ID, Permission, Role } from "node-appwrite";
import { parse } from "csv-parse/sync"; // npm i csv-parse

export const runtime = "nodejs";

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const API_KEY = process.env.APPWRITE_API_KEY!;
const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COL_ID = process.env.NEXT_PUBLIC_MENU_COLLECTION_ID!;

const db = new Databases(
  new Client().setEndpoint(ENDPOINT).setProject(PROJECT).setKey(API_KEY)
);

function coerce(row: any) {
  const num = (v: any) => (v === "" || v == null ? undefined : Number(v));
  const bool = (v: any) =>
    String(v).toLowerCase() === "true"
      ? true
      : String(v).toLowerCase() === "false"
      ? false
      : v === ""
      ? undefined
      : Boolean(v);

  return {
    name: String(row.name ?? "").trim(),
    description: row.description ? String(row.description) : undefined,
    price: num(row.price) ?? 0,
    category: String(row.category ?? "").trim(),
    note: row.note ? String(row.note) : undefined,
    isVegan: bool(row.isVegan),
    isCooked: bool(row.isCooked),
    order: num(row.order),
    src: row.src ? String(row.src) : undefined,
    imageId: row.imageId ? String(row.imageId) : undefined,
  };
}

export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") || "";
    let items: any[] = [];

    if (ct.includes("text/csv") || ct.includes("multipart/form-data")) {
      const form = await req.formData();
      const file = form.get("file") as File | null;
      if (!file)
        return NextResponse.json({ error: "No file" }, { status: 400 });
      const csv = await file.text();
      const rows = parse(csv, { columns: true, skip_empty_lines: true });
      items = rows.map(coerce);
    } else if (ct.includes("application/json")) {
      const body = await req.json();
      if (!Array.isArray(body?.items)) {
        return NextResponse.json(
          { error: "Expected { items: [...] }" },
          { status: 400 }
        );
      }
      items = body.items.map(coerce);
    } else {
      return NextResponse.json(
        { error: "Send CSV file or JSON body" },
        { status: 415 }
      );
    }

    // minimal validation
    const toCreate = items.filter(
      (i) => i.name && Number.isFinite(i.price) && i.category
    );
    if (!toCreate.length) {
      return NextResponse.json({ error: "No valid rows" }, { status: 400 });
    }

    // Create sequentially (simple & safe). For speed, you could batch with Promise.allSettled.
    const results: any[] = [];
    for (const data of toCreate) {
      const doc = await db.createDocument(DB_ID, COL_ID, ID.unique(), data, [
        Permission.read(Role.any()),
      ]);
      results.push(doc);
    }

    return NextResponse.json(
      { count: results.length, items: results },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("bulk import error", err);
    return NextResponse.json(
      { error: err?.message || "Bulk import failed" },
      { status: 500 }
    );
  }
}
