// src/lib/menu.ts
"use server"; // lets you call from Server Components

import { Client, Databases, Query } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const db = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const MENU_COLLECTION_ID = process.env.NEXT_PUBLIC_MENU_COLLECTION_ID!;

export async function getMenuByCategory(category: string) {
  const res = await db.listDocuments(DATABASE_ID, MENU_COLLECTION_ID, [
    Query.equal("category", category),
    Query.orderAsc("order"),
  ]);
  return res.documents;
}
