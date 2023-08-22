import { NextResponse } from "next/server";

export default async function middleware(req, res) {
  const token = req.cookies.token;

  if (token && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}
