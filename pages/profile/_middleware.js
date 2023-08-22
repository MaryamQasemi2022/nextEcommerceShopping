import { NextResponse } from "next/server";

export default async function middleware(req, res) {
  const token = req.cookies.token;

  if (!token && req.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}
