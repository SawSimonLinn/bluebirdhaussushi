import { Client, Databases, Storage } from "appwrite";

export const serverClient = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!); // server key

export const serverDb = new Databases(serverClient);
export const serverStorage = new Storage(serverClient);

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const MENU_COLLECTION_ID = process.env.NEXT_PUBLIC_MENU_COLLECTION_ID!;
export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;
