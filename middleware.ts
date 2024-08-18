import { NextRequest, NextResponse  } from "next/server";
import { updateSession } from "./auth";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
  // const token = request.cookies.get('token'); // Get the token from cookies

  // // Skip appending the token for the login request
  // if (request.nextUrl.pathname === '/api/login') {
  //   return NextResponse.next();
  // }

  // // Check if the request is a POST or GET request
  // if (request.method === 'POST' || request.method === 'GET') {
  //   // Clone the request headers to modify them
  //   const headers = new Headers(request.headers);

  //   // Append the Authorization header with the Bearer token
  //   if (token) {
  //     headers.set('Authorization', `Bearer ${token}`);
  //   }

  //   // Pass the modified request to the next middleware or the final handler
  //   return NextResponse.next({
  //     request: {
  //       headers,
  //     },
  //   });
  // }

  // // If it's not a POST or GET request, proceed without modification
  // return NextResponse.next();
}
