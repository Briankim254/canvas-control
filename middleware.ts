import { NextRequest, NextResponse } from "next/server";
import { decrypt, getSession, updateSession } from "./auth";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
  // const token = request.cookies.get('token'); // Get the token from cookies

  // const session = await getSession();
  // const userToken = session?.user?.token;

  // if (!userToken) return sessionResponse;

  // const requestHeaders = new Headers(request.headers);
  // requestHeaders.set("Authorization", `Bearer ${userToken}`);

  // const modifiedRequest = new NextRequest(request.url, {
  //   method: request.method,
  //   headers: requestHeaders,
  //   body: request.body, // Careful with body as it might be a stream.
  //   cache: request.cache,
  //   redirect: request.redirect,
  //   referrer: request.referrer,
  //   referrerPolicy: request.referrerPolicy,
  //   mode: request.mode,
  //   credentials: request.credentials,
  //   integrity: request.integrity,
  //   keepalive: request.keepalive,
  //   signal: request.signal,
  // });

  // // If it's not a POST or GET request, proceed without modification
  // return NextResponse.next();
}
