import { NextRequest, NextResponse } from "next/server";
import { decrypt, getSession, updateSession } from "./auth";

export async function middleware(request: NextRequest) {
  // return await updateSession(request);

  return NextResponse.next();
}
