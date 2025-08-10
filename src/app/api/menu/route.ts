// src/app/api/menu/route.ts
import { NextResponse } from "next/server";
import { Client, Databases, ID, Permission, Role, Query } from "node-appwrite";

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const all = ["1", "true", "yes"].includes(
      (searchParams.get("all") || "").toLowerCase()
    );

    const db = getDb();

    // Base ordering/grouping
    const baseQueries: any[] = [
      Query.orderAsc("category"),
      Query.orderAsc("order"),
      Query.orderAsc("name"),
    ];
    if (category) baseQueries.unshift(Query.equal("category", category));

    if (all) {
      // Fetch EVERYTHING (pages of 100)
      const pageSize = 100;
      let offset = 0;
      let total = Infinity;
      const allDocs: any[] = [];

      while (allDocs.length < total) {
        const page = await db.listDocuments(DATABASE_ID, MENU_COLLECTION_ID, [
          ...baseQueries,
          Query.limit(pageSize),
          Query.offset(offset),
        ]);
        allDocs.push(...(page.documents || []));
        total = page.total ?? allDocs.length;
        offset += pageSize;
        if (!page.documents?.length) break;
      }

      return NextResponse.json(
        { total: allDocs.length, documents: allDocs },
        { status: 200 }
      );
    }

    // Single page (default)
    const limit = Math.min(Number(searchParams.get("limit") ?? 50), 100); // Appwrite hard max = 100
    const offset = Math.max(Number(searchParams.get("offset") ?? 0), 0);

    const res = await db.listDocuments(DATABASE_ID, MENU_COLLECTION_ID, [
      ...baseQueries,
      Query.limit(limit),
      Query.offset(offset),
    ]);

    return NextResponse.json(res, { status: 200 });
  } catch (err: any) {
    console.error("GET /api/menu error:", err);
    return NextResponse.json({ error: "List failed" }, { status: 500 });
  }
}

// Create
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = {
      name: String(body.name ?? "").trim(),
      description: body.description ? String(body.description) : undefined,
      price: Number(body.price),
      category: String(body.category ?? "").trim(),
      note: body.note ? String(body.note) : undefined,
      isVegan: Boolean(body.isVegan),
      isCooked:
        body.isCooked === undefined ? undefined : Boolean(body.isCooked),
      order:
        body.order === undefined || body.order === null || body.order === ""
          ? undefined
          : Number(body.order),
      src: body.src ? String(body.src) : undefined,
      imageId: body.imageId ? String(body.imageId) : undefined,
    };

    if (!data.name)
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    if (!Number.isFinite(data.price))
      return NextResponse.json(
        { error: "Price must be a number" },
        { status: 400 }
      );
    if (!data.category)
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );

    const db = getDb();
    const doc = await db.createDocument(
      DATABASE_ID,
      MENU_COLLECTION_ID,
      ID.unique(),
      data,
      [Permission.read(Role.any())] // public read
    );

    return NextResponse.json(doc, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/menu error:", err);
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

// // List
// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const category = searchParams.get("category") || undefined;

//     const db = getDb();
//     const queries: any[] = [Query.orderAsc("order"), Query.orderAsc("name")];

//     if (category) {
//       queries.unshift(Query.equal("category", category));
//     }

//     const res = await db.listDocuments(
//       DATABASE_ID,
//       MENU_COLLECTION_ID,
//       queries
//     );
//     return NextResponse.json(res);
//   } catch (err: any) {
//     console.error("GET /api/menu error:", err);
//     return NextResponse.json({ error: "List failed" }, { status: 500 });
//   }
// }
