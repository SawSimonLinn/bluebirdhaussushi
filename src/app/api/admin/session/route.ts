import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { password } = await req.json();
  if (password === process.env.ADMIN_PASSWORD) {
    cookies().set("admin", password, { httpOnly: true, path: "/" });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Invalid" }, { status: 401 });
}
