import { Client, Databases } from "appwrite";

export const publicClient = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const publicDb = new Databases(publicClient);

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const MENU_COLLECTION_ID = process.env.NEXT_PUBLIC_MENU_COLLECTION_ID!;
